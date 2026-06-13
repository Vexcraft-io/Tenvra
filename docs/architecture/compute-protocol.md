# Compute Protocol

## Principles

- Outbound-only HTTPS from nodes.
- Short-lived node credentials.
- Signed declarative manifests.
- Digest-pinned container images.
- No free-form coordinator shell commands.
- Versioned contracts with a two-major-version migration window.

## Job Manifest

A manifest declares:

- Protocol and schema version.
- Job identifier and type.
- Container digest and approved signer.
- Input and expected output hashes.
- CPU, memory, GPU, disk, network, and deadline limits.
- Allowed network destinations.
- Telemetry fields.
- Verification policy.
- Reserved minimum reward and optional bonus policy.

## Result Attestation

The node signs:

- Job and manifest identifiers.
- Node and client version.
- Container digest.
- Start, finish, and exit status.
- Measurements and artifact hashes.
- Errors and policy-triggered stops.

Large artifacts are uploaded separately using short-lived, least-privilege URLs.

## Compatibility

The coordinator accepts the current and previous supported protocol major during migrations. Old
clients may be revoked when they create a security or integrity risk.
