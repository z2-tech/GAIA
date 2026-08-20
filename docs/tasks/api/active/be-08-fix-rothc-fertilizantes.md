# BE-08 — Fix RothC: adicionar coluna de fertilizantes

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)

## Escopo

Adicionar campo de aporte de fertilizantes no modelo RothcCalculation.

## Entregue

- `RothcCalculation.fertilizer_kg_ha`: `FloatField(null=True, blank=True)`
- Migration `0005_add_fertilizer_field`
- Campo disponível no modelo para uso futuro — mock atual não consome
- Incorporação no cálculo mensal (`rothc/calculos/`) fica para quando o produto definir a semântica

## Checklist

- [x] Model + migration
- [ ] Atualizar cálculo em `routhc/calculos/` (post-MVP, requer definição de domínio)
- [x] Campo disponível no ORM
