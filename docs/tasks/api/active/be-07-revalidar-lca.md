# BE-07 — Reespecificar e revalidar LCA

> **Prioridade:** Alta | **Assignee:** @Matheus Rodrigues | **Status:** Bloqueado por BE-18 D0

## Escopo

Revisar o módulo LCA somente após obter metodologia e fatores de emissão rastreáveis. `EIQ_Final.xlsx` mede risco de pesticidas e não valida GHG, GWP ou fatores LCA.

## Fontes

- Fonte científica LCA: ausente; adquirir na fase D0 de BE-18.
- `EIQ_Final.xlsx`: 631 nomes preenchidos; fonte exclusiva do futuro módulo EIQ.

## Ações

- [ ] Definir metodologia, fronteiras, unidade funcional, GWP e versões de fatores
- [ ] Verificar `lca/calculos/` contra fontes LCA/IPCC/Ecoinvent aprovadas
- [ ] Ajustar `LcaFertilizer`, `LcaFuelType`, `LcaSeed`, `LcaDefensive` conforme necessário
- [ ] Validar unidades (kg CO2e, GWP100)
- [ ] Rodar `lca/tests/` após ajustes
- [ ] Documentar divergências encontradas em `docs/vault/concepts/Sustainability-Metrics.md`
