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

const fleetOptions = [
  'Luxury Sedan',
  'Luxury SUV',
  'Luxury Van',
  'Minivan',
  'Coach bus',
  'No preference',
];

export function HomeBookingForm({
  requestType = 'QUOTED',
}: {
  requestType?: 'BOOKED' | 'QUOTED';
}) {
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
      form.get('largeExtraLuggage')
        ? 'Large extra suitcases'
        : '',
    ]
      .filter(Boolean)
      .join(', ');

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
      fleet: String(form.get('fleet') || 'No preference'),
      name: String(form.get('name') || ''),
      phone: String(form.get('phone') || ''),
      email: String(form.get('email') || ''),
      specialRequests,
      website: String(form.get('website') || ''),
    };

    try {
      const body = [
        `Request type: ${
          requestType === 'QUOTED' ? 'Quote' : 'Booking'
        }`,
        `Trip type: ${data.tripType}`,
        `Pickup: ${data.pickup}`,
        `Destination: ${data.destination}`,
        `Date: ${data.date}`,
        `Time: ${data.time}`,
        `Passengers: ${data.passengers}`,
        `Suitcases: ${data.luggage}`,
        `Fleet: ${data.fleet}`,
        `Vehicle: ${data.vehicle}`,
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Special requests: ${data.specialRequests}`,
      ].join('\n');

      window.location.href =
        `mailto:${site.email}?subject=${encodeURIComponent(
          'Website quote request'
        )}&body=${encodeURIComponent(body)}`;

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
      <div
        className="
          home-booking-panel
          w-full
          max-w-3xl
          min-w-0
          bg-black
          text-white
        "
      >
        <div className="flex items-start gap-3">
          <div className="success-icon shrink-0">
            <CheckCircle2 size={18} />
          </div>

          <div className="min-w-0">
            <div className="eyebrow">
              Request received
            </div>

            <h2 className="serif mt-0.5 text-lg text-white md:text-xl">
              Your quote request has been received.
            </h2>

            {bookingReference && (
              <p className="mt-2 text-[10px] uppercase tracking-[.14em] text-[#b9a47a]">
                Reference {bookingReference}
              </p>
            )}

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
        home-booking-panel
        w-full
        max-w-3xl
        min-w-0
        border
        border-white/10
        bg-black
        text-white
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
          <div className="eyebrow text-neutral-400">
            Private travel
          </div>

          <h2 className="serif mt-0.5 text-lg text-white md:text-xl">
            Get a Quote
          </h2>
        </div>

        <a
          href={`tel:${site.phone.replace(/\s+/g, '')}`}
          aria-label={`Call us at ${site.phone}`}
          className="
            inline-flex
            shrink-0
            items-center
            gap-1.5
            rounded
            bg-[#b9a47a]
            px-3.5
            py-1.5
            text-xs
            font-medium
            text-white
            transition-colors
            hover:bg-[#a69269]
            sm:text-[13px]
          "
        >
          <Phone size={12} />
          <span>{site.phone}</span>
        </a>
      </div>

      {/* =================================================
          FIELDS
      ================================================= */}

      <div
        className="
          mt-3
          grid
          min-w-0
          grid-cols-2
          gap-x-2
          gap-y-2.5
          lg:grid-cols-6
        "
      >
        {/* =================================================
            PICKUP
        ================================================= */}

        <div className="col-span-2 min-w-0 lg:col-span-3">
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

        <div className="col-span-2 min-w-0 lg:col-span-3">
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

        <div className="col-span-1 min-w-0 lg:col-span-3">
          <Field label="Date" hint="DD / MM / YYYY">
            <input
              name="date"
              type="date"
              required
              aria-label="Pickup date, day month year"
              onClick={(e) =>
                e.currentTarget.showPicker?.()
              }
              className="
                w-full
                min-w-0
                max-w-full
                appearance-none
              "
            />
          </Field>

          <p className="mt-1 text-[9px] text-neutral-500">
            Select your pickup date
          </p>
        </div>

        {/* =================================================
            TIME
        ================================================= */}

        <div className="col-span-1 min-w-0 lg:col-span-3">
          <Field label="Time" hint="HH:MM">
            <input
              name="time"
              type="time"
              required
              aria-label="Pickup time, hours and minutes"
              onClick={(e) =>
                e.currentTarget.showPicker?.()
              }
              className="
                w-full
                min-w-0
                max-w-full
                appearance-none
              "
            />
          </Field>

          <p className="mt-1 text-[9px] text-neutral-500">
            Select your pickup time
          </p>
        </div>

        {/* =================================================
            PASSENGERS
        ================================================= */}

        <div className="col-span-1 min-w-0 lg:col-span-2">
          <Field label="Passengers">
            <div
              className="
                flex
                h-[34px]
                w-full
                min-w-0
                items-center
                justify-between
                overflow-hidden
                border
                border-white/10
                !bg-black
                !text-white
              "
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            >
              <button
                type="button"
                aria-label="Decrease passengers"
                onClick={() =>
                  setPassengers(
                    Math.max(1, passengers - 1)
                  )
                }
                className="
                  flex
                  h-full
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  !bg-transparent
                  !text-white
                  text-base
                  font-normal
                  transition-colors
                  hover:!bg-white/10
                "
              >
                -
              </button>

              <output
                className="
                  flex
                  min-w-0
                  flex-1
                  items-center
                  justify-center
                  text-sm
                  font-normal
                  !text-white
                "
              >
                {passengers}
              </output>

              <button
                type="button"
                aria-label="Increase passengers"
                onClick={() =>
                  setPassengers(passengers + 1)
                }
                className="
                  flex
                  h-full
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  !bg-transparent
                  !text-white
                  text-base
                  font-normal
                  transition-colors
                  hover:!bg-white/10
                "
              >
                +
              </button>
            </div>
          </Field>
        </div>

        {/* =================================================
            SUITCASES
        ================================================= */}

        <div className="col-span-1 min-w-0 lg:col-span-2">
          <Field label="Suitcases">
            <div
              className="
                flex
                h-[34px]
                w-full
                min-w-0
                items-center
                justify-between
                overflow-hidden
                border
                border-white/10
                !bg-black
                !text-white
              "
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            >
              <button
                type="button"
                aria-label="Decrease suitcases"
                onClick={() =>
                  setLuggage(
                    Math.max(0, luggage - 1)
                  )
                }
                className="
                  flex
                  h-full
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  !bg-transparent
                  !text-white
                  text-base
                  font-normal
                  transition-colors
                  hover:!bg-white/10
                "
              >
                -
              </button>

              <output
                className="
                  flex
                  min-w-0
                  flex-1
                  items-center
                  justify-center
                  text-sm
                  font-normal
                  !text-white
                "
              >
                {luggage}
              </output>

              <button
                type="button"
                aria-label="Increase suitcases"
                onClick={() =>
                  setLuggage(luggage + 1)
                }
                className="
                  flex
                  h-full
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  !bg-transparent
                  !text-white
                  text-base
                  font-normal
                  transition-colors
                  hover:!bg-white/10
                "
              >
                +
              </button>
            </div>
          </Field>
        </div>

        {/* =================================================
            FLEET
        ================================================= */}

        <div className="col-span-2 min-w-0 lg:col-span-2">
          <Field label="Fleet">
            <select
              name="fleet"
              value={selectedFleet}
              onChange={(event) =>
                setSelectedFleet(event.target.value)
              }
              className="
                !block
                !h-[34px]
                !w-full
                !rounded-none
                !border
                !border-gray-300
                !bg-white
                !px-2.5
                !py-2
                !text-[11px]
                !text-black
                !font-bold
                !leading-4
                !outline-none
                focus:!border-[#b9a47a]
              "
            >
              <option
                value=""
                className="bg-white text-gray-500"
              >
                Select a fleet
              </option>

              {fleetOptions.map((fleet) => (
                <option
                  key={fleet}
                  value={fleet}
                  className="bg-white text-black"
                >
                  {fleet}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* =================================================
            FULL NAME
        ================================================= */}

        <div className="col-span-1 min-w-0 lg:col-span-3">
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

        <div className="col-span-1 min-w-0 lg:col-span-3">
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

        <div className="col-span-2 min-w-0 lg:col-span-6">
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

        <div className="col-span-2 min-w-0 lg:col-span-6">
          <Field
            label="Special instructions"
            hint="Optional"
          >
            <textarea
              name="specialRequests"
              rows={2}
              placeholder="Add anything else we should know about your journey like flight number, hotel name, etc."
            />
          </Field>
        </div>
      </div>

      {/* =================================================
          ADDITIONAL REQUIREMENTS
      ================================================= */}

      <div
        className="
          mt-3
          grid
          gap-2.5
          border-t
          border-white/10
          pt-4
          sm:grid-cols-2
        "
      >
        <span
          className="
            col-span-full
            mb-0.5
            text-[10px]
            font-medium
            uppercase
            tracking-[.18em]
            text-neutral-400
          "
        >
          Additional requirements{' '}
          <span className="text-[#b9a47a]">
            (optional)
          </span>
        </span>

        {/* BABY SEAT */}

        <label
          className="
            flex
            min-h-11
            items-center
            gap-3
            rounded border border-white/10 bg-white/[0.03] px-4 font-bold
            text-[13px]
            text-neutral-300
            transition-colors hover:border-[#b9a47a]/60 hover:bg-[#b9a47a]/[0.06] hover:text-white
            [&:has(input:checked)]:border-[#b9a47a]
            [&:has(input:checked)]:bg-[#b9a47a]/[0.14]
            [&:has(input:checked)]:text-white
          "
        >
          <input
            name="babySeat"
            type="checkbox"
            className="
              sr-only
              shrink-0
              cursor-pointer
            "
          />

          Baby seat [1 to 4 years]
        </label>

        {/* BOOSTER SEAT */}

        <label
          className="
            flex
            min-h-11
            items-center
            gap-3
            rounded border border-white/10 bg-white/[0.03] px-4 font-bold
            text-[13px]
            text-neutral-300
            transition-colors hover:border-[#b9a47a]/60 hover:bg-[#b9a47a]/[0.06] hover:text-white
            [&:has(input:checked)]:border-[#b9a47a]
            [&:has(input:checked)]:bg-[#b9a47a]/[0.14]
            [&:has(input:checked)]:text-white
          "
        >
          <input
            name="boosterSeat"
            type="checkbox"
            className="
              sr-only
              shrink-0
              cursor-pointer
            "
          />

          Booster seat [4 to 7 years]
        </label>

        {/* LARGE EXTRA SUITCASES */}

        <label
          className="
            flex
            min-h-11
            items-center
            gap-3
            rounded border border-white/10 bg-white/[0.03] px-4 font-bold
            text-[13px]
            text-neutral-300
            transition-colors hover:border-[#b9a47a]/60 hover:bg-[#b9a47a]/[0.06] hover:text-white
            [&:has(input:checked)]:border-[#b9a47a]
            [&:has(input:checked)]:bg-[#b9a47a]/[0.14]
            [&:has(input:checked)]:text-white
          "
        >
          <input
            name="largeExtraLuggage"
            type="checkbox"
            className="
              sr-only
              shrink-0
              cursor-pointer
            "
          />

          Large extra suitcases
        </label>
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
              {requestType === 'BOOKED'
                ? 'GET A QUOTE'
                : 'Get a Quote'}

              <ArrowUpRight size={13} />
            </>
          )}
        </button>

        <p
          className="
            text-center
            text-[8px]
            leading-3.5
            text-neutral-500
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
          text-neutral-400
        "
      >
        <span>{label}</span>

        {hint && (
          <span className="ml-1 text-neutral-500">
            {hint}
          </span>
        )}
      </span>

      <div
        className="
          min-w-0

          [&_input]:!box-border
          [&_input]:!block
          [&_input]:!h-[34px]
          [&_input]:!w-full
          [&_input]:!min-w-0
          [&_input]:!max-w-full
          [&_input]:!rounded-none
          [&_input]:!border
          [&_input]:!border-gray-300
          [&_input]:!bg-white
          [&_input]:!px-2.5
          [&_input]:!text-[11px]
          [&_input]:!font-normal
          [&_input]:!text-black
          [&_input]:!outline-none
          [&_input]:!placeholder:text-gray-500
          [&_input]:focus:!border-[#b9a47a]

          [&_select]:!box-border
          [&_select]:!block
          [&_select]:!h-[34px]
          [&_select]:!w-full
          [&_select]:!min-w-0
          [&_select]:!max-w-full
          [&_select]:!rounded-none
          [&_select]:!border
          [&_select]:!border-gray-300
          [&_select]:!bg-black
          [&_select]:!px-2.5
          [&_select]:!text-[11px]
          [&_select]:!text-white
          [&_select]:!outline-none
          [&_select]:focus:!border-[#b9a47a]

          [&_textarea]:!box-border
          [&_textarea]:!block
          [&_textarea]:!min-h-[46px]
          [&_textarea]:!w-full
          [&_textarea]:!min-w-0
          [&_textarea]:!max-w-full
          [&_textarea]:!rounded-none
          [&_textarea]:!border
          [&_textarea]:!border-gray-300
          [&_textarea]:!bg-white
          [&_textarea]:!px-2.5
          [&_textarea]:!py-2
          [&_textarea]:!text-[11px]
          [&_textarea]:!text-black
          [&_textarea]:!outline-none
          [&_textarea]:!placeholder:text-gray-500
          [&_textarea]:focus:!border-[#b9a47a]
        "
      >
        {children}
      </div>
    </label>
  );
}