import type { SVGProps } from "react";
import type { IconName } from "@/content/types";

/** Stroke-based line icons (currentColor). Star renders filled for ratings. */
const PATHS: Record<IconName, { d: string; fill?: boolean }> = {
  bolt: { d: "M13 2 4 14h7l-1 8 9-12h-7z" },
  check: { d: "M20 6 9 17l-5-5" },
  star: {
    d: "M12 2.6l2.74 5.55 6.12.89-4.43 4.32 1.05 6.1L12 16.66 6.52 19.46l1.05-6.1L3.14 9.04l6.12-.89z",
    fill: true,
  },
  "arrow-right": { d: "M5 12h14M13 6l6 6-6 6" },
  phone: {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
  },
  shield: { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" },
  clock: { d: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2" },
  dollar: { d: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  wrench: {
    d: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2.4-.6-.6-2.4z",
  },
  lightbulb: {
    d: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z",
  },
  power: { d: "M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0" },
  gauge: { d: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 12l4-3" },
  plus: { d: "M12 5v14M5 12h14" },
  menu: { d: "M3 6h18M3 12h18M3 18h18" },
  close: { d: "M18 6 6 18M6 6l12 12" },
  camera: {
    d: "M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM12 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
  },
  quote: { d: "M7 7h4v4a4 4 0 0 1-4 4M13 7h4v4a4 4 0 0 1-4 4" },
};

export function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  const entry = PATHS[name];
  const filled = entry.fill ?? false;
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={entry.d} />
    </svg>
  );
}
