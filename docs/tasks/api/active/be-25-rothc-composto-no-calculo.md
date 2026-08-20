# BE-25 — RothC: incorporar carbono orgânico ao cálculo

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)
> **Plane:** [GAIA-41](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/fac4bb32-3187-4229-a05f-c68b42b4c035)

## Contexto

O wizard do mock trata composto como sub-step **obrigatório** por cenário: o usuário
precisa lançar ao menos uma aplicação ou marcar explicitamente `compost_not_applicable`.
O peso dado na UX sugere que o dado influencia o resultado.

## Problema

- `RothcCompostEntry` é persistido (`rothc/services.py:675-693`) mas não entra na
  simulação.
- `_run_monthly_simulation` recebe apenas `dados_mensais` (`rothc/services.py:626-647`).
  Composto não chega lá.
- O composto vira exclusivamente `taxa_adubacao_organica = compost_total / modeled_years`
  em `_compute_scenario_summary` (`rothc/services.py:743-746`) — um número de relatório.

Consequência: a adubação orgânica não altera o estoque de carbono do solo. Num assessment
com BAU sem composto e Projeto com composto, o delta de carbono ignora a principal
alavanca do cenário de projeto. Como composto é entrada de carbono orgânico, isso pode ser
um furo científico do modelo RothC.

## Decisão fechada (`sustainability-specialist`)

- O novo input é `carbono_organico_kg_c_ha`: kg de carbono orgânico por hectare, não massa
  fresca/seca do material.
- Modelar como FYM-equivalente: 49% DPM, 49% RPM e 2% HUM.
- Adicionar depois da decomposição mensal; a entrada começa a decompor no mês seguinte.
- Não passar pelo split vegetal nem por `calcular_entrada_c`.
- `material` é metadado opcional, não fator de conversão.
- Preservar `quantidade_kg_ha` legada como massa física nullable. Não converter nem
  renomear valores existentes; quando houver somente massa legada, a taxa nova é `null`.

## Aceite

- [x] Entrada de C mensal inclui o composto do mês e do cenário correspondentes.
- [x] Teste de conservação: 1.000 kg C/ha adicionam 0,49 DPM + 0,49 RPM + 0,02 HUM,
      sem CO₂ adicional no mês da aplicação.
- [x] Teste: decomposição da entrada começa no mês seguinte e somente o cenário alterado
      muda.
- [x] Metodologia e fatores documentados em `docs/vault`.

## Entregue

- `_build_compost_map` gera mapa `(ano, mes) → carbono_organico_ton_c_ha`
- `_run_monthly_simulation` recebe `compost_by_month` e aplica FYM-equivalente (49/49/2%) após decomposição
- `RothcCompostEntry` persistido com `carbono_organico_kg_c_ha`
- Testes em `TestCompost`: conservação de massa, cenário isolado
- Metodologia documentada em `docs/vault/concepts/Sustainability-Metrics.md`
