import "server-only";

interface VerificationMessage {
  recipient: string;
  verificationUrl: string;
  deletionUrl: string;
}

export type EmailDeliveryMode = "local" | "resend";

export function isEmailConfigured(): boolean {
  return (
    (process.env.NODE_ENV !== "production" && process.env.INTEREST_EMAIL_MODE === "local") ||
    Boolean(process.env.RESEND_API_KEY && process.env.INTEREST_EMAIL_FROM)
  );
}

export async function sendVerificationEmail(
  message: VerificationMessage,
): Promise<EmailDeliveryMode> {
  if (process.env.NODE_ENV !== "production" && process.env.INTEREST_EMAIL_MODE === "local") {
    return "local";
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INTEREST_EMAIL_FROM;
  if (!apiKey || !from) {
    throw new Error("Email delivery is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [message.recipient],
      subject: "Verify your interest in Tenvra",
      text: [
        "Thanks for your interest in Tenvra.",
        "",
        "Verify your email within 48 hours:",
        message.verificationUrl,
        "",
        "You can delete your registration at any time:",
        message.deletionUrl,
        "",
        "Tenvra is in its validation stage. This registration is not an investment,",
        "employment offer, compute contract, or promise of payment.",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("Verification email failed", response.status, await response.text());
    throw new Error("The verification email could not be sent.");
  }

  return "resend";
}
