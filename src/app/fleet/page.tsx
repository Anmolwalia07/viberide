import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getSiteContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Luxury Fleet | Veloura Chauffeurs Melbourne',
  description: 'Explore our fleet of premium European vehicles including Mercedes-Benz and Audi, available for private chauffeur hire across Melbourne.',
  path: '/fleet',
});

export default function Fleet() {
  const { fleet } = getSiteContent();
  return (
    <main className="pt-28">
      <div className="container section">
        <Breadcrumbs items={[{ label: 'Fleet' }]} />
        <div className="eyebrow">Fleet</div>

        <h1 className="serif mt-5 text-6xl md:text-8xl">
          The right car
          <br />
          <em>for the moment.</em>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
          Explore a carefully selected fleet of premium Audi, BMW and Mercedes-Benz
          vehicles for Melbourne airport transfers, corporate travel, private
          chauffeur hire and group journeys.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {fleet.map((vehicle) => (
            <Link href={`/fleet/${vehicle.id}`} className="card group block p-5 transition-transform duration-300 hover:-translate-y-1" key={vehicle.id}>
              <div className="relative aspect-[34/15] overflow-hidden rounded-2xl">
                <Image
                  src={vehicle.imageUrl || '/og-image.svg'}
                  alt={vehicle.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>

              <div className="p-4">
                <div className="eyebrow">Vehicle</div>

                <h2 className="serif mt-2 text-3xl transition-colors group-hover:text-[#d2bd8e]">
                  {vehicle.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {vehicle.description}
                </p>

                <div className="mt-5 flex gap-5 text-xs text-neutral-500">
                  <span>{vehicle.capacity} passengers</span>
                  <span>{vehicle.luggageCapacity} suitcases</span>
                </div>

                <p className="mt-5 text-xs text-neutral-500">
                  {vehicle.features}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}