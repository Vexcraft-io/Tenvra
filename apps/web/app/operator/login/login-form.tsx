"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function OperatorLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/operator/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: form.get("token") }),
    });

    if (!response.ok) {
      const result = (await response.json()) as { message?: string };
      setError(result.message ?? "Login failed.");
      setSubmitting(false);
      return;
    }

    router.replace("/operator");
    router.refresh();
  }

  return (
    <form className="operator-login-form" onSubmit={submit}>
      {error && (
        <div className="verification-notice error" role="alert">
          {error}
        </div>
      )}
      <label className="field">
        <span>Operator access token</span>
        <input name="token" type="password" autoComplete="current-password" required />
      </label>
      <button className="submit-button" type="submit" disabled={submitting}>
        {submitting ? "Signing in…" : "Open review pipeline"}
      </button>
    </form>
  );
}
