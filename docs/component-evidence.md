# Component Evidence

> **Evidence-graded.** Every row below carries a source, a date and a grade — INTENT / CLAIM / CODE / TEST / NONE. **This session verified no PAIOS implementation directly**; no PAIOS repository is attached and no code was read or run. A `Current Status - 2026-09-09.md` was **not accessible** and may supersede status rows. See [Sources and Access](../SOURCES-AND-ACCESS.md).

Answers **GAPS B8 and B9 from sources**, not from the owner's memory. Every row cites where the evidence came from and how strong it is.

**Evidence classes:** `SOURCE-STATED` — an owner-authored document asserts it · `SOURCE-DATED` — asserted, with a date that may have moved on · `INFERRED` — my reading, contestable · `NOT FOUND` — searched, no evidence either way · `NOT INSPECTED` — exists but this session cannot reach it

> **`NOT INSPECTED` is not `NOT BUILT`.** Where a repository or local machine is unreachable from this container, that is an access limitation and carries no implication about whether the work exists.

---

## B8 — Purpose Binding and deny precedence

**Answered from sources. No owner recall required.**

| Term | Where it appears | Definition found? |
|---|---|---|
| **Purpose Binding** | `SYSTEM_BASELINE_TEMPLATE.md` → *"Governance Modules"* → `- Purpose Binding: [ ]` | **No** |
| **Deny precedence** | `SYSTEM_BASELINE_TEMPLATE.md` → *"Policy evaluation / deny precedence: [ ]"* | **No** |

**Search performed:** Drive full-text for `Purpose Binding`, `deny precedence`, `purpose_binding`. Returned 30 results, **all Python library internals** (PyTorch/Triton `binding.py`, `function.py`, `constraints.py`) matching on generic tokens. **No PAIOS document defines either term.**

### Finding

Both terms exist **only as unfilled fields in an inspection template.** They are things the author expected to find or intended to build — not specified components. `SYSTEM_BASELINE_TEMPLATE.md` even marks Tool Registry and Execution Gateway as `[found/not found — location]`, confirming the template's purpose is discovery, not specification.

**Correction to this repository's earlier claim.** `STATUS.md` previously stated these constructs were *"more implementable than the prose controls drafted here."* **That was unsupported** — I compared my prose against two field labels with no definitions behind them. Withdrawn.

### Proposed definitions — clearly marked as mine

Offered so the fields can be filled or rejected. **These are proposals, not recovered definitions.**

> **Purpose Binding (PROPOSED).** Every request carries a declared purpose. Data retrieved and tools invoked are authorized *against that purpose*, not against the caller's maximum entitlement. A user permitted to read HR records for a policy question is not thereby permitted to read them for a staffing analysis. Binding is evaluated server-side and re-evaluated when purpose changes mid-session.
>
> *Basis:* the PAIOS §4.9 privacy-by-design instruction not to "collect data merely because it may later become useful," and §4.2 least privilege. Consistent with the agent roster's per-agent `Data` field, which already scopes sources by role.

> **Deny precedence (PROPOSED).** When policies conflict, deny wins — unconditionally, and without an override path in the evaluation engine. An explicit allow never overrides an explicit deny; absence of a rule is deny, not allow. Overrides are a separate, logged, human-authorized action outside the policy evaluator.
>
> *Basis:* PAIOS §4.1 governance-first, and the handoff instruction to "evaluate approval and classification server-side."

Both require the owner's confirmation or rejection. Neither should be treated as PAIOS design until then.

---

## B9 — Component status from evidence

### Primary source

`PAIOS_GOVERNANCE.md` (Drive), YAML front matter `status: ACTIVE`, `phase: 2`, `updated: 2026-05-07`, under the heading **"Current Reality (May 2026)"**.

| Component | Owner-stated status | Date | Grade | Independent evidence available to this session |
|---|---|---|---|---|
| Voice module | WORKING (mic upgrade pending) | 2026-05 | **CLAIM** | None |
| **PAIOS Router** | LIVE — Claude, ChatGPT, Grok active | 2026-05 | **CLAIM + CODE** | `paios_router.py` exists in Drive, 6.2 KB, modified 2026-05-24. **Existence only — not read, not run** |
| **n8n** | INSTALLED — 3 workflows live | 2026-05 | **CLAIM** | None. September 3 says *"if its actual installation is available"* — non-committal. See [conflict 4.1](../SOURCES-AND-ACCESS.md) |
| **Obsidian** | WIRED — Local REST API active | 2026-05 | **CLAIM** | None. Corroborated as *intent* by the roster's `knowledge_curator` scoping "Allowlisted Obsidian notes" |
| YAML metadata | ADDED to all core files | 2026-05 | **CLAIM + CODE** | Front matter is present in recovered files — directly observed |
| ChatGPT | SYNCED via context file | 2026-05 | **CLAIM** | None |
| Grok | ACTIVE | 2026-05 | **CLAIM** | None |
| Perplexity | PENDING KEY | 2026-05 | **CLAIM** | Superseded on this row by 2026-09-03 — see below |
| Daveed AI | PENDING | 2026-05 | **CLAIM** | None |
| Copilot | PENDING AUDIT | 2026-05 | **CLAIM** | None |
| `PAIOS_STARTUP.ps1` / `Register_PAIOS_Startup.ps1` | — | 2026-05 | **CODE** | Files exist, 6.9 / 4.5 KB. Indicate a Windows startup-registered service. **Not read** |

**No row above is verified by this session.** "CLAIM" means the owner asserted it in a dated document; "CODE" means a file that would implement it exists in Drive and was not inspected. Per the owner's rule, implementation requires code or test evidence — only the router, the YAML metadata and the startup scripts have any, and in two cases that is file existence alone.

**Phase tracker (2026-05):** Phase 1 Foundation **COMPLETE** · Phase 2 Operational Brain **ACTIVE** · Phase 3 Agentic Workflows **IN PROGRESS** · Phase 4 Full PAIOS **NOT STARTED**

### Superseding evidence — 2026-09-03

`VSCODE-START-HERE.md`, Command Center shared folder:

| Component | Status | Class |
|---|---|---|
| **Perplexity-hosted dashboard + backend** | **Working. Explicitly to be preserved** | `SOURCE-STATED` |
| Reporting / synchronization pipeline | **Active build, VS Code selected.** Supersedes "development on hold" | `SOURCE-STATED` |
| Gmail bridge | *"proposed adapter, not recovered working code"* | `SOURCE-STATED` |
| `/PAIOS_Core_Sync/Inbound_Emails` path | *"a historical proposal, not a verified directory"* | `SOURCE-STATED` |
| .NET desktop container | Subsequent direction; must not delay the pilot | `SOURCE-STATED` |

**Perplexity moved from PENDING KEY (May) to a working hosted dashboard and backend (September).** The May snapshot is stale on that row. Dates must be read with the status.

### Local software with recorded validation — not inspected here

The owner states the **Command Center**, **résumé generator**, and **SSL monitor** have recorded local validation. This session cannot reach a local Windows machine or the `ssl-certificate-monitor` and related repositories.

| Component | Status | Class |
|---|---|---|
| Command Center | *".NET build and browser navigation/health tests passed"* — but *"three agent panels remain simulations; no complete agent workflow demonstrated"* (2026-09-09) | `NOT INSPECTED` — owner test record |
| Résumé generator | *"Corrected identity/summary handling; four regression tests passed"* (2026-09-09). Not part of the shared packet | `NOT INSPECTED` — owner test record |
| SSL monitor | *"Input/report defects fixed; four tests and a live TLS inspection recorded"* (2026-09-09). **Not yet connected to the command centre** | `NOT INSPECTED` — owner test record |
| `PAIOS_STARTUP.ps1`, `Register_PAIOS_Startup.ps1` | Present in Drive (6.9 KB / 4.5 KB) — indicates a Windows startup-registered service | `SOURCE-STATED` |

**These are built and locally validated per the owner, and are distinct from the deferred local-model stack.** The deferral in `GAPS` B7 concerns the *local LLM/vector* architecture awaiting hardware — **not** this existing local software.

### Stack B component matrix — corrected

`CURRENT_STATE_MATRIX_TEMPLATE.md` components, with evidence rather than blanket "not inspected":

| Component | Class | Evidence |
|---|---|---|
| Command Center shell | `NOT INSPECTED` | Owner reports local validation; handoff ZIPs in Drive |
| Local LLMs — Ollama detection | `NOT FOUND` | No Ollama reference in any document read. Belongs to the deferred stack |
| Local LLMs — OpenAI-compat endpoint | `NOT FOUND` | Router is live for hosted models; local endpoint unevidenced |
| Local LLMs — enumeration / health | `NOT FOUND` | — |
| Agent Lab — agent registry | **`SOURCE-STATED` (definitions)** | `agent-roster.md`: 17 agents. Header: *"Definitions only; no live agents are asserted"* |
| Agent Lab — execution path | `NOT FOUND` | — |
| Agent Lab — governance integration | `NOT FOUND` | The gap this repository addresses |
| Agent Lab — run history | `NOT FOUND` | Handoff specifies normalized activity history as **to be built** |
| Operations — health / error surfacing | `NOT INSPECTED` | — |
| Command Center — aggregation | **Active build** | Handoff §"What to build" |
| Governance Core | `NOT FOUND` | Named in a ChatGPT-export strategy doc; **no specification located** |
| Tool Registry | `NOT FOUND` | Template marks it `[found/not found]` |
| Execution Gateway | `NOT FOUND` | Template marks it `[found/not found]` |
| Data stores | **SQLite specified** for the pilot | Handoff: dedup, checkpoints, retry state |

### Not component evidence

`3rd_party_integrations.txt` (998 KB) is a directory dump of **Meta's `llama-recipes` `3p-integrations` cookbooks** — AWS Bedrock, Azure MaaS, Groq, Crusoe vLLM, e2b. Third-party reference material. One incidental `audit` string; **no PAIOS architecture, no governance content.** It should not be read as an integration inventory.

`PAIOS_Universal_Governance_Layer_CrossPlatform.md` carries `source: chatgpt_manual_export`, `status: ingested`. **Strategy and positioning ideation, not specification.** Its "Neural Governance Core → Identity + Role Control, Policy Engine, Risk Engine, Audit Engine" is a diagram in a strategy note; no implementing spec was found.

### Terminology conflict

`PAIOS_GOVERNANCE.md` (2026-05) calls PAIOS *"a personal AI operating system."* `PAIOS-CLAUDE-md-draft.md` (2026-07) states explicitly: *"Do not describe PAIOS as an AI Operating System unless discussing historical terminology. In this project, 'OS' means Orchestration System."* **The July instruction is later and explicit; the May usage is the historical terminology it refers to.**
