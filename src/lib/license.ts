const PENDING_LICENSE = "License verification pending";
const INVALID_LICENSE_RE = /^x{4,}$|^0{4,}$|^9{4,}$|^-{4,}$|^placeholder$|^tbd$|^unknown$/i;
const LICENSE_PREFIX_RE = /^(licen[sc]ed?|lic)\s*#?\s*/i;
const PENDING_LICENSE_RE = /^(?:(?:license\s+)?verification\s+pending|license\s+pending|pending)$/i;
const PLACEHOLDER_LICENSE_RE = /^(?:license)?\s*(?:verification)?\s*(?:pending|pending\.)?$/i;

export function sanitizeLicenseNumber(input?: string | null): string | null {
  const rawValue = (input ?? "").toString().trim();
  const raw = rawValue;
  if (!raw) return PENDING_LICENSE;

  if (PLACEHOLDER_LICENSE_RE.test(raw)) {
    return PENDING_LICENSE;
  }

  if (PENDING_LICENSE_RE.test(raw)) {
    return PENDING_LICENSE;
  }

  const normalized = raw
    .replace(LICENSE_PREFIX_RE, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized || INVALID_LICENSE_RE.test(normalized) || PLACEHOLDER_LICENSE_RE.test(normalized)) return PENDING_LICENSE;
  return normalized;
}

export const LICENSE_VERIFICATION_PENDING = PENDING_LICENSE;
