import Link from "next/link";

export default function VisionPage() {
  return (
    <main className="prose-page shell">
      <Link href="/">← Tenvra</Link>
      <p className="eyebrow">Vision</p>
      <h1>Open coding intelligence with accountable infrastructure.</h1>
      <p>
        Tenvra is designed to test whether distributed contributors can improve coding models
        through verifiable training and evaluation work. The project starts narrowly and expands
        only when technical, legal, economic, and security evidence supports the next phase.
      </p>
      <h2>What this does not mean</h2>
      <p>
        It does not mean sending private customer code to arbitrary home computers, promising
        guaranteed income, or claiming that a frontier model can be trained cheaply before the
        underlying measurements exist.
      </p>
    </main>
  );
}
