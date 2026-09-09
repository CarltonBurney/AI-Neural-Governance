# Diagrams

Mermaid source, rendered inline by GitHub. Each diagram is paired with a short note on the design decision it encodes — the diagram shows the flow, the note says why the flow is shaped that way.

| Diagram | Type | Key point |
|---|---|---|
| [1 — Intake and Classification](01-intake-and-classification.md) | Flowchart | Override conditions can promote a tier but never demote one |
| [2 — Lifecycle Gates](02-lifecycle-gates.md) | Flowchart | The two dotted feedback loops — reclassification and suspension — carry most of the operational value |
| [3 — Human Oversight Routing](03-human-oversight-routing.md) | Flowchart | The bottom loop detects oversight that has become a rubber stamp; most frameworks omit it |
| [4 — Incident Response](04-incident-response.md) | State diagram | Four of five paths into suspension are administrative, not technical |

Also: a [sequence diagram](../workflows/approval-workflow.md) of the approval path from Gate 2 to Gate 6.
