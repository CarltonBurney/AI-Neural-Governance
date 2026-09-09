# Diagram 1 — Intake and Classification

How a proposed AI use case gets a tier. This is the entry point to every other process in the framework.

```mermaid
flowchart TD
    START(["New AI use case proposed"]) --> INTAKE["Gate 1: Intake form<br/>Purpose, populations, data, autonomy"]
    INTAKE --> T0{"Matches the<br/>T0 prohibited list?"}

    T0 -->|Yes| REJECT["REJECTED at intake<br/>No approval path exists"]
    T0 -->|No| SCORE["Score six dimensions 0-3<br/>Consequence · Autonomy · Data<br/>Scale · Reversibility · Exposure"]

    SCORE --> OVERRIDE{"Any override<br/>condition met?"}
    OVERRIDE -->|"Employment, credit,<br/>essential services,<br/>medical, special-category data"| T1["TIER 1 — HIGH"]
    OVERRIDE -->|No| MAX{"Highest single<br/>dimension score"}

    MAX -->|3| T1
    MAX -->|2| T2["TIER 2 — LIMITED"]
    MAX -->|0 or 1| T3["TIER 3 — MINIMAL"]

    T1 --> T1PATH["Full control set<br/>Council approval<br/>Human-in-the-loop<br/>Contestation path"]
    T2 --> T2PATH["Standard control set<br/>Domain Board approval<br/>Human-on-the-loop"]
    T3 --> T3PATH["Registration only<br/>Owner self-serve<br/>Human-in-command"]

    T1PATH --> GATE2["Proceed to Gate 2<br/>Design review"]
    T2PATH --> GATE2
    T3PATH --> REG["Recorded in AI inventory<br/>Annual recertification"]

    REJECT --> LOG["Logged with rationale<br/>Retained for audit"]

    classDef prohibited fill:#7f1d1d,stroke:#991b1b,color:#fff
    classDef high fill:#9a3412,stroke:#c2410c,color:#fff
    classDef limited fill:#854d0e,stroke:#a16207,color:#fff
    classDef minimal fill:#14532d,stroke:#166534,color:#fff
    class REJECT,LOG prohibited
    class T1,T1PATH high
    class T2,T2PATH limited
    class T3,T3PATH,REG minimal
```

**Note the asymmetry between the two paths into T1.** The dimensional score can promote a case to T1, but the override conditions can *only* promote — never demote. A résumé screener with low autonomy still lands in T1 because it influences employment. Scoring is judgment, and judgment drifts optimistic under delivery pressure; the overrides are the backstop.

See [Classification Framework](../../docs/classification-framework.md).
