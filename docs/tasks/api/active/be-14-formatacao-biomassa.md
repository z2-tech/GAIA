# BE-14 — Formatação do número "Aporte de biomassa anual" no RothC

> **Prioridade:** Baixa (Backlog) | **Assignee:** Fernando | **Status:** ✅ Verificado (2026-08-11)

## Escopo

Verificar e corrigir a formatação do campo `aporte_biomassa` no resultado do RothC.

## Verificação

- Service já aplica `round(x, 2)` no `aporte_biomassa` (`routhc/services.py`)
- Serializer usa `serializers.FloatField()` — sem truncamento ou multiplicação indevida
- Formatação correta: 2 casas decimais, sem alteração necessária

## Checklist

- [x] Unidade confirmada (kg/ha/ano)
- [x] Formatação decimal correta
- [x] Nenhuma alteração de código necessária
