import type { Metadata } from "next";
import Link from "next/link";

import { brand } from "@tenvra/config";

export const metadata: Metadata = {
  title: `Terms of service | ${brand.name}`,
  description: "Terms governing Tenvra Phase 1 validation access and participation.",
};

export default function TermsPage() {
  return (
    <main className="prose-page shell legal-page">
      <Link className="wordmark" href="/">
        <span aria-hidden="true" className="mark">
          T
        </span>
        {brand.name}
      </Link>
      <p className="eyebrow">Terms of service · Draft for Phase 1 validation</p>
      <h1>Validation access is conditional, revocable, and not a product sale.</h1>
      <p>
        These terms govern the public validation website and early communication flows for
        Tenvra&apos;s Phase 1 research and market-validation work. They must be finalized with the
        operating legal entity before public launch.
      </p>

      <h2>Scope of the service</h2>
      <p>
        The website is for registering interest, validating demand, and identifying potential
        contributors or design partners. No production AI service, paid subscription, token, or
        compute marketplace is being sold through this site.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You must not submit false identity claims, unlawful content, credentials that do not belong
        to you, exploit attempts, or abusive automated traffic. Tenvra may block, rate-limit, or
        remove submissions that threaten security, privacy, or research integrity.
      </p>

      <h2>Validation submissions</h2>
      <p>
        Registering interest does not create a partnership, employment relationship, funding
        commitment, pilot slot, or guarantee of future access. Tenvra may contact selected
        participants for follow-up interviews or validation checks and may decline or remove entries
        at its discretion.
      </p>

      <h2>Availability and changes</h2>
      <p>
        The validation website may change, pause, or shut down at any time. Features, forms,
        qualification criteria, and communications can be updated without prior notice while the
        project is still in validation.
      </p>

      <h2>Liability and legal status before launch</h2>
      <p>
        Before launch, Tenvra must publish the operating entity, governing law, contact details,
        controller information, and final commercial terms. Until then, this page is a planning
        draft that explains the intended operating model rather than a final public contract.
      </p>
    </main>
  );
}
