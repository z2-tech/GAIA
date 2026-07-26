# BE-09 — Fix: incluir opção "Perene" em Clima e Solo (LCA)

> **Prioridade:** Alta | **Assignee:** @léo bola | **Status:** Pendente

## Escopo

Adicionar a opção "Perene" nos campos de clima e tipo de solo do módulo LCA.

## Mudanças

- `LcaProjectSoil`: adicionar "Perene" nas choices de clima e/ou soil_type
- Verificar se afeta os cálculos em `lca/calculos/`
- Atualizar serializer para aceitar novo valor

## Checklist

- [ ] Model (choices/enum) + migration
- [ ] Atualizar lca/calculos/ se necessário
- [ ] Serializer + teste
