import type { Metadata } from "next";
import "./globals.css";
import { themeClass } from "@/config/active-site";

export const metadata: Metadata = {
  title: "Vantyx Web OS — House Style",
  description:
    "Navy + gold house-style design system and component library for trades websites.",
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
