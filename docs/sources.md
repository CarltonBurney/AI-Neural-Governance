# Sources and Provenance

**What is verified, what is a design choice, and what is unresolved.**

This framework was drafted as a portfolio artifact. This page exists so that any claim in the repository can be traced to one of three origins. Anything not traceable here is a design choice or an open gap — see [GAPS.md](../GAPS.md).

---

## 1. Verified external sources

Checked against primary or authoritative secondary sources on **9 September 2026**.

### EU AI Act — Regulation (EU) 2024/1689

Article numbers and titles verified via the [AI Act Explorer](https://artificialintelligenceact.eu/ai-act-explorer/).

| Article | Title |
|---|---|
| 5 | Prohibited AI Practices |
| 6 | Classification Rules for High-Risk AI Systems |
| 9 | Risk Management System |
| 10 | Data and Data Governance |
| 11 | Technical Documentation |
| 12 | Record-Keeping |
| 13 | Transparency and Provision of Information to Deployers |
| 14 | Human Oversight |
| 15 | Accuracy, Robustness and Cybersecurity |
| 17 | Quality Management System |
| 19 | Automatically Generated Logs |
| 25 | Responsibilities Along the AI Value Chain |
| 26 | Obligations of Deployers of High-Risk AI Systems |
| 49 | Registration |
| 50 | Transparency Obligations for Providers and Deployers |
| 72 | Post-Market Monitoring |
| 73 | Reporting of Serious Incidents |
| 86 | Right to Explanation of Individual Decision-Making |

**[Annex III](https://artificialintelligenceact.eu/annex/3/)** — eight high-risk categories: (1) biometrics, (2) critical infrastructure, (3) education and vocational training, (4) employment, workers' management and access to self-employment, (5) essential private and public services, (6) law enforcement, (7) migration and border control, (8) administration of justice.

Annex III(4) expressly covers systems used "for the recruitment or selection of natural persons, in particular to place targeted job advertisements, **to analyse and filter job applications**, and to evaluate candidates." This is the direct basis for the employment override in [Classification §4](classification-framework.md).

**[Article 10(2)(f)](https://artificialintelligenceact.eu/article/10/)** requires "examination in view of possible biases that are likely to affect the health and safety of persons, have a negative impact on fundamental rights, or lead to discrimination prohibited under Union law."

**[Article 14](https://artificialintelligenceact.eu/article/14/)** — verified against the [official EUR-Lex text](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng). The five conditions in [Human-in-the-Loop §3](human-in-the-loop.md) were **written before this article was consulted** and correspond to it on four of five points; "time" has no counterpart in Art. 14 and is the author's addition. See [Source-to-Claim Map §3](source-to-claim-map.md). Art. 14(4) applies **"as appropriate and proportionate"** — it does not mandate uniform oversight intensity across all high-risk systems.

| Art. 14(4) | Requirement |
|---|---|
| (a) | Overseer can "properly understand the relevant capacities and limitations" and monitor operation |
| (b) | Overseer must "remain aware of the possible tendency of automatically relying or over-relying on the output produced by a high-risk AI system (**automation bias**)" |
| (c) | Overseer can "correctly interpret the high-risk AI system's output" |
| (d) | Overseer can "decide… not to use the high-risk AI system or to otherwise disregard, override or reverse the output" |
| (e) | Overseer can "intervene… or interrupt the system through a 'stop' button or similar procedure" |

Article 14(5) requires, **for biometric identification only**, that no action be taken unless the identification "has been separately verified and confirmed by at least two natural persons"; it is waivable for law enforcement, migration, border control and asylum. This framework's general dual-review requirement is an **extension well beyond the source**, classified as a weak interpretation in the [Source-to-Claim Map](source-to-claim-map.md).

**Article 26(2)** — separately verified — requires deployers to assign human oversight to natural persons who have "the necessary competence, training and authority, as well as the necessary support." This is a **deployer** obligation, not an Art. 14 provider obligation, and an earlier draft of this repository mis-attributed it.

Automation bias is named explicitly in the regulation, at 14(4)(b). **The regulation requires awareness of it; it does not require measurement of it.** The oversight-effectiveness monitoring in [Human-in-the-Loop §5](human-in-the-loop.md) is the author's inference about how awareness could be discharged in practice — not a regulatory requirement. See [Source-to-Claim Map §2](source-to-claim-map.md).

### ISO/IEC 42001:2023

Management system clauses 4–10; **Annex A comprises 38 controls across nine objectives, A.2–A.10**: A.2 AI policy, A.3 internal organization, A.4 resources, A.5 impact assessment, A.6 AI system life cycle, A.7 data for AI systems, A.8 information for interested parties, A.9 responsible use of AI systems, A.10 third-party relationships. Annex A is informative — a catalogue drawn from and justified by the organization's own risk and impact assessment, not a checklist applied top to bottom. ([reference](https://www.isms.online/iso-42001/annex-a-controls/))

### NIST AI RMF 1.0

Referenced at **function and category level only** (GOVERN, MAP, MEASURE, MANAGE). Subcategory identifiers are deliberately not cited, as they were not individually verified.

### Automation bias research

The empirical basis for treating "human review is required" as insufficient.

- **Skitka, Mosier & Burdick** — operators using highly reliable but imperfect automated aids performed *worse* than operators without automation: omission errors (missing events the automation failed to flag) around **55%**, and commission errors (following incorrect automation despite contrary evidence) approaching **100%**. Crucially, making participants **accountable** for their decision accuracy measurably lowered automation bias. ([Accountability and automation bias](https://www.sciencedirect.com/science/article/abs/pii/S107158199990349X) · [Does automation bias decision-making?](https://www.sciencedirect.com/science/article/abs/pii/S1071581999902525))
- **Goddard et al. (2012)** — proposes quantifying automation bias via the **commission error rate**: the rate at which an initially correct human judgment is overridden by erroneous system output. ([Automation bias in electronic prescribing](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5356416/))

**These figures are experimental results from specific task contexts and do not transfer to recruitment, support, or code review.** They must not be converted into operational thresholds, sampling rates, or SLAs — see [Source-to-Claim Map §5](source-to-claim-map.md).

What the framework legitimately draws from this literature, and nothing more:
1. Requiring human review is insufficient on its own.
2. Accountability has empirical support as a mitigating factor.
3. Independent re-review is the method for distinguishing real oversight from rubber-stamping — the *method*, not a threshold.

**No numeric threshold in this repository is derived from this research.**

### Documented public incidents

Used to anchor the worked examples in real, reported failure modes.

| Case | What is documented |
|---|---|
| **Amazon experimental recruiting tool** | Development began 2014, ranking candidates one to five stars; trained on ten years of received résumés, predominantly from men. Gender bias evident by 2015. Reportedly penalized résumés containing the word "women's" and the names of certain all-women colleges. Scrapped after Amazon concluded it could not reliably make the algorithm gender-neutral. Reported by Reuters, October 2018. ([MIT Technology Review](https://www.technologyreview.com/2018/10/10/139858/amazon-ditched-ai-recruitment-software-because-it-was-biased-against-women/) · [AI Incident Database #37](https://incidentdatabase.ai/cite/37/)) |
| **Dutch childcare benefits scandal** (*toeslagenaffaire*) | A fraud risk-scoring classifier used nationality (Dutch / non-Dutch) as a risk indicator. Approximately **26,000 families** wrongly accused of fraud between 2005 and 2019 and ordered to repay benefits in full; families driven into bankruptcy and loss of housing; in more than **1,600 cases** children were removed by youth-protection services. Affected people were **not informed** the system was used and had little scope to complain or appeal. The 2020 parliamentary inquiry report *Ongekend onrecht* cited inadequate oversight of automated risk-profiling. The government resigned in January 2021. ([Wikipedia](https://en.wikipedia.org/wiki/Dutch_childcare_benefits_scandal) · [AIAAIC](https://www.aiaaic.org/aiaaic-repository/ai-algorithmic-and-automation-incidents/netherlands-childcare-benefits-fraud-automation)) |

---

## 2. Design choices — chosen, not derived

The following are **proposed starting values selected by the author**. They are defensible as design decisions and are consistent with the direction of the sources above, but **no standard specifies them**. Each requires calibration against an organization's own observed baseline before it becomes a real threshold.

| Value | Where | Basis |
|---|---|---|
| Four tiers T0–T3 | Classification | Shaped to map onto EU AI Act risk categories |
| Six scoring dimensions, 0–3 | Classification | Author's design |
| Highest-score-sets-tier rule | Classification | Author's design; deliberately conservative |
| Exception cap of 90 days | Classification §6 | Author's design |
| Sampling rates at T2 and for the T1 exception | HITL §2 | Author's design |
| Override-rate and audit-disagreement investigation triggers | HITL §5 | **Unset.** The commission-error *method* is sourced; no value is | `[CALIBRATE]` |
| Escalation SLAs (L1–L4) | HITL §6 | Author's design |
| Evidence retention periods | Governance §5 | Author's design; real retention is set by jurisdiction and sector |
| Eight lifecycle gates | Governance §4 | Author's design |
| Intake-to-tier target duration | Workflows | Author's design |

**Anywhere a number appears in this repository without a source here, treat it as a placeholder.** Several are flagged inline as `[CALIBRATE]`.

## 3. Constructed scenarios

The three [worked examples](../examples/) are **constructed teaching scenarios**, not case studies. They are anchored to the real documented incidents above where the failure mode matches, and specific operational metrics have been deliberately removed rather than invented.

## 4. Open gaps

Unresolved questions — including everything that would require the author's own professional experience — are tracked in [GAPS.md](../GAPS.md) rather than filled with plausible invention.
