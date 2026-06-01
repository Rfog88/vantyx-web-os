import type { Service } from "@/content/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

function ServiceCard({ service }: { service: Service }) {
  return (
    <a
      href={`#${service.slug}`}
      className="group flex flex-col rounded-md border border-outline bg-surface p-6 transition-all duration-150 hover:-translate-y-[3px] hover:border-accent hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border-2 border-accent bg-surface-warm text-accent-dark">
        {service.icon && <Icon name={service.icon} className="h-5 w-5" />}
      </span>
      <h3 className="text-headline-card text-on-surface">{service.title}</h3>
      <p className="text-body-lede mt-2 flex-1 text-on-surface-variant">
        {service.description}
      </p>
      <span className="text-eyebrow mt-4 inline-flex items-center gap-1 text-accent-dark">
        Learn More
        <Icon name="arrow-right" className="h-4 w-4" />
      </span>
    </a>
  );
}

export function ServiceGrid({
  eyebrow,
  heading,
  items,
  id = "services",
  tone = "cream",
}: {
  eyebrow: string;
  heading: string;
  items: Service[];
  id?: string;
  tone?: "cream" | "white";
}) {
  return (
    <section id={id} className={tone === "cream" ? "bg-surface-warm" : "bg-surface"}>
      <div className="shell py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-headline-section mt-2 text-on-surface">{heading}</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
