# Vantyx Web OS

Modular Next.js 15 + Tailwind v4 component library for AI-built contractor websites.

Each component reads from a single `site.config.ts` so the `demo-gen` agent in the Vantyx Paperclip company can compose a complete site by writing one file.

## Stack

- Next.js 15 (App Router, React 19, server components by default)
- Tailwind v4 (CSS-first config, `@import "tailwindcss"`)
- Lucide icons
- Server actions for booking form
- Graceful degradation when external API keys (Google Places, Mapbox, Resend) aren't set

## Components (in render order on the default homepage)

1. `EmergencyBanner` — sticky 24/7 phone bar at top (if `contact.emergency24_7`)
2. `HeroLocal` — full-bleed photo, H1 `{service} in {city}`, dual CTA (call + form)
3. `TrustBar` — license #, insurance, BBB, Google star widget
4. `ServicesGrid` — 6–8 service tiles
5. `GoogleReviewsEmbed` — live reviews via place_id at build time
6. `BeforeAfterGallery` — project-photo slider
7. `ServiceAreaMap` — Mapbox static of radius around HQ
8. `FinancingCTA` — for higher-ticket niches (roofing/HVAC)
9. `BookingForm` — server-action form → Resend
10. `FooterLocalSEO` — NAP + schema.org JSON-LD

## Configuring a new site

Edit `site.config.ts` with the client's business info. That's it.

```ts
import type { SiteConfig } from "./site.config";

export const siteConfig: SiteConfig = {
  business: { name: "Acme Electric", licenseNumber: "EL.12345", ... },
  contact: { phone: "419-555-0101", ... },
  // ...
};
```

The `demo-gen` agent in Vantyx generates this file from the `brand-extract` output for each prospect.

## Dev

```bash
pnpm install
pnpm dev
# open http://localhost:3000
```

## Deploy

```bash
vercel --prod --token $VERCEL_TOKEN --scope vantyx
```

The `vercel-deploy` skill in Vantyx wraps this with the lead-specific name + alias.

## Required env (optional, gracefully degrades if missing)

- `GOOGLE_PLACES_API_KEY` — for `GoogleReviewsEmbed` to fetch live reviews
- `MAPBOX_TOKEN` — for `ServiceAreaMap` to render the static map image
- `RESEND_API_KEY` + `RESEND_TO_EMAIL` — for `BookingForm` server action
