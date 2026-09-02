---
tags: [decision]
---

# 2026-09-01 — LCA manejo anual, net líquido e comparação dinâmica

## Contexto

Reunião define: LCA atual só contabiliza emissões; manejo do solo deve bonificar sequestro anual (`Líquido = Emissões − Remoções`, pode ser negativo). LUC penaliza 20a histórico, manejo bonifica presente. UI precisa campo Manejo na aba Solo (11 opções) e barra verde de remoção abatendo total. Comparação deve permitir inter-cultura/módulo/talhão/fazenda/projeto intra-tenant, com LGPD (sem cross-user) e benchmark anônimo ≥5. Staged `develop` trouxe `comparison/` + `lca/comparison/` duplicados (644 linhas), fator duplicado enum+DB+migration, N+1 em builders.

Planilha `LCA_Annual_Crops_Tool.xlsx` (`Manejo_do_solo` (G−L)*44/12*E vs novo delta anual) e `Fatores de emissão Gaia.pptx` (tabela 10→11 práticas com deltas tC/tCO2e) confirmam relação net e fatores por manejo.

## Decisão

- **DB SSOT:** `LcaSoilManagementFactor` com `SoilManagementPractice` choices, 11 seed em `0039_add_soil_management_practice.py` (ordem `sort_order`). Inclui `DEGRADED_PASTURE (−0.73)` diferencial vs `WELL_MANAGED (+1.72)`. Cálculo `lca/calculations/soil_management_annual.py` puro; service `_build_annual_soil_management` busca DB via `LcaSelectors` com fallback enum para testes. `GET /api/v1/lca/soil-management-practices/` lista DB ordenado. Próxima tabela Paulo Rocha = migration data sobre `delta_*`.
- **Net líquido:** `total_agro.total.net` e `total_agro.total_agricultural.net` + `total.<produto>.<criterio>.total.net` = `fossil+bio−removal`. Serializers `net` opcional default 0. Dashboard usa `net` (negativo = sequestro).
- **Comparação dinâmica (styleguide Views→Services→Selectors→Models):** app `comparison` orquestrador com `DISPATCH` registry por módulo (`get_by_ids`, `filter`, `calc_map`, `benchmark_rows`, opcional `build_item`). `lca/comparison/selectors.filter_cultures_by_scope` filtra via subquery `ProjectFarm` (corrige `FieldError` em `project_farm_id` int) para `project_ids/farm_ids/plot_ids/crop_codes/harvest_year`. `ComparisonService.compare` batch prefetch `ProjectFarm` (corrige N+1) e dispatch builder; `lca/comparison/services` virou shim fino que reusa `_build_lca_item` genérico e adapta para contrato rico. `comparison` rotas genéricas + `lca/comparison` shim mantêm compatibilidade. Benchmark `BENCHMARK_MIN_N=5` anônimo (`avg/median/p25/p75`) tenant-isolado.
- **Dedup:** removido `lca/comparison/services` duplicado (242 linhas) → shim 60 linhas; serializers mantidos (contratos diferentes gerencial vs rico). `comparison/selectors` lazy import evita ciclo.

## Consequências

- Adicionar nova calculadora: criar `app/comparison/selectors.py` com 4 funções + builder, registrar em `comparison/selectors.DISPATCH`; sem editar orquestrador.
- Testes: `lca/tests/test_soil_management_annual.py` (vectors, net) + `comparison/tests/test_comparison_api.py` (N cenários, cap, 403, benchmark) cobrem padrão; full suite 617 OK (617→617 após seed `get_or_create` para idempotência pós-truncate).
- Vault: `Sustainability-Metrics` documenta manejo/net/benchmark; `Backend-API` registra apps; plano salvo em `~/.agent/plans/effervescent-purring-puppy.md`.

## Alternativas consideradas

- Enum SSOT sem DB (ponytail lite) — descartado: exigia seed mutável sem deploy.
- Manter dois `ComparisonService` completos — descartado: 644 linhas duplicadas, drift de métrica.
- Cálculo com DB query direta — descartado: quebra pureza `lca/calculations`.

