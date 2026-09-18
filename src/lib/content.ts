import {
  fleet as fallbackFleet,
  services as fallbackServices,
  site,
} from "@/config/site";

export type PublicService = [string, string, string];

export type PublicVehicle = {
  id: string;
  title: string;
  description: string;
  capacity: number;
  luggageCapacity: number;
  features: string;
  imageUrl?: string;
};

export type PublicArea = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export function getSiteContent() {
  const fallback = {
    site,

    services: fallbackServices as PublicService[],

    fleet: fallbackFleet as PublicVehicle[],

    areas: [
      // ─────────────────────────────────────
      // MELBOURNE CBD & INNER CITY
      // ─────────────────────────────────────

      {
        id: "melbourne",
        name: "Melbourne",
        slug: "melbourne",
        description:
          "Private chauffeur services across Melbourne and surrounding metropolitan areas.",
      },

      {
        id: "melbourne-cbd",
        name: "Melbourne CBD",
        slug: "melbourne-cbd",
        description:
          "Premium chauffeur services for Melbourne CBD hotels, offices, restaurants, events and private travel.",
      },

      {
        id: "southbank",
        name: "Southbank",
        slug: "southbank",
        description:
          "Private chauffeur transfers for Southbank hotels, restaurants, offices, entertainment venues and events.",
      },

      {
        id: "docklands",
        name: "Docklands",
        slug: "docklands",
        description:
          "Executive chauffeur services for Docklands businesses, hotels, waterfront venues and corporate travel.",
      },

      {
        id: "east-melbourne",
        name: "East Melbourne",
        slug: "east-melbourne",
        description:
          "Comfortable private chauffeur journeys throughout East Melbourne for business, leisure and appointments.",
      },

      {
        id: "richmond",
        name: "Richmond",
        slug: "richmond",
        description:
          "Professional chauffeur transfers between Richmond, Melbourne CBD, airports, hotels and surrounding suburbs.",
      },

      {
        id: "south-yarra",
        name: "South Yarra",
        slug: "south-yarra",
        description:
          "Luxury chauffeur services for South Yarra residences, hotels, restaurants, shopping and private events.",
      },

      {
        id: "toorak",
        name: "Toorak",
        slug: "toorak",
        description:
          "Discreet private chauffeur services for Toorak residences, corporate travellers, events and airport transfers.",
      },

      {
        id: "prahran",
        name: "Prahran",
        slug: "prahran",
        description:
          "Private chauffeur journeys connecting Prahran with Melbourne CBD, airports, hotels and major destinations.",
      },

      // ─────────────────────────────────────
      // INNER EAST & EASTERN SUBURBS
      // ─────────────────────────────────────

      {
        id: "hawthorn",
        name: "Hawthorn",
        slug: "hawthorn",
        description:
          "Premium chauffeur services between Hawthorn, Melbourne CBD, airports and surrounding Melbourne destinations.",
      },

      {
        id: "kew",
        name: "Kew",
        slug: "kew",
        description:
          "Professional chauffeur transfers for Kew residences, businesses, hotels, events and airport journeys.",
      },

      {
        id: "camberwell",
        name: "Camberwell",
        slug: "camberwell",
        description:
          "Private chauffeur transportation throughout Camberwell for corporate, airport and personal travel.",
      },

      {
        id: "moonee-ponds",
        name: "Moonee Ponds",
        slug: "moonee-ponds",
        description:
          "Premium chauffeur service from Melbourne to Moonee Ponds for airport runs, corporate meetings and private transfers.",
      },

      {
        id: "burwood",
        name: "Burwood",
        slug: "burwood",
        description:
          "Reliable chauffeur services connecting Burwood with Melbourne CBD, airports and metropolitan destinations.",
      },

      {
        id: "box-hill",
        name: "Box Hill",
        slug: "box-hill",
        description:
          "Executive chauffeur transfers for Box Hill business, residential and travel requirements.",
      },

      {
        id: "doncaster",
        name: "Doncaster",
        slug: "doncaster",
        description:
          "Private chauffeur journeys from Doncaster to Melbourne CBD, airports, hotels and major destinations.",
      },

      {
        id: "ivanhoe",
        name: "Ivanhoe",
        slug: "ivanhoe",
        description:
          "Comfortable private chauffeur journeys from Ivanhoe to Melbourne CBD, airports and surrounding suburbs.",
      },

      {
        id: "glen-waverley",
        name: "Glen Waverley",
        slug: "glen-waverley",
        description:
          "Executive chauffeur services connecting Glen Waverley with Melbourne CBD, airports and business destinations.",
      },

      {
        id: "ringwood",
        name: "Ringwood",
        slug: "ringwood",
        description:
          "Private chauffeur transportation between Ringwood, Melbourne CBD, airports and surrounding areas.",
      },

      // ─────────────────────────────────────
      // BAYSIDE & SOUTH-EAST
      // ─────────────────────────────────────

      {
        id: "brighton",
        name: "Brighton",
        slug: "brighton",
        description:
          "Luxury chauffeur services for Brighton residences, events, hotels, corporate travel and airport transfers.",
      },

      {
        id: "elsternwick",
        name: "Elsternwick",
        slug: "elsternwick",
        description:
          "Professional chauffeur services for Elsternwick residents, businesses, events and airport journeys.",
      },

      {
        id: "caulfield",
        name: "Caulfield",
        slug: "caulfield",
        description:
          "Comfortable private chauffeur transfers throughout Caulfield and to Melbourne's major destinations.",
      },

      {
        id: "balaclava",
        name: "Balaclava",
        slug: "balaclava",
        description:
          "Private chauffeur transportation between Balaclava, Melbourne CBD, airports and surrounding suburbs.",
      },

      {
        id: "mordialloc",
        name: "Mordialloc",
        slug: "mordialloc",
        description:
          "Private chauffeur services for Mordialloc and surrounding bayside suburbs, including airport and corporate transfers.",
      },

      {
        id: "cheltenham",
        name: "Cheltenham",
        slug: "cheltenham",
        description:
          "Premium chauffeur transportation for Cheltenham residences, businesses, events and airport journeys.",
      },

      {
        id: "sandringham",
        name: "Sandringham",
        slug: "sandringham",
        description:
          "Private chauffeur services connecting Sandringham with Melbourne CBD, airports and surrounding destinations.",
      },

      {
        id: "dandenong",
        name: "Dandenong",
        slug: "dandenong",
        description:
          "Reliable private chauffeur transportation between Dandenong, Melbourne, airports and regional destinations.",
      },

      // ─────────────────────────────────────
      // NORTHERN MELBOURNE
      // ─────────────────────────────────────

      {
        id: "fitzroy",
        name: "Fitzroy",
        slug: "fitzroy",
        description:
          "Premium chauffeur journeys connecting Fitzroy with Melbourne CBD, airports, hotels and events.",
      },

      {
        id: "collingwood",
        name: "Collingwood",
        slug: "collingwood",
        description:
          "Private chauffeur transportation for Collingwood business travel, events, dining and airport transfers.",
      },

      {
        id: "brunswick",
        name: "Brunswick",
        slug: "brunswick",
        description:
          "Professional chauffeur services between Brunswick, Melbourne CBD, airports and surrounding areas.",
      },

      {
        id: "northcote",
        name: "Northcote",
        slug: "northcote",
        description:
          "Private chauffeur journeys between Northcote, Melbourne CBD, airports and surrounding suburbs.",
      },

      {
        id: "preston",
        name: "Preston",
        slug: "preston",
        description:
          "Reliable chauffeur transportation connecting Preston with Melbourne CBD, airports and metropolitan destinations.",
      },

      {
        id: "reservoir",
        name: "Reservoir",
        slug: "reservoir",
        description:
          "Comfortable chauffeur transportation for Reservoir residents, businesses and private travel.",
      },

      {
        id: "essendon",
        name: "Essendon",
        slug: "essendon",
        description:
          "Private chauffeur transfers for Essendon residences, businesses, events and airport travel.",
      },

      {
        id: "coburg",
        name: "Coburg",
        slug: "coburg",
        description:
          "Professional chauffeur services connecting Coburg with Melbourne CBD, airports and surrounding destinations.",
      },

      // ─────────────────────────────────────
      // WESTERN MELBOURNE
      // ─────────────────────────────────────

      {
        id: "footscray",
        name: "Footscray",
        slug: "footscray",
        description:
          "Professional chauffeur services connecting Footscray with Melbourne CBD, airports, hotels and business destinations.",
      },

      {
        id: "sunshine",
        name: "Sunshine",
        slug: "sunshine",
        description:
          "Executive chauffeur services connecting Sunshine with Melbourne CBD, airports and surrounding metropolitan areas.",
      },

      {
        id: "altona",
        name: "Altona",
        slug: "altona",
        description:
          "Premium chauffeur services for Altona residents, businesses, events and airport journeys.",
      },

      {
        id: "point-cook",
        name: "Point Cook",
        slug: "point-cook",
        description:
          "Reliable private chauffeur transportation from Point Cook to Melbourne CBD, airports and major destinations.",
      },

      {
        id: "werribee",
        name: "Werribee",
        slug: "werribee",
        description:
          "Private chauffeur transfers between Werribee, Melbourne, airports and selected regional destinations.",
      },

      {
        id: "tarneit",
        name: "Tarneit",
        slug: "tarneit",
        description:
          "Comfortable private chauffeur services connecting Tarneit with Melbourne, airports and major destinations.",
      },

      {
        id: "melton",
        name: "Melton",
        slug: "melton",
        description:
          "Pre-booked private chauffeur transportation between Melton, Melbourne and airport destinations.",
      },

      // ─────────────────────────────────────
      // AIRPORTS
      // ─────────────────────────────────────

      {
        id: "melbourne-airport",
        name: "Melbourne Airport",
        slug: "melbourne-airport",
        description:
          "Pre-arranged private chauffeur transfers to and from Melbourne Airport with comfortable door-to-door service.",
      },

      {
        id: "avalon-airport",
        name: "Avalon Airport",
        slug: "avalon-airport",
        description:
          "Pre-arranged private chauffeur transfers to and from Avalon Airport for business and private travel.",
      },

      // ─────────────────────────────────────
      // REGIONAL VICTORIA
      // ─────────────────────────────────────

      {
        id: "yarra-valley",
        name: "Yarra Valley",
        slug: "yarra-valley",
        description:
          "Private chauffeur journeys from Melbourne to Yarra Valley wineries, venues, estates and private events.",
      },

      {
        id: "mornington-peninsula",
        name: "Mornington Peninsula",
        slug: "mornington-peninsula",
        description:
          "Luxury private chauffeur travel between Melbourne and Mornington Peninsula wineries, resorts, restaurants and events.",
      },

      {
        id: "geelong",
        name: "Geelong",
        slug: "geelong",
        description:
          "Long-distance chauffeur transfers between Melbourne, Geelong and surrounding Victorian destinations.",
      },

      {
        id: "ballarat",
        name: "Ballarat",
        slug: "ballarat",
        description:
          "Pre-booked private chauffeur transportation between Melbourne and Ballarat for corporate and private travel.",
      },

      {
        id: "bendigo",
        name: "Bendigo",
        slug: "bendigo",
        description:
          "Long-distance private chauffeur journeys between Melbourne and Bendigo for business and personal travel.",
      },
    ] as PublicArea[],
  };

  return fallback;
}