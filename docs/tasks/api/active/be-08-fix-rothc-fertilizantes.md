# BE-08 — Fix RothC: adicionar coluna de fertilizantes

> **Prioridade:** Alta | **Assignee:** @Matheus Rodrigues | **Status:** Pendente

## Escopo

Adicionar campo de aporte de fertilizantes no modelo RothcCalculation e incluí-lo no cálculo mensal.

## Mudanças

- `RothcCalculation`: adicionar `fertilizer_kg_ha` (DecimalField)
- Migration: valor default 0 para cálculos existentes
- `routhc/calculos/`: incorporar no modelo de decomposição mensal
- Serializer + view: expor campo

## Checklist

- [ ] Model + migration
- [ ] Atualizar cálculo em `routhc/calculos/`
- [ ] Serializer + teste
