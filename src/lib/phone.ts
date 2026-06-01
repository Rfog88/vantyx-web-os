/** Build a tel: href from a display phone string. */
export const telHref = (phone: string): string =>
  `tel:${phone.replace(/[^\d+]/g, "")}`;
