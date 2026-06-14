"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { OperatorRegistration, QualificationStatus } from "../../lib/interest/repository";
import { ReviewCard } from "./review-card";

type Filter = "all" | QualificationStatus;

export function OperatorDashboard({
  initialRegistrations,
}: {
  initialRegistrations: OperatorRegistration[];
}) {
  const router = useRouter();
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? registrations
        : registrations.filter((item) => item.qualification_status === filter),
    [filter, registrations],
  );

  function updateRegistration(id: string, status: QualificationStatus) {
    setRegistrations((current) =>
      current.map((item) => (item.id === id ? { ...item, qualification_status: status } : item)),
    );
  }

  async function logout() {
    await fetch("/api/operator/logout", { method: "POST" });
    router.replace("/operator/login");
    router.refresh();
  }

  return (
    <>
      <section className="operator-summary" aria-label="Registration summary">
        <Metric label="Total" value={registrations.length} />
        <Metric
          label="Verified"
          value={registrations.filter((item) => item.status === "verified").length}
        />
        <Metric
          label="GPU operators"
          value={registrations.filter((item) => item.interests.includes("gpu-operator")).length}
        />
        <Metric
          label="Qualified"
          value={registrations.filter((item) => item.qualification_status === "qualified").length}
        />
      </section>

      <div className="operator-toolbar">
        <label className="field">
          <span>Filter queue</span>
          <select value={filter} onChange={(event) => setFilter(event.target.value as Filter)}>
            <option value="all">All registrations</option>
            <option value="unreviewed">Unreviewed</option>
            <option value="potential">Potential</option>
            <option value="qualified">Qualified</option>
            <option value="not_qualified">Not qualified</option>
          </select>
        </label>
        <button className="secondary-button" onClick={logout}>
          Sign out
        </button>
      </div>

      <section className="review-list" aria-label="Registration review queue">
        {filtered.length ? (
          filtered.map((registration) => (
            <ReviewCard
              key={registration.id}
              registration={registration}
              onUpdated={updateRegistration}
            />
          ))
        ) : (
          <div className="operator-empty">No registrations match this filter.</div>
        )}
      </section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
