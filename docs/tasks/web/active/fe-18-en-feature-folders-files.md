# FE-18 — EN migration: pastas de feature + arquivos

> **Prioridade:** Alta | **Assignee:** — | **Status:** ⬜ Pendente
>
> Sub-card do épico **FE-10**. 1 PR mecânico. Fazer **depois** do FE-17 (rotas).

## Escopo

Renomear features PT + subpastas + ~125 arquivos PT para inglês (principle 8),
atualizar imports.

| Feature PT | EN alvo |
|-----------|---------|
| `projetos` (lista) | `projects` |
| `projeto` (single) | `project` |
| `fazenda` | `farm` |
| `carbono-emissao` | `carbon-emission` |
| `carbono-remocao` | `carbon-removal` |
| `regenerativo` | `regenerative` |
| `biodiversidade` | `biodiversity` |
| `perfil` | `profile` |
| `usuarios` | `users` |
| `recuperar-senha` | `recover-password` |

Subpastas: `modulo/` → `module/`, `resultado/` → `result/`, `calculo/` → `calculation/`.
Arquivos: `dados-mensais-step.tsx` → `monthly-data-step.tsx`, etc.

> `project` e `projects` continuam **features distintas** (decisão FE-17).

## Checklist

- [ ] Renomear pastas de feature + subpastas para EN
- [ ] Renomear ~125 arquivos PT → EN (kebab-case)
- [ ] Atualizar todos os imports (`@/features/...`)
- [ ] Grep por caminhos PT residuais
- [ ] `bun run build` limpo

## Refs

- doc: `docs/agents/web/naming-conventions.md`, `project-structure.md`, `principles.md` (P8)
- épico: FE-10
