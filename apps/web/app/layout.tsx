import type { Metadata } from "next";

import { brand } from "@tenvra/config";
import "@tenvra/ui/tokens.css";

import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description:
    "An early-stage initiative for open coding intelligence and verifiable contributor work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
