"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function Faq({
  eyebrow,
  heading,
  items,
  defaultOpen = 0,
}: {
  eyebrow?: string;
  heading: string;
  items: FaqItem[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <section className="bg-surface-warm">
      <div className="shell max-w-3xl py-16">
        <div className="mb-8 text-center">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="text-headline-section mt-2 text-on-surface">{heading}</h2>
        </div>
        <ul className="flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className="overflow-hidden rounded-md border border-outline bg-surface"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-headline-card text-on-surface">{item.q}</span>
                  <Icon
                    name={isOpen ? "close" : "plus"}
                    className="h-5 w-5 shrink-0 text-accent-dark"
                  />
                </button>
                <div className={cn("px-5 pb-5", isOpen ? "block" : "hidden")}>
                  <p className="text-body-base text-on-surface-variant">{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
