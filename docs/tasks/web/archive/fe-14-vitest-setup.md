# FE-14 — Vitest + Testing Library (jsdom) + smoke test

> **Prioridade:** Alta | **Assignee:** — | **Status:** ✅ Concluído
>
> Já implementado no `gaia-web` branch `develop` (commit `f048389`). `vitest` +
> scripts `test`/`test:ci` presentes. Card mantido como registro.

## Contexto

`libs-tooling.md` manda Vitest + Testing Library + jsdom. gaia-web tem 0 testes,
sem `vitest.config.ts`, sem binário instalado.

## Solução

- Instalar `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
- `vitest.config.ts` (ambiente jsdom, `passWithNoTests`) + `vitest.setup.ts`.
- Scripts `test` e `test:ci`.
- Smoke test inicial: `src/lib/masks.test.ts`.

## Checklist

- [ ] Deps instaladas
- [ ] `vitest.config.ts` + `vitest.setup.ts`
- [ ] scripts `test`, `test:ci` em `package.json`
- [ ] `src/lib/masks.test.ts` passando
- [ ] `bun run test:ci` verde

## Refs

- doc: `docs/agents/web/libs-tooling.md`
- files: `gaia-web/vitest.config.ts`, `gaia-web/vitest.setup.ts`, `gaia-web/package.json`
