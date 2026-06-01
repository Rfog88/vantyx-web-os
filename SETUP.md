# Vantyx Web OS — Setup & Stitch Workflow

The reusable design system + component library for Vantyx-built customer websites.
House style lives in [`.stitch/DESIGN.md`](.stitch/DESIGN.md) (seeded from the Fogle &
Sons site — the validated quality bar).

## What's already done (by Claude Code, Phase 0)

- ✅ `stitch-skills` installed into Claude Code (project scope). 13 skills across 3
  plugins: `stitch-design` (code-to-design, extract-design-md, extract-static-html,
  generate-design, manage-design-system, upload-to-stitch), `stitch-build`
  (react-components, remotion, shadcn-ui), `stitch-utilities` (design-md,
  enhance-prompt, stitch-loop, taste-design).
- ✅ `.mcp.json` written with the Stitch MCP proxy server.
- ✅ Seed `.stitch/DESIGN.md` hand-authored from the Fogle aesthetic (navy + gold).

## What YOU need to do (one-time, ~10 min) — Phase 0b

These steps need an interactive Google sign-in, so they can't be automated.

### 1. Sign in to Stitch
Open **https://stitch.withgoogle.com** and sign in with your Google account (free).

### 2. Authenticate the Stitch MCP server — API key (the simple, working path)

The proxy authenticates with **just `STITCH_API_KEY` in its environment** (confirmed in
the SDK: the proxy throws on startup unless `STITCH_API_KEY` or `STITCH_ACCESS_TOKEN` is
set). No Google OAuth, no `init` wizard needed. In Stitch, generate a key (Settings →
"Use with code" / API), then set it permanently for your user in PowerShell:
```powershell
setx STITCH_API_KEY "paste-your-key-here"
```
> ⚠️ `setx` only affects processes launched **after** it runs. You MUST then **fully quit
> and relaunch Claude Code** (a complete restart — "Reload Window" does NOT rebuild the
> process environment). The relaunched process inherits the key; the `stitch` MCP server
> is a child process and inherits it in turn.

Sanity-check the key out-of-band (optional):
```powershell
$env:STITCH_API_KEY = [Environment]::GetEnvironmentVariable("STITCH_API_KEY","User")
npx -y @_davideast/stitch-mcp tool list_projects -o json   # returns {} when no projects yet, no auth error
```
> Ignore `stitch-mcp doctor` and the `init` wizard — `doctor` only checks the OAuth path
> (reports "Not authenticated" even when the API key works), and `init`'s arrow-key menus
> can't be driven through Claude Code's `!` prompt. The OAuth/gcloud route is an
> alternative, not a requirement.

### 3. Fully restart Claude Code
**Completely quit and relaunch** Claude Code so the process picks up the new
`STITCH_API_KEY` from the User environment. Do NOT rely on **Reload Window** — it
reloads the UI but keeps the old process env, so the MCP server still won't see the key.
Confirm with:
```
/mcp
```
You should see the `stitch` server connected.

### 4. Tell Claude "Stitch is ready"
Then we resume at Phase 1 below.

## The workflow (once Stitch is authenticated)

```
Stitch (design visually)  →  .stitch/DESIGN.md  →  Claude Code + stitch-skills  →  React/shadcn components  →  Vercel
```

- **Phase 1 — Refine the house style:** Push the seed `DESIGN.md` into a Stitch
  project (`manage-design-system` skill), generate 2–3 polished home/service/contact
  screens, pick the strongest, and re-export `DESIGN.md` as canonical. Keep the navy +
  gold foundation; the accent is the per-customer dial (see "Theme Variants" in
  DESIGN.md).
- **Phase 2 — Build the library:** Scaffold Next.js 15 + Tailwind v4 + shadcn, then use
  the `shadcn-ui` + `react-components` skills to generate components **from DESIGN.md**:
  Header, Hero, TrustBar, ServiceCard/Grid, Testimonials, FinancingBand, CTA, Footer,
  and the **designed-placeholder** components. Per-customer config = a tokens file +
  a content JSON. Push to `github.com/Rfog88/vantyx-web-os`.
- **Phase 3 — Proof site:** Build one real customer site from the library + that
  customer's config, deploy to a Vercel preview, and compare side-by-side against the
  old auto-gen output and the Fogle site before touching the pipeline.

## Reminder: the template is only half the fix
A great template still won't sell with empty trust slots. In parallel (Paperclip
`demo-gen` work): fix the data-fill bugs (city vs. street address in the H1, license #,
phone area code), ingest real GBP photos/reviews/owner bio, render **designed
placeholders** (never stock photos) where media is missing, and keep the
`brand-consistency-check` QA gate in front of every send.
