# FE-23 — Remover cross-feature + shared→feature imports

> **Prioridade:** Média | **Assignee:** — | **Status:** ⬜ Pendente

## Problema

`principles.md` P5 / `architecture.md`: features não importam de features irmãs;
shared (`components/`) nunca importa de `features/`.

| Violação | Arquivo |
|----------|---------|
| feature→feature | `features/fazenda/components/fazenda-header.tsx:4` importa `@/features/projeto/...` |
| feature→feature | `features/regenerativo/dashboard/dashboard.tsx:4` importa `@/features/fazenda/...` |
| feature→feature | `features/fazenda/components/fazenda-kml-map.client.tsx:8-9` importa `@/features/projeto/...` |
| shared→feature | `components/cards/card-fazenda.tsx:4` importa `useProjeto` de `@/features/projeto` |

## Solução

- Subir componentes de mapa compartilhados (`kml-layer`, `fit-to-bounds`) para
  `src/components/` ou `src/lib/`.
- Subir hooks consumidos entre features (`useProjeto`/`useFazenda`) para
  `src/hooks/` ou expor via service.
- `card-fazenda` recebe dado por prop, não chama hook de feature.

## Checklist

- [ ] Lift de componentes de mapa p/ shared
- [ ] Lift de hooks cross-feature
- [ ] `card-fazenda` sem import de feature
- [ ] Grep confirma 0 imports feature→feature e shared→feature
- [ ] Guard/lint passa

## Refs

- doc: `docs/agents/web/principles.md` (P5), `architecture.md`, `project-structure.md`
