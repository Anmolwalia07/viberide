import Link from 'next/link';
import { AdminSignOut } from '@/components/AdminSignOut';
import { AdminBackButton } from '@/components/AdminBackButton';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function Page() {
	const supabase = await createSupabaseServerClient();
	const [{ count: bookings }, { count: newBookings }, { count: upcoming }] = await Promise.all([
		supabase.from('bookings').select('*', { count: 'exact', head: true }),
		 supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'BOOKED'),
		supabase.from('bookings').select('*', { count: 'exact', head: true }).gte('travel_date', new Date().toISOString().slice(0, 10)),
	]);

	return (
		<main className="pt-28">
			<div className="container section">
				<div className="flex flex-wrap items-end justify-between gap-6">
					<div><div className="eyebrow">Admin / dashboard</div><h1 className="serif mt-5 text-6xl">Operations.</h1></div>
					<div className="flex flex-wrap gap-3"><AdminBackButton /><AdminSignOut /></div>
				</div>
				<div className="mt-12 grid gap-4 sm:grid-cols-3">
					<Metric label="All requests" value={bookings ?? 0} />
					<Metric label="Booked requests" value={newBookings ?? 0} />
					<Metric label="Upcoming" value={upcoming ?? 0} />
				</div>
				<div className="mt-8 flex flex-wrap gap-3">
					<Link href="/admin/bookings" className="btn">Manage bookings</Link>
					<Link href="/admin/enquiries" className="btn secondary">Enquiries</Link>
					<Link href="/admin/vehicles" className="btn secondary">Fleet</Link>
					<Link href="/admin/services" className="btn secondary">Services</Link>
				</div>
			</div>
		</main>
	);
}

function Metric({ label, value }: { label: string; value: number }) {
	return <div className="card p-6"><div className="eyebrow">{label}</div><div className="serif mt-4 text-5xl">{value}</div></div>;
}
