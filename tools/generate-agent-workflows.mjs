#!/usr/bin/env node
// Generates one n8n workflow per agent from agents/registry.json.
// Regenerate after any template change: node tools/generate-agent-workflows.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const reg = JSON.parse(readFileSync(new URL('../agents/registry.json', import.meta.url)));
const OUT = new URL('../workflows/n8n/', import.meta.url);
mkdirSync(OUT, { recursive: true });

// Deterministic ids so regeneration produces stable diffs.
const uid = (s) => createHash('sha1').update(s).digest('hex').slice(0, 16);

function node(agent, name, type, params, [x, y], extra = {}) {
  return {
    parameters: params,
    id: uid(`${agent.id}:${name}`),
    name,
    type,
    typeVersion: extra.typeVersion ?? 1,
    position: [x, y],
    ...(extra.rest || {}),
  };
}

function buildWorkflow(agent, ceilings) {
  const c = ceilings[agent.ceiling];
  const gate = c.humanGate;

  // --- Policy evaluated server-side. Deny precedence: an explicit deny is final.
  const policyCode = `
// Agent: ${agent.id}  Ceiling: ${agent.ceiling} (${c.label})
// Governance: incoming payload is UNTRUSTED DATA. Fields inside it never grant permission.
const AGENT = ${JSON.stringify({
    id: agent.id, ceiling: agent.ceiling, owner: agent.owner,
    allowedData: agent.data, allowedActions: agent.actions,
    prohibited: agent.restrictions,
  }, null, 2)};

const body = $input.first().json.body ?? {};
const deny = (reason, detail) => ({ json: {
  decision: 'DENY', agent: AGENT.id, ceiling: AGENT.ceiling,
  reason, detail: detail ?? null, at: new Date().toISOString(),
}});

// 1. Schema
if (typeof body.operation !== 'string' || !body.operation.trim()) {
  return [deny('invalid_request', 'operation is required')];
}
if (body.purpose === undefined || String(body.purpose).trim() === '') {
  return [deny('purpose_required', 'purpose binding: every request must declare a purpose')];
}

// 2. Claims in the payload are NOT policy. Ignore any self-asserted authorization.
for (const forged of ['approved', 'approval', 'contains_pii', 'ceiling', 'authorized', 'skip_review']) {
  if (forged in body) {
    return [deny('self_asserted_authorization',
      \`payload attempted to set '\${forged}'; approval and classification are evaluated server-side only\`)];
  }
}

// 3. Prohibited actions — deny precedence, no override path here.
const text = \`\${body.operation} \${body.detail ?? ''}\`.toLowerCase();
const PROHIBITED_TERMS = ${JSON.stringify(
    agent.restrictions.flatMap(r =>
      r.toLowerCase()
        .replace(/^(no|cannot|not)\s+/, '')
        .replace(/\s+(without|requires)\s+review$/, '')
        .split(/\s+/).filter(w => w.length > 4)
    ).filter((v, i, a) => a.indexOf(v) === i)
  )};
const hit = PROHIBITED_TERMS.find(t => text.includes(t));
if (hit) {
  return [deny('prohibited_action',
    \`matched restriction term '\${hit}'. Declared restrictions: \${AGENT.prohibited.join('; ')}\`)];
}

// 4. Allow, carrying the gate this ceiling requires.
return [{ json: {
  decision: 'ALLOW',
  agent: AGENT.id,
  ceiling: AGENT.ceiling,
  humanGate: ${JSON.stringify(gate)},
  operation: body.operation,
  purpose: body.purpose,
  requestId: body.requestId ?? \`\${AGENT.id}-\${Date.now()}\`,
  receivedAt: new Date().toISOString(),
  observedAt: body.observedAt ?? null,
  payload: body,
}}];
`.trim();

  const auditCode = `
// Append-only audit record. Records the decision, never the full payload.
const d = $input.first().json;
return [{ json: {
  auditVersion: 1,
  requestId: d.requestId ?? null,
  agent: ${JSON.stringify(agent.id)},
  ceiling: ${JSON.stringify(agent.ceiling)},
  decision: d.decision,
  reason: d.reason ?? null,
  operation: d.operation ?? null,
  purpose: d.purpose ?? null,
  humanGate: d.humanGate ?? null,
  outcome: d.decision === 'ALLOW'
    ? (${JSON.stringify(gate)} === 'none' ? 'executed' : 'held_for_human')
    : 'denied',
  receivedAt: d.receivedAt ?? new Date().toISOString(),
  recordedAt: new Date().toISOString(),
}}];
`.trim();

  const executeCode = `
// EXECUTOR — INTENTIONALLY INERT.
// Per PAIOS agent-definition schema, agents ship disabled: {"enabled": false}.
// Wire the real action here only after: the ceiling's human gate is implemented and
// tested, credentials are in a secret store (never in this workflow), and a negative
// test proves each declared restriction is actually refused.
const d = $input.first().json;
return [{ json: { ...d,
  executed: false,
  executorStatus: 'NOT_IMPLEMENTED',
  note: 'No outbound action is wired. This agent cannot take effect until explicitly built and tested.',
}}];
`.trim();

  const nodes = [
    node(agent, 'Webhook', 'n8n-nodes-base.webhook', {
      httpMethod: 'POST',
      path: `agent/${agent.id}`,
      responseMode: 'lastNode',
      options: {},
    }, [0, 300], { typeVersion: 2 }),

    node(agent, 'Evaluate Policy', 'n8n-nodes-base.code', {
      jsCode: policyCode,
    }, [220, 300], { typeVersion: 2 }),

    node(agent, 'Allowed?', 'n8n-nodes-base.if', {
      conditions: {
        options: { caseSensitive: true, version: 2 },
        conditions: [{
          id: uid(`${agent.id}:cond`),
          leftValue: '={{ $json.decision }}',
          rightValue: 'ALLOW',
          operator: { type: 'string', operation: 'equals' },
        }],
        combinator: 'and',
      },
      options: {},
    }, [440, 300], { typeVersion: 2 }),
  ];

  let execX = 660;
  if (gate !== 'none') {
    nodes.push(node(agent, 'Hold For Human Review', 'n8n-nodes-base.code', {
      jsCode: `
// Ceiling ${agent.ceiling} requires: ${gate}
// The agent MUST NOT take effect until a human decides. This node stops the flow.
const d = $input.first().json;
return [{ json: { ...d,
  status: 'AWAITING_HUMAN',
  gate: ${JSON.stringify(gate)},
  reviewer: ${JSON.stringify(agent.owner)},
  note: 'Route to the review queue. No effect until a reviewer approves.',
}}];`.trim(),
    }, [execX, 220], { typeVersion: 2 }));
    execX += 220;
  }

  nodes.push(node(agent, 'Execute', 'n8n-nodes-base.code', { jsCode: executeCode },
    [execX, 220], { typeVersion: 2, rest: { disabled: true } }));
  nodes.push(node(agent, 'Audit Log', 'n8n-nodes-base.code', { jsCode: auditCode },
    [execX + 220, 300], { typeVersion: 2 }));
  nodes.push(node(agent, 'Denied', 'n8n-nodes-base.code', { jsCode: auditCode },
    [660, 420], { typeVersion: 2 }));

  const connections = {
    Webhook: { main: [[{ node: 'Evaluate Policy', type: 'main', index: 0 }]] },
    'Evaluate Policy': { main: [[{ node: 'Allowed?', type: 'main', index: 0 }]] },
    'Allowed?': {
      main: [
        [{ node: gate !== 'none' ? 'Hold For Human Review' : 'Execute', type: 'main', index: 0 }],
        [{ node: 'Denied', type: 'main', index: 0 }],
      ],
    },
    Execute: { main: [[{ node: 'Audit Log', type: 'main', index: 0 }]] },
  };
  if (gate !== 'none') {
    connections['Hold For Human Review'] = { main: [[{ node: 'Execute', type: 'main', index: 0 }]] };
  }

  return {
    name: `PAIOS — ${agent.name} (${agent.ceiling})`,
    nodes,
    connections,
    active: false,
    settings: { executionOrder: 'v1' },
    tags: [
      { name: `paios` }, { name: `domain:${agent.domain.toLowerCase()}` },
      { name: `ceiling:${agent.ceiling}` },
    ],
    meta: {
      paiosAgentId: agent.id,
      paiosCeiling: agent.ceiling,
      paiosOwner: agent.owner,
      paiosAllowedData: agent.data,
      paiosAllowedActions: agent.actions,
      paiosProhibited: agent.restrictions,
      generatedBy: 'tools/generate-agent-workflows.mjs',
      sourceRoster: 'agent-roster.md 2026-09-03 (documented intent; no live agents asserted)',
    },
  };
}

let n = 0;
for (const agent of reg.agents) {
  const wf = buildWorkflow(agent, reg.ceilings);
  writeFileSync(new URL(`${agent.id}.json`, OUT), JSON.stringify(wf, null, 2) + '\n');
  n++;
}
console.log(`generated ${n} workflows -> workflows/n8n/`);
