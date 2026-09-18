import type { MetadataRoute } from 'next';

import { site } from '@/config/site';

export const dynamic = 'force-static';

const routes = [
  '/',
  '/services',
  '/services/melbourne-airport-transfers',
  '/services/avalon-airport-transfers',
  '/services/corporate-chauffeur-melbourne',
  '/services/private-chauffeur-melbourne',
  '/services/point-to-point-chauffeur',
  '/services/hourly-chauffeur-melbourne',
  '/services/wedding-chauffeur-melbourne',
  '/services/luxury-car-with-driver-melbourne',
  '/service-areas',
  '/service-areas/melbourne-cbd',
  '/service-areas/southbank',
  '/service-areas/docklands',
  '/service-areas/richmond',
  '/service-areas/st-kilda',
  '/service-areas/south-yarra',
  '/service-areas/toorak',
  '/service-areas/brighton',
  '/service-areas/mornington-peninsula',
  '/fleet',
  '/about',
  '/privacy',
  '/terms',
  '/blog',
  '/blog/melbourne-airport-transfer-guide',
  '/blog/melbourne-airport-to-cbd-transfer',
  '/blog/avalon-airport-to-melbourne-transfer',
  '/services/airport-transfers',
  '/services/corporate-chauffeur',
  '/services/hourly-chauffeur',
  '/services/point-to-point',
  '/services/private-chauffeur',
  '/services/weddings-events',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url.replace(/\/$/, '');

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
