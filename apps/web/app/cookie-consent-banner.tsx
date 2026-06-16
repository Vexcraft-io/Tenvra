"use client";

import Link from "next/link";
import { useState } from "react";

const consentKey = "tenvra-cookie-consent-v1";

function getInitialVisibility() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return !window.localStorage.getItem(consentKey);
  } catch {
    return true;
  }
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(getInitialVisibility);

  function acknowledge() {
    try {
      window.localStorage.setItem(
        consentKey,
        JSON.stringify({
          acceptedAt: new Date().toISOString(),
          scope: "essential-only",
        }),
      );
    } catch {
      // Ignore storage failures; hiding the banner avoids trapping the user.
    }
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
