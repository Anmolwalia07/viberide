'use client';

import { FormEvent, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Phone,
} from 'lucide-react';
import { track } from '@/lib/analytics';
import { site } from '@/config/site';

const tripTypes = ['Airport Transfer', 'Point-to-Point', 'Corporate', 'Event', 'Hourly Chauffeur', 'Other'];
const fleetOptions = ['Luxury Sedan', 'Executive Sedan', 'Luxury Van', 'No preference'];

export function HomeBookingForm({ requestType = 'QUOTED' }: { requestType?: 'BOOKED' | 'QUOTED' }) {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [bookingReference, setBookingReference] = useState('');
  const [selectedFleet, setSelectedFleet] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);

  const [started, setStarted] = useState(false);

  const begin = () => {
    if (!started) {
      setStarted(true);

      track('booking_started', {
        source: 'homepage_hero',
      });
    }
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus('sending');

    const form = new FormData(e.currentTarget);

    const specialRequests = [
      String(form.get('specialRequests') || ''),
      form.get('babySeat') ? 'Baby seat' : '',
      form.get('boosterSeat') ? 'Booster seat' : '',
    ].filter(Boolean).join(', ');

    const data = {
      requestType,
      tripType: String(form.get('tripType') || ''),
      pickup: String(form.get('pickup') || ''),
      destination: String(form.get('destination') || ''),
      date: String(form.get('date') || ''),
      time: String(form.get('time') || ''),
      passengers,
      luggage,
      vehicle: 'No preference',
      name: String(form.get('name') || ''),
      phone: String(form.get('phone') || ''),
      email: String(form.get('email') || ''),
      specialRequests,
      website: String(form.get('website') || ''),
    };

    try {
      const body = [`Request type: ${requestType === 'QUOTED' ? 'Quote' : 'Booking'}`, `Trip type: ${data.tripType}`, `Pickup: ${data.pickup}`, `Destination: ${data.destination}`, `Date: ${data.date}`, `Time: ${data.time}`, `Passengers: ${data.passengers}`, `Luggage: ${data.luggage}`, `Fleet: ${selectedFleet || 'No preference'}`, `Vehicle: ${data.vehicle}`, `Name: ${data.name}`, `Phone: ${data.phone}`, `Email: ${data.email}`, `Special requests: ${data.specialRequests}`].join('\n');
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Website quote request')}&body=${encodeURIComponent(body)}`;
      setBookingReference('Email draft');
      setStatus('success');

      track('booking_submitted', {
        source: 'homepage_hero',
      });
    } catch {
      setStatus('error');
    }
  }

  /* =====================================================
     SUCCESS STATE
  ===================================================== */

  if (status === 'success') {
    return (
      <div className="home-booking-panel w-full max-w-3xl min-w-0">
        <div className="flex items-start gap-3">
          <div className="success-icon shrink-0">
            <CheckCircle2 size={18} />
          </div>

          <div className="min-w-0">
            <div className="eyebrow">
              Request received
            </div>

            <h2 className="serif mt-0.5 text-lg md:text-xl">
              Your quote request has been received.
            </h2>

            {bookingReference && <p className="mt-2 text-[10px] uppercase tracking-[.14em] text-[#b9a47a]">Reference {bookingReference}</p>}

            <p className="mt-1.5 text-[11px] leading-4.5 text-neutral-400">
              Our team will review your journey and contact you
              to confirm availability and pricing.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     FORM
  ===================================================== */

  return (
    <form
      id="quote-form"
      onSubmit={submit}
      onFocus={begin}
      className="
        home-booking-panel quote-light-panel
        w-full
        max-w-3xl
        min-w-0
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          min-w-0
          items-center
          justify-between
          gap-3
          border-b
          border-white/10
          pb-3
        "
      >
        <div className="min-w-0">
          <div className="eyebrow">
            Private travel
          </div>

          <h2 className="serif mt-0.5 text-lg md:text-xl">
            Get a Quote
          </h2>
        </div>

        <a
          href="tel:0424136433"
          className="
            shrink-0
            inline-flex
            items-center
            gap-1.5
            rounded-full
            bg-[#b9a47a]
            px-3
            py-1.5
            text-xs
            font-medium
            text-white
            transition-colors
            hover:bg-[#a69269]
          "
        >
          <Phone size={12} />
          <span>Instant Call</span>
        </a>
      </div>

      {/* =================================================
          FIELDS

          Mobile:
          Pickup
          Destination
          Date | Time
          Name | Phone
          Email
          Special requests

          Desktop:
          Same compact structure
      ================================================= */}

      <div
        className="
          mt-3
          grid
          min-w-0
          grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
          gap-x-2
          gap-y-2.5
        "
      >
        <p className="col-span-2 text-sm leading-6 text-neutral-600">Start with the essentials. We will confirm availability and details with you directly.</p>

        <div className="col-span-2 min-w-0">
          <Field label="What do you need?">
            <select name="tripType" defaultValue="" required>
              <option value="" disabled>Select a service</option>
              {tripTypes.map((tripType) => <option key={tripType} value={tripType}>{tripType}</option>)}
            </select>
          </Field>
        </div>
        {/* =================================================
            PICKUP
        ================================================= */}

        <div className="col-span-2 min-w-0">
          <Field label="Pickup">
            <input
              name="pickup"
              type="text"
              required
              autoComplete="street-address"
              placeholder="Pickup address / airport"
            />
          </Field>
        </div>

        {/* =================================================
            DESTINATION
        ================================================= */}

        <div className="col-span-2 min-w-0">
          <Field label="Destination">
            <input
              name="destination"
              type="text"
              required
              autoComplete="street-address"
              placeholder="Destination / hotel"
            />
          </Field>
        </div>

        {/* =================================================
            DATE
        ================================================= */}

        <div className="col-span-1 min-w-0">
          <Field label="Date" hint="DD / MM / YYYY">
            <input
              name="date"
              type="date"
              required
              aria-label="Pickup date, day month year"
              onClick={(e) => e.currentTarget.showPicker?.()}
              className="w-full min-w-0 max-w-full appearance-none"
            />
          </Field>
          <p className="mt-1 text-[9px] text-neutral-600">Select your pickup date</p>
        </div>

        {/* =================================================
            TIME
        ================================================= */}

        <div className="col-span-1 min-w-0">
          <Field label="Time" hint="HH:MM">
            <input
              name="time"
              type="time"
              required
              aria-label="Pickup time, hours and minutes"
              onClick={(e) => e.currentTarget.showPicker?.()}
              className="w-full min-w-0 max-w-full appearance-none"
            />
          </Field>
          <p className="mt-1 text-[9px] text-neutral-600">Select your pickup time</p>
        </div>

        <div className="col-span-1 min-w-0">
          <Field label="Passengers">
            <div className="quote-counter"><button type="button" aria-label="Decrease passengers" onClick={() => setPassengers(Math.max(1, passengers - 1))}>-</button><output>{passengers}</output><button type="button" aria-label="Increase passengers" onClick={() => setPassengers(passengers + 1)}>+</button></div>
          </Field>
        </div>

        <div className="col-span-1 min-w-0">
          <Field label="Suitcases">
            <div className="quote-counter"><button type="button" aria-label="Decrease suitcases" onClick={() => setLuggage(Math.max(0, luggage - 1))}>-</button><output>{luggage}</output><button type="button" aria-label="Increase suitcases" onClick={() => setLuggage(luggage + 1)}>+</button></div>
          </Field>
        </div>

        <div className="col-span-2 min-w-0">
          <Field label="Fleet">
            <select value={selectedFleet} onChange={(event) => setSelectedFleet(event.target.value)}>
              <option value="">Select a fleet</option>
              {fleetOptions.map((fleet) => <option key={fleet} value={fleet}>{fleet}</option>)}
            </select>
          </Field>
        </div>

        {/* =================================================
            FULL NAME
        ================================================= */}

        <div className="col-span-1 min-w-0">
          <Field label="Full name">
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Full name"
            />
          </Field>
        </div>

        {/* =================================================
            PHONE
        ================================================= */}

        <div className="col-span-1 min-w-0">
          <Field label="Phone">
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="Phone number"
            />
          </Field>
        </div>

        {/* =================================================
            EMAIL
        ================================================= */}

        <div className="col-span-2 min-w-0">
          <Field label="Email">
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </Field>
        </div>

        {/* =================================================
            SPECIAL REQUESTS
        ================================================= */}

        <div className="col-span-2 min-w-0">
          <Field label="Special requests" hint="Optional">
            <textarea name="specialRequests" rows={3} placeholder="Child seat, accessibility, extra stops or anything else we should know" />
          </Field>
        </div>
      </div>

      <div className="mt-3 grid gap-2 border-t border-[#d5d0c5] pt-3 sm:grid-cols-2">
        <span className="col-span-full text-[11px] uppercase tracking-[.12em] text-[#4f4a42]">Additional requirements <span className="text-[#806b3d]">(optional)</span></span>
        <label className="flex items-center gap-2 text-sm text-[#4f4a42]"><input name="babySeat" type="checkbox" className="h-4 w-4 accent-[#806b3d]" />Baby seat</label>
        <label className="flex items-center gap-2 text-sm text-[#4f4a42]"><input name="boosterSeat" type="checkbox" className="h-4 w-4 accent-[#806b3d]" />Booster seat</label>
      </div>

      {/* =================================================
          SUBMIT
      ================================================= */}

      <div
        className="
          mt-3
          flex
          min-w-0
          flex-col
          gap-2.5
          sm:flex-row
          sm:items-center
        "
      >
        <button
          className="
            btn
            flex
            h-10
            w-full
            min-w-0
            items-center
            justify-center
            gap-1.5
            text-xs
            sm:flex-1
          "
          type="submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? (
            <>
              <Loader2
                size={13}
                className="animate-spin"
              />
              Sending
            </>
          ) : (
            <>
              {requestType === 'BOOKED' ? 'GET A QUOTE' : 'Get a Quote'}
              <ArrowUpRight size={13} />
            </>
          )}
        </button>

        <p
          className="
            text-center
            text-[8px]
            leading-3.5
            text-neutral-600

            sm:max-w-[175px]
            sm:text-left
          "
        >
          No payment required. Availability and pricing
          are confirmed by the team.
        </p>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {status === 'error' && (
        <p
          role="alert"
          className="
            mt-2
            text-[10px]
            leading-4
            text-red-300
          "
        >
          We couldn&apos;t send the request. Please try again
          or contact us directly.
        </p>
      )}
    </form>
  );
}

/* =======================================================
   FIELD
======================================================= */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid min-w-0 gap-1">
      <span
        className="
          text-[8px]
          uppercase
          tracking-[.12em]
          text-neutral-500
        "
      >
          <span>{label}</span>
          {hint && <span className="ml-1 text-neutral-600">{hint}</span>}
      </span>

      <div
        className="
          min-w-0

          [&_input]:box-border
          [&_input]:block
          [&_input]:h-[34px]
          [&_input]:w-full
          [&_input]:min-w-0
          [&_input]:max-w-full

          [&_input]:rounded-none
          [&_input]:border
          [&_input]:border-white/10
          [&_input]:bg-white/[0.02]

          [&_input]:px-2.5
          [&_input]:text-[11px]
          [&_input]:font-normal
          [&_input]:text-neutral-300

          [&_input]:outline-none
          [&_input]:transition-colors

          [&_input]:placeholder:text-neutral-600

          [&_input]:focus:border-white/25
          [&_input]:focus:bg-white/[0.035]

          [&_input]:disabled:cursor-not-allowed
          [&_input]:disabled:opacity-50

          [&_select]:box-border
          [&_select]:block
          [&_select]:w-full
          [&_select]:min-w-0
          [&_select]:max-w-full

          [&_textarea]:box-border
          [&_textarea]:block
          [&_textarea]:h-auto
          [&_textarea]:min-h-[96px]
          [&_textarea]:w-full
          [&_textarea]:min-w-0
          [&_textarea]:max-w-full
        "
      >
        {children}
      </div>
    </label>
  );
}

