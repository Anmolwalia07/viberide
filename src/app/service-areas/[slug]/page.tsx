import { notFound } from 'next/navigation';

import { LocationLandingPage } from '@/components/LocationLandingPage';
import { buildMetadata } from '@/lib/seo';

const areas = {
  'melbourne-cbd': {
    title: 'Melbourne CBD Chauffeur Service',
    description:
      'Private chauffeur service for Melbourne CBD, including offices, hotels, meetings, airport routes and executive transport across the city core.',
    highlights: [
      'Professional chauffeur transport for CBD meetings, hotel pickups and business appointments.',
      'Direct airport and corporate routes between Melbourne CBD, Southbank, Docklands and nearby business districts.',
      'Premium, discreet travel for clients moving across central Melbourne without the hassle of parking or driving.',
    ],
    faqs: [
      {
        question: 'Can I book a chauffeur for Melbourne CBD meetings?',
        answer: 'Yes. Our chauffeur service supports CBD meetings, office transfers and multi-stop executive travel around central Melbourne.',
      },
      {
        question: 'Do you cover airport routes from the CBD?',
        answer: 'Yes. We provide chauffeur bookings between the CBD and Melbourne Airport, as well as other major city destinations.',
      },
    ],
    relatedLinks: [
      { label: 'Melbourne Airport Transfers', href: '/services/melbourne-airport-transfers' },
      { label: 'Corporate chauffeur', href: '/services/corporate-chauffeur-melbourne' },
      { label: 'Private chauffeur', href: '/services/private-chauffeur-melbourne' },
    ],
  },
  'moonee-ponds': {
    title: 'Moonee Ponds Chauffeur Service',
    description:
      'Private chauffeur service from Melbourne to Moonee Ponds for airport transfers, business appointments and smooth city-to-suburb journeys.',
    highlights: [
      'Reliable chauffeur transport for Melbourne to Moonee Ponds trips and local appointments.',
      'Comfortable airport transfer service between Moonee Ponds, the CBD and Melbourne Airport.',
      'A premium, discreet option for private travel, business commuting and family transport.',
    ],
    faqs: [
      {
        question: 'Can I book a chauffeur from Melbourne to Moonee Ponds?',
        answer: 'Yes. We provide chauffeur travel between Melbourne CBD, Moonee Ponds and the airport with a smooth, private service.',
      },
      {
        question: 'Is this good for airport and business travel?',
        answer: 'Yes. It is a popular option for airport transfers, business appointments and elegant local transport.',
      },
    ],
    relatedLinks: [
      { label: 'Melbourne Airport Transfers', href: '/services/melbourne-airport-transfers' },
      { label: 'Private chauffeur', href: '/services/private-chauffeur-melbourne' },
      { label: 'Service areas', href: '/service-areas' },
    ],
  },
  southbank: {
    title: 'Southbank Chauffeur Service',
    description:
      'Private chauffeur transport for Southbank residents, business travellers, hotels and important city appointments across Melbourne.',
    highlights: [
      'Convenient chauffeur service for Southbank hotels, offices and residential pickups.',
      'Smooth airport and city transfers for business visits, events and private travel.',
      'A premium option for guests moving between waterfront venues, city destinations and the CBD.',
    ],
    faqs: [
      {
        question: 'Can I book a Southbank chauffeur for airport travel?',
        answer: 'Yes. Southbank clients often arrange airport transfers and city-to-city journeys with a dedicated chauffeur.',
      },
      {
        question: 'Is this suitable for event travel?',
        answer: 'Yes. Chauffeur service works well for event travel, evenings out and business meetings across the inner city.',
      },
    ],
    relatedLinks: [
      { label: 'Melbourne Airport Transfers', href: '/services/melbourne-airport-transfers' },
      { label: 'Point-to-point chauffeur', href: '/services/point-to-point-chauffeur' },
      { label: 'Book now', href: '/#quote-form' },
    ],
  },
  docklands: {
    title: 'Docklands Chauffeur Service',
    description:
      'Chauffeur service for Docklands business travel, residential bookings and transfers to the CBD, airport and nearby destination areas.',
    highlights: [
      'Reliable transport for Docklands office and residential trips around Melbourne.',
      'Private travel for corporate meetings and airport transfer bookings.',
      'Comfortable city movement with a polished chauffeur experience.',
    ],
    faqs: [
      {
        question: 'Do you service Docklands for airport pickup?',
        answer: 'Yes. Airport, CBD and Docklands routes are all suitable for chauffeur bookings depending on your schedule.',
      },
      {
        question: 'Is this useful for executives?',
        answer: 'Yes. Docklands is a common area for business travel and premium private transport.',
      },
    ],
    relatedLinks: [
      { label: 'Corporate chauffeur', href: '/services/corporate-chauffeur-melbourne' },
      { label: 'Melbourne Airport Transfers', href: '/services/melbourne-airport-transfers' },
      { label: 'Book a chauffeur', href: '/#quote-form' },
    ],
  },
  richmond: {
    title: 'Richmond Chauffeur Service',
    description:
      'Private chauffeur service in Richmond for local appointments, airport travel, business travel and premium inner-city transfers.',
    highlights: [
      'Direct travel for Richmond residents and visitors moving between the city and nearby destinations.',
      'Flexible options for airport, business and private appointments.',
      'Premium comfort with a polished chauffeur experience across inner Melbourne.',
    ],
    faqs: [
      {
        question: 'Can I book from Richmond to Melbourne Airport?',
        answer: 'Yes. Richmond is a common destination for airport, business and private chauffeur bookings.',
      },
      {
        question: 'Do you cover nearby suburbs as well?',
        answer: 'Yes. We can support nearby inner-city transfer routes according to your travel requirements.',
      },
    ],
    relatedLinks: [
      { label: 'Private chauffeur', href: '/services/private-chauffeur-melbourne' },
      { label: 'Melbourne Airport Transfers', href: '/services/melbourne-airport-transfers' },
      { label: 'Service areas', href: '/service-areas' },
    ],
  },
  'st-kilda': {
    title: 'St Kilda Chauffeur Service',
    description:
      'Private chauffeur service for St Kilda visitors, residents and event travellers who want a smoother journey across Melbourne.',
    highlights: [
      'Comfortable chauffeur travel for St Kilda leisure, events and residential bookings.',
      'Smooth connections for airport departures, appointments and city routes.',
      'A refined way to travel without the hassle of parking or navigating busy roads.',
    ],
    faqs: [
      {
        question: 'Is chauffeur service helpful for St Kilda leisure travel?',
        answer: 'Yes. Private chauffeur transport is a practical option for event days, appointments and visits across the area.',
      },
      {
        question: 'Can I book airport transport from St Kilda?',
        answer: 'Yes. It is a common route for airport and city travel when timing and comfort matter.',
      },
    ],
    relatedLinks: [
      { label: 'Private chauffeur', href: '/services/private-chauffeur-melbourne' },
      { label: 'Point-to-point chauffeur', href: '/services/point-to-point-chauffeur' },
      { label: 'Book now', href: '/#quote-form' },
    ],
  },
  'south-yarra': {
    title: 'South Yarra Chauffeur Service',
    description:
      'Premium chauffeur transport for South Yarra residents, businesses and travellers moving across Melbourne and to the airport.',
    highlights: [
      'Luxury private travel for South Yarra appointments, shopping, residential moves and airport routes.',
      'Executive support for business travel across central Melbourne.',
      'Comfortable service around city and suburban destinations with a polished, professional touch.',
    ],
    faqs: [
      {
        question: 'Do you service South Yarra for business trips?',
        answer: 'Yes. South Yarra is well suited to executive and private chauffeur travel, especially around appointments and airport routes.',
      },
      {
        question: 'Is this good for shopping or private travel?',
        answer: 'Yes. Chauffeur service works well for a day of appointments, local travel or special occasions.',
      },
    ],
    relatedLinks: [
      { label: 'Luxury car with driver', href: '/services/luxury-car-with-driver-melbourne' },
      { label: 'Hourly chauffeur', href: '/services/hourly-chauffeur-melbourne' },
      { label: 'Book now', href: '/#quote-form' },
    ],
  },
  toorak: {
    title: 'Toorak Chauffeur Service',
    description:
      'Discreet private chauffeur service in Toorak for executive, residential and airport travel throughout Melbourne and Victoria.',
    highlights: [
      'Discreet, polished travel for Toorak residences, business meetings and private appointments.',
      'Private transport to major airport routes and across the city.',
      'A premium travel option for clients who prefer a smooth, low-stress journey.',
    ],
    faqs: [
      {
        question: 'Can I book from Toorak to Melbourne Airport?',
        answer: 'Yes. Airport travel from Toorak is frequently arranged for private or business travel.',
      },
      {
        question: 'Is this suitable for discreet executive travel?',
        answer: 'Yes. Privacy and professionalism are central to our service and align with private executive travel needs.',
      },
    ],
    relatedLinks: [
      { label: 'Corporate chauffeur', href: '/services/corporate-chauffeur-melbourne' },
      { label: 'Private chauffeur', href: '/services/private-chauffeur-melbourne' },
      { label: 'Book now', href: '/#quote-form' },
    ],
  },
  brighton: {
    title: 'Brighton Chauffeur Service',
    description:
      'Private chauffeur service in Brighton for airport transfers, events and premium travel across Melbourne and the Bayside area.',
    highlights: [
      'Elegant, stress-free chauffeur transport for the Brighton area and surrounding destinations.',
      'Useful for airport connections, private events and important appointments.',
      'Professional service for both residential and business travel plans.',
    ],
    faqs: [
      {
        question: 'Can I book a Brighton airport transfer?',
        answer: 'Yes. Brighton is well-suited to private airport transfers and event-based chauffeur travel.',
      },
      {
        question: 'Is this good for private occasions?',
        answer: 'Yes. It is often chosen for special occasions, visitor transfers and travel around the Bayside area.',
      },
    ],
    relatedLinks: [
      { label: 'Wedding chauffeur', href: '/services/wedding-chauffeur-melbourne' },
      { label: 'Private chauffeur', href: '/services/private-chauffeur-melbourne' },
      { label: 'Book now', href: '/#quote-form' },
    ],
  },
  'mornington-peninsula': {
    title: 'Mornington Peninsula Chauffeur Service',
    description:
      'Private chauffeur travel to and from the Mornington Peninsula for relaxed, premium trips across Victoria and Melbourne.',
    highlights: [
      'Comfortable chauffeur service for Victorian day trips and private appointments beyond the city.',
      'Useful for private leisure travel, family travel and airport runs with a premium touch.',
      'A practical way to travel across longer routes without the stress of driving yourself.',
    ],
    faqs: [
      {
        question: 'Do you service the Mornington Peninsula?',
        answer: 'Yes. Chauffeur arrangements are suitable for travel to and from the Mornington Peninsula across Victoria.',
      },
      {
        question: 'Can this be used for private leisure travel?',
        answer: 'Yes. It is well suited to private day trips, family travel and relaxed premium journeys.',
      },
    ],
    relatedLinks: [
      { label: 'Point-to-point chauffeur', href: '/services/point-to-point-chauffeur' },
      { label: 'Private chauffeur', href: '/services/private-chauffeur-melbourne' },
      { label: 'Book now', href: '/#quote-form' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(areas).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = areas[slug as keyof typeof areas];

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/service-areas/${slug}`,
    keywords:
      slug === 'moonee-ponds'
        ? [
            'melbourne to moonee ponds',
            'chauffeur service melbourne',
            'airport transfer from melbourne airport to city',
            'melbourne airport to city transfer',
            'transfer melbourne airport to city',
            'private chauffeur Melbourne',
          ]
        : [
            'chauffeur service melbourne',
            'chauffeur cars melbourne',
            'private chauffeur Melbourne',
            'Melbourne airport transfer',
            'airport transfer from melbourne airport to city',
          ],
  });
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = areas[slug as keyof typeof areas];

  if (!page) {
    return notFound();
  }

  return (
    <LocationLandingPage
      title={page.title}
      intro={page.description}
      highlights={page.highlights}
      faqs={page.faqs}
      breadcrumbs={[
        { label: 'Service areas', href: '/service-areas' },
        { label: page.title },
      ]}
      relatedLinks={page.relatedLinks}
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: entry.answer,
          },
        })),
      }}
    />
  );
}
