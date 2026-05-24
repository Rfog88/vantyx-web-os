import type { SiteConfig } from "@/lib/site-config";
import { Star, Quote } from "lucide-react";

type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
};

async function fetchGoogleReviews(placeId?: string): Promise<Review[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || !placeId || placeId.startsWith("ChIJxxxx")) {
    // No key or placeholder placeId — gracefully degrade.
    return null;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.result?.reviews?.slice(0, 6) || null;
  } catch {
    return null;
  }
}

export async function GoogleReviewsEmbed({ config }: { config: SiteConfig }) {
  const live = await fetchGoogleReviews(config.business.googlePlaceId);

  const reviews: Review[] =
    live?.map((r) => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      relative_time_description: r.relative_time_description,
    })) ||
    config.testimonials?.map((t) => ({
      author_name: t.author,
      rating: t.rating,
      text: t.quote,
    })) ||
    [];

  if (reviews.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
              {live ? "Live Google Reviews" : "What our customers say"}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-brand-primary md:text-4xl">
              Trusted by {config.hero.city} homeowners
            </h2>
          </div>
        </header>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((r, i) => (
            <li key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center" aria-label={`${r.rating} stars`}>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star
                      key={k}
                      className={k < r.rating ? "h-4 w-4 fill-brand-accent text-brand-accent" : "h-4 w-4 text-gray-300"}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-brand-muted" aria-hidden="true" />
              </div>
              <p className="mb-3 text-sm leading-relaxed text-brand-text">{r.text}</p>
              <p className="text-xs font-medium text-brand-muted">
                — {r.author_name}
                {r.relative_time_description ? ` · ${r.relative_time_description}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
