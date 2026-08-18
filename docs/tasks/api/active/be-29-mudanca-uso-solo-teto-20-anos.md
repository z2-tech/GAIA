# BE-29 — Mudança de uso do solo (absorver manejo + teto de 20 anos)

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-61

## Contexto

Bloco vira só "Mudança de uso do solo" (manejo do solo absorvido). Timeline composta
por selects base IPCC: 1 "manejo atual" + N "manejo anterior + anos desde mudança".
Teto rígido de 20 anos; mudanças >20 anos = emissão zero; distribuição linear.
Contrato-alvo: `TargetLcaLandUseChange` / `TargetLcaLandUseChangeEntry`.

## Decisões

- `csolo`/`cbm` deixam de ser digitados: resolvidos server-side pela tabela IPCC
  (be-38) a partir de `LandUseType` (+ clima).
- Janela de 20 anos ancorada no ano da colheita (não no ano mais recente digitado).
- O cálculo existente em `mudanca_uso_solo.py` já tem amortização linear e corte em 19
  anos — adaptar para consumir o novo formato.
- `FATOR_TOTAL = 0.5` hardcoded: manter e registrar decisão pendente com PM.

## Checklist

- [ ] Modelo único (substitui `LcaProjectSoilManagement` + `LcaProjectLandUseChange`/Year)
- [ ] Serializer input/response novo formato
- [ ] Cálculo consumindo tabela IPCC + janela 20 anos
- [ ] Migration + testes + `spectacular --validate`
