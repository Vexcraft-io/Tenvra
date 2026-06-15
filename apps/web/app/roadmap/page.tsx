import Link from "next/link";

const phases = [
  "European-first foundation and public validation",
  "EU/EEA NVIDIA and AMD research pilot",
  "Sovereignty, legal, and security review",
  "European B2B design-partner beta",
];

export default function RoadmapPage() {
  return (
    <main className="prose-page shell">
      <Link href="/">Back to Tenvra</Link>
      <p className="eyebrow">Roadmap</p>
      <h1>Every phase has an evidence gate.</h1>
      <ol className="phase-list">
        {phases.map((phase, index) => (
          <li key={phase}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{phase}</strong>
          </li>
        ))}
      </ol>
      <p>
        Dates remain provisional. The planning baseline is 12-15 months from active implementation
        to a paid beta, subject to validation, financing, recruitment, and review.
      </p>
    </main>
  );
}
