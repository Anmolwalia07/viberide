import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return NextResponse.json({ data: [] });

  const db = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await db
    .from('vehicles')
    .select('id, name, category, description, passenger_capacity, luggage_capacity')
    .eq('status', 'ACTIVE')
    .order('name');

  if (error) return NextResponse.json({ error: 'Unable to load vehicles' }, { status: 500 });
  return NextResponse.json({ data });
}