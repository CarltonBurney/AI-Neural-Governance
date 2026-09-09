# Diagram 3 — Human Oversight Routing

How individual decisions are routed to human attention, and how the framework detects oversight that has degraded into a rubber stamp.

```mermaid
flowchart TD
    OUT["System produces output"] --> ADVERSE{"Adverse outcome<br/>for a person?"}

    ADVERSE -->|Yes| DUAL["MANDATORY DUAL REVIEW<br/>Two reviewers<br/>Documented rationale"]
    ADVERSE -->|No| POLICY{"Policy trigger?<br/>Protected group,<br/>novel pattern,<br/>outside envelope"}

    POLICY -->|Yes| DUAL
    POLICY -->|No| CONF{"Calibrated<br/>confidence"}

    CONF -->|"Low, or near<br/>decision threshold"| FULL["FULL HUMAN REVIEW<br/>Before output takes effect"]
    CONF -->|High| TIERCHK{"Tier?"}

    TIERCHK -->|T1| FULL
    TIERCHK -->|T2| SAMPLE["SAMPLED REVIEW<br/>Rate to be calibrated<br/>Audit trail retained"]
    TIERCHK -->|T3| AUTO["Proceeds<br/>Aggregate review only"]

    DUAL --> DECIDE["Human decision recorded"]
    FULL --> DECIDE
    SAMPLE --> DECIDE
    AUTO --> DECIDE

    DECIDE --> LOGGED["Override log<br/>Reason code<br/>Time-per-decision"]
    LOGGED --> MONITOR{"Effectiveness<br/>monitoring"}

    MONITOR -->|"Override rate below floor<br/>OR review time below floor<br/>OR audit disagreement above ceiling<br/>ALL THRESHOLDS UNCALIBRATED"| INVESTIGATE["OVERSIGHT CONTROL<br/>PRESUMED FAILING<br/>Independent audit triggered"]
    MONITOR -->|Within thresholds| HEALTHY["Control operating<br/>Feeds recertification"]

    classDef review fill:#1e3a5f,stroke:#2563eb,color:#fff
    classDef alarm fill:#7f1d1d,stroke:#991b1b,color:#fff
    classDef ok fill:#14532d,stroke:#166534,color:#fff
    class DUAL,FULL,SAMPLE review
    class INVESTIGATE alarm
    class HEALTHY ok
```

**The bottom loop is the part most frameworks omit.** Requiring human review is easy; detecting that the required review has become meaningless is the actual control. A sustained override rate below the calibrated floor is treated as evidence of *absent oversight* until an independent audit proves otherwise — because a very low override rate is ambiguous between an excellent system and a rubber stamp, and only post-hoc audit distinguishes them.

Override rate is never used as an individual reviewer performance metric. Doing so manufactures precisely the failure mode being measured.

See [Human-in-the-Loop §4–5](../../docs/human-in-the-loop.md).
