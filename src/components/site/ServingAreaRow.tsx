import { Fragment } from "react";
import type { SiteContent } from "@/content/types";

/** Full-width row: "WE SERVE" gold eyebrow + city links split by thin gold dividers. */
export function ServingAreaRow({
  serviceAreas,
  id = "areas",
}: {
  serviceAreas: SiteContent["serviceAreas"];
  id?: string;
}) {
  return (
    <section id={id} className="border-y border-outline bg-surface">
      <div className="shell-full flex flex-wrap items-center justify-center gap-x-4 gap-y-3 py-8 text-center">
        <span className="text-eyebrow text-accent-dark">
          {serviceAreas.eyebrow}
        </span>
        {serviceAreas.cities.map((city, i) => (
          <Fragment key={city}>
            {i > 0 && <span className="h-4 w-px bg-accent/50" aria-hidden="true" />}
            <a
              href="#areas"
              className="text-[15px] font-semibold text-on-surface hover:text-accent-dark"
            >
              {city}
            </a>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
