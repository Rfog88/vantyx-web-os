import type { SiteContent } from "./types";

/*
 * REAL customer content — Brandon Electric (Tampa, FL), extracted from the old
 * Vantyx-built demo (Paperclip pipeline). The Phase 3 proof site: same business,
 * rebuilt on the vantyx-web-os house-style library for an old-vs-new comparison.
 *
 * VAN-27 honesty: only confirmed facts from the source are used. No fabricated
 * star ratings / job counts / years; the old demo had no real review data, so
 * testimonials render as designed placeholders and there is no financing band.
 */
export const brandonElectric: SiteContent = {
  business: {
    name: "Brandon Electric",
    phone: "(813) 653-1473",
    licenseLine:
      "© 2026 Brandon Electric. FL License #EC0002579 · Licensed, insured & locally owned.",
    emergency: {
      enabled: true,
      label: "24/7 Emergency Electrical Service",
      cta: { label: "Request Service", href: "#contact" },
    },
  },

  nav: [
    { label: "Services", href: "#services" },
    { label: "Service Areas", href: "#areas" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ],

  primaryCta: { label: "Call Now", href: "tel:8136531473" },

  hero: {
    eyebrow: "Licensed Electricians · Tampa, FL",
    title: "Tampa Electricians",
    accentLine: "Powering Homes & Businesses",
    lede: "Licensed, insured, and locally owned electrical service for Tampa and the surrounding area — from panel upgrades and EV chargers to 24/7 emergency repairs.",
    primaryCta: { label: "Book Online", href: "#contact" },
    ghostCta: { label: "Call (813) 653-1473", href: "tel:8136531473" },
    imageCaption: "Your work-van photo goes here",
    benefits: [
      { icon: "shield", title: "Licensed & Insured", sub: "FL #EC0002579" },
      { icon: "bolt", title: "24/7 Emergency", sub: "Always on call" },
      { icon: "gauge", title: "Residential & Commercial", sub: "Homes and businesses" },
      { icon: "lightbulb", title: "Locally Owned", sub: "Tampa-based" },
    ],
  },

  // Honest trust items only (confirmed from the source — no invented metrics).
  stats: [
    { icon: "bolt", value: "24/7", label: "Emergency Service" },
    { icon: "shield", value: "Licensed", label: "FL #EC0002579" },
    { icon: "check", value: "Insured", label: "& Locally Owned" },
    { icon: "gauge", value: "Res + Com", label: "Homes & Businesses" },
  ],

  services: {
    eyebrow: "Our Services",
    heading: "Tampa Electrical Services",
    items: [
      { slug: "residential", icon: "lightbulb", title: "Residential Electrical", description: "Wiring, outlets, fixtures, and safety upgrades for your home." },
      { slug: "commercial", icon: "gauge", title: "Commercial Electrical", description: "Dependable electrical work for offices, retail, and light industrial." },
      { slug: "panel-upgrades", icon: "gauge", title: "Panel Upgrades & Replacements", description: "Modern breaker panels sized for today's electrical demand." },
      { slug: "repairs", icon: "wrench", title: "Repairs & Troubleshooting", description: "Fast diagnosis of dead outlets, flickering lights, and tripping breakers." },
      { slug: "lighting", icon: "lightbulb", title: "Lighting Installation", description: "Indoor and outdoor lighting installed cleanly and to code." },
      { slug: "generators", icon: "power", title: "Generator Installation", description: "Standby generators so the power stays on through Florida storms." },
      { slug: "ev-chargers", icon: "bolt", title: "EV Charger Installation", description: "Level 2 home charging stations for any electric vehicle." },
      { slug: "emergency", icon: "bolt", title: "24/7 Emergency Service", description: "Urgent electrical problems handled day or night, any day." },
    ],
  },

  // No financing claim on the source → omitted (never fabricated).

  testimonials: {
    eyebrow: "Reviews",
    heading: "What Tampa Homeowners Say",
    items: [], // no verified reviews in the source → designed placeholders
  },

  serviceAreas: {
    eyebrow: "We Serve",
    cities: ["Tampa", "Brandon", "Riverview", "Valrico"],
  },

  finalCta: {
    heading: "Need an Electrician in Tampa?",
    lede: "Call Brandon Electric or request service online — licensed, insured, and ready for residential or commercial work.",
    cta: { label: "Request Service", href: "#contact" },
  },

  footer: {
    columns: [
      {
        title: "Services",
        links: [
          { label: "Panel Upgrades", href: "#services" },
          { label: "EV Chargers", href: "#services" },
          { label: "Lighting", href: "#services" },
          { label: "Generators", href: "#services" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Reviews", href: "#reviews" },
          { label: "Service Areas", href: "#areas" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
          { label: "Accessibility", href: "#" },
        ],
      },
    ],
    finePrint:
      "© 2026 Brandon Electric. FL License #EC0002579. Licensed, insured & locally owned. Serving Tampa, Brandon, Riverview & Valrico.",
  },
};
