import Link from "next/link";

import { brand } from "@tenvra/config";
import { StatusPill } from "@tenvra/ui";

const principles = [
  {
    number: "01",
    title: "Open by design",
    text: "Code, protocols, decisions, and measured results are intended to be inspectable.",
  },
  {
    number: "02",
    title: "Useful work",
    text: "Contributions must be verified before they can affect models, reputation, or rewards.",
  },
  {
    number: "03",
    title: "Shared value",
    text: "The planned economics reward contributors in ordinary currency, without a crypto token.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <Link className="wordmark" href="/">
          <span aria-hidden="true" className="mark">
            T
          </span>
          {brand.name}
        </Link>
        <div className="nav-links">
          <Link href="/vision">Vision</Link>
          <Link href="/roadmap">Roadmap</Link>
          <Link href="/interest">Take part</Link>
          <a href="https://github.com/mkungen89/tenvra">GitHub</a>
        </div>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <StatusPill>{brand.status}</StatusPill>
          <h1>{brand.headline}</h1>
          <p className="lede">
            Tenvra is laying the foundation for open coding intelligence powered by verified
            contributions from developers, researchers, and hardware operators.
          </p>
          <div className="actions">
            <Link className="primary-link" href="/interest">
              Register interest
            </Link>
            <Link className="secondary-link" href="/roadmap">
              Explore the roadmap
            </Link>
          </div>
          <p className="disclaimer">
            No public model, compute network, contributor payments, or production API exists yet.
          </p>
        </div>
        <NetworkVisual />
      </section>

      <section className="principles shell" aria-labelledby="principles-heading">
        <div className="section-heading">
          <p className="eyebrow">Foundation principles</p>
          <h2 id="principles-heading">Evidence before scale.</h2>
        </div>
        <div className="card-grid">
          {principles.map((principle) => (
            <article className="card" key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer shell">
        <p>{brand.tagline}</p>
        <p>Validation stage · 2026</p>
      </footer>
    </main>
  );
}

function NetworkVisual() {
  return (
    <div className="network-panel" aria-label="Conceptual network illustration">
      <svg role="img" viewBox="0 0 520 460">
        <title>Conceptual network of verified compute contributors</title>
        <g className="links">
          <path d="M92 120 252 76 432 138 394 322 204 382 70 286Z" />
          <path d="m92 120 112 262 48-306 142 246 38-184L70 286Z" />
        </g>
        <g className="nodes">
          <circle cx="92" cy="120" r="12" />
          <circle cx="252" cy="76" r="12" />
          <circle cx="432" cy="138" r="12" />
          <circle cx="394" cy="322" r="12" />
          <circle cx="204" cy="382" r="12" />
          <circle cx="70" cy="286" r="12" />
          <circle className="node-core" cx="252" cy="230" r="23" />
        </g>
      </svg>
      <div className="network-caption">
        <span>Concept only</span>
        <strong>Verified work · Open protocols · Measured outcomes</strong>
      </div>
    </div>
  );
}
