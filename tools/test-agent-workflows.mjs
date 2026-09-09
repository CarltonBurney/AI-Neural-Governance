#!/usr/bin/env node
// Negative-test harness: extracts each generated workflow's policy code and runs it
// against cases the agent MUST refuse, plus one it must allow.
import { readFileSync, readdirSync } from 'node:fs';
const DIR = new URL('../workflows/n8n/', import.meta.url);
const files = readdirSync(DIR).filter(f => f.endsWith('.json'));

function runPolicy(code, body) {
  const $input = { first: () => ({ json: { body } }) };
  return new Function('$input', code)($input)[0].json;
}

let pass = 0, fail = 0;
const failures = [];
const check = (agent, name, got, want) => {
  const ok = got.decision === want.decision && (!want.reason || got.reason === want.reason);
  ok ? pass++ : (fail++, failures.push(`${agent} / ${name}: got ${got.decision}${got.reason ? '/' + got.reason : ''}, want ${want.decision}${want.reason ? '/' + want.reason : ''}`));
};

for (const f of files) {
  const wf = JSON.parse(readFileSync(new URL(f, DIR)));
  const agent = wf.meta.paiosAgentId;
  const policy = wf.nodes.find(n => n.name === 'Evaluate Policy').parameters.jsCode;

  check(agent, 'valid request allowed',
    runPolicy(policy, { operation: 'summarize', purpose: 'weekly report' }), { decision: 'ALLOW' });
  check(agent, 'missing operation denied',
    runPolicy(policy, { purpose: 'x' }), { decision: 'DENY', reason: 'invalid_request' });
  check(agent, 'missing purpose denied',
    runPolicy(policy, { operation: 'summarize' }), { decision: 'DENY', reason: 'purpose_required' });
  for (const forged of ['approved', 'contains_pii', 'ceiling', 'skip_review']) {
    check(agent, `forged '${forged}' denied`,
      runPolicy(policy, { operation: 'summarize', purpose: 'x', [forged]: true }),
      { decision: 'DENY', reason: 'self_asserted_authorization' });
  }
  // Each declared restriction must produce a refusal when named in the operation.
  for (const r of wf.meta.paiosProhibited) {
    const term = r.toLowerCase().replace(/^(no|cannot|not)\s+/, '').split(/\s+/).find(w => w.length > 4);
    if (!term) continue;
    check(agent, `restriction "${r}" refused`,
      runPolicy(policy, { operation: `please ${term} now`, purpose: 'x' }),
      { decision: 'DENY', reason: 'prohibited_action' });
  }
}

// Structural checks
let struct = 0;
for (const f of files) {
  const wf = JSON.parse(readFileSync(new URL(f, DIR)));
  const names = new Set(wf.nodes.map(n => n.name));
  for (const [from, spec] of Object.entries(wf.connections)) {
    if (!names.has(from)) { fail++; failures.push(`${f}: connection from unknown node ${from}`); }
    for (const branch of spec.main) for (const c of branch)
      if (!names.has(c.node)) { fail++; failures.push(`${f}: connection to unknown node ${c.node}`); }
  }
  if (wf.active !== false) { fail++; failures.push(`${f}: active must be false`); }
  const exec = wf.nodes.find(n => n.name === 'Execute');
  if (!exec?.disabled) { fail++; failures.push(`${f}: Execute node must ship disabled`); }
  struct++;
}

console.log(`policy assertions: ${pass} passed, ${fail} failed`);
console.log(`structural checks:  ${struct} workflows`);
if (failures.length) { console.log('\nFAILURES:'); failures.slice(0, 20).forEach(x => console.log('  ' + x)); }
process.exit(fail ? 1 : 0);
