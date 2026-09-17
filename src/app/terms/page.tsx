import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | VideRide Chauffeurs',
  description: 'Terms and conditions for booking and traveling with VideRide Chauffeurs.',
  alternates: {
    canonical: '/terms',
  },
};

export default function Terms() {
  return (
    <main className="pt-28">
      <div className="container section max-w-3xl">
        <div className="eyebrow">Legal · review required</div>
        <h1 className="serif mt-5 text-6xl">Terms & Conditions</h1>
        <p className="mt-8 text-neutral-400 leading-7">
          This placeholder must be reviewed by the business and its legal adviser before production. It intentionally does not invent fares, cancellation rules, waiting periods, liability terms or payment conditions.
        </p>
        <div className="mt-10 grid gap-5">
          {['Bookings', 'Pricing & payment', 'Cancellations', 'Passenger responsibilities', 'Liability', 'Privacy'].map(x => (
            <div key={x} className="card p-6">
              <h2 className="serif text-2xl">{x}</h2>
              <p className="mt-2 text-sm text-neutral-500">Business-approved terms required.</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
