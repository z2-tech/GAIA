# Understanding: fechamento

Sources: meeting [2026-09-29 Peterson strategy and next features](../../meetings/2026-09-29-peterson-strategy-next-features/minutes.md), topic 8 (38:08 to 42:28), with the auditor stretch of topic 9 (50:16) as a dependency.

## The request

- Henrique asked whether the project number accumulates every farm, plot and calculation; Paulo: "teria que ser uma média, né, de uma média da fazenda" [2026-09-29 38:08, 38:16]
- Henrique: calculations exist so the user can play and project; the platform needs the value the user really uses, "o cara selecionar lá um cálculo e falar: esse é o real", per plot, farm and project; the rest are simulations [2026-09-29 38:24, 39:24]
- Paulo: a project starts from a baseline and simulations sit on top of it; when the corn is sold, "eu não mando com essas simulações", only the carbon footprint at that moment and the carbon stock at that moment, maybe plus 5 years for stock; "eu quero o dado preciso para a foto daquele momento" [2026-09-29 39:44]
- Henrique: the user simulates whenever they want, "mas quando ele fechar, ele seleciona só as que ele quer realmente para vender" [2026-09-29 40:56]
- Paulo: verification is done on the real data, "com a foto daquele momento"; Control Union verifies inside the platform, then the dashboard and the QR code are generated [2026-09-29 41:12]
- Paulo recalls an earlier talk about "um ambiente para fazer verificação" [2026-09-29 41:12]
- The auditor sees the calculations "que o usuário definiu como o cálculo final, o cálculo real e não é teste", with every input [2026-09-29 50:16]

## Already settled

| Where | Rule or question |
|---|---|
| none | No feature in `docs/features/` has business rules yet, and `docs/domain/` and `docs/product/` do not exist |

## What exists

`A` = `gaia-api/`, `W` = `gaia-web/`.

- Only Regenerativo has a "real" calculation: `is_primary`, one per project farm, not per plot (`A/regenerative/models.py:93`, constraint at `A/regenerative/models.py:98-103`). The first assessment becomes primary on its own (`A/regenerative/services.py:85-88`); canceling the primary promotes the newest (`A/regenerative/services.py:194-215`)
- The set primary endpoint exists (`A/regenerative/urls.py:17`) but gaia-web never calls it; web reads the primary, else the first one (`W/src/services/regenerative/regenerative.query.ts:22-23`)
- LCA (Emissão), RothC (Remoção), Biodiversidade and CFP (Cool Farm Tool) have no such flag (`A/lca/models.py:171-200`, `A/rothc/models.py:40-83`, `A/biodiversity/models.py:21-38`, `A/cfp/models.py:6-30`)
- No snapshot exists. LCA overwrites its single result on recalculation and hard deletes it on cancel (`A/lca/services.py:820-827`, `A/lca/services.py:1148-1171`); RothC deletes and recreates its monthly results on update (`A/rothc/services.py:1310-1312`); the Regenerativo score is computed on read from the current weights (`A/regenerative/services.py:284-296`)
- Emission factor catalogs have no version, and a stored LCA result does not record the factors it used (`A/lca/models.py:15-32`, `A/lca/services.py:819-826`)
- Periods: LCA has only `harvest_year`, and its `plot_id` and `project_farm_id` are plain integers, not foreign keys (`A/lca/models.py:173-176`). RothC receives a start and end month and year but stores the window only through monthly results and crop cycles (`A/rothc/services.py:1006-1028`, `A/rothc/models.py:106-108`). Regenerativo, Biodiversidade, CFP and the project have no year (`A/regenerative/models.py:60-93`, `A/biodiversity/models.py:21-38`, `A/projects/models.py`)
- `auto_complete_project` sets the project `completed` at 100% completeness and back to `in_progress` below it, after every LCA and RothC write (`A/projects/services.py:78-91`)
- No calculation has a write lock, not even in a completed project (no guard in `A/lca`, `A/rothc`, `A/regenerative`, `A/biodiversity`, `A/cfp`)
- No weighted mean or farm or project consolidation exists; the benchmark uses every calculated assessment the user can see (`A/comparison/services.py:391-430`)
- Comparison selection: the tree lists project, farm, plot and assessments per module (`A/comparison/tree_services.py:156-206`); the results endpoint takes 1 to 4 items for Emissão, Remoção and Regenerativo (`A/comparison/modules.py:1,9`); web caps the picker at 4 (`W/src/lib/comparison-url.ts:3`)
- Roles are global (admin, manager, technician, auditor) through `Membership`, not per project (`A/authx/migrations/0003_seed_default_roles.py:3-8`, `A/authx/models.py:153`). The auditor reads but cannot write (`A/rothc/views.py:268`, `A/lca/views.py:1210-1212`). The project has an `admin` (`A/projects/models.py:26-30`)

## Dependencies

| Feature | Why | Without it |
|---|---|---|
| `export-excel` | exports the real calculations of a closing | it would export simulations |
| `pdf-fechamento` | shows the real numbers | same |
| `qr-verificacao` | proves the published result came from the platform and did not change | nothing to prove: results change after the fact |
| `auditor` | verifies the real calculations | the auditor cannot tell real from test |
| `comparacao-ampliada` | the selection screen may need more than 4 items | a closing could pick at most 4 calculations |

These features read from this one; this one depends on none of them.

## Risks

- Wrong numbers sold: a buyer gets a footprint built on a simulation, or on a result recalculated after it was declared
- Verified results change: today a recalculation or a factor update silently changes a number already published with a QR code
- Two people disagree on which calculation is real, with no record of who chose it
- A project marked `completed` by itself at 100% is read as "finished" by the client

## Questions for product

Round 1 asked these (question ids of [rounds/1/questionnaire.md](rounds/1/questionnaire.md) in brackets).

1. How does a project really run, start to end, and who does what? [J1, J2, J4]
2. Who finalizes a project, and in what order with the verification? [J3, J5, J6]
3. What does the client receive, and does the client use GAIA? [J7, J8]
4. Is the next season a new project or the same one? [J9, 5]
5. What does the real calculation stand for: a season or the starting point? Can a simulation become real? What is it called? [1, 2, 3]
6. What was agreed in the earlier talk about "um ambiente para fazer verificação"? [4]
7. One real calculation per plot and module, or per plot, module and season? What defines the period? Two crops in one year? [6, 7, 8]
8. For Remoção, what is declared: stock change, stock at the moment, projection? [9]
9. Which modules need a real calculation, and at what level is the number declared? [10, 11]
10. When does it lock, is finalizing an explicit action, and what about a plot with no real calculation? [12, 13, 14]
11. Who may finalize, reopen, and what about simulations and PDF after finalizing? [15, 16, 17, 18]
12. What happens to finalized numbers when an emission factor changes? Is "verified" a state? [19, 20]
13. Who marks the real calculation, is a reason needed, and does the auditor see the history? [21, 22, 23]
14. Do dashboards, comparison and benchmarks use only real calculations? [24, 25, 26]
15. Single calculation, deleted real calculation, existing projects, mobile data: what happens? [27, 28, 29, 30]

## Research questions

Answered in [research.md](research.md).

1. How do ISO 14067 and the GHG Protocol treat the time period of a declared footprint and of a removal?
2. How are results combined across farms: by area or by production?
3. Are past results restated when emission factors change?
4. How do Verra VM0042 and MRV (measurement, reporting and verification) platforms lock data for verification?
5. How is soil carbon split among the crops of a rotation and fallow?
