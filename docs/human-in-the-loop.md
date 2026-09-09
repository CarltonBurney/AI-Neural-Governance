# Human-in-the-Loop Controls

**Purpose:** Specify what human oversight actually means for each tier — who reviews, what they can change, how fast they must act, and how the organization detects when oversight has become a rubber stamp.

Most AI governance failures are not failures to *require* human review. They are failures of human review that was required, staffed, and performed — and was nonetheless meaningless. This document is written against that failure mode.

---

## 1. Three oversight patterns

| Pattern | Human role | Latency | Appropriate for |
|---|---|---|---|
| **Human-in-the-loop** (HITL) | Approves or rejects each individual output before it takes effect. The system cannot act alone. | Per decision | T1 consequential decisions |
| **Human-on-the-loop** (HOTL) | Monitors operation, samples output, can interrupt or halt. The system acts; the human supervises. | Continuous supervision | T2, and T1 high-volume with strong compensating controls |
| **Human-in-command** (HIC) | Sets the operating envelope, reviews aggregate performance, holds authority to change or stop. Does not see individual outputs. | Periodic | T3, and the governing layer above every tier |

These are not a maturity ladder. HITL is not "better" than HOTL — it is more expensive and does not scale, and applying it where it does not fit produces reviewer fatigue, which produces worse outcomes than well-designed HOTL.

---

## 2. Required oversight by tier

| | T3 Minimal | T2 Limited | T1 High |
|---|---|---|---|
| Minimum pattern | Human-in-command | Human-on-the-loop | Human-in-the-loop |
| Individual output review | Not required | Sampled `[CALIBRATE]` | 100% before effect |
| Reviewer named and trained | — | Required | Required, with documented competency |
| Reviewer can override without escalation | n/a | Yes | Yes |
| Override logged with reason code | — | Required | Required |
| Adverse outcome requires second reviewer | — | — | Required |
| Contestation path for affected person | — | — | Required |
| Kill switch, tested | Required | Required | Required, tested quarterly |

**T1 exception — high-volume decisions.** Where per-decision human review is genuinely infeasible at volume, HOTL may substitute for HITL only with all of: confidence-based routing (§4), 100% review of adverse outcomes, a substantial sample of the remainder `[CALIBRATE]`, a contestation path with a guaranteed human decision-maker, and Council approval recorded as a time-bound exception. This is the most-abused provision in any HITL policy, so it is deliberately expensive to invoke.

---

## 3. What makes oversight real

A reviewer is meaningful oversight only when **all five** conditions hold. Failing any one means the control exists on paper only.

1. **Authority.** The reviewer can reject the system's output without seeking permission, and without it counting against their performance metrics. *(Corresponds to Art. 14(4)(d); Art. 26(2) requires deployers to assign oversight to persons with the necessary authority.)*
2. **Capability.** The reviewer understands the domain well enough to detect a wrong answer — not merely a malformed one. A reviewer who cannot independently evaluate the decision is a transcription step, not an oversight step.
3. **Information.** The reviewer sees the inputs, the system's output, its confidence or uncertainty, and the top factors driving it. Reviewing a bare recommendation is not review.
4. **Time.** The reviewer has enough time per decision to actually apply judgment. If throughput targets make genuine review arithmetically impossible, the control has been designed to fail. **This condition has no counterpart in Art. 14 — it is the author's addition.**
5. **Consequence.** Overrides visibly affect the system — they feed evaluation, retraining, and recertification. Oversight that changes nothing trains reviewers to stop bothering.

**Automation bias is the default failure**, and it is named in the regulation itself at Art. 14(4)(b). Experimental work found operators using highly reliable but imperfect aids performed worse than operators with none, and that accountability for decision accuracy reduced the effect. **Those studies were run in monitoring-task contexts; their rates do not transfer to other domains and are not used here as thresholds** — see [Source-to-Claim Map §5](source-to-claim-map.md). Note also that the regulation requires overseers *remain aware* of automation bias; **it does not require measuring whether oversight is working.** The measurement regime in §5 is this framework's inference about how to discharge that duty, not a legal requirement.

---

## 4. Confidence-based routing

Not every decision deserves the same oversight. Routing concentrates human attention where it changes outcomes.

```
                    ┌─────────────────────┐
   System output ──►│ Confidence + policy │
                    └──────────┬──────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
  High confidence       Low confidence         Policy trigger
  Non-adverse           OR near threshold      Adverse outcome,
         │                     │               protected group,
         │                     │               novel pattern
         ▼                     ▼                     ▼
  Sampled review        Full human review    Mandatory dual review
  (audit trail)         before effect        + documented rationale
```

**Design rules.** Routing thresholds are set at design review (Gate 2) and changed only through change control — never tuned by the delivery team to hit throughput targets. Every adverse outcome routes to a human regardless of confidence. Confidence must be calibrated and monitored; an uncalibrated confidence score used for routing is a governance defect, because it silently reallocates oversight away from cases that need it.

---

## 5. Detecting rubber-stamp oversight

These metrics exist to answer one question: *is the human review we require actually happening?*

| Signal | What it indicates | Threshold |
|---|---|---|
| **Override rate** | Rate at which reviewers reject system output | `[CALIBRATE]` Floor unset — see [GAPS](../GAPS.md) C1 |
| **Time-per-decision** | Median review duration | Below the floor set at Gate 2 triggers investigation |
| **Override rate by reviewer** | Variance across the reviewer pool | Comparative, not absolute: any reviewer materially below their peer pool |
| **Reversal rate on appeal** | Contested decisions later overturned | Rising trend indicates review is not catching errors |
| **Post-hoc audit disagreement** | Independent re-review of approved decisions. **The only signal that independently establishes whether review is real** | `[CALIBRATE]` Ceiling unset — see [GAPS](../GAPS.md) C2 |
| **Time-of-day / queue-depth effect** | Override rate falling as backlog grows | Evidence of throughput pressure defeating review |

**A very low override rate is never presented as evidence the system is working well.** It is ambiguous between an excellent system and absent oversight, and only independent post-hoc audit distinguishes them. That audit is a required T1 control, run quarterly on a random sample by someone outside the reviewing team.

**Reviewer protections.** Override rate is never used as an individual performance metric — doing so directly manufactures the failure mode being measured. Reviewers have a no-fault path to flag "I cannot properly review this volume."

---

## 6. Escalation

| Level | Trigger | Responder | SLA |
|---|---|---|---|
| L1 | Reviewer uncertain, or edge case outside guidance | Senior reviewer / domain expert | 4 business hours |
| L2 | Suspected systematic error, novel failure pattern, or affected person contests | Accountable Owner | 1 business day |
| L3 | Potential harm to rights or safety; suspected discriminatory pattern | Second-line (Legal / Risk / Security) | 4 hours, any time |
| L4 | Confirmed harm, regulated data exposure, or need to suspend | AI Governance Council | Convene within 48 hours |

Escalation authority is unconditional: any reviewer may escalate to any level without intermediate approval. **An escalation path that requires permission to use is not an escalation path.** Every escalation is logged; recurring L1 escalations on the same pattern are a design defect and route to change control, not to more staffing.

---

## 7. Contestation and appeal — T1 only

Any person materially affected by a T1 decision has the right to:

1. **Notice** that AI was used in the decision, in plain language, at the time of the decision
2. **Explanation** of the principal factors that drove the outcome
3. **Contest** the decision through a stated channel, without cost
4. **Human re-decision** by a person with authority to reverse, who was not involved in the original decision and who is not required to defer to the system's output
5. **Response** within a published timeframe

The re-decision is a decision, not an explanation of the original one. A process where the human reviewer's role is to justify the system's output is not a contestation path — it is a complaints desk.

Contestation volume and reversal rate feed directly into recertification ([Governance Model §6](governance-model.md)). A T1 system with a rising reversal rate is failing regardless of its offline evaluation metrics.

---

## 8. Reviewer competency and continuity

**Before reviewing (T1):** documented training on the system's purpose, known failure modes, and the specific ways it fails *plausibly*; calibration exercise against a labeled set including seeded errors; explicit briefing that overriding is expected and protected.

**Ongoing:** periodic recalibration against seeded cases injected into the live queue; participation in post-incident reviews; refresher on any material system change.

**Continuity:** a T1 system may not operate without a named, trained, available reviewer pool of sufficient size. Loss of reviewer capacity — attrition, leave, volume spike — is an operational risk on the register, and falling below minimum pool size suspends the system rather than degrading review quality silently.

---

*Illustrative framework prepared as a portfolio artifact. Oversight requirements are designed to align with EU AI Act Article 14 human oversight obligations and NIST AI RMF MANAGE — see [Standards Mapping](standards-mapping.md).*
