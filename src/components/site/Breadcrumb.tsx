import { Fragment } from "react";
import type { NavLink } from "@/content/types";

/** Home / Services / Page — last crumb in gold, non-link. */
export function Breadcrumb({ trail }: { trail: NavLink[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-surface">
      <ol className="shell flex flex-wrap items-center gap-2 py-4 text-[13px] font-semibold">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <Fragment key={c.label}>
              {i > 0 && <span className="text-muted">/</span>}
              {last ? (
                <span className="text-accent-dark">{c.label}</span>
              ) : (
                <a href={c.href} className="text-on-surface-variant hover:text-accent-dark">
                  {c.label}
                </a>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
