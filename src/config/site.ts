export const site = {
  name: 'VideRide Chauffeurs',
  phone: '[PHONE NUMBER]',
  email: '[EMAIL ADDRESS]',
  address: '[BUSINESS ADDRESS]',
  whatsapp: '[WHATSAPP NUMBER]',
  url: 'https://videride-chauffeurs.vercel.app/',
  metaDescription:
    'Premium chauffeur service in Melbourne. Book professional private chauffeurs for airport transfers, corporate travel, point-to-point, and luxury events.',
  description:
    'Premium chauffeur service in Melbourne. Book professional private chauffeurs for airport transfers, corporate travel, point-to-point, and luxury events.',
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
    x: process.env.NEXT_PUBLIC_X_URL || '',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || '',
  }
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
    title: 'Audi SUV',
    imageUrl: '/Audi SUV.webp',
    description: 'A premium luxury SUV combining generous space, refined comfort and a commanding presence for executive and private journeys.',
    capacity: 6,
    luggageCapacity: 4,
    features: 'Premium leather interior · Climate control · Spacious cabin · Executive comfort',
  },
  {
    id: 'audi-sedan',
    title: 'Audi Sedan',
    imageUrl: '/Audi Sedan.webp',
    description: 'A refined executive sedan offering a quiet, comfortable cabin for corporate travel, airport transfers and private journeys.',
    capacity: 3,
    luggageCapacity: 2,
    features: 'Leather interior · Quiet cabin · Rear comfort · Business-ready space',
  },
  {
    id: 'bmw-sedan',
    title: 'BMW Sedan',
    imageUrl: '/BMW Sedan.webp',
    description: 'A luxurious and dynamic sedan perfect for executive transport, offering superior comfort and advanced technology.',
    capacity: 3,
    luggageCapacity: 2,
    features: 'Luxury interior · Premium sound · Advanced climate control · Smooth ride',
  },
  {
    id: 'mercedes-suv',
    title: 'Mercedes SUV',
    imageUrl: '/Mercedes SUV.webp',
    description: 'A top-tier luxury SUV providing exceptional comfort, elevated views, and ample space for luggage and passengers.',
    capacity: 6,
    luggageCapacity: 4,
    features: 'Premium leather · Panoramic roof · Advanced safety · Spacious seating',
  },
  {
    id: 'mercedes-sedan',
    title: 'Mercedes Sedan',
    imageUrl: '/Mercedes Sedan.webp',
    description: 'The epitome of luxury sedans, delivering an unparalleled ride experience for discerning travelers.',
    capacity: 3,
    luggageCapacity: 2,
    features: 'Executive seating · Ambient lighting · Whisper-quiet cabin · Premium finishes',
  },
  {
    id: 'mercedes-van',
    title: 'Mercedes Van',
    imageUrl: '/Mercedes Van.webp',
    description: 'A sophisticated luxury people mover designed for families, corporate groups and longer journeys requiring additional space.',
    capacity: 7,
    luggageCapacity: 6,
    features: 'Luxury interior · Flexible seating · Generous luggage space · Easy access',
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