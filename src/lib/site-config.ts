/**
 * Vantyx Web OS — SiteConfig schema (stable, shared across all leads).
 *
 * Lives outside `site.config.ts` on purpose: `site.config.ts` is rewritten
 * per-lead by the `demo-gen` Paperclip skill's `template-fill` step, so the
 * type cannot safely live there. Components import the type from here;
 * they import the populated `siteConfig` value from `@site-config`.
 */

export type SiteConfig = {
  niche?: string;
  trustItems?: Array<{
    label: string;
  }>;
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
  serviceAreaPins?: Array<{
    city: string;
    lat: number;
    lng: number;
  }>;
  services: Array<{
    title: string;
    description: string;
    icon?: string;                    // lucide icon name (e.g. "Zap", "Wrench")
  }>;
  gallery?: Array<{
    src: string;
    alt: string;
    type?: "before-after" | "project";
    before?: string;
    after?: string;
    caption?: string;
    city?: string;
    placeholderSlot?: string;
  }>;
  galleryCta?: {
    href: string;
    label: string;
  };
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
    imageSource?: string;
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
    body?: string;                    // alias of `quote` — VAN-42 source-of-truth field
    location?: string;                // e.g. "Lima, OH"
    publishedAt?: string;
    source?: "gbp" | string;
  }>;
};
