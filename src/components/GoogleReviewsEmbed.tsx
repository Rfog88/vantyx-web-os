import type { SiteConfig } from "@/lib/site-config";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";

type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  source?: string;
};

type SourcedRating = {
  author?: string;
  quote?: string;
  body?: string;
  rating?: number;
  source?: string;
  relative_time_description?: string;
};

function normalizeSourceLabel(source?: string): string | undefined {
  if (!source) return undefined;
  const normalized = source.trim().toLowerCase();
  if (!normalized) return undefined;
  if (normalized === "gbp" || normalized.includes("google")) return "Google";
  return undefined;
}

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
  const sourcedRatings = (config as SiteConfig & { sourced_ratings?: SourcedRating[] }).sourced_ratings;

  const reviews: Review[] =
    live?.map((r) => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      relative_time_description: r.relative_time_description,
      source: "Google",
    })) ||
    sourcedRatings?.map((r) => ({
      author_name: r.author || "Verified Customer",
      rating: r.rating || 5,
      text: r.body || r.quote || "",
      relative_time_description: r.relative_time_description,
      source: normalizeSourceLabel(r.source),
    }))?.filter((r) => r.text) ||
    config.testimonials?.map((t) => ({
      author_name: t.author,
      rating: t.rating,
      text: t.body || t.quote,
      source: normalizeSourceLabel(t.source),
    })) ||
    [];

  if (reviews.length === 0) return null;

  return (
    <TestimonialsCarousel
      reviews={reviews.slice(0, 6)}
      subhead={live ? "Live Google Reviews" : "What our customers say"}
      headline={`Trusted by ${config.hero.city} homeowners`}
      sectionId="reviews"
    />
  );
}
