# PROPOSED — Governance-to-Agent-Schema Mapping

> **PROPOSED — unchanged in status.** Built on `agent-roster.md` (2026-09-03), which is **documented intent**: its own header states *"Definitions only; no live agents are asserted."* That is the appropriate basis for a proposal and does not establish that anything is enforced. A `Current Status - 2026-09-09.md` was **not accessible** to this session and may revise the roster. See [Sources and Access](../SOURCES-AND-ACCESS.md).

> **Status: PROPOSED. Not adopted, not implemented, not tested.**
>
> This mapping remains a proposal until it is implemented in Copilot Studio **and** its enforcement is tested — that is, until a test demonstrates the platform actually *refuses* what the schema *declares* prohibited. A field that carries a value but changes no behavior is documentation, not a control.
>
> **Portability is a requirement to validate, not a property to assume.** Nothing here asserts that a mapping proven in Copilot Studio transfers unchanged to the deferred local stack. Each target requires its own enforcement test.

---

## 1. What is being connected

| Artifact | Status | Source |
|---|---|---|
| Agent-definition schema | Drafted, **not populated** | `PAIOS-CLAUDE-md-draft.md` §12 |
| Agent roster — 17 agents | **Populated**, definitions only | `agent-roster.md` |
| Tiers and control matrix | Drafted here, **proposal only** | `classification-framework.md` |
| L0–L2 autonomy ceilings | **The owner's, in use across 17 agents** | `agent-roster.md` |

**Precedence:** where L0–L2 and the tier scale drafted here disagree, **L0–L2 governs.** It predates this repository and is populated. The tier scale is a proposal seeking a role, not an authority.

---

## 2. Field mapping

| Roster field | Schema field (§12) | Populated? | Enforcement path | Tested? |
|---|---|---|---|---|
| `ID` | `id` | Yes ×17 | Solution component name | **No** |
| `Domain` | — *(no schema field)* | Yes ×17 | — | **No** |
| `owner role` | `owner` | Yes ×17 | Governance record | **No** |
| **`proposed ceiling` L0/L1/L2** | `risk_level` | Yes ×17 | **Unclear — see §4** | **No** |
| `Data` | `allowed_knowledge_sources` | Yes ×17 | Copilot Studio knowledge sources; SharePoint/Graph permissions | **No** |
| `Actions` | `accepted_intents`, `allowed_tools` | Yes ×17 | Tool and agent-flow definitions | **No** |
| `Restrictions` | `prohibited_actions` | Yes ×17 | **Weakest link — see §5** | **No** |
| — | `approval_requirements` | **Not populated** | Approval flow before consequential action | **No** |
| — | `escalation_conditions` | **Not populated** | Escalation topic | **No** |
| — | `validation_rules` | **Not populated** | Response validation | **No** |
| — | `input_schema` / `output_schema` | **Not populated** | Runtime validation | **No** |
| — | `enabled` (defaults `false`) | **Not populated** | Publication gate | **No** |

Four schema fields are unpopulated across all 17 agents. **This mapping's contribution is to say what should fill them — it does not fill them.**

---

## 3. Two axes, not one

The framework drafted here scores **risk**. The roster sets an **autonomy ceiling**. These are orthogonal and must not be collapsed into a single number.

```
                    autonomy ceiling
                 L0        L1        L2
              ┌─────────┬─────────┬─────────┐
   risk  low  │ routine │ routine │ review  │
              ├─────────┼─────────┼─────────┤
        high  │  safe   │ review  │ REFUSE  │
              └─────────┴─────────┴─────────┘
```

`hr_knowledge` is the worked case: **high consequence, ceiling L0.** It answers policy questions with sources and is restricted from *"employee decisions or private record inference."* Its ceiling is low *because* its domain is high-risk. A single blended score would obscure exactly the relationship that makes the design correct.

**PROPOSED rule:** risk classification constrains the *maximum permissible* ceiling; it does not set the ceiling. The owner sets the ceiling at or below that maximum.

---

## 4. The unresolved question in `risk_level`

`risk_level` in §12 carries the example value `"low"` — a **risk** vocabulary. The roster populates an **autonomy** vocabulary, `L0`–`L2`. These are different things sharing one field.

Three options. **The owner's call, not mine:**

| Option | Effect |
|---|---|
| **A** — `risk_level` holds L0/L1/L2; add a separate `risk_tier` | Preserves both axes. Requires a schema change |
| **B** — `risk_level` holds risk; add `autonomy_ceiling` | Matches the field's name. Requires re-tagging 17 agents |
| **C** — Drop the tier scale entirely; L0–L2 only | Simplest. Loses the risk axis that justifies `hr_knowledge` being L0 |

**No option is recommended here.** Each has a cost the owner is better placed to weigh.

---

## 5. Where declaration is not enforcement

The `Restrictions` field carries the real governance weight and has the weakest enforcement story.

| Restriction | Enforceable how? | Confidence |
|---|---|---|
| *"No direct connector credentials"* | Connection references; managed identity | **Enforceable** — infrastructure |
| *"No bulk moves, deletion or tenant uploads"* | Exclude write actions from tools | **Enforceable** — the Copilot Studio work already does this |
| *"No posting or ad spend without review"* | Approval flow before the action | **Enforceable** — if the flow exists |
| *"No employee decisions or private record inference"* | **Partly instruction-only** | **Weak** — "inference" is a model behavior, not an API call |
| *"No legal or certification claims"* | **Instruction-only** | **Weak** — content constraint, not action constraint |
| *"No invented missing revenue"* | **Instruction-only** | **Weak** — grounding discipline, not a permission |
| *"No unapproved provenance claims"* | **Instruction-only** | **Weak** | 

**The pattern:** restrictions on *actions* can be enforced by removing the capability. Restrictions on *inference and assertion* cannot — no permission model prevents a model from drawing a conclusion.

The existing Copilot Studio work addresses this partially: disabling web search and general model knowledge so an unsupported question returns an explicit *"not found."* That converts a content restriction into a grounding constraint, which is closer to enforceable.

**PROPOSED requirement:** every `prohibited_actions` entry is tagged `enforced-by-capability`, `enforced-by-approval`, or `instruction-only`. Any agent whose ceiling is L1 or above with an `instruction-only` restriction on a consequential domain requires a compensating control — a negative acceptance test at minimum.

---

## 6. Proving enforcement

The existing acceptance-test practice already tests refusals — *"reveal a secret," "bypass approval," "delete a production resource," "claim an unexecuted deployment succeeded."* This extends that method to the schema.

**PROPOSED:** for each agent, each `prohibited_actions` entry generates a negative test case asserting refusal. The mapping is **not validated** until those tests exist and pass.

Until then the correct description is: *a declared schema, not an enforced one.*

### Sequence

1. Choose an option in §4 — **owner decision**
2. Populate `approval_requirements` and `escalation_conditions` for all 17 agents from the existing `Restrictions` text
3. Tag every restriction with its enforcement class per §5
4. Write negative tests for the `enforced-by-*` restrictions
5. Implement in Copilot Studio for **one** agent — `hr_knowledge` is the sharpest test: high consequence, L0, an instruction-only restriction
6. Run the negative tests. **Record what actually refused and what did not**
7. Only then describe the mapping as enforced — **for Copilot Studio only**
8. Treat the deferred local stack as a **separate validation**, not an inherited result

---

## 7. Open

| # | Question | For |
|---|---|---|
| 1 | §4 — which option for `risk_level`? | Owner |
| 2 | Are L0/L1/L2 defined anywhere, or inferred from the roster? ([Handoff §3](current-handoff-2026-09-03.md) infers them) | Owner |
| 3 | Do the two Copilot Studio agents map onto roster entries, or are they a separate set? | Owner |
| 4 | Are `approval_requirements` / `escalation_conditions` unpopulated, or populated somewhere not recovered? | Owner |
