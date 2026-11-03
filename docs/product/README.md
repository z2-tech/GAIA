# GAIA: product

GAIA is the sustainability metrics platform for farm projects. Per plot it calculates Emissão, Remoção, Regenerativo, and Biodiversidade, for project owners, their technicians, and the auditors who verify the results. Owner: Peterson product team (Paulo Rocha, Ruan Carlos Oliveira), to confirm. Last review: 2026-11-03.

| File | What |
|---|---|
| [rules.md](rules.md) | product rules `RP-n` |

## Roles

| Role | Who | What they do |
|---|---|---|
| Project owner | the client's admin or manager | registers projects, farms, and plots, and closes a cut |
| Technician | the client's field team | fills the calculations of each module |
| Auditor | invited per project | reads one project and verifies or sends back its closings |

## Modules

| Module | Feature | Status |
|---|---|---|
| Emissão (LCA, life cycle assessment) | [`emissao-lca`](../features/emissao-lca/README.md) | open-points |
| Remoção (RothC soil carbon model) | [`remocao-rothc`](../features/remocao-rothc/README.md) | open-points |
| Regenerativo (weighted indicators of regenerative practice, with a score dashboard) | [`regenerativo`](../features/regenerativo/README.md) | settled |
| Biodiversidade (BAT questionnaire) | [`biodiversidade`](../features/biodiversidade/README.md) | settled |
| CFP (Cool Farm Platform) | no feature folder yet (`docs/scope.md` row 10) | |
| Comparação | [`comparacao`](../features/comparacao/README.md) | settled |
| Fechamento (closing a cut) | [`fechamento`](../features/fechamento/README.md) | settled |
