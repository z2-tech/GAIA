# BE-03 — Suporte a múltiplos preenchimentos no módulo Regenerativo

> **Prioridade:** Alta | **Assignee:** @léo bola | **Status:** Pendente

## Escopo

Permitir que um ProjectFarm tenha múltiplos assessments regenerativos (lista), não apenas 1.

## Mudanças

- `RegenerativeAssessment`: remover `unique_together` com ProjectFarm
- Adicionar campo `name` ou `label` para identificação
- `GET /api/v1/regenerative/assessments/` — filtrar por project_farm
- Manter dashboard: somar/escolher qual assessment usar

## Checklist

- [ ] Migration: remover unique constraint + adicionar label
- [ ] Atualizar selectors/serializers
- [ ] Testes
