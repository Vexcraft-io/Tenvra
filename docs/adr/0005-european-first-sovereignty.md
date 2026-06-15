# ADR 0005: European-First Sovereignty

- Status: Accepted
- Date: 2026-06-15

## Decision

Tenvra will be developed as a European-first coding AI platform. The official service will target
EU/EEA governance, production data residency, initial customers, contributor operations, and
compute pilots.

The architecture must support operation of an approved Tenvra-controlled model without depending
on a third-party hosted model API. Community compute will execute signed, versioned workloads;
production models will change only through explicit verification and release gates.

## Rationale

European users should not lose access to essential coding intelligence because one external
provider changes pricing, policy, availability, or regional access. European-first positioning also
creates a concrete trust boundary for privacy, AI governance, procurement, and infrastructure
decisions.

## Consequences

- EU/EEA regions and subprocessors are required for production personal and customer data.
- Portability and provider exit tests become release gates.
- EU AI Act, GDPR, copyright, and cybersecurity obligations must be designed into model operations.
- European contributors and design partners are prioritized during validation.
- Global open-source participation remains possible.
- This decision increases infrastructure and compliance cost and does not remove dependence on
  globally manufactured hardware.
