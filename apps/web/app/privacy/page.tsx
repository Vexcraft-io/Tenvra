import type { Metadata } from "next";
import Link from "next/link";

import { brand } from "@tenvra/config";

export const metadata: Metadata = {
  title: `Privacy notice | ${brand.name}`,
  description: "How Tenvra handles Phase 1 interest registration data.",
};

export default function PrivacyPage() {
  return (
    <main className="prose-page shell legal-page">
      <Link className="wordmark" href="/">
        <span aria-hidden="true" className="mark">
          T
        </span>
        {brand.name}
      </Link>
      <p className="eyebrow">Privacy notice · Version 2026-06-14</p>
      <h1>Your data is validation evidence, not a product.</h1>
      <p>
        This notice describes the intended Phase 1 workflow. Public data collection must not begin
        until the operating company and data controller are formally identified here.
      </p>

      <h2>What we collect</h2>
      <p>
        Email address, optional name, contribution interests, self-reported hardware and network
        capability, optional organization details, consent records, and abuse-prevention metadata.
      </p>

      <h2>Why we collect it</h2>
      <p>
        To measure genuine interest, assess pilot feasibility, contact suitable interview or pilot
        candidates, and send project updates only when separately requested.
      </p>

      <h2>Retention and access</h2>
      <p>
        Inactive registrations are scheduled for deletion within twelve months. Short-lived
        pseudonymous rate-limit metadata is retained for no more than 24 hours. Individual hardware
        ownership and personal information are never published.
      </p>

      <h2>Your choices</h2>
      <p>
        Every verification email contains a private management link for permanent self-service
        deletion. You may withdraw optional update consent or request access, correction, or export
        once the controller contact is published.
      </p>

      <h2>Before launch</h2>
      <p>
        Tenvra must publish its legal entity, controller contact, processors, EU/EEA hosting region,
        legal basis, and complete data-subject request procedure before accepting real
        registrations.
      </p>
    </main>
  );
}
