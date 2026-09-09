# Worked Example 3 — Internal Code Assistant

> **Illustrative scenario** constructed to demonstrate how the framework operates end to end. Not a description of a real deployment.

**Proposal:** An IDE-integrated coding assistant for the engineering organization. Suggests completions, explains code, drafts tests. Every suggestion is accepted or rejected by a developer, and all output passes normal code review and CI.

This example demonstrates the **lightweight path** — and then what happens when a T3 system quietly stops being T3.

---

## Intake — Gate 1

| Field | Submission |
|---|---|
| Purpose | Developer productivity; reduce time on boilerplate and test scaffolding |
| Affected populations | ~400 internal engineers. No external population. |
| Autonomy | Suggests. A developer accepts or rejects every suggestion. |
| Data categories | Source code, internal technical documentation. No personal data. |
| Exposure | Internal, authenticated staff only |
| Third party | Vendor API; contract confirms inputs are not retained or used for training |

---

## Scoring — Gate 1

| Dimension | Score | Justification |
|---|---|---|
| D1 Consequence | 1 | Bad suggestions cost developer time. Code review and CI stand between suggestion and production. |
| D2 Autonomy | 1 | Drafting only; a developer reviews before anything takes effect. |
| D3 Data sensitivity | 1 | Internal business data. No personal data. |
| D4 Scale | 1 | Single function — engineering. |
| D5 Reversibility | 0 | Rejected suggestions leave no trace; accepted code is version-controlled and revertible. |
| D6 Exposure | 0 | Internal tooling, authenticated. |

**Highest score: 1 → T3 Minimal.** No override conditions apply.

---

## Controls applied at T3

Deliberately light. Governance capacity is finite, and spending it here means not spending it on the résumé screener.

- Registered in the AI inventory with a named accountable owner
- Acceptable-use terms acknowledged by each developer: no customer data in prompts, no secrets, human review of all output
- Kill switch: license revocable organization-wide
- Annual recertification
- **No** pre-approval gate, design review, evaluation requirement, or Council involvement

Time from intake to approved: **4 days**, entirely self-serve.

### Why the light path matters

A framework that treats every AI use case as high-risk produces one predictable outcome: teams stop submitting intakes. Shadow AI is worse than governed AI, and the fastest route to shadow AI is a governance process with no cheap path.

**T3 exists to be used.** If the inventory does not contain a large number of T3 systems moving quickly, the framework is being routed around rather than followed.

---

## Month seven — the change that mattered

Engineering enabled the vendor's new agent mode. It could now read the full repository, make multi-file edits, run tests, and **open pull requests autonomously against internal repositories**, including the customer-data services.

No one submitted anything. It was a feature toggle on an existing, already-approved tool.

**This is the single most common governance failure in the framework's threat model:** scope expansion by vendor feature release, on a system whose original classification was correct at the time.

### What caught it

The quarterly inventory reconciliation — cross-referencing registered AI systems against vendor entitlement and configuration changes. It flagged that the assistant's entitlement tier had changed. The lag was roughly eleven weeks.

### Rescoring — Gate 8 → Gate 1

| Dimension | Was | Now | Justification |
|---|---|---|---|
| D1 Consequence | 1 | 2 | Autonomous commits to services handling customer data; a merged defect reaches production |
| D2 Autonomy | 1 | **3** | **Opens pull requests without per-instance human authoring** |
| D3 Data sensitivity | 1 | 2 | Repository access includes code touching customer PII schemas |
| D4 Scale | 1 | 2 | All engineering; effects reach the customer-facing estate |
| D5 Reversibility | 0 | 1 | Revertible, but a merged change may have run in production |
| D6 Exposure | 0 | 0 | Still internal |

**New highest score: 3 → T1.**

Per [Classification §7](../docs/classification-framework.md), **upward reclassification suspends operation** until the higher tier's controls are met. Agent mode was disabled within 24 hours. Completion mode — the originally approved T3 behavior — continued uninterrupted, because the suspension attaches to the change, not to the tool.

### The framework amendment

The post-incident review asked the standard question: *did the control exist but not operate, or not exist at all?*

**It did not exist.** Quarterly reconciliation caught this in eleven weeks; a governance model relying on an eleven-week detection window for autonomy expansion is not controlling autonomy expansion. Three amendments followed:

1. **Vendor feature activation is a Gate 8 change event.** Enabling a materially new capability on an approved system requires change classification before activation, not at the next reconciliation.
2. **Autonomy changes are a named reclassification trigger** in their own right, added to [Classification §7](../docs/classification-framework.md).
3. **Entitlement-change monitoring moved from quarterly to continuous** for any vendor AI in the inventory, via automated alerting on configuration and license changes.

---

## Where it landed

Agent mode was resubmitted as a **separate T1 use case** with a bounded envelope: read-only on customer-data services, write access limited to non-production repositories, mandatory human authorship of any PR touching payment or authentication paths, and full action logging.

That case is a different system from the code assistant, and it is governed as one. Splitting it was itself a design decision — bundling a T1 capability into a T3 tool would have forced the entire tool up to T1 and destroyed the light path for 400 engineers.

---

## Takeaway

**Classification is a property of current behavior, not of the intake form.** The original T3 assignment was correct and remained correct for the completion feature. What failed was the assumption that an approved system stays the system that was approved — and vendors change systems without asking. The framework's job was not to prevent the change; it was to notice it. Eleven weeks was too slow, and the framework was amended to say so.
