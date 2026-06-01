import type { Stat } from "@/content/types";
import { Icon } from "@/components/ui/Icon";

/** Deep-navy credibility band: gold-outlined circle icon + stat + fog label. */
export function TrustBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-inverse-surface-deep text-on-inverse">
      <div className="shell grid grid-cols-2 gap-8 py-16 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent text-accent">
              {s.icon && <Icon name={s.icon} className="h-5 w-5" />}
            </span>
            <span className="text-stat text-on-inverse">{s.value}</span>
            <span className="text-[13px] text-on-inverse-muted">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
