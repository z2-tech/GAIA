# BE-21 — RothC: fechar parâmetros e metadados do POST assessment

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)
> **Plane:** [GAIA-37](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/7e9bfdd4-3777-43dc-8794-c10257218f9f)

## Contexto

Dois campos obrigatórios no serializer que o wizard do mock não envia. Cada um sozinho
devolve 400 e impede qualquer submissão.

## Problema 1 — `material` do composto

- `RouthcCompostEntrySerializer` (`routhc/serializers.py:248-252`) exige
  `material = serializers.CharField(max_length=255)`, sem `required=False`.
- O step de composto do mock (`compost-step.tsx`) coleta apenas `ano`, `mes` e
  `quantidade_kg_ha`. Não existe campo material na UI.
- O service já trata o campo como opcional: `material=entry.get("material", "")`
  (`routhc/services.py:689`). A obrigatoriedade está só no serializer.

## Problema 2 — `how_many_years_future`

- `ParametrosProjetoSerializer` (`routhc/serializers.py:13`) exige
  `how_many_years_future = serializers.IntegerField(min_value=1)`.
- `RouthcServiceV2.create_assessment` nunca lê o campo — usa apenas `latitude`,
  `soc_tons_ha`, `clay_content_percent` e `depth_soil_layer_cm`
  (`routhc/services.py:600-603`).
- O mock não envia o campo. Obrigatório e morto no fluxo v2.

## Problema 3 — coordenadas divergentes

- O serviço buscava clima com latitude/longitude da fazenda, mas calculava radiação com a
  latitude enviada em `parametros_projeto`.
- Um assessment podia combinar dois locais sem erro.

## O que fazer

- Criar serializer de parâmetros próprio do assessment com apenas `soc_tons_ha`,
  `clay_content_percent` e `depth_soil_layer_cm`.
- Remover `latitude` e `how_many_years_future` do contrato v2; preservar o contrato v1.
- Usar latitude/longitude da fazenda tanto no clima quanto na radiação e persistir a
  latitude da fazenda no cálculo.
- `material`: metadado opcional, `required=False, allow_blank=True, default=""`.

## Aceite

- [x] `POST /api/v2/routhc/assessments/` passa sem `material`, `latitude` e
      `how_many_years_future`; campos desconhecidos são rejeitados.
- [x] `POST /api/v1/routhc/calcular/` intacto — suíte existente verde.
- [x] Schema regenerado sem warnings.

## Entregue

- `AssessmentParametrosProjetoSerializer` com apenas `soc_tons_ha`, `clay_content_percent`, `depth_soil_layer_cm`
- V1 `ParametrosProjetoSerializer` preservado com `latitude` e `how_many_years_future`
- `AssessmentCompostEntrySerializer` com `material` opcional (`required=False, allow_blank=True, default=""`)
- `StrictAssessmentSerializer` rejeita campos desconhecidos recursivamente
- Clima e radiação usam coordenadas da fazenda, não do payload
