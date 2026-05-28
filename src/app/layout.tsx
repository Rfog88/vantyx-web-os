import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
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
  const palette = siteConfig.branding?.palette ?? {
    primary: "#0F172A",
    accent: "#F59E0B",
    bg: "#FFFFFF",
    text: "#111827",
    muted: "#6B7280",
  };
  const fonts = siteConfig.branding?.fonts ?? {
    headings: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  };
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
