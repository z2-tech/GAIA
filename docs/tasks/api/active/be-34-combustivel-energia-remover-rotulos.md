# BE-34 — Combustível e Energia elétrica: remover rótulos/categoria, FE fixo

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-66

## Contexto

Combustível perde `rotulo`; energia perde `rotulo` e `categoria`. Auditoria confirmou:
`FE_ENERGIA = 0.0385095647762709 tCO2-eq/MWh` (MCTI 2023) já é fixo por MWh, sem
variação por matriz. Comprovante vira evidência. Contrato-alvo: `TargetLcaFuelInput` /
`TargetLcaEnergyInput`.

## Escopo

- Remover `rotulo` de `LcaProjectFuelItem` + serializers.
- Remover `rotulo` e `categoria` de `LcaProjectEnergyItem` + serializers.
- `comprovante_file` → `evidencia_file` em ambos.

## Checklist

- [ ] Model + serializers sem rótulos/categoria; com evidência
- [ ] Migration + testes + `spectacular --validate`
