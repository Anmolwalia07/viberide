import { fleet } from '@/config/site';
import { buildMetadata } from '@/lib/seo';
import { FleetVehiclePage } from '@/components/FleetVehiclePage';
const vehicle = fleet.find((item) => item.id === 'audi-suv')!;
export const metadata = buildMetadata({ title: `${vehicle.title} Chauffeur Hire Melbourne`, description: `${vehicle.description} Book this luxury Audi with a professional Veloura chauffeur in Melbourne.`, path: '/fleet/audi-suv', image: vehicle.imageUrl });
export default function Page() { return <FleetVehiclePage vehicle={vehicle} />; }
