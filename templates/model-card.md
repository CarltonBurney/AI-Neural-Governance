# Model / System Card

Required at T1 and T2. Produced at Gate 4 and updated on every material change. **Prior versions are retained, not overwritten** — the version history is part of the audit record.

---

## Identification

| Field | |
|---|---|
| System name | |
| Version | |
| Tier | |
| Accountable Owner | |
| Approval date and signatory | |
| Next recertification due | |

## Intended use

**In scope:** what this system is approved to do, for whom.

**Out of scope:** uses explicitly not approved. State these positively — "not approved for use on contractor applications" — rather than leaving them unmentioned.

**Out-of-scope use is a change event**, not a judgment call by the user.

## Model and data

| Field | |
|---|---|
| Base model / vendor / version | |
| Fine-tuned? On what data? | |
| Retrieval or context sources | |
| Training data provenance and lawful basis | |
| Known gaps or under-representation in the data | |

## Evaluation

**Metrics and thresholds were pre-registered at Gate 2 on [date], before results existed.**

| Metric | Threshold | Result | Pass |
|---|---|---|---|
| | | | |

### Fairness

| Population | Metric | Result | Threshold |
|---|---|---|---|
| | | | |

### Adversarial / red-team

| Finding | Severity | Disposition |
|---|---|---|

## Known limitations and failure modes

List the ways this system fails **plausibly** — producing confident, well-formed, wrong output. These are what reviewers must be trained to catch; obvious failures are not the risk.

## Human oversight

| Field | |
|---|---|
| Pattern — HITL / HOTL / HIC | |
| Routing thresholds | |
| Reviewer pool size and minimum | |
| Reviewer training and recalibration | |
| Override reason codes | |
| Contestation path (T1) | |

## Monitoring

| Metric | Threshold | Alert routing | Frequency |
|---|---|---|---|

## Rollback

| Field | |
|---|---|
| Mechanism | |
| Time to full rollback | |
| **Last tested** | |
| Result | |

## Change history

| Date | Version | Change | Reclassified? | Approver |
|---|---|---|---|---|
