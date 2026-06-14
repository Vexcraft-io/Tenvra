import { getOperatorSession } from "../../../../lib/operator/auth";
import {
  listRegistrationsForReview,
  type QualificationStatus,
  reviewRegistration,
} from "../../../../lib/interest/repository";
import { requestHasTrustedOrigin } from "../../../../lib/operator/session";

const qualificationStatuses: QualificationStatus[] = [
  "unreviewed",
  "potential",
  "qualified",
  "not_qualified",
];

export async function GET(request: Request) {
  const session = await getOperatorSession();
  if (!session) {
    return Response.json({ message: "Authentication required." }, { status: 401 });
  }

  const value = new URL(request.url).searchParams.get("status");
  const status = isQualificationStatus(value) ? value : undefined;
  const registrations = await listRegistrationsForReview(status);
  return Response.json({ registrations });
}

export async function PATCH(request: Request) {
  if (!requestHasTrustedOrigin(request)) {
    return Response.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const session = await getOperatorSession();
  if (!session) {
    return Response.json({ message: "Authentication required." }, { status: 401 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ message: "Invalid review request." }, { status: 400 });
  }

  if (!isRecord(input)) {
    return Response.json({ message: "Invalid review request." }, { status: 400 });
  }

  const registrationId = typeof input.registrationId === "string" ? input.registrationId : "";
  const qualificationStatus = input.qualificationStatus;
  const note = typeof input.note === "string" ? input.note.trim() : "";

  if (!isUuid(registrationId) || !isQualificationStatus(qualificationStatus)) {
    return Response.json({ message: "Invalid review decision." }, { status: 422 });
  }
  if (note.length > 500) {
    return Response.json(
      { message: "Review notes are limited to 500 characters." },
      { status: 422 },
    );
  }

  try {
    await reviewRegistration(registrationId, qualificationStatus, session.operator, note || null);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Operator review failed", error);
    return Response.json({ message: "The review could not be saved." }, { status: 503 });
  }
}

function isQualificationStatus(value: unknown): value is QualificationStatus {
  return typeof value === "string" && qualificationStatuses.includes(value as QualificationStatus);
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
