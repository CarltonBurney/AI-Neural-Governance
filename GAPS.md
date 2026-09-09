# Open Gaps

**Questions this framework cannot answer from public sources.** Each one is a place where content was deliberately left open rather than filled with plausible invention.

Answer any of these and the corresponding section gets built properly. Partial and uncertain answers are useful — "I think we did something like that but I'd have to check" is a better input than silence, and far better than a confident guess by me.

**Status key:** `OPEN` — unanswered · `PARTIAL` — some information, needs more · `CLOSED` — resolved, section built

---

## A. Real experience — would replace the constructed scenarios

The three [worked examples](examples/) are teaching scenarios. Real experience, even loosely described, is strictly stronger. **The shape matters more than the specifics** — no confidential detail is needed, and none should be included.

| # | Question | Status |
|---|---|---|
| A1 | Have you governed, reviewed, or advised on an AI or automated decision system? What did it do, and what was your role? | `OPEN` |
| A2 | Have you built or operated an intake, classification, or approval process for anything — model risk, data governance, vendor risk, change control, privacy review? These transfer directly. | `OPEN` |
| A3 | Have you had to tell a delivery team their use case was riskier than they had scoped it? What happened? | `OPEN` |
| A4 | Have you dealt with a vendor changing a product's behavior under an existing approval, or shipping a capability nobody signed off? | `OPEN` |
| A5 | Have you seen a control that existed on paper but was not actually operating? How was it discovered? | `OPEN` |
| A6 | Have you worked on a system where a human was formally in the loop but the review was thin in practice? | `OPEN` |
| A7 | Any incident, near-miss, or audit finding you can describe generically? | `OPEN` |

## B. Organizational context — determines the whole shape of the model

The framework currently assumes a mid-to-large enterprise with a Legal function, a Security function, and an Internal Audit third line. **If that assumption is wrong, the governance bodies in [Governance Model §2](docs/governance-model.md) are wrong.**

| # | Question | Status |
|---|---|---|
| B1 | What size and type of organization is this framework written for? A 200-person company cannot staff a Council with five functions. | `OPEN` |
| B2 | Which industry? Financial services, healthcare, and public sector each need a sector overlay that does not currently exist. | `OPEN` |
| B3 | Which jurisdictions? The framework is EU-anchored. US state law, UK, and Canada are not covered. | `OPEN` |
| B4 | Is the organization a **provider**, a **deployer**, or both? This changes which obligations attach — see [Standards Mapping §4](docs/standards-mapping.md). | `OPEN` |
| B5 | Does an existing model risk management function (e.g. SR 11-7) already exist that this should integrate with rather than duplicate? | `OPEN` |
| B6 | Is there an existing risk taxonomy or severity scale this should align to instead of introducing its own? | `OPEN` |

## C. Calibration — every threshold in the repo is a placeholder

Marked `[CALIBRATE]` inline. None is derived from a standard; see [Sources §2](docs/sources.md).

| # | Question | Status |
|---|---|---|
| C1 | What override rate would you expect from competent reviewers on a well-performing system? The investigation trigger should sit meaningfully below it. | `OPEN` |
| C2 | What audit-disagreement rate should invalidate an oversight control? | `OPEN` |
| C3 | What sampling rates are affordable given realistic reviewer headcount? | `OPEN` |
| C4 | What are the real retention requirements in your jurisdiction and sector? Current values are placeholders. | `OPEN` |
| C5 | What escalation SLAs are achievable with the staffing actually available? | `OPEN` |
| C6 | Is a 90-day exception cap right, or does it need to flex by tier? | `OPEN` |

## D. Framework design — decisions I made that you may disagree with

| # | Question | Status |
|---|---|---|
| D1 | **Highest-dimension-score sets the tier** rather than an average. Deliberately conservative — it means one high score forces the full control set. Agree? | `OPEN` |
| D2 | **Overrides can only raise a tier, never lower one.** Agree? | `OPEN` |
| D3 | **Any second-line function may suspend a live system unilaterally**, while approval requires consensus. This is a strong claim about where authority sits. | `OPEN` |
| D4 | **Dual review on adverse outcomes** is generalized from EU AI Act Art. 14(5), which requires it only for biometric identification. Reasonable extension, or over-reach? | `OPEN` |
| D5 | The framework treats **embedded vendor AI** as in scope on the same tier scale. Practical in your experience? | `OPEN` |
| D6 | **T3 is deliberately lightweight** to prevent shadow AI. Too permissive? | `OPEN` |

## E. Positioning — what this artifact is for

| # | Question | Status |
|---|---|---|
| E1 | What role are you targeting? AI governance lead, risk manager, compliance, privacy, product? The emphasis should shift accordingly. | `OPEN` |
| E2 | Who reads this — a technical hiring manager, a risk executive, a recruiter? Currently written for a risk-literate reader. | `OPEN` |
| E3 | Is this a portfolio piece only, or a working document you intend to use? | `OPEN` |
| E4 | Does your Obsidian vault contain governance material that should supersede any of this? | `OPEN` |

## F. Known coverage gaps — acknowledged, not planned

Already stated in [Standards Mapping §5](docs/standards-mapping.md).

- Conformity assessment procedure and notified body engagement
- CE marking and EU declaration of conformity
- Sector overlays: HIPAA, GLBA, FCRA, PCI DSS, SOX
- Non-EU jurisdictions
- Technical security controls for model infrastructure
- Cost and resourcing model for the governance function
- Training curriculum for reviewers, beyond the requirement that one exist

---

## How to use this

Answer by number in conversation — `A2: yes, I ran vendor risk reviews at…` — and the relevant section gets rebuilt from your answer. Anything still `OPEN` stays visibly open. **An artifact with honest gaps is more credible than one with invented completeness**, which is the whole reason this file exists.
