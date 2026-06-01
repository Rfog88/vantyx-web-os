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

> Built as the fix for the VAN-27 quality problems: prettier *and* honest. Missing
> photos/reviews render as designed placeholders, never stock gloss, and every site
> clears the `brand-consistency-check` gate before it ships.
