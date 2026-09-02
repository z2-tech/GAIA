# FE-41 — Pós-deploy: wiring comparação server-side + manejo solo + net líquido

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** Pendente (pós BE-63)
> **Plane:** GAIAPROJEC-145 | **FE-41**
> **Dependência:** BE-63 em homolog (OpenAPI publicado) | **API:** BE-63

## Contexto

Backend BE-63 entregou (develop, staged) manejo anual do solo (fator ΔC → ΔCO₂e × área), `Total Líquido = Emissões − Remoções` (net pode ser negativo), `GET /api/v1/lca/soil-management-practices/` (11 práticas, inclui `DEGRADED_PASTURE −0.73`) e serviço de comparação multi-cenário tenant-isolado (LGPD) + benchmark anônimo. Endpoints novos já validados (`spectacular --validate` OK): `GET /soil-management-practices/`, `POST /lca/comparison/` / `GET /lca/comparison/benchmark/` (cap 20, `is_stale`), `POST /comparison/comparison/` / `GET /comparison/benchmark/` (genérico via `module`), campos `annual_soil` + `net` em `total_agro`/`total`. `gaia-web` ainda usa SDK anterior. Interface permanece PT; apenas contrato/payloads seguem OpenAPI em inglês.

## Escopo

- [ ] Regenerar SDK **uma vez** contra homolog: `bun run generate-types`. Nunca editar `src/client/` manualmente.
- [ ] Camada services: criar/atualizar `src/services/lca/` e `src/services/comparison/` (TanStack Query) encapsulando novos endpoints; features nunca importam `src/client/` direto.
- [ ] Form Solo: seletor `current_management_practice` (dropdown 11 práticas, ordenado `sort_order`, label PT, filtra `is_active`; opcional, envia em `POST /soil/`).
- [ ] Cálculo/Resultado: exibir `annual_soil` (fator, remoção/emissão tCO₂e, per_ha/per_kg) + `net` (total/total_agricultural/luc) com destaque quando negativo; barra verde de remoção abatendo total em `Total_Agro` (PPT).
- [ ] Dashboard Regenerativo: refinamento visual (“dar um tapa”) — poucos indicadores mais atraentes, sem mudar métrica.
- [ ] Comparação: hook `useComparison` (mutation `POST /comparison/` com `assessment_ids` xor `filters {project_ids,farm_ids,plot_ids,crop_codes,harvest_year}`), normalizações `per_ha/per_kg/absolute`, tela `/comparar` com tabela lado a lado + summary (min/max/avg) + badge `is_stale`/`is_calculated`; benchmark anônimo (avg/median/p25/p75, `available:false` se <5).
- [ ] Filtros dinâmicos por projeto/fazenda/talhão (cap 20, tenant-isolado, LGPD 403 cross-user).
- [ ] i18n pt/en para novos rótulos (manejo, net, comparação) e validações.

## Áreas afetadas

- **LCA Soil:** `current_management_practice` (11 choices, inclui DEGRADED_PASTURE).
- **LCA Result:** `annual_soil` + `net` (fossil+bio−removal).
- **Regenerativo:** dashboard redesign leve.
- **Comparação:** novo módulo/feature `comparison` com DISPATCH multi-módulo (LCA hoje, stubs carbono/regenerativo/biodiversidade/CFP).

## Critérios de aceite

- `bun run generate-types` contra homolog conclui; `bun lint` + `bun run build` passam.
- Seletor lista 11 práticas ordenadas, CONVENTIONAL −0.81, DEGRADED −0.73, NO_TILL 1.39 etc. (usa `GET /soil-management-practices/`).
- Soil persiste `current_management_practice`; cálculo `NO_TILL_ROTATION_COVER 2.09 ×10ha=20.9 tCO₂e remoção`; CONVENTIONAL 8.1 tCO₂e emissão; net negativo renderizado.
- Dashboard: barra verde remoção abate total; net por produto×critério.
- Comparação: `assessment_ids [c1,c2]` e `filters {project_ids:[...]}` retornam 2 itens tenant-isolados; fazenda/talhão filtros OK; cap 20→400; cross-user→403; benchmark <5→`available:false`, ≥5→stats anon.
- Sem fallbacks/aliases contrato antigo; `null` com placeholder.

## Fora de escopo

- Migrations/backend adicionais; média global anônima sem threshold (já coberto benchmark ≥5); STIR/EIQ.

## Referências

- BE-63 (`docs/tasks/api/active/be-63-remocao-carbono-manejo-comparacao.md`, Plane GAIAPROJEC-144)
- Endpoints: `lca/soil-management-practices/`, `lca/comparison/`, `comparison/comparison/`
- PPT `Fatores de emissão Gaia.pptx`, planilha `LCA_Annual_Crops_Tool.xlsx`
