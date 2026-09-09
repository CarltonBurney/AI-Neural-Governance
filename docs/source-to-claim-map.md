# Source-to-Claim Map

**Every rule in this framework, classified by what actually backs it.**

This file exists because the framework was drafted before most of its sources were consulted. Citations added afterward are marked as such. **A citation that appears next to a rule does not mean the rule came from the citation** — the classification column says which.

## Classification key

| | Meaning |
|---|---|
| **D — Direct requirement** | The source text requires this. Quoted below. |
| **I — Interpretation** | My reading or extension of a source. The source is real; the inference is mine and is contestable. |
| **P — Proposed policy** | My design. **No source.** Would require organizational adoption to become policy. |
| **R — Retrofitted** | Written first, source found afterward. The source is genuine and consistent, but did not generate the rule. |

Verified against the official consolidated text, [Regulation (EU) 2024/1689 on EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng), on 9 September 2026.

---

## 1. Direct requirements

Rules where the source text imposes the obligation.

| Rule in this framework | Source | Applicability | Class |
|---|---|---|---|
| Certain AI practices are prohibited outright | **Art. 5** | Providers and deployers, EU market | **D** |
| Recruitment systems that "analyse and filter job applications" are high-risk | **Annex III(4)** | High-risk classification | **D** |
| Data must be examined "in view of possible biases" that harm health/safety, fundamental rights, or lead to prohibited discrimination | **Art. 10(2)(f)** | Providers of high-risk systems | **D** |
| Overseers must be enabled to understand capacities and limitations, monitor operation, remain aware of **automation bias**, correctly interpret output, disregard/override/reverse output, and intervene or stop the system | **Art. 14(4)(a)–(e)** | High-risk systems — **qualified "as appropriate and proportionate"** | **D** |
| Deployers must assign oversight to natural persons with "the necessary competence, training and authority, as well as the necessary support" | **Art. 26(2)** | **Deployers only** | **D** |
| Two natural persons must separately verify before action | **Art. 14(5)** | **Biometric identification only**; waivable for law enforcement, migration, border, asylum | **D — narrow** |
| Automatic logging and record retention | **Art. 12, Art. 19** | High-risk systems | **D** |
| Affected persons have a right to explanation of individual decision-making | **Art. 86** | Decisions with legal or similarly significant effect | **D** |
| Post-market monitoring | **Art. 72** | Providers | **D** |
| Serious incidents must be reported | **Art. 73** | Providers | **D** |
| Disclosure obligations for chatbots and synthetic media | **Art. 50** | Providers and deployers | **D** |

### Correction made during review

The framework originally attributed "competence, training and authority" to Article 14. **It is Article 26(2)**, which is a *deployer* obligation. This matters: an organization building its own system carries Art. 14 provider duties on system *design*; an organization deploying someone else's carries Art. 26 duties on *staffing the oversight*. Most enterprises are deployers, so Art. 26(2) is frequently the operative provision — and it was mis-cited.

The qualifier **"as appropriate and proportionate"** in Art. 14(4) was also omitted. It is load-bearing: the regulation does not require identical oversight intensity for every high-risk system.

---

## 2. Interpretations

The source is real. The inference is mine, and a competent reviewer could disagree.

| Rule | Source relied on | My inference | Class |
|---|---|---|---|
| A **ranking** that orders what a recruiter sees constitutes sufficient influence to warrant the highest tier, even with a human deciding | Annex III(4) "analyse and **filter** job applications" | That filtering and ordering are the same class of act. Reasonable, but the Regulation does not define ranking as filtering. | **I** |
| **Dual review** required on adverse outcomes generally | Art. 14(5) | Generalizing a rule the Regulation applies **only to biometric identification**. This is an extension well beyond the source. | **I — weak** |
| Oversight must be **measured**, not merely required | Art. 14(4)(b) automation-bias awareness | That "remain aware of" cannot be discharged by training alone and implies verification. **The Regulation does not require measurement.** This is the framework's central claim and it is an inference, not a requirement. | **I** |
| **Proxy** discrimination testing specifically | Art. 10(2)(f) "possible biases" | That "possible biases" extends to features correlating with protected characteristics without being them. Well-supported by the Amazon case, but an inference. | **I** |
| Four tiers T0–T3 mapped to EU risk categories | Art. 5 / Art. 6 / Annex III / Art. 50 | Structural alignment. The Regulation does not define a four-tier scheme in these terms. | **I** |
| Vendor model change is a material change requiring re-assessment | Art. 25 value chain; Art. 72 | Reasonable, but the specific trigger is mine. | **I** |

---

## 3. Retrofitted — written first, cited after

Full disclosure of where the citation followed the rule.

| Rule | What happened | Class |
|---|---|---|
| The **five conditions that make oversight real** ([HITL §3](human-in-the-loop.md)) — authority, capability, information, time, consequence | Written from scratch before any source was consulted. Art. 14(4)(a)–(e) was found afterward and **does correspond closely on four of five**. **"Time" has no counterpart in Art. 14** and is entirely mine. The correspondence is real but was not the origin. | **R** |
| Stopping authority outranking approval authority | Written first. Art. 14(4)(e) "stop button" concerns *system* interruption by an overseer, **not organizational authority to suspend a programme**. The citation does not support the governance rule. | **R — citation does not support** |
| Eight lifecycle gates | Written first; Art. 9 and Art. 17 found afterward. Both require a risk management system and a quality management system; **neither prescribes gates**. | **R** |

---

## 4. Proposed policy — no source

**Every item below is my design.** None is required by any standard. Each would need explicit organizational adoption before it is policy rather than proposal. All numeric values are marked `[CALIBRATE]` in the documents.

| Area | Items |
|---|---|
| Classification mechanics | Six scoring dimensions; 0–3 scale; highest-score-sets-tier rule; override table contents |
| T0 list additions | Autonomous irreversible high-consequence action with no recourse. **Not in Art. 5** — my addition |
| Thresholds | Every override-rate, audit-disagreement, sampling-rate, and review-time value |
| Timing | Exception cap; intake-to-tier duration; escalation SLAs; recertification intervals |
| Retention | All retention periods. **Real retention is set by jurisdiction and sector, not by me** |
| Structure | Governance Council; Domain Boards; RACI allocation; veto-to-escalate; unilateral suspension right |
| Process | Eight gates; evidence pack contents; pre-registration of metrics |

---

## 5. Automation bias research — what it does and does not support

The research is real and relevant. **It has been over-extended in earlier drafts and that is corrected here.**

**What the studies establish:** operators using highly reliable but imperfect automated aids can perform worse than operators without automation; both omission and commission errors occur; making participants accountable for decision accuracy measurably reduced the effect; Goddard et al. propose quantifying automation bias via the commission-error rate — how often an initially correct human judgment is displaced by erroneous system output.

**What the studies do NOT establish, and what must not be drawn from them:**

| Not supported | Why |
|---|---|
| Any specific override-rate threshold | The studies report error rates under experimental conditions. They set no operational trigger. |
| That the reported percentages transfer to recruitment, support, or code review | The figures come from specific task contexts — largely monitoring and aviation-style tasks. **Rates are not portable across domains.** |
| Any SLA, sampling rate, or approval threshold | Nothing in this literature speaks to these. |
| A universal claim that low override rates indicate failed oversight | The research supports treating a low rate as **ambiguous and requiring independent verification**. It does not establish a rate below which oversight is failing. |

**What the framework may legitimately draw:** (a) that requiring human review is insufficient on its own; (b) that accountability is a control with empirical support; (c) that independent re-review is the method for distinguishing real oversight from rubber-stamping. **All specific numbers remain unset.**

---

## 6. Documented incidents — kept separate

Three categories are deliberately not mixed:

| Category | Status | Where |
|---|---|---|
| **Documented public incidents** | Real, reported, cited | [Sources §1](sources.md) — Amazon recruiting tool; Dutch *toeslagenaffaire* |
| **Constructed teaching scenarios** | Hypothetical. Demonstrate reasoning, **not operational experience** | [examples/](../examples/) — labelled on every file |
| **The author's own operating history** | **Not represented anywhere in this repository** | Open — [GAPS.md](../GAPS.md) §A |

Nothing in this repository describes work the author has performed. The worked examples demonstrate how the framework reasons about a case. **They are not evidence that the framework has been operated.**

---

**Sources:** [Regulation (EU) 2024/1689, EUR-Lex official text](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng) · [AI Act Explorer](https://artificialintelligenceact.eu/ai-act-explorer/) (secondary, used for navigation) · full bibliography in [sources.md](sources.md)
