import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
