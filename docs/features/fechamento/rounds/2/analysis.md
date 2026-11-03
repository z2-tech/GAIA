# Analysis, round 2: fechamento

Sources: meeting [2026-10-02](../../../../meetings/2026-10-02-closing-by-cut/minutes.md) (Henrique through the "Z2 Tech" account, Paulo Rocha, Ruan Carlos Oliveira), topics 1 and 3 to 16 of its routing; the turns are copied in [answers.raw.md](answers.raw.md). The meeting went through the disagreements of round 1 one by one, so both respondents spoke on most open points. Quotes cite `[mm:ss] Person`.

## What changed in our understanding

1. **There is no official mark while work goes on.** The real calculation is picked on the comparison selection screen at the moment of closing: project, farms, plots, then the calculation of each plot. "Por que que a gente não usa aquilo dali para ser o dado que vai ser lançado como oficial" [01:00] Paulo; "nesse filtro aqui ele seleciona o que é o dado real" [29:52] Paulo; "sempre que vou finalizar é aqui" [60:56] Paulo. This replaces the v1 model of an "Oficial" mark kept per plot, module and season (RN-01 to RN-10, RN-31).
2. **What closes is a cut (recorte), not the whole project.** A cut is one crop and one crop year (ano safra), for example milho 2025: "o cara vai ter que pedir uma verificação para a cultura para aquele ano" [15:24] Paulo. The project has no year and continues after a closing: "o projeto continua [...] aquele que fechou fica ali, pum, travado ali dentro" [59:20] Paulo.
3. **The period comes from the calculations, not from the project.** Emissão (emissions, LCA) gets a start month and year and an end month and year, and that period cuts the Remoção (soil carbon removal, RothC model): "de vez de ser só 2025 aqui vai ser mês de início e ano de início [...] mês final de ano final" [40:28] Henrique; "você consegue fazer um recorte mais certo" [40:44] Paulo. Regenerativo gets a closed crop year and a farm can have several [27:24, 29:52] Paulo, [28:44] Henrique.
4. **The project number is an area weighted mean, plot to farm to project.** "Primeiro tem que ser feito o cálculo de média ponderada [...] para eu ter o valor por fazenda e depois [...] uma segunda média ponderada para poder calcular pro projeto" [21:44] Paulo; weight "o tamanho da fazenda" [22:24]; "deixa o cálculo de média ponderada sempre por área mesmo" [52:44] Paulo.
5. **Closing locks, with or without audit.** "Quando eu finalizei o projeto, trava tudo" [41:40] Henrique; "É, trava. É isso mesmo" [43:00] Ruan; "Eu vou pôr só projeto finalizado porque tem o caso de não existir auditor" [47:12] Henrique. Sending to audit is a choice made at closing time [47:32] Paulo, [61:24] Paulo.
6. **An auditor return unlocks, and the same calculation is fixed.** "O projeto destrava" [31:48] Paulo; "ele mexer no que já tá" [56:28] Paulo, not a new "milho 2025 V2" [56:00] Henrique.
7. **The declared Remoção is the year's modelled sequestration, cut by the crop period.** "Eu vou fazer o meu cálculo de pegada pro ano de 25 e [...] de modelagem pro ano de 25 [...] para aquela safra, para aquele ano" [38:20] Paulo. The full modelling is kept to understand the carbon curve [38:20].
8. **The closing shows single numbers, simpler than the comparison.** "A pegada de carbono e a emissão por hectare [...] a remoção dentro daquele período para aquela cultura, em tonelada de carbono e CO2 [...] qual foi o meu scoring dentro daquele ano" [63:48] Paulo.

## Hypotheses

The round 1 hypotheses were resolved in [round 1](../1/analysis.md). This round revisits two of them:

- **H-1 (lock at finalize): replaced again.** The lock happens when a cut is closed, with or without audit [41:40, 43:00, 47:12], not when the whole project is finalized.
- **H-6 (factors do not restate finalized numbers): confirmed.** "O que foi travado foi travado" [44:08] Paulo; "Não, não é para mudar mesmo" [46:56] Ruan; the only exception is a calculation error [46:48] Paulo.

## Consensus: becomes a rule

Both Paulo and Ruan were present; consensus means one said it and the other agreed or did not object, and Henrique restated it without correction.

| Rule | Base |
|---|---|
| The closing is done on the comparison selection screen: project, farms, plots, one calculation per plot and module | [01:00, 29:52, 60:56, 62:20] Paulo; [30:48, 61:12] Henrique |
| A closing is per crop and crop year; any past year with evidence | [15:24, 15:44] Paulo; [24:12] Ruan |
| The project has no year | [24:32, 27:24] Paulo; [24:12] Ruan |
| Emissão has a start and an end month and year; that period cuts the Remoção | [40:28, 41:40] Henrique; [40:44] Paulo |
| Regenerativo has a crop year; a farm can have several | [27:24, 29:52] Paulo; [28:44] Henrique |
| The declared Remoção is the modelled sequestration of that crop and year | [38:20] Paulo; [39:12] Ruan |
| Weighted mean by area, plot → farm → project | [21:44, 22:24, 52:44] Paulo |
| A calculation may be per plot, or a homogeneous farm registered as one plot; the structure stays | [19:56, 21:28, 49:48] Paulo; [20:28] Henrique |
| Each calculation is chosen with an explicit click | [61:44] Henrique; [62:20] Paulo |
| Closing locks, with or without audit | [41:40, 47:12] Henrique; [43:00] Ruan; [47:04] Paulo |
| Finalizing is a button; automatic completion at 100% goes away | [32:56] Henrique; no objection |
| Audit is chosen at closing time | [47:32] Paulo; [47:44] Henrique |
| An auditor return unlocks; the same calculation is fixed | [31:48, 56:28] Paulo; [56:00] Henrique |
| Approval locks for good | [31:48, 47:04] Paulo |
| A new factor never changes a locked closing; an alert shows; new calculations use the new factor | [44:08, 46:48] Paulo; [44:48, 46:56] Ruan; [45:12] Henrique |
| Project admin and manager close; GAIA only ends the project when the contract ends | [53:44, 54:24] Paulo; [54:08] Henrique |
| Data sent from the mobile app is official; the outbox is only a name | [55:20, 55:44] Paulo; [55:32] Ruan |
| The project continues after a closing; the closed cut stays locked inside | [59:20] Paulo; [59:48] Henrique |
| The closing shows one number per module | [63:48] Paulo; [64:56] Henrique |

## Open points

How the open points of [v1](../../business-rules/v1.md) stand after this meeting.

| Topic | Paulo Rocha | Ruan Carlos Oliveira or other source | Proposal |
|---|---|---|---|
| P-1 When it locks | at sending to verification [31:48]; then "finalizei o projeto, auditou [...] já era" [47:04] | "É, trava. É isso mesmo" [43:00]; Henrique: locks at closing because there may be no auditor [47:12] | **decided**: closing locks, with or without audit |
| P-2 Who finalizes | admin and manager; GAIA closes when the contract ends [53:44, 54:24] | Henrique: GAIA does not touch the owner's data [54:08] | **decided**: project admin and manager |
| P-3 Reopen a closing without audit | "acho que é só questão de contrato" [34:40] | Ruan: without audit "pode ficar finalizado, mas [...] eu abrir, editar, fazer depois o que quiser" [33:28]; Henrique: "se o cara voltar o projeto abre" [41:40] | **open**: admin or manager reopen with a written reason |
| P-4 Declared Remoção | the year's modelled sequestration for that crop [38:20] | Ruan agrees, after Paulo explains offsetting versus insetting [37:28, 39:12] | **decided**: sequestration of the crop period, cut from the modelling |
| P-5 New factor | "o que foi travado foi travado" [44:08], unless a calculation error [46:48] | "Não, não é para mudar mesmo" [46:56] | **decided**: locked stays; alert; new calculations use the new factor |
| P-6 Project and season | no year on the project [24:32]; multi year project continues [59:20] | retroactive years possible [24:12] | **decided**: the project has no year; the cut carries crop and crop year |
| P-7 Mobile data | "o dado ele é oficial" [55:20]; "é só entendimento de nomenclatura" [55:44] | outbox until sent, then it enters the calculation [55:32] | **decided**: sent data counts like web data |
| P-8 Plot with no official at finalize | the user selects the farms, then the plots, then the calculation [62:20] | no other source | **decided**: only the plots the user selects enter the closing |
| P-9 History of official changes | not discussed | falls away: there is no official mark to change (point 1 above) | **decided**: dropped |
| P-10 Simulation made official | any calculation can be selected [29:52] | falls away with point 1 | **decided**: any calculation of the cut can be chosen |
| P-11 Weight of the mean | hesitates on production for emissions [51:04], then "sempre por área mesmo" [52:44] | Henrique: it is among farms of the same project [51:40] | **decided**: area, always |
| P-12 Simulations after finalizing | "o projeto continua" [59:20] | no other source | **decided**: the project stays open; only the chosen calculations lock |
| P-13 Remoção with two crops in one year | an allocation criterion is needed [13:20]; the cut by crop period works [40:44] | Henrique: the Emissão period cuts the Remoção [40:28] | **narrowed, open**: months between two crop periods (fallow) are not covered |
| New: calculation error found after locking | "se não foi erro de cálculo, não é para mudar" [46:48] | who fixes it and how was not said | **open (P-14)**: GAIA corrects, with a reason, and the closing shows it |
| New: Biodiversidade in the closing | named in the certificate [01:00], left out of the closing numbers [63:48] | Biodiversidade has no year (code) | **open (P-15)**: gets a crop year; stays out of the closing number until decided |
| New: one Remoção modelling in two closings | one modelling covers several crops and years [25:32] | no other source | **open (P-16)**: a second closing reuses the calculation already locked by the first |
| New: benchmark and dashboards before any closing | not discussed | v1 RN-15 to RN-17 assumed an official mark | **open (P-17)**: benchmark uses only calculations of closings; other dashboards use all |

## New requirements

| Requirement | Who asked | Where it fits |
|---|---|---|
| Emissão form fixes: harvested amount unit, urea twice, the 0,46 field, seed from the chosen crop, fuel per hectare, energy total | [05:48 to 12:44] Ruan, Paulo, Henrique | `emissao-lca` |
| Draw the property first, then optionally split into plots | [18:16] Ruan | later, only if the current flow causes problems [20:28] |
| An Excel example of the weighted mean | [23:12] Paulo | input for this feature, owner Paulo |
| A project tab with a dashboard per closed cut | [58:08, 59:48] Henrique | this feature (the closing summary); dashboards over years go to `consolidado` |
| A returned closing shows in red; the click goes to the wrong field with the auditor's comment; the flow must be fast | [56:56] Henrique; [56:32] Ruan | `auditor` |
| Deadlines for the auditor and the user, number of rounds | [50:12] Henrique | `auditor` |
| More than 4 items on the selection screen | [62:36] Henrique; [63:48] Paulo | `comparacao-ampliada` |
| Content of the dashboard, the PDF and the QR page | [64:56] Henrique | `pdf-fechamento`, `qr-verificacao` |
| Raw data Excel, variables in rows, farms in columns; factors and sources in a separate standard Excel | [66:52] Paulo; [67:04, 67:40] Ruan | `export-excel` |

## What the code says about the answers

- The selection screen already lists project, farm, plot and assessments per module (`gaia-api/comparison/tree_services.py:156-206`), but the results endpoint takes at most 4 items and only Emissão, Remoção and Regenerativo (`gaia-api/comparison/modules.py:1,9`); web caps the picker at 4 (`gaia-web/src/lib/comparison-url.ts:3`). A closing of 10 farms needs more [62:36]
- Emissão has only `harvest_year`, no months (`gaia-api/lca/models.py:176`); its `plot_id` and `project_farm_id` are plain integers (`gaia-api/lca/models.py:173-174`), so linking a closing to the plot it covers has no real key today
- Remoção receives a start and end month and year (`gaia-api/rothc/services.py:1006-1028`) and keeps monthly results per scenario (`gaia-api/rothc/models.py:106-108`), so a cut by the Emissão period can be read from stored data; the window itself is not stored on the calculation (`gaia-api/rothc/models.py:40-83`)
- Regenerativo has no year and allows one primary per project farm (`gaia-api/regenerative/models.py:60-103`); "several per farm, each with a crop year" [29:52] conflicts with that constraint
- Biodiversidade has no year (`gaia-api/biodiversity/models.py:21-38`), which is why P-15 stays open
- No weighted mean exists (`gaia-api/comparison/services.py:391-430` computes plain averages and quartiles for the benchmark)
- No write lock exists in any module (`gaia-api/lca`, `gaia-api/rothc`, `gaia-api/regenerative`); the LCA recalculation overwrites its result (`gaia-api/lca/services.py:820-827`) and RothC recreates monthly results on update (`gaia-api/rothc/services.py:1310-1312`), so "the same calculation is fixed" after a return needs the snapshot to survive edits
- `auto_complete_project` (`gaia-api/projects/services.py:78-91`) contradicts the explicit closing [32:56]
- Factor catalogs have no version (`gaia-api/lca/models.py:15-32`), so the "older factor" alert [45:12] has nothing to compare against today
- Roles are global (`gaia-api/authx/models.py:153`); "admin and manager of the project" [53:44] maps to the project `admin` field (`gaia-api/projects/models.py:26-30`) and the global manager role

## Agenda for the next round

The next validation is the design walkthrough with Paulo and Ruan, not another questionnaire [67:56].

1. Can a closing without audit be reopened, by whom, and what happens to what was already reported? (P-3)
2. Which cut gets the Remoção months between two crops (fallow)? To check with João, the soil carbon specialist. (P-13)
3. Who corrects a calculation error found after locking, and how does the closing show it? (P-14)
4. Does Biodiversidade enter the closing, with which period and which number? (P-15)
5. Can a Remoção calculation locked by one closing be used by a second closing of another crop? (P-16)
6. Before any closing, do benchmarks and dashboards use every calculation or only closed ones? (P-17)
