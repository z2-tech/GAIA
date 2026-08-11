# BE-24 — RothC: corte por período no assessment dual-scenario

> **Prioridade:** Média | **Assignee:** — | **Status:** Refinamento (decisão pendente)
> **Plane:** [GAIA-40](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/c4e21add-223c-4316-be84-3eb8da9d1366)

## Contexto

A tela de resultado do mock (`src/features/carbon-removal/calculation-mock/`) tem seletor
de ano. Hoje ela usa duas queries v2 single-scenario:
`GET /api/v2/routhc/calculations/{id}/` para os bounds e `GET .../period/` para a fatia.

## Problema

- `GET /api/v2/routhc/assessments/{id}/` devolve `bau` e `project` inteiros, sem
  `available_years` e sem recorte por período.
- Não existe equivalente dual de `calculations/{id}/period/` (`routhc/urls_v2.py`).
- Se o frontend migrar para o endpoint de assessment, perde o seletor de ano.

## Decisão necessária antes de implementar (produto / UX)

- **(a) Manter o seletor** → criar
  `GET /api/v2/routhc/assessments/{id}/period/?ano_inicio=&mes_inicio=&ano_fim=&mes_fim=`
  devolvendo `bau` + `project` + deltas recalculados sobre a fatia, e adicionar
  `available_years` ao detail.
- **(b) Remover o seletor** → nenhuma mudança de backend. Fechar esta task e ajustar o
  escopo do [FE-28](../../web/active/fe-28-fechamento-frontend-mvp.md).

## Aceite (se opção a)

- [ ] Endpoint devolve os mesmos campos de `RouthcAssessmentDetail`, recortados pelo
      período pedido.
- [ ] `available_years` presente no detail.
- [ ] Deltas recalculados sobre a fatia, não copiados do total.
- [ ] Testes: recorte parcial; período fora dos bounds; período invertido.
