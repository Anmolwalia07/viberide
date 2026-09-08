import BookingForm from '@/components/BookingForm';

export default function Booking() {
  return (
    <main className="booking-page pt-20 md:pt-28">
      <div className="container section">
        <div className="eyebrow">Booking & quote</div>

        <h1 className="serif mt-5 text-6xl md:text-8xl">
          Tell us about
          <br />
          <em>your journey.</em>
        </h1>

        <p className="mt-7 max-w-2xl text-neutral-400">
          Request a chauffeur and the team can review your journey, vehicle
          preference and requirements. This form does not calculate or promise
          an exact fare.
        </p>

        <div className="mt-14">
          <BookingForm />
        </div>
      </div>
    </main>
  );
}