import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const operatorCookieName = "tenvra_operator";
const sessionLifetimeSeconds = 8 * 60 * 60;

interface OperatorSession {
  operator: string;
  expiresAt: number;
}

export function operatorAuthConfigured(): boolean {
  return Boolean(process.env.OPERATOR_ACCESS_TOKEN && process.env.OPERATOR_SESSION_SECRET);
}

export function verifyOperatorAccessToken(candidate: unknown): boolean {
  const expected = process.env.OPERATOR_ACCESS_TOKEN;
  if (!expected || typeof candidate !== "string") return false;
  return safeEqual(candidate, expected);
}

export function createOperatorSession(operator = "local-operator"): string {
  const payload: OperatorSession = {
    operator,
    expiresAt: Math.floor(Date.now() / 1000) + sessionLifetimeSeconds,
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function readOperatorSession(value: string | undefined): OperatorSession | null {
  if (!value) return null;
  const [encoded, signature, extra] = value.split(".");
  if (!encoded || !signature || extra || !safeEqual(signature, sign(encoded))) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as OperatorSession;
    if (
      typeof payload.operator !== "string" ||
      typeof payload.expiresAt !== "number" ||
      payload.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function operatorCookieOptions() {
  return {
    httpOnly: true,
    maxAge: sessionLifetimeSeconds,
    path: "/",
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export function requestHasTrustedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return origin === new URL(request.url).origin;
}

function sign(value: string): string {
  const secret = process.env.OPERATOR_SESSION_SECRET;
  if (!secret) return "";
  return createHmac("sha256", secret).update(value, "utf8").digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}
