import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const parsed = enquirySchema.safeParse(await request.json());
  if (!parsed.success || parsed.data.website) {
    return NextResponse.json({ error: 'Invalid enquiry' }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: 'Enquiry service is not configured' }, { status: 503 });

  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { error } = await db.from('contact_enquiries').insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    message: parsed.data.message,
  });

  if (error) {
    console.error('Contact enquiry failed', error);
    return NextResponse.json({ error: 'Unable to send enquiry' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}