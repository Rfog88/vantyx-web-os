# vantyx-web-os

The reusable design system + component library behind Vantyx customer websites.

- **House style:** [`.stitch/DESIGN.md`](.stitch/DESIGN.md) — a navy + gold trades
  aesthetic reverse-engineered from the Fogle & Sons site (the validated quality bar),
  with per-vertical accent **theme variants** to avoid cookie-cutter output.
- **Stack:** Next.js 15 + Tailwind v4 + shadcn/ui + Vercel (matches the Vantyx
  `demo-gen` pipeline and the Google `stitch-skills` toolchain).
- **Workflow:** Stitch designs the look → `DESIGN.md` captures it → Claude Code +
  stitch-skills build it as React/shadcn components → deploy to Vercel.

See [`SETUP.md`](SETUP.md) for the one-time Stitch MCP auth and the phase-by-phase
build plan. Per-customer sites are produced by swapping a tokens file + a content
JSON — never by editing the component markup.

## Component library (Phase 2)

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static export of demo pages)
```

- **Demo pages** — `/` (home) and `/services/panel-upgrades` (service-detail
  template), composed entirely from the library.
- **Tokens** — [`src/styles/tokens.css`](src/styles/tokens.css) holds the house-style
  CSS variables (mirrors `DESIGN.md`). [`src/app/globals.css`](src/app/globals.css)
  maps them to Tailwind v4 utilities (`bg-surface`, `text-accent`, `text-display-hero`,
  `shell`, …). **To rebrand a customer, change only `--accent` / `--accent-dark`.**
- **Content** — typed in [`src/content/types.ts`](src/content/types.ts);
  one `SiteContent` object drives a whole site (sample:
  [`src/content/midlands-electric.ts`](src/content/midlands-electric.ts)).
- **Components** — [`src/components/site/`](src/components/site) (Header,
  EmergencyBanner, Hero, TrustBar, ServiceGrid, FinancingBand, Faq, Testimonials,
  ServingAreaRow, FinalCta, Footer, Breadcrumb, ServiceHero, ChecklistSection,
  ProcessSteps, PlaceholderGallery) and primitives in
  [`src/components/ui/`](src/components/ui) (Button, Icon, Eyebrow, DesignedPlaceholder).
- **VAN-27** — `DesignedPlaceholder` and an empty `testimonials.items` render honest
  dashed-frame placeholders; the library never fabricates reviews or uses stock gloss.

> Built as the fix for the VAN-27 quality problems: prettier *and* honest. Missing
> photos/reviews render as designed placeholders, never stock gloss, and every site
> clears the `brand-consistency-check` gate before it ships.
