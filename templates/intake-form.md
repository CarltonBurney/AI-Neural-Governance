# AI Use Case Intake Form

Submit before any development, procurement, or pilot involving AI. **A pilot with real users or real data is a deployment** and requires an intake.

Incomplete submissions are returned rather than queued — a partial intake produces a wrong tier, and a wrong tier propagates through every downstream control.

---

## 1. Identification

| Field | Response |
|---|---|
| Use case name | |
| Accountable Owner — **a named individual, not a team** | |
| Business sponsor | |
| Domain | |
| Date submitted | |
| Build, buy, or embedded vendor feature | |

## 2. Purpose

**State the outcome, not the technology.** "Reduce median first-response time on billing tickets" — not "use an LLM for support."

> *[Purpose]*

**What happens today without this system?**

> *[Current-state baseline]*

**How will success be measured?**

> *[Metrics]*

## 3. Affected populations

List everyone affected, including **people who are subjects of a decision but not users of the system** — applicants, customers, patients, employees under review.

| Population | Approx. size | How affected | Do they know AI is involved? |
|---|---|---|---|
| | | | |

## 4. Autonomy — answer for today *and* the roadmap end state

| | Today | End state |
|---|---|---|
| The system suggests; a human authors the outcome | ☐ | ☐ |
| The system drafts; a human reviews before effect | ☐ | ☐ |
| The system proposes an action; a human approves each one | ☐ | ☐ |
| The system acts without per-instance approval | ☐ | ☐ |

**What actions can the system take without a human?** Be specific — name the actions and any value or scope limits.

> *[Actions and limits]*

## 5. Data

Include data used for **retrieval and context**, not only training data.

| Category | Present | Source | Retention |
|---|---|---|---|
| Public / synthetic | ☐ | | |
| Internal business data | ☐ | | |
| Personal data (PII) | ☐ | | |
| Special category — health, biometric, financial account, children's, protected characteristics | ☐ | | |

**Could protected characteristics be inferred from the inputs even if not collected?**

> *[Assessment — this is a yes/no question with a rationale, not an assurance]*

## 6. Decision domain screen

Does the system determine or **materially influence** any of the following? Influence includes ranking, prioritizing, filtering, or framing what a human decision-maker sees.

| | Yes | No |
|---|---|---|
| Employment, promotion, or termination | ☐ | ☐ |
| Credit, insurance, or housing | ☐ | ☐ |
| Education or essential public services | ☐ | ☐ |
| Medical, clinical, or safety-critical outcomes | ☐ | ☐ |
| Law enforcement, migration, or justice | ☐ | ☐ |

**Any "Yes" forces Tier 1 regardless of dimensional scoring.**

## 7. Exposure

| | |
|---|---|
| Internal, authenticated staff only | ☐ |
| Internal, but output leaves the system | ☐ |
| Customer-facing under known identity | ☐ |
| Public or unauthenticated | ☐ |

**Could a user reasonably believe they are interacting with a human?** ☐ Yes ☐ No
*(Yes forces a T2 minimum plus mandatory disclosure.)*

## 8. Third party

| Field | Response |
|---|---|
| Vendor and model | |
| Are inputs used to train the vendor's models? | |
| Data residency | |
| Contractual audit right? *(No forces a T2 minimum)* | |
| Model-change notification clause and notice period | |
| Substitution path if the vendor is lost | |

## 9. Scoring — completed jointly with the governance analyst

**Every score requires a one-line justification. The justification is the auditable artifact; the number alone is not.**

| Dimension | Requester | Analyst | Applied | Justification |
|---|---|---|---|---|
| D1 Consequence of error | | | | |
| D2 Autonomy | | | | |
| D3 Data sensitivity | | | | |
| D4 Scale and reach | | | | |
| D5 Reversibility | | | | |
| D6 Exposure | | | | |

Where scores differ, **the higher applies** pending Domain Board review. Disagreement is signal, not friction — record both.

## 10. Determination

| Field | Response |
|---|---|
| Highest dimension score | |
| Override applied? | |
| **Tier assigned** | |
| Rationale | |
| Analyst | |
| Date | |
| Domain Board confirmed / referred to Council | |

---

**Attestation.** I confirm this submission accurately describes the system's purpose, autonomy, data, and affected populations as of today, and I accept accountability for this system across its lifecycle, including notifying governance of any material change.

Accountable Owner: ________________  Date: __________
