/**
 * Vantyx Web OS — populated site config (per-lead data).
 *
 * The `SiteConfig` *type* lives in `src/lib/site-config.ts` so this file can
 * be safely overwritten by the `demo-gen` Paperclip skill's `template-fill`
 * step. Do NOT redeclare the type here; import it.
 */

import type { SiteConfig } from "@/lib/site-config";

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
