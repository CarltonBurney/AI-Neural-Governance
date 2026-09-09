# Governance Model

**Purpose:** Establish who decides what about AI systems, at which thresholds, on what evidence — and how those decisions are recorded so they can be audited later.

A governance model earns its keep by removing ambiguity at the moment of decision. This one is built around a single principle: **authority scales with the tier**, and the tier is set by evidence, not by seniority or delivery pressure.

---

## 1. Scope

Applies to any system that uses machine learning or generative models to produce output that informs or executes a business decision, including:

- Models built in-house
- Third-party models accessed via API
- AI features embedded in purchased SaaS
- Agentic systems that chain tool calls or take actions
- Fine-tunes, RAG systems, and prompt-orchestrated workflows over foundation models

**Embedded vendor AI is in scope.** The most common governance failure is treating a feature toggle in an existing SaaS contract as a procurement event rather than an AI deployment. It is both.

---

## 2. Bodies and roles

### AI Governance Council
Standing cross-functional body. Chaired by the Chief Risk or Chief Data Officer. Meets biweekly; convenes within 48 hours for incidents.

**Authority:** Approves and rejects T1 use cases. Owns the T0 prohibited list. Grants exceptions above the Domain Board's authority. Suspends any system in production. Owns this framework.

**Membership:** Risk (chair), Legal & Privacy, Security, Data/ML leadership, the business sponsor of the case under review, and Internal Audit as a non-voting observer.

### Domain Approval Boards
One per major business domain. Approve T2 use cases within their domain; escalate anything that scores or overrides into T1. Members are delegated by the Council and their authority is revocable.

### Accountable Owner
A named individual — never a team, never a role inbox — accountable for a specific system across its full lifecycle. Signs the intake, owns the evaluation evidence, holds the rollback decision, answers at recertification. **If the accountable owner leaves the organization or changes roles, the system enters a 30-day grace period and is suspended if no successor signs.**

### Second-line functions
Legal & Privacy, Security, and Risk & Compliance each hold an independent review right. Critically: **their sign-off is not advisory.** A T1 use case cannot proceed over an unresolved objection from any second-line function; the objection escalates to the Council, which may overrule only with a recorded written rationale.

### Internal Audit
Third line. Does not approve systems — tests whether the controls in this framework are actually operating. Reports findings to the Audit Committee independently of the Council.

---

## 3. Decision rights

| Decision | Owner | Domain Board | Council | Legal | Security | Notes |
|---|---|---|---|---|---|---|
| Register a T3 use case | **A** | I | I | — | — | Self-serve, post-hoc visible |
| Approve a T2 use case | R | **A** | I | C | C | |
| Approve a T1 use case | R | C | **A** | C | C | Legal and Security hold veto-to-escalate |
| Assign or dispute a tier | R | C | **A** | C | C | Council is final arbiter |
| Add to the T0 list | C | C | **A** | C | I | |
| Grant an exception (T2) | R | **A** | I | C | C | ≤90 days |
| Grant an exception (T1) | R | C | **A** | C | C | ≤90 days, compensating control required |
| Approve production launch | R | C | **A** for T1 | I | C | Evidence pack required |
| Suspend a system | R | R | **A** | R | R | Any second-line function may suspend unilaterally on safety or legal grounds |
| Accept residual risk | C | C | **A** | C | C | Named executive signature |
| Retire a system | **A** | I | I | I | C | Data disposition evidence required |

**A** = Accountable (one only) · **R** = Responsible · **C** = Consulted · **I** = Informed

The asymmetry in "Suspend" is deliberate. Approval is slow and consensus-based; **stopping is fast and unilateral.** A governance model where it is harder to stop something than to start it does not control risk.

---

## 4. Control checkpoints across the lifecycle

Eight gates. Each has a defined owner, required evidence, and an explicit exit criterion. A gate that cannot be failed is not a gate.

| # | Gate | Owner | Required evidence | Exit criterion |
|---|---|---|---|---|
| 1 | **Intake** | Accountable Owner | Intake form, purpose statement, affected populations, data inventory | Tier assigned and recorded |
| 2 | **Design review** | Domain Board | Architecture, data flow, human oversight design, failure modes | Oversight design adequate for tier |
| 3 | **Data governance** | Legal & Privacy | Lawful basis, minimization rationale, retention schedule, provenance of training data | No unresolved privacy objection |
| 4 | **Build validation** | Data/ML Lead | Evaluation results against pre-registered metrics, fairness testing, red-team findings | Meets thresholds set at Gate 2 |
| 5 | **Pre-deployment** | Council (T1) / Board (T2) | Full evidence pack, model card, rollback plan, monitoring plan | Approval recorded with named signatory |
| 6 | **Deployment** | Accountable Owner | Staged rollout plan, monitoring live, disclosure in place | Monitoring confirmed operational before full traffic |
| 7 | **Operate** | Accountable Owner | Continuous metrics, incident log, override log, drift indicators | Within thresholds; recertification current |
| 8 | **Change / Retire** | Accountable Owner | Change classification, or disposition evidence | Reclassified per framework §7, or cleanly retired |

**Pre-registration matters at Gate 4.** Evaluation metrics and passing thresholds are set at Gate 2, before results exist. Choosing the metric after seeing the results is how teams accidentally launder a failure into a pass.

---

## 5. Evidence and auditability

Governance that cannot be evidenced did not happen. Every gate produces an artifact; every artifact is retained.

| Artifact | Retention | Immutable |
|---|---|---|
| Intake form and tier rationale | Life of system + 3 years | Yes — versioned, not overwritten |
| Approval records with signatory | Life of system + 7 years | Yes |
| Evaluation results and evidence pack | Life of system + 3 years | Yes |
| Model / system card | Current + all prior versions | Versioned |
| Decision logs (T1) | Per regulatory requirement; minimum 12 months | Append-only |
| Human override log | Minimum 12 months | Append-only |
| Incident records | 7 years | Yes |
| Exception records | Life of system + 3 years | Yes |

The audit question this is built to answer: *"Show me who approved this system, on what evidence, and what has changed since."* If that takes more than an hour to answer for any system in the inventory, the model is not working.

---

## 6. Monitoring and recertification

**Continuous (T1):** output quality against pre-registered metrics, disparate impact across protected groups, human override rate, escalation volume and resolution time, input drift, cost and latency anomalies, incident count.

**The override rate is the most informative single metric — and it is not self-interpreting.** A very low override rate is *ambiguous* between an excellent system and absent oversight; only independent re-review distinguishes them. `[CALIBRATE]` No floor is set here, because the meaningful floor depends on the baseline rate of genuine human disagreement in the decision domain, which must be measured rather than assumed — see [Human-in-the-Loop §5](human-in-the-loop.md) and [GAPS](../GAPS.md) C1.

**Recertification:** T1 semi-annually, T2 and T3 annually. The accountable owner re-attests that purpose, population, data, and autonomy are unchanged; that controls still operate; and that monitoring thresholds were met. Failure to recertify by the due date triggers automatic suspension — not a reminder.

---

## 7. Incident response

An AI incident is any event where a system produces an outcome outside its approved envelope: a harmful or discriminatory output, an action taken beyond delegated authority, a data exposure, or a material accuracy failure affecting decisions.

| Severity | Definition | Response | Council |
|---|---|---|---|
| SEV1 | Harm to a person's rights, safety, or livelihood; regulated data exposure | Immediate suspension | Convene within 48h |
| SEV2 | Customer-facing error at scale; material financial impact | Contain within 24h | Next scheduled meeting |
| SEV3 | Contained error, no external effect | Log and remediate | Reported in aggregate |

Every SEV1 and SEV2 produces a post-incident review asking two questions: which control should have caught this, and did that control exist but not operate — or not exist at all. The second answer amends this framework.

---

## 8. Third-party and embedded AI

Vendor AI is governed on the same tier scale. Additional requirements for T1 and T2:

- Contractual right to evaluation evidence, and to audit on reasonable notice
- Notification obligation for material model changes, with a defined notice period
- Documented data handling: whether inputs train the vendor's models, and where data resides
- Named vendor accountable contact
- An exit plan — a T1 dependency with no substitution path is a concentration risk on the register

Absence of a contractual audit right forces a T2 minimum ([Classification §4](classification-framework.md)) because the organization cannot independently verify the control set.

---

## 9. Reading this framework

| If you are | Start with |
|---|---|
| Proposing a new AI use case | [Classification Framework](classification-framework.md), then the [intake form](../templates/intake-form.md) |
| Designing human oversight | [Human-in-the-Loop](human-in-the-loop.md) |
| Mapping to regulatory obligation | [Standards Mapping](standards-mapping.md) |
| Looking for a concrete walkthrough | [Worked examples](../examples/) |
| Trying to see the whole flow | [Workflow diagrams](../architecture/diagrams/) |

---

*Illustrative framework prepared as a portfolio artifact demonstrating enterprise AI governance design.*
