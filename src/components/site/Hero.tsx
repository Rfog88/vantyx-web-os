import type { SiteContent } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { DesignedPlaceholder } from "@/components/ui/DesignedPlaceholder";

type HeroContent = SiteContent["hero"];

function FeatureCard({ benefits }: { benefits: HeroContent["benefits"] }) {
  return (
    <div className="shell-wide relative z-10 -mt-16">
      <div className="grid grid-cols-2 gap-6 rounded-lg border-2 border-accent bg-inverse-surface-card p-6 shadow-[0_14px_36px_rgba(0,0,0,0.35)] md:grid-cols-4 md:p-8">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent">
              {b.icon && <Icon name={b.icon} className="h-5 w-5" />}
            </span>
            <span>
              <span className="block text-[15px] font-extrabold text-on-inverse">
                {b.title}
              </span>
              {b.sub && (
                <span className="block text-[13px] text-on-inverse-muted">{b.sub}</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <>
      <section className="bg-inverse-surface text-on-inverse">
        <div className="shell grid items-center gap-10 py-16 pb-28 md:grid-cols-[0.85fr_1.15fr] md:py-20 md:pb-32">
          {/* Text */}
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

          {/* Image / designed placeholder */}
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

      <FeatureCard benefits={hero.benefits} />
    </>
  );
}
