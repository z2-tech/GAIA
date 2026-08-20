# BE-19 — RothC assessment: aceitar ciclos de cultura perene e anual

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)
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
  tocando cada ano, ciclo podendo cruzar o ano civil e sobrepor outro ciclo

Backend não tem esses campos:

- `RothcScenarioDataSerializer` (`rothc/serializers.py:255`) não declara `perennial`
  nem `annual`. Só guarda `crop_type` como string.
- `DadoMensalSerializer` (`rothc/serializers.py:34-42`) só aceita `produtividade` +
  `cultura` **por linha mensal**.
- O grid mensal do mock nunca preenche produtividade/cultura — `monthly-grid-step.tsx`
  escreve apenas `dpm_rpm`, `cobertura_solo` e `entrada_biomassa_kg_ha`.

Consequência: no modo `productivity_crop`, **toda** linha mensal falha em
`DadoMensalSerializer.validate` com "Deve fornecer entrada_biomassa_kg_ha ou
(produtividade + cultura)". Metade do wizard não consegue submeter.

## O que fazer

- Adicionar `perennial` e `annual` ao serializer específico do assessment, exigidos quando
  `monthly_input_mode == "productivity_crop"`.
- `produtividade` significa kg de matéria seca do produto colhido por hectare.
- Converter cada cultura separadamente em resíduo aéreo:
  `residuo = produtividade × (1 − HI) / HI`, com retenção de 100% no MVP.
- Anual: cultura fica ativa no intervalo inclusivo e o resíduo entra integralmente no mês
  final. Ciclos sobrepostos somam seus resíduos; o mesmo código de cultura mantém uma só
  associação mensal.
- Perene: `productivity_by_year` cobre todos os anos da janela e o resíduo anual é
  distribuído por 12. Ano parcial recebe apenas os meses presentes, sem renormalização.
- Pousio: mês sem ciclo tem entrada de biomassa zero e nenhuma cultura associada; a
  cobertura do solo continua sendo o valor explícito do grid.
- Validar no backend o que o frontend já valida em `collectAnnualCycleErrors`: ciclos
  dentro da janela de modelagem; 1 a 3 ciclos por ano; todo ano da janela com pelo menos
  1 ciclo.
- Manter `monthly_input_mode == "biomass"` funcionando exatamente como hoje.

## Aceite

- [x] `POST /api/v2/rothc/assessments/` aceita cenário perene e cenário anual **sem**
      produtividade/cultura nas linhas mensais.
- [x] Testes: perene; anual com 1 ciclo; anual com 3 ciclos no mesmo ano; ciclo cruzando o
      ano civil; ciclos sobrepostos; dois términos no mesmo mês; pousio; ciclo fora da
      janela (400); ano sem ciclo (400); mais de 3 ciclos tocando um ano (400).
- [x] Regra de rateio documentada em `docs/vault`.
- [x] `spectacular --validate --fail-on-warn` verde.

## Entregue

- `AssessmentScenarioSerializer` com `PerennialConfigSerializer` e `AnnualCycleSerializer`
- `_build_perennial_monthly` / `_build_annual_monthly` em `rothc/services.py`
- `_validate_assessment_input` cobre ciclos, janela, duplicidade
- Testes em `test_assessment.py`: `TestPerennial`, `TestAnnual`

## Nota de contrato (correção é no gaia-web)

`cropEnumValues` do frontend (`roth-c-module-mock.ts:20-31`) tem `"SOIL"`; o enum
`Cultura` do backend tem `"SOYBEAN"`. Os outros 9 valores batem. `SOIL` é typo do
frontend para soja — se passasse pelo ChoiceField, `INDICE_COLHEITA["SOIL"]` levanta
`KeyError` (`rothc/calculos/entrada_c.py:32`). **Não adicionar SOIL no backend**; abrir
correção no gaia-web.
