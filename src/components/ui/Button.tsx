import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded font-bold text-[15px] " +
  "min-h-11 px-5 py-3 transition-colors duration-150 no-underline";

const VARIANTS: Record<Variant, string> = {
  // Phone-call / book-now button: solid gold, ink text, gold border → hover burnished.
  primary:
    "bg-accent text-on-accent border-2 border-accent hover:bg-accent-dark hover:border-accent-dark",
  // White fill, gold border, ink text → faint gold tint on hover.
  ghost:
    "bg-surface text-on-surface border-2 border-accent hover:bg-[#fff8e6]",
  // Transparent + gold border/text → inverts to gold fill on hover.
  outline:
    "bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-on-accent",
};

export interface ButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

/** Link-styled button (sites are mostly tel:/anchor CTAs). */
export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a className={cn(BASE, VARIANTS[variant], className)} {...props}>
      {children}
    </a>
  );
}
