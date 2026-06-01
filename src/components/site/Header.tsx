"use client";

import { useState } from "react";
import type { BusinessInfo, Cta, NavLink } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { telHref } from "@/lib/phone";
import { cn } from "@/lib/cn";

export function Header({
  business,
  nav,
  primaryCta,
}: {
  business: BusinessInfo;
  nav: NavLink[];
  primaryCta: Cta;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-primary bg-surface">
      <div className="shell flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <a href="#" className="text-headline-card uppercase tracking-tight text-on-surface">
          {business.name}
        </a>

        {/* Desktop nav (≥900px) */}
        <nav className="hidden items-center gap-7 min-[900px]:flex">
          {nav.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14.5px] font-semibold text-on-surface transition-colors hover:text-accent-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-4 min-[900px]:flex">
          <a
            href={telHref(business.phone)}
            className="text-[14.5px] font-bold text-on-surface hover:text-accent-dark"
          >
            {business.phone}
          </a>
          <Button href={primaryCta.href} variant="primary">
            <Icon name="phone" className="h-4 w-4" />
            {primaryCta.label}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-on-surface min-[900px]:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile panel */}
      <div className={cn("border-t border-outline bg-surface min-[900px]:hidden", open ? "block" : "hidden")}>
        <nav className="shell flex flex-col gap-1 py-4">
          {nav.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-[15px] font-semibold text-on-surface hover:text-accent-dark"
            >
              {link.label}
            </a>
          ))}
          <a href={telHref(business.phone)} className="py-2 text-[15px] font-bold text-on-surface">
            {business.phone}
          </a>
          <Button href={primaryCta.href} variant="primary" className="mt-2 w-full">
            {primaryCta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
