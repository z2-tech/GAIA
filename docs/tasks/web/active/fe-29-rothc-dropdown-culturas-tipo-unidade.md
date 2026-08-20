# FE-29 — RothC: dropdown de culturas agrupado por tipo e unidade de produtividade

> **Prioridade:** Média | **Assignee:** Macarini | **Status:** Backlog
> **Plane:** [GAIAPROJEC-57](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/38e99fd0-5bc0-4497-b7c4-084fdfb0f5cd)
> **API:** [BE-26](../../api/active/be-26-rothc-catalogo-culturas-tipo-e-ms.md)

## Contexto

O backend agora classifica as 27 culturas RothC em `annual`/`perennial` e expõe o
catálogo em `GET /api/v2/rothc/crops/`:

```json
{ "code": "MANGO", "name_pt": "Manga", "name_en": "Mango",
  "harvest_index": 0.15, "crop_type": "perennial", "dry_matter_fraction": 0.17 }
```

O Web hoje consome uma lista hardcoded via i18n (`enums.crop` em `messages/*.json`),
que inclui `SOIL` (inexistente no backend) e não tem o tipo nem a unidade correta de
produtividade.

## Escopo

1. Camada de serviço em `src/services/` consumindo `GET /api/v2/rothc/crops/`
   (TanStack Query, cache curto — catálogo estático por deploy). Regenerar o SDK
   (`bunx @hey-api/openapi-ts`) antes.
2. Dropdown de cultura (`crop-step.tsx` do `carbon-removal/module-mock`) com opções
   **agrupadas por tipo** (anuais × perenes), labels do backend (pt/en via locale).
   Substituir a leitura de `enums.crop` pelo serviço; remover `SOIL`.
3. Unidade de produtividade por cultura: culturas com `dry_matter_fraction < 1`
   (PALMA 0.10, MANGO 0.17, AVOCADO 0.25, CITRUS 0.13) têm produto fresco —
   o campo pede **t produto fresco/ha**. Demais: t MS/ha. Exibir hint/unit no input.
   Nenhuma conversão no cliente — o backend aplica a fração.
4. Zod: manter enum de códigos aberto (`z.string()` + validação contra catálogo) para
   não quebrar o mock com os 10 códigos novos (RYE, MILLET, TOBACCO, PASTURE, PALMA,
   MANGO, EUCALYPTUS, AVOCADO, CITRUS, COCOA).
5. Pastagem: quando `crop_type === "perennial"` e cultura = PASTURE, exibir nota de que
   pastejo deve usar modo biomassa + `IMPROVED_GRASSLAND` (PASTURE = corte/fenação).

## Fora de escopo

- Filtro automático do select por `crop_type` do cenário (anual só no anual): validar
  como melhoria posterior; o backend não rejeita a combinação hoje.
- Conversão de unidades no cliente.

## Aceite

- [ ] Dropdown agrupado (anuais × perenes) com as 27 culturas, sem `SOIL`.
- [ ] Unit/hint de produtividade correto para frutíferas (produto fresco) e demais (MS).
- [ ] i18n: chaves novas em `messages/pt.json` E `messages/en.json`.
- [ ] `bun lint` e `bun run build` verdes.
