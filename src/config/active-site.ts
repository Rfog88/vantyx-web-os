import type { SiteContent, ThemeName } from "@/content/types";
import { site, theme } from "@/content/_active.generated";

/*
 * The active customer for this deployment = whatever `_active.generated.ts`
 * exports. Standalone, that's the committed default; in the demo-gen pipeline,
 * `scripts/gen-site.mjs` regenerates `_active.generated.ts` from a lead row
 * (deterministically, no LLM in the write path) before build + deploy.
 */
export type { ThemeName };

export interface ActiveSite {
  content: SiteContent;
  theme: ThemeName;
}

export const activeSite: ActiveSite = { content: site, theme };

/** Body class that applies the active accent variant ("" for the default). */
export const themeClass = theme === "electric" ? "" : `theme-${theme}`;
