# FE-19 — EN migration: identifiers (hooks/types/consts/vars)

> **Prioridade:** Alta | **Assignee:** — | **Status:** ✅ Concluído
>
> Sub-card do épico **FE-10**. Depois de FE-18 (arquivos).

## Escopo

Renomear ~15 hooks PT + funções/tipos/vars/consts locais PT para inglês.

| PT atual | EN alvo |
|----------|---------|
| `useEditarSenha` | `useUpdatePassword` |
| `useNovaFazenda` | `useCreateFarm` |
| `useRouthCModulo` | `useRothCModule` |
| `useNovoProjeto` | `useCreateProject` |
| `useNovoUsuario` | `useCreateUser` |
| `useProjeto` / `useFazenda` | `useProject` / `useFarm` |

+ vars locais PT, tipos (`FazendaFormValues` → `FarmFormValues`), consts.
+ Escopo ampliado na execução: componentes feature, `lib/geo` (`Talhao`→`Plot`),
  cards/badge compartilhados, app page names; FE-26 (RothC service) folded in.

## Checklist

- [x] Renomear hooks PT → `use` + camelCase EN
- [x] Renomear tipos/interfaces PT
- [x] Renomear vars/consts locais PT
- [x] Atualizar todos os call sites
- [x] `bunx tsc --noEmit` limpo

> **Notas de execução (`feat/fe-19` em gaia-web):**
> - Create/Update verbs + file renames (`use-create-farm.ts`, `use-update-password.ts`, …).
> - Full sweep: feature hooks/components/types/locals, `lib/geo` Plot*, cards/badge, app pages.
> - FE-26 absorbed: `services/roth-c`, `useGetRothC*` / `usePostRothCCalculate`.
> - Skipped on purpose: `src/client/**` SDK `Routhc*`, i18n keys (FE-20), API/DTO snake_case fields, KML wire `"talhoes"`.
> - `bunx tsc --noEmit` ✅. `bun lint`: 1 pre-existing `noRestrictedImports` in `card-farm.tsx` (shared→features).

## Refs

- doc: `docs/agents/web/naming-conventions.md`, `principles.md` (P8)
- épico: FE-10
- relacionado: FE-26 (folded into this PR)
