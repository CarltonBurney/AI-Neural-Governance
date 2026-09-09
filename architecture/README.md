# Architecture

How the governance framework operates in practice — the flows, states, and procedures behind the [framework documents](../docs/).

## [Diagrams](diagrams/)

Four Mermaid diagrams, rendered inline by GitHub with no build step.

| | Shows |
|---|---|
| [1 — Intake and Classification](diagrams/01-intake-and-classification.md) | How a proposed use case gets a tier, including why overrides can only raise one |
| [2 — Lifecycle Gates](diagrams/02-lifecycle-gates.md) | The eight checkpoints, their owners and exit criteria, and the two feedback loops that carry most of the value |
| [3 — Human Oversight Routing](diagrams/03-human-oversight-routing.md) | How individual decisions reach human attention, and how degraded oversight is detected |
| [4 — Incident Response](diagrams/04-incident-response.md) | System states in production, and the five paths into suspension |

## [Workflows](workflows/)

| | Covers |
|---|---|
| [Request Classification](workflows/request-classification.md) | Intake to tier assignment in 5 business days, step by step, with the failure modes each step defends against |
| [Approval and Launch](workflows/approval-workflow.md) | Gate 2 through Gate 6, the 13-element evidence pack, and the rules that keep gates from becoming formalities |

## Rendering

Diagrams use Mermaid and display natively in the GitHub web UI. All diagrams in this repository have been validated by rendering with `@mermaid-js/mermaid-cli`.
