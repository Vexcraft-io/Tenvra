import type { Metadata } from "next";
import Link from "next/link";

import { brand } from "@tenvra/config";

import { InterestForm } from "./interest-form";

export const metadata: Metadata = {
  title: `Register interest | ${brand.name}`,
  description:
    "Tell Tenvra how you may contribute compute, engineering, research, or design-partner feedback.",
};

export default async function InterestPage({
  searchParams,
}: {
  searchParams: Promise<{ verification?: string }>;
}) {
  const { verification } = await searchParams;

  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <Link className="wordmark" href="/">
          <span aria-hidden="true" className="mark">
            T
          </span>
          {brand.name}
        </Link>
        <div className="nav-links">
          <Link href="/vision">Vision</Link>
          <Link href="/roadmap">Roadmap</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </nav>

      <div className="interest-layout shell">
        <aside className="interest-intro">
          <p className="eyebrow">Phase 1 · Validation</p>
          <h1>Help decide whether Tenvra should exist.</h1>
          <p>
            We are measuring serious interest before building a distributed compute pilot. Tell us
            what you could contribute or what your team would need.
          </p>
          <dl className="validation-targets">
            <div>
              <dt>100</dt>
              <dd>verified registrations</dd>
            </div>
            <div>
              <dt>30</dt>
              <dd>GPU operators</dd>
            </div>
            <div>
              <dt>10</dt>
              <dd>design-partner interviews</dd>
            </div>
          </dl>
          <p className="privacy-note">
            We collect only qualification data, never sell it, and keep the public validation
            database separate from future compute infrastructure.
          </p>
        </aside>

        <section className="form-panel" aria-label="Interest registration">
          <VerificationNotice status={verification} />
          <InterestForm />
        </section>
      </div>
    </main>
  );
}

function VerificationNotice({ status }: { status?: string }) {
  if (!status) return null;
  if (status === "success") {
    return (
      <div className="verification-notice success" role="status">
        Your email is verified. Your response now counts toward the validation targets.
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="verification-notice error" role="alert">
        Verification is temporarily unavailable. Please retry the link later.
      </div>
    );
  }
  return (
    <div className="verification-notice error" role="alert">
      This verification link is invalid or has expired. Submit the form again for a new link.
    </div>
  );
}
