import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { brand } from "@tenvra/config";

import { getOperatorSession } from "../../../lib/operator/auth";
import { operatorAuthConfigured } from "../../../lib/operator/session";
import { OperatorLoginForm } from "./login-form";

export const metadata: Metadata = {
  title: `Operator access | ${brand.name}`,
  robots: { index: false, follow: false },
};

export default async function OperatorLoginPage() {
  if (await getOperatorSession()) redirect("/operator");

  return (
    <main className="prose-page shell operator-login-page">
      <Link className="wordmark" href="/">
        <span aria-hidden="true" className="mark">
          T
        </span>
        {brand.name}
      </Link>
      <p className="eyebrow">Restricted · Phase 1</p>
      <h1>Operator review.</h1>
      <p>
        This area contains personal and hardware qualification data. Access is limited to approved
        project operators.
      </p>
      {operatorAuthConfigured() ? (
        <OperatorLoginForm />
      ) : (
        <div className="verification-notice error">
          Operator access is not configured. Set the server-only operator environment variables.
        </div>
      )}
    </main>
  );
}
