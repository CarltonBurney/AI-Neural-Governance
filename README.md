# AI Neural Governance

**A working governance framework for enterprise AI** — classification, decision rights, lifecycle controls, and human oversight that can be evidenced under audit.

> Portfolio artifact by **Carlton Burney**, demonstrating enterprise AI risk and governance design.
>
> **Provenance, stated plainly.** Every rule here is a **proposal**, not adopted policy. Regulatory citations are verified against the official EUR-Lex text; every numeric threshold is an uncalibrated placeholder. The worked examples are **constructed teaching scenarios** — they demonstrate reasoning, **not operational experience**, and this repository contains no account of work the author has performed.
>
> Read [Source-to-Claim Map](docs/source-to-claim-map.md) to see what backs each rule · [Status](STATUS.md) for component-level state · [Gaps](GAPS.md) for what is unresolved.

---

## Start here

**If you have five minutes**, read [Worked Example 2 — Résumé Screener](examples/02-resume-screener.md). It is the hard case: a system with a human reviewing every decision that was still producing unreviewed rejections at scale, and what it took to detect and fix that.

**If you want the model itself**, start with the [Classification Framework](docs/classification-framework.md) — everything else keys off the tier.

**If you want the shape at a glance**, the four [workflow diagrams](architecture/diagrams/) render inline on GitHub.

---

## The design position

Three commitments distinguish this framework from a policy document:

**1. Authority scales with evidence, not seniority.** A tier is assigned by scoring six dimensions against recorded justifications, with override conditions that can only raise a tier and never lower one. Scoring is judgment, and judgment drifts optimistic under delivery pressure — the overrides are the backstop.

**2. Stopping is easier than starting.** Approval requires consensus and quorum. Any second-line function can suspend a live system unilaterally. A governance model where it is harder to stop something than to start it does not control risk.

**3. A control that cannot be evidenced did not happen.** Every gate produces a retained artifact. The audit question the model is built to answer — *"who approved this, on what evidence, and what has changed since?"* — should take under an hour for any system in the inventory.

The framework's sharpest edge is **oversight effectiveness measurement**. Requiring human review is easy; detecting that required review has decayed into a rubber stamp is the actual control, and most frameworks omit it entirely.

---

## Contents

### Framework
| Document | What it covers |
|---|---|
| [Classification Framework](docs/classification-framework.md) | Four tiers, the prohibited list, six-dimension scoring, override rules, control matrix, exceptions, reclassification triggers |
| [Governance Model](docs/governance-model.md) | Scope, bodies, decision rights (RACI), eight lifecycle gates, evidence and retention, monitoring, incident response, third-party AI |
| [Human-in-the-Loop Controls](docs/human-in-the-loop.md) | Three oversight patterns, requirements by tier, the five conditions that make oversight real, confidence routing, rubber-stamp detection, escalation, contestation |
| [Standards Mapping](docs/standards-mapping.md) | Crosswalk to EU AI Act, ISO/IEC 42001, NIST AI RMF; provider vs. deployer obligations; explicit gap posture |

### Diagrams
| Diagram | |
|---|---|
| [1 — Intake and Classification](architecture/diagrams/01-intake-and-classification.md) | How a use case gets a tier |
| [2 — Lifecycle Gates](architecture/diagrams/02-lifecycle-gates.md) | The eight control checkpoints |
| [3 — Human Oversight Routing](architecture/diagrams/03-human-oversight-routing.md) | Decision routing and rubber-stamp detection |
| [4 — Incident Response](architecture/diagrams/04-incident-response.md) | System states and what moves between them |

### Workflows
| Workflow | |
|---|---|
| [Request Classification](architecture/workflows/request-classification.md) | Intake to tier in 5 business days, with the failure modes it defends against |
| [Approval and Launch](architecture/workflows/approval-workflow.md) | Gate 2 through Gate 6, the evidence pack, and the rules that make gates real |

### Worked examples
| Example | Tier | What it demonstrates |
|---|---|---|
| [1 — Customer Support Agent](examples/01-customer-support-agent.md) | T1 → T2 | Classification forcing a redesign rather than a reclassification; a vendor model update causing a SEV2 |
| [2 — Résumé Screener](examples/02-resume-screener.md) | T1 | Low autonomy, high consequence; proxy discrimination caught pre-launch; oversight measured and found failing |
| [3 — Code Assistant](examples/03-code-assistant.md) | T3 → T1 | The light path, and scope expansion by vendor feature release |

### Templates
[Intake Form](templates/intake-form.md) · [Model / System Card](templates/model-card.md) · [Risk Register Entry](templates/risk-register-entry.md)

---

## The tiers at a glance

| Tier | Definition | Approval | Oversight |
|---|---|---|---|
| **T0 Prohibited** | Will not be built or bought at any control level | Rejected at intake | — |
| **T1 High** | Materially affects rights, safety, livelihood, or health — or acts autonomously over irreversible outcomes | Governance Council | Human-in-the-loop, contestation path |
| **T2 Limited** | Affects business outcomes; errors contained, detectable, reversible | Domain Board | Human-on-the-loop, sampled review |
| **T3 Minimal** | Internal productivity, no consequential decisions, fully reversible | Owner self-serve | Human-in-command |

T3 exists to be used. A framework with no cheap path produces shadow AI, which is worse than governed AI.

---

**Carlton Burney** — see linked portfolio for context.
