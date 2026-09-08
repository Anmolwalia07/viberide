import Link from 'next/link';
import { getPublicContent } from '@/lib/content';

export default async function Services() {
	const { services } = await getPublicContent();
	return <main className="pt-28"><div className="container section"><div className="eyebrow">Services</div><h1 className="serif mt-5 max-w-4xl text-6xl md:text-8xl">Every journey,<br/><em>properly handled.</em></h1><p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-400">Private chauffeur services designed for airports, boardrooms, hotels, events and the journeys between them.</p><div className="mt-20 grid gap-px bg-white/10 md:grid-cols-2">{services.map(([t,d,u],i)=><Link key={t} href={u} className="bg-[#0b0c0d] p-9 min-h-[260px]"><span className="text-xs text-[#b9a47a]">0{i+1}</span><h2 className="serif mt-14 text-4xl">{t}</h2><p className="mt-3 max-w-md text-sm leading-6 text-neutral-400">{d}</p></Link>)}</div></div></main>;
}
