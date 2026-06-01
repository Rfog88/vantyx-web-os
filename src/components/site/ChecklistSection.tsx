import type { ServicePageContent } from "@/content/service-types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

/** Warm-cream "What's Included" — 2-column checklist with gold check icons. */
export function ChecklistSection({
  included,
}: {
  included: ServicePageContent["included"];
}) {
  return (
    <section className="bg-surface-warm">
      <div className="shell py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Eyebrow>{included.eyebrow}</Eyebrow>
          <h2 className="text-headline-section mt-2 text-on-surface">
            {included.heading}
          </h2>
        </div>
        <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {included.items.map((item) => (
            <li key={item.title} className="flex gap-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                <Icon name="check" className="h-4 w-4" />
              </span>
              <span>
                <span className="text-headline-card block text-on-surface">
                  {item.title}
                </span>
                <span className="text-body-lede mt-1 block text-on-surface-variant">
                  {item.description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
