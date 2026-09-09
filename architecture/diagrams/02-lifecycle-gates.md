# Diagram 2 — Lifecycle Control Gates

The eight checkpoints every AI system passes through, with the owner and exit criterion at each. A gate that cannot be failed is not a gate.

```mermaid
flowchart LR
    subgraph BUILD ["Build"]
        direction TB
        G1["Gate 1<br/>INTAKE<br/>—<br/>Accountable Owner<br/>Exit: tier assigned"]
        G2["Gate 2<br/>DESIGN REVIEW<br/>—<br/>Domain Board<br/>Exit: oversight adequate"]
        G3["Gate 3<br/>DATA GOVERNANCE<br/>—<br/>Legal and Privacy<br/>Exit: no open objection"]
        G4["Gate 4<br/>BUILD VALIDATION<br/>—<br/>Data/ML Lead<br/>Exit: meets pre-registered thresholds"]
        G1 --> G2 --> G3 --> G4
    end

    subgraph LAUNCH ["Launch"]
        direction TB
        G5["Gate 5<br/>PRE-DEPLOYMENT<br/>—<br/>Council for T1<br/>Exit: approval recorded"]
        G6["Gate 6<br/>DEPLOYMENT<br/>—<br/>Accountable Owner<br/>Exit: monitoring live"]
        G5 --> G6
    end

    subgraph RUN ["Run"]
        direction TB
        G7["Gate 7<br/>OPERATE<br/>—<br/>Accountable Owner<br/>Exit: within thresholds"]
        G8["Gate 8<br/>CHANGE / RETIRE<br/>—<br/>Accountable Owner<br/>Exit: reclassified or retired"]
        G7 --> G8
    end

    G4 --> G5
    G6 --> G7
    G8 -.->|"Material change<br/>reclassify"| G1
    G7 -.->|"Threshold breach<br/>or incident"| SUSPEND["SUSPENDED<br/>Any second-line function<br/>may act unilaterally"]
    SUSPEND -.->|"Remediated"| G5

    classDef gate fill:#1e3a5f,stroke:#2563eb,color:#fff
    classDef stop fill:#7f1d1d,stroke:#991b1b,color:#fff
    class G1,G2,G3,G4,G5,G6,G7,G8 gate
    class SUSPEND stop
```

**Two feedback loops carry most of the operational value.** The dotted line from Gate 8 back to Gate 1 is what prevents scope creep from silently escaping governance — a system that gains autonomy or a new data category re-enters classification rather than continuing under its original approval. The line from Gate 7 to SUSPEND is deliberately short: approval is slow and consensus-based, stopping is fast and unilateral.

**Pre-registration at Gate 4.** Evaluation metrics and passing thresholds are fixed at Gate 2, before any results exist. Choosing the metric after seeing results is how a failure gets laundered into a pass.

See [Governance Model §4](../../docs/governance-model.md).
