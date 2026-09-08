import { z } from 'zod';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD');
const localTime = z.string().regex(/^\d{2}:\d{2}$/, 'Use HH:MM');

export const bookingSchema = z.object({
	requestType: z.enum(['BOOKED', 'QUOTED']).default('BOOKED'),
	tripType: z.string().trim().min(1).max(80),
	pickup: z.string().trim().min(2).max(500),
	destination: z.string().trim().min(2).max(500),
	date: isoDate.refine((value) => {
		const parsed = new Date(`${value}T00:00:00Z`);
		return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
	}, 'Enter a valid date'),
	time: localTime,
	passengers: z.coerce.number().int().min(1).max(100),
	luggage: z.coerce.number().int().min(0).max(100),
	vehicle: z.string().trim().min(1).max(100),
	name: z.string().trim().min(2).max(120),
	email: z.string().trim().email().max(254),
	phone: z.string().trim().min(7).max(30),
	specialRequests: z.string().trim().max(2000).optional(),
	website: z.string().max(0).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
