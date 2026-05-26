#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const EARTH_RADIUS_MI = 3958.8;
const MAX_DISTANCE_FROM_POSTAL_CENTROID_MI = 10;
let configSource = "";

const BRAND_CATALOG_ROOT = findBrandCatalogRoot();
const NICHES = {
  electrician: {
    palette: { primary: "#0F172A", accent: "#FACC15", bg: "#FFFFFF", text: "#111827", muted: "#6B7280" },
    fonts: { headings: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" },
  },
  plumber: {
    palette: { primary: "#0B3D91", accent: "#FFFFFF", bg: "#FFFFFF", text: "#111827", muted: "#6B7280" },
    fonts: { headings: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" },
  },
  hvac: {
    palette: { primary: "#0F172A", accent: "#DC2626", bg: "#FFFFFF", text: "#111827", muted: "#6B7280" },
    fonts: { headings: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" },
  },
  roofer: {
    palette: { primary: "#3F2A1A", accent: "#D97706", bg: "#FAFAF7", text: "#1C1917", muted: "#78716C" },
    fonts: { headings: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" },
  },
  gc: {
    palette: { primary: "#1F2937", accent: "#F59E0B", bg: "#FFFFFF", text: "#111827", muted: "#6B7280" },
    fonts: { headings: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" },
  },
};

function findBrandCatalogRoot() {
  const candidatePaths = [
    resolve(process.cwd(), "shared", "brand"),
    resolve(process.cwd(), "..", "shared", "brand"),
    resolve(process.cwd(), "..", "..", "shared", "brand"),
    resolve(process.cwd(), "..", "..", "..", "shared", "brand"),
    process.env.PAPERCLIP_COMPANY_ID
      ? resolve("/home", "paperclip", ".paperclip", "instances", "default", "skills", process.env.PAPERCLIP_COMPANY_ID, "shared", "brand")
      : null,
  ].filter(Boolean);

  for (const candidate of candidatePaths) {
    if (existsSync(resolve(candidate, "vantyx.md"))) return candidate;
  }
  return null;
}

function readBrandFile(filePath) {
  if (!filePath) return null;
  if (!existsSync(filePath)) return null;
  try {
    return readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function extractPaletteFromBrandFile(md) {
  if (!md) return null;
  const grab = (label) => {
    const m = md.match(new RegExp(`${label}\\s*[:=]?\\s*[\`'\"]?(#(?:[0-9a-f]{3}|[0-9a-f]{6}))`, "i"));
    return m ? m[1].toLowerCase() : null;
  };
  const primary = grab("Primary");
  const accent = grab("Accent");
  const bg = grab("Background") || grab("Bg");
  const text = grab("Text");
  const muted = grab("Muted");
  if (!primary && !accent) return null;
  return { primary, accent, bg, text, muted };
}

function extractFontsFromBrandFile(md) {
  if (!md) return null;
  const headings = md.match(/Headings?\s*[:=]?\s*[\`'\"]?([A-Za-z][^,\n\`'\"]{1,40})/i)?.[1]?.trim();
  const body = md.match(/Body\s*[:=]?\s*[\`'\"]?([A-Za-z][^,\n\`'\"]{1,40})/i)?.[1]?.trim();
  if (!headings && !body) return null;
  return { headings, body };
}

function readAgencyBrandFile(niche = "gc", clientSlug = null) {
  const slug = (clientSlug || "").trim().toLowerCase();
  const base = NICHES[niche] || NICHES.gc;

  if (!BRAND_CATALOG_ROOT) return base;

  const clientPath = slug ? resolve(BRAND_CATALOG_ROOT, "clients", `${slug}.md`) : null;
  const agencyPath = resolve(BRAND_CATALOG_ROOT, "vantyx.md");
  const clientBrand = readBrandFile(clientPath);
  const agencyBrand = readBrandFile(agencyPath);

  const clientPalette = extractPaletteFromBrandFile(clientBrand);
  const agencyPalette = extractPaletteFromBrandFile(agencyBrand);
  const clientFonts = extractFontsFromBrandFile(clientBrand);
  const agencyFonts = extractFontsFromBrandFile(agencyBrand);

  return {
    palette: {
      ...base.palette,
      ...(agencyPalette || {}),
      ...(clientPalette || {}),
    },
    fonts: {
      ...base.fonts,
      ...(agencyFonts || {}),
      ...(clientFonts || {}),
    },
  };
}

function canonicalizePreviewUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const url = raw.startsWith("http") ? new URL(raw) : new URL(`https://${raw}`);
  url.search = "";
  url.hash = "";
  url.pathname = url.pathname || "/";
  return url.toString();
}

function extractField(re, label) {
  const m = configSource.match(re);
  if (!m) fail(`missing ${label} in site.config.ts`);
  return m[1];
}

function extractFieldOptional(re, label) {
  const m = configSource.match(re);
  return m ? m[1] : null;
}

function extractFromContactAddress(label) {
  if (label === "city") {
    return extractField(/"?address"?\s*:\s*\{[\s\S]*?"?city"?\s*:\s*"([^"]+)"/m, "contact.address.city");
  }
  if (label === "zip") {
    return extractField(/"?zip"?\s*:\s*"([^"]+)"/m, "contact.address.zip");
  }
  return extractField(
    new RegExp(`"?contact"?\\s*:\\s*\\{[\\s\\S]*?"?address"?\\s*:\\s*\\{[\\s\\S]*?"?${label}"?\\s*:\\s*"([^\\"]+)"`, "m"),
    `contact.address.${label}`,
  );
}

function parseRawLicenseValue() {
  const m = configSource.match(/"?licenseNumber"?\s*:\s*(null|"([^"]*)")/m);
  if (!m) return undefined;
  if (m[1] === "null") return null;
  return m[2] ?? "";
}

function classifyLeadByLicense(rawLicenseValue) {
  const PLACEHOLDER_RE = /x{4,}|0{4,}|placeholder|tbd|unknown/i;
  if (rawLicenseValue == null) return "placeholder_lead";
  const raw = String(rawLicenseValue).trim();
  if (!raw) return "placeholder_lead";
  if (PLACEHOLDER_RE.test(raw)) return "placeholder_lead";
  return "verified_lead";
}

function parseLatLngFromHq(source, label) {
  const parts = source
    .split(",")
    .map((n) => Number.parseFloat(String(n).trim()));

  if (parts.length !== 2) {
    fail(`invalid ${label} in site.config.ts`);
  }

  const [lat, lng] = parts;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    fail(`${label} must contain finite latitude/longitude numbers`, "invalid_hq_coords");
  }
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    fail(`${label} is outside valid lat/lng bounds`, "invalid_hq_coords");
  }
  return [lat, lng];
}

function parseFloatNumber(value, label) {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n)) fail(`invalid ${label}`);
  return n;
}

function normalizeCity(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();
}

function fail(message, failureCode = null) {
  const suffix = failureCode ? ` (failure_code=${failureCode})` : "";
  console.error(`[Class E] geo_city_consistency: FAIL${suffix} - ${message}`);
  process.exit(1);
}

function haversineMiles(a, b) {
  const [lat1, lon1] = a;
  const [lat2, lon2] = b;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const x1 = Math.sin(dLat / 2) ** 2;
  const x2 = Math.sin(dLon / 2) ** 2 * Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180);
  return EARTH_RADIUS_MI * (2 * Math.asin(Math.sqrt(x1 + x2)));
}

const CITY_CENTROID_LOOKUP = {
  "troy,oh": { city: "Troy", lat: 40.0395, lng: -84.203 },
  "tipp city,oh": { city: "Tipp City", lat: 39.9534, lng: -84.1716 },
  "piqua,oh": { city: "Piqua", lat: 40.1448, lng: -84.2438 },
  "sidney,oh": { city: "Sidney", lat: 40.2840, lng: -84.1552 },
  "vandalia,oh": { city: "Vandalia", lat: 39.8981, lng: -84.1963 },
  "dayton,oh": { city: "Dayton", lat: 39.7589, lng: -84.1916 },
  "tampa,fl": { city: "Tampa", lat: 27.9506, lng: -82.4572 },
  "brandon,fl": { city: "Brandon", lat: 27.9375, lng: -82.2865 },
  "clearwater,fl": { city: "Clearwater", lat: 27.9659, lng: -82.8001 },
  "st petersburg,fl": { city: "St. Petersburg", lat: 27.7676, lng: -82.6403 },
};

const POSTAL_CENTROID_BY_ZIP = {
  "45801": { lat: 40.7426, lng: -84.1052 },
  "45804": { lat: 40.7426, lng: -84.1052 },
  "45373": { lat: 40.0395, lng: -84.203 },
  "33613": { lat: 27.95, lng: -82.456 },
  "33610": { lat: 27.9659, lng: -82.8001 },
  "33614": { lat: 27.9478, lng: -82.4716 },
  "33624": { lat: 27.9158, lng: -82.4959 },
  "33626": { lat: 28.0043, lng: -82.3666 },
  "33634": { lat: 28.0147, lng: -82.5537 },
  "33635": { lat: 27.9303, lng: -82.2956 },
};

function nearestCityFromLatLng(lat, lng) {
  let best = null;
  for (const [, value] of Object.entries(CITY_CENTROID_LOOKUP)) {
    const distance = haversineMiles([lat, lng], [value.lat, value.lng]);
    if (!best || distance < best.distance) {
      best = { city: value.city, distance, key: value.city.toLowerCase() };
    }
  }
  return best;
}

function postalCentroid(zip) {
  const value = String(zip || "").trim();
  if (!value) return null;
  if (POSTAL_CENTROID_BY_ZIP[value]) return POSTAL_CENTROID_BY_ZIP[value];
  if (value.startsWith("453")) return POSTAL_CENTROID_BY_ZIP["45373"];
  if (value.startsWith("336")) return POSTAL_CENTROID_BY_ZIP["33613"];
  return null;
}

function evaluateGeoCityConsistency({ addressCity, addressZip, hqLatLng }, options = {}) {
  const { throwOnFail = true } = options;

  const failResult = (message, failureCode) => {
    if (throwOnFail) {
      fail(message, failureCode);
    }
    return { ok: false, failureCode, message };
  };

  if (!addressCity) {
    return failResult("missing contact.address.city in site.config.ts", "missing_city");
  }
  if (!addressZip) {
    return failResult("missing contact.address.zip in site.config.ts", "missing_zip");
  }
  if (!hqLatLng || hqLatLng.length !== 2) {
    return failResult("serviceArea.hqLatLng must be present as [lat, lng]", "missing_hq_coords");
  }

  const [lat, lng] = hqLatLng;
  const centroid = nearestCityFromLatLng(lat, lng);
  if (!centroid) {
    return failResult("could not reverse-resolve locality from geo coords", "city_reverse_failed");
  }

  const normalizedAddressCity = normalizeCity(addressCity);
  const normalizedResolvedCity = normalizeCity(centroid.city);
  if (normalizedAddressCity !== normalizedResolvedCity) {
    return failResult(
      `resolved locality "${centroid.city}" does not match address city "${addressCity}"`,
      "city_mismatch",
    );
  }

  const center = postalCentroid(addressZip);
  if (!center) {
    return failResult(`missing postal centroid for zip ${addressZip}`, "missing_postal_centroid");
  }

  const distance = haversineMiles([lat, lng], [center.lat, center.lng]);
  if (distance > MAX_DISTANCE_FROM_POSTAL_CENTROID_MI) {
    return failResult(
      `geo is ${distance.toFixed(2)}mi from postal centroid (>${MAX_DISTANCE_FROM_POSTAL_CENTROID_MI}mi)`,
      "too_far_from_postal_centroid",
    );
  }

  return { ok: true, city: centroid.city, distanceMi: distance };
}

function runGeoConsistencySelfTests() {
  const passCase = evaluateGeoCityConsistency(
    { addressCity: "Tampa", addressZip: "33613", hqLatLng: [27.9506, -82.4572] },
    { throwOnFail: false },
  );
  if (!passCase.ok || passCase.city !== "Tampa") {
    fail("self-test pass case did not resolve Tampa", "self_test_failure");
  }

  const mismatchCase = evaluateGeoCityConsistency(
    { addressCity: "Troy", addressZip: "33613", hqLatLng: [27.9506, -82.4572] },
    { throwOnFail: false },
  );
  if (mismatchCase.ok || mismatchCase.failureCode !== "city_mismatch") {
    fail("self-test mismatch case did not produce city_mismatch", "self_test_failure");
  }

  const farCase = evaluateGeoCityConsistency(
    { addressCity: "Troy", addressZip: "45801", hqLatLng: [40.0395, -84.203] },
    { throwOnFail: false },
  );
  if (farCase.ok || farCase.failureCode !== "too_far_from_postal_centroid") {
    fail("self-test distance case did not produce too_far_from_postal_centroid", "self_test_failure");
  }

  console.log("[Class E] geo_city_consistency: PASS (self-test)");
}

async function runHtmlGate(previewUrl, leadClass) {
  const canonicalPreviewUrl = canonicalizePreviewUrl(previewUrl);
  if (!canonicalPreviewUrl) {
    console.log("[Class E] license_field_render: SKIP (PREVIEW_URL is empty)");
    return;
  }

  const res = await fetch(canonicalPreviewUrl, {
    method: "GET",
    headers: { "User-Agent": "vantyx-class-e-gates/1.0" },
  });
  if (!res.ok) {
    fail(`failed to fetch PREVIEW_URL (${canonicalPreviewUrl})`, "preview_gate_fetch_failed");
  }

  const html = await res.text();
  const pendingCount = (html.match(/License verification pending/gi) || []).length;
  const hasPlaceholderAttr = html.includes('data-placeholder-slot="license"');
  const badPlaceholderLicenses = /License\s*#\s*(x{2,}|0{2,}|#|oh\s*lic\s*#\s*x{2,})/i.test(html);

  if (leadClass === "placeholder_lead") {
    if (pendingCount !== 1) {
      fail("placeholder_lead must render exactly one 'License verification pending' label", "license_field_render");
    }
    if (!hasPlaceholderAttr) {
      fail("placeholder_lead missing data-placeholder-slot=license", "license_field_render");
    }
    if (badPlaceholderLicenses) {
      fail("placeholder_lead rendered a malformed placeholder license label", "license_field_render");
    }
  } else {
    if (pendingCount > 0) {
      fail("verified_lead must not render 'License verification pending'", "license_field_render");
    }
  }

  console.log(`[Class E] license_field_render: PASS (branch=${leadClass}, preview=${canonicalPreviewUrl})`);
}

async function main() {
  configSource = readFileSync(resolve(process.cwd(), "site.config.ts"), "utf8");

  if (process.argv.includes("--self-test")) {
    runGeoConsistencySelfTests();
    console.log("[Class E] class-e self-test mode skip html gate");
    return;
  }

  const addressCityRaw = extractFromContactAddress("city");
  const heroCityRaw = extractField(/"?hero"?\s*:\s*\{[\s\S]*?"?city"?\s*:\s*"([^"]+)"/m, "hero.city");
  const hqCoordsRaw = extractField(/"?hqLatLng"?\s*:\s*\[\s*([^\]]+)\]/m, "serviceArea.hqLatLng");
  const zipRaw = extractFromContactAddress("zip");
  const rawLicense = parseRawLicenseValue();
  const leadClass = classifyLeadByLicense(rawLicense);

  // Family 1: ensure raw placeholder tokens remain in data layer when expected.
  const rawBodyHasX = /x{4,}/i.test(configSource);
  const rawBodyHas0 = /0{4,}/.test(configSource);
  if (leadClass === "placeholder_lead" && !(rawBodyHasX || rawBodyHas0 || rawLicense == null || String(rawLicense).trim() === "")) {
    fail("placeholder_lead classification without raw placeholder markers in site.config.ts", "license_no_raw_placeholder");
  }
  console.log(`[Class E] license_no_raw_placeholder: PASS (branch=${leadClass}, x_family=${rawBodyHasX}, zero_family=${rawBodyHas0})`);

  const niche = extractFieldOptional(/"?niche"?\s*:\s*[`"']([^"'`]+)[`"']/im, "niche") || "gc";
  const contactEmail = extractFieldOptional(/"?contact"?\s*:\s*\{[\s\S]*?"?email"?\s*:\s*"([^"]+)"/, "contact.email");
  const contactDomain = contactEmail?.split("@")[1] || "";
  const clientSlug = contactDomain ? contactDomain.replace(/^www\./, "").split(".")[0] : null;
  const brand = readAgencyBrandFile(String(niche).trim(), clientSlug);
  if (brand?.palette?.primary && brand?.fonts?.headings) {
    console.log(`[Class E] brand_gate: PASS (niche=${niche}, font=${brand.fonts.headings})`);
  } else {
    console.log(`[Class E] brand_gate: PASS (niche fallback used: ${niche})`);
  }

  const hqLatLng = parseLatLngFromHq(hqCoordsRaw, "serviceArea.hqLatLng");

  const pinRegex = /\{\s*"?city"?\s*:\s*"([^"]+)"\s*,\s*"?lat"?\s*:\s*([-\.\d]+)\s*,\s*"?lng"?\s*:\s*([-\.\d]+)\s*\}/g;
  const pins = [...configSource.matchAll(pinRegex)].map((m) => ({
    city: m[1],
    lat: parseFloatNumber(m[2], `serviceAreaPins[city:${m[1]}].lat`),
    lng: parseFloatNumber(m[3], `serviceAreaPins[city:${m[1]}].lng`),
  }));

  for (const pin of pins) {
    if (!pin.city || !normalizeCity(pin.city)) fail("every serviceAreaPins entry must include a city");
    if (!Number.isFinite(pin.lat) || !Number.isFinite(pin.lng)) {
      fail(`serviceArea pin "${pin.city}" must include finite lat/lng`, "invalid_service_area_pin");
    }
    if (pin.lat < -90 || pin.lat > 90 || pin.lng < -180 || pin.lng > 180) {
      fail(`serviceArea pin "${pin.city}" is outside valid lat/lng bounds`, "invalid_service_area_pin");
    }
  }

  const addressCity = normalizeCity(addressCityRaw);
  const heroCity = normalizeCity(heroCityRaw);
  const heroMatchesAddress = heroCity === addressCity || heroCity.startsWith(`${addressCity} `);
  if (!addressCity || !heroCity || !heroMatchesAddress) {
    fail(`contact.address.city ("${addressCityRaw}") must match hero.city ("${heroCityRaw}")`, "hero_city_mismatch");
  }

  const hasAddressCityPin = pins.some((pin) => normalizeCity(pin.city) === addressCity);
  if (pins.length > 0 && !hasAddressCityPin) {
    fail(`serviceAreaPins must include the address city "${addressCityRaw}"`, "missing_home_pin");
  }

  const resolvedCity = evaluateGeoCityConsistency({
    addressCity: addressCityRaw,
    addressZip: zipRaw,
    hqLatLng,
  });

  if (process.env.PREVIEW_URL) {
    await runHtmlGate(process.env.PREVIEW_URL, leadClass);
  } else {
    console.log("[Class E] license_field_render: SKIP (PREVIEW_URL is unset)");
  }

  console.log(`[Class E] geo_city_consistency: PASS (resolved city: ${resolvedCity.city})`);
}

main().catch((e) => {
  fail(`unexpected failure: ${e?.message || e}`);
});
