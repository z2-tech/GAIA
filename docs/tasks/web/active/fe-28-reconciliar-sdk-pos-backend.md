# FE-28 — Reconciliar SDK e wiring completo após deploy do backend

> **Prioridade:** Alta | **Assignee:** Macarini | **Status:** Pronto para execução
> **Plane:** [GAIA-33](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/2ca33d40-dfd2-4abf-bf8e-ca0c8eb22367)
> **API:** [BE-18](../../api/active/be-18-fechamento-backend-mvp.md) — ✅ Concluído
> **Plane:** GAIA-YY (substituir após criação)

## Contexto

Nenhuma mudança Web integra a primeira rodada backend. O patch provisório foi
validado e descartado em 2026-08-09; `gaia-web/develop` ficou limpo em
`4394416`.

O backend (`gaia-api/fix/backend-mvp-hardening`) contém as entregas do BE-18:

- RothC dual-scenario (`POST/GET /api/v2/routhc/assessments/`)
- Biodiversity BAT (`POST/GET /api/v1/biodiversity/assessments/`, `questions/`, `dashboard/`)
- LCA multi-step com scoping, soft-delete, progress e cálculo (`/api/v1/lca/culture/`, `soil/`, `inputs/`, `fuel/`, `transport/`, `{id}/calculate/`)
- AuthX/AuthZ sem queries de role no construtor do serializer
- Farms/Projects/Regenerative com scoping de usuário

O frontend atual tem:

- **Mock pages** que simulam BAU vs Projeto (`carbon-removal/module-mock/`, `calculation-mock/`)
- **Toast-stub** no form BAT (`use-bat-module.ts` descarta `valuesToCreateBody()`)
- **Serviço LCA** chamando endpoints multi-step (já alinhado com backend)
- **Serviço RothC** chamando V1/V2 antigos (single-scenario), sem o novo endpoint de assessment
- **Serviço Biodiversity** inexistente — `src/services/biodiversity/` não foi criado

## Execução

### Fase 1 — Schema final e SDK

- [ ] Confirmar BE-18 concluído, schema final sem warnings e deploy em staging/homolog.
- [ ] Atualizar `gaia-web/develop` antes de criar branch.
- [ ] Gerar schema API final com `spectacular --validate --fail-on-warn`.
- [ ] Executar `OPENAPI_SCHEMA_URL=<schema-final> bunx @hey-api/openapi-ts`.
- [ ] Nunca editar `src/client/` manualmente.
- [ ] Revisar diff gerado: novos operation IDs (`v2CreateRouthcAssessment`, `listBiodiversityQuestions`, `createBiodiversityAssessment`, etc.).

### Fase 2 — Wiring: RothC (carbon-removal)

- [ ] Criar `src/services/roth-c/roth-c.mutation.ts` com `useCreateRothcAssessment` chamando `v2CreateRouthcAssessmentMutation()`.
- [ ] Atualizar `src/services/roth-c/roth-c.query.ts` com `useGetRothcAssessmentDetail` chamando `v2GetRouthcAssessmentDetailOptions()`.
- [ ] No `use-roth-c-module-mock.ts`: trocar toast-stub finalize por `createRothcAssessment` com o `RothCModuleMockFormValues` serializado para o payload do backend.
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

- [ ] Confirmar que os operarion IDs do LCA no SDK novo batem com os existentes em `src/services/lca/`.
- [ ] Verificar `LcaModuleFormValues` contra tipos gerados — ajustar casts se necessário.
- [ ] Verificar fluxo de cálculo: `calculateProject` retorna `LcaCalculationResponse` compatível com `lca-result.tsx`.

### Fase 5 — Wiring: Regenerative (já funcional)

- [ ] Confirmar que endpoints regenerative existentes continuam compatíveis com SDK novo.

### Fase 6 — Verificação final

- [ ] Rodar `bun lint`, `bun run typecheck` e `bun run build`.
- [ ] Validar fluxo completo: criar farm → LCA assessment → RothC assessment → BAT assessment → resultados.
- [ ] Validar auth: login, reset password, permissões.
- [ ] Nenhum mock residual: `PROJECT_FACTOR`, toast-stubs, dados hardcoded.
- [ ] CodeGraph sync.

## Aceite

- [ ] SDK regenerado uma única vez após schema backend final.
- [ ] Nenhum patch manual em `src/client/`.
- [ ] Todos os módulos consomem endpoints reais (sem mocks/stubs).
- [ ] RothC dual-scenario funcional com BAU + Project reais.
- [ ] BAT funcional com score e classificação.
- [ ] Lint, typecheck, build verdes.
- [ ] Nenhuma alteração visual ou regra de domínio não intencional.

## Notas

- A URL base da API (`/api/v1/routhc/`) mantém o nome `routhc` (backend legado).
  O frontend encapsula em `src/services/roth-c/` com nome de produto `carbon-removal`.
  Esse desacoplamento é intencional e não deve ser "corrigido".
- `how_many_years_future` do form frontend está no `parametros_projeto` mas pode não
  estar no schema de resposta — não adicionar ao backend se ausente.
