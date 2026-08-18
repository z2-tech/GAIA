# BE-35 — Transporte/Distância: evidência + fator fixo 0,1470

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-17)
> **Plane:** GAIAPROJEC-67

## Contexto

Distância ganha campo de evidência. Cálculo passa a ser `km informado × 0,1470`
(tonelada de emissão por km, biodiesel congelado por ora). Decisão PO 16/08: aplicar
0,1470 conforme ata da reunião 14/08, substituindo `FE_TRANSP_FOSSIL`/`FE_TRANSP_BIO`.

## Escopo

- Adicionar `evidencia_file` em `LcaProjectTransport` + serializers.
- Trocar fatores em `alocado.py` pelo fator fixo único `0.1470`; manter lógica de
  alocação por produto.
- Registrar no vault a substituição do fator Ecoinvent 3.9.1 (0.1047) pela decisão de
  negócio.

## Checklist

- [ ] Model + serializers com evidência
- [ ] Cálculo usa fator 0,1470
- [ ] Migration + testes + `spectacular --validate`
