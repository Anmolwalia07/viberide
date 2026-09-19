export const site = {
  name: 'Veloura Chauffeurs',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+61 424 136 433',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || '[EMAIL ADDRESS]',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '[BUSINESS ADDRESS]',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+61 424 136 433',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://velourachauffeurs.com.au',
  metaDescription:
    'Book a premium chauffeur service in Melbourne for airport transfers, corporate travel, private journeys, weddings and events. Professional chauffeurs and luxury vehicles.',
  keywords: [
    'chauffeur service melbourne',
    'chauffeur cars melbourne',
    'private chauffeur Melbourne',
    'Melbourne airport transfer',
    'airport transfer from melbourne airport to city',
    'melbourne airport to city transfer',
    'transfer melbourne airport to city',
    'private car service for long distance travel cost in australia',
    'melbourne to moonee ponds',
    'perth airport transfer service',
    'servicio de auto privado en el aeropuerto mel',
  ],
  description:
    'Premium chauffeur service in Melbourne. Book professional private chauffeurs for airport transfers, corporate travel, point-to-point, and luxury events.',
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
    x: process.env.NEXT_PUBLIC_X_URL || '',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || '',
  },
};

export const services = [
  [
    'Airport Transfers',
    'Seamless transfers to and from Melbourne Airport and Avalon Airport with professional chauffeurs and time-conscious planning.',
    '/services/airport-transfers',
  ],
  [
    'Corporate Chauffeur',
    'Executive travel across Melbourne designed around meetings, schedules and the standards of modern business.',
    '/services/corporate-chauffeur',
  ],
  [
    'Point-to-Point',
    'A refined private transfer between any two destinations across Melbourne and Victoria.',
    '/services/point-to-point',
  ],
  [
    'Weddings & Events',
    'Elegant chauffeur services for weddings, celebrations, productions and special occasions across Melbourne.',
    '/services/weddings-events',
  ],
  [
    'Hourly Chauffeur',
    'A private vehicle and chauffeur available by the hour for flexible Melbourne itineraries.',
    '/services/hourly-chauffeur',
  ],
  [
    'Private Chauffeur',
    'Dedicated, discreet private chauffeur services for individuals and families requiring seamless Melbourne travel.',
    '/services/private-chauffeur',
  ],
];

export const fleet = [
  {
    id: 'audi-suv',
    title: 'Audi SUV (Q7)',
    imageUrl: '/audi-suv-q7.png',
    description:
      'A premium Audi Q7 SUV offering generous passenger space, refined comfort and excellent suitcase capacity for executive and private journeys.',
    capacity: 4,
    luggageCapacity: 5,
    features:
      'Audi Q7 · Premium leather interior · Climate control · Spacious cabin · Executive comfort · 4 passengers · 4–5 suitcases',
  },

  {
    id: 'audi-sedan',
    title: 'Audi Sedan (E6)',
    imageUrl: '/audi-sedan-e6.png',
    description:
      'A refined Audi sedan offering a quiet and comfortable cabin for corporate travel, airport transfers and private journeys.',
    capacity: 4,
    luggageCapacity: 2,
    features:
      'Audi E6 · Leather interior · Quiet cabin · Rear comfort · Business-ready space · 4 passengers · 2 suitcases',
  },

  {
    id: 'bmw-sedan',
    title: 'BMW Sedan (5 Series)',
    imageUrl: '/bmw-5-series.png',
    description:
      'A luxurious BMW 5 Series sedan designed for executive transport, combining premium comfort with a smooth and refined driving experience.',
    capacity: 4,
    luggageCapacity: 2,
    features:
      'BMW 5 Series · Luxury interior · Premium sound · Advanced climate control · Smooth ride · 4 passengers · 2 suitcases',
  },

  {
    id: 'mercedes-suv',
    title: 'Mercedes SUV (GLE)',
    imageUrl: '/mercedes-gle.png',
    description:
      'A premium Mercedes-Benz GLE SUV providing exceptional comfort, generous passenger space and excellent suitcase capacity.',
    capacity: 4,
    luggageCapacity: 4,
    features:
      'Mercedes-Benz GLE · Premium leather · Panoramic roof · Advanced safety · Spacious seating · 4 passengers · 4 suitcases',
  },

  {
    id: 'mercedes-sedan',
    title: 'Mercedes Sedan (E Class)',
    imageUrl: '/mercedes-e-class.png',
    description:
      'A sophisticated Mercedes-Benz E Class sedan delivering a comfortable and refined travel experience for business and private journeys.',
    capacity: 4,
    luggageCapacity: 2,
    features:
      'Mercedes-Benz E Class · Executive seating · Ambient lighting · Whisper-quiet cabin · Premium finishes · 4 passengers · 2 suitcases',
  },

  {
    id: 'mercedes-van',
    title: 'Mercedes Van',
    imageUrl: '/mercedes-sprinter.png',
    description:
      'A spacious Mercedes-Benz luxury van designed for larger groups, corporate travel, airport transfers and journeys requiring substantial suitcase space.',
    capacity: 12,
    luggageCapacity: 10,
    features:
      'Mercedes-Benz Van · 12 passengers · 10+ suitcases · Luxury interior · Flexible seating · Generous suitcase space · Easy access',
  },

  {
    id: 'mercedes-v-class',
    title: 'Mercedes Van (V Class)',
    imageUrl: '/mercedes-v-class.png',
    description:
      'A premium Mercedes-Benz V Class people mover offering flexible seating, generous suitcase space and a comfortable experience for families and groups.',
    capacity: 7,
    luggageCapacity: 6,
    features:
      'Mercedes-Benz V Class · 7 passengers · 6+ suitcases · Luxury interior · Flexible seating · Generous suitcase space · Easy access',
  },
];

export const faqs = [
  [
    'How do I book a chauffeur in Melbourne?',
    'You can easily request a quote or book directly through our website by filling out the booking form, or by contacting our team via phone or WhatsApp. We recommend advance bookings for guaranteed availability.',
  ],
  [
    'Do you provide Melbourne Airport transfers?',
    'Yes, we provide premium meet-and-greet airport transfers to and from Melbourne Airport (Tullamarine) and Avalon Airport, complete with flight monitoring.',
  ],
  [
    'Can I book a chauffeur for corporate travel?',
    'Absolutely. We specialize in corporate chauffeur services across Melbourne, providing reliable, discreet, and comfortable travel for executives and business teams.',
  ],
  [
    'What vehicles are available in your fleet?',
    'Our luxury fleet includes premium European vehicles, such as Audi and Mercedes-Benz sedans, spacious SUVs, and luxury vans for group travel.',
  ],
  [
    'Do you provide point-to-point transfers?',
    'Yes, we offer seamless point-to-point private transfers between any two destinations across Melbourne and regional Victoria.',
  ],
  [
    'How far in advance should I book?',
    'While we try to accommodate short-notice requests, we recommend booking at least 24 hours in advance to ensure your preferred vehicle is available.',
  ],
];