import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(200),
});

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: 'Enter a valid email and password.' }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return NextResponse.json({ error: 'Authentication is not configured.' }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => request.headers.get('cookie')?.split('; ').map((item) => {
        const separator = item.indexOf('=');
        return { name: item.slice(0, separator), value: item.slice(separator + 1) };
      }) ?? [],
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.user) {
    return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 });
  }

  const { data: admin } = await supabase
    .from('admins')
    .select('id')
    .eq('id', data.user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return NextResponse.json({ error: 'This account is not authorised for the admin panel.' }, { status: 403 });
  }

  return response;
}