import { AdminResourceManager } from '@/components/AdminResourceManager';
import { AdminBackButton } from '@/components/AdminBackButton';

export default function Page() {
	return <main className="pt-28"><div className="container section"><div className="flex items-end justify-between gap-6"><div><div className="eyebrow">Admin / services</div><h1 className="serif mt-5 text-6xl">Services.</h1></div><AdminBackButton /></div><AdminResourceManager resource="services" /></div></main>;
}
