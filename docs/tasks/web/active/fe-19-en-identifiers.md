# FE-19 — EN migration: identifiers (hooks/types/consts/vars)

> **Prioridade:** Alta | **Assignee:** — | **Status:** ⬜ Pendente
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

## Checklist

- [ ] Renomear hooks PT → `use` + camelCase EN
- [ ] Renomear tipos/interfaces PT
- [ ] Renomear vars/consts locais PT
- [ ] Atualizar todos os call sites
- [ ] `bunx tsc --noEmit` limpo

## Refs

- doc: `docs/agents/web/naming-conventions.md`, `principles.md` (P8)
- épico: FE-10
