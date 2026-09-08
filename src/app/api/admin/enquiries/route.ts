import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/admin';

const updateSchema = z.object({ id: z.string().uuid(), status: z.enum(['NEW', 'READ', 'CLOSED']).optional(), internal_notes: z.string().max(5000).optional() });

export async function GET() {
  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { data, error } = await supabase.from('contact_enquiries').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Unable to load enquiries' }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PATCH(request: Request) {
  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid enquiry update' }, { status: 400 });
  const { id, ...update } = parsed.data;
  const { error } = await supabase.from('contact_enquiries').update({ ...update, updated_at: new Date().toISOString() }).eq('id', id);
  if (error) return NextResponse.json({ error: 'Unable to update enquiry' }, { status: 500 });
  return NextResponse.json({ ok: true });
}