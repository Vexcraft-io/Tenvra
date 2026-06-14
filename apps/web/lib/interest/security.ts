import { createHash, randomBytes } from "node:crypto";

export function createToken(): { token: string; hash: string } {
  const token = randomBytes(32).toString("base64url");
  return { token, hash: hashToken(token) };
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export function isValidToken(token: unknown): token is string {
  return typeof token === "string" && /^[A-Za-z0-9_-]{43}$/.test(token);
}

export function hashRateLimitValue(value: string): string {
  const salt = process.env.RATE_LIMIT_SALT;
  if (!salt) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RATE_LIMIT_SALT is required in production.");
    }
    return hashToken(`local-development:${value}`);
  }
  return hashToken(`${salt}:${value}`);
}
