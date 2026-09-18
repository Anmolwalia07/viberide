import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Avalon Airport Transfers',
  description:
    'Private Avalon Airport transfers for business travel, family trips and premium door-to-door chauffeur journeys across Melbourne and Victoria.',
  path: '/services/avalon-airport-transfers',
});

const faqs = [
  {
    question: 'Do you provide transport to Avalon Airport?',
    answer:
      'Yes. Veloura offers private chauffeur travel to and from Avalon Airport for both business and personal trips across Melbourne and regional Victoria.',
  },
  {
    question: 'Is Avalon Airport transfer suitable for corporate travel?',
    answer:
      'Absolutely. Avalon Airport transfers are well suited to executive travel, client meetings and structured itineraries where timing matters.',
  },
  {
    question: 'Can I book door-to-door service to the CBD?',
    answer:
      'Yes. We can arrange private pickup or drop-off for Melbourne CBD, Southbank, Docklands and other destinations in and around the city.',
  },
  {
    question: 'Are family or group bookings available?',
    answer:
      'Depending on the vehicle selected, we can accommodate family travel, business groups and other private journeys with ample luggage space and a premium experience.',
  },
];

export default function Page() {
  return (
    <ServiceLandingPage
      eyebrow="Airport transfers"
      title="Private Avalon Airport Transfers"
      intro="A private chauffeur service for Avalon Airport removes the uncertainty from early departures, late arrivals and time-sensitive travel. From Melbourne CBD to the airport and back again, the journey is streamlined and comfortable, whether you are travelling for business, family commitments or a private departure."
      highlights={[
        { title: 'Avalon Airport', description: 'Private airport transport for arrivals and departures from one of Melbourne’s key regional gateways.' },
        { title: 'City and suburb access', description: 'Door-to-door travel across Melbourne, Southbank, Docklands and surrounding suburbs.' },
        { title: 'Personal travel', description: 'A refined service for families, private bookings and executive travel with flexible timing.' },
      ]}
      faqs={faqs}
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'Avalon Airport Transfers' },
      ]}
      ctaLabel="Book Avalon Airport Transfer"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }}
    />
  );
}
