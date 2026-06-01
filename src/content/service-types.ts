import type { Cta, FaqItem, NavLink, Service, SiteContent } from "./types";

export interface ChecklistItem {
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

/** Content for one service-detail page (the reusable trades service template). */
export interface ServicePageContent {
  slug: string;
  breadcrumb: NavLink[];
  hero: {
    eyebrow: string;
    title: string;
    accentLine: string;
    lede: string;
    primaryCta: Cta;
    ghostCta: Cta;
    imageCaption: string;
    imageSrc?: string;
  };
  included: { eyebrow: string; heading: string; items: ChecklistItem[] };
  process: { eyebrow: string; heading: string; steps: ProcessStep[] };
  faq: { eyebrow?: string; heading: string; items: FaqItem[] };
  financing: NonNullable<SiteContent["financing"]>;
  gallery: { eyebrow?: string; heading: string; caption: string; count: number };
  related: { eyebrow: string; heading: string; items: Service[] };
}
