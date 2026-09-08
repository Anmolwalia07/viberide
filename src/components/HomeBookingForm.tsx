'use client';

import { FormEvent, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { track } from '@/lib/analytics';

export function HomeBookingForm({ requestType = 'QUOTED' }: { requestType?: 'BOOKED' | 'QUOTED' }) {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [bookingReference, setBookingReference] = useState('');

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

    const specialRequests = form
      .getAll('specialRequests')
      .map(String)
      .filter(Boolean);

    const data = {
      requestType,
      tripType: 'Point-to-Point',
      pickup: String(form.get('pickup') || ''),
      destination: String(form.get('destination') || ''),
      date: String(form.get('date') || ''),
      time: String(form.get('time') || ''),
      passengers: 1,
      luggage: 0,
      vehicle: 'No preference',
      name: String(form.get('name') || ''),
      phone: String(form.get('phone') || ''),
      email: String(form.get('email') || ''),
      specialRequests: specialRequests.join(', '),
      website: String(form.get('website') || ''),
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Unable to submit');
      }

      const result = await res.json();
      setBookingReference(result.bookingReference ?? '');
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
      onSubmit={submit}
      onFocus={begin}
      className="
        home-booking-panel
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
            Request your chauffeur
          </h2>
        </div>

        <span
          className="
            hidden
            shrink-0
            text-[8px]
            uppercase
            tracking-[.14em]
            text-neutral-600
            sm:block
          "
        >
          Fast enquiry
        </span>
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
          grid-cols-2
          gap-x-2
          gap-y-2.5
        "
      >
        <p className="col-span-2 text-xs leading-5 text-neutral-500">Start with the essentials. We will confirm availability and details with you directly.</p>
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
          <Field label="Date">
            <input
              name="date"
              type="date"
              required
            />
          </Field>
        </div>

        {/* =================================================
            TIME
        ================================================= */}

        <div className="col-span-1 min-w-0">
          <Field label="Time">
            <input
              name="time"
              type="time"
              required
            />
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
          <div className="grid gap-1.5">
            <span className="text-[8px] uppercase tracking-[.12em] text-neutral-500">Special requests <span className="ml-1 text-[#b9a47a]">(optional)</span></span>

            <div
              className="
                grid
                grid-cols-2
                gap-x-2
                gap-y-0

                sm:grid-cols-3

                md:flex
                md:flex-wrap
                md:gap-x-4
              "
            >
              <Checkbox
                name="specialRequests"
                value="Child seat"
                label="Child seat"
              />

              <Checkbox
                name="specialRequests"
                value="Booster seat"
                label="Booster seat"
              />

              <Checkbox
                name="specialRequests"
                value="Meet & greet"
                label="Meet & greet"
              />

              <Checkbox
                name="specialRequests"
                value="Extra luggage"
                label="Extra luggage"
              />

              <Checkbox
                name="specialRequests"
                value="Airport assistance"
                label="Airport assistance"
              />

              <Checkbox
                name="specialRequests"
                value="Other"
                label="Other"
              />
            </div>
          </div>
        </div>
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
              {requestType === 'BOOKED' ? 'Book a Chauffeur' : 'Get a Quote'}
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
  children,
}: {
  label: string;
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
        {label}
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
        "
      >
        {children}
      </div>
    </label>
  );
}

/* =======================================================
   CHECKBOX
======================================================= */

function Checkbox({
  name,
  value,
  label,
}: {
  name: string;
  value: string;
  label: string;
}) {
  return (
    <label
      className="
        flex
        min-w-0
        cursor-pointer
        items-center
        gap-1.5
        py-0.5
        text-neutral-500
        transition-colors
        hover:text-neutral-300
      "
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        className="
          h-3
          w-3
          shrink-0
          cursor-pointer
          accent-white
        "
      />

      <span
        className="
          min-w-0
          text-[9px]
          leading-4
          tracking-normal
        "
      >
        {label}
      </span>
    </label>
  );
}
