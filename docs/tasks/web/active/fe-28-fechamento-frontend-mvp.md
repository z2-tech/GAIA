# FE-28 — Fechamento do frontend do MVP

> **Prioridade:** Alta | **Assignee:** Macarini | **Status:** Pronto para execução
> **Plane:** [GAIA-33](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/2ca33d40-dfd2-4abf-bf8e-ca0c8eb22367)
> **API:** [BE-18](../../api/active/be-18-fechamento-backend-mvp.md) + refinamentos
> [BE-19](../../api/active/be-19-rothc-ciclos-cultura.md) a
> [BE-25](../../api/active/be-25-rothc-composto-no-calculo.md)

## Contexto

Nenhuma mudança Web integra a primeira rodada backend. O patch provisório foi
validado e descartado em 2026-08-09; `gaia-web/develop` ficou limpo em
`4394416`.

O backend (`gaia-api/develop`) contém as entregas do BE-18 e o hardening
pós-auditoria (2026-08-11):

- RothC dual-scenario (`POST/GET /api/v2/rothc/assessments/`, `POST .../{id}/cancel/`)
- Biodiversity BAT (`POST/GET /api/v1/biodiversity/assessments/`, `questions/`, `dashboard/`, `cancel/`)
- LCA multi-step com scoping, soft-delete, progress e cálculo (`/api/v1/lca/culture/`, `soil/`, `inputs/`, `fuel/`, `transport/`, `{id}/calculate/`)
- AuthX/AuthZ sem queries de role no construtor do serializer
- Farms/Projects/Regenerative com scoping de usuário
- Cancel em todos os módulos (LCA, RothC, BAT, Regenerative) com downgrade de projeto `COMPLETED → IN_PROGRESS`
- BE-19 a BE-25 implementados (ciclos cultura, persistir crop, destravar POST, validar janela, tipar periodo, corte período, composto)

O frontend atual tem:

- **Mock pages** que simulam BAU vs Projeto (`carbon-removal/module-mock/`, `calculation-mock/`)
- **Toast-stub** no form BAT (`use-bat-module.ts` descarta `valuesToCreateBody()`)
- **Serviço LCA** chamando endpoints multi-step (já alinhado com backend)
- **Serviço RothC** com queries V1 (`useListRothC`, `usePostRothCCalculate`) e V2 single-scenario (`useGetRothC`, `useGetRothCByPeriod`) já wireadas e ativas no dashboard + module + calculation pages
- **⚠️ Padronização `routhc` → `rothc`** (BE-18 + this session): backend endpoints movidos de `/api/v2/routhc/` para `/api/v2/rothc/`. Próxima regeneração do SDK (`bun run generate-types`) vai renomear todos os operation IDs e types de `Routhc*` → `Rothc*`. Hand-written import em `src/features/carbon-removal/dashboard/lib/carbon-removal-list-item-model.ts:1,11` precisa ser atualizada manualmente após regen.
- **Serviço Biodiversity** inexistente — `src/services/biodiversity/` não foi criado
- **Cancel inexistente** em qualquer módulo — frontend nunca cancela assessments

## Contratos ativos preservados (não remover)

| Endpoint | Operation ID | Web consumer |
|----------|-------------|-------------|
| `POST /api/v1/rothc/calcular/` | `calcular_rothc` | `usePostRothCCalculate` (`use-roth-c-module.ts`) |
| `GET /api/v1/rothc/projects/{id}/farms/{id}/calculations/` | `list_rothc_calculations` | `useListRothC` (`carbon-removal-listing.tsx`) |
| `GET /api/v2/rothc/calculations/{id}/` | `v2_get_rothc_calculation_detail` | `useGetRothC` (`use-calculation-page.ts`, `use-mock-calculation-page.ts`) |
| `GET /api/v2/rothc/calculations/{id}/period/` | `v2_get_rothc_calculation_detail_by_period` | `useGetRothCByPeriod` (`use-calculation-page.ts`, `use-mock-calculation-page.ts`) |
| `POST /api/v2/rothc/assessments/` | `v2_create_rothc_assessment` | Novo — wiring pendente |
| `GET /api/v2/rothc/assessments/{id}/` | `v2_get_rothc_assessment_detail` | Novo — wiring pendente |
| `GET /api/v2/rothc/assessments/{id}/period/` | `v2_get_rothc_assessment_detail_by_period` | Novo — wiring pendente |
| `POST /api/v2/rothc/assessments/{id}/cancel/` | `v2_cancel_rothc_assessment` | Novo — wiring pendente |

## Execução

### Fase 1 — Schema final e SDK

- [ ] Confirmar BE-18 concluído, schema final sem warnings e deploy em staging/homolog.
- [ ] Atualizar `gaia-web/develop` antes de criar branch.
- [ ] Gerar schema API final com `spectacular --validate --fail-on-warn`.
- [ ] Executar `OPENAPI_SCHEMA_URL=<schema-final> bunx @hey-api/openapi-ts`.
- [ ] Nunca editar `src/client/` manualmente.
- [ ] Revisar diff gerado: novos operation IDs (`v2CreateRouthcAssessment`, `v2GetRouthcAssessmentDetail`, `v2GetRouthcAssessmentDetailByPeriod`, `v2CancelRouthcAssessment`, `listBiodiversityQuestions`, `createBiodiversityAssessment`, etc.).

### Fase 2 — Wiring: RothC (carbon-removal)

#### Mapeamento campo-a-campo: mock → backend

**Request (`POST /api/v2/rothc/assessments/` — `AssessmentCreateSerializer`):**

| Mock (`RothCModuleMockFormValues`) | Backend | Tipo |
|------|---------|------|
| `project_id` | `project_id` | `integer` |
| `farm_id` | `farm_id` | `integer` |
| `name` | `name` | `string (max 255)` |
| `start_month_modeling` | `start_month_modeling` | `integer (1-12)` |
| `start_year_modeling` | `start_year_modeling` | `integer` |
| `end_month_modeling` | `end_month_modeling` | `integer (1-12)` |
| `end_year_modeling` | `end_year_modeling` | `integer` |
| `parametros_projeto.soc_tons_ha` | `parametros_projeto.soc_tons_ha` | `float (>=0)` |
| `parametros_projeto.clay_content_percent` | `parametros_projeto.clay_content_percent` | `float (0-100)` |
| `parametros_projeto.depth_soil_layer_cm` | `parametros_projeto.depth_soil_layer_cm` | `float (>0)` |
| — (vem da fazenda) | `latitude` | **não enviar** — backend usa coordenadas da farm |
| — (não existe no v2) | `how_many_years_future` | **não enviar** — removido do contrato v2 |
| `bau.monthly_input_mode` | `bau.monthly_input_mode` | `"biomass"` ou `"productivity_crop"` |
| `bau.crop_type` | `bau.crop_type` | `"perennial"` ou `"annual"` |
| `bau.compost_not_applicable` | `bau.compost_not_applicable` | `boolean` |
| `bau.compost[].ano` | `bau.compost[].ano` | `integer` |
| `bau.compost[].mes` | `bau.compost[].mes` | `integer (1-12)` |
| `bau.compost[].quantidade_kg_ha` | `bau.compost[].carbono_organico_kg_c_ha` | **renomeado**: kg C/ha, não massa |
| — | `bau.compost[].material` | `string` (opcional, default `""`) |
| `bau.dados_mensais[].ano` | `bau.dados_mensais[].ano` | `integer` |
| `bau.dados_mensais[].periodo` | `bau.dados_mensais[].periodo` | `string` (opaco) |
| `bau.dados_mensais[].mes` | `bau.dados_mensais[].mes` | `integer (1-12)` |
| `bau.dados_mensais[].dpm_rpm` | `bau.dados_mensais[].dpm_rpm` | `DpmRpm` enum (6 valores) |
| `bau.dados_mensais[].cobertura_solo` | `bau.dados_mensais[].cobertura_solo` | `boolean` |
| `bau.dados_mensais[].entrada_biomassa_kg_ha` | `bau.dados_mensais[].entrada_biomassa_kg_ha` | `float (>=0)` — só no modo `biomass` |
| `bau.perennial.cultura` | `bau.perennial.cultura` | `Cultura` enum — **`SOIL` → `SOYBEAN`** |
| `bau.perennial.productivity_by_year[].ano` | `bau.perennial.productivity_by_year[].ano` | `integer` |
| `bau.perennial.productivity_by_year[].produtividade` | `bau.perennial.productivity_by_year[].produtividade` | `float (>0)` — kg MS/ha |
| `bau.annual[].cultura` | `bau.annual[].cultura` | `Cultura` enum — **`SOIL` → `SOYBEAN`** |
| `bau.annual[].produtividade` | `bau.annual[].produtividade` | `float (>0)` — kg MS/ha |
| `bau.annual[].inicio_ano` | `bau.annual[].inicio_ano` | `integer` |
| `bau.annual[].inicio_mes` | `bau.annual[].inicio_mes` | `integer (1-12)` |
| `bau.annual[].fim_ano` | `bau.annual[].fim_ano` | `integer` |
| `bau.annual[].fim_mes` | `bau.annual[].fim_mes` | `integer (1-12)` |
| `project.*` | `project.*` | idêntico ao `bau` |
| `notes` | `notes` | `string` (opcional, nullable) |

**⚠️ Serializar somente o branch ativo** (`perennial` ou `annual`), nunca ambos.
Remover campos desconhecidos/inativos antes do POST — backend rejeita campos extras com 400.

**Response (`GET /api/v2/rothc/assessments/{id}/` — `RothcAssessmentDetail`):**

| Campo | Tipo | Uso no mock |
|-------|------|-------------|
| `id` | `integer` | — |
| `name` | `string` | — |
| `periodo_inicio.ano` | `integer` | `resolveYearPeriod()` |
| `periodo_inicio.mes` | `integer` | `resolveYearPeriod()` |
| `periodo_fim.ano` | `integer` | `resolveYearPeriod()` |
| `periodo_fim.mes` | `integer` | `resolveYearPeriod()` |
| `bau.estoque_carbono` | `float` | `toCarbonScenario()` |
| `bau.estoque_carbono_eq` | `float` | `toCarbonScenario()` |
| `bau.ganho_medio_anual_carbono` | `float` | `toCarbonScenario()` |
| `bau.ganho_medio_anual_carbono_eq` | `float` | `toCarbonScenario()` |
| `bau.taxa_adubacao_organica` | `float|null` | `toCarbonScenario()` |
| `bau.aporte_biomassa` | `float` | `toCarbonScenario()` |
| `bau.solo_coberto_percentual` | `float` | `toCarbonScenario()` |
| `bau.numero_culturas` | `integer` | `toCarbonScenario()` |
| `bau.culturas` | `string[]` | `toCarbonScenario()` |
| `bau.total_oc_mensal[{ano, mes, total_oc, co2}]` | `array` | gráfico mensal BAU×Projeto |
| `project.*` | idêntico ao `bau` | `toCarbonScenario()` |
| `delta_estoque_carbono` | `float` | card delta |
| `delta_estoque_carbono_eq` | `float` | card delta |

**Response (`GET .../{id}/period/` — `RouthcAssessmentPeriodDetail`):**
Mesmo shape, mas `periodo_inicio`/`periodo_fim` refletem a fatia solicitada e deltas são recalculados para o período. Usar no seletor de ano do `calculation-mock` no lugar das queries single-scenario antigas.

#### Checklist de wiring

- [ ] Em `src/services/roth-c/roth-c.mutation.ts` (já existe — adicionar, não recriar):
  - `useCreateRothcAssessment` → `v2CreateRouthcAssessmentMutation()`
  - `useCancelRothcAssessment` → `v2CancelRouthcAssessmentMutation()`
  - Manter `usePostRothCCalculate` existente (V1 ativo no module).
- [ ] Em `src/services/roth-c/roth-c.query.ts` (já existe — adicionar, não recriar):
  - `useGetRothcAssessmentDetail` → `v2GetRouthcAssessmentDetailOptions()`
  - `useGetRothcAssessmentDetailByPeriod` → `v2GetRouthcAssessmentDetailByPeriodOptions()`
  - Manter `useListRothC`, `useGetRothC`, `useGetRothCByPeriod` existentes (V1/V2 ativos no dashboard + calculation page).
- [ ] No `use-roth-c-module-mock.ts`: trocar toast-stub finalize por `createRothcAssessment` com o `RothCModuleMockFormValues` serializado para o payload do backend.
- [ ] Corrigir `SOIL` para `SOYBEAN`; nunca adicionar alias no backend.
- [ ] Serializar somente o branch ativo (`perennial` ou `annual`) e remover campos
      desconhecidos/inativos antes do POST.
- [ ] Trocar produtividade para kg MS/ha e composto para carbono orgânico em kg C/ha.
- [ ] Remover latitude dos parâmetros do assessment; coordenadas vêm da fazenda.
- [ ] No `use-mock-calculation-page.ts`: trocar query V1/V2 antigas por `useGetRothcAssessmentDetail` que retorna `RouthcAssessmentDetail` com `bau` + `project` + `delta_*`.
- [ ] No `scenario-comparison-model.ts`: remover `PROJECT_FACTOR=0.8` — usar `project` real do backend. Remover `toProjectScenario()`.
- [ ] No `mock-calculation-page-content.tsx`: consumir `detail.bau` e `detail.project` como cenários reais.
- [ ] Verificar se `RouthcAssessmentDetail` tem `periodo_inicio`/`periodo_fim` compatível com `resolveYearPeriod()`.
- [ ] Páginas mock (`module-mock/`, `calculation-mock/`) podem ser arquivadas ou removidas após wiring funcional — manter até confirmação.

### Fase 3 — Wiring: Biodiversity (BAT)

- [ ] Criar `src/services/biodiversity/biodiversity.mutation.ts`:
  - `useCreateBiodiversityAssessment` → `createBiodiversityAssessmentMutation()`
  - `useCancelBiodiversityAssessment` → `cancelBiodiversityAssessmentMutation()`
- [ ] Criar `src/services/biodiversity/biodiversity.query.ts`:
  - `useListBiodiversityQuestions` → `listBiodiversityQuestionsOptions()`
  - `useGetBiodiversityAssessment` → `getBiodiversityAssessmentDetailOptions()`
  - `useListBiodiversityAssessments` → `listBiodiversityAssessmentsOptions()`
  - `useGetBiodiversityDashboard` → `getBiodiversityDashboardOptions()`
- [ ] Em `use-bat-module.ts`: substituir `void body; toast.success(...)` por `useCreateBiodiversityAssessment.mutate({ body })`.
- [ ] Em `biodiversity-page.tsx`: listar assessments reais, exibir score/classificação no lugar de `labelIsUnderConstruction`.

### Fase 4 — Wiring: LCA (carbon-emission)

- [ ] Confirmar que os operation IDs do LCA no SDK novo batem com os existentes em `src/services/lca/`.
- [ ] Verificar `LcaModuleFormValues` contra tipos gerados — ajustar casts se necessário.
- [ ] Verificar fluxo de cálculo: `calculateProject` retorna `LcaCalculationResponse` compatível com `lca-result.tsx`.
- [ ] Tratar 404 no GET `/calculate/` após cancel da cultura — exibir estado "recalcular" em vez de erro genérico.

### Fase 5 — Wiring: Regenerative (já funcional)

- [ ] Confirmar que endpoints regenerative existentes continuam compatíveis com SDK novo.
- [ ] Verificar que `cancel_assessment` (soft-delete) está wireado no frontend.
- [ ] Clone disponível em `POST /assessments/{id}/clone/` (opcional — wirear quando UX definir).
- [ ] **BREAKING:** endpoint `GET /assessments/` agora retorna LISTA (não objeto único). Consumir `is_primary` para destacar o assessment oficial. Ver guia completo em `docs/agents/web/`.

### Fase 6 — Cancel cross-module

- [ ] Botão/action de cancel em cada módulo (RothC, LCA, BAT, Regenerative).
  - RothC assessment: `useCancelRothcAssessment` → `v2CancelRothcAssessmentMutation()` (operation `v2_cancel_rothc_assessment`)
  - V1 calculation cancel já wireado via `cancelRouthcCalculationMutation` — manter.
- [ ] Após qualquer mutate de cancel, invalidar cache de `useProjectDetail` — project status pode mudar de `COMPLETED → IN_PROGRESS` dinamicamente.
- [ ] Confirmar que listas excluem itens cancelados automaticamente (já é server-side).

### Fase 7 — Verificação final

- [ ] Rodar `bun lint`, `bun run typecheck` e `bun run build`.
- [ ] Validar fluxo completo: criar farm → assessments em todos os módulos → resultados → cancelar → verificar downgrade.
- [ ] Validar auth: login, reset password, permissões.
- [ ] Validar cancel: cancelar em cada módulo, verificar que listas excluem cancelados, verificar project.status pós-cancel.
- [ ] Nenhum mock residual: `PROJECT_FACTOR`, toast-stubs, dados hardcoded.
- [ ] CodeGraph sync.

## Aceite

- [ ] SDK regenerado uma única vez após schema backend final.
- [ ] Nenhum patch manual em `src/client/`.
- [ ] Todos os módulos consomem endpoints reais (sem mocks/stubs).
- [ ] RothC dual-scenario funcional com BAU + Project reais.
- [ ] BAT funcional com score e classificação.
- [ ] Cancel funcional em todos os módulos (LCA, RothC, BAT, Regenerative).
- [ ] Project.status atualiza dinamicamente após cancel (COMPLETED → IN_PROGRESS).
- [ ] Lint, typecheck, build verdes.
- [ ] Nenhuma alteração visual ou regra de domínio não intencional.

## Notas

- A URL base da API (`/api/v1/rothc/`) mantém o nome `rothc` (backend legado).
  O frontend encapsula em `src/services/roth-c/` com nome de produto `carbon-removal`.
  Esse desacoplamento é intencional e não deve ser "corrigido".
- `how_many_years_future` e `latitude` não fazem parte de `parametros_projeto` no
  assessment v2. O contrato v1 legado permanece separado.
- `src/services/roth-c/roth-c.mutation.ts` e `roth-c.query.ts` já existem com hooks
  V1/V2 ativos — as fases 2 e 6 adicionam novos hooks, não recriam os arquivos.
- O cancel do assessment BAU×Projeto usa `POST /api/v2/rothc/assessments/{id}/cancel/`
  com operation `v2_cancel_routhc_assessment`, não `cancel_routhc_calculation`.
- **Serialização do mock → backend**: ver tabela campo-a-campo na Fase 2. Atenção especial
  a `SOIL→SOYBEAN`, `quantidade_kg_ha→carbono_organico_kg_c_ha`, remover `latitude`/`how_many_years_future`,
  e enviar só o branch ativo (`perennial` ou `annual`), nunca ambos.

## Backlog — Tasks pós-MVP (backend pronto, mock não usa)

Wirear quando o produto definir UX correspondente.

| Task | O que faz | Endpoint |
|------|-----------|----------|
| BE-01 (LCA clone) | Clonar cultura LCA com sub-recursos | `POST .../{id}/clone/` |
| BE-02 (RothC clone) | Clonar cálculo RothC | `POST /api/v1/rothc/calculations/{id}/clone/` |
| BE-04 (Regenerative clone) | Clonar assessment regenerativo | `POST .../{id}/clone/` |
| BE-06 (Módulos por talhão) | Assessments com FK de Plot | Model + migration pendente |
| BE-12 (Comparação) | Radar chart cross-farm/project | `POST /api/v1/compare/` |
