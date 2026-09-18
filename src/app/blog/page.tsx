import Link from 'next/link';

import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Chauffeur Travel Blog',
  description:
    'Helpful chauffeur service guides and local travel information for Melbourne airport transfers, business travel and private journeys.',
  path: '/blog',
});

const posts = [
  {
    title: 'Melbourne Airport Transfer Guide',
    slug: 'melbourne-airport-transfer-guide',
    summary: 'How to plan a smoother airport journey and what to consider before a Melbourne Airport pickup or drop-off.',
  },
  {
    title: 'Melbourne Airport to CBD Transfer Tips',
    slug: 'melbourne-airport-to-cbd-transfer',
    summary: 'A practical overview for business travellers and private guests moving between Melbourne Airport and the CBD.',
  },
  {
    title: 'Avalon Airport to Melbourne Transfer Guide',
    slug: 'avalon-airport-to-melbourne-transfer',
    summary: 'A simple guide to arranging a comfortable airport transfer between Avalon and central Melbourne.',
  },
];

export default function BlogPage() {
  return (
    <main className="pt-28">
      <div className="container section">
        <div className="eyebrow">Resources</div>
        <h1 className="serif mt-5 text-5xl md:text-7xl">Chauffeur travel insights</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300">
          A growing library of practical travel guidance for airport transfers, corporate journeys and premium local chauffeur service in Melbourne.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="card p-7">
              <div className="eyebrow">Guide</div>
              <h2 className="serif mt-5 text-3xl text-white">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-400">{post.summary}</p>
              <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#d2bd8e]">
                Read article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
