import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import type { IconName } from "@/content/types";

/*
 * The VAN-27 trust-content rule, as a component. Where a real photo / review /
 * owner bio is missing, render THIS — a dashed parchment frame with a centered
 * icon and honest caption. Never a stock photo, never a silent gap.
 */
export function DesignedPlaceholder({
  caption,
  icon = "camera",
  className,
  onDark = false,
}: {
  caption: string;
  icon?: IconName;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed p-8 text-center",
        onDark
          ? "border-on-inverse-muted/40 bg-inverse-surface-card text-on-inverse-muted"
          : "border-outline bg-surface-warm text-muted",
        className,
      )}
    >
      <Icon name={icon} className="h-8 w-8 opacity-70" />
      <span className="text-body-lede">{caption}</span>
    </div>
  );
}
