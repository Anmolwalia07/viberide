import { createClient } from '@supabase/supabase-js';
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

export async function getPublicContent() {
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

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return fallback;

  try {
    const db = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const [{ data: serviceRows }, { data: vehicleRows }, { data: areaRows }, { data: settings }] = await Promise.all([
      db.from('services').select('id, name, slug, description').eq('active', true).order('created_at'),
      db.from('vehicles').select('id, name, description, passenger_capacity, luggage_capacity, features, image_url').eq('status', 'ACTIVE').order('created_at'),
      db.from('service_areas').select('id, name, slug, description').eq('active', true).order('name'),
      db.from('business_settings').select('business_name, phone, email, address, whatsapp').limit(1).maybeSingle(),
    ]);

    return {
      site: settings ? { ...site, name: settings.business_name, phone: settings.phone ?? site.phone, email: settings.email ?? site.email, address: settings.address ?? site.address, whatsapp: settings.whatsapp ?? site.whatsapp } : site,
      services: serviceRows?.length ? serviceRows.map((item) => [item.name, item.description ?? '', servicePath(item.slug)] as PublicService) : fallback.services,
      fleet: vehicleRows?.length ? vehicleRows.map((item) => ({ id: item.id, title: item.name, description: item.description ?? '', capacity: item.passenger_capacity ?? 0, luggageCapacity: item.luggage_capacity ?? 0, features: (item.features ?? []).join(' · '), imageUrl: item.image_url ?? undefined })) : fallback.fleet,
      areas: areaRows?.length ? areaRows.map((item) => ({ id: item.id, name: item.name, slug: item.slug, description: item.description ?? '' })) : fallback.areas,
    };
  } catch {
    return fallback;
  }
}

function servicePath(slug: string) {
  const dedicated = ['airport-transfers', 'corporate-chauffeur', 'weddings-events', 'hourly-chauffeur'];
  return dedicated.includes(slug) ? `/services/${slug}` : '/booking';
}