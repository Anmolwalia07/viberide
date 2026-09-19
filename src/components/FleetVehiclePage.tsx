import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoJsonLd } from '@/components/SeoJsonLd';
import { fleet } from '@/config/site';
import type { PublicVehicle } from '@/lib/content';

export function FleetVehiclePage({ vehicle }: { vehicle: PublicVehicle }) {
  return (
    <main className="pt-28">
      <div className="container section">
        <Breadcrumbs items={[{ label: 'Fleet', href: '/fleet' }, { label: vehicle.title }]} />
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="relative aspect-[34/15] overflow-hidden rounded-3xl border border-white/10 bg-[#111214]">
            <Image src={vehicle.imageUrl || '/og-image.svg'} alt={`${vehicle.title} luxury chauffeur vehicle in Melbourne`} fill priority className="object-contain" sizes="(min-width: 1024px) 60vw, 100vw" />
          </div>
          <div>
            <div className="eyebrow">Veloura luxury fleet</div>
            <h1 className="serif mt-5 text-5xl md:text-7xl">{vehicle.title}</h1>
            <p className="mt-7 text-lg leading-8 text-neutral-300">{vehicle.description}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-[#111214] p-5"><div className="eyebrow">Capacity</div><p className="mt-2 text-xl text-white">{vehicle.capacity} passengers</p></div>
              <div className="rounded-2xl border border-white/10 bg-[#111214] p-5"><div className="eyebrow">Suitcases</div><p className="mt-2 text-xl text-white">{vehicle.luggageCapacity}+ suitcases</p></div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/#quote-form" className="btn">Request this vehicle</Link>
              <Link href="/fleet" className="btn secondary">View full fleet</Link>
            </div>
          </div>
        </div>
        <section className="mt-20 grid gap-6 md:grid-cols-2">
          <div className="card p-7"><div className="eyebrow">Why choose this vehicle</div><h2 className="serif mt-4 text-3xl">Comfort for every Melbourne journey</h2><p className="mt-4 leading-7 text-neutral-400">This vehicle is available with a professional Veloura chauffeur for airport transfers, executive meetings, hotel transfers, weddings, events and private point-to-point travel.</p></div>
          <div className="card p-7"><div className="eyebrow">Vehicle features</div><p className="mt-4 leading-7 text-neutral-300">{vehicle.features}</p><p className="mt-5 text-sm leading-6 text-neutral-500">Vehicle availability is confirmed at booking and may vary by date, route and passenger requirements.</p></div>
        </section>
        <section className="mt-20">
          <div className="eyebrow">More vehicles</div>
          <h2 className="serif mt-4 text-4xl">Explore the Veloura fleet</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {fleet.filter((item) => item.id !== vehicle.id).slice(0, 3).map((item) => (
              <Link key={item.id} href={`/fleet/${item.id}`} className="card group block p-4">
                <div className="relative aspect-[34/15] overflow-hidden rounded-2xl">
                  <Image src={item.imageUrl || '/og-image.svg'} alt={item.title} fill className="object-contain transition-transform duration-500 group-hover:scale-[1.02]" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <h3 className="serif mt-4 text-2xl transition-colors group-hover:text-[#d2bd8e]">{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>
        <SeoJsonLd data={{ '@context': 'https://schema.org', '@type': 'Car', name: vehicle.title, description: vehicle.description, image: vehicle.imageUrl ? [vehicle.imageUrl] : [], seatingCapacity: vehicle.capacity, brand: vehicle.title.split(' ')[0], offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: `https://velourachauffeurs.com.au/fleet/${vehicle.id}`, seller: { '@type': 'Organization', name: 'Veloura Chauffeurs' } } }} />
      </div>
    </main>
  );
}
