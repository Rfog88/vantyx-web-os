"use client";

import { useState } from "react";
import { Quote, Star } from "lucide-react";

type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
};

export function TestimonialsCarousel({
  reviews,
  headline,
  subhead,
  sectionId,
}: {
  reviews: Review[];
  headline: string;
  subhead: string;
  sectionId?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const goToNext = () => setActiveIndex((current) => (current + 1) % reviews.length);
  const goToPrev = () => setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length);

  return (
    <section id={sectionId} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">{subhead}</p>
            <h2 className="mt-2 text-3xl font-bold text-brand-primary md:text-4xl">{headline}</h2>
          </div>
        </header>

        <div
          className="overflow-hidden"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goToNext();
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              goToPrev();
            }
          }}
          aria-label="Testimonials carousel"
        >
          <ul
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            aria-live="polite"
          >
            {reviews.map((r, i) => (
              <li key={i} className="w-full shrink-0" data-placeholder-slot="testimonial">
                <article className="rounded-lg border border-gray-200 bg-gray-50 p-6">
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

                  <p className="mb-4 text-base leading-relaxed text-brand-text md:text-lg">{r.text}</p>
                  <p className="text-sm font-medium text-brand-muted">
                    — {r.author_name}
                    {r.relative_time_description ? ` · ${r.relative_time_description}` : ""}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>

        {reviews.length > 1 ? (
          <div className="mt-6 flex items-center justify-center gap-2" aria-label="Testimonial pagination">
            {reviews.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={activeIndex === index}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  activeIndex === index ? "bg-brand-accent" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
