import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/admin';

const settingsSchema = z.object({
  business_name: z.string().trim().min(2).max(160),
  phone: z.string().trim().max(40),
  email: z.string().trim().email().or(z.literal('')),
  address: z.string().trim().max(300),
  whatsapp: z.string().trim().max(40),
});

export async function GET() {
  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { data, error } = await supabase.from('business_settings').select('*').limit(1).maybeSingle();
  if (error) return NextResponse.json({ error: 'Unable to load settings' }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PATCH(request: Request) {
  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const parsed = settingsSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid settings' }, { status: 400 });

  const { data: existing } = await supabase.from('business_settings').select('id').limit(1).maybeSingle();
  const query = existing
    ? supabase.from('business_settings').update({ ...parsed.data, updated_at: new Date().toISOString() }).eq('id', existing.id)
    : supabase.from('business_settings').insert(parsed.data);
  const { error } = await query;
  if (error) return NextResponse.json({ error: 'Unable to save settings' }, { status: 500 });
  return NextResponse.json({ ok: true });
}