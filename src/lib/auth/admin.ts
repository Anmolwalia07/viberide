import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return { supabase, user: null };

  const { data: admin } = await supabase
    .from('admins')
    .select('id, role')
    .eq('id', userData.user.id)
    .maybeSingle();

  return { supabase, user: admin ? userData.user : null };
}