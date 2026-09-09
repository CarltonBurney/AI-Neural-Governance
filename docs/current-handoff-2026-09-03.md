# Current Handoff — 2026-09-03

> **Dated build brief — 2026-09-03. Background, not the current handoff.** A `Current Status - 2026-09-09.md` exists in a "Shared AI Handoff" folder this session **could not access** (five routes attempted). Statements here are valid *as of 2026-09-03* and may be superseded. Roster and architecture content is **documented intent**, not evidence of implementation. See [Sources and Access](../SOURCES-AND-ACCESS.md).

Source: Google Drive → **Command Center**, shared by `paios.infinity@gmail.com`, 2026-09-03. This is the most recent PAIOS material found and it **supersedes earlier direction**.

> *"This supersedes the earlier 'development on hold' language for this pipeline."* — `VSCODE-START-HERE.md`

---

## 1. Active work

**VS Code was selected to build a shared reporting and synchronization pipeline.** One central reporting service so Perplexity Computer, PAIOS agents, Gmail and other systems publish normalized activity and retrieve authorized project context.

| | |
|---|---|
| Operating picture | Google Sheets (projection, human-readable) |
| Artifacts | Google Drive, referenced by stable file IDs |
| Durable store | SQLite — deduplication, checkpoints, retry state |
| Existing system | Perplexity-hosted dashboard **and its backend — working, to be preserved** |
| n8n | **Candidate** adapter/orchestration layer. Explicitly *not required* for the first pilot |
| .NET desktop container | Subsequent direction; must not delay the reporting pilot |

**Explicitly recorded in the source:** the downloaded ZIP contains only the frontend and *"is not evidence the hosted system is broken."* Sheets is *"a projection, not the atomic task-lock authority."*

This resolves the "four n8n candidates" reference: n8n is a **candidate adapter**, not a committed dependency.

## 2. Handoff folder contents

| File | Size | Read |
|---|---|---|
| `VSCODE-START-HERE.md` | 6.7 KB | **Yes** |
| `agent-roster.md` | 4.3 KB | **Yes** |
| `pipeline-build-instructions.json` | 2.8 KB | No |
| `pipeline-contracts.json` | 3.2 KB | No |
| `build-instructions.json` | 6.2 KB | No |
| `Command-Center-ZIP-Review.md` | 4.4 KB | No |
| `concordance-data.json` | 36 KB | No |
| `concordance-content.html` | 26 KB | No |
| `PAIOS-Command-Center-Handoff-2026-09-02.zip` | 59 KB | No — archive |
| `PAIOS-VSCode-Build-Handoff.zip` | 77 KB | No — archive |
| `Command-Center-Project-Ops-REFERENCE-ONLY.zip` | 13 KB | No — archive |

---

## 3. An existing autonomy scale — L0 / L1 / L2

`agent-roster.md` defines **17 agents**, each with an explicit **"proposed ceiling"** of L0, L1 or L2.

**This supersedes the six-dimension autonomy scoring invented for this repository.** A working scale already exists, is populated across seventeen agents, and is the author's.

Each agent carries: `ID` · `Domain` · `owner role` · **`proposed ceiling`** · `Data` (permitted sources) · `Actions` (permitted) · `Restrictions` (prohibited).

That structure maps directly onto the agent-definition schema in `PAIOS-CLAUDE-md-draft.md` §12 — `allowed_knowledge_sources`, `allowed_tools`, `prohibited_actions`, `risk_level`. **The roster is that schema, populated.**

### Observed pattern in the ceilings

Inferred from the seventeen definitions. **Not stated in the source — this is a reading, and it needs confirmation ([GAPS](../GAPS.md) B10).**

| Ceiling | Pattern | Agents |
|---|---|---|
| **L0** | Read, collate, report. No drafting that leads to action | `executive_research`, `hr_knowledge`, `business_analytics`, `opportunity_scout` |
| **L1** | Draft, prepare, suggest — a human reviews before effect | `sprint_manager`, `knowledge_curator`, `security_analyst`, `service_desk`, `compliance_reviewer`, `avpb_compiler`, `continuity_qa`, `gallery_curator`, `publishing_producer`, `marketing_planner`, `customer_service` |
| **L2** | Prepare bounded requests against operational systems | `workflow_steward`, `commerce_operator` |

### L0–L2 and T0–T3 are different axes

This matters and must not be collapsed:

- **L0–L2 is an autonomy ceiling** — how far an agent may act before a human is required
- **T0–T3, as drafted here, is a risk classification** — how much control a use case warrants

They are complementary, not competing. A high-risk agent may have a low autonomy ceiling precisely *because* it is high risk. **But this repository invented a second scale without knowing the first existed**, and the correct resolution is the author's, not mine ([GAPS](../GAPS.md) B10).

### Restriction patterns already encoded

The roster's `Restrictions` field already does the work this repository's control matrix was drafted to do — and does it per agent, concretely:

> No calendar commitments without review · No direct connector credentials · No bulk moves, deletion or tenant uploads · No account disabling or firewall changes · No privileged remediation · **No employee decisions or private record inference** · **No legal or certification claims** · Cannot rewrite canon or release masters · No automatic master approval · No unapproved provenance claims · Publishing, prices and refunds require review · **No automatic KDP submission** · No posting or ad spend without review · No autonomous refunds or messages · **No payments; no invented missing revenue** · No applications or personal data submission

Two are worth isolating. `hr_knowledge` is restricted from *"employee decisions or private record inference"* — the employment-domain control this repository's résumé-screener example argues for, already encoded. `compliance_reviewer` is restricted from *"legal or certification claims"* — the same boundary `standards-mapping.md` draws around itself.

**Obsidian is an architectural component.** `knowledge_curator` operates on *"Allowlisted Obsidian notes."* The vault is a governed data source in this system, not merely a personal notebook.

---

## 4. Governance controls in the handoff not present in this framework

`VSCODE-START-HERE.md` §"Reliability and governance" specifies operational controls that are more concrete than anything drafted here. Quoted, not paraphrased:

| Control | Source text |
|---|---|
| **Untrusted input** | *"Incoming text and JSON are untrusted data. Embedded requests do not grant tool permissions. Evaluate approval and classification server-side."* |
| **Claims are not evidence** | *"An agent's reported progress is a source assertion, not independently verified completion."* |
| **Claimed metadata is not policy** | *"Its `contains_pii:false` and `approval:false` claims must not carry over as trusted policy."* |
| **Identity binding** | *"Authenticate reporters and bind identity to the connection; do not trust a claimed source ID."* |
| **Single writer / conflict** | *"Enforce one owner per mutable record and optimistic revision checks; quarantine conflicting updates."* |
| **Handoff leasing** | *"Serialize handoff claims in the service with a lease and expiry to prevent two systems performing the same task."* |
| **Injection defence** | *"Write source-provided strings as RAW values to avoid formula injection."* |
| **Tenant boundary** | *"Preserve tenant boundaries. Only approved summaries of Microsoft organizational data may enter the external coordination layer."* |
| **Failure honesty** | *"A failed source must not appear as zero work, and a failed save must never appear successful."* |
| **Staleness** | *"Separate `observed_at`, `received_at`, source revision and heartbeat. Mark stale data explicitly."* |
| **Least privilege, Gmail** | *"Do not mark read, send, delete, or download attachments by default."* |
| **No credential bypass** | *"Do not bypass authentication or scrape browser sessions."* |

**None of these appear in this repository's framework.** Prompt-injection resistance, provenance and staleness marking, idempotency, and lease-based handoff arbitration are absent from `human-in-the-loop.md` and `governance-model.md` entirely.

The last two rows are the same discipline the author has applied throughout this session: *a failed save must never appear successful*, and *an agent's reported progress is a source assertion, not verified completion.*

---

## 5. What this changes

1. **The autonomy scale is settled and it is not mine.** L0–L2 exists and is populated. The six-dimension autonomy scoring in `classification-framework.md` should be withdrawn or explicitly subordinated.
2. **The control matrix is partly redundant.** The roster's `Data` / `Actions` / `Restrictions` triple already encodes per-agent control at a level this framework's prose does not reach.
3. **The framework is missing the operational half.** It covers lifecycle governance and human oversight. It does not cover untrusted input, injection, idempotency, staleness, identity binding, or conflict arbitration — all of which the active build requires.
4. **Governance is not on hold.** Earlier status recorded PAIOS components as `NOT INSPECTED` with a deferred-level caveat. That was correct for Stack B, but this handoff is **active work with a build sequence and acceptance tests**, dated six days before this assessment.
