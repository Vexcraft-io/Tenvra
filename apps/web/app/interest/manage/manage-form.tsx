"use client";

import { useState } from "react";

export function ManageForm({ token }: { token: string }) {
  const [state, setState] = useState<"idle" | "deleting" | "deleted" | "error">("idle");
  const [message, setMessage] = useState("");

  async function remove() {
    if (!window.confirm("Permanently delete your Tenvra interest registration?")) return;
    setState("deleting");

    try {
      const response = await fetch("/api/interest/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = (await response.json()) as { message?: string };
      setMessage(result.message ?? "The request could not be completed.");
      setState(response.ok ? "deleted" : "error");
    } catch {
      setMessage("The deletion service could not be reached.");
      setState("error");
    }
  }

  if (state === "deleted") {
    return <div className="verification-notice success">{message}</div>;
  }

  return (
    <div className="manage-actions">
      {state === "error" && (
        <div className="verification-notice error" role="alert">
          {message}
        </div>
      )}
      <button className="danger-button" onClick={remove} disabled={state === "deleting"}>
        {state === "deleting" ? "Deleting…" : "Delete my registration"}
      </button>
      <p>This action permanently removes your registration and cannot be undone.</p>
    </div>
  );
}
