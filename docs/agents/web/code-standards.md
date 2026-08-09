---
tags: [standards, code]
scope: gaia-web
status: approved
---

# Padrões de Código — gaia-web

Gate 4. Como escrever cada linha. O Gate 2 definiu arquitetura, o Gate 3 o
tooling; este doc é a **política de código** — as regras que o Biome/commitlint
enforçam (Gate 3) mais as que são só convenção (comentários, PR). Fundado em
[`principles.md`](principles.md). Enforcement em [`libs-tooling.md`](libs-tooling.md).

> **Enforcement**: cada regra marca a origem — `Biome:error` (bloqueia),
> `Biome:warn` (débito pré-existente, promove após limpar), `commitlint`, ou
> **convenção** (revisão humana, sem lint).

## 1. TypeScript

- **Sem enum.** `as const` object + tipo derivado, nunca `enum` TS.
  `Biome:error (noEnum)`.
  ```ts
  export const USER_ROLE = { admin: "admin", manager: "manager" } as const;
  export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
  ```
- **Sem barrel files.** Import direto do arquivo, não `index.ts` re-export.
  `Biome:warn (noBarrelFile)`.
- **Evitar type assertions** (`as`, `!`). Preferir narrowing/guards.
  `Biome:warn (noNonNullAssertion)`.
- **Sem `any`.** Tipar de verdade ou `unknown` + narrowing. `Biome:warn (noExplicitAny)`.
- **Path alias** `@/*` → `src/*`.
- **Componentes como `export const Foo = () => {}`** (estilo maioria); `export function`
  onde o hoisting ajuda. Convenção, não lint.
- **Idioma: inglês em todo identificador** ([princípio 8](principles.md) ·
  [naming-conventions](naming-conventions.md)). `Biome:error (useFilenamingConvention, kebab-case)`.

## 2. React

- **Ref-as-prop** (React 19): tipar `{ ref?: Ref<T> }`. **Nunca `forwardRef`**
  (deprecado). `Biome:warn (noReactForwardRef)` — autofix quebrado, migrar à mão.
- **Hooks no topo**, nunca condicional. `Biome:error (useHookAtTopLevel — hoje warn)`.
- **Sem componente definido dentro de componente.** `Biome:warn (noNestedComponentDefinitions)`.
- **`"use client"`** em todo arquivo de `features/`/`services/` que usa hooks
  (App Router é server por padrão). Convenção.

## 3. Async & tratamento de erro

[Princípio 7](principles.md): erro é valor, não exceção.

- **Dentro do React Query** — callbacks, nunca `try/catch` em `mutateAsync`:
  ```ts
  useMutation({
    ...createFarmMutation(),
    onSuccess: () => toast.success(t("saveSuccess")),
    onError: (error) => toast.error(handleApiError(error, t("saveError"))),
  });
  ```
- **Fora do RQ** — `safePromise` → `[value, null] | [null, Error]`:
  ```ts
  const [data, error] = await safePromise(uploadFile());
  if (error) return toast.error(t("uploadFailed"));
  ```
- `try/catch` cru só p/ `finally` ou recuperação compartilhada por vários statements.
- **Erros de API**: `handleApiError(error, fallback)` extrai `title→detail→message→error`;
  `applyValidationErrors` mapeia erro de validação backend → RHF (`setError`).
  Detalhe em [`api-layer.md`](api-layer.md). Convenção (não lintável).

## 4. Comentários

Default: **zero comentário** ([princípio 1](principles.md)). Nomes e tipos carregam
o significado; o código diz o QUE. Comentário só existe para um **PORQUÊ que o
código não consegue carregar**. Convenção (revisão). Origem: feedback direto do
Gustavo.

**Regra de ouro**: apague o comentário e releia o código. Ainda dá para entender?
Então o comentário estava morto. Escreva o mínimo de comentários possível.

### Permitido (raro — 1 a 2 linhas)

| Caso | Exemplo |
|------|---------|
| **Algoritmo genuinamente complexo** — matemática ou domínio que não se lê do código | dígito verificador de CPF/CNPJ, RothC, projeção geo, parser binário |
| **Desvio consciente do padrão** — está fora da convenção *por um motivo* | workaround de bug de lib (cite lib + sintoma), ordem de execução obrigatória, otimização medida |
| **Invariante/constraint oculto** que quebra em silêncio se violado | "backend exige os dois campos na mesma request" |

Nesses casos comente o **motivo**, não a mecânica.

### Proibido

- JSDoc que repete o nome — `/** Valida CPF */` sobre `isValidCPF`.
- Comentário de seção/passo em código óbvio — `// monta payload`, `// retorna`.
- Narrativa, parágrafo, tutorial, exemplo de uso que o teste já cobre.
- Histórico: "era X antes", "movido de Y", nome de ticket ou de agente — git cobre.
- Justificativa de escolha de design → **corpo do PR** ([§7](#7-commits--prs)).
- Prosa redeclarando o tipo — o tipo já é a documentação.
- **Código comentado** → deletar.
- `TODO`/`FIXME` sem issue vinculada.

### Forma

- Comentário sobrevivente é em **inglês** — é código ([princípio 8](principles.md)).
- Uma linha `//` imediatamente acima do trecho que explica.
- `JSDoc` só em API pública compartilhada (`components/`, `lib/`) cujo consumidor
  não vê a implementação — e só a parte não-óbvia dela.

### Fora do escopo desta regra

- `src/client/**` é **gerado** (`@hey-api/openapi-ts`) — não editar, não limpar.
- `src/components/ui/**` é vendorizado do shadcn — manter como veio para não
  poluir o diff de upgrade.
- Diretivas de ferramenta não são comentários: `"use client"`, `biome-ignore`,
  `eslint-disable`. Onde a ferramenta aceitar motivo, escreva o motivo.

## 5. Imports & fronteiras

- **Import direto**, sem barrel ([§1](#1-typescript)).
- **Fluxo unidirecional** `shared → services → features → app`
  ([architecture](architecture.md)). `Biome:error (noRestrictedImports)`.
- **Tipos DTO de `@/client`**: `import type` OK em domínio/services (`.ts`);
  componente `.tsx` consome UI model, não DTO (`architecture.md`).
  **Chamadas do SDK** só via `services/` (Biome + hook `block-generated`).

## 6. Naming (recap)

Fonte completa: [`naming-conventions.md`](naming-conventions.md). Essencial:

- Arquivos/pastas/rotas/features: **kebab-case inglês**. `Biome:error`.
- Componentes/tipos `PascalCase`; hooks `use` + camelCase; vars/funções camelCase.
- Handlers `handleX`; booleanos `isX`/`hasX`/`canX`.
- Constantes-objeto `UPPER_SNAKE_CASE`; primitivas camelCase.

## 7. Commits & PRs

- **Conventional commits**: `feat(scope): subject`, `fix:`, `chore:`, `docs:`, `refactor:`.
  Header **≤88 chars**. `commitlint` (commit-msg hook).
- **1 feature por PR**, a partir de `develop`.
- **Narrativa vai no corpo do PR**, não em comentário de código ([§4](#4-comentários)).
- Nenhum commit/push/merge sem autorização explícita. Convenção.

## 8. Estados de UI

- Todo componente que busca dados ou renderiza conteúdo possivelmente `undefined`
  no primeiro paint avalia **loading state** (skeleton/shimmer), **empty state** e
  **error state**. Padrões visuais em [`design-system.md`](design-system.md);
  formalização no Gate 6. Convenção.

## Mapa regra → enforcement

| Regra | Origem |
|-------|--------|
| no-enum, kebab-case, boundaries, hooks-top-level | `Biome:error` |
| no-barrel, no-assertion, no-any, no-forwardRef, no-nested-component | `Biome:warn` (débito → promover) |
| conventional commit, header ≤88 | `commitlint` |
| zero-comentário-default ([§4](#4-comentários)) | **convenção** (revisão — reprova PR) |
| erro-é-valor, `safePromise`, `handleApiError`, `"use client"`, PR, UI states | **convenção** (revisão) |

Promoção dos `warn → error`: checklist em [`libs-tooling.md`](libs-tooling.md).
