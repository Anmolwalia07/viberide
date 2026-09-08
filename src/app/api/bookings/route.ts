import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { bookingSchema } from '@/lib/validation';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const parsed = bookingSchema.safeParse(body);

		if (!parsed.success || parsed.data.website) {
			return NextResponse.json({ error: 'Invalid booking request' }, { status: 400 });
		}

		const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

		if (!url || !key) {
			return NextResponse.json(
				{ error: 'Booking service is not configured' },
				{ status: 503 },
			);
		}

		const db = createClient(url, key, {
			auth: { autoRefreshToken: false, persistSession: false },
		});
		const data = parsed.data;
		const { data: customer, error: customerError } = await db
			.from('customers')
			.insert({ name: data.name, email: data.email, phone: data.phone })
			.select('id')
			.single();

		if (customerError) throw customerError;

		const { data: service } = await db
			.from('services')
			.select('id')
			.eq('name', data.tripType)
			.maybeSingle();
		const { data: vehicle } = await db
			.from('vehicles')
			.select('id')
			.eq('name', data.vehicle)
			.maybeSingle();
		const { data: booking, error: bookingError } = await db.from('bookings').insert({
			customer_id: customer.id,
			service_id: service?.id ?? null,
			vehicle_id: vehicle?.id ?? null,
			pickup: data.pickup,
			destination: data.destination,
			travel_date: data.date,
			travel_time: data.time,
			passengers: data.passengers,
			luggage: data.luggage,
			special_requests: data.specialRequests ?? null,
			status: data.requestType,
		}).select('booking_reference').single();

		if (bookingError) throw bookingError;

		return NextResponse.json({ ok: true, bookingReference: booking.booking_reference });
	} catch (error) {
		console.error('Booking request failed', error);
		return NextResponse.json(
			{ error: 'Unable to process booking request' },
			{ status: 500 },
		);
	}
}
