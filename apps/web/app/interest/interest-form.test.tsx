import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { InterestForm } from "./interest-form";

describe("InterestForm", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("reveals AMD/NVIDIA capability and network fields for GPU operators", () => {
    render(<InterestForm />);

    fireEvent.click(screen.getByLabelText(/Run compute/i));

    expect(screen.getByLabelText(/GPU model/i)).toBeDefined();
    expect(screen.getByLabelText(/Compute backend/i)).toBeDefined();
    expect(screen.getByLabelText(/Upload speed/i)).toBeDefined();
  });

  it("submits a developer registration and displays preview status", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          mode: "preview",
          message: "Validated but not stored.",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    render(<InterestForm />);
    fireEvent.click(screen.getByLabelText(/Build software/i));
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "developer@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/I have read the privacy notice/i));
    fireEvent.click(screen.getByRole("button", { name: /Register interest/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    expect(await screen.findByText("The form works.")).toBeDefined();
    expect(screen.getByText(/stores no personal information/i)).toBeDefined();
  });
});
