# Dataset Policy

Initial training data is limited to:

- Public-domain material.
- Code under reviewed permissive licenses.
- Material contributed by a verified rights holder under explicit terms.

Each immutable dataset manifest records source, commit or version, license, acquisition time,
transforms, filtering decisions, hashes, and removal status.

Public availability alone is not considered sufficient permission. Customer prompts are excluded
unless covered by a separate, explicit, revocable opt-in process.

Live service traffic does not update a production model. New data enters only an immutable
candidate dataset and must pass provenance, privacy, license, quality, security, and removal
checks before any training job is approved.
