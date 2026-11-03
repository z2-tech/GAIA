# Remoção (RothC)

Status: open-points · Depth: light · Round: 1
Updated: 2026-11-03

Soil carbon removal of one plot through the RothC model, comparing business as usual with the project. Built before the standard; these rules were routed from the old vault and wait for a `/discovery` review.

## Sources

- vault note `Sustainability-Metrics`, routed 2026-11-03 (git keeps it)
- task files BE-08, BE-19 to BE-24 of `docs/tasks/`, routed 2026-11-03 (git keeps them)

## Files

| File | What |
|---|---|
| [business-rules/v1.md](business-rules/v1.md) | **current version**: rules RN-n and open points P-n |

## In one page

- Two scenarios, business as usual and project, share climate, parameters, and the monthly window.
- Climate comes only from the farm coordinates.
- Residue comes from yield and harvest index; months with no crop are fallow, with zero plant input.
- Both scenarios cover exactly the declared window; a missing scenario is refused, never copied.

## Open points

- P-1 harvest index and dry matter of fruit and tree crops, pending external methodological validation.
- P-2 what a fertilizer amount means for the calculation, for the product team.
