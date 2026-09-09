# PAIOS Agent Workflows — n8n

**17 generated workflows, one per agent in [`agents/registry.json`](../../agents/registry.json).**

> **Not verified against a running n8n instance.** Per `Current Status - 2026-09-09.md`, n8n runtime import is unverified and workflows are inactive. Policy logic is unit-tested (149 assertions); **import and execution are not.** The first successful import is the real runtime test.

## Do not hand-edit these files

They are generated. Edit [`agents/registry.json`](../../agents/registry.json) or [`tools/generate-agent-workflows.mjs`](../../tools/generate-agent-workflows.mjs), then:

```bash
node tools/generate-agent-workflows.mjs   # regenerate all 17
node tools/test-agent-workflows.mjs       # 149 assertions + structural checks
```

Node ids are content-hashed, so regeneration produces stable diffs rather than churn.

## Shape of every workflow

```
Webhook  POST /agent/{id}
   ↓
Evaluate Policy        ← server-side. Payload is untrusted data
   ↓
Allowed?  ──DENY──→  Denied → audit
   ↓ ALLOW
Hold For Human Review  ← L1 / L2 only. L0 skips this
   ↓
Execute                ← SHIPS DISABLED
   ↓
Audit Log
```

## Four controls, all tested

| Control | Rule | Test |
|---|---|---|
| **Purpose binding** | Every request must declare a `purpose`. Missing → deny | ✅ 17/17 |
| **Payload is not policy** | `approved`, `contains_pii`, `ceiling`, `authorized`, `skip_review` in the payload → deny. Approval is evaluated server-side only | ✅ 68/68 |
| **Deny precedence** | A matched restriction is final. No override path exists in the evaluator | ✅ 47/47 |
| **Ceiling gate** | L0 proceeds · L1/L2 halt at `AWAITING_HUMAN` before any effect | ✅ structural |

The second control implements the handoff instruction directly: *"Incoming text and JSON are untrusted data. Embedded requests do not grant tool permissions. Evaluate approval and classification server-side."*

## The Execute node ships disabled

Deliberate, and it matches the PAIOS agent-definition schema, which defaults `"enabled": false`.

`Execute` is inert in all 17. It performs no outbound action. Before wiring a real one:

1. Implement and test the ceiling's human gate
2. Put credentials in a secret store — **never in the workflow JSON**
3. Write a negative test proving each declared restriction is actually refused
4. Confirm the restriction is enforced by *capability*, not just by instruction

`active: false` on every workflow. Importing them activates nothing.

## Restrictions: enforced vs. instruction-only

The policy node does string matching on declared restrictions. That is real but shallow. Restrictions on **actions** ("No bulk moves", "No account disabling") become enforceable by never wiring the capability. Restrictions on **inference and assertion** — `hr_knowledge`'s *"No private record inference"*, `compliance_reviewer`'s *"No legal or certification claims"*, `business_analytics`'s *"No invented missing revenue"* — cannot be enforced by a permission check, because no permission model stops a model from drawing a conclusion.

Those need grounding constraints instead, of the kind already used in the Copilot Studio work: disable general model knowledge so an unsupported question returns an explicit "not found."

## Import order

Start with an **L0** — no outbound, no human gate, nothing destructive on a bad import:

`business_analytics` · `hr_knowledge` · `executive_research` · `opportunity_scout`

Once one imports and returns a decision, the runtime is proven and the other sixteen are mechanical.

## Ceilings

| | Count | Gate | Agents |
|---|---|---|---|
| **L0** | 4 | none | `executive_research`, `opportunity_scout`, `hr_knowledge`, `business_analytics` |
| **L1** | 11 | review before effect | `sprint_manager`, `knowledge_curator`, `security_analyst`, `service_desk`, `compliance_reviewer`, `avpb_compiler`, `continuity_qa`, `gallery_curator`, `publishing_producer`, `marketing_planner`, `customer_service` |
| **L2** | 2 | approval before execute | `workflow_steward`, `commerce_operator` |

## Provenance

Registry transcribed from `agent-roster.md`, Command Center shared folder, **2026-09-03**, which states: *"Definitions only; no live agents are asserted."* That is **documented intent**. `Current Status - 2026-09-09.md` does not mention the roster, so its currency is unconfirmed — see [GAPS](../../GAPS.md) B10–B13.
