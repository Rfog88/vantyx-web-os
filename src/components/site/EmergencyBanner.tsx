import type { BusinessInfo } from "@/content/types";

/** Thin gold 24/7 strip. Config-toggled: renders only when emergency.enabled. */
export function EmergencyBanner({ business }: { business: BusinessInfo }) {
  const e = business.emergency;
  if (!e?.enabled) return null;
  return (
    <div className="bg-accent text-on-accent">
      <div className="shell flex items-center justify-between gap-4 py-2">
        <p className="text-eyebrow">{e.label}</p>
        {e.cta && (
          <a
            href={e.cta.href}
            className="text-[13px] font-bold underline-offset-2 hover:underline"
          >
            {e.cta.label}
          </a>
        )}
      </div>
    </div>
  );
}
