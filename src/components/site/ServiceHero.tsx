import type { ServicePageContent } from "@/content/service-types";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { DesignedPlaceholder } from "@/components/ui/DesignedPlaceholder";

/** Service-page hero: like the home hero, minus the overlapping feature card. */
export function ServiceHero({ hero }: { hero: ServicePageContent["hero"] }) {
  return (
    <section className="bg-inverse-surface text-on-inverse">
      <div className="shell grid items-center gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-20">
        <div>
          <Eyebrow onDark>{hero.eyebrow}</Eyebrow>
          <h1 className="text-display-hero mt-3">
            {hero.title}
            <br />
            <span className="text-accent">{hero.accentLine}</span>
          </h1>
          <div className="mt-5 h-1 w-16 rounded-full bg-accent" />
          <p className="text-body-base mt-6 max-w-xl text-on-inverse-variant">
            {hero.lede}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.ghostCta.href} variant="outline">
              <Icon name="phone" className="h-4 w-4" />
              {hero.ghostCta.label}
            </Button>
          </div>
        </div>
        {hero.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.imageSrc}
            alt=""
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
        ) : (
          <DesignedPlaceholder
            onDark
            icon="bolt"
            caption={hero.imageCaption}
            className="min-h-64 md:min-h-80"
          />
        )}
      </div>
    </section>
  );
}
