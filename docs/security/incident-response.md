# Incident Response

## Severity

- **SEV-1:** active compromise, customer-data exposure, signing-key loss, ledger corruption, or
  malicious release.
- **SEV-2:** major integrity failure, widespread service outage, or exploitable high-risk defect.
- **SEV-3:** contained defect with limited impact.

## Immediate Controls

Separately signed controls must be able to:

- Pause new jobs.
- Revoke images and client versions.
- Freeze payouts.
- Isolate model versions and datasets.
- Disable affected credentials.

## Response Flow

1. Declare severity and incident lead.
2. Preserve evidence and start an immutable timeline.
3. Contain affected systems.
4. Rotate or revoke credentials.
5. Assess legal, privacy, customer, and contributor notification duties.
6. Restore from tested known-good state.
7. Publish a post-incident report where safe.

## Recovery Objectives

Ledger and control plane target a 15-minute recovery point and four-hour recovery time.
