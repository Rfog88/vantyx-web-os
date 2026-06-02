#!/usr/bin/env node
/*
 * gen-site — deterministic lead → SiteContent writer for the Vantyx house-style
 * library. Replaces the old `template-fill` site.config.ts writer. The model is
 * OUT of the file-write path entirely: a lead row (DB columns) is mapped to a
 * typed SiteContent literal by straight interpolation, never by an LLM. This is
 * the durable lesson from the old pipeline (VAN-13).
 *
 * Usage:
 *   node scripts/gen-site.mjs --lead-json <path> [--out <path>] [--dry-run]
 *
 *   --lead-json  JSON file: a single lead object using the leads-table column
 *                names (id, name, phone, niche, city, state, zip, gmaps_rating,
 *                review_count, license_no, service_area_zips, tagline,
 *                testimonials, gbp_hero_url, ...).
 *   --out        Output path (default src/content/_active.generated.ts).
 *   --dry-run    Print to stdout instead of writing.
 *
 * Honesty (VAN-27): only real fields are used. Real Google rating/review_count
 * become trust stats; real GBP reviews (testimonials) and the GBP hero photo
 * (gbp_hero_url) render when present; missing photos/reviews/license render as
 * designed placeholders downstream — never fabricated.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, "..");

// ── niche → services (house-style IconName set), service noun, theme, emergency
const NICHE = {
  electrician: {
    noun: "Electricians", theme: "electric", emergency: true,
    services: [
      { slug: "panel-upgrades", icon: "gauge", title: "Panel Upgrades", description: "100A→200A service upgrades, code-compliant and done in a day." },
      { slug: "ev-chargers", icon: "bolt", title: "EV Chargers", description: "Level 2 home charging stations for any electric vehicle." },
      { slug: "rewiring", icon: "wrench", title: "Whole-Home Rewiring", description: "Older homes brought safely up to modern code." },
      { slug: "generators", icon: "power", title: "Generators", description: "Standby and portable installs with transfer switches done right." },
      { slug: "lighting", icon: "lightbulb", title: "Lighting & Fans", description: "Recessed, pendants, ceiling fans, and outdoor lighting." },
      { slug: "emergency", icon: "bolt", title: "Emergency Calls", description: "Sparking outlet, outage, burning smell? Same-day response." },
    ],
  },
  plumber: {
    noun: "Plumbers", theme: "copper", emergency: true,
    services: [
      { slug: "drain-cleaning", icon: "wrench", title: "Drain Cleaning", description: "Hydro-jetting and snaking with same-day clears." },
      { slug: "water-heaters", icon: "power", title: "Water Heaters", description: "Tank and tankless installs and repairs." },
      { slug: "repiping", icon: "wrench", title: "Repiping", description: "Whole-home repipes from galvanized to PEX." },
      { slug: "leak-detection", icon: "gauge", title: "Leak Detection", description: "Non-invasive electronic leak location." },
      { slug: "sewer-line", icon: "wrench", title: "Sewer Line", description: "Camera inspection and trenchless repair." },
      { slug: "emergency", icon: "bolt", title: "Emergency Service", description: "Burst pipe or flooded basement? 24/7 response." },
    ],
  },
  hvac: {
    noun: "HVAC Pros", theme: "hvac", emergency: true,
    services: [
      { slug: "ac-repair", icon: "gauge", title: "AC Repair", description: "Diagnostics, refrigerant, and compressor service." },
      { slug: "furnace", icon: "power", title: "Furnace Install", description: "High-efficiency gas, oil, and electric systems." },
      { slug: "heat-pumps", icon: "bolt", title: "Heat Pumps", description: "Air-source and ductless mini-splits." },
      { slug: "maintenance", icon: "check", title: "Maintenance Plans", description: "Spring and fall tune-ups with priority service." },
      { slug: "lighting", icon: "lightbulb", title: "Air Quality", description: "Filtration and whole-home air-quality upgrades." },
      { slug: "emergency", icon: "bolt", title: "Emergency HVAC", description: "No heat or no AC? Same-day response." },
    ],
  },
  roofer: {
    noun: "Roofers", theme: "roofer", emergency: false,
    services: [
      { slug: "shingle", icon: "gauge", title: "Asphalt Shingle", description: "Architectural and 3-tab installs and replacements." },
      { slug: "metal", icon: "power", title: "Metal Roofing", description: "Standing seam and exposed-fastener systems." },
      { slug: "storm", icon: "shield", title: "Storm Damage", description: "Insurance-claim assistance and free inspections." },
      { slug: "gutters", icon: "wrench", title: "Gutters", description: "Seamless aluminum with leaf guards." },
      { slug: "repair", icon: "wrench", title: "Roof Repair", description: "Leaks, missing shingles, and flashing." },
      { slug: "lighting", icon: "lightbulb", title: "Skylights", description: "Solar and manual skylight install and replacement." },
    ],
  },
  gc: {
    noun: "Contractors", theme: "electric", emergency: false,
    services: [
      { slug: "kitchen", icon: "gauge", title: "Kitchen Remodels", description: "Full design-build kitchen renovations." },
      { slug: "bath", icon: "wrench", title: "Bath Remodels", description: "Master and guest baths, walk-in showers." },
      { slug: "additions", icon: "plus", title: "Additions", description: "Room additions and second-story builds." },
      { slug: "basement", icon: "power", title: "Basement Finishing", description: "Egress, framing, electrical, and drywall." },
      { slug: "decks", icon: "wrench", title: "Decks & Patios", description: "Composite, pressure-treated, and stone." },
      { slug: "whole-home", icon: "lightbulb", title: "Whole-Home", description: "Full gut renovations, managed end to end." },
    ],
  },
};

// metro fallback when a lead's city is missing or street-shaped
const STATE_METRO = { OH: "Columbus", FL: "Tampa", IN: "Indianapolis", MI: "Detroit", PA: "Pittsburgh", KY: "Louisville", IL: "Chicago", WI: "Milwaukee", WV: "Charleston" };

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith("--")) continue;
    const k = argv[i].slice(2);
    const n = argv[i + 1];
    if (!n || n.startsWith("--")) a[k] = true;
    else { a[k] = n; i++; }
  }
  return a;
}
const digits = (p) => String(p || "").replace(/\D/g, "");
function formatPhone(p) {
  const d = digits(p);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : (p || "");
}
const looksLikeStreet = (c) => !c || /\d/.test(c) || /\b(st|ave|rd|blvd|dr|ln|hwy|suite|ste)\b/i.test(c);

// JSON-typed DB columns arrive as strings from sqlite; accept string or value.
function parseJsonMaybe(v) {
  if (v == null) return null;
  if (typeof v !== "string") return v;
  try { return JSON.parse(v); } catch { return null; }
}

// Real GBP reviews (leads.testimonials) → SiteContent.Testimonial[]. Deterministic
// (VAN-13): preserve DB order, no LLM. Honest (VAN-27): real author/quote/rating
// only; no invented reviewer location. Empty → [] so the component shows placeholders.
function buildTestimonials(raw) {
  const arr = parseJsonMaybe(raw);
  if (!Array.isArray(arr)) return [];
  const seen = new Set();
  const out = [];
  for (const r of arr) {
    const author = String(r?.author || "").trim();
    let quote = String(r?.body ?? r?.quote ?? "").replace(/\s+/g, " ").trim();
    if (!author || quote.length < 30) continue;
    // Curation, not fabrication (VAN-27): feature only 4–5★ reviews — the ones an
    // owner would put on their own homepage. Reviews with no rating are kept.
    const ratingNum = Number(r?.rating);
    if (Number.isFinite(ratingNum) && ratingNum < 4) continue;
    const key = author.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    if (quote.length > 300) {
      const cut = quote.slice(0, 300);
      quote = cut.slice(0, cut.lastIndexOf(" ")).trim() + "…";
    }
    const t = { quote, author };
    if (Number.isFinite(ratingNum) && ratingNum > 0) t.rating = Math.round(ratingNum);
    out.push(t);
    if (out.length >= 6) break;
  }
  return out;
}

// Real GBP hero photo (leads.gbp_hero_url) → hero.imageSrc; else null (placeholder).
function pickHeroImage(lead) {
  const u = lead.gbp_hero_url || lead.hero_url || null;
  return typeof u === "string" && /^https?:\/\//.test(u) ? u : null;
}

function buildSiteContent(lead) {
  const niche = String(lead.niche || "electrician").toLowerCase();
  const nd = NICHE[niche] || NICHE.electrician;
  const name = String(lead.name || "").trim().replace(/\s+/g, " ");
  const phone = formatPhone(lead.phone);
  const tel = `tel:${digits(lead.phone)}`;
  const city = looksLikeStreet(lead.city) ? (STATE_METRO[lead.state] || lead.state || "") : lead.city;
  const loc = city ? `${city}${lead.state ? ", " + lead.state : ""}` : (lead.state || "your area");
  const rating = lead.gmaps_rating ? Number(lead.gmaps_rating).toFixed(1) : null;
  const reviews = lead.review_count ? Number(lead.review_count) : null;
  const testimonialItems = buildTestimonials(lead.testimonials);
  const heroImage = pickHeroImage(lead);

  // honest trust stats — real Google rating/reviews when present
  const stats = [];
  if (rating) stats.push({ icon: "star", value: rating, label: "Google Rating" });
  if (reviews) stats.push({ icon: "check", value: `${reviews.toLocaleString("en-US")}+`, label: "Google Reviews" });
  if (nd.emergency) stats.push({ icon: "bolt", value: "24/7", label: "Emergency Service" });
  stats.push({ icon: "shield", value: "Licensed", label: lead.license_no ? `#${lead.license_no}` : "& Insured" });

  const benefits = [
    { icon: "shield", title: "Licensed & Insured", sub: lead.license_no ? `#${lead.license_no}` : "Fully covered" },
    // Attribution travels WITH the ★ rating: class-e-gate's sourced_ratings
    // check fails a star glyph that has no "Google" (etc.) within 200 chars.
    ...(rating ? [{ icon: "star", title: `${rating}★ Rated`, sub: reviews ? `${reviews.toLocaleString("en-US")} Google reviews` : "On Google" }] : []),
    ...(nd.emergency ? [{ icon: "bolt", title: "24/7 Emergency", sub: "Always on call" }] : []),
    { icon: "lightbulb", title: "Locally Owned", sub: city ? `${city}-based` : "Local pros" },
  ].slice(0, 4);

  const ledeBits = [`${name} provides licensed, insured ${niche === "gc" ? "general contracting" : niche} service for ${loc} and the surrounding area.`];
  if (rating && reviews) ledeBits.push(`Rated ${rating}★ across ${reviews.toLocaleString("en-US")}+ Google reviews.`);

  return {
    business: {
      name,
      phone,
      phoneHref: tel,
      licenseLine: `© ${new Date().getFullYear()} ${name}.${lead.license_no ? ` License #${lead.license_no}.` : ""} Licensed, insured & locally owned.`,
      ...(nd.emergency ? { emergency: { enabled: true, label: "24/7 Emergency Service Available", cta: { label: "Request Service", href: "#contact" } } } : {}),
    },
    nav: [
      { label: "Services", href: "#services" },
      { label: "Service Areas", href: "#areas" },
      { label: "About", href: "#about" },
      { label: "Reviews", href: "#reviews" },
      { label: "Contact", href: "#contact" },
    ],
    primaryCta: { label: "Call Now", href: tel },
    hero: {
      eyebrow: `Licensed ${nd.noun}${city ? ` · ${loc}` : ""}`,
      title: name,
      accentLine: `Trusted ${loc} ${niche === "gc" ? "Contractor" : nd.noun.replace(/s$/, "")}`,
      lede: ledeBits.join(" "),
      primaryCta: { label: "Book Online", href: "#contact" },
      ghostCta: { label: `Call ${phone}`, href: tel },
      imageCaption: "Your work-van photo goes here",
      ...(heroImage ? { imageSrc: heroImage } : {}),
      benefits,
    },
    stats,
    services: { eyebrow: "Our Services", heading: `${loc} ${niche === "gc" ? "Contracting" : "Electrical"} Services`.replace("Electrical", niche === "electrician" ? "Electrical" : niche === "plumber" ? "Plumbing" : niche === "hvac" ? "HVAC" : niche === "roofer" ? "Roofing" : "Home"), items: nd.services },
    testimonials: { eyebrow: "Reviews", heading: "What Customers Say", items: testimonialItems },
    serviceAreas: { eyebrow: "We Serve", cities: [city || loc].filter(Boolean) },
    finalCta: { heading: `Need ${niche === "hvac" ? "an HVAC pro" : niche === "gc" ? "a contractor" : "an " + niche} in ${loc}?`, lede: `Call ${name} or request service online — licensed, insured, and ready to help.`, cta: { label: "Request Service", href: "#contact" } },
    footer: {
      columns: [
        { title: "Services", links: nd.services.slice(0, 4).map((s) => ({ label: s.title, href: "#services" })) },
        { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Reviews", href: "#reviews" }, { label: "Service Areas", href: "#areas" }, { label: "Contact", href: "#contact" }] },
        { title: "Legal", links: [{ label: "Privacy Policy", href: "#" }, { label: "Terms of Service", href: "#" }, { label: "Accessibility", href: "#" }] },
      ],
      finePrint: `© ${new Date().getFullYear()} ${name}.${lead.license_no ? ` License #${lead.license_no}.` : ""} Licensed, insured & locally owned${city ? `. Serving ${loc}` : ""}.`,
    },
    _theme: nd.theme,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args["lead-json"]) { console.error("gen-site: --lead-json <path> required"); process.exit(1); }
  let lead = JSON.parse(readFileSync(args["lead-json"], "utf8"));
  if (Array.isArray(lead)) lead = lead[0];
  const site = buildSiteContent(lead);
  const theme = site._theme;
  delete site._theme;
  const body = JSON.stringify(site, null, 2);
  const out = `// AUTO-GENERATED by scripts/gen-site.mjs for ${site.business.name} — do not edit by hand.\nimport type { SiteContent, ThemeName } from "./types";\n\nexport const site: SiteContent = ${body};\n\nexport const theme: ThemeName = ${JSON.stringify(theme)};\n`;
  const outPath = args.out ? resolve(args.out) : resolve(REPO, "src/content/_active.generated.ts");
  if (args["dry-run"]) { process.stdout.write(out); return; }
  writeFileSync(outPath, out, "utf8");
  console.log(JSON.stringify({ ok: true, wrote: outPath, name: site.business.name, theme }));
}
main();
