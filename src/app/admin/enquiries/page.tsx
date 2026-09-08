import { AdminSignOut } from '@/components/AdminSignOut';
import { AdminBackButton } from '@/components/AdminBackButton';
import { AdminEnquiries } from '@/components/AdminEnquiries';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function EnquiriesPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('contact_enquiries').select('*').order('created_at', { ascending: false });
  return <main className="pt-28"><div className="container section"><div className="flex flex-wrap items-end justify-between gap-6"><div><div className="eyebrow">Admin / enquiries</div><h1 className="serif mt-5 text-6xl">Enquiries.</h1></div><div className="flex flex-wrap gap-3"><AdminBackButton /><AdminSignOut /></div></div><AdminEnquiries enquiries={data ?? []} /></div></main>;
}