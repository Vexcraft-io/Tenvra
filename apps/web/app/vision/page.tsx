import Link from "next/link";

export default function VisionPage() {
  return (
    <main className="prose-page shell">
      <Link href="/">Back to Tenvra</Link>
      <p className="eyebrow">Vision</p>
      <h1>Independent European coding intelligence.</h1>
      <p>
        Tenvra is designed to test whether European contributors can improve coding models through
        verifiable training and evaluation work while keeping official governance, production data,
        model releases, and critical operations under EU/EEA control.
      </p>
      <p>
        European-first is a control and resilience boundary, not a ban on global open-source
        participation. The project starts narrowly and expands only when technical, legal, economic,
        and security evidence supports the next phase.
      </p>
      <h2>What this does not mean</h2>
      <p>
        It does not mean sending private customer code to arbitrary home computers, promising
        guaranteed income, learning automatically from live prompts, or claiming that a frontier
        model can be trained cheaply before the underlying measurements exist.
      </p>
    </main>
  );
}
