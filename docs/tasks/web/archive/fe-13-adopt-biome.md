# FE-13 — Adotar Biome como lint+format primário (Gate 3)

> **Prioridade:** Alta | **Assignee:** — | **Status:** ✅ Concluído
>
> Já implementado no `gaia-web` branch `develop` (commit `f048389` — adopt Biome +
> Vitest + husky). Card mantido como registro. Checklist abaixo é referência do que
> foi entregue.

## Contexto

`libs-tooling.md` (Gate 3 aprovado) manda Biome 2.5 como linter+formatter
primário. gaia-web ainda usa só ESLint (`"lint": "eslint"`), sem `biome.jsonc`,
sem `@biomejs/biome` instalado. Enforcement ausente = drift continua entrando.

## Solução

- Instalar `@biomejs/biome`.
- `biome.jsonc` na raiz: boundaries de arquitetura (no-restricted-imports de
  `@/client` fora de services) + downgrades documentados de regra.
- Scripts: `lint:fix` (`biome check --write`), `format` (`biome format --write`).
- Demote ESLint para Next-only: `lint:next` (`eslint`).

## Checklist

- [ ] `bun add -d @biomejs/biome`
- [ ] `gaia-web/biome.jsonc` com regras + boundaries
- [ ] scripts `lint:fix`, `format` em `package.json`
- [ ] `eslint` vira `lint:next`
- [ ] Rodar `biome check --write` uma vez (baseline) e revisar diff
- [ ] Doc de exceções de regra no topo do `biome.jsonc`

## Refs

- doc: `docs/agents/web/libs-tooling.md`
- files: `gaia-web/biome.jsonc`, `gaia-web/package.json`, `gaia-web/eslint.config.mjs`
