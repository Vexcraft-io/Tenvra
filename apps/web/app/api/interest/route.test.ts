import { describe, expect, it } from "vitest";

import { POST } from "./route";

describe("POST /api/interest", () => {
  it("validates submissions before accessing external services", async () => {
    const request = new Request("http://localhost:3000/api/interest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "invalid", privacyConsent: false }),
    });

    const response = await POST(request);
    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({
      errors: { email: expect.any(String) },
    });
  });

  it("uses non-persistent preview mode when local services are absent", async () => {
    const request = new Request("http://localhost:3000/api/interest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: "developer@example.com",
        interests: ["developer"],
        privacyConsent: true,
        source: "test",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ mode: "preview" });
  });
});
