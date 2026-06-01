---
name: Vantyx Trades — Midlands House Style
colors:
  # Primary foundation (light surfaces)
  surface: '#ffffff'
  surface-warm: '#f7f4ed'
  surface-container: '#f7f4ed'
  surface-container-high: '#efeadd'
  on-surface: '#202638'
  on-surface-variant: '#4a5468'
  muted: '#6b7280'
  outline: '#e5e1d6'
  # Inverse foundation (dark / hero & trust sections)
  inverse-surface: '#1a2238'
  inverse-surface-deep: '#0d1a30'
  inverse-surface-card: '#15233e'
  on-inverse: '#ffffff'
  on-inverse-variant: '#c8cad0'
  on-inverse-muted: '#aab0bd'
  # Brand
  primary: '#1a2238'
  on-primary: '#ffffff'
  primary-container: '#15233e'
  # Accent / interactive (CTA gold)
  accent: '#f0a800'
  accent-dark: '#d99500'
  on-accent: '#202638'
  # Functional states
  success: '#1f9d55'
  error: '#ba1a1a'
  on-error: '#ffffff'
typography:
  display-hero:
    fontFamily: system-ui
    fontSize: 46px
    fontWeight: '800'
    lineHeight: 51px
    letterSpacing: -0.5px
  headline-section:
    fontFamily: system-ui
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-card:
    fontFamily: system-ui
    fontSize: 18px
    fontWeight: '800'
    lineHeight: 22px
    letterSpacing: '0'
  body-base:
    fontFamily: system-ui
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: '0'
  body-lede:
    fontFamily: system-ui
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: '0'
  eyebrow-caps:
    fontFamily: system-ui
    fontSize: 13px
    fontWeight: '800'
    lineHeight: 16px
    letterSpacing: 0.15em
  stat-lg:
    fontFamily: system-ui
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.375rem
  md: 0.625rem
  lg: 0.875rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section-y: 64px
  gutter: 24px
  margin-mobile: 24px
  margin-desktop: 56px
fonts:
  primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
  display: 'Inter, system-ui, sans-serif'
---

# Design System: Vantyx Trades — Midlands House Style

**Origin:** Reverse-engineered from the Fogle & Sons Electric homepage (the look the
owner has validated as the quality bar). This is the *house style* for Vantyx-built
home-services / trades websites — electricians first, then plumbers, HVAC, roofers,
and adjacent verticals. Swap the **accent** color per customer to keep sites distinct
without losing the proven structure (see "Theme Variants" at the end).

## 1. Visual Theme & Atmosphere

The personality is **trustworthy, established, and local-blue-collar premium** — the
feel of a licensed family contractor who has been on the job for decades, not a
fly-by-night. It is **confident and substantial** rather than airy or trendy: dark
navy anchors the page with weight and authority, warm cream softens the working
areas so the page never feels cold or corporate, and a single decisive gold accent
does all the "act now" work.

Density is **moderate and breathable** — generous 64px section rhythm, large touch
targets, and one clear call-to-action per band. Nothing competes with the phone
number. The mood reads "dependable trade professional" to a homeowner deciding who
to let into their house: serious enough to trust with a panel upgrade, warm enough
to call without anxiety. Avoid: pastel gradients, glassmorphism, playful rounded
"startup" aesthetics, or stock-photo gloss. Favor: real photography, solid fills,
hairline borders, and confident typographic weight.

## 2. Color Palette & Roles

### Primary Foundation
- **Paper White (#ffffff)** — Default page background and card surfaces. Keeps the
  interface clean and legible.
- **Warm Cream (#f7f4ed)** — Alternating section background (services grid, FAQ).
  Warms the page and visually separates content bands without hard lines.
- **Parchment Border (#e5e1d6)** — Hairline borders on cards and dividers. Defines
  structure quietly; never heavy.

### Inverse Foundation (the signature dark bands)
- **Midnight Navy (#1a2238)** — The brand anchor. Header bottom-border, hero
  background, feature cards, footer. Conveys authority and reliability.
- **Deep Navy (#0d1a30)** — The darkest layer: "Why choose us" trust band and
  deep footer. Used to make the gold and white pop hardest.
- **Slate Navy Card (#15233e)** — Subtle elevated panels inside dark bands.

### Accent & Interactive
- **Trade Gold (#f0a800)** — The single decisive accent. Primary CTAs, the 64px hero
  underline, icon strokes, active nav. Used sparingly so it always means "do this."
- **Burnished Gold (#d99500)** — Hover/pressed state for gold elements, and the
  eyebrow/label color on light backgrounds (for AA contrast on cream).

### Typography & Text Hierarchy
- **Ink (#202638)** — Primary headings and high-emphasis text on light surfaces.
- **Slate Body (#4a5468)** — Body copy on light surfaces. Softer than the headings
  so hierarchy is felt, not shouted.
- **Muted Gray (#6b7280)** — Tertiary text, captions, fine print.
- **Mist (#c8cad0)** — Lede/body text on navy backgrounds.
- **Fog (#aab0bd)** — Tertiary text on navy (benefit sub-labels).

### Functional States
- **Field Green (#1f9d55)** — Success, "licensed & insured" affirmations.
- **Alert Red (#ba1a1a)** — Errors and urgent/emergency emphasis only.

## 3. Typography Rules

### Hierarchy & Weights
The system runs on the **native system font stack** (`-apple-system, Segoe UI,
Roboto…`) for zero-latency loading and a neutral, dependable feel — no webfont flash,
no licensing, instant render. (Optional upgrade path: **Inter** for display headings
if a customer wants a sharper, more designed character; keep system stack for body.)

- **Hero display:** 46px / weight 800 / line-height 1.1 / tracking -0.5px. The hero
  H1 often splits into a white line + a gold `.accent` line beneath it.
- **Section headline:** 34px / 800, usually centered, paired with an eyebrow above.
- **Card headline:** 18px / 800.
- **Eyebrow / label:** 13px / 800 / UPPERCASE / letter-spacing 0.15em, in Burnished
  Gold on light or Trade Gold on dark. Signals the start of every major section.
- **Body:** 15–16px / 400 / line-height ~1.6–1.7 for comfortable reading.
- **Stats:** 32px / 800 for trust numbers ("16+ Years", "5.0 Stars").

### Spacing Principles
Headings sit tight to their underline/eyebrow, then breathe before body. Generous
line-height on body (1.6+) signals approachability; display lines stay tight (1.1)
for strength. Letter-spacing is negative on large display, wide on small caps labels.

## 4. Component Stylings

### Buttons
- **Radius 6px** (`DEFAULT`) — subtly rounded, professional, not playful.
- **Primary:** solid **Trade Gold** fill with **Ink** text and a 2px gold border;
  hover deepens to Burnished Gold. This is the phone-call / book-now button.
- **Ghost:** white fill, gold border, ink text; hover to faint gold tint (#fff8e6).
- **Outline:** transparent with gold border + gold text; hover inverts to gold fill.
- Min height ~44px; padding ~11–13px × 20–22px; weight 700; never all-caps.

### Cards & Containers
- **Service cards:** white, **10px** radius, 1px Parchment border, 24px padding.
  Hover lifts 3px with a soft shadow (`0 12px 28px rgba(0,0,0,0.08)`) and the border
  turns gold. Icon sits in a 48px cream tile with a 2px gold border.
- **Feature/benefit card (overlapping the hero):** navy fill, **14px** radius, a 2px
  gold border, and a heavy ambient shadow (`0 14px 36px rgba(0,0,0,0.35)`). Pulled up
  with a negative top margin so it straddles the hero and the next band.
- Shadow philosophy: **flat by default, soft on hover for light cards, one heavy
  shadow for the floating feature card.** No shadows on flat sections.

### Navigation
- Sticky white header, 3px **Midnight Navy** bottom border, logo left, centered nav,
  CTA buttons right. Nav links 14.5px / weight 600, hover to gold, dropdowns with a
  4px-radius white panel and a soft `0 8px 24px` shadow.
- **Mobile (<900px):** collapses to a 3-bar hamburger that animates to an X.

### Inputs & Forms
- White fill, 1px Parchment border, 6px radius to match buttons; focus ring in Trade
  Gold. Labels always visible above the field. (Booking is typically a Housecall Pro
  / embedded widget rather than a raw form.)

### Domain-Specific Components
- **Trust strip:** a navy-deep band of 4–5 stats, each a gold-outlined 48px circle
  icon + a large stat number + a small Fog label. The credibility workhorse.
- **Serving-area row:** a single horizontal row of linked city names separated by
  thin gold dividers, led by a "WE SERVE" gold eyebrow.
- **Designed placeholder (REQUIRED):** where a real photo/review/owner-bio is missing,
  render a **dashed Parchment-border frame** with a centered icon and caption
  ("Your photo goes here"). **Never** a stock photo and **never** a silent gap — this
  is the VAN-27 trust-content rule baked into the system.

## 5. Layout Principles

### Grid & Structure
- Content max-width **1200px** for standard sections; **1280px** for the feature
  card; up to **1600px** for the full-width serving-area row.
- Hero is a 2-column grid (`~0.85fr` text / `1.15fr` image) that stacks on mobile.
- Service cards use `repeat(auto-fit, minmax(260px, 1fr))`; trust stats `repeat(4,1fr)`.

### Whitespace Strategy
- Base rhythm on a **4px/8px** unit; **64px** vertical padding between major sections.
- Edge padding **24px mobile → 56px desktop**. Cards padded 24px internally.

### Alignment & Visual Balance
- Heroes are left-aligned (text block + image); section intros are centered with a
  centered eyebrow → headline → sub. Body content left-aligned for readability.

### Responsive Behavior & Touch
- Desktop-first composition that collapses cleanly: nav → hamburger at 900px, hero
  grid → single column, multi-column grids → 1–2 columns. Touch targets ≥44px.

## 6. Design System Notes for Stitch Generation

### Language to Use
"Trustworthy local contractor," "navy + gold," "substantial and dependable," "warm
cream working areas," "one decisive gold call-to-action," "real photography, no stock
gloss," "confident typographic weight," "hairline borders, flat fills."

### Color References
Primary **Midnight Navy (#1a2238)**, deepest **Deep Navy (#0d1a30)**, accent **Trade
Gold (#f0a800)**, working surface **Warm Cream (#f7f4ed)**, text **Ink (#202638)** /
**Slate Body (#4a5468)**, borders **Parchment (#e5e1d6)**.

### Component Prompts (examples for Stitch)
1. "A sticky white header with a navy 3px bottom border, centered nav in semibold,
   and a gold 'Call Now' button on the right."
2. "A navy hero, 2-column: left a bold white H1 with a gold second line and a 64px
   gold underline, lede in light gray, two buttons (solid gold + ghost); right a
   full-bleed photo of the work van. A navy feature card with a 2px gold border
   overlaps the bottom edge, showing four benefits with gold-circle icons."
3. "A warm-cream services section: centered gold uppercase eyebrow, 34px headline,
   then a responsive grid of white service cards with a gold-bordered cream icon
   tile, bold title, short description, and a gold 'LEARN MORE' link; cards lift on
   hover and the border turns gold."

### Incremental Iteration
Generate the home layout first, lock the header/hero/trust strip, then derive service
and location page templates from the same tokens. Keep the gold accent rare. When
rebranding for a new customer, change **only** the accent (and optionally swap the
system font for Inter); leave the navy/cream/structure intact unless the customer's
brand truly demands otherwise.

## Theme Variants (the anti-cookie-cutter dial)

Keep structure + navy/cream foundation constant; swap the **accent** per customer or
vertical so no two sites read identically:

- **Electric Gold** (default): accent `#f0a800` / dark `#d99500` — electricians.
- **Copper Plumb:** accent `#c2622d` / dark `#9e4f24` — plumbers.
- **HVAC Sky:** accent `#1f86c2` / dark `#176a9b` — heating & cooling.
- **Roofer Red:** accent `#c22d26` / dark `#9e241f` — roofing/exteriors.
- **Evergreen:** accent `#1f9d55` / dark `#178045` — landscaping/lawn.

For a brand with strong existing colors, replace `primary` (navy) and `accent` with
the customer's two strongest brand colors, keeping the contrast relationship (dark
anchor + one bright CTA) intact.
