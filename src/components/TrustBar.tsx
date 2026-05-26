import type { SiteConfig } from "@/lib/site-config";
import { ShieldCheck, BadgeCheck, Star } from "lucide-react";
import { LICENSE_VERIFICATION_PENDING, sanitizeLicenseNumber } from "@/lib/license";

const defaultTrustItems = [
  "LICENSED & INSURED",
  "LOCALLY OWNED",
  "24/7 EMERGENCY",
];

export function TrustBar({ config }: { config: SiteConfig }) {
  const normalizedBusinessLicense = sanitizeLicenseNumber(config.business.licenseNumber);
  const trustLabels = config.trustItems
    ?.map((item) => item.label)
    .filter(Boolean)
    .map((label) => String(label).trim())
    .filter(Boolean);
  const normalizedTrustItems = (trustLabels ?? []).map((label) => {
    if (/^license(?:d)?\b/i.test(label) && normalizedBusinessLicense) {
      if (normalizedBusinessLicense === LICENSE_VERIFICATION_PENDING) {
        return LICENSE_VERIFICATION_PENDING;
      }
      return `License #${normalizedBusinessLicense}`;
    }
    return label;
  });
  const effectiveTrustItems = [...normalizedTrustItems, ...defaultTrustItems].slice(0, 3);

  const items: Array<{ icon: React.ReactNode; label: string }> = [
    {
      icon: <BadgeCheck className="h-5 w-5 text-brand-accent" aria-hidden="true" />,
      label: effectiveTrustItems[0],
    },
    {
      icon: <Star className="h-5 w-5 fill-brand-accent text-brand-accent" aria-hidden="true" />,
      label: effectiveTrustItems[1],
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-brand-accent" aria-hidden="true" />,
      label: effectiveTrustItems[2],
    },
  ];

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm font-medium text-brand-text"
            data-trust-slot={i + 1}
          >
            {item.icon}
            {item.label === LICENSE_VERIFICATION_PENDING ? (
              <span
                data-placeholder-slot="license"
                aria-label="Concept demo: license verification pending"
              >
                {item.label}
              </span>
            ) : (
              <span>{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
