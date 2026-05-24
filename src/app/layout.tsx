import type { Metadata } from "next";
import { siteConfig } from "@site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.business.name} | ${siteConfig.hero.service} in ${siteConfig.hero.city}`,
  description:
    siteConfig.business.tagline ||
    `${siteConfig.hero.service} serving ${siteConfig.hero.city} and surrounding areas. Licensed, insured, locally owned.`,
  openGraph: {
    title: `${siteConfig.business.name} — ${siteConfig.hero.service} in ${siteConfig.hero.city}`,
    description: siteConfig.business.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { palette, fonts } = siteConfig.branding;
  const styleVars = {
    "--vantyx-primary": palette.primary,
    "--vantyx-accent": palette.accent,
    "--vantyx-bg": palette.bg,
    "--vantyx-text": palette.text,
    "--vantyx-muted": palette.muted,
    "--vantyx-font-headings": fonts.headings,
    "--vantyx-font-body": fonts.body,
  } as React.CSSProperties;

  return (
    <html lang="en" style={styleVars}>
      <body>{children}</body>
    </html>
  );
}
