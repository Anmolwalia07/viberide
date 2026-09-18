import { fleet } from '@/config/site';
import { buildMetadata } from '@/lib/seo';
import { FleetVehiclePage } from '@/components/FleetVehiclePage';
const vehicle = fleet.find((item) => item.id === 'mercedes-sedan')!;
export const metadata = buildMetadata({ title: `${vehicle.title} Chauffeur Hire Melbourne`, description: `${vehicle.description} Book this executive Mercedes-Benz with a professional Veloura chauffeur in Melbourne.`, path: '/fleet/mercedes-sedan', image: vehicle.imageUrl });
export default function Page() { return <FleetVehiclePage vehicle={vehicle} />; }
