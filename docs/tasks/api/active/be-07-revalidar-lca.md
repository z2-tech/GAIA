# BE-07 — Revalidar LCA baseado nos fixes solicitados e planilha EIQ

> **Prioridade:** Alta | **Assignee:** @Matheus Rodrigues | **Status:** Pendente

## Escopo

Revisar e corrigir o módulo LCA existente conforme feedback recebido e a planilha `EIQ_Final.xlsx`.

## Planilha de referência

`docs/references/domain/EIQ_Final.xlsx` — 1636 ingredientes ativos com valores EIQ

## Ações

- [ ] Verificar se os cálculos em `lca/calculos/` batem com a metodologia ISO 14040/14044
- [ ] Comparar fatores de emissão atuais com valores EIQ da planilha
- [ ] Ajustar `LcaFertilizer`, `LcaFuelType`, `LcaSeed`, `LcaDefensive` conforme necessário
- [ ] Validar unidades (kg CO2e, GWP100)
- [ ] Rodar `lca/tests/` após ajustes
- [ ] Documentar divergências encontradas em `docs/vault/concepts/Sustainability-Metrics.md`
