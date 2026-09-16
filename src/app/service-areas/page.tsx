import Link from 'next/link';
import { getSiteContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Areas | Veloura Chauffeurs Melbourne',
  description: 'View our verified operating areas across Melbourne and Victoria for private chauffeur journeys, airport transfers and corporate travel.',
  alternates: {
    canonical: '/service-areas',
  },
  openGraph: {
    title: 'Service Areas | Veloura Chauffeurs Melbourne',
    description: 'View our verified operating areas across Melbourne and Victoria for private chauffeur journeys, airport transfers and corporate travel.',
    url: 'https://veloura-chauffeurs.vercel.app/service-areas',
  }
};

export default async function Areas() {
  const { areas } = getSiteContent();
  return (
    <main className="pt-28">
      <div className="container section">
        <div className="eyebrow">Service areas</div>
        <h1 className="serif mt-5 text-6xl md:text-8xl">
          Wherever the<br />
          <em>journey leads.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-neutral-400 leading-7">
          Verified operating areas for private chauffeur journeys, airport transfers and corporate travel across Melbourne.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {areas.map((area) => (
            <div key={area.id} className="card p-8">
              <div className="eyebrow">Service area</div>
              <h2 className="serif mt-5 text-3xl">{area.name}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-400">
                {area.description}
              </p>
            </div>
          ))}
        </div>
        <Link href="/#quote-form" className="btn mt-10">
          GET A QUOTE
        </Link>
      </div>
    </main>
  );
}
