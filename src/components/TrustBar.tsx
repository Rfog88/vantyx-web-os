import type { SiteConfig } from "@site-config";
import { ShieldCheck, BadgeCheck, Star } from "lucide-react";

export function TrustBar({ config }: { config: SiteConfig }) {
  const { business } = config;
  const items: Array<{ icon: React.ReactNode; label: string }> = [];

  if (business.licenseNumber) {
    items.push({
      icon: <BadgeCheck className="h-5 w-5 text-brand-accent" aria-hidden="true" />,
      label: `Licensed #${business.licenseNumber}`,
    });
  }
  if (business.insurance) {
    items.push({
      icon: <ShieldCheck className="h-5 w-5 text-brand-accent" aria-hidden="true" />,
      label: `Insured — ${business.insurance}`,
    });
  }
  if (business.bbb?.accredited) {
    items.push({
      icon: <BadgeCheck className="h-5 w-5 text-brand-accent" aria-hidden="true" />,
      label: `BBB ${business.bbb.rating || "Accredited"}`,
    });
  }
  items.push({
    icon: <Star className="h-5 w-5 fill-brand-accent text-brand-accent" aria-hidden="true" />,
    label: business.foundedYear
      ? `Trusted since ${business.foundedYear}`
      : "Locally owned and operated",
  });

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 py-6 sm:grid-cols-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm font-medium text-brand-text">
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
