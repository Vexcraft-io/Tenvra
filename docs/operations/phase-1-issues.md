# Phase 1 Validation - Issue Breakdown

This document provides a detailed breakdown of all issues required to complete Phase 1 Validation as defined in ROADMAP.md.

## Phase 1 Goals (from ROADMAP.md)

- Protected operator qualification pipeline
- 100 verified sign-ups
- 30 GPU owners, including 15 pilot-compatible systems
- 20 qualified developers or researchers
- 10 design-partner interviews and 5 non-binding letters of intent
- Validate whether EU/EEA residency and model independence materially affect purchasing decisions

---

## Issue Breakdown

### 1. Validation Website Production Deployment

#### Issue 1.1: feat: deploy validation website to production hosting

**Description:**  
Deploy the Next.js validation website from local development to a production hosting environment with proper domain, SSL, and EU/EEA data residency compliance.

**Acceptance Criteria:**

- [ ] Website accessible at production domain with valid SSL certificate
- [ ] All static assets served via CDN with EU/EEA edge locations
- [ ] Supabase connection configured for production (EU/EEA region)
- [ ] Environment variables secured and not exposed client-side
- [ ] Performance score ≥90 on Lighthouse
- [ ] Mobile-responsive design verified on common devices
- [ ] Privacy policy and terms of service pages published
- [ ] Cookie consent banner implemented (GDPR compliant)

**Estimated Effort:** L

**Dependencies:**

- Domain acquisition (Phase 0)
- Supabase production project setup
- SSL certificate provisioning

---

#### Issue 1.2: feat: implement email verification for sign-ups

**Description:**  
Add email verification flow to ensure all registrations are from valid, verified email addresses before counting toward the 100 sign-up goal.

**Acceptance Criteria:**

- [ ] Verification email sent immediately upon registration
- [ ] Token-based verification link with 24-hour expiration
- [ ] Unverified users cannot access qualification forms
- [ ] Resend verification email functionality
- [ ] Verification status stored in Supabase
- [ ] Admin dashboard shows verified vs unverified counts
- [ ] Automated cleanup of unverified registrations after 7 days

**Estimated Effort:** M

**Dependencies:**

- Issue 1.1 (production website)
- Supabase email template configuration

---

#### Issue 1.3: feat: build sign-up flow with role selection

**Description:**  
Create a multi-step sign-up flow that captures participant role (GPU owner, developer/researcher, design partner) with appropriate qualification questions for each path.

**Acceptance Criteria:**

- [ ] Landing page clearly explains Tenvra vision and Phase 1 goals
- [ ] Role selection: GPU Owner, Developer/Researcher, Design Partner, General Interest
- [ ] GPU Owner path: hardware specification form (GPU model, VRAM, OS, availability)
- [ ] Developer path: contribution interest form (code, review, docs, datasets, evaluation)
- [ ] Design Partner path: B2B interest form (company, use case, budget range)
- [ ] All forms include GDPR consent checkbox
- [ ] Progress indicator for multi-step forms
- [ ] Form validation with clear error messages
- [ ] Success confirmation page with next steps

**Estimated Effort:** L

**Dependencies:**

- Issue 1.1 (production website)
- Product requirements document review

---

#### Issue 1.4: feat: implement data minimization and self-service deletion

**Description:**  
Ensure sign-up flow complies with GDPR data minimization principles and provides users self-service data deletion capability.

**Acceptance Criteria:**

- [ ] Only essential fields marked as required
- [ ] Optional fields clearly labeled with purpose explanation
- [ ] Country captured at coarsest level (EU/EEA vs non-EU/EEA)
- [ ] User dashboard with "Delete My Data" functionality
- [ ] Deletion request processed within 30 days
- [ ] Deletion confirmation email sent
- [ ] Audit log of deletion requests retained (without personal data)

**Estimated Effort:** M

**Dependencies:**

- Issue 1.3 (sign-up flow)
- Legal privacy review (docs/legal/privacy-gdpr-checklist.md)

---

#### Issue 1.5: docs: publish roadmap and transparency page

**Description:**  
Create public-facing page showing current Phase 1 progress, roadmap, and key decisions to maintain transparency with the community.

**Acceptance Criteria:**

- [ ] Live counter showing verified sign-ups (anonymized aggregates only)
- [ ] Roadmap visualization with current phase highlighted
- [ ] Recent decisions log with rationale
- [ ] Economic model summary (from docs/economics/economic-model.md)
- [ ] Link to GitHub repository and documentation
- [ ] Contact information for inquiries

**Estimated Effort:** S

**Dependencies:**

- Issue 1.1 (production website)

---

### 2. Operator Qualification Pipeline

#### Issue 2.1: feat: build GPU hardware qualification system

**Description:**  
Implement automated and manual review pipeline to qualify GPU owners against pilot compatibility requirements (15 of 30 must be pilot-compatible).

**Acceptance Criteria:**

- [ ] Hardware specification form captures: GPU model, VRAM, CPU, RAM, storage, OS, network
- [ ] Automated pilot-compatibility check against allowlist (NVIDIA CUDA, AMD ROCm)
- [ ] Manual review queue for edge cases
- [ ] Qualification status: Pending, Approved, Rejected (with reason)
- [ ] Email notification on qualification decision
- [ ] Qualified operators added to pilot recruitment pool
- [ ] Dashboard showing: total GPU owners, pilot-compatible count, by region

**Estimated Effort:** M

**Dependencies:**

- Issue 1.3 (sign-up flow)
- Hardware allowlist definition (from ROADMAP Phase 2 requirements)

---

#### Issue 2.2: feat: implement developer/researcher qualification

**Description:**  
Create qualification criteria and review process for the 20 developer/researcher goal.

**Acceptance Criteria:**

- [ ] Contribution interest form with skill assessment
- [ ] GitHub/GitLab profile link (optional)
- [ ] Availability estimate (hours/week)
- [ ] Area of interest: code, review, documentation, datasets, evaluation
- [ ] Manual review by project operators
- [ ] Qualification status tracking
- [ ] Qualified contributors added to onboarding pipeline

**Estimated Effort:** S

**Dependencies:**

- Issue 1.3 (sign-up flow)

---

#### Issue 2.3: feat: build admin review dashboard

**Description:**  
Create protected admin interface for project operators to review and approve qualification requests.

**Acceptance Criteria:**

- [ ] Authentication required (Supabase Auth with operator role)
- [ ] Queue view: pending reviews by type (GPU, developer, design partner)
- [ ] Detail view with all submitted information
- [ ] Approve/Reject actions with reason field
- [ ] Bulk actions for common decisions
- [ ] Export functionality for reporting
- [ ] Audit log of all operator actions
- [ ] Real-time counts toward Phase 1 goals

**Estimated Effort:** M

**Dependencies:**

- Issue 2.1 (GPU qualification)
- Issue 2.2 (developer qualification)
- Supabase Row Level Security configuration

---

#### Issue 2.4: security: implement protected operator access

**Description:**  
Ensure admin dashboard and qualification pipeline are protected with proper authentication, authorization, and audit logging.

**Acceptance Criteria:**

- [ ] Multi-factor authentication for operators
- [ ] Role-based access control (operator, admin, super-admin)
- [ ] Session timeout after 30 minutes of inactivity
- [ ] All actions logged with timestamp, user, and action type
- [ ] Failed login attempts tracked and rate-limited
- [ ] No personal data exposed in logs
- [ ] Security headers configured (CSP, HSTS, etc.)

**Estimated Effort:** M

**Dependencies:**

- Issue 2.3 (admin dashboard)
- Security policy review (SECURITY.md)

---

### 3. Design Partner Interview Program

#### Issue 3.1: feat: implement design partner interest tracking

**Description:**  
Create system to track design partner interest, schedule interviews, and manage letter of intent collection.

**Acceptance Criteria:**

- [ ] Design partner sign-up form with company details
- [ ] Interview scheduling integration (Calendly or similar)
- [ ] Interview template and question guide
- [ ] Interview notes storage (secure, access-controlled)
- [ ] Letter of Intent template and e-signature flow
- [ ] LOI tracking dashboard (target: 5 LOIs)
- [ ] Follow-up reminder system

**Estimated Effort:** M

**Dependencies:**

- Issue 1.3 (sign-up flow)

---

#### Issue 3.2: docs: create interview guide and LOI template

**Description:**  
Document the interview process, questions, and letter of intent template for consistent execution.

**Acceptance Criteria:**

- [ ] Interview guide with standard questions
- [ ] Questions testing EU/EEA residency impact on buying decisions
- [ ] Questions testing model independence impact
- [ ] LOI template with non-binding terms
- [ ] Consent form for interview recording/notes
- [ ] Interviewer training document

**Estimated Effort:** S

**Dependencies:**

- None (documentation only)

---

#### Issue 3.3: feat: build EU/EEA residency validation survey

**Description:**  
Implement a structured survey and interview evidence workflow to validate whether EU/EEA residency and model independence materially affect purchasing decisions. Survey responses are supplemental; the Phase 1 gate is satisfied only when at least 5 completed design-partner interviews explicitly confirm that European control or EU/EEA data residency affects buying decisions.

**Acceptance Criteria:**

- [ ] Survey embedded in design partner flow
- [ ] Questions about data residency requirements
- [ ] Questions about model control preferences
- [ ] Questions about procurement decision factors
- [ ] Survey responses linked to completed interview records before they are counted toward Phase 1 validation evidence
- [ ] Anonymous aggregation of survey responses for supplemental reporting
- [ ] Report generation separates interview-confirmed evidence from supplemental survey signals

**Estimated Effort:** S

**Dependencies:**

- Issue 3.1 (design partner tracking)

---

### 4. Analytics and Evidence Collection

#### Issue 4.1: feat: implement analytics and attribution tracking

**Description:**  
Set up analytics to track sign-up sources, conversion rates, and user behavior while respecting privacy.

**Acceptance Criteria:**

- [ ] Privacy-first analytics (Plausible or similar EU-based)
- [ ] Source attribution (UTM parameters, referrer)
- [ ] Conversion funnel tracking
- [ ] Dashboard showing daily/weekly sign-up trends
- [ ] Geographic distribution (EU/EEA vs non-EU/EEA)
- [ ] No personal data in analytics
- [ ] GDPR-compliant cookie handling

**Estimated Effort:** M

**Dependencies:**

- Issue 1.1 (production website)

---

#### Issue 4.2: feat: build evidence collection system

**Description:**  
Implement system to store and organize validation evidence as required by the decision rule.

**Acceptance Criteria:**

- [ ] Evidence types: sign-ups, GPU qualifications, developer qualifications, interviews, LOIs
- [ ] Source attribution stored for each entry
- [ ] Consent records linked to each participant
- [ ] Verification timestamps
- [ ] Reviewer identity recorded (for qualifications)
- [ ] Export functionality for audit
- [ ] Personal data separated from evidence records

**Estimated Effort:** M

**Dependencies:**

- Issue 2.3 (admin dashboard)
- Issue 4.1 (analytics)

---

#### Issue 4.3: docs: create Phase 1 validation report template

**Description:**  
Create template for the final Phase 1 validation report that will be used to make the go/no-go decision.

**Acceptance Criteria:**

- [ ] Executive summary section
- [ ] Metrics dashboard (all Phase 1 goals)
- [ ] Evidence appendix structure
- [ ] Interview insights summary
- [ ] Decision recommendation framework
- [ ] Next steps for Phase 2 or pivot

**Estimated Effort:** S

**Dependencies:**

- None (documentation only)

---

### 5. Infrastructure and Compliance

#### Issue 5.1: infra: provision Supabase production project (EU/EEA)

**Description:**  
Set up production Supabase project in EU/EEA region with proper security configuration.

**Acceptance Criteria:**

- [ ] Supabase project created in an EU/EEA region (e.g., Frankfurt)
- [ ] Database schema for waitlist, qualifications, evidence
- [ ] Row Level Security policies configured
- [ ] Email templates configured
- [ ] Backup strategy documented
- [ ] Environment variables secured
- [ ] Connection strings stored in secrets manager

**Estimated Effort:** M

**Dependencies:**

- Supabase account setup
- Legal review of subprocessor (docs/legal/privacy-gdpr-checklist.md)

---

#### Issue 5.2: infra: set up CI/CD pipeline

**Description:**  
Configure continuous integration and deployment pipeline for the validation website.

**Acceptance Criteria:**

- [ ] GitHub Actions workflow for linting and tests
- [ ] Automated deployment on main branch merge
- [ ] Staging environment for testing
- [ ] Rollback capability
- [ ] Deployment notifications
- [ ] Security scanning in pipeline

**Estimated Effort:** M

**Dependencies:**

- GitHub repository access
- Production hosting configured

---

#### Issue 5.3: security: complete Phase 1 security review

**Description:**  
Conduct security review of validation website and qualification pipeline before production launch.

**Acceptance Criteria:**

- [ ] Threat model review for Phase 1 scope
- [ ] OWASP Top 10 vulnerability scan
- [ ] Dependency vulnerability check
- [ ] Secrets management audit
- [ ] Access control review
- [ ] Incident response plan for Phase 1
- [ ] Security review documented

**Estimated Effort:** M

**Dependencies:**

- Issue 1.1 (production website)
- docs/security/threat-model.md

---

## Summary by Effort

| Effort | Count | Issues                                                |
| ------ | ----- | ----------------------------------------------------- |
| S      | 5     | 1.5, 2.2, 3.2, 3.3, 4.3                               |
| M      | 10    | 1.2, 1.4, 2.1, 2.3, 2.4, 3.1, 4.1, 4.2, 5.1, 5.2, 5.3 |
| L      | 2     | 1.1, 1.3                                              |
| XL     | 0     | -                                                     |

**Total Issues:** 17

---

## Critical Path

1. **Issue 5.1** - Supabase production setup (blocks most features)
2. **Issue 1.1** - Website production deployment (blocks all user-facing features)
3. **Issue 1.2** - Email verification (required before registrations count toward the 100 verified-registration goal)
4. **Issue 1.3** - Sign-up flow with role selection (blocks qualification pipeline once verifiable registrations are enabled)
5. **Issue 2.1** - GPU qualification (blocks 30 GPU owner goal)
6. **Issue 3.1** - Design partner tracking (blocks interview/LOI goals)

---

## Phase 1 Decision Rule (from validation-plan.md)

| Metric                                | Target | 60% Threshold |
| ------------------------------------- | ------ | ------------- |
| Verified registrations                | 100    | 60            |
| GPU owners                            | 30     | 18            |
| Pilot-compatible systems              | 15     | 9             |
| Qualified developers/researchers      | 20     | 12            |
| Design partner interviews             | 10     | 6             |
| Letters of intent                     | 5      | 3             |
| EU/EEA residency impact confirmations | 5      | 3             |

**Decision:**

- **At or above all thresholds:** Proceed to financing and pilot recruitment (Phase 2)
- **At least 60% of core thresholds:** Conduct interviews, revise positioning, run one final 30-day cycle
- **Below 60% or failed second cycle:** Pause, narrow, or pivot

---

## Files Referenced

- `/ROADMAP.md` - Phase definitions and goals
- `/docs/product/validation-plan.md` - Detailed validation criteria
- `/docs/product/product-requirements.md` - Phase 1 requirements
- `/docs/architecture/system-architecture.md` - System design
- `/docs/legal/privacy-gdpr-checklist.md` - Compliance requirements
- `/docs/security/threat-model.md` - Security considerations
- `/docs/economics/economic-model.md` - Economic model
