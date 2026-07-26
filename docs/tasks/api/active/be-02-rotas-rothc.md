# BE-02 — Rotas de edição, exclusão e clone do RothC

> **Prioridade:** Alta | **Assignee:** @Matheus Rodrigues | **Status:** Pendente

## Escopo

- `PATCH /api/v1/routhc/calculations/{id}/update/` — editar cálculo RothC
- `DELETE /api/v1/routhc/calculations/{id}/delete/` — soft-delete
- `POST /api/v1/routhc/calculations/{id}/clone/` — clonar para novo cenário

## Regras

- Clone recalcula automaticamente com dados Open-Meteo
- Soft-delete não remove resultados mensais (RothcMonthlyResult)
- Tenant scoping via ProjectFarm

## Checklist

- [ ] Serializers + @extend_schema
- [ ] Services com recálculo pós-clone
- [ ] Testes
- [ ] `routhc/urls.py`
