import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  createOperatorSession,
  readOperatorSession,
  requestHasTrustedOrigin,
  verifyOperatorAccessToken,
} from "./session";

describe("operator sessions", () => {
  beforeEach(() => {
    process.env.OPERATOR_ACCESS_TOKEN = "test-access-token";
    process.env.OPERATOR_SESSION_SECRET = "test-session-secret";
  });

  afterEach(() => {
    delete process.env.OPERATOR_ACCESS_TOKEN;
    delete process.env.OPERATOR_SESSION_SECRET;
  });

  it("creates and verifies a signed session", () => {
    const session = createOperatorSession("reviewer");
    expect(readOperatorSession(session)?.operator).toBe("reviewer");
  });

  it("rejects tampered sessions and incorrect access tokens", () => {
    const session = createOperatorSession();
    expect(readOperatorSession(`${session}x`)).toBeNull();
    expect(verifyOperatorAccessToken("wrong")).toBe(false);
    expect(verifyOperatorAccessToken("test-access-token")).toBe(true);
  });

  it("requires an exact same-origin mutation request", () => {
    expect(
      requestHasTrustedOrigin(
        new Request("http://localhost:3000/api/operator/reviews", {
          headers: { origin: "http://localhost:3000" },
        }),
      ),
    ).toBe(true);
    expect(
      requestHasTrustedOrigin(
        new Request("http://localhost:3000/api/operator/reviews", {
          headers: { origin: "https://attacker.invalid" },
        }),
      ),
    ).toBe(false);
  });
});
