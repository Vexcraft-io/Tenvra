import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { brand } from "@tenvra/config";

import { listRegistrationsForReview } from "../../lib/interest/repository";
import { getOperatorSession } from "../../lib/operator/auth";
import { OperatorDashboard } from "./operator-dashboard";

export const metadata: Metadata = {
  title: `Review pipeline | ${brand.name}`,
  robots: { index: false, follow: false },
};

export default async function OperatorPage() {
  const session = await getOperatorSession();
  if (!session) redirect("/operator/login");

  const registrations = await listRegistrationsForReview();

  return (
    <main className="operator-page shell">
      <nav className="nav" aria-label="Operator navigation">
        <Link className="wordmark" href="/">
          <span aria-hidden="true" className="mark">
            T
          </span>
          {brand.name}
        </Link>
        <span className="operator-identity">Restricted operator session</span>
      </nav>
      <header className="operator-heading">
        <p className="eyebrow">Phase 1 · Private review</p>
        <h1>Qualification queue.</h1>
        <p>
          Review only the evidence needed for pilot feasibility. Decisions are written to an
          append-only audit log.
        </p>
      </header>
      <OperatorDashboard initialRegistrations={registrations} />
    </main>
  );
}
