# BE-28 — Solo: remover carbono orgânico, matéria orgânica e talhão

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-60

## Contexto

Auditoria BE-26 confirmou: `organic_carbon_pct`, `organic_matter` e `field_name` não
alimentam nenhum cálculo (`lca/services.py`, `lca/selectors.py`) — remoção segura.
Umidade do solo segue vinda de textura/clima/drenagem (usada nos insumos).

## Escopo

- Remover os 3 campos de `LcaProjectSoil` + `LcaProjectSoilCreateSerializer` +
  `LcaProjectSoilResponseSerializer` + `LcaDetailSoilSerializer`.
- Migration drop das colunas.
- Manter `clima`, `soil_texture`, `soil_moisture`, `soil_drainage`.
- Atualizar factories/tests que referenciam os campos; ajustar contrato em
  `LcaProjectCultureDetail` (chave `soil`).

## Checklist

- [ ] Model + serializers sem os 3 campos
- [ ] Migration
- [ ] Tests verdes + `spectacular --validate`
