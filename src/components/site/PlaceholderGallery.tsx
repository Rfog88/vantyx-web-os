import type { ServicePageContent } from "@/content/service-types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DesignedPlaceholder } from "@/components/ui/DesignedPlaceholder";

/** "Recent Installations" — designed photo placeholders until real job photos exist. */
export function PlaceholderGallery({
  gallery,
}: {
  gallery: ServicePageContent["gallery"];
}) {
  return (
    <section className="bg-surface">
      <div className="shell py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          {gallery.eyebrow && <Eyebrow>{gallery.eyebrow}</Eyebrow>}
          <h2 className="text-headline-section mt-2 text-on-surface">
            {gallery.heading}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: gallery.count }).map((_, i) => (
            <DesignedPlaceholder
              key={i}
              icon="camera"
              slot="gallery"
              caption={gallery.caption}
              className="min-h-56"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
