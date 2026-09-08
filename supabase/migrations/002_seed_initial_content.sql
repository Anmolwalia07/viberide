insert into business_settings (business_name, phone, email, address)
select 'Veloura Chauffeurs', '[PHONE NUMBER]', '[EMAIL ADDRESS]', '[BUSINESS ADDRESS]'
where not exists (select 1 from business_settings);

insert into services (name, slug, description)
values
  ('Airport Transfer', 'airport-transfers', 'Seamless transfers to and from Melbourne Airport and Avalon Airport.'),
  ('Corporate Chauffeur', 'corporate-chauffeur', 'Executive travel across Melbourne designed around meetings and schedules.'),
  ('Point-to-Point', 'point-to-point', 'A refined private transfer between two destinations across Melbourne and Victoria.'),
  ('Weddings & Events', 'weddings-events', 'Elegant chauffeur services for weddings, celebrations and special occasions.'),
  ('Hourly Chauffeur', 'hourly-chauffeur', 'A private vehicle and chauffeur available by the hour for flexible itineraries.'),
  ('Hotel Transfer', 'hotel-transfers', 'Quiet, comfortable transfers between hotels, residences, venues and airports.')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description;

insert into vehicles (name, category, passenger_capacity, luggage_capacity, features, description)
select source.name, source.category, source.passenger_capacity, source.luggage_capacity, source.features, source.description
from (values
  ('Audi Q7', 'Luxury SUV', 6, 4, array['Premium leather interior', 'Climate control', 'Spacious cabin', 'Executive comfort']::text[], 'A premium luxury SUV combining generous space, refined comfort and a commanding presence.'),
  ('Mercedes-Benz V-Class', 'Luxury Van', 7, 6, array['Luxury interior', 'Flexible seating', 'Generous luggage space', 'Easy access']::text[], 'A sophisticated luxury people mover designed for families, corporate groups and longer journeys.'),
  ('Mercedes-Benz E-Class', 'Executive Sedan', 3, 2, array['Leather interior', 'Quiet cabin', 'Rear comfort', 'Business-ready space']::text[], 'A refined executive sedan offering a quiet, comfortable cabin for business and private journeys.')
) as source(name, category, passenger_capacity, luggage_capacity, features, description)
where not exists (select 1 from vehicles where vehicles.name = source.name);

insert into service_areas (name, slug, description)
values
  ('Melbourne', 'melbourne', 'Private chauffeur services across Melbourne and surrounding metropolitan areas.'),
  ('Melbourne Airport', 'melbourne-airport', 'Pre-arranged airport transfers to and from Melbourne Airport.'),
  ('Avalon Airport', 'avalon-airport', 'Pre-arranged airport transfers to and from Avalon Airport.')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description;