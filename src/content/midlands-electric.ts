import type { SiteContent } from "./types";

/*
 * Sample customer content — mirrors the Stitch-validated Midlands Electric demo.
 * Note: `testimonials.items` is intentionally empty so the Testimonials section
 * renders designed placeholders instead of fabricated reviews (VAN-27).
 */
export const midlandsElectric: SiteContent = {
  business: {
    name: "Midlands Electric",
    phone: "(555) 234-9800",
    licenseLine: "© 2026 Midlands Electric Co. All Rights Reserved. Master License #88291.",
    emergency: {
      enabled: true,
      label: "Emergency Service Available 24/7",
      cta: { label: "Request Quote", href: "#contact" },
    },
  },

  nav: [
    { label: "Services", href: "#services" },
    { label: "Service Areas", href: "#areas" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ],

  primaryCta: { label: "Call Now", href: "tel:5552349800" },

  hero: {
    eyebrow: "Licensed Electricians",
    title: "Modern Solutions for",
    accentLine: "Expert Power.",
    lede: "Professional, licensed, and insured electrical services for residential and commercial properties. We deliver quality craftsmanship you can trust.",
    primaryCta: { label: "Book Online", href: "#contact" },
    ghostCta: { label: "Call Now", href: "tel:5552349800" },
    imageCaption: "Your work-van photo goes here",
    benefits: [
      { icon: "shield", title: "Licensed & Insured", sub: "Fully covered" },
      { icon: "clock", title: "16+ Years", sub: "On the job" },
      { icon: "dollar", title: "Upfront Pricing", sub: "No surprises" },
      { icon: "bolt", title: "Same-Day Service", sub: "When you need it" },
    ],
  },

  stats: [
    { icon: "clock", value: "16+", label: "Years Serving the Midlands" },
    { icon: "star", value: "5.0", label: "Based on 500+ Reviews" },
    { icon: "check", value: "2,400+", label: "Jobs Completed" },
    { icon: "shield", value: "100%", label: "Licensed & Insured" },
  ],

  services: {
    eyebrow: "Our Services",
    heading: "Comprehensive Electrical Solutions",
    items: [
      {
        slug: "panel-upgrades",
        icon: "gauge",
        title: "Panel Upgrades",
        description:
          "Modernize your electrical panel to handle today's power demands safely and efficiently.",
      },
      {
        slug: "ev-chargers",
        icon: "bolt",
        title: "EV Chargers",
        description:
          "Professional installation of Level 2 charging stations for all electric vehicle makes and models.",
      },
      {
        slug: "lighting-design",
        icon: "lightbulb",
        title: "Lighting Design",
        description:
          "Custom indoor and outdoor lighting to enhance your property's aesthetics and security.",
      },
      {
        slug: "rewiring",
        icon: "wrench",
        title: "Rewiring",
        description:
          "Whole-home rewiring and circuit upgrades to bring older properties up to current code.",
      },
      {
        slug: "generators",
        icon: "power",
        title: "Generators",
        description:
          "Standby generator installation so the lights stay on through any outage.",
      },
      {
        slug: "troubleshooting",
        icon: "wrench",
        title: "Troubleshooting",
        description:
          "Fast, accurate diagnosis of flickering lights, dead outlets, and tripping breakers.",
      },
    ],
  },

  financing: {
    heading: "Flexible Financing for Major Upgrades",
    lede: "Spread the cost of a panel upgrade or whole-home rewire into easy monthly payments. Quick approvals, no surprises.",
    cta: { label: "Check Financing Options", href: "#contact" },
  },

  testimonials: {
    eyebrow: "Reviews",
    heading: "What Our Customers Say",
    items: [], // none yet → designed placeholders (never fabricated)
  },

  serviceAreas: {
    eyebrow: "We Serve",
    cities: ["Birmingham", "Coventry", "Wolverhampton", "Solihull", "Dudley"],
  },

  finalCta: {
    heading: "Ready to Power Up?",
    lede: "Contact us today for a free estimate on your residential or commercial electrical needs.",
    cta: { label: "Get a Free Quote", href: "#contact" },
  },

  footer: {
    columns: [
      {
        title: "Services",
        links: [
          { label: "Panel Upgrades", href: "#services" },
          { label: "EV Chargers", href: "#services" },
          { label: "Lighting Design", href: "#services" },
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
      "© 2026 Midlands Electric Co. All Rights Reserved. Master License #88291.",
  },
};
