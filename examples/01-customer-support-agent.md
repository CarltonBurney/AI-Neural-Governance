# Worked Example 1 — Customer Support Agent

> **Illustrative scenario** constructed to demonstrate how the framework operates end to end. Not a description of a real deployment.

**Proposal:** A conversational agent handling inbound customer support for a subscription service. Answers billing and account questions, and can perform account actions — apply a credit, change a plan, cancel a subscription — without a support agent involved.

---

## Intake — Gate 1

| Field | Submission |
|---|---|
| Purpose | Reduce median first-response time from 6 hours to under 2 minutes; deflect 40% of tier-1 contacts |
| Affected populations | All customers contacting support — approx. 180,000/year |
| Autonomy (today) | Answers questions; executes credits up to $50, plan changes, and cancellations |
| Data categories | Customer name, email, billing history, payment method last-4, support history |
| Exposure | Customer-facing, authenticated, under company brand |
| Third party | Foundation model via vendor API; contract includes audit right |

---

## Scoring — Gate 1

| Dimension | Score | Justification |
|---|---|---|
| D1 Consequence | 2 | A wrong cancellation or billing action causes customer financial loss and service denial. Not rights-affecting. |
| D2 Autonomy | 3 | **Executes account actions with no per-instance human approval.** |
| D3 Data sensitivity | 2 | PII and billing data. No special-category data. |
| D4 Scale | 2 | Defined external customer segment; all contacting customers. |
| D5 Reversibility | 2 | A wrongful cancellation is correctable, but the customer has already lost service. |
| D6 Exposure | 2 | Customer-facing under known identity and ToS. |

**Highest score: 3 (autonomy) → T1.**

Overrides checked: no employment, credit, essential-services, medical, or special-category trigger. The "user could believe they are talking to a human" condition applies, forcing a **T2 minimum plus mandatory disclosure** — already exceeded by the dimensional score.

### The decision that mattered

The proposing team argued for T2 on the grounds that support agents already perform these actions routinely, so the AI is not doing anything new or consequential.

**The Board rejected that reasoning.** The tier reflects what the *system* does without a human, not what a trained employee does with accountability and judgment. Autonomous execution of irreversible-to-the-customer actions at 180,000/year scale is a different risk profile from the same action taken by an accountable person, even when the action is identical.

Recorded as a scoring disagreement per [request-classification §3](../architecture/workflows/request-classification.md): requester scored D2 as 2, analyst as 3, higher applied.

---

## The redesign that followed

T1 requires human-in-the-loop — per-decision review before effect — which would have destroyed the entire business case. Rather than granting an exception, the team **redesigned the autonomy boundary**:

| Action | Before | After |
|---|---|---|
| Answer billing/account questions | Autonomous | Autonomous |
| Apply credit ≤ $50 | Autonomous | Autonomous, logged, sampled at 10% |
| Change plan | Autonomous | Autonomous, reversible in-session for 24h |
| **Cancel subscription** | **Autonomous** | **Proposes; human approves** |
| Anything outside the envelope | Attempted | Hard handoff to a human |

Post-redesign D2 = 2. **Resulting tier: T2.**

This is the framework working as intended. The tier did not lower because someone argued it down; it lowered because the *system changed*. Classification created pressure to reduce actual risk, rather than pressure to reclassify paperwork.

---

## Controls applied at T2

- Data protection review and security threat model — Gate 3
- Evaluation against pre-registered thresholds: task accuracy, hallucinated-policy rate, escalation appropriateness
- **Mandatory AI disclosure** at conversation start and on request
- Human-on-the-loop: 10% sampled review, plus 100% review of any interaction containing a complaint keyword or a reversal request
- Full logging of all account actions; sampled logging of conversations
- Tested rollback: feature flag returns all traffic to the human queue in under 60 seconds
- Annual recertification

---

## What monitoring caught in month four

Two signals moved together: the reversal rate on plan changes rose from 0.4% to 2.1%, and escalation volume dropped 30%.

Falling escalations initially read as *improvement*. It was the opposite. A vendor model update had made the agent more confident and more fluent, so it escalated less — including on cases it should have handed off. It was resolving ambiguous requests by guessing, and the guesses read as authoritative to customers.

**Classified SEV2.** Contained within 24 hours by lowering the escalation threshold; the vendor update was rolled back pending re-evaluation.

Three framework consequences:

1. **A vendor model change is a material change** — it routes to Gate 8 change control and re-evaluation, not to a release note. The contract's model-change notification clause ([Governance Model §8](../docs/governance-model.md)) existed but the notification had not been wired into change control.
2. **A falling escalation rate is not inherently good.** Monitoring was amended to treat escalation-rate movement in *either* direction beyond a band as an investigation trigger.
3. The post-incident review's answer to *"did the control exist but not operate, or not exist at all"* was **not exist** — so the framework was amended.

---

## Takeaway

The valuable output of classification here was not the tier. It was the redesign the tier forced. A framework that only sorts systems into buckets adds overhead; one that changes what gets built reduces risk.
