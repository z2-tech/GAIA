# BE-24 — RothC: corte por período no assessment dual-scenario

> **Prioridade:** Média | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)
> **Plane:** [GAIA-40](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/c4e21add-223c-4316-be84-3eb8da9d1366)

## Contexto

A tela de resultado do mock (`src/features/carbon-removal/calculation-mock/`) tem seletor
de ano. Hoje ela usa duas queries v2 single-scenario:
`GET /api/v2/routhc/calculations/{id}/` para os bounds e `GET .../period/` para a fatia.

## Problema

- `GET /api/v2/routhc/assessments/{id}/` devolve `bau` e `project` inteiros, sem
  `available_years` e sem recorte por período.
- Não existe equivalente dual de `calculations/{id}/period/` (`routhc/urls.py`).
- Se o frontend migrar para o endpoint de assessment, perde o seletor de ano.

## Decisão fechada

Manter o seletor completo de mês/ano e criar
`GET /api/v2/routhc/assessments/{id}/period/?ano_inicio=&mes_inicio=&ano_fim=&mes_fim=`.
`periodo_inicio` e `periodo_fim` tipados são suficientes para gerar os anos; não adicionar
`available_years` redundante ao detail.

## Aceite

- [x] Endpoint devolve os mesmos campos de `RouthcAssessmentDetail`, recortados pelo
      período pedido.
- [x] Resposta contém `periodo_inicio` e `periodo_fim` tipados com a fatia efetiva.
- [x] Deltas recalculados sobre a fatia, não copiados do total.
- [x] Culturas e taxa de carbono orgânico consideram apenas a fatia.
- [x] Testes: recorte parcial; período fora dos bounds; período invertido.

## Entregue

- `GET /api/v2/routhc/assessments/{id}/period/` em `routhc/urls.py` → `get_assessment_detail_by_period`
- `RouthcServiceV2.get_assessment_detail_by_period` com validação de bounds e recálculo de deltas
- `_compute_scenario_summary` aceita `period` tuple opcional
- Testes em `TestAssessmentPeriod`: recorte parcial, fora dos bounds, invertido
