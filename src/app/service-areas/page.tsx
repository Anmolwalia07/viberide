import Link from 'next/link';

import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Chauffeur Service Areas Melbourne & Victoria',
  description:
    'Discover VibeRide service areas across Melbourne and Victoria, including the CBD, Southbank, Docklands, Richmond, South Yarra, Toorak, Brighton and Mornington Peninsula.',
  path: '/service-areas',
});

const areas = [
  { name: 'Melbourne CBD', slug: 'melbourne-cbd', description: 'Private chauffeur transport for CBD meetings, hotels, events and executive travel.' },
  { name: 'Southbank', slug: 'southbank', description: 'Direct chauffeur access for office, hotel, entertainment and waterfront travel.' },
  { name: 'Docklands', slug: 'docklands', description: 'Corporate and private transfer support across Docklands commercial and residential districts.' },
  { name: 'Richmond', slug: 'richmond', description: 'Airport, city and local chauffeur routes across Richmond and nearby inner-city destinations.' },
  { name: 'St Kilda', slug: 'st-kilda', description: 'Smooth private travel for leisure, events and residential journeys across St Kilda.' },
  { name: 'South Yarra', slug: 'south-yarra', description: 'Premium comfort for shopping, residences, appointments and discreet personal travel.' },
  { name: 'Toorak', slug: 'toorak', description: 'Private chauffeur service for Toorak residential and business travel requirements.' },
  { name: 'Brighton', slug: 'brighton', description: 'Luxury chauffeur support for Brighton-based travel, events and airport connections.' },
  { name: 'Mornington Peninsula', slug: 'mornington-peninsula', description: 'Private transport for trips to and from the Mornington Peninsula across Victoria.' },
];

export default function ServiceAreasPage() {
  return (
    <main className="pt-28">
      <div className="container section">
        <div className="eyebrow">Service areas</div>
        <h1 className="serif mt-5 text-5xl md:text-7xl">Chauffeur Services Across Melbourne & Victoria</h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-300">
          VibeRide provides premium chauffeur services across key Melbourne locations and surrounding Victoria routes, including airport transfers, corporate programmes and private travel arrangements.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {areas.map((area) => (
            <article key={area.slug} className="card p-7">
              <div className="eyebrow">Service area</div>
              <h2 className="serif mt-5 text-3xl text-white">{area.name}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-400">{area.description}</p>
              <Link href={`/service-areas/${area.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#d2bd8e]">
                Explore {area.name}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/#quote-form" className="btn">Book a chauffeur</Link>
          <Link href="/services" className="btn secondary">Explore services</Link>
        </div>
      </div>
    </main>
  );
}
