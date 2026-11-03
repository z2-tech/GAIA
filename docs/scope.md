# Scope: GAIA

GAIA is the sustainability metrics platform for farm projects. Per plot (talhão), it calculates Emissão (LCA), Remoção (RothC), Regenerativo, and Biodiversidade, and it serves project owners, their technicians, and the auditors who verify the results.

**Build approach:** Tracer Bullet (each feature runs end to end through gaia-api, the OpenAPI contract, and gaia-web, thin first and thickened later).
**Workflow:** Beta (`/check verify`, then `/test` after `/develop`). This is the default level of rigor for the project. Closing, QR verification, and auditor carry a `· GA` tag because they back public, audited carbon claims. `/architect` is the recommended first stop for a feature with a real decision, and you can skip it when you already know the build.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Auth & password reset | Existing | existing |
| 2 | Users & permissions | Existing | in-progress |
| 3 | Profile & language | Existing | existing |
| 4 | Projects & completion status | Existing | in-progress |
| 5 | Farms & plots | Existing | in-progress |
| 6 | Emissão (LCA) | Existing | in-progress |
| 7 | Remoção (RothC) | Existing | in-progress |
| 8 | Regenerativo | Existing | in-progress |
| 9 | Biodiversidade (BAT) | Existing | in-progress |
| 10 | CFP (Cool Farm Tool) | Existing | in-progress |
| 11 | Comparação | Existing | in-progress |
| 12 | Fechamento (closing a cut) | Slice 1 | planned |
| 13 | Export Excel (raw data) | Slice 2 | planned |
| 14 | PDF per fechamento | Slice 3 | planned |
| 15 | QR code & public verification page | Slice 4 | planned |
| 16 | Auditor invited per project | Slice 5 | planned |
| 17 | Consolidado (farm, product, project) | Slice 6 | planned |
| 18 | Comparação ampliada (up to 20) | Slice 7 | planned |

## Existing

These were built before this workflow. An `in-progress` row lists what is still missing as sub tasks, so `/develop` can pick it up; the rules live in each feature folder and in `docs/product/rules.md`.

### 1. Auth & password reset · existing
Register, login, logout, token refresh, change password, and password reset by email.
Code in `gaia-api/authx/authn/`, `gaia-web/src/app/(auth)/`, `gaia-web/src/features/recover-password/`

### 2. Users & permissions · in-progress
Users can be listed and created. Web has no edit, delete, or role assignment, and the view permission rules are still open.
- [ ] Fix global `admin` visibility to follow RP-4: two `admin` accounts see each other's projects and farms; today `gaia-api/authx/authz/permissions.py:9` grants global scope only to staff or superuser (Plane card from task BE-15)
Code in `gaia-api/user/`, `gaia-api/authx/`, `gaia-web/src/features/users/`

### 3. Profile & language · existing
Profile, password change, and language switch.
Code in `gaia-api/profiles/`, `gaia-web/src/features/profile/`

### 4. Projects & completion status · in-progress
List, detail, and create work end to end, and the project becomes `completed` at 100% (RP-5, `ProjectService.auto_complete_project`). Web has no project edit or delete.
- [ ] Unit tests for the Regenerativo and Remoção module completers in `gaia-api/farms/services.py`
Code in `gaia-api/projects/`, `gaia-web/src/features/project/`, `gaia-web/src/features/projects/`

### 5. Farms & plots · in-progress
Farm and plot CRUD with KML or shapefile boundary upload. Remoção, Regenerativo, and Biodiversidade link to a plot; Emissão keeps only a loose `plot_id`. Still missing:
- [ ] Completeness weighted by plot area (RP-6)
- [ ] Emissão linked to a plot like the other modules
- [ ] Farm delete in web
Code in `gaia-api/farms/`, `gaia-api/uploads/`, `gaia-web/src/features/farm/`

### 6. Emissão (LCA) · in-progress
Step by step form, calculation, and cancel are live, with units and evidence per input, the shared crop catalog with Remoção, platform owned product factors, and climate by município (rules in `docs/features/emissao-lca/`). Still missing:
- [ ] Settle the method and factor sources (`emissao-lca` P-3): `/discovery emissao-lca`
- [ ] Edit and clone of a calculation, once there is a UX for them
- [ ] Cancel in web
Code in `gaia-api/lca/`, `gaia-web/src/features/carbon-emission/`

### 7. Remoção (RothC) · in-progress
Create, period, inputs, update, clone, and cancel are live under `/api/v2/rothc/`, with crop cycles, the typed crop catalog, organic carbon in the calculation, and the window and period cut (rules in `docs/features/remocao-rothc/`). Still missing:
- [ ] Check GAIA's RothC against the official Fortran golden vectors (70 years, `docs/references/domain/rothc/`); known differences: no spin up, IOM recomputed, Penman Monteith evapotranspiration, simplified soil moisture deficit, a stray `0.02 × fym` term
- [ ] Settle what fertilizer means for the calculation (`remocao-rothc` P-2): `/discovery remocao-rothc`
Code in `gaia-api/rothc/`, `gaia-api/openmeteo/`, `gaia-web/src/features/carbon-removal/`

### 8. Regenerativo · in-progress
Create, update, and dashboard work, with several fillings per farm and one primary (rules in `docs/features/regenerativo/`). Still missing:
- [ ] Web calls delete, clone, and set primary, and lists every filling with the primary highlighted
Code in `gaia-api/regenerative/`, `gaia-web/src/features/regenerative/`

### 9. Biodiversidade (BAT) · in-progress
The API is complete (questions, assessments, cancel, dashboard). The web BAT form does not save (it only shows a success toast), there is no `services/biodiversity/`, and the farm menu has no entry for it.
- [ ] Web `src/services/biodiversity/` and the BAT form saving for real
- [ ] Web lists assessments with score and class, and can cancel one
- [ ] Farm menu entry for Biodiversidade
Code in `gaia-api/biodiversity/`, `gaia-web/src/features/biodiversity/`

### 10. CFP (Cool Farm Tool) · in-progress
Assessments exist in the API only, and web has no screen.
- [ ] Study the Cool Farm Tool API (auth, endpoints, format)
- [ ] Send assessments in the background and fill `output_payload` from the answer
Code in `gaia-api/cfp/`

### 11. Comparação · in-progress
Comparison and benchmark across Emissão, Remoção, and Regenerativo for 1 to 4 items. The open work covers soil management with annual factor, net emissions minus removals, multi scenario comparison, and the comparison design. The comparison endpoints are also duplicated under `lca/urls.py`.
- [ ] Confirm the web wiring of soil practice, net, and comparison (looks built): `/check verify comparacao`
- [ ] Screens: from each module's result charts, pick farm, plot, and calculation, several series per chart, the empty, no access, and older data with no plot states: `/design comparacao`
Code in `gaia-api/comparison/`, `gaia-web/src/features/comparison/`

## Slice 1: Fechamento

### 12. Fechamento (closing a cut) · GA
This is the core thread every later slice reads. From the comparison selection screen, the user closes one cut (project × crop × crop year, for example milho 2025) by choosing one calculation per plot and module. The project number is the area weighted mean, plot → farm → project. Closing locks a snapshot of inputs, results, and factor version, with or without an audit.
**Done when:** the business rules in `TODO/00_calculo_final/08-versao-final-2.md` (CF-RN-n) hold. Emissão has a start and end month and year, Regenerativo has a crop year, and a new emission factor shows an alert but leaves a locked cut untouched.
- [ ] Rules settled: `/discovery fechamento` (imports `TODO/00_calculo_final/`; the happy path screens were drawn on 05/10 in `GAIA · Fechamento`)
- [ ] Screens done: `/design fechamento`
- [ ] Design it (spec): `/architect fechamento`
Folder `docs/features/fechamento/` · repos gaia-api, gaia-web

## Slice 2: Export Excel

### 13. Export Excel (raw data)
Download one cut's raw input data from the selection screen: one column per farm, variables as rows, no results. The file reads the snapshot when the cut is closed, and is labelled "cópia de trabalho" when it is not. Emission factors ship as a separate standard Excel file.
**Done when:** the rules in `TODO/01_export_excel/08-versao-final-1.md` hold as amended by `TODO/ajustes-02-10.md`.
- [ ] Settle the rules: `/discovery export-excel` (imports `TODO/01_export_excel/`)
Folder `docs/features/export-excel/` · repos gaia-api, gaia-web

## Slice 3: PDF

### 14. PDF per fechamento
One PDF per closed cut, showing a single number per module (footprint and emission per ha, removal in t C and t CO2 for the crop period, the Regenerativo score for the year) with the QR code at the end.
**Done when:** the rules in `TODO/02_pdf_dashboard/08-versao-final-1.md` hold as amended by `TODO/ajustes-02-10.md`.
- [ ] Settle the rules: `/discovery pdf-fechamento` (imports `TODO/02_pdf_dashboard/`)
Folder `docs/features/pdf-fechamento/` · repos gaia-api, gaia-web

## Slice 4: QR verification

### 15. QR code & public verification page · GA
The QR in the PDF opens a public page on the GAIA domain that proves the result came from the platform and was not altered.
**Done when:** the rules in `TODO/03_qrcode_verificacao/08-versao-final-1.md` hold as amended by `TODO/ajustes-02-10.md`, and the page exposes no personal data beyond what those rules allow.
- [ ] Settle the rules: `/discovery qr-verificacao` (imports `TODO/03_qrcode_verificacao/`)
Folder `docs/features/qr-verificacao/` · repos gaia-api, gaia-web

## Slice 5: Auditor

### 16. Auditor invited per project · GA
The project owner invites an auditor by email. The auditor sees only that project, read only, including the chosen calculations, primary data, and emission factors, can download the Excel and PDF, and either sends the cut back or verifies it.
**Done when:** the rules in `TODO/04_auditor/08-versao-final-1.md` hold as amended by `TODO/ajustes-02-10.md`. A verified cut never reopens.
- [ ] Settle the rules: `/discovery auditor` (imports `TODO/04_auditor/`)
Folder `docs/features/auditor/` · repos gaia-api, gaia-web

## Slice 6: Consolidado

### 17. Consolidado (farm, product, project)
Consolidated views per farm, product, and project, with summing rules for each module.
**Done when:** each level shows the consolidated number per module using the rules the questionnaire settles, and missing values stay null, never zero.
- [ ] Settle the rules: `/discovery consolidado` (imports `TODO/05_consolidado/`; questionnaire pending)
Folder `docs/features/consolidado/` · repos gaia-api, gaia-web

## Slice 7: Comparação ampliada

### 18. Comparação ampliada (up to 20)
Compare up to 20 plots, farms, or projects (the API already accepts 20) with a detail mode for 4 items or fewer and a ranking mode for 5 to 20.
**Done when:** the comparison screen accepts up to 20 items and stays readable in ranking mode for every module.
- [ ] Settle the rules: `/discovery comparacao-ampliada` (imports `TODO/06_comparacao_ampliada/`; questionnaire is section P of the consolidado one)
Folder `docs/features/comparacao-ampliada/` · repos gaia-web, gaia-api

## Deferred
These are outside the current build pass. They are kept here so the plan stays honest.
- **Mobile app**: data entry with offline sync, same design system (`GAIA Mobile · <Módulo>` files) · needs a decision
- **Project overview screen**: completeness per farm and per module, with quick links to pending modules. Today the home page redirects to `/projects`.
- **AI for comparison**: a written analysis of patterns, outliers, and advice on the comparison screen · needs a decision
- **Visual polish**: empty states, skeletons, short transitions, tooltips on technical fields, module status badges
- **EIQ and STIR modules**: pesticide impact (EIQ) and tillage intensity (STIR), from `EIQ_Final.xlsx` and `STIR_calculadora_metric_v4.xlsx` (see `docs/domain/terms.md`) · needs a decision
- **External data ingestion**: no central pipeline yet; reference tables would load as idempotent seed migrations, outside APIs as cached background jobs, and a fallback only from an approved, traceable rule, never a synthetic zero · needs a decision

## Legend

**The decision box.** Every feature carries exactly one, the subtask whose label ends with `(spec)`. Skills find it by that `(spec)` suffix, never by an exact label. Every other box is an execution box, and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves. Each row shows a state, who sets it, and what the feature looks like then:

| State | Set by | The feature shows |
|---|---|---|
| `planned` (product behavior to settle) | `/scope` | one box: `/discovery "<feature>"`; then `Rules settled`, `Screens done`, `Design it (spec)` |
| `planned` · needs a decision | `/scope` | one box: `Design it (spec): /architect <slug>` |
| `in-progress` (designed) | **`/architect` at spec capture** | `Design it` ticked; spec linked; `Build it: /develop <feature>` + **2 to 5 milestones**; the tier's closing boxes (`Verify it` Alpha+, `Test it` Beta+, `Review it` + `Document it` GA) |
| `in-progress` (building) | `/develop` | milestone sub boxes tick one by one; code pointer filled |
| `in-progress` (verified) | `/check verify` | `Build it` + milestones ticked; `Verify it` ticked |
| `done` | **you, when you decide it is**; `/sync` reconciles | boxes you ran ticked, skipped ones marked skipped; the tier's last stage (`Beta` and `GA` → after `/test`) is the suggested point to call it done |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **Product boxes** `Rules settled` and `Screens done` are ticked by a bare `/scope` from the feature `README.md` (`settled`) and `screens.md` (`done`).
- **needs a decision** = run `/architect` first; otherwise go straight to `/develop`.
- **Atomic build tasks live in the spec's `## Build plan`, not here**. The scope carries only the milestone rollup.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (built before the workflow) and `dropped` (descoped, kept for history).
- **Workflow tier tag** beside a heading (`· GA`) raises that feature's rigor above the Beta default: `GA` adds a fresh model `/check review`, then `/document`.
- **Pointer line**: the feature folder from the start, the spec added by `/architect`, then `repos <code repo>, <code repo>` for the code repos it touches.
