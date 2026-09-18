import { site } from '@/config/site';

export const business = {
  name: site.name,
  website: site.url,
  phone: site.phone,
  email: site.email,
  logo: `${site.url}/og-image.svg`,
  serviceAreas: [
    'Melbourne',
    'Melbourne CBD',
    'Southbank',
    'Docklands',
    'Richmond',
    'St Kilda',
    'South Yarra',
    'Toorak',
    'Brighton',
    'Mornington Peninsula',
    'Melbourne Airport',
    'Avalon Airport',
  ],
  social: site.social,
  address: site.address,
};

export const businessHours = [] as const;
