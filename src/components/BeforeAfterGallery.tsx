import Image from "next/image";
import type { SiteConfig } from "@/lib/site-config";

export function BeforeAfterGallery({ config }: { config: SiteConfig }) {
  const items = config.gallery || [];
  if (items.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Recent work
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-primary md:text-4xl">
            See what we&apos;ve built
          </h2>
        </header>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((g, i) => (
            <li key={i} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition group-hover:scale-105"
              />
              {g.type === "before-after" && (
                <span className="absolute left-2 top-2 rounded bg-brand-primary/80 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Before / After
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
