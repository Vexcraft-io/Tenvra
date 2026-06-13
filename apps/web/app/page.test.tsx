import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("home page", () => {
  it("states the project maturity honestly", () => {
    render(<Home />);
    expect(
      screen.getByText(/No public model, compute network, contributor payments/i),
    ).toBeDefined();
  });
});
