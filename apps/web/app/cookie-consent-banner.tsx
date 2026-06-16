"use client";

import Link from "next/link";
import { useState } from "react";

export const cookieConsentName = "tenvra_cookie_consent";

type CookieConsentBannerProps = {
  initialVisible: boolean;
};

export function CookieConsentBanner({ initialVisible }: CookieConsentBannerProps) {
  const [visible, setVisible] = useState(initialVisible);

  function acknowledge() {
    document.cookie = `${cookieConsentName}=essential-only; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-banner" aria-label="Cookie notice" role="dialog">
      <div className="cookie-banner__copy">
        <strong>Cookie notice</strong>
        <p>
          Tenvra currently uses only essential cookies for secure operator sessions and critical
          site behavior. No analytics or advertising cookies are enabled in Phase 1. Read the{" "}
          <Link href="/privacy">privacy notice</Link> and{" "}
          <Link href="/terms">terms of service</Link>.
        </p>
      </div>
      <div className="cookie-banner__actions">
        <button
          className="secondary-link cookie-banner__button"
          onClick={acknowledge}
          type="button"
        >
          OK
        </button>
      </div>
    </aside>
  );
}
