# FE-15 — husky + lint-staged + commitlint

> **Prioridade:** Alta | **Assignee:** — | **Status:** ✅ Concluído
>
> Já implementado no `gaia-web` branch `develop` (commit `f048389`). `.husky/pre-commit`,
> `.husky/commit-msg`, `commitlint.config.mjs`, `lint-staged` presentes. Registro.

## Contexto

`libs-tooling.md` manda git hooks: husky + lint-staged (pre-commit) e commitlint
(commit-msg). gaia-web não tem `.husky/`, nem `lint-staged`, nem `commitlint`.
Depende de FE-13 (Biome) para o comando de pre-commit.

## Solução

- Instalar `husky`, `lint-staged`, `@commitlint/cli`, `@commitlint/config-conventional`.
- `.husky/pre-commit` → `lint-staged` → `biome check --write`.
- `.husky/commit-msg` → `commitlint`.
- Bloco `lint-staged` no `package.json`.
- `commitlint.config.mjs` (Conventional Commits, header ≤88).

## Checklist

- [ ] Deps instaladas + `husky init`
- [ ] `.husky/pre-commit` (lint-staged → biome)
- [ ] `.husky/commit-msg` (commitlint)
- [ ] bloco `lint-staged` em `package.json`
- [ ] `commitlint.config.mjs`
- [ ] Testar: commit com msg inválida é bloqueado

## Refs

- doc: `docs/agents/web/libs-tooling.md`, `code-standards.md` (commits)
- files: `gaia-web/.husky/`, `gaia-web/commitlint.config.mjs`, `gaia-web/package.json`
- dep: FE-13
