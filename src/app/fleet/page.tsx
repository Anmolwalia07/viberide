import Image from 'next/image';

import { getSiteContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Luxury Fleet | Veloura Chauffeurs Melbourne',
  description: 'Explore our fleet of premium European vehicles including Mercedes-Benz and Audi, available for private chauffeur hire across Melbourne.',
  path: '/fleet',
});

const fleetImages = [
  'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
];

export default function Fleet() {
  const { fleet } = getSiteContent();
  return (
    <main className="pt-28">
      <div className="container section">
        <div className="eyebrow">Fleet</div>

        <h1 className="serif mt-5 text-6xl md:text-8xl">
          The right car
          <br />
          <em>for the moment.</em>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
          Vehicle categories are ready for verified models, capacities and
          availability to be added by the business.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {fleet.map((vehicle, i) => (
            <article className="card p-5" key={vehicle.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={vehicle.imageUrl || fleetImages[i % fleetImages.length]}
                  alt={vehicle.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <div className="eyebrow">Vehicle</div>

                <h2 className="serif mt-2 text-3xl">
                  {vehicle.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {vehicle.description}
                </p>

                <div className="mt-5 flex gap-5 text-xs text-neutral-500">
                  <span>{vehicle.capacity} passengers</span>
                  <span>{vehicle.luggageCapacity} luggage</span>
                </div>

                <p className="mt-5 text-xs text-neutral-500">
                  {vehicle.features}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}