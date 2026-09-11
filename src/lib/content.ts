import { fleet as fallbackFleet, services as fallbackServices, site } from '@/config/site';

export type PublicService = [string, string, string];
export type PublicVehicle = {
  id: string;
  title: string;
  description: string;
  capacity: number;
  luggageCapacity: number;
  features: string;
  imageUrl?: string;
};
export type PublicArea = { id: string; name: string; slug: string; description: string };

export function getSiteContent() {
  const fallback = {
    site,
    services: fallbackServices as PublicService[],
    fleet: fallbackFleet as PublicVehicle[],
    areas: [
      { id: 'melbourne', name: 'Melbourne', slug: 'melbourne', description: 'Private chauffeur services across Melbourne and surrounding metropolitan areas.' },
      { id: 'melbourne-airport', name: 'Melbourne Airport', slug: 'melbourne-airport', description: 'Pre-arranged airport transfers to and from Melbourne Airport.' },
      { id: 'avalon-airport', name: 'Avalon Airport', slug: 'avalon-airport', description: 'Pre-arranged airport transfers to and from Avalon Airport.' },
    ] as PublicArea[],
  };

  return fallback;
}