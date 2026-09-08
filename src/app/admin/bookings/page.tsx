import { AdminSignOut } from '@/components/AdminSignOut';
import { AdminBackButton } from '@/components/AdminBackButton';
import { AdminBookingFilters } from '@/components/AdminBookingFilters';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function Page() {
	const supabase = await createSupabaseServerClient();
	const { data: bookings } = await supabase
		.from('bookings')
		.select('id, booking_reference, pickup, destination, travel_date, travel_time, passengers, luggage, status, internal_notes, customers(name, email, phone), services(name), vehicles(name)')
		.order('travel_date', { ascending: true })
		.order('travel_time', { ascending: true });

	return (
		<main className="pt-28">
			<div className="container section">
				<div className="flex flex-wrap items-end justify-between gap-6">
					<div><div className="eyebrow">Admin / bookings</div><h1 className="serif mt-5 text-6xl">Requests.</h1></div>
					<div className="flex flex-wrap gap-3"><AdminBackButton /><AdminSignOut /></div>
				</div>
				<AdminBookingFilters bookings={bookings ?? []} />
			</div>
		</main>
	);
}
