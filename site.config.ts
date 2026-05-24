/**
 * Vantyx Web OS — site config schema + default Lima electrician example.
 *
 * Every component reads from this file. The `demo-gen` Paperclip skill
 * generates a populated version of this file per prospect from `brand-extract`
 * output. Keep the SHAPE stable; only the values vary per site.
 */

export type SiteConfig = {
  business: {
    name: string;
    legalName?: string;
    tagline?: string;
    licenseNumber?: string;
    insurance?: string;
    bbb?: { accredited: boolean; rating?: string };
    foundedYear?: number;
    googlePlaceId?: string;
  };
  contact: {
    phone: string;          // E.164 or pretty — we normalize for `tel:` links
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    hours: {
      mon: string;
      tue: string;
      wed: string;
      thu: string;
      fri: string;
      sat: string;
      sun: string;
    };
    emergency24_7: boolean;
  };
  serviceArea: {
    zips: string[];
    hqLatLng: [number, number];      // [lat, lng]
    radiusMiles: number;
  };
  services: Array<{
    title: string;
    description: string;
    icon?: string;                    // lucide icon name (e.g. "Zap", "Wrench")
  }>;
  gallery?: Array<{
    src: string;
    alt: string;
    type?: "before-after" | "project";
  }>;
  branding: {
    palette: {
      primary: string;                // e.g. "#0F172A"
      accent: string;                 // e.g. "#F59E0B"
      bg: string;                     // e.g. "#FFFFFF"
      text: string;                   // e.g. "#111827"
      muted: string;                  // e.g. "#6B7280"
    };
    fonts: {
      headings: string;               // Google Font family or system stack
      body: string;
    };
  };
  hero: {
    image: string;                    // background image URL
    service: string;                  // e.g. "Electrician"
    city: string;                     // e.g. "Lima, OH"
    headline?: string;                // override default `{service} in {city}`
    subhead?: string;
  };
  financing?: {
    enabled: boolean;
    partner?: string;
    minProjectUsd?: number;
  };
  testimonials?: Array<{
    author: string;
    quote: string;
    rating: number;                   // 1–5
  }>;
};

/* -----------------------------------------------------------
 * Default config — Lima electrician (used when no override).
 * `demo-gen` replaces this object per prospect.
 * --------------------------------------------------------- */

export const siteConfig: SiteConfig = {
  business: {
    name: "Collier Electric",
    legalName: "Collier Electric LLC",
    tagline: "Built like your trucks. Runs like your phones should.",
    licenseNumber: "EL.45801",
    insurance: "$2M general liability",
    bbb: { accredited: true, rating: "A+" },
    foundedYear: 2014,
    googlePlaceId: "ChIJxxxxxxxxxxxxxxxxxxx",
  },
  contact: {
    phone: "(419) 555-0101",
    email: "hello@collierelectric.com",
    address: {
      street: "1234 Main St",
      city: "Lima",
      state: "OH",
      zip: "45801",
    },
    hours: {
      mon: "7:00 AM – 6:00 PM",
      tue: "7:00 AM – 6:00 PM",
      wed: "7:00 AM – 6:00 PM",
      thu: "7:00 AM – 6:00 PM",
      fri: "7:00 AM – 6:00 PM",
      sat: "8:00 AM – 2:00 PM",
      sun: "Closed",
    },
    emergency24_7: true,
  },
  serviceArea: {
    zips: ["45801", "45804", "45805", "45806", "45807", "45830", "45840"],
    hqLatLng: [40.7426, -84.1052],
    radiusMiles: 50,
  },
  services: [
    { title: "Panel Upgrades", description: "100A → 200A service upgrades, code-compliant in a day.", icon: "Zap" },
    { title: "EV Chargers", description: "Level 2 home charger installs. Tesla, ChargePoint, JuiceBox.", icon: "BatteryCharging" },
    { title: "Whole-Home Rewiring", description: "Knob & tube replacement. Old houses, modern code.", icon: "Cable" },
    { title: "Generator Hookups", description: "Standby + portable. Transfer switches done right.", icon: "Power" },
    { title: "Lighting & Fans", description: "Recessed, pendants, ceiling fans, outdoor & landscape.", icon: "Lightbulb" },
    { title: "Emergency Calls", description: "Outage, sparking outlet, burning smell? Same-day.", icon: "AlertTriangle" },
  ],
  gallery: [
    { src: "/gallery/panel-before.jpg", alt: "Panel upgrade — before", type: "before-after" },
    { src: "/gallery/panel-after.jpg", alt: "Panel upgrade — after", type: "before-after" },
    { src: "/gallery/ev-charger.jpg", alt: "EV charger install", type: "project" },
  ],
  branding: {
    palette: {
      primary: "#0F172A",
      accent: "#F59E0B",
      bg: "#FFFFFF",
      text: "#111827",
      muted: "#6B7280",
    },
    fonts: {
      headings: "Inter, system-ui, sans-serif",
      body: "Inter, system-ui, sans-serif",
    },
  },
  hero: {
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1920&q=80",
    service: "Electrician",
    city: "Lima, OH",
    subhead: "Licensed, insured, owner-operated. Same-week installs.",
  },
  financing: {
    enabled: false,
  },
  testimonials: [
    { author: "Mike P., Lima", quote: "Showed up on time, came in under quote, cleaned up after.", rating: 5 },
    { author: "Sarah K., Findlay", quote: "Best electrician in NW Ohio. We use them for everything.", rating: 5 },
    { author: "Tom R., Bluffton", quote: "Answered the phone on a Sunday. Saved our wedding.", rating: 5 },
  ],
};
