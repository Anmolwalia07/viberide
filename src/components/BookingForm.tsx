'use client';

import { useEffect, useRef, useState } from 'react';
import { bookingSchema, type BookingInput } from '@/lib/validation';
import { track } from '@/lib/analytics';

const steps = [
  { title: 'Trip', subtitle: 'Choose your service' },
  { title: 'Journey', subtitle: 'Where are you travelling?' },
  { title: 'Schedule', subtitle: 'Choose your time' },
  { title: 'Vehicle', subtitle: 'Select your vehicle' },
  { title: 'Details', subtitle: 'Your contact details' },
  { title: 'Review', subtitle: 'Confirm your journey' },
];

const tripTypes = [
  {
    name: 'Airport Transfer',
    description: 'Melbourne Airport, Avalon or private terminal transfers',
    icon: '✈',
  },
  {
    name: 'Point-to-Point',
    description: 'Private chauffeur between Melbourne locations',
    icon: '↗',
  },
  {
    name: 'Corporate',
    description: 'Executive travel across Melbourne',
    icon: '▣',
  },
  {
    name: 'Event',
    description: 'Weddings, events and special occasions',
    icon: '◇',
  },
  {
    name: 'Hourly Chauffeur',
    description: 'A dedicated chauffeur at your service',
    icon: '◷',
  },
  {
    name: 'Other',
    description: 'Tell us about your requirements',
    icon: '＋',
  },
];

const fallbackVehicles = [
  {
    name: 'Mercedes-Benz E-Class',
    category: 'Executive Sedan',
    description: 'Premium business travel',
    capacity: 3,
  },
  {
    name: 'Audi Q7',
    category: 'Luxury Sedan',
    description: 'Refined comfort with generous space',
    capacity: 6,
  },
  {
    name: 'Mercedes-Benz V-Class',
    category: 'Luxury Van',
    description: 'Ideal for families and groups',
    capacity: 7,
  },
];

const fleetNames = ['Luxury Sedan', 'Executive Sedan', 'Luxury Van', 'No preference'] as const;

type BookingVehicle = {
  id?: string;
  name: string;
  category: string;
  description: string;
  capacity?: number;
};

const melbourneLocations = [
  'Melbourne CBD',
  'Southbank',
  'Docklands',
  'Richmond',
  'St Kilda',
  'Melbourne Airport',
];

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [locating, setLocating] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState<string>('');
  const [availableVehicles, setAvailableVehicles] = useState<BookingVehicle[]>(fallbackVehicles);
  const stepContentRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [data, setData] = useState<BookingInput>({
      requestType: 'BOOKED',
    tripType: 'Airport Transfer',
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: 1,
    luggage: 0,
    vehicle: '',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  useEffect(() => {
    let active = true;
    void fetch('/api/vehicles').then(async (response) => {
      if (!response.ok) return;
      const result = await response.json();
      if (active && Array.isArray(result.data) && result.data.length) {
        const nextVehicles: BookingVehicle[] = result.data.map((vehicle: { id: string; name: string; category: string; description?: string; passenger_capacity?: number }) => ({
          id: vehicle.id,
          name: vehicle.name,
          category: vehicle.category,
          description: vehicle.description ?? '',
          capacity: vehicle.passenger_capacity,
        }));
        setAvailableVehicles(nextVehicles);
        setData((current) => ({
          ...current,
          vehicle: nextVehicles.some((vehicle) => vehicle.name === current.vehicle)
            ? current.vehicle
            : nextVehicles[0]?.name ?? current.vehicle,
        }));
      }
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  const vehiclesForFleet = selectedFleet === 'No preference'
    ? availableVehicles
    : availableVehicles.filter((vehicle) => vehicle.category.toLowerCase() === selectedFleet.toLowerCase());

  const selectedVehicle = availableVehicles.find((vehicle) => vehicle.name === data.vehicle);

  const update = (key: keyof BookingInput, value: string | number) => {
    setData((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  /*
   * Get user's current location.
   *
   * This uses the browser's native Geolocation API.
   * The browser will ask the customer for permission.
   */
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrors({
        pickup:
          'Location services are not supported by your browser. Please enter your pickup address manually.',
      });
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          /*
           * Your backend can reverse-geocode these coordinates.
           *
           * We call /api/geocode here rather than exposing a
           * Google Maps / Mapbox API key in the browser.
           */
          const response = await fetch(
            `/api/geocode?lat=${latitude}&lng=${longitude}`
          );

          if (!response.ok) {
            throw new Error('Geocoding failed');
          }

          const result = await response.json();

          if (result.address) {
            update('pickup', result.address);
          } else {
            update(
              'pickup',
              `Current location (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`
            );
          }
        } catch {
          /*
           * Even if reverse geocoding isn't configured yet,
           * retain the coordinates instead of losing the location.
           */
          update(
            'pickup',
            `Current location (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`
          );
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);

        setErrors({
          pickup:
            'We could not access your location. Please allow location access or enter your pickup address manually.',
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!data.pickup.trim()) {
        newErrors.pickup = 'Pickup location is required';
      }

      if (!data.destination.trim()) {
        newErrors.destination = 'Destination is required';
      }
    }

    if (step === 2) {
      if (!data.date) {
        newErrors.date = 'Please select a date';
      }

      if (!data.time) {
        newErrors.time = 'Please select a pickup time';
      }
    }

    if (step === 3) {
      if (!data.passengers || data.passengers < 1) {
        newErrors.passengers = 'At least 1 passenger is required';
      }

      if (!data.vehicle) {
        newErrors.vehicle = 'Please select a vehicle';
      }
    }

    if (step === 4) {
      if (!data.name.trim()) {
        newErrors.name = 'Your name is required';
      }

      if (!data.email.trim()) {
        newErrors.email = 'Your email is required';
      }

      if (!data.phone.trim()) {
        newErrors.phone = 'Your phone number is required';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const next = async () => {
    track('booking_started', { step });

    if (!validateStep()) return;

    if (step < 5) {
      setStep((current) => current + 1);
      requestAnimationFrame(() => {
        stepContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }

    const result = bookingSchema.safeParse(data);

    if (!result.success) {
      alert('Please complete the required fields before submitting.');
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error('submit');
      }

      const responseData = await response.json();
      setBookingReference(responseData.bookingReference ?? '');
      setDone(true);
      track('booking_submitted');
    } catch {
      alert(
        'We could not submit your request. Please try again or contact us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const back = () => {
    setErrors({});
    setStep((current) => Math.max(0, current - 1));
    requestAnimationFrame(() => {
      stepContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  if (done) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101111] p-8 md:p-14">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#b9a47a]/10 blur-3xl" />

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#b9a47a]/40 bg-[#b9a47a]/10 text-xl text-[#b9a47a]">
            ✓
          </div>

          <div className="mt-8 text-[10px] uppercase tracking-[0.25em] text-[#b9a47a]">
            Request received
          </div>

          {bookingReference && <div className="mt-3 text-xs uppercase tracking-[0.16em] text-[#b9a47a]">Reference {bookingReference}</div>}

          <h2 className="serif mt-4 max-w-2xl text-4xl leading-tight text-white md:text-5xl">
            Your Melbourne journey starts here.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400">
            Thank you for your enquiry. Our Melbourne chauffeur team will
            review your journey and contact you using the details provided.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              What happens next
            </div>

            <div className="mt-4 space-y-4">
              {[
                'We review your Melbourne journey details',
                'We confirm vehicle availability',
                'We contact you with your personalised confirmation',
              ].map((item, index) => (
                <div key={item} className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-[10px] text-[#b9a47a]">
                    {index + 1}
                  </span>

                  <span className="text-sm text-neutral-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-xs leading-6 text-neutral-500">
            No exact fare has been promised because live pricing is not
            currently configured.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#101111] shadow-2xl shadow-black/20">
      {/* Progress */}
      <div className="border-b border-white/10 px-5 py-5 md:px-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#b9a47a]">
              Melbourne private chauffeur
            </div>

            <div className="mt-1 text-sm text-neutral-400">
              Step {step + 1} of {steps.length}
            </div>
          </div>

          <div className="hidden text-right sm:block">
            <div className="text-sm text-white">
              {steps[step].title}
            </div>

            <div className="mt-1 text-xs text-neutral-500">
              {steps[step].subtitle}
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          {steps.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                if (index < step) {
                  setStep(index);
                  setErrors({});
                }
              }}
              className="group flex-1"
            >
              <div
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  index <= step
                    ? 'bg-[#b9a47a]'
                    : 'bg-white/10'
                }`}
              />

              <div
                className={`mt-2 hidden text-[9px] uppercase tracking-[0.12em] sm:block ${
                  index === step
                    ? 'text-[#b9a47a]'
                    : index < step
                      ? 'text-neutral-400'
                      : 'text-neutral-700'
                }`}
              >
                {item.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div ref={stepContentRef} className="scroll-mt-6 p-6 md:scroll-mt-10 md:p-10">
        {/* STEP 0 */}
        {step === 0 && (
          <StepContainer
            eyebrow="01 — Trip"
            title="Where can we take you?"
            description="Private chauffeur services across Melbourne and Victoria."
          >
            <div className="booking-trip-options grid grid-cols-2 gap-2.5 sm:gap-3">
              {tripTypes.map((trip) => (
                <SelectionCard
                  key={trip.name}
                  selected={data.tripType === trip.name}
                  onClick={() => update('tripType', trip.name)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-base text-[#b9a47a] sm:h-11 sm:w-11 sm:rounded-xl sm:text-lg">
                      {trip.icon}
                    </div>

                    <div>
                      <div className="text-xs font-medium text-white sm:text-sm">
                        {trip.name}
                      </div>

                      <div className="mt-0.5 hidden text-[10px] leading-4 text-neutral-500 sm:mt-1 sm:block sm:text-xs sm:leading-5">
                        {trip.description}
                      </div>
                    </div>

                    {data.tripType === trip.name && (
                      <div className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#b9a47a] text-[10px] text-black">
                        ✓
                      </div>
                    )}
                  </div>
                </SelectionCard>
              ))}
            </div>

          </StepContainer>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <StepContainer
            eyebrow="02 — Journey"
            title="Where are you travelling?"
            description="Enter your Melbourne pickup and destination."
          >
            <div className="grid gap-5">
              <div>
                <PremiumField
                  label="Pickup location"
                  error={errors.pickup}
                  hint="Address, hotel, venue or airport"
                >
                  <div className="relative">
                    <input
                      value={data.pickup}
                      onChange={(e) =>
                        update('pickup', e.target.value)
                      }
                      placeholder="e.g. Melbourne Airport Terminal 2"
                      autoComplete="street-address"
                      className="pr-14"
                    />

                    <button
                      type="button"
                      onClick={useCurrentLocation}
                      disabled={locating}
                      aria-label="Use my current location"
                      title="Use my current location"
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#b9a47a] transition hover:border-[#b9a47a]/50 hover:bg-[#b9a47a]/10 disabled:cursor-wait disabled:opacity-50"
                    >
                      {locating ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#b9a47a]/30 border-t-[#b9a47a]" />
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 2v3" />
                          <path d="M12 19v3" />
                          <path d="M2 12h3" />
                          <path d="M19 12h3" />
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                      )}
                    </button>
                  </div>
                </PremiumField>

              </div>

              <div className="flex justify-center -my-2 relative z-10">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#101111] text-[#b9a47a]">
                  ↓
                </div>
              </div>

              <PremiumField
                label="Destination"
                error={errors.destination}
                hint="Address, hotel, venue or airport"
              >
                <input
                  value={data.destination}
                  onChange={(e) =>
                    update('destination', e.target.value)
                  }
                  placeholder="e.g. Melbourne CBD"
                  autoComplete="street-address"
                />
              </PremiumField>
            </div>

            <div className="mt-6">
              <div className="mb-3 text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                Popular Melbourne destinations
              </div>

              <div className="flex flex-wrap gap-2">
                {melbourneLocations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => update('destination', location)}
                    className={`rounded-full border px-3 py-2 text-[10px] transition ${
                      data.destination.trim().toLowerCase() === location.toLowerCase()
                        ? 'border-[#b9a47a] bg-[#b9a47a]/15 text-[#d8c28f]'
                        : 'border-white/10 text-neutral-500 hover:border-[#b9a47a]/40 hover:text-white'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>

          </StepContainer>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <StepContainer
            eyebrow="03 — Schedule"
            title="When should your chauffeur arrive?"
            description="Choose your preferred pickup date and time."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <PremiumField
                label="Pickup date"
                error={errors.date}
                hint="DD / MM / YYYY"
              >
                <input
                  type="date"
                  aria-label="Pickup date, day month year"
                  value={data.date}
                  min={new Date()
                    .toISOString()
                    .split('T')[0]}
                  onChange={(e) =>
                    update('date', e.target.value)
                  }
                  onClick={(e) => e.currentTarget.showPicker?.()}
                  className="block w-full min-w-0 max-w-full"
                />
              </PremiumField>

              <PremiumField
                label="Pickup time"
                error={errors.time}
                hint="HH:MM"
              >
                <input
                  type="time"
                  aria-label="Pickup time, hours and minutes"
                  value={data.time}
                  onChange={(e) =>
                    update('time', e.target.value)
                  }
                  onClick={(e) => e.currentTarget.showPicker?.()}
                  className="block w-full min-w-0 max-w-full"
                />
              </PremiumField>
            </div>

            {data.tripType === 'Airport Transfer' && (
              <div className="mt-6 rounded-2xl border border-[#b9a47a]/20 bg-[#b9a47a]/5 p-5">
                <div className="flex gap-3">
                  <span className="text-[#b9a47a]">✈</span>

                  <div>
                    <div className="text-sm text-white">
                      Flying into Melbourne?
                    </div>

                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      Include your flight number in Special
                      requests so our team can coordinate your
                      airport pickup.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </StepContainer>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <StepContainer
            eyebrow="04 — Vehicle"
            title="Travel in comfort."
            description="Tell us about your party and choose your preferred vehicle."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <CounterField
                label="Passengers"
                value={data.passengers}
                min={1}
                onChange={(value) =>
                  update('passengers', value)
                }
                error={errors.passengers}
              />

              <CounterField
                label="Luggage"
                value={data.luggage}
                min={0}
                onChange={(value) =>
                  update('luggage', value)
                }
              />
            </div>

            <div className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <PremiumField label="Fleet">
                  <select
                    value={selectedFleet}
                    onChange={(event) => {
                      const nextFleet = event.target.value;
                      const firstVehicle = (nextFleet === 'No preference' ? availableVehicles : availableVehicles.filter((vehicle) => vehicle.category.toLowerCase() === nextFleet.toLowerCase()))[0];
                      setSelectedFleet(nextFleet);
                      if (firstVehicle) update('vehicle', '');
                    }}
                    aria-label="Fleet"
                    className="block w-full min-w-0 max-w-full"
                  >
                    <option value="" disabled>Select a fleet</option>
                    {fleetNames.map((fleet) => (
                      <option key={fleet} value={fleet}>{fleet}</option>
                    ))}
                  </select>
                </PremiumField>

                <PremiumField label="Available vehicle">
                <select
                  value={data.vehicle}
                  onChange={(event) => update('vehicle', event.target.value)}
                  aria-label="Available vehicle"
                  disabled={!selectedFleet}
                  className="block w-full min-w-0 max-w-full"
                >
                  <option value="" disabled>{selectedFleet ? 'Select a vehicle' : 'Select a fleet first'}</option>
                  {selectedFleet && <option value="No preference">No preference</option>}
                  {vehiclesForFleet.map((vehicle) => (
                    <option key={vehicle.name} value={vehicle.name}>
                      {vehicle.name}
                    </option>
                  ))}
                </select>
                </PremiumField>
              </div>
              <p className="mt-2 text-xs leading-5 text-neutral-500">
                {selectedVehicle?.description ?? 'Choose a fleet and vehicle to continue.'}
              </p>
            </div>
          </StepContainer>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <StepContainer
            eyebrow="05 — Your details"
            title="How can we reach you?"
            description="We'll use these details to confirm your Melbourne journey."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <PremiumField
                label="Full name"
                error={errors.name}
              >
                <input
                  value={data.name}
                  onChange={(e) =>
                    update('name', e.target.value)
                  }
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </PremiumField>

              <PremiumField
                label="Phone number"
                error={errors.phone}
              >
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) =>
                    update('phone', e.target.value)
                  }
                  placeholder="+61 4XX XXX XXX"
                  autoComplete="tel"
                />
              </PremiumField>

              <div className="sm:col-span-2">
                <PremiumField
                  label="Email address"
                  error={errors.email}
                >
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) =>
                      update('email', e.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </PremiumField>
              </div>

              <div className="sm:col-span-2">
                <PremiumField
                  label="Special requests"
                  hint="Optional"
                >
                  <textarea
                    rows={5}
                    value={data.specialRequests}
                    onChange={(e) =>
                      update(
                        'specialRequests',
                        e.target.value
                      )
                    }
                    placeholder="Flight number, child seat, accessibility requirements, additional stops, event details..."
                  />
                </PremiumField>
              </div>
            </div>
          </StepContainer>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <StepContainer
            eyebrow="06 — Review"
            title="Review your Melbourne journey."
            description="Check your details before sending your chauffeur request."
          >
            <div className="space-y-3">
              <ReviewSection
                title="Journey"
                onEdit={() => setStep(1)}
                items={[
                  ['Trip type', data.tripType],
                  ['Pickup', data.pickup],
                  ['Destination', data.destination],
                ]}
              />

              <ReviewSection
                title="Schedule"
                onEdit={() => setStep(2)}
                items={[
                  ['Date', data.date || 'Not selected'],
                  ['Time', data.time || 'Not selected'],
                ]}
              />

              <ReviewSection
                title="Vehicle"
                onEdit={() => setStep(3)}
                items={[
                  ['Vehicle', data.vehicle],
                  ['Passengers', String(data.passengers)],
                  ['Luggage', String(data.luggage)],
                ]}
              />

              <ReviewSection
                title="Contact"
                onEdit={() => setStep(4)}
                items={[
                  ['Name', data.name],
                  ['Email', data.email],
                  ['Phone', data.phone],
                ]}
              />
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                Special requests
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-neutral-300">
                {data.specialRequests || 'None provided'}
              </p>
            </div>
          </StepContainer>
        )}

        {/* ACTIONS */}
        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
          <button
            type="button"
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-neutral-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            disabled={step === 0 || submitting}
            onClick={back}
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>

            Back
          </button>

          <button
            type="button"
            disabled={submitting || locating}
            onClick={next}
            className="group flex min-h-[52px] items-center gap-4 rounded-full bg-white px-7 text-xs font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#b9a47a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? 'Sending...'
              : step === 5
                ? 'Submit request'
                : 'Continue'}

            {!submitting && (
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            )}
          </button>
        </div>

        <div className="mt-5 text-center text-[10px] uppercase tracking-[0.12em] text-neutral-600">
          Melbourne • Victoria • Private chauffeur service
        </div>
      </div>

      <style jsx>{`
        input,
        textarea {
          width: 100%;
          border: 1px solid #292b2c;
          background: #0c0e0f;
          color: #fff;
          padding: 16px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.5;
          outline: none;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        input::placeholder,
        textarea::placeholder {
          color: #555;
        }

        input:hover,
        textarea:hover {
          border-color: #3b3d3e;
        }

        input:focus,
        textarea:focus {
          border-color: #b9a47a;
          background: #101213;
          box-shadow: 0 0 0 3px rgba(185, 164, 122, 0.08);
        }

        input[type='date'],
        input[type='time'] {
          color-scheme: dark;
        }

        textarea {
          resize: vertical;
          min-height: 130px;
        }
      `}</style>
    </div>
  );
}

/* -------------------------------- */
/* Step container                    */
/* -------------------------------- */

function StepContainer({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-[fadeIn_.25s_ease-out]">
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#b9a47a]">
          {eyebrow}
        </div>

        <h2 className="serif mt-3 text-3xl leading-tight text-white md:text-4xl">
          {title}
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

/* -------------------------------- */
/* Selection card                    */
/* -------------------------------- */

function SelectionCard({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`booking-selection-card w-full rounded-xl border p-3 text-left transition-all duration-200 sm:rounded-2xl sm:p-5 ${
        selected
          ? 'border-[#b9a47a]/60 bg-[#b9a47a]/[0.07]'
          : 'border-white/10 bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.03]'
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------- */
/* Premium field                     */
/* -------------------------------- */

function PremiumField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.17em] text-neutral-400">
          {label}
        </span>

        {hint && (
          <span className="text-[10px] text-neutral-600">
            {hint}
          </span>
        )}
      </div>

      {children}

      {error && (
        <span className="text-xs text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}

/* -------------------------------- */
/* Counter                            */
/* -------------------------------- */

function CounterField({
  label,
  value,
  min,
  onChange,
  error,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="mb-2 text-[10px] uppercase tracking-[0.17em] text-neutral-400">
        {label}
      </div>

      <div className="flex h-[58px] items-center justify-between rounded-2xl border border-white/10 bg-[#0c0e0f] px-3">
        <button
          type="button"
          onClick={() =>
            onChange(Math.max(min, value - 1))
          }
          disabled={value <= min}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-lg text-neutral-400 transition hover:border-[#b9a47a] hover:text-white disabled:opacity-20"
        >
          −
        </button>

        <div className="text-lg text-white">
          {value}
        </div>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-lg text-neutral-400 transition hover:border-[#b9a47a] hover:text-white"
        >
          +
        </button>
      </div>

      {error && (
        <div className="mt-2 text-xs text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}

/* -------------------------------- */
/* Review section                    */
/* -------------------------------- */

function ReviewSection({
  title,
  items,
  onEdit,
}: {
  title: string;
  items: [string, string][];
  onEdit: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.18em] text-[#b9a47a]">
          {title}
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="text-[10px] uppercase tracking-[0.15em] text-neutral-600 transition hover:text-white"
        >
          Edit
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="grid gap-1 border-b border-white/5 pb-3 last:border-0 last:pb-0 sm:grid-cols-[140px_1fr]"
          >
            <span className="text-xs text-neutral-600">
              {label}
            </span>

            <span className="break-words text-sm text-neutral-200">
              {value || '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}