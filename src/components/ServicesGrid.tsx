import type { SiteConfig } from "@site-config";
import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

function ServiceIcon({ name }: { name?: string }) {
  const Fallback = Icons.Wrench;
  if (!name) return <Fallback className="h-7 w-7 text-brand-accent" aria-hidden="true" />;
  const Icon = (Icons as Record<string, unknown>)[name] as React.ComponentType<{ className?: string; "aria-hidden"?: boolean }> | undefined;
  if (!Icon) return <Fallback className="h-7 w-7 text-brand-accent" aria-hidden="true" />;
  return <Icon className="h-7 w-7 text-brand-accent" aria-hidden={true} />;
}

export function ServicesGrid({ config }: { config: SiteConfig }) {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            What we do
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-primary md:text-4xl">
            Services for {config.hero.city} homes and small businesses
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {config.services.map((s) => (
            <li
              key={s.title}
              className="group rounded-lg border border-gray-200 bg-white p-5 transition hover:border-brand-accent hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <ServiceIcon name={s.icon} />
                <h3 className="text-lg font-semibold text-brand-primary">{s.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-brand-muted">{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
