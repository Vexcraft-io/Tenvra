# Risk Register

| Risk                                                     | Impact   | Initial Mitigation                               | Trigger                       |
| -------------------------------------------------------- | -------- | ------------------------------------------------ | ----------------------------- |
| Insufficient qualified contributors                      | High     | Thirty-day validation gate                       | Missed supply targets         |
| Distributed results cannot be verified economically      | Critical | Redundancy, quarantine, narrow workloads         | Two failed pilots             |
| Contributor rewards are not profitable after electricity | High     | Local price floor and measured work units        | Low repeat participation      |
| Customer inference cost is not competitive               | High     | Cost floor, trusted capacity, no premature claim | Margin below 25%              |
| Private prompts reach open nodes                         | Critical | Architectural prohibition and contract controls  | Any routing violation         |
| Dataset license failure                                  | Critical | Permissive sources and immutable provenance      | Unresolved source rights      |
| Signing or CI compromise                                 | Critical | OIDC, KMS, reproducible builds, staged release   | Key or provenance anomaly     |
| Name or domain conflict                                  | Medium   | Clearance before launch                          | Failed professional search    |
| Financing unavailable                                    | High     | Narrow research-only continuation                | Runway below approved floor   |
| AMD/ROCm fragmentation                                   | Medium   | Explicit hardware and software allowlists        | Elevated backend failure rate |
| External model API dependency                            | Critical | Self-hosted release path and provider exit tests | Loss or restriction of access |
| Non-European production data placement                   | Critical | Region policy, contracts, and deployment gates   | Residency or transfer breach  |
| Cloud-provider concentration                             | High     | Portable state, backups, and second restore path | Failed provider exit test     |
| Uncontrolled continuous learning                         | Critical | Immutable candidates and explicit release gates  | Unreviewed model modification |

Risks are reviewed at each phase gate and after material incidents.
