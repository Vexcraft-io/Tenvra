"use client";

import { useState } from "react";

import type { OperatorRegistration, QualificationStatus } from "../../lib/interest/repository";

const statusLabels: Record<QualificationStatus, string> = {
  unreviewed: "Unreviewed",
  potential: "Potential",
  qualified: "Qualified",
  not_qualified: "Not qualified",
};

export function ReviewCard({
  registration,
  onUpdated,
}: {
  registration: OperatorRegistration;
  onUpdated: (id: string, status: QualificationStatus) => void;
}) {
  const [status, setStatus] = useState(registration.qualification_status);
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  async function save() {
    setState("saving");
    setMessage("");
    const response = await fetch("/api/operator/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        registrationId: registration.id,
        qualificationStatus: status,
        note,
      }),
    });

    if (!response.ok) {
      const result = (await response.json()) as { message?: string };
      setMessage(result.message ?? "The review could not be saved.");
      setState("error");
      return;
    }

    setState("saved");
    setMessage("Decision saved to the audit log.");
    onUpdated(registration.id, status);
  }

  const hardware = registration.hardware;
  const network = registration.network;
  const organization = registration.organization;

  return (
    <article className="review-card">
      <header className="review-card-header">
        <div>
          <p className="eyebrow">{registration.interests.join(" · ")}</p>
          <h2>{registration.display_name || registration.email}</h2>
          {registration.display_name && <p>{registration.email}</p>}
        </div>
        <span className={`review-status ${registration.status}`}>
          {registration.status.replace("_", " ")}
        </span>
      </header>

      <dl className="review-facts">
        <Fact label="GPU" value={readText(hardware, "gpuModel")} />
        <Fact label="Backend" value={readText(hardware, "backend")} />
        <Fact label="VRAM" value={withUnit(readNumber(hardware, "vramGb"), "GB")} />
        <Fact label="OS" value={readText(hardware, "operatingSystem")} />
        <Fact
          label="Availability"
          value={withUnit(readNumber(hardware, "availabilityHoursPerWeek"), "h/week")}
        />
        <Fact
          label="Network"
          value={formatNetwork(
            readNumber(network, "downloadMbps"),
            readNumber(network, "uploadMbps"),
          )}
        />
        <Fact label="Organization" value={readText(organization, "name")} />
        <Fact label="Team" value={readText(organization, "teamSize")} />
      </dl>

      {registration.contribution_note && (
        <blockquote className="contribution-note">{registration.contribution_note}</blockquote>
      )}

      <div className="review-controls">
        <label className="field">
          <span>Qualification decision</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as QualificationStatus)}
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Internal note</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Evidence for this decision"
          />
        </label>
        <button className="primary-link review-save" onClick={save} disabled={state === "saving"}>
          {state === "saving" ? "Saving…" : "Save decision"}
        </button>
        {message && (
          <p className={state === "error" ? "review-message error" : "review-message"}>{message}</p>
        )}
      </div>

      <footer className="review-card-footer">
        <span>Submitted {new Date(registration.created_at).toLocaleString("en-SE")}</span>
        <span>{registration.email_verified_at ? "Email verified" : "Email pending"}</span>
      </footer>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function readText(value: Record<string, unknown> | null, key: string): string | null {
  const field = value?.[key];
  return typeof field === "string" && field ? field : null;
}

function readNumber(value: Record<string, unknown> | null, key: string): number | null {
  const field = value?.[key];
  return typeof field === "number" ? field : null;
}

function withUnit(value: number | null, unit: string): string | null {
  return value === null ? null : `${value} ${unit}`;
}

function formatNetwork(download: number | null, upload: number | null): string | null {
  return download === null || upload === null ? null : `${download}↓ / ${upload}↑ Mbps`;
}
