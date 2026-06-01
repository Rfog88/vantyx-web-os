import type { Metadata } from "next";
import "./globals.css";
import { themeClass, activeSite } from "@/config/active-site";

export const metadata: Metadata = {
  title: `${activeSite.content.business.name} | Licensed Electrician`,
  description: activeSite.content.hero.lede,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={themeClass}>{children}</body>
    </html>
  );
}
