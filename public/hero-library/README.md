# Vantyx Hero Library

Per-niche dramatic-interior hero plates used by the
`data-placeholder-slot="hero-photo"` element in `HeroLocal`. Curated by
UX/Designer per [VAN-96 plan](/VAN/issues/VAN-96#document-plan) Option 1
(Vantyx-curated library) and shipped under [VAN-109](/VAN/issues/VAN-109).

## License

**All files in this directory are Vantyx-controlled originals.** They are
hand-authored SVG compositions (no third-party photography, no AI raster
generation, no stock licensing). Vantyx holds full commercial usage rights
in perpetuity. No attribution required.

**Zero Unsplash.** Class E `unsplash_ban` passes by construction.

The compositions are intentionally graphic-stylised, not photoreal — they
are honest-concept placeholders consistent with the CTO's `placeholder-slot`
framing in VAN-96. They are not pretending to be the prospect's actual
property.

## Layout

```
hero-library/
  electrician/
    panel-room-led.svg          # dark panel wall + amber LED accent
    kitchen-led-counter.svg     # under-cabinet warm LED, dark kitchen
    ceiling-recessed.svg        # recessed-can grid in dark room
  plumber/
    matte-black-faucet.svg      # matte-black faucet, dark stone counter
    walk-in-shower.svg          # rainfall head, large-format tile, steam
  hvac/
    minisplit-wall.svg          # wall-mounted mini-split + cool airflow
    vent-register-climate.svg   # ceiling vent + warm/cool gradient
```

All files use `viewBox="0 0 1920 800"` with
`preserveAspectRatio="xMidYMid slice"`. SVG is resolution-independent so the
≥1920×800 target is met at any render size without rasterisation artifacts.

## Per-file source notes

| File | Niche | Concept (also usable as AI regen prompt) |
| --- | --- | --- |
| `electrician/panel-room-led.svg` | electrician | Dark electrical-panel wall, breaker grid visible, amber LED strip above panel, conduit run to ceiling, dramatic side-light. Vantyx slate `#0F172A` + amber `#F59E0B` / yellow `#FACC15`. |
| `electrician/kitchen-led-counter.svg` | electrician | Modern dark kitchen, upper + lower cabinets, glowing warm under-cabinet LED strip, three pendant silhouettes. Honest-concept "lighting work delivered." |
| `electrician/ceiling-recessed.svg` | electrician | Dark interior ceiling with two rows of recessed cans casting warm bloom; subtle floor light pools. Evokes "we installed all of this." |
| `plumber/matte-black-faucet.svg` | plumber | Matte-black gooseneck faucet on dark stone counter, subtle chrome highlight, undermount rectangular sink, water column with soft bloom. Cool top-light. |
| `plumber/walk-in-shower.svg` | plumber | Large-format dark tile walk-in shower, rainfall head, vertical water columns, faint steam ambience, glass divider hint. |
| `hvac/minisplit-wall.svg` | HVAC | Wall-mounted ductless mini-split (set to 72°), couch silhouette below, cool airflow streaks dropping from louvers. Suggests living-space comfort delivery. |
| `hvac/vent-register-climate.svg` | HVAC | Ceiling-mounted register with cool airflow falling into a room split across a warm/cool climate gradient. Communicates whole-home climate control. |

## Resolver mapping (for [VAN-110](/VAN/issues/VAN-110))

When wiring `niche → heroPhoto` in `SiteConfig`, the recommended primary
photo per niche (`/hero-library/<niche>/<file>.svg`):

| niche | default | secondary | tertiary |
| --- | --- | --- | --- |
| `electrician` | `electrician/panel-room-led.svg` | `electrician/ceiling-recessed.svg` | `electrician/kitchen-led-counter.svg` |
| `plumber`     | `plumber/matte-black-faucet.svg` | `plumber/walk-in-shower.svg` | — |
| `hvac`        | `hvac/minisplit-wall.svg`        | `hvac/vent-register-climate.svg` | — |

**Collier vs Brandon variety (per VAN-110 acceptance):** both are
electrician demos and the acceptance criterion says they must differ. Use
`panel-room-led.svg` for Collier (primary) and `ceiling-recessed.svg` for
Brandon (secondary). `kitchen-led-counter.svg` is the third variant for
future demos.

**Unknown-niche fallback:** if `niche` resolves to nothing in Phase 1, use
`electrician/ceiling-recessed.svg` — it's the most palette-neutral of the
seven plates (Vantyx slate + amber, no niche-specific subject hardware).
This satisfies the "designer's pick — flag in the resolver" note in
VAN-110.

## Treatment guidance (for hero rendering)

Per VAN-110 spec, the rendered `<img>` should carry an additional
**35–50% black CSS overlay** to ensure white hero copy reads. The plates
already embed a baseline `opacity="0.18"` dark vignette inside the SVG.
The CSS overlay stacks on top of that — the math still leaves the subject
visible without crushing detail.

## Phase 2 swap path

If we later swap to AI-generated raster photos (e.g., for richer demos),
the **Concept** column in the per-file source notes table is the prompt to
feed the generator. Save the resulting `.webp` under the same path
(replacing `.svg` extension); the resolver stays the same.

Until that swap happens, these SVG plates are the production deliverable
and `brand-consistency-check` should treat them as license-clear Vantyx
originals.
