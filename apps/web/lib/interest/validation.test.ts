import { describe, expect, it } from "vitest";

import { validateInterestSubmission } from "./validation";

const validSubmission = {
  email: "NODE@example.com ",
  displayName: "Ada",
  interests: ["gpu-operator", "developer"],
  hardware: {
    gpuModel: "Radeon RX 7900 XTX",
    vramGb: 24,
    backend: "rocm",
    operatingSystem: "linux",
    availabilityHoursPerWeek: 20,
  },
  network: { downloadMbps: 500, uploadMbps: 500 },
  organization: { name: "", teamSize: "" },
  contributionNote: "",
  privacyConsent: true,
  updatesConsent: false,
  source: "website",
  website: "",
};

describe("validateInterestSubmission", () => {
  it("normalizes a valid GPU operator submission", () => {
    const result = validateInterestSubmission(validSubmission);

    expect(result.errors).toBeUndefined();
    expect(result.data?.email).toBe("node@example.com");
    expect(result.data?.hardware?.backend).toBe("rocm");
  });

  it("requires hardware and network details from GPU operators", () => {
    const result = validateInterestSubmission({
      ...validSubmission,
      hardware: {},
      network: {},
    });

    expect(result.errors).toMatchObject({
      gpuModel: expect.any(String),
      uploadMbps: expect.any(String),
    });
  });

  it("does not require hardware from developers", () => {
    const result = validateInterestSubmission({
      ...validSubmission,
      interests: ["developer"],
      hardware: {},
      network: {},
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.hardware).toBeNull();
  });

  it("rejects missing consent and invalid email addresses", () => {
    const result = validateInterestSubmission({
      ...validSubmission,
      email: "invalid",
      privacyConsent: false,
    });

    expect(result.errors).toMatchObject({
      email: expect.any(String),
      privacyConsent: expect.any(String),
    });
  });
});
