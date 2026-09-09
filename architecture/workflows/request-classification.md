# Workflow — Request Classification

**Trigger:** Anyone proposes using AI for a business purpose.
**Owner:** Accountable Owner, with the Domain Board as reviewer.
**Target duration:** 5 business days from submission to tier assignment.
**Output:** A tier, a rationale, and an inventory record.

Companion diagram: [Intake and Classification](../diagrams/01-intake-and-classification.md)

---

## Steps

### 1. Submit intake — Requester, Day 0
Complete the [intake form](../../templates/intake-form.md). Incomplete submissions are returned rather than queued; a partial intake form produces a wrong tier, and a wrong tier propagates through every downstream control.

The four fields that most often get an intake returned:
- **Purpose stated as an outcome, not a technology.** "Reduce first-response time on support tickets" — not "use an LLM for support."
- **Affected populations named explicitly**, including people who are subjects of the decision but not users of the system.
- **Autonomy stated honestly** — what the system does without a human, today and at the roadmap's end state.
- **All data categories**, including data used for retrieval or context, not only training data.

### 2. Screen against T0 — Governance analyst, Day 1
Check the case against the [prohibited list](../../docs/classification-framework.md). A match ends the process: the requester is notified with a written rationale, and the record is retained for audit.

This screen happens first and separately, before scoring. T0 is a policy decision made in advance precisely so it is never re-litigated case by case under delivery pressure.

### 3. Score the six dimensions — Requester and analyst jointly, Days 1–2
Score consequence, autonomy, data sensitivity, scale, reversibility, and exposure. Each score is written with a one-line justification. **The justification is the artifact that matters** — the number alone cannot be audited or challenged later.

Where requester and analyst disagree, both scores are recorded and the higher one applies pending Board review. Disagreement is signal, not friction.

### 4. Apply override conditions — Analyst, Day 2
Check the override table. Overrides can only raise a tier, never lower one. A case may reach T1 through the override table with every dimension scoring 2 or below — this is the intended behavior, not an anomaly.

### 5. Assign and record — Analyst, Day 3
Record tier, all six scores with justifications, any override applied, and the resulting control set. Enter into the AI inventory.

### 6. Confirm or dispute — Domain Board, Days 3–5
The Board confirms the tier or refers it to the Council. The requester may dispute a tier; disputes go to the Council, whose decision is final. **While a dispute is open, the higher tier applies.**

### 7. Route to the control path — Day 5
- **T1** → Gate 2 design review, Council approval path
- **T2** → Gate 2 design review, Domain Board approval path
- **T3** → registered, proceeds; annual recertification set

---

## Reclassification

The same workflow runs again on any trigger in [Classification §7](../../docs/classification-framework.md). Two rules distinguish it from initial classification:

1. **Upward reclassification suspends operation** until the higher tier's controls are met, unless the Council grants a time-bound exception.
2. **Downward reclassification requires positive evidence** that the risk-driving property is genuinely gone — not merely that no incident has occurred. Absence of incidents is not evidence of reduced risk.

## Failure modes this workflow is built against

| Failure | Countermeasure |
|---|---|
| "It's just a pilot" — governance deferred until launch | Tier is assigned at intake; pilots with real users and real data carry the tier's controls |
| Autonomy understated at intake, expanded quietly later | Roadmap end-state autonomy captured at intake; Gate 8 change control catches expansion |
| Scoring negotiated down under delivery pressure | Justifications recorded per dimension; override table cannot be scored around; disagreements recorded |
| Embedded vendor AI never enters intake | Procurement and SaaS change processes route AI feature activation to intake |
| Tier assigned once and never revisited | Recertification with automatic suspension on lapse |
