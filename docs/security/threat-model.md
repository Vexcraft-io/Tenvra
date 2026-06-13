# Threat Model

## Protected Assets

- Contributor and customer identities.
- Private customer prompts and generated code.
- Signing, deployment, and payout credentials.
- Job and result integrity.
- Dataset and model lineage.
- Economic ledger balances.
- Host machines operated by contributors.

## Primary Threats

- Malicious or compromised job images.
- Malicious nodes returning fabricated or poisoned results.
- Sybil identities manipulating rewards or consensus.
- Supply-chain compromise in CI, dependencies, registries, or updates.
- Privileged account takeover.
- Prompt, dataset, artifact, or secret leakage.
- Duplicate events causing duplicate rewards.
- Model memorization and unsafe code generation.

## Core Controls

- Rootless restricted containers and no host mounts.
- Signed manifests and digest-pinned images.
- Short-lived node identity and service credentials.
- Progressive node trust and risk-based redundant work.
- Quarantine and evaluation gates before model promotion.
- Append-only ledger with balanced entries and idempotency.
- Separate development, staging, production, and phase trust domains.
- Hardware-key administration before the pilot.

## Residual Risk

Container isolation cannot make an untrusted machine safe for private customer inference. Open nodes
therefore receive only approved non-customer data.
