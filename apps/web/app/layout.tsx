import type { Metadata } from "next";
import { cookies } from "next/headers";

import { brand } from "@tenvra/config";
import "@tenvra/ui/tokens.css";

import "./globals.css";

import { CookieConsentBanner, cookieConsentName } from "./cookie-consent-banner";

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description:
    "A European-first initiative for open coding intelligence and verifiable contributor work.",
  referrer: "no-referrer",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const showCookieNotice = !cookieStore.has(cookieConsentName);

  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsentBanner initialVisible={showCookieNotice} />
      </body>
    </html>
  );
}
