# BE-63 — Remoção de Carbono: manejo do solo (fator anual) + líquido emissões-remoções + serviço de comparação multi-cenário

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído
> **Plane:** GAIAPROJEC-144 | **BE-63**
> **Origem:** Reunião + `Fatores de emissão Gaia.pptx` + `LCA_Annual_Crops_Tool.xlsx`

## Contexto

LCA atual contabiliza apenas emissões. Manejo do solo deve bonificar sequestro anual (fator ΔC → ΔCO₂e × área), permitindo **Total Líquido = Emissões − Remoções** com saldo negativo quando remoção > emissão. LUC (20a histórico, penalização) permanece separado do manejo atual (presente, bonificação).

Fonte primária: *Fatores de emissão Gaia.pptx* — 10 práticas (0,22→0,72 tC ha⁻¹ ano⁻¹ → 0,81→2,64 tCO₂e ha⁻¹ ano⁻¹) × área_ha = remoção/emissão biogênica anual. Convencional (−0,81) = emissão biogênica. Escopo decidido: 10 como seed (is_active), fator × area_ha, convencional → bio_emission, per_ha default, comparação multi-módulo (LCA + demais quando houver), benchmark anônimo incluso, cap 20, campo opcional. Atualizado para 11 com `DEGRADED_PASTURE (−0.73)`.

Estado prévio (develop): `LcaProjectSoil` sem prática atual; LUC 20a em `land_use_change.py`; `total_agro.py`/`total.py` somavam fossil/bio/removal sem abater → sem net; comparação inexistente (tenant via `ProjectSelectors.user_has_project_farm_access`).

## Decisões

- DB SSOT: `LcaSoilManagementFactor` (code, label_pt/en, delta_tC_ha_year, delta_tCO2e_ha_year, reference, is_active, sort_order) seedado com 11 do PPTX (ordem sort_order 1-11). `DEGRADED_PASTURE` diferencial vs `WELL_MANAGED`.
- Campo `LcaProjectSoil.current_management_practice` (nullable, choices `SoilManagementPractice`), seletor dropdown na aba Solo.
- Cálculo anual: `delta = factor_tCO2e_ha_year × area_ha`; `removal = max(delta,0)`, `emission = max(−delta,0)` tCO₂e/ano; normalizado `kgCO₂e/kg = tCO₂e×1000/harvested_kg` em `lca/calculations/soil_management_annual.py`; service `_build_annual_soil_management` lê DB via `LcaSelectors` com fallback enum.
- Net líquido: `total_agro.total.net = fossil+bio−removal` por bloco (total_agricultural/luc/total) e `total.<produto>.<criterio>.total.net`; pode ser negativo; PPT barra verde abate total.
- Comparação: `POST /api/v1/lca/comparison/` (cap 20, `assessment_ids` xor `filters {project_ids,farm_ids,plot_ids,crop_codes,harvest_year}`) + `GET /benchmark` (avg/median/p25/p75, `available:false` se <5, sem PII) e genérico `POST /api/v1/comparison/comparison/` + `GET /benchmark` via `DISPATCH` registry (`lca/carbono/regenerativo/biodiversidade/cfp`) tenant-isolado (403 cross-user), batch `ProjectFarm` prefetch.
- Serializers/Views: `GET /api/v1/lca/soil-management-practices/` + `LcaAnnualSoilSerializer`/`LcaTotalAgroSerializer.net`.

## Checklist

- [x] Enum `SoilManagementPractice` + 11 fatores (inclui DEGRADED_PASTURE) + migration 0039 seed
- [x] `LcaProjectSoil.current_management_practice` + serializers/views solo
- [x] `soil_management_annual.py` + desacoplamento LUC/anual em `LcaService.calculate` + net em `total_agro.py`/`total.py` + `net` nos serializers
- [x] `comparison` orquestrador DISPATCH + `lca/comparison` shim rico (dedup, batch) + filtros dinâmicos por projeto/fazenda/talhão
- [x] `spectacular --validate --fail-on-warn` OK; 617 testes OK (inclui `test_soil_management_annual` + `test_comparison_api`)
- [x] Vault: `Sustainability-Metrics` (manejo/net/benchmark) + `Backend-API` + `decisions/2026-09-01-...` + plano `~/.agent/plans/effervescent-purring-puppy.md`

## Arquivos

`lca/enum/soil_management_practice.py`, `lca/migrations/0039_add_soil_management_practice.py`, `lca/models.py`, `lca/calculations/soil_management_annual.py`, `lca/calculations/total*.py`, `lca/selectors.py`, `lca/services.py`, `lca/serializers.py`, `lca/views.py`, `lca/comparison/*`, `comparison/*`, `lca/tests/test_soil_management_annual.py`, `comparison/tests/test_comparison_api.py`

## Referências

- `docs/references/domain/LCA_Annual_Crops_Tool.xlsx` (Manejo_do_solo, Total_Agro, Total)
- `Fatores de emissão Gaia.pptx` (tabela deltas + DOIs CORAZZA 1999, TIECHER 2020, POEPLAU & DON 2015, BAYER 2006, OLIVEIRA 2022/2023, CARVALHO 2010, LORENZ & LAL 2014, DE STEFANO & JACOBSON 2018, SHANG 2024)
- `lca/comparison` + `comparison` DISPATCH
