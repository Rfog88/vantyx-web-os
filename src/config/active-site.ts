import type { SiteContent } from "@/content/types";
import { midlandsElectric } from "@/content/midlands-electric";

/*
 * The single switch that defines which customer this deployment renders.
 * A proof site = point `content` at that customer's content file and set `theme`
 * to their vertical's accent. Nothing else changes — no markup edits.
 *
 *   theme: "electric" (default) | "copper" | "hvac" | "roofer" | "evergreen"
 */
export type ThemeName =
  | "electric"
  | "copper"
  | "hvac"
  | "roofer"
  | "evergreen";

export interface ActiveSite {
  content: SiteContent;
  theme: ThemeName;
}

export const activeSite: ActiveSite = {
  content: midlandsElectric,
  theme: "electric",
};

/** Body class that applies the active accent variant ("" for the default). */
export const themeClass =
  activeSite.theme === "electric" ? "" : `theme-${activeSite.theme}`;
