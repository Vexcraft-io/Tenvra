# Container Images

The coordinator and verifier Dockerfiles are service scaffolds.

CUDA and ROCm workload images are deliberately absent. They must be created only after:

- GPU, driver, kernel, runtime, PyTorch, and library versions are frozen.
- Images can be reproduced and signed.
- Host isolation and device access are tested.
- At least two allowlisted models per backend are validated where practical.
