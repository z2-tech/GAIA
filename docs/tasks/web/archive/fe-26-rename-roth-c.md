# FE-26 — Renomear service dir `routh-c` → `roth-c`

> **Prioridade:** Baixa | **Assignee:** — | **Status:** ✅ Concluído
>
> Executado junto com **FE-19** em `feat/fe-19` (gaia-web).

## Problema

Typo no domínio: `src/services/routh-c/` (correto: `roth-c`, de RothC). Arquivos
e importadores usam o nome errado.

## Checklist

- [x] Renomear dir `src/services/routh-c/` → `roth-c/`
- [x] Renomear `routh-c.query.ts` / `routh-c.mutation.ts` → `roth-c.*`
- [x] Atualizar todos os importadores
- [x] Hooks internos (`useRouthC*`) → `useRothC*` (alinha com FE-19)
- [x] `bunx tsc --noEmit` limpo

> **Notas:** SDK gerado (`src/client/**` `Routhc*` / `calcularRouthc`) intocado — contrato OpenAPI.
> Feature module: `roth-c-module.*`, `useRothCModule`, `RothCModuleFormValues`.

## Refs

- doc: `docs/agents/web/project-structure.md`, `naming-conventions.md`
- relacionado: FE-19 (identifiers)
