---
tags: [standards, tooling]
scope: gaia-web
status: approved
---

# Libs & Tooling — gaia-web

Gate 3 do plano de padronização. Fecha os gaps de engenharia: sem formatador,
0 testes, sem git hooks. Config executável vive no `gaia-web` (não roda de outro
repo); esta política é canônica no GAIA. Fundado em [`principles.md`](principles.md)
e [`architecture.md`](architecture.md).

## Stack de tooling

| Área | Ferramenta | Config (gaia-web) |
|------|------------|-------------------|
| Lint + Format | **Biome** 2.5 | `biome.jsonc` |
| Regras Next-específicas | ESLint + eslint-config-next (mínimo) | `eslint.config.mjs` |
| Testes | **Vitest** + Testing Library + jsdom | `vitest.config.ts`, `vitest.setup.ts` |
| Git hooks | **husky** + **lint-staged** | `.husky/`, `lint-staged` em `package.json` |
| Commits | **commitlint** (conventional, header ≤88) | `commitlint.config.mjs` |
| Claude hooks | block-generated, biome-fix, typecheck | `.claude/settings.json`, `.claude/hooks/` |

## Scripts (`package.json`)

| Script | Faz |
|--------|-----|
| `bun lint` | `biome check` (lint + format check, todo o repo) |
| `bun run lint:fix` | `biome check --write` (aplica fixes seguros) |
| `bun run lint:next` | `eslint` (regras Next: `next/image`, Core Web Vitals) |
| `bun run format` | `biome format --write` |
| `bun run typecheck` | `tsc --noEmit` |
| `bun test` | `vitest` (watch) |
| `bun run test:ci` | `vitest run --coverage` |
| `bun run generate-types` | regenera `src/client/` do OpenAPI |

## Biome — decisões

- **Substitui ESLint** para lint geral + formatação. ESLint fica só para regras
  que o Biome não cobre (Next.js). Não rodar os dois no mesmo escopo de estilo.
- **Boundaries** (`noRestrictedImports` em `overrides`) enforçam o fluxo
  `shared → services → features → app` de [`architecture.md`](architecture.md):
  - `features/**` não importa `@/app`.
  - shared (`components`, `hooks`, `lib`, `utils`, `i18n`) não importa `@/features`/`@/app`.
  - `services/**` não importa `@/features`/`@/app`.
  - **Tipos DTO de `@/client` são livres** em qualquer camada — só as chamadas do
    SDK passam por `services/` (convenção + hook `block-generated`).
- **`useSortedAttributes` desligado** — bug no Biome 2.5.6 que duplica o prop
  `render` em `<Controller>` (corrompe JSX). `organizeImports` continua ligado.
- **`*.css` excluído** — o parser CSS do Biome não entende Tailwind v4
  (`@theme`, `@custom-variant`).
- **`src/client` excluído** — árvore gerada.

### Níveis `error` vs `warn`

- `error` = regra limpa hoje, enforçada para código novo (format, `noEnum`,
  kebab-case, import-type, boundaries).
- `warn` = violação pré-existente que o código carrega. Não bloqueia; limpa
  oportunisticamente ao tocar o arquivo, depois promove para `error`.

Estado inicial (adoção do Biome): **0 errors, ~125 warnings** de débito. `tsc` limpo.

## Débito a promover (warn → error)

Ao zerar as violações de cada regra, promover para `error` em `biome.jsonc`:

| Regra | Nota |
|-------|------|
| `useExhaustiveDependencies`, `useHookAtTopLevel` | deps de hooks/RQ |
| `noExplicitAny`, `noNonNullAssertion` | escapes de tipo |
| `noBarrelFile` | eliminar `index.ts` re-export |
| a11y (`useButtonType`, `useSemanticElements`, ...) | maioria em `components/ui/**` (shadcn vendored) |
| `noReactForwardRef` | migrar para ref-as-prop (autofix quebra — fazer à mão) |
| `useParseIntRadix`, `useTemplate`, `useOptionalChain`, `noGlobalIsNan` | mecânicos, `biome check --write --unsafe` por arquivo com revisão |

## Fluxo de enforcement

- **PostToolUse (Claude)**: `biome-fix.sh` formata o arquivo editado; `typecheck.sh`
  roda `tsc` (async, não bloqueia).
- **PreToolUse (Claude)**: `block-generated.sh` barra edição de `src/client/`.
- **pre-commit (husky)**: `lint-staged` roda `biome check --write` nos arquivos
  staged — força limpo-ao-tocar.
- **commit-msg (husky)**: `commitlint` valida conventional commit.
- **SessionStart**: `bun install` se faltar `node_modules`.

## Testes

- Vitest + Testing Library (jsdom). Setup em `vitest.setup.ts` (jest-dom + cleanup).
- Alvo prioritário: **camada de domínio** (schemas, mappers, cálculos LCA/RothC/regen)
  — funções puras, sem React. Ver [`architecture.md`](architecture.md).
- `passWithNoTests` ligado durante a adoção. Smoke test inicial: `src/lib/masks.test.ts`.
- Casar esforço à mudança: feature/lógica nova → teste; fix → 1 regressão; trivial → nenhum.
