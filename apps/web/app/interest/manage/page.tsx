import type { Metadata } from "next";
import Link from "next/link";

import { brand } from "@tenvra/config";

import { isValidToken } from "../../../lib/interest/security";
import { ManageForm } from "./manage-form";

export const metadata: Metadata = {
  title: `Manage registration | ${brand.name}`,
  robots: { index: false, follow: false },
};

export default async function ManageInterestPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <main className="prose-page shell manage-page">
      <Link className="wordmark" href="/">
        <span aria-hidden="true" className="mark">
          T
        </span>
        {brand.name}
      </Link>
      <p className="eyebrow">Registration controls</p>
      <h1>Manage your data.</h1>
      <p>
        Tenvra gives you direct control over the information submitted during project validation.
      </p>
      {isValidToken(token) ? (
        <ManageForm token={token} />
      ) : (
        <div className="verification-notice error">
          This management link is invalid. Use the link from your verification email.
        </div>
      )}
    </main>
  );
}
