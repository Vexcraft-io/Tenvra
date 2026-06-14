import "server-only";

import type { InterestSubmission } from "./validation";
import { supabaseRequest } from "./supabase";

interface RegistrationTokens {
  verificationHash: string;
  deletionHash: string;
}

export type QualificationStatus = "unreviewed" | "potential" | "qualified" | "not_qualified";

export interface OperatorRegistration {
  id: string;
  email: string;
  display_name: string | null;
  interests: string[];
  hardware: Record<string, unknown> | null;
  network: Record<string, unknown> | null;
  organization: Record<string, unknown> | null;
  contribution_note: string | null;
  status: string;
  qualification_status: QualificationStatus;
  email_verified_at: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export async function saveRegistration(
  submission: InterestSubmission,
  tokens: RegistrationTokens,
): Promise<void> {
  const now = new Date();
  const verificationExpiresAt = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  const retentionExpiresAt = new Date(now);
  retentionExpiresAt.setUTCFullYear(retentionExpiresAt.getUTCFullYear() + 1);

  await supabaseRequest("interest_registrations?on_conflict=email_normalized", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=minimal",
    body: JSON.stringify({
      email: submission.email,
      display_name: submission.displayName,
      interests: submission.interests,
      hardware: submission.hardware,
      network: submission.network,
      organization: submission.organization,
      contribution_note: submission.contributionNote,
      status: "pending_verification",
      email_verified_at: null,
      verification_token_hash: tokens.verificationHash,
      verification_expires_at: verificationExpiresAt.toISOString(),
      deletion_token_hash: tokens.deletionHash,
      privacy_consent_at: now.toISOString(),
      privacy_notice_version: "2026-06-14",
      updates_consent_at: submission.updatesConsent ? now.toISOString() : null,
      source: submission.source,
      retention_expires_at: retentionExpiresAt.toISOString(),
      updated_at: now.toISOString(),
    }),
  });
}

export async function verifyRegistration(tokenHash: string): Promise<boolean> {
  const rows = await supabaseRequest<{ id: string }[]>(
    `interest_registrations?verification_token_hash=eq.${tokenHash}` +
      `&verification_expires_at=gt.${encodeURIComponent(new Date().toISOString())}` +
      "&select=id",
    {
      method: "PATCH",
      prefer: "return=representation",
      body: JSON.stringify({
        status: "verified",
        email_verified_at: new Date().toISOString(),
        verification_token_hash: null,
        verification_expires_at: null,
        updated_at: new Date().toISOString(),
      }),
    },
  );
  return rows.length > 0;
}

export async function deleteRegistration(tokenHash: string): Promise<boolean> {
  const rows = await supabaseRequest<{ id: string }[]>(
    `interest_registrations?deletion_token_hash=eq.${tokenHash}&select=id`,
    { method: "DELETE", prefer: "return=representation" },
  );
  return rows.length > 0;
}

export async function checkAndRecordAttempt(ipHash: string | null): Promise<boolean> {
  if (!ipHash) return true;

  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const rows = await supabaseRequest<{ id: string }[]>(
    `interest_registration_attempts?ip_hash=eq.${ipHash}` +
      `&created_at=gte.${encodeURIComponent(since)}&select=id&limit=11`,
  );
  if (rows.length >= 10) return false;

  await supabaseRequest("interest_registration_attempts", {
    method: "POST",
    prefer: "return=minimal",
    body: JSON.stringify({ ip_hash: ipHash }),
  });
  return true;
}

export async function listRegistrationsForReview(
  qualificationStatus?: QualificationStatus,
): Promise<OperatorRegistration[]> {
  const filter = qualificationStatus
    ? `&qualification_status=eq.${encodeURIComponent(qualificationStatus)}`
    : "";
  return supabaseRequest<OperatorRegistration[]>(
    "interest_registrations?" +
      "select=id,email,display_name,interests,hardware,network,organization," +
      "contribution_note,status,qualification_status,email_verified_at,reviewed_at,created_at" +
      `${filter}&order=created_at.desc&limit=200`,
  );
}

export async function reviewRegistration(
  registrationId: string,
  qualificationStatus: QualificationStatus,
  reviewer: string,
  note: string | null,
): Promise<void> {
  await supabaseRequest("rpc/review_interest_registration", {
    method: "POST",
    prefer: "return=minimal",
    body: JSON.stringify({
      target_registration_id: registrationId,
      new_qualification_status: qualificationStatus,
      reviewer,
      review_note: note,
    }),
  });
}
