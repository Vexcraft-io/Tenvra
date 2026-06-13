import { describe, expect, it } from "vitest";

import { isProtocolCompatible, protocolVersion } from "./index";

describe("protocol compatibility", () => {
  it("accepts the current major version", () => {
    expect(isProtocolCompatible(protocolVersion)).toBe(true);
    expect(isProtocolCompatible("0.9.0")).toBe(true);
  });

  it("rejects another major version", () => {
    expect(isProtocolCompatible("1.0.0")).toBe(false);
  });
});
