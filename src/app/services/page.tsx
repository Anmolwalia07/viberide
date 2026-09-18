import Link from 'next/link';

import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Premium Chauffeur Services Melbourne',
  description:
    'Explore Melbourne chauffeur services including airport transfers, corporate travel, private chauffeur bookings, hourly hire, point-to-point travel and wedding transport.',
  path: '/services',
});

export default async function ServicesPage() {
  return (
    <main className="pt-28">
      <div className="container section">
        <div className="eyebrow">Services</div>
        <h1 className="serif mt-5 max-w-4xl text-5xl md:text-7xl">Premium chauffeur services in Melbourne</h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-300">
          From airport transfers and executive travel to private journeys and special occasions, our chauffeur services are designed around comfort, reliability and clear communication.
        </p>

        <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-2">
          {[
            ['Melbourne Airport Transfers', 'Private pickup and drop-off for air travel, city travel and executive airport movements.', '/melbourne-airport-transfers'],
            ['Avalon Airport Transfers', 'Relaxed private airport transport for business and personal travel between Avalon and Melbourne.', '/avalon-airport-transfers'],
            ['Corporate Chauffeur', 'Executive chauffeur service for meetings, conferences, client travel and airport journeys.', '/corporate-chauffeur-melbourne'],
            ['Private Chauffeur', 'Convenient private chauffeur bookings for city travel, appointments and tailored journeys.', '/private-chauffeur-melbourne'],
            ['Point-to-Point Chauffeur', 'Direct one-way or scheduled private chauffeur transport between two locations.', '/point-to-point-chauffeur'],
            ['Hourly Chauffeur', 'Flexible chauffeur hire for meetings, shopping, business travel and multi-stop days.', '/hourly-chauffeur-melbourne'],
            ['Wedding & Event Chauffeur', 'Premium transport for weddings, celebrations, guest movements and elegant arrival experiences.', '/wedding-chauffeur-melbourne'],
            ['Luxury Car With Driver', 'Luxury travel for private appointments, business days and premium occasions in Melbourne.', '/luxury-car-with-driver-melbourne'],
          ].map(([title, description, href], index) => (
            <Link key={title} href={href} className="group block min-h-[220px] bg-[#0b0c0d] p-8 transition hover:bg-[#101213]">
              <div className="text-xs text-[#b9a47a]">0{index + 1}</div>
              <h2 className="serif mt-10 text-3xl text-white">{title}</h2>
              <p className="mt-4 text-sm leading-6 text-neutral-400">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
