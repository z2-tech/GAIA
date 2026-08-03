# FE-16 — Hook Claude biome-fix + guard de import `@/client`

> **Prioridade:** Média | **Assignee:** — | **Status:** ✅ Concluído
>
> Já implementado no `gaia-web` branch `develop`. `.claude/hooks/biome-fix.sh` existe;
> `biome.jsonc` tem `noRestrictedImports` com boundaries app/features/services (guard
> de `@/client`). Registro.

## Contexto

Dois enforcements pequenos de Gate 3, dependem de FE-13 (Biome):

1. `.claude/hooks/eslint-fix.sh` (PostToolUse) deveria ser `biome-fix.sh`;
   `.claude/settings.json` aponta pro eslint.
2. Boundary leaks de `@/client` (ver FE-22) precisam de guard estático pra não
   voltar: proibir import de `@/client/**` em `src/app/**` e
   `src/features/**/components/**` (type-only permitido onde necessário).

## Solução

- Substituir `eslint-fix.sh` por `biome-fix.sh` + atualizar `settings.json`.
- Regra `no-restricted-imports` (no `biome.jsonc` do FE-13, ou ESLint) bloqueando
  `@/client/**` fora de `src/services/**`.

## Checklist

- [ ] `.claude/hooks/biome-fix.sh` (remove `eslint-fix.sh`)
- [ ] `.claude/settings.json` aponta pro novo hook
- [ ] regra `no-restricted-imports` de `@/client` (allow `import type`)
- [ ] Rodar guard, confirmar que pega os leaks do FE-22

## Refs

- doc: `docs/agents/web/libs-tooling.md`, `architecture.md` (camadas)
- files: `gaia-web/.claude/hooks/`, `gaia-web/.claude/settings.json`, `gaia-web/biome.jsonc`
- dep: FE-13
