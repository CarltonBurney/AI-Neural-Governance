# Classification Framework

**Purpose:** Sort every AI use case into a risk tier within one working session, so that the controls, approvals, and oversight it requires are determined by evidence rather than by negotiation.

Classification is the spine of this governance model. Tier assignment is what triggers control requirements ([Governance Model](governance-model.md)), oversight intensity ([Human-in-the-Loop](human-in-the-loop.md)), and regulatory obligations ([Standards Mapping](standards-mapping.md)). Nothing proceeds without a tier.

---

## 1. The four tiers

| Tier | Name | Definition | Default posture |
|---|---|---|---|
| **T0** | Prohibited | Use cases the organization will not build or buy at any control level. | Reject at intake. No approval path exists. |
| **T1** | High | Materially affects a person's rights, safety, livelihood, health, or access to a service — or operates autonomously over irreversible actions. | Full control set. Council approval. Human-in-the-loop mandatory. |
| **T2** | Limited | Affects business outcomes or customer experience, but errors are contained, detectable, and reversible. | Standard control set. Domain approval. Human-on-the-loop. |
| **T3** | Minimal | Internal productivity, no consequential decisions, no sensitive data, fully reversible. | Lightweight registration. No pre-approval gate. |

**The tier is a floor, not a ceiling.** A sponsor may voluntarily adopt stricter controls. A sponsor may never adopt looser ones without a documented, time-bound exception (§6).

---

## 2. The T0 list — decided in advance, not per case

T0 exists so that the hardest calls are made once, in policy, rather than under delivery pressure. A use case matching any line below is rejected at intake:

- Social scoring or general-purpose trustworthiness rating of individuals
- Emotion inference in workplace or educational settings as an input to a decision about a person
- Biometric categorization inferring protected characteristics (race, religion, sexual orientation, political opinion, union membership)
- Untargeted scraping of facial images to build or expand recognition databases
- Systems designed to exploit vulnerabilities of a specific group (age, disability, economic circumstance) to distort behavior
- Subliminal or purposefully deceptive techniques that materially distort a person's decisions to their detriment
- Fully autonomous action on irreversible, high-consequence outcomes with no human recourse path — for example: terminating employment, denying medical care, or executing irreversible financial transactions above the delegated authority limit

Additions to this list require AI Governance Council approval and are versioned in this document. Removals require Council approval plus Legal sign-off.

---

## 3. Scoring: six dimensions

Every non-T0 use case is scored 0–3 on six dimensions. **The tier is set by the highest single score, not the average** — a use case is as risky as its riskiest property.

### D1 — Consequence of error
| Score | Description |
|---|---|
| 0 | Wasted time. No downstream effect. |
| 1 | Recoverable business cost, internal only. |
| 2 | Customer harm: financial loss, service denial, reputational exposure. |
| 3 | Harm to rights, safety, health, or livelihood. |

### D2 — Autonomy
| Score | Description |
|---|---|
| 0 | Advisory. A human authors the outcome; the system suggests. |
| 1 | Drafting. The system produces output a human reviews before it takes effect. |
| 2 | Human-approved action. The system proposes an action; a human approves each one. |
| 3 | Autonomous action. The system acts without per-instance human approval. |

### D3 — Data sensitivity
| Score | Description |
|---|---|
| 0 | Public or synthetic data only. |
| 1 | Internal business data, no personal data. |
| 2 | Personal data (PII), or confidential commercial data. |
| 3 | Special-category data: health, biometric, financial account, children's data, or protected characteristics. |

### D4 — Scale and reach
| Score | Description |
|---|---|
| 0 | Single team, under 50 users. |
| 1 | Single function or business unit. |
| 2 | Enterprise-wide, or a defined external customer segment. |
| 3 | All customers, or all applicants/employees in a decision population. |

### D5 — Reversibility
| Score | Description |
|---|---|
| 0 | Trivially undone; no record persists. |
| 1 | Undone within the same business day with routine effort. |
| 2 | Correctable, but the affected party has already experienced the outcome. |
| 3 | Effectively irreversible, or reversal requires legal or regulatory process. |

### D6 — Exposure
| Score | Description |
|---|---|
| 0 | Internal tooling, authenticated staff only. |
| 1 | Internal, but output leaves the system (reports, decks, email). |
| 2 | Customer-facing under a known identity and terms of service. |
| 3 | Public and unauthenticated, or acting on behalf of the organization externally. |

---

## 4. Tier assignment

```
Highest dimension score  →  Tier
        3                →  T1  (High)
        2                →  T2  (Limited)
        0 or 1           →  T3  (Minimal)
```

### Override rules — these outrank the score

These exist because scoring is judgment and judgment drifts optimistic under delivery pressure.

| Condition | Forced minimum tier |
|---|---|
| Determines or materially influences employment, promotion, or termination | **T1** |
| Determines or materially influences access to credit, insurance, or housing | **T1** |
| Determines or materially influences access to education or essential public services | **T1** |
| Used in a medical, clinical, or safety-critical context | **T1** |
| Processes special-category data about identifiable individuals | **T1** |
| Any user could reasonably believe they are talking to a human | **T2** minimum, plus mandatory disclosure |
| Generates synthetic media depicting real people | **T2** minimum, plus provenance marking |
| Third-party model or vendor with no contractual audit right | **T2** minimum |
| Materially affects a person's rights and is not otherwise T1 | **T1** |

### Worked scoring example

*Internal résumé screening assistant that ranks applicants for recruiter review.*

| Dimension | Score | Reasoning |
|---|---|---|
| D1 Consequence | 3 | Affects access to employment. |
| D2 Autonomy | 1 | Produces a ranking; a recruiter decides. |
| D3 Data sensitivity | 2 | Applicant PII throughout. |
| D4 Scale | 3 | Every applicant in the funnel. |
| D5 Reversibility | 2 | A rejected applicant already experienced the outcome. |
| D6 Exposure | 0 | Internal recruiter tooling. |

Highest score = 3 → **T1**. The employment override independently forces T1. Note that low autonomy did not lower the tier: the recruiter reviews the ranking, but the ranking shapes what the recruiter sees. That is influence, and influence over employment is T1.

Full treatment in [`examples/02-resume-screener.md`](../examples/02-resume-screener.md).

---

## 5. Control matrix

Requirements are cumulative — T1 inherits everything required at T2 and T3.

| Control | T3 Minimal | T2 Limited | T1 High |
|---|---|---|---|
| Registered in the AI inventory | Required | Required | Required |
| Named accountable owner | Required | Required | Required |
| Acceptable-use terms acknowledged | Required | Required | Required |
| Data protection review | — | Required | Required |
| Security review / threat model | — | Required | Required |
| Documented evaluation before launch | — | Required | Required |
| Model or system card | — | Required | Required |
| Disclosure that output is AI-generated | Conditional | Required | Required |
| Human oversight design documented | — | Required | Required |
| Fairness / disparate impact testing | — | Conditional | Required |
| Adversarial or red-team testing | — | Conditional | Required |
| Full decision logging with retention | — | Sampled | Complete |
| Contestation and appeal path | — | — | Required |
| Independent pre-deployment validation | — | — | Required |
| Continuous performance monitoring | — | Periodic | Continuous |
| Documented rollback plan, tested | — | Required | Required |
| Scheduled recertification | Annual | Annual | Semi-annual |
| Approval authority | Owner self-serve | Domain Approval Board | AI Governance Council |

"Conditional" means required when the use case touches personal data, customer-facing output, or a protected decision domain.

---

## 6. Exceptions

An exception is a time-bound, documented decision to operate below the required control set. It is not a waiver of the tier.

**Requirements:** named requesting owner; specific control being deferred; compensating control in place meanwhile; expiry date not exceeding 90 days; approval by the authority one level above the tier's normal approver; entry in the risk register.

Exceptions cannot be granted against: the T0 list, the contestation path for T1, or decision logging for T1. Expired exceptions trigger automatic suspension of the use case, not automatic renewal.

---

## 7. Reclassification triggers

Tier is a property of current behavior, not of the original intake form. Reclassification is mandatory on any of:

- Autonomy increases — the system begins acting rather than advising
- The user population expands beyond the approved scope
- A new data category is introduced
- The model or vendor is replaced or materially upgraded
- The output begins feeding a consequential decision it did not previously touch
- An incident reveals a consequence class not identified at intake
- Regulatory scope changes

Reclassification runs the full intake path again. Upward reclassification suspends operation until the higher tier's controls are met, unless the Council grants a time-bound exception under §6.

---

*Illustrative framework prepared as a portfolio artifact. Tier definitions are designed to align with the EU AI Act risk categories, NIST AI RMF, and ISO/IEC 42001 — see [Standards Mapping](standards-mapping.md).*
