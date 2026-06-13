# Model Evaluation Plan

The planned release suite combines:

- LiveCodeBench.
- BigCodeBench.
- EvalPlus regression tests.
- Secure-code evaluation.
- A licensed private held-out set.
- Blind design-partner comparisons on approved synthetic or non-sensitive tasks.

Every report records model and dataset lineage, generation settings, hardware, runtime, sample
counts, confidence or variance where applicable, and known contamination risks.

Model promotion moves explicitly through `candidate`, `staging`, and `released`. A failed safety or
quality gate blocks promotion.
