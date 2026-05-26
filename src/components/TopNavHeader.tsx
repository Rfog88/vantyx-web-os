"use client";

import { useState } from "react";
import type { SiteConfig } from "@/lib/site-config";
import { Menu, Phone, X } from "lucide-react";
import { telLink } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "#home", label: "HOME" },
  { href: "#services", label: "SERVICES" },
  { href: "#about", label: "ABOUT" },
  { href: "#work", label: "WORK" },
  { href: "#reviews", label: "REVIEWS" },
  { href: "#service-area", label: "SERVICE AREA" },
  { href: "#contact", label: "CONTACT" },
] as const;

type TopNavHeaderProps = {
  config: SiteConfig;
};

export function TopNavHeader({ config }: TopNavHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { business, contact } = config;
  const initials = business.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#home" className="flex min-w-0 items-center gap-3" aria-label={`${business.name} home`}>
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-primary text-sm font-bold tracking-wide text-white">
            {initials || "VX"}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-brand-primary sm:text-base">{business.name}</span>
            {business.tagline ? (
              <span className="hidden truncate text-xs text-brand-muted lg:block">{business.tagline}</span>
            ) : null}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-brand-text transition hover:text-brand-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-brand-primary/20 p-2 text-brand-text md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="site-main-nav"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>

        <a
          href={telLink(contact.phone)}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brand-accent px-3 py-2 text-sm font-semibold text-brand-primary transition hover:brightness-95 sm:px-4"
          aria-label={`Call ${contact.phone}`}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span className="tabular">{contact.phone}</span>
        </a>
      </div>

      {isMenuOpen && (
        <div id="site-main-nav" className="border-t border-gray-200/80 bg-white md:hidden">
          <nav aria-label="Primary mobile" className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-2 text-sm font-semibold text-brand-text transition hover:text-brand-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
