# Analysis, round 1: fechamento

Sources: [answers.raw.md](answers.raw.md) (Paulo Rocha, Ruan Carlos Oliveira, 2026-09-30), on top of meeting [2026-09-29](../../../../meetings/2026-09-29-peterson-strategy-next-features/minutes.md). Both answered. Paulo left most choices blank and answered in comments; he did not understand questions 14, 25, 26, 28 and 29. Ruan did not understand questions 3 and 20. The questionnaire said an unanswered question follows the Z2 suggestion; that rule is used below and named each time.

## What changed in our understanding

1. **Baseline and monitoring are two kinds of collection, and simulations happen in both.** The first collection is the baseline, the later ones are monitoring; the result that counts is always the real one, "a foto de como está naquele momento". Paulo (J1). This replaces the idea of one baseline per plot.
2. **Closing only matters for a claim.** A company that wants to communicate a result ("claim") closes with real data; a company that only wants to improve its process can keep simulations and stops before verification. Paulo (J1). Verification by a third party is optional. Ruan (J2).
3. **Collection and filling are usually the same step**, done by Peterson's technician, sometimes by the client's or the farm's own people. Paulo (J1), Ruan (J2).
4. **The declared number is a weighted mean, not a plot number.** "Um único número de pegada de carbono, score regenerativo, sequestro de carbono no solo, biodiversidade" per farm, from the plots. Paulo (1, 6, 27). Farm and project are the levels Control Union and the buyer read. Paulo (11). Ruan adds plot, depending on what the client reports (11).
5. **The lock follows the decision to verify.** Paulo locks when the project is sent to verification (12), because "não pode ter nenhuma alteração de dados depois disso" (J5); without verification the client keeps editing until the contract ends (J7). Ruan locks at finalize (12).
6. **The auditor can send it back.** An error found by the auditor reopens the project for Peterson and the client to fix. Paulo (J6, 4). Ruan describes a non conformity with a deadline, for example 30 days, then resubmission (J6).
7. **A verified project never reopens.** Paulo (16).
8. **No new environment is needed for verification.** The auditor can use the same platform, reads everything (primary data, PDFs, evidence, emission factors, equations), changes nothing, and either asks for a review or approves. Paulo (4), Ruan (4).

## Hypotheses

- **H-1 (lock at finalize): replaced.** Ruan confirms (12). Paulo moves the lock to sending to verification (12) and keeps unverified projects editable (J7). Both agree verification comes after finalizing (J5). The lock moment becomes P-1.
- **H-2 (journey): confirmed with corrections.** Paulo: "o fluxo acima esta bem desenhando eu apenas expliquei ele um pouco melhor" (J2), with steps 2 and 3 merged and Peterson finalizing together with the client (J1, J3). Ruan: farm people may fill data and verification is optional (J2).
- **H-3 (one official per plot, module and season): confirmed.** Ruan: "um por talhão, módulo e safra" (6); each crop of a two crop year has its own official, Ruan and Paulo (8). Paulo adds that this is hard for soil (8), see P-13.
- **H-4 (name "Oficial"): kept by default.** Nobody picked a name. Paulo explains that BAU ("business as usual") and "cenário de projeto" are soil simulation terms only (3); Ruan did not understand (3). The questionnaire default applies.
- **H-5 (finalizing is explicit): confirmed.** Ruan: "ação explícita de alguém" (13). Paulo: "ação da Gaia, avaliando o contrato" (13). Neither wants it automatic at 100%. Who acts is P-2.
- **H-6 (factors do not restate finalized numbers): disputed.** Paulo: "acho que ficam como estão", to be checked (19). Ruan: recalculated, so a baseline and the current year use the same method (19). Becomes P-5.
- **H-7 (only official calculations in dashboards, comparison and benchmarks): confirmed.** Ruan yes to 24, 25, 26; Paulo "acho que sim" (24) and did not understand 25 and 26, so the default applies.
- **H-8 (convenience defaults): confirmed.** A single calculation becomes official: Paulo and Ruan (27). Deleting the official asks to choose: Ruan (28); Paulo did not understand, default applies. Existing projects get the newest as official for review: Ruan (29); Paulo unclear, default applies.

## Consensus: becomes a rule

With two respondents, consensus means both agree, or one answers, the other does not contradict, and it matches the Z2 suggestion or the meeting.

| Rule | Base |
|---|---|
| Every module has an official calculation | Paulo (10, "todos, mas foco principal em carbono"); Ruan (10) |
| One official per plot, module and season; each crop of a two crop year has its own | Ruan (6, 8); Paulo (8) |
| The season ("safra agrícola") defines the period | Paulo (7); Ruan (7) |
| Any calculation, a simulation included, can become official | Paulo (2, "não é muito comun"); Ruan (2) |
| What is declared is the real data of that moment | Paulo (J1, 1); meeting 2026-09-29 39:44 |
| One number per indicator, a weighted mean of the plots | Paulo (1, 27); meeting 2026-09-29 38:16 |
| The number exists per farm and per project | Paulo (11); Ruan (11, adds plot) |
| Finalizing is never automatic | Ruan (13); Paulo (13) |
| A confirmation step comes before closing | Ruan (J3); product analysis proposed flow |
| Verification is optional and comes after finalizing | Paulo (J1, J5); Ruan (J2, J5) |
| The auditor's return reopens the project for correction | Paulo (J6, 4, 12); Ruan (J6) |
| Approval locks for good; a verified project never reopens | Paulo (4, 16); Ruan does not contradict |
| The platform has a "verificado" state | Paulo (20); Ruan did not understand |
| Reopening needs a written reason | Paulo (22, "sempre"); Ruan (22, "só para reabrir") |
| Admin and manager of the project mark the official | Paulo (21, admin); Ruan (21, admin and manager) |
| A single calculation is official by itself | Paulo (27); Ruan (27) |
| Deleting the official asks the user to choose | Ruan (28); questionnaire default |
| Dashboards use only official calculations | Ruan (24); Paulo (24) |
| Comparison shows simulations only on request; benchmarks ignore them | Ruan (25, 26); questionnaire default |
| Existing projects: newest calculation marked official, user asked to review | Ruan (29); questionnaire default |
| Screen names "Oficial" and "Simulação" | questionnaire default; Paulo (3) keeps BAU and project scenario inside Remoção |

## Open points

| Topic | Paulo Rocha | Ruan Carlos Oliveira | Proposal |
|---|---|---|---|
| P-1 When it locks; does an unverified project lock | at sending to verification (12); unverified stays editable until contract end (J7) | at finalize (12) | lock at finalize |
| P-2 Who finalizes | "o gestor do projeto", Peterson with the client (J3); "ação da Gaia" (13); admin finalizes (15) | the consultant who filled (J3); admin and manager (15) | project admin and manager |
| P-3 Reopening a finalized, unverified project | only GAIA reopens (15) | can reopen with GAIA or Peterson authorization; old PDF and QR stop being valid (16) | GAIA reopens with a reason; old PDF and QR stop being valid |
| P-4 What Remoção declares | stock change in the period, "qual foi o ganho em t CO2/ha" (9) | the 5 year projection, checked against a soil analysis at year 5 (9) | stock change in the period, projection as extra information |
| P-5 Emission factor update | stays, to be checked (19) | recalculated, for comparability with the baseline (19) | stays; a new factor never changes a finalized number |
| P-6 Project and season | depends: baseline only, or baseline plus monitoring over years (5, J9); short project is a season, long project 12 months (7) | one project per season (5, J9), with an annual farm result of up to 3 seasons (5) | a project may span several seasons; the official is per season |
| P-7 Mobile data | enters as official (30) | draft until someone reviews (30) | data sent from mobile counts like web data |
| P-8 Plot with no official at finalize | picked "finalizar e deixar fora", then "não entendi" (14) | block the finalization (14) | block |
| P-9 History of official changes | auditor does not need it (23) | auditor sees it (23) | record who and when; the auditor sees it |
| P-10 A simulation made official | can be verified and become official (2) | must later be checked against real data (2) | any calculation can be chosen; no extra check |
| P-11 Weight of the mean | "média ponderada" (1), weight not said | not asked | area or production, to ask; research finds no standard weight |
| P-12 Simulations after finalizing | continuity: open another project with the same data (17) | only view (17) | view only |
| P-13 Remoção with two crops in one year | "pergunta difícil de responder para o solo" (8) | each crop has its own official (8) | to settle with a soil specialist |

## New requirements

| Requirement | Who asked | Where it fits |
|---|---|---|
| Block inputs out of reality or plainly wrong | Ruan (J3) | a feature of its own, later |
| Confirmation step before closing, a double check | Ruan (J3) | this feature (RN-14) |
| Duplicate last season's assessments and change only the inputs | Ruan (J9) | existing clone; later |
| Annual farm result over up to 3 seasons | Ruan (5) | `consolidado` |
| PDF without QR at any time; PDF with QR only after verification | Paulo (18) | `pdf-fechamento`, `qr-verificacao` |
| Draft PDF with a watermark, or none if complex | Ruan (18) | `pdf-fechamento` |
| Auditor comments, asks review or approves; non conformity deadline | Paulo (4); Ruan (J6) | `auditor` |
| Client access to a verified project for a period, blocked at contract end | Paulo (J7) | product, users and permissions |
| Data protection under national and global law | Ruan (F1) | product, cross cutting |
| Operational support for errors and questions | Ruan (F1) | not a feature |

## What the code says about the answers

- Finalizing as an explicit action collides with `auto_complete_project`, which sets `completed` at 100% and back below it after every LCA and RothC write (`gaia-api/projects/services.py:78-91`)
- "Single calculation is official" matches what Regenerativo already does (`gaia-api/regenerative/services.py:85-88`); "deleting the official asks to choose" contradicts its cancel, which promotes the newest (`gaia-api/regenerative/services.py:194-215`). The official is per project farm there, not per plot and season (`gaia-api/regenerative/models.py:98-103`)
- One official per plot, module and season needs a season on every module; only LCA has `harvest_year` (`gaia-api/lca/models.py:176`), and Regenerativo, Biodiversidade and CFP have no year (`gaia-api/regenerative/models.py:60-93`, `gaia-api/biodiversity/models.py:21-38`, `gaia-api/cfp/models.py:6-30`)
- A lock is new: no module guards writes, not even on completed projects (no guard in `gaia-api/lca`, `gaia-api/rothc`, `gaia-api/regenerative`)
- "Factors stay" and "recalculate the baseline" both need to know which factor was used; catalogs have no version and results do not store factors (`gaia-api/lca/models.py:15-32`, `gaia-api/lca/services.py:819-826`)
- The "foto daquele momento" does not exist: LCA overwrites its result (`gaia-api/lca/services.py:820-827`), RothC recreates monthly results on update (`gaia-api/rothc/services.py:1310-1312`), the Regenerativo score is computed on read (`gaia-api/regenerative/services.py:284-296`)
- For P-4, both answers are computable: RothC stores monthly results per scenario (`gaia-api/rothc/models.py:106-108`), so a stock change for a period and a 5 year projection come from the same data
- No weighted mean exists anywhere; benchmarks use every calculated assessment (`gaia-api/comparison/services.py:391-430`)
- A manager role exists, but roles are global, not per project (`gaia-api/authx/migrations/0003_seed_default_roles.py:3-8`, `gaia-api/authx/models.py:153`)

## Agenda for the next round

1. When does the official lock, and does a project without verification lock at all? (P-1)
2. Who finalizes, and who may reopen a finalized project that was not verified? (P-2, P-3)
3. For Remoção, is the declared number the stock change in the period or the projection? (P-4)
4. Does a new emission factor change finalized numbers? (P-5)
5. Is a project one season or several, and what is the period of a long project? (P-6)
6. Does mobile data enter as official or as a draft? (P-7)
7. What weights the mean of plots and farms: area or production? (P-11)
8. How is Remoção split between two crops of one year? (P-13)
