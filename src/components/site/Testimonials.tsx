import type { SiteContent } from "@/content/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { DesignedPlaceholder } from "@/components/ui/DesignedPlaceholder";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          className={i < rating ? "h-4 w-4" : "h-4 w-4 opacity-25"}
        />
      ))}
    </div>
  );
}

/*
 * Renders real reviews if present. If the list is empty, renders designed
 * placeholders — NEVER fabricated names/quotes/stars (the VAN-27 trap that
 * sank the Stitch "V2" home).
 */
export function Testimonials({
  testimonials,
  id = "reviews",
}: {
  testimonials: SiteContent["testimonials"];
  id?: string;
}) {
  const { eyebrow, heading, items } = testimonials;
  const hasReal = items.length > 0;

  return (
    <section id={id} className="bg-surface">
      <div className="shell py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="text-headline-section mt-2 text-on-surface">{heading}</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasReal
            ? items.map((t) => (
                <figure
                  key={t.author}
                  className="flex flex-col rounded-md border border-outline bg-surface p-6"
                >
                  {typeof t.rating === "number" && <Stars rating={t.rating} />}
                  <Icon name="quote" className="mt-3 h-6 w-6 text-accent-dark" />
                  <blockquote className="text-body-base mt-2 flex-1 text-on-surface-variant">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-4 text-[14px] font-bold text-on-surface">
                    {t.author}
                    {t.location && (
                      <span className="font-normal text-muted"> · {t.location}</span>
                    )}
                  </figcaption>
                </figure>
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <DesignedPlaceholder
                  key={i}
                  icon="quote"
                  caption="Your review goes here"
                  className="min-h-44"
                />
              ))}
        </div>
      </div>
    </section>
  );
}
