import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const updateSchema = z.object({
  status: z.enum(['BOOKED', 'QUOTED', 'COMPLETED', 'CANCELLED']).optional(),
  internalNotes: z.string().max(5000).optional(),
  pickup: z.string().trim().min(2).max(500).optional(),
  destination: z.string().trim().min(2).max(500).optional(),
  travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  travelTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  passengers: z.number().int().min(1).max(100).optional(),
  luggage: z.number().int().min(0).max(100).optional(),
  name: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().email().max(254).optional(),
  phone: z.string().trim().min(7).max(30).optional(),
});

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const supabase = await createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();
  const { id } = await context.params;

  if (!user.user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid booking update' }, { status: 400 });

  const { data: current } = await supabase.from('bookings').select('status, customer_id').eq('id', id).single();
  if (!current) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

  const update = {
    ...(parsed.data.status ? { status: parsed.data.status } : {}),
    ...(parsed.data.internalNotes !== undefined ? { internal_notes: parsed.data.internalNotes } : {}),
    ...(parsed.data.pickup ? { pickup: parsed.data.pickup } : {}),
    ...(parsed.data.destination ? { destination: parsed.data.destination } : {}),
    ...(parsed.data.travelDate ? { travel_date: parsed.data.travelDate } : {}),
    ...(parsed.data.travelTime ? { travel_time: parsed.data.travelTime } : {}),
    ...(parsed.data.passengers !== undefined ? { passengers: parsed.data.passengers } : {}),
    ...(parsed.data.luggage !== undefined ? { luggage: parsed.data.luggage } : {}),
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from('bookings').update(update).eq('id', id);
  if (error) return NextResponse.json({ error: 'Unable to update booking' }, { status: 500 });

  const customerUpdate = {
    ...(parsed.data.name ? { name: parsed.data.name } : {}),
    ...(parsed.data.email ? { email: parsed.data.email } : {}),
    ...(parsed.data.phone ? { phone: parsed.data.phone } : {}),
  };
  if (Object.keys(customerUpdate).length) {
    const { error: customerError } = await supabase.from('customers').update(customerUpdate).eq('id', current.customer_id);
    if (customerError) return NextResponse.json({ error: 'Booking updated but customer details failed' }, { status: 500 });
  }

  if (parsed.data.status && parsed.data.status !== current.status) {
    await supabase.from('booking_status_history').insert({
      booking_id: id,
      old_status: current.status,
      new_status: parsed.data.status,
      changed_by: user.user.id,
    });
  }

  return NextResponse.json({ ok: true });
}