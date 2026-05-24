import type { SiteConfig } from "@site-config";
import { Phone } from "lucide-react";
import { telLink } from "@/lib/cn";

export function EmergencyBanner({ config }: { config: SiteConfig }) {
  return (
    <a
      href={telLink(config.contact.phone)}
      className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-primary md:text-base"
      aria-label="Call 24/7 emergency line"
    >
      <Phone className="h-4 w-4" aria-hidden="true" />
      <span>24/7 emergency service —</span>
      <span className="tabular underline decoration-2 underline-offset-2">{config.contact.phone}</span>
    </a>
  );
}
