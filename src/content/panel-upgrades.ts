import type { ServicePageContent } from "./service-types";

/** Sample service-detail content — mirrors the Stitch-validated Panel Upgrades page. */
export const panelUpgrades: ServicePageContent = {
  slug: "panel-upgrades",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Panel Upgrades", href: "/services/panel-upgrades" },
  ],
  hero: {
    eyebrow: "Electrical Services",
    title: "Electrical Panel Upgrades",
    accentLine: "Done Right, Pulled to Code",
    lede: "Modernize your home's electrical capacity safely and legally. Our master electricians handle everything from load calculations and permitting to the final inspection.",
    primaryCta: { label: "Book Online", href: "/#contact" },
    ghostCta: { label: "Call Now", href: "tel:5552349800" },
    imageCaption: "Your panel-upgrade photo goes here",
  },
  included: {
    eyebrow: "What's Included",
    heading: "Everything You Need for a Safe Upgrade",
    items: [
      { title: "Load calculation & permit", description: "Sized correctly for your home and pulled to code with the municipality." },
      { title: "200A service upgrade", description: "More capacity for modern appliances, HVAC, and EV charging." },
      { title: "New breaker panel & labeling", description: "Clear, professional labeling for every circuit in the home." },
      { title: "Whole-home surge protection", description: "Protects sensitive electronics from spikes and surges." },
      { title: "Code-compliant grounding", description: "Essential safety grounding that meets all NEC requirements." },
      { title: "Final inspection coordination", description: "We handle the municipal sign-off and the paperwork." },
    ],
  },
  process: {
    eyebrow: "Our Process",
    heading: "Simple, Transparent Upgrades",
    steps: [
      { title: "Free Assessment", description: "We evaluate your current panel and power needs." },
      { title: "Upfront Quote", description: "A detailed, transparent quote with no hidden fees." },
      { title: "Professional Install", description: "Clean, efficient installation with minimal disruption." },
      { title: "Inspection & Cleanup", description: "We leave your utility area cleaner than we found it." },
    ],
  },
  faq: {
    eyebrow: "Common Questions",
    heading: "Signs You Need an Upgrade",
    items: [
      { q: "Frequent breaker tripping", a: "If breakers trip regularly, your panel likely can't handle your home's load — a common sign it's time to upgrade." },
      { q: "Flickering or dimming lights", a: "Lights that dim when appliances kick on point to an overtaxed panel or loose connections." },
      { q: "Still using a fuse box", a: "Fuse boxes are outdated and often can't support modern demand safely; most insurers prefer breaker panels." },
      { q: "Planning an addition or EV charger", a: "New large loads (additions, hot tubs, Level 2 chargers) usually require additional capacity." },
      { q: "Burning smell or a warm panel", a: "A warm panel or burning smell is an emergency — call us immediately; do not keep using the circuit." },
    ],
  },
  financing: {
    heading: "Flexible Financing for Major Upgrades",
    lede: "Spread the cost of a panel upgrade into easy monthly payments. Quick approvals, no surprises.",
    cta: { label: "Check Financing Options", href: "/#contact" },
  },
  gallery: {
    eyebrow: "Recent Work",
    heading: "Recent Installations",
    caption: "Your project photos go here",
    count: 3,
  },
  related: {
    eyebrow: "Related Services",
    heading: "Related Services",
    items: [
      { slug: "ev-chargers", icon: "bolt", title: "EV Chargers", description: "Level 2 charging stations installed for any EV." },
      { slug: "rewiring", icon: "wrench", title: "Rewiring", description: "Whole-home rewiring to bring older properties up to code." },
      { slug: "generators", icon: "power", title: "Generators", description: "Standby generators so the lights stay on through any outage." },
    ],
  },
};
