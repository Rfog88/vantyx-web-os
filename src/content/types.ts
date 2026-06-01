/*
 * Content model for a Vantyx house-style site. A whole customer site is driven by
 * one SiteContent object — swap this (plus the accent token) and the component
 * library re-skins with no markup edits. Optional/empty fields render as DESIGNED
 * PLACEHOLDERS (never stock photos or fabricated reviews) per the VAN-27 rule.
 */

export type IconName =
  | "bolt"
  | "check"
  | "star"
  | "arrow-right"
  | "phone"
  | "shield"
  | "clock"
  | "dollar"
  | "wrench"
  | "lightbulb"
  | "power"
  | "gauge"
  | "plus"
  | "menu"
  | "close"
  | "camera"
  | "quote";

export interface NavLink {
  label: string;
  href: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface Benefit {
  icon?: IconName;
  title: string;
  sub?: string;
}

export interface Stat {
  icon?: IconName;
  value: string;
  label: string;
}

export interface Service {
  slug: string;
  icon?: IconName;
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

/** A real, attributable review. If none exist, leave the list empty — the
 *  Testimonials component renders designed placeholders rather than inventing any. */
export interface Testimonial {
  quote: string;
  author: string;
  location?: string;
  rating?: number;
}

export interface BusinessInfo {
  name: string;
  phone: string;
  /** Defaults to `tel:` + digits of `phone` when omitted. */
  phoneHref?: string;
  licenseLine?: string;
  emergency?: { enabled: boolean; label: string; cta?: Cta };
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface SiteContent {
  business: BusinessInfo;
  nav: NavLink[];
  primaryCta: Cta;

  hero: {
    eyebrow: string;
    title: string;
    accentLine: string;
    lede: string;
    primaryCta: Cta;
    ghostCta: Cta;
    /** Caption shown inside the designed photo placeholder when no real image is set. */
    imageCaption: string;
    imageSrc?: string;
    benefits: Benefit[];
  };

  stats: Stat[];

  services: {
    eyebrow: string;
    heading: string;
    items: Service[];
  };

  /** Optional — omit for customers who don't offer financing (don't invent it). */
  financing?: {
    eyebrow?: string;
    heading: string;
    lede: string;
    cta: Cta;
  };

  testimonials: {
    heading: string;
    eyebrow?: string;
    items: Testimonial[];
  };

  serviceAreas: {
    eyebrow: string;
    cities: string[];
  };

  finalCta: {
    heading: string;
    lede?: string;
    cta: Cta;
  };

  footer: {
    columns: FooterColumn[];
    finePrint: string;
  };
}
