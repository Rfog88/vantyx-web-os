import type { ServicePageContent } from "@/content/service-types";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** White "Our Process" — numbered cards with gold-circle step numbers. */
export function ProcessSteps({
  process,
}: {
  process: ServicePageContent["process"];
}) {
  return (
    <section className="bg-surface">
      <div className="shell py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Eyebrow>{process.eyebrow}</Eyebrow>
          <h2 className="text-headline-section mt-2 text-on-surface">
            {process.heading}
          </h2>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-md border border-outline bg-surface p-6"
            >
              <span className="text-stat flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent text-accent-dark">
                {i + 1}
              </span>
              <h3 className="text-headline-card mt-4 text-on-surface">{step.title}</h3>
              <p className="text-body-lede mt-2 text-on-surface-variant">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
