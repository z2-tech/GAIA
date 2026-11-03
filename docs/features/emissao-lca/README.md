# Emissão (LCA)

Status: open-points · Depth: light · Round: 1
Updated: 2026-11-03

Emissions of one crop on one plot through LCA (life cycle assessment): a step by step form, a calculation, clone, and delete. Built before the standard; these rules were routed from the old vault and wait for a `/discovery` review.

## Sources

- vault notes `Sustainability-Metrics` and `Completion-Flow`, routed 2026-11-03 (git keeps them)
- meeting 2026-09-01 (annual soil management, net, comparison)
- task files of `docs/tasks/` (BE-07, BE-18, BE-27 to BE-40), routed 2026-11-03 (git keeps them)

## Files

| File | What |
|---|---|
| [business-rules/v1.md](business-rules/v1.md) | **current version**: rules RN-n and open points P-n |

## In one page

- Transport is the fifth, required step; a missing value is never zero.
- Land use change is picked from selects; carbon stocks come from a reference table.
- Annual soil management rewards the present practice; net = emissions minus removals, and can be negative.
- Factors (product, electricity, transport 0.1470 per km) belong to the platform; the user enters activity and evidence.

## Open points

- P-1 whether transport counts for completeness; P-2 the 0.5 total factor of land use change; P-3 LCA method and factor sources not yet checked. All for the product team at the next `/discovery emissao-lca` round.
