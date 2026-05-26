import Image from "next/image";
import type { SiteConfig } from "@/lib/site-config";
import { Phone, ArrowRight } from "lucide-react";
import { telLink } from "@/lib/cn";

export function HeroLocal({ config }: { config: SiteConfig }) {
  const { hero, business, contact } = config;
  const headline = hero.headline || `${hero.service} in ${hero.city}`;
  const subhead = hero.subhead || `${business.foundedYear ? `Serving ${hero.city} since ${business.foundedYear}` : `Local, licensed, insured`}.`;

  return (
    <section id="home" className="relative isolate overflow-hidden bg-brand-primary text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/40 to-brand-primary/80" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-20 md:py-28 lg:py-32">
        {business.tagline ? (
          <p className="rounded-full bg-brand-accent/20 px-3 py-1 text-sm font-medium text-brand-accent">
            {business.tagline}
          </p>
        ) : (
          process.env.NODE_ENV !== "production" && (
            <p
              data-vantyx-missing="tagline"
              className="rounded-full bg-red-500/30 px-3 py-1 text-sm font-medium text-red-100 ring-1 ring-red-300"
            >
              [missing: tagline]
            </p>
          )
        )}
        <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          {headline}
        </h1>
        <p className="max-w-2xl text-lg text-white/90 md:text-xl">{subhead}</p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a
            href={telLink(contact.phone)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-accent px-6 py-3 text-base font-semibold text-brand-primary transition hover:brightness-95"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span className="tabular">{contact.phone}</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Get a Free Quote
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
