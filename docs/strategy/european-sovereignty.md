# European AI Sovereignty Strategy

## Objective

Tenvra is European-first: the project is intended to give European developers, companies,
researchers, and institutions durable access to coding AI whose governance, production data,
model releases, and critical operating capability remain under European control.

European-first does not mean closed to the world. Source code, research, and compatible model
artifacts may be globally useful. The sovereignty requirement applies to control of the official
service and its critical production dependencies.

## Sovereignty Principles

1. **European governance:** the official service is operated by an EU/EEA legal entity and subject
   to European law.
2. **European data residency:** production identity data, customer prompts, generated code,
   economic records, signing material, and model-control metadata remain in approved EU/EEA
   regions unless a documented legal and security exception is approved.
3. **Operational portability:** no critical control-plane component may depend permanently on one
   cloud, model API, or proprietary service without a tested replacement or export path.
4. **Model continuity:** Tenvra must be able to serve an approved model without relying on a
   third-party hosted model API.
5. **Documented data rights:** every training source requires provenance, a compatible legal basis,
   and a removal process.
6. **Controlled improvement:** community compute performs versioned jobs. Results enter candidate
   models only after verification, evaluation, and an explicit release decision.
7. **Open where responsible:** code, protocols, evaluations, and model artifacts should be
   published when licensing, privacy, security, and commercial obligations permit.
8. **European ecosystem preference:** qualified European infrastructure, research programs,
   suppliers, and open technologies are preferred when they meet security and economic needs.

## What Continuous Training Means

Tenvra may operate a continuous improvement pipeline, but the production model does not learn
directly from live prompts or unreviewed node output.

```text
approved data -> immutable dataset version -> signed training jobs
              -> redundant verification -> candidate model
              -> quality, safety, privacy, and license gates
              -> signed release -> monitored production deployment
```

Each production release must be reproducible from recorded dataset, code, configuration, compute,
evaluation, and approval metadata. A failed candidate can be rejected without changing the current
production model.

## Initial Geographic Scope

- Company, governance, and primary operations: European Union.
- Production data regions: EU/EEA only.
- Initial contributor and design-partner recruitment: EU/EEA.
- Initial payouts: verified Swedish entities, then eligible EU/EEA entities after tax and payment
  review.
- Community compute pilot: physically located in the EU/EEA unless an explicit research exception
  is approved.
- Public source participation: global, subject to sanctions, export controls, security policy, and
  contribution terms.

## Dependency Classification

| Class                    | Requirement                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| Critical control         | EU/EEA operated, exportable, backed up, and covered by an exit plan          |
| Production model serving | Must support a Tenvra-controlled model without an external model API         |
| Development tooling      | External services allowed when source and production continuity remain       |
| Overflow compute         | Allowed under approved contracts; must not receive unrestricted private data |
| Public communication     | May use global platforms and mirrors                                         |

Hardware origin alone cannot provide full sovereignty. Tenvra should reduce concentration risk
through portable software, NVIDIA and AMD support, multiple hosting paths, and documented
replacement plans.

## Measurable Gates

Before a paid beta:

- A tested restore of critical production state into a second approved EU/EEA environment.
- A documented exit plan for every critical subprocessor and infrastructure provider.
- No private prompt processing on open community nodes.
- A model-serving path that continues without OpenAI, Anthropic, or another external model API.
- Dataset manifests, model documentation, and AI Act/GDPR assessments reviewed.
- At least two independent infrastructure or compute paths for critical workloads.

This strategy is a product and architecture baseline, not a claim that sovereignty has already
been achieved.

## Policy References

- [EU regulatory framework for artificial intelligence](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [General-Purpose AI Code of Practice](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai)
- [EuroHPC AI Factories](https://www.eurohpc-ju.europa.eu/ai-factories_en)
- [EDPB Opinion 28/2024 on AI models and personal data](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en)
