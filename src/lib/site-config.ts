/**
 * Vantyx Web OS — SiteConfig schema (stable, shared across all leads).
 *
 * Lives outside `site.config.ts` on purpose: `site.config.ts` is rewritten
 * per-lead by the `demo-gen` Paperclip skill's `template-fill` step, so the
 * type cannot safely live there. Components import the type from here;
 * they import the populated `siteConfig` value from `@site-config`.
 */
import { siteConfig as rawSiteConfig } from "@site-config";

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

const PLACEHOLDER_LICENSE_RE = /^x{4,}$|^0{4,}$|^9{4,}$|^-{4,}$|^placeholder$|^tbd$|^unknown$|^(?:(?:license\s+)?verification\s+pending|license\s+pending|pending)$/i;
const PLACEHOLDER_GOOGLE_PLACE_RE = /^chij(?:x+|0+|9+|-+)$/i;

function normalizeOptionalString(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function sanitizeLicenseForConfig(licenseNumber: string | undefined): string | undefined {
  const normalized = normalizeOptionalString(licenseNumber);
  if (!normalized) return undefined;
  return PLACEHOLDER_LICENSE_RE.test(normalized) ? undefined : normalized;
}

function sanitizeGooglePlaceIdForConfig(googlePlaceId: string | undefined): string | undefined {
  const normalized = normalizeOptionalString(googlePlaceId);
  if (!normalized) return undefined;
  return PLACEHOLDER_GOOGLE_PLACE_RE.test(normalized) ? undefined : normalized;
}

export function sanitizeSiteConfig(input: SiteConfig): SiteConfig {
  return {
    ...input,
    business: {
      ...input.business,
      licenseNumber: sanitizeLicenseForConfig(input.business.licenseNumber),
      googlePlaceId: sanitizeGooglePlaceIdForConfig(input.business.googlePlaceId),
    },
  };
}

export const siteConfig = sanitizeSiteConfig(rawSiteConfig as SiteConfig);
