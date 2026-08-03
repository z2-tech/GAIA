# FE-26 — Renomear service dir `routh-c` → `roth-c`

> **Prioridade:** Baixa | **Assignee:** — | **Status:** ⬜ Pendente

## Problema

Typo no domínio: `src/services/routh-c/` (correto: `roth-c`, de RothC). Arquivos
e importadores usam o nome errado.

## Checklist

- [ ] Renomear dir `src/services/routh-c/` → `roth-c/`
- [ ] Renomear `routh-c.query.ts` / `routh-c.mutation.ts` → `roth-c.*`
- [ ] Atualizar todos os importadores
- [ ] Hooks internos (`useRouthC*`) → `useRothC*` (alinha com FE-19)
- [ ] `bunx tsc --noEmit` limpo

## Refs

- doc: `docs/agents/web/project-structure.md`, `naming-conventions.md`
- relacionado: FE-19 (identifiers)
