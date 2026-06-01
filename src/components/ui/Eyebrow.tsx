import { cn } from "@/lib/cn";

/** Uppercase gold section label. Burnished gold on light, Trade gold on dark. */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-eyebrow",
        onDark ? "text-accent" : "text-accent-dark",
        className,
      )}
    >
      {children}
    </p>
  );
}
