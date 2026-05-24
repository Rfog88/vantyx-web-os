import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function telLink(phone: string): string {
  const digits = normalizePhone(phone);
  return digits.length === 10 ? `tel:+1${digits}` : `tel:${digits}`;
}
