import type { SiteConfig } from "@/lib/site-config";
import { CreditCard } from "lucide-react";

export function FinancingCTA({ config }: { config: SiteConfig }) {
  const f = config.financing;
  if (!f?.enabled) return null;

  return (
    <section className="bg-brand-primary py-12 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <CreditCard className="mt-1 h-8 w-8 text-brand-accent" aria-hidden="true" />
          <div>
            <h2 className="text-2xl font-bold">Financing available</h2>
            <p className="mt-1 max-w-xl text-white/80">
              {f.minProjectUsd
                ? `0% APR options on projects over $${f.minProjectUsd.toLocaleString()}.`
                : "Flexible payment plans on qualifying projects."}
              {f.partner ? ` Through ${f.partner}.` : ""}
            </p>
          </div>
        </div>
        <a
          href="#book"
          className="inline-flex items-center justify-center rounded-md bg-brand-accent px-6 py-3 text-base font-semibold text-brand-primary transition hover:brightness-95"
        >
          See if you qualify
        </a>
      </div>
    </section>
  );
}
