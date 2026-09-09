# Worked Example 2 — Résumé Screening Assistant

> **Illustrative scenario** constructed to demonstrate how the framework operates end to end. Not a description of a real deployment.

**Proposal:** A system that reads inbound applications and produces a ranked shortlist with match rationales, so recruiters review the strongest candidates first. A recruiter makes every advance/reject decision.

This is the canonical hard case: **low autonomy, high consequence.** It is where most governance frameworks under-classify.

---

## Intake — Gate 1

| Field | Submission |
|---|---|
| Purpose | Reduce time-to-shortlist from 9 days to 2; improve consistency across recruiters |
| Affected populations | All external applicants — approx. 45,000/year across 1,200 openings |
| Autonomy | Produces a ranking and rationale. **No auto-rejection.** A recruiter decides every outcome. |
| Data categories | Name, contact details, work history, education, self-reported skills, uploaded documents |
| Exposure | Internal recruiter tooling only |
| Third party | Fine-tuned vendor model on historical hiring data |

---

## Scoring — Gate 1

| Dimension | Score | Justification |
|---|---|---|
| D1 Consequence | 3 | Affects access to employment — livelihood. |
| D2 Autonomy | 1 | Produces a ranking a human reviews before any effect. |
| D3 Data sensitivity | 2 | Applicant PII. Protected characteristics inferable from the corpus even though not collected. |
| D4 Scale | 3 | Every applicant in the funnel. |
| D5 Reversibility | 2 | A rejected applicant has already experienced the outcome; they are not told and cannot appeal what they cannot see. |
| D6 Exposure | 0 | Internal tooling only. |

**Highest score: 3 → T1.** The **employment override** independently forces T1.

### Why low autonomy does not lower the tier

The proposal's central argument was that a human decides, so the system is merely advisory.

The framework rejects this on the record:

> A ranking determines what a recruiter sees first, how long they spend on each candidate, and what frame they bring to the review. Under time pressure, a ranked list functions as a decision. Ordering is influence, and influence over employment is T1.

The second-line objection that carried the day came from Legal: the system is trained on historical hiring decisions, which encode the outcomes of past human judgment including any bias in it. **A model trained to predict "who did we hire before" will reproduce who was hired before.** Low autonomy does not attenuate this — it launders it, because the recruiter sees a ranking with no visible indication of what produced it.

Two override conditions apply independently: employment, and a third-party model in a protected decision domain.

---

## Controls applied at T1

Cumulative — includes everything at T2 and T3.

| Control | Implementation |
|---|---|
| Independent pre-deployment validation | Validated by a team outside the building team, against a held-out set |
| Fairness testing | Selection-rate ratios across protected groups at each funnel stage, measured pre-launch and continuously |
| Adversarial testing | Probing for proxy discrimination — university, postcode, employment gaps, name-derived signals, non-native phrasing |
| Human-in-the-loop | 100% recruiter review; **the ranking is advisory and reviewers are explicitly instructed and measured on independent judgment** |
| Dual review on adverse outcomes | Any candidate ranked in the bottom decile who is rejected without a recruiter opening the full application requires a second reviewer |
| Complete decision logging | Every input, ranking, rationale, and recruiter action retained |
| Contestation path | Applicants informed AI was used; may request human re-review by a recruiter not involved originally |
| Council approval | Approved with a named signatory and a 6-month recertification |
| Rollback | Ranking suppressible to alphabetical order via feature flag |

### The control that shaped the design

**Proxy discrimination testing** changed the feature set before launch. Testing found that "employment gap over 6 months" carried substantial ranking weight and correlated strongly with parental leave — creating a disparate impact on women with no protected attribute anywhere in the input. The feature was removed and the model retrained.

Note the sequencing: this was caught at **Gate 4, before deployment**, because fairness testing is a T1 gate condition rather than a post-launch monitoring metric. Had it launched first, the harm would have been distributed across thousands of applicants before the first quarterly review.

---

## Oversight effectiveness — month three

Monitoring surfaced the failure mode [Human-in-the-Loop §5](../docs/human-in-the-loop.md) exists to detect:

| Signal | Reading |
|---|---|
| Recruiter override rate | **0.3%** — recruiters almost never advanced a low-ranked candidate |
| Median time per application | 14 seconds for bottom-half rankings; 2m 40s for top-decile |
| Override rate by recruiter | 4 of 19 recruiters at exactly 0% |
| Post-hoc audit disagreement | **17%** — independent re-review disagreed with 17% of rejections |

**The oversight control was failing.** Recruiters were reviewing the ranking, not the candidates. The framework's threshold — sustained override rate below 1% on a T1 system triggers investigation — fired correctly, and the 17% audit disagreement exceeded the 10% ceiling that invalidates the control outright.

**Actions taken:**
- Ranking order **hidden by default**; recruiters see applications in randomized order with the score available on request
- Minimum review time enforced before an outcome can be recorded
- Recruiters re-trained with seeded strong-candidate-ranked-low cases injected into the live queue
- Override rate explicitly removed from recruiter performance metrics — measuring it as performance manufactures the exact failure it detects
- Council notified; system continued under enhanced monitoring rather than suspension, as no confirmed individual harm was established

Post-change: override rate 6.2%, audit disagreement 4%.

---

## Standards alignment

| Obligation | Where met |
|---|---|
| EU AI Act Annex III(4) — employment high-risk | T1 classification via override |
| Art. 10(2)(f) bias examination | Fairness and proxy discrimination testing at Gate 4 |
| Art. 14 human oversight, incl. automation bias | HITL design plus §5 effectiveness monitoring |
| Art. 12 record-keeping | Complete decision logging |
| Art. 86 right to explanation | Contestation path with human re-decision |
| ISO/IEC 42001 A.5 | Impact assessment at intake |
| NIST AI RMF MEASURE 2 / MANAGE 4 | Fairness measurement and oversight monitoring |

---

## Takeaway

**A human in the loop is not a control until you can prove the human is deciding.** This system had 100% human review from day one and was still producing unreviewed rejections at scale. What made the oversight real was not requiring it — it was measuring whether it was happening, and redesigning the interface when the measurement said it wasn't.
