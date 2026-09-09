# Framework Documents

The four documents that constitute the governance framework. Read in this order if reading in full.

| # | Document | Role |
|---|---|---|
| 1 | [Classification Framework](classification-framework.md) | **The spine.** Tier definitions, the T0 prohibited list, six-dimension scoring, override rules, the control matrix, exceptions, and reclassification triggers. Everything else keys off the tier. |
| 2 | [Governance Model](governance-model.md) | Who decides what, at which threshold, on what evidence. Bodies, decision rights, the eight lifecycle gates, evidence retention, monitoring, incident response, third-party AI. |
| 3 | [Human-in-the-Loop Controls](human-in-the-loop.md) | What oversight actually means per tier — and how to detect when required review has decayed into a rubber stamp. |
| 4 | [Standards Mapping](standards-mapping.md) | Indicative crosswalk to the EU AI Act, ISO/IEC 42001, and NIST AI RMF, plus an explicit statement of what this framework does *not* cover. |

## How the pieces connect

```
Classification assigns a tier
        │
        ├──► Governance Model     → which gates, which approver, what evidence
        ├──► Human-in-the-Loop    → which oversight pattern, what review intensity
        └──► Standards Mapping    → which regulatory obligations attach
```

Supporting material: [diagrams](../architecture/diagrams/) · [workflows](../architecture/workflows/) · [worked examples](../examples/) · [templates](../templates/)
