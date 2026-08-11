# BE-21 — RothC: destravar POST do assessment (material do composto + how_many_years_future)

> **Prioridade:** Alta | **Assignee:** — | **Status:** Priorizado
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

## O que fazer

- `material`: `required=False, allow_blank=True, default=""`.
- `how_many_years_future`: tornar opcional no fluxo de assessment. **Atenção:**
  `RouthcCalcularRequestSerializer` (v1, `routhc/serializers.py:70-78`) reutiliza o mesmo
  `ParametrosProjetoSerializer`. Verificar se o v1 depende do campo antes de afrouxar
  globalmente; se depender, criar um serializer de parâmetros próprio para o assessment
  em vez de mudar o compartilhado.

## Aceite

- [ ] `POST /api/v2/routhc/assessments/` passa sem `material` e sem `how_many_years_future`.
- [ ] `POST /api/v1/routhc/calcular/` intacto — suíte existente verde.
- [ ] Schema regenerado sem warnings.
