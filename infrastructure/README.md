# Infrastructure

Infrastructure is separated by phase and trust domain.

- `supabase/`: local and phase-one database configuration.
- `opentofu/`: non-deploying AWS module scaffold for the future pilot.
- `containers/`: service images. CUDA and ROCm workload images are intentionally deferred until
  real hardware validation.

No production account, backend, credential, or deploy target is configured in this repository.
