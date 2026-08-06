# FE-23 — Remover cross-feature + shared→feature imports

> **Prioridade:** Média | **Assignee:** — | **Status:** ✅ Concluído (2026-08-06)
>
> Implementado em `gaia-web` branch `develop`.

## Problema

`principles.md` P5 / `architecture.md`: features não importam de features irmãs;
shared (`components/`) nunca importa de `features/`.

Os caminhos abaixo são os reais na `develop` — o card original citava os nomes
pré-FE-17/18 (`fazenda/`, `projeto/`, `regenerativo/`), renomeados para EN desde então.

| Violação | Arquivo | Estado no início |
|----------|---------|------------------|
| feature→feature | `features/farm/components/farm-header.tsx:5` importa `useProject` de `@/features/project` | real |
| feature→feature | `features/farm/components/farm-kml-map.client.tsx:7-8` importa `fit-to-bounds` + `kml-layer` de `@/features/project` | real |
| feature→feature | `features/regenerative/dashboard/dashboard.tsx:5` importa `useFarm` de `@/features/farm` | real |
| shared→feature | `components/cards/card-farm.tsx` importava `useProjeto` de `@/features/projeto` | **já corrigido** antes deste card |

## Solução

- Subir componentes de mapa compartilhados (`kml-layer`, `fit-to-bounds`) para
  `src/components/`.
- Resolver os imports cross-feature de hooks no ponto de uso.
- Guard estático para feature→feature.

### O que foi implementado

**Lift dos primitivos de mapa → `src/components/map/`:**

`kml-layer.tsx` e `fit-to-bounds.tsx` saíram de
`features/project/components/new-farm/map/` para `src/components/map/`, conteúdo
verbatim (`git mv` puro, sem diff de conteúdo). Ambos só importam `geojson`,
`leaflet`, `react-leaflet` e `react` — zero acoplamento a feature, então o lift não
carrega dependência pra camada shared.

Consumidores atualizados para `@/components/map/*`:
`features/farm/components/farm-kml-map.client.tsx` e
`features/project/components/new-farm/map/map-view.client.tsx`.

**Ficaram na feature de propósito:** `plots-layer.tsx`, `map-view.client.tsx`,
`map-view.tsx` e `map-view.css` — acoplados a `usePlotsMap` /
`features/project/state/plots-context`. O barrel `new-farm/map/index.ts` nunca
exportou os dois arquivos movidos, então não precisou de edição.

**Hooks cross-feature — sem lift:**

O card previa subir `useProject`/`useFarm` para `src/hooks/`. Não foi necessário:
nenhum dos dois consumidores queria o hook, só os params de rota.

- `farm-header.tsx` — `useFarm()` **já retorna** `projectId` (ele mesmo desestrutura de
  `useParams`). O import de `useProject` era redundante: virou
  `const { farm, projectId } = useFarm();`.
- `regenerative/dashboard/dashboard.tsx` — usava `useFarm()` só por `projectId, farmId`,
  nunca pelos dados da fazenda. Trocado por
  `useParams<{ projectId: string; farmId: string }>()`.

Subir `useFarm` para shared teria arrastado um hook acoplado a service
(`useGetFarmById`) para a camada de baixo sem nenhum ganho.

**Limpeza de config morta:**

`biome.jsonc` ainda carregava duas isenções nomeando `src/components/cards/card-fazenda.tsx`
— arquivo que não existe desde o FE-18 (é `card-farm.tsx`, e já não importa de feature).
Removidos o bloco de override `TODO(debt)` inteiro e a exclusão `!…/card-fazenda.tsx` do
bloco Shared. O guard shared→feature agora vale para `src/components/**` sem buracos.

**Guard feature→feature (`scripts/check-import-boundaries.mjs`):**

O `noRestrictedImports` do Biome é flat por glob — não expressa "não importe features
irmãs" sem ~11 blocos de override, cada um relistando os outros 10 features mais os
patterns de `@/app` e `@/client` (o Biome substitui `options`, não faz merge). Ficou um
script: deriva a lista de features de `src/features/*`, varre os `.ts`/`.tsx` de cada
uma e acusa qualquer `@/features/<X>` com `X !== F`. Pega `import … from`,
`export … from` e `import()` dinâmico; imprime `arquivo:linha` e sai 1.

Registrado como `bun lint:boundaries`. **Não** foi plugado no `lint` nem no lint-staged
— espelha o `check-i18n-parity.mjs`, que também é standalone (o `.husky/pre-commit` só
roda `bunx lint-staged`, e não existe `.github/workflows`).

## Checklist

- [x] Lift de componentes de mapa p/ shared
- [x] Lift de hooks cross-feature — resolvido no ponto de uso, sem lift (ver acima)
- [x] `card-farm` sem import de feature — já estava; removida a isenção morta que o escondia
- [x] Grep confirma 0 imports feature→feature e shared→feature
- [x] Guard/lint passa

## Verificação

| Check | Resultado |
|-------|-----------|
| `bun lint` | 332 arquivos, **0 erros**, 115 warnings, 2 infos — baseline idêntico |
| `bunx tsc --noEmit` | exit 0 |
| `bun lint:boundaries` | `Boundaries OK — 138 files across 11 features, 0 cross-feature imports` |
| `bun run build` | ✓ compilado, 27 rotas emitidas |
| `grep -rn '@/features/' src/components src/hooks src/lib src/services` | 0 hits |
| `grep -rn 'card-fazenda'` | 0 refs |

## Refs

- doc: `docs/agents/web/principles.md` (P5), `architecture.md`, `project-structure.md`
- relacionado: `fe-16-biome-hook-import-guard.md`, `fe-22-sdk-boundary-leaks.md`
