# FE-18 — EN migration: pastas de feature + arquivos

> **Prioridade:** Alta | **Assignee:** — | **Status:** ✅ Concluído
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

- [x] Renomear pastas de feature + subpastas para EN
- [x] Renomear ~125 arquivos PT → EN (kebab-case)
- [x] Atualizar todos os imports (`@/features/...`)
- [x] Grep por caminhos PT residuais
- [x] `bun run build` limpo

> **Notas de execução (`feat/fe-18` em gaia-web):**
> - 9 features + 5 subfolder patterns + 126 files via `git mv`; 165 import path rewrites / 95 files.
> - Judgment: `vinculo→relationship`, `user-projetos→use-projects`, `enviar-kml→upload-kml` (+ dropzone).
> - Símbolos PT mantidos de propósito (`useProjetos`, `TalhoesContext`, `VINCULOS`, `EnviarKml`, …).
> - `regenerative/` + `login/` intocados. `bun lint` + `bun run build` ✅.

## Refs

- doc: `docs/agents/web/naming-conventions.md`, `project-structure.md`, `principles.md` (P8)
- épico: FE-10
