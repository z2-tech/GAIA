# BE-25 — RothC: definir se adubação orgânica entra no cálculo de carbono

> **Prioridade:** Média | **Assignee:** — | **Status:** Refinamento (decisão pendente)
> **Plane:** [GAIA-41](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/fac4bb32-3187-4229-a05f-c68b42b4c035)

## Contexto

O wizard do mock trata composto como sub-step **obrigatório** por cenário: o usuário
precisa lançar ao menos uma aplicação ou marcar explicitamente `compost_not_applicable`.
O peso dado na UX sugere que o dado influencia o resultado.

## Problema

- `RothcCompostEntry` é persistido (`routhc/services.py:675-693`) mas não entra na
  simulação.
- `_run_monthly_simulation` recebe apenas `dados_mensais` (`routhc/services.py:626-647`).
  Composto não chega lá.
- O composto vira exclusivamente `taxa_adubacao_organica = compost_total / modeled_years`
  em `_compute_scenario_summary` (`routhc/services.py:743-746`) — um número de relatório.

Consequência: a adubação orgânica não altera o estoque de carbono do solo. Num assessment
com BAU sem composto e Projeto com composto, o delta de carbono ignora a principal
alavanca do cenário de projeto. Como composto é entrada de carbono orgânico, isso pode ser
um furo científico do modelo RothC.

## Decisão necessária antes de implementar (`sustainability-specialist`)

- **(a) Composto soma entrada de carbono** → definir fator de conversão kg/ha → kg C/ha
  por tipo de material, somar em `calcular_entrada_c`
  (`routhc/calculos/entrada_c.py`) e ajustar o split DPM/RPM, que hoje deriva só do
  `plant_residue_ratio`.
- **(b) Fora do escopo do modelo** → manter como métrica de relatório, registrar a decisão
  e o porquê em `docs/vault`, e reavaliar se o step obrigatório do wizard deve continuar
  obrigatório — hoje ele sugere uma influência que não existe.

## Aceite (se opção a)

- [ ] Entrada de C mensal inclui o composto do mês e do cenário correspondentes.
- [ ] Teste: cenário com composto tem estoque de carbono maior que o mesmo cenário sem
      composto.
- [ ] Metodologia e fatores documentados em `docs/vault`.
