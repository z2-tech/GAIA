# BE-19 — RothC assessment: aceitar ciclos de cultura perene e anual

> **Prioridade:** Alta | **Assignee:** — | **Status:** Priorizado
> **Plane:** [GAIA-35](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/190abdf2-7f8d-4780-98e4-e2aa4434981c)
> **Origem:** análise do mock `carbon-removal` do gaia-web · relacionado a [FE-28](../../web/active/fe-28-fechamento-frontend-mvp.md)

## Contexto

O wizard mock de carbon-removal no gaia-web (`src/features/carbon-removal/module-mock/`)
é a especificação do fluxo RothC dual-scenario. Ele modela cultura **fora** do
grid mensal, em duas estruturas por cenário.

## Problema — bloqueador principal

Os modelos são incompatíveis.

Frontend envia, por cenário:

- `perennial: { cultura, productivity_by_year: [{ano, produtividade}] }` — uma linha por ano
- `annual: [{cultura, produtividade, inicio_ano, inicio_mes, fim_ano, fim_mes}]` — 1 a 3 ciclos
  por ano, ciclo podendo cruzar o ano civil (soja out/2020 → jan/2021)

Backend não tem esses campos:

- `RouthcScenarioDataSerializer` (`routhc/serializers.py:255`) não declara `perennial`
  nem `annual`. Só guarda `crop_type` como string.
- `DadoMensalSerializer` (`routhc/serializers.py:34-42`) só aceita `produtividade` +
  `cultura` **por linha mensal**.
- O grid mensal do mock nunca preenche produtividade/cultura — `monthly-grid-step.tsx`
  escreve apenas `dpm_rpm`, `cobertura_solo` e `entrada_biomassa_kg_ha`.

Consequência: no modo `productivity_crop`, **toda** linha mensal falha em
`DadoMensalSerializer.validate` com "Deve fornecer entrada_biomassa_kg_ha ou
(produtividade + cultura)". Metade do wizard não consegue submeter.

## O que fazer

- Adicionar `perennial` e `annual` a `RouthcScenarioDataSerializer`, exigidos quando
  `monthly_input_mode == "productivity_crop"`.
- Expandir ciclo → meses no service, derivando `cultura` e `produtividade` por mês antes
  de `_run_monthly_simulation`. A expansão é regra de domínio e não deve virar loop no
  frontend.
- **Definir e documentar a regra de rateio**: ciclo de N meses com produtividade P — P em
  cada mês, P/N por mês, ou P concentrado no mês de colheita? Consultar
  `sustainability-specialist`.
- Perene: `productivity_by_year` cobre todos os anos da janela; distribuir por mês com a
  mesma regra.
- Validar no backend o que o frontend já valida em `collectAnnualCycleErrors`: ciclos
  dentro da janela de modelagem; 1 a 3 ciclos por ano; todo ano da janela com pelo menos
  1 ciclo.
- Manter `monthly_input_mode == "biomass"` funcionando exatamente como hoje.

## Aceite

- [ ] `POST /api/v2/routhc/assessments/` aceita cenário perene e cenário anual **sem**
      produtividade/cultura nas linhas mensais.
- [ ] Testes: perene; anual com 1 ciclo; anual com 3 ciclos no mesmo ano; ciclo cruzando o
      ano civil; ciclo fora da janela (400); ano sem ciclo (400); mais de 3 ciclos por ano (400).
- [ ] Regra de rateio documentada em `docs/vault`.
- [ ] `spectacular --validate --fail-on-warn` verde.

## Nota de contrato (correção é no gaia-web)

`cropEnumValues` do frontend (`roth-c-module-mock.ts:20-31`) tem `"SOIL"`; o enum
`Cultura` do backend tem `"SOYBEAN"`. Os outros 9 valores batem. `SOIL` é typo do
frontend para soja — se passasse pelo ChoiceField, `INDICE_COLHEITA["SOIL"]` levanta
`KeyError` (`routhc/calculos/entrada_c.py:32`). **Não adicionar SOIL no backend**; abrir
correção no gaia-web.
