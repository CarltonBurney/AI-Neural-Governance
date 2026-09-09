# Worked Examples

> **Constructed teaching scenarios.** They demonstrate how the framework reasons about a case. They are **not** case studies, and they are **not** evidence that this framework has been operated. Documented public incidents are kept separate, in [Sources](../docs/sources.md); the author's own operating history is not represented anywhere in this repository — see [GAPS.md](../GAPS.md) §A.

A framework reads as generic until a real case runs through it. Each example carries a full intake, dimensional scoring with justifications, the tier determination and the argument that was had about it, the controls applied, and what monitoring caught afterward.

| Example | Tier | The interesting part |
|---|---|---|
| [1 — Customer Support Agent](01-customer-support-agent.md) | T1 → T2 | The tier forced a redesign of the autonomy boundary rather than a reclassification argument. A vendor model update later caused a SEV2 by making the agent *more* confident — falling escalation rates read as improvement and were the opposite. |
| [2 — Résumé Screener](02-resume-screener.md) | T1 | Low autonomy, high consequence — the case most frameworks under-classify. Proxy discrimination caught at Gate 4 before launch. Then 100% human review was measured and found to be producing unreviewed rejections at scale. |
| [3 — Code Assistant](03-code-assistant.md) | T3 → T1 | The deliberately light path, and what happened when a vendor feature toggle turned an approved T3 tool into an autonomous agent opening pull requests against customer-data services. |

## The through-line

All three turn on the same principle: **classification is a property of current behavior, not of the intake form.** Example 1 changed its behavior to earn a lower tier. Example 2 changed its interface when measurement showed the oversight was nominal. Example 3 had its behavior changed *for* it by a vendor, and the framework's failure was detection latency, which is what got amended.
