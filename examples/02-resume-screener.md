# Worked Example 2 — Résumé Screening Assistant

> **Constructed teaching scenario**, not a case study. No operational metrics are given because none exist — see [GAPS.md](../GAPS.md) A1–A7. The failure modes below are anchored to a **real, publicly documented case**: Amazon's experimental recruiting tool, described in §"Real-world anchor".

**Proposal:** A system that reads inbound applications and produces a ranked shortlist with match rationales, so recruiters review the strongest candidates first. A recruiter makes every advance/reject decision.

This is the canonical hard case: **low autonomy, high consequence.** It is where most governance frameworks under-classify.

---

## Real-world anchor

This scenario is not hypothetical in its essentials. Amazon began developing an automated candidate-ranking tool in 2014, scoring applicants one to five stars. It was trained on ten years of résumés the company had received — predominantly from men, reflecting the industry. By 2015 the system showed gender bias, reportedly penalising résumés containing the word *"women's"* and the names of certain all-women colleges. Amazon scrapped the project, concluding it could not reliably make the algorithm gender-neutral. Reported by Reuters in October 2018.

Two things in that account drive the design below:

1. **The proxy was linguistic, not demographic.** No protected attribute was an input. The model found gender through vocabulary. Any framework that tests only for "is a protected attribute in the feature set" would have passed this system.
2. **The bias was discovered, and the system was still abandoned.** Detection is not the same as remediation. A control set that only detects is incomplete.

Full citation in [Sources](../docs/sources.md).

---

## Intake — Gate 1

| Field | Submission |
|---|---|
| Purpose | Reduce time-to-shortlist; improve consistency across recruiters |
| Affected populations | All external applicants `[CALIBRATE — volume determines D4 and reviewer capacity]` |
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

The override is not an authorial preference. EU AI Act **Annex III(4)** expressly designates as high-risk those systems used "for the recruitment or selection of natural persons, in particular… **to analyse and filter job applications**, and to evaluate candidates."

### Why low autonomy does not lower the tier

The proposal's central argument was that a human decides, so the system is merely advisory.

The framework rejects this on the record:

> A ranking determines what a recruiter sees first, how long they spend on each candidate, and what frame they bring to the review. Under time pressure, a ranked list functions as a decision. Ordering is influence, and influence over employment is T1.

The second-line objection that carried the day came from Legal: the system is trained on historical hiring decisions, which encode the outcomes of past human judgment including any bias in it. **A model trained to predict "who did we hire before" will reproduce who was hired before.** Low autonomy does not attenuate this — it launders it, because the recruiter sees a ranking with no visible indication of what produced it.

This is precisely the Amazon failure mode, and it is why D2 is not permitted to pull the tier down.

---

## Controls applied at T1

Cumulative — includes everything at T2 and T3.

| Control | Implementation |
|---|---|
| Independent pre-deployment validation | Validated by a team outside the building team, against a held-out set |
| Fairness testing | Selection-rate ratios across protected groups at each funnel stage, measured pre-launch and continuously. Discharges **Art. 10(2)(f)** |
| Adversarial testing | **Proxy** discrimination probing — vocabulary, institution names, employment gaps, postcode, non-native phrasing. Testing for protected attributes in the feature set is insufficient; the Amazon proxies were words |
| Human-in-the-loop | 100% recruiter review. Art. 14(4) requires overseers be enabled to interpret output and to disregard or override it, "as appropriate and proportionate"; **the framework's five-condition test is the author's, not the regulation's** — see [Source-to-Claim Map](../docs/source-to-claim-map.md) |
| Dual review on adverse outcomes | Second reviewer before rejection of a low-ranked candidate whose full application was not opened. **Proposed policy** — Art. 14(5) requires dual verification only for biometric identification |
| Complete decision logging | Every input, ranking, rationale, and recruiter action retained. **Art. 12** |
| Contestation path | Applicants informed AI was used; may request human re-review by a recruiter not involved originally. **Art. 86** |
| Council approval | Named signatory; recertification interval `[CALIBRATE]` |
| Rollback | Ranking suppressible to alphabetical order via feature flag |

### The control that shapes the design

**Proxy discrimination testing is the load-bearing control**, because it is the one that would have caught the Amazon case. A feature carrying substantial ranking weight that correlates with a protected characteristic — while being neither a protected attribute nor obviously related to one — is the specific thing being hunted.

The sequencing matters: this is a **Gate 4 condition, before deployment**, not a post-launch monitoring metric. Bias found after launch has already been distributed across every applicant processed in the interim.

---

## Oversight effectiveness

This is where the framework expects the control to fail. Empirical work on automation bias found that operators using highly reliable but imperfect automated aids performed **worse** than operators with no automation, and that making participants accountable for decision accuracy measurably reduced the effect.

**That research was conducted in monitoring-task contexts. Its reported rates do not transfer to recruitment and are not used here as thresholds.** What transfers is the *method* — independent re-review — and the finding that accountability matters. Signals monitored on that basis:

| Signal | Why it is monitored |
|---|---|
| Override rate | A very low rate is **ambiguous** between an excellent system and absent oversight, and cannot distinguish them alone |
| Time per decision | A review too fast to constitute review is the clearest evidence of rubber-stamping |
| Override rate variance across reviewers | Isolates individuals who have stopped reviewing from a pool that has not |
| **Post-hoc audit disagreement** | The only signal that independently establishes whether review is real. Method follows Goddard's commission-error approach — how often an initially correct human judgment is displaced by erroneous system output. **The method is sourced; no threshold is** |
| Reversal rate on contested decisions | Rising trend indicates review is not catching errors |

`[CALIBRATE]` — **every threshold on these signals is unset.** See [GAPS.md](../GAPS.md) C1–C2. What counts as an alarming override rate depends on the baseline rate of genuine disagreement in this decision domain, which must be measured, not assumed.

### Interventions available when monitoring indicates failure

Ordered by how directly they attack the mechanism rather than the symptom:

1. **Hide the ranking order by default** — present applications in randomized order with the score available on request. Removes the anchor rather than asking reviewers to resist it.
2. **Enforce a minimum review time** before an outcome can be recorded.
3. **Inject seeded cases** — known strong candidates ranked low — into the live queue, and measure catch rate.
4. **Make reviewers accountable for decision accuracy** — the one intervention here with direct empirical support, though demonstrated in a different task domain.
5. **Never** use override rate as an individual performance metric. Doing so manufactures the exact failure being measured.

---

## Standards alignment

| Obligation | Where met |
|---|---|
| EU AI Act Annex III(4) — employment high-risk | T1 classification via override |
| Art. 10(2)(f) — bias examination | Fairness and proxy discrimination testing at Gate 4 |
| Art. 14(4)(b) — automation bias awareness | Oversight effectiveness monitoring, not training alone |
| Art. 14(4)(d) — ability to disregard or override | Reviewer authority, protected from performance metrics |
| Art. 12 — record-keeping | Complete decision logging |
| Art. 86 — right to explanation | Contestation path with human re-decision |
| ISO/IEC 42001 A.5 | Impact assessment at intake |
| NIST AI RMF MEASURE / MANAGE | Fairness measurement and oversight monitoring |

---

## Takeaway

**A human in the loop is not a control until you can prove the human is deciding.** 100% human review is compatible with unreviewed rejections at scale. Art. 14(4)(b) requires overseers to *remain aware* of automation bias; **it does not require measuring whether oversight is working.** Treating measurement as the way to discharge that duty is this framework's position, not the regulation's.

What makes oversight real is not requiring it. It is measuring whether it is happening, and redesigning the interface when the measurement says it is not.
