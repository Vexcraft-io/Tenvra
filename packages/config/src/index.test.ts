import { describe, expect, it } from "vitest";

import { brand } from "./index";

describe("brand configuration", () => {
  it("uses the intended project identity", () => {
    expect(brand.name).toBe("Tenvra");
    expect(brand.domain).toBe("tenvra.ai");
  });
});
