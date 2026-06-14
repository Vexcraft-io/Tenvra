import { createToken, hashRateLimitValue } from "../../../lib/interest/security";
import { isEmailConfigured, sendVerificationEmail } from "../../../lib/interest/email";
import { checkAndRecordAttempt, saveRegistration } from "../../../lib/interest/repository";
import { isSupabaseConfigured } from "../../../lib/interest/supabase";
import { validateInterestSubmission } from "../../../lib/interest/validation";

const acceptedMessage =
  "Thanks. Check your inbox for a verification link. It may take a few minutes to arrive.";

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 32_000) {
    return Response.json({ message: "The submitted data is too large." }, { status: 413 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ message: "The submitted data is invalid." }, { status: 400 });
  }

  const result = validateInterestSubmission(input);
  if (!result.data || result.errors) {
    return Response.json(
      { message: "Review the highlighted fields.", errors: result.errors },
      { status: 422 },
    );
  }

  // A filled honeypot is treated as accepted so automated submissions gain no signal.
  if (result.data.website) {
    return Response.json({ message: acceptedMessage }, { status: 202 });
  }

  const productionReady = isSupabaseConfigured() && isEmailConfigured();
  if (!productionReady) {
    if (process.env.NODE_ENV === "production") {
      return Response.json(
        { message: "Registration is temporarily unavailable. Please try again later." },
        { status: 503 },
      );
    }

    return Response.json({
      message:
        "Preview complete. Your details were validated but not stored because local services are not configured.",
      mode: "preview",
    });
  }

  try {
    const ip = getClientIp(request);
    const allowed = await checkAndRecordAttempt(ip ? hashRateLimitValue(ip) : null);
    if (!allowed) {
      return Response.json(
        { message: "Too many attempts. Please wait before trying again." },
        { status: 429 },
      );
    }

    const verification = createToken();
    const deletion = createToken();
    const siteUrl = getSiteUrl(request);

    await saveRegistration(result.data, {
      verificationHash: verification.hash,
      deletionHash: deletion.hash,
    });
    const verificationUrl = `${siteUrl}/api/interest/verify?token=${verification.token}`;
    const deletionUrl = `${siteUrl}/interest/manage?token=${deletion.token}`;
    const deliveryMode = await sendVerificationEmail({
      recipient: result.data.email,
      verificationUrl,
      deletionUrl,
    });

    return Response.json(
      {
        message:
          deliveryMode === "local"
            ? "Stored in local Supabase. Use the development links below to continue."
            : acceptedMessage,
        mode: deliveryMode === "local" ? "local" : undefined,
        development: deliveryMode === "local" ? { verificationUrl, deletionUrl } : undefined,
      },
      { status: 202 },
    );
  } catch (error) {
    console.error("Interest registration failed", error);
    return Response.json(
      { message: "Registration is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }
}

function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return request.headers.get("x-real-ip");
}

function getSiteUrl(request: Request): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/$/, "");
}
