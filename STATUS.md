# Component Status

**Scope of this assessment — read first.**

| | |
|---|---|
| Path assessed | `/home/user/AI-Neural-Governance` (ephemeral Linux container) |
| Remote | `https://github.com/CarltonBurney/AI-Neural-Governance` |
| Branch | `claude/obsidian-test-drive-f13v37` |
| Commit at start of work | `73e8d2b` |
| Refs visible | `main`, `claude/obsidian-test-drive-f13v37` — **these two only** |
| Clone date | 2026-09-09 |

**This assessment covers one repository. It is not an assessment of any wider body of work.**

An earlier version of this analysis stated the project was "roughly 5% complete." **That figure is withdrawn.** It had no defined denominator — no scope statement, no milestone list, no agreed definition of "done" — and it silently generalized from one sparse checkout to an entire programme. Word count in one repository is not a completion percentage of anything.

## Inaccessible ≠ missing

The following were requested and **could not be read**. This is an access limitation, not evidence that the work does not exist:

| Requested | Result |
|---|---|
| `PAIOS-Ramp-Up/remediation/external/PROGRESS.md` | Not found on this filesystem |
| `vscode-handoff/CLAUDE-LOGIC-ERROR-REPORT.md` | Not found on this filesystem |
| `C:/Users/paios/OneDrive/...` | **Windows path.** This container runs Ubuntu 24.04 on Linux 6.18. No `/mnt/c`, no Windows mount, no OneDrive access |
| Obsidian vault | No access from this environment |
| Other repositories, staging copies, recovered hosted sources | Not attached to this session |

Referenced but unassessed elsewhere: 28 extracted Word documents, 21 preserved narratives, command-center and résumé code, recovered hosted repositories, SSL-monitor repairs, four n8n candidates. **None of these were visible to this session and none is evaluated here.**

To bring any of it into scope: push to a branch on an attached repository, or paste the content directly.

---

## Components in this repository

**"Tested" means a check was actually executed in this session and its result observed.** Documentation cannot be "tested" in a software sense; the column records what verification was genuinely performed.

| Component | Implementation | Verification actually performed | Missing dependencies | Next action |
|---|---|---|---|---|
| `docs/classification-framework.md` | Complete draft — tiers, scoring, overrides, control matrix, exceptions | Internal links resolve. **Content unreviewed by any subject-matter expert** | Calibration values (GAPS C1–C6); organizational context (B1–B6) | Human review of tier logic |
| `docs/governance-model.md` | Complete draft — bodies, RACI, 8 gates, retention, incidents | Links resolve | Org structure unknown; retention periods are placeholders | Confirm bodies match a real org (B1) |
| `docs/human-in-the-loop.md` | Complete draft | Links resolve; claims re-checked against EUR-Lex | **All thresholds unset** | Calibrate (C1–C3) |
| `docs/standards-mapping.md` | Complete draft crosswalk | Article numbers/titles verified against EUR-Lex and AI Act Explorer | Not a conformity assessment; no legal review | Legal review before any external use |
| `docs/sources.md` | Complete | Sources fetched and quoted this session | — | Extend as new claims added |
| `docs/source-to-claim-map.md` | Complete | Built by re-auditing each rule against its cited source | — | Re-audit whenever a rule changes |
| `architecture/diagrams/` ×4 | Complete | **All 4 rendered AND all 4 visually inspected.** Defects found in 02 and 04 were fixed and re-inspected | — | — |
| `architecture/workflows/` ×2 | Complete draft; 1 sequence diagram | Sequence diagram rendered; **not visually inspected** | — | Inspect the sequence diagram render |
| `examples/` ×3 | Constructed scenarios; invented metrics removed | Manual scan for residual invented precision | **Real experience (GAPS A1–A7)** | Replace with real material if it exists |
| `templates/` ×3 | Complete drafts | Not exercised — no one has filled one in | — | Pilot the intake form on one real case |
| `GAPS.md` | Complete — 29 open questions | — | Answers | Q&A session |
| `STATUS.md` | This file | — | — | Update as components change |

## Honest characterization

| Claim | Status |
|---|---|
| Framework documents exist and are internally consistent | **Supported** |
| Regulatory citations are accurate | **Verified** against EUR-Lex, 2026-09-09 |
| Diagrams render and are legible | **Verified** — all four inspected |
| The framework demonstrates governance reasoning | **Supported** |
| The framework has been operated | **NOT supported.** Nothing here has been used on a real system |
| The author has operational governance experience | **NOT established by this repository.** See GAPS §A |
| The framework is compliant with the EU AI Act | **NOT established.** A mapping is not a conformity assessment |
| The framework is adopted policy | **NO.** Every rule is a proposal until an organization adopts it |
| This repository is production-ready | **NO** |
| This represents the whole of the author's work | **NO — one repository only** |
