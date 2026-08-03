# Naming Conventions

Canonical reference for how to name things in this repo.

## The table

| Element | Convention | Example |
|---|---|---|
| **Components** | PascalCase | `ModuloForm`, `FazendaHeader` |
| **Custom Hooks** | `use` + camelCase | `useRouthCModulo`, `useGetFarm` |
| **Props** | camelCase | `projectId`, `isLoading` |
| **Event Handlers** | `on` + PascalCase | `onChange`, `onSubmit` |
| **Handler functions** | `handle` + PascalCase | `handleSubmit`, `handleBack` |
| **State Variables** | camelCase | `currentStep`, `isHydrated` |
| **Booleans** | `is` / `has` / `can` + PascalCase | `isLoading`, `hasError`, `canSubmit` |
| **Variables / functions** | camelCase | `formValues`, `parseDecimal` |
| **Constants (primitives)** | camelCase | `defaultLocale` |
| **Constants (objects)** | UPPER_SNAKE_CASE | `FAZENDA_MENU_ITEMS`, `CARBONO_REMOCAO_MODULO_FORM_ID` |
| **Enum-like values** | `as const` array | `monthlyInputModeValues` — no TypeScript enums |
| **Types from Const** | PascalCase | `MonthlyInputMode`, `FazendaMenuMessageKey` |
| **Types / Interfaces** | PascalCase | `RouthCModuloFormValues`, `ApiErrorShape` |
| **Files** | kebab-case | `routh-c-modulo.ts`, `use-routh-c-modulo.ts` |

## Files

All filenames are kebab-case. Domain suffixes signal the file's role:

| Suffix | Role |
|---|---|
| `*.tsx` | React component or page shell |
| `*.ts` | Logic, utilities, or types |
| `*.query.ts` | TanStack Query read hooks (under `src/services/<domain>/`) |
| `*.mutation.ts` | TanStack Query write hooks |
| `*.schema.ts` / schema in `schemas/` folder | Zod schema factories + mappers |
| `use-*.ts` | Custom React hook |

Examples: `routh-c.query.ts`, `use-routh-c-modulo.ts`, `routh-c-modulo.ts` (schema).

## Routes (Next.js App Router)

- `page.tsx` for the route entry point (Next.js convention).
- Folder names: kebab-case Portuguese for domain routes (`carbono-remocao`, `regenerativo`), English for service-layer directories (`routh-c`, `regenerative`, `lca`).
- Route groups use parentheses: `(auth)`, `(private)`, `(dashboard)`.
- Dynamic segments use brackets: `[projetoId]`, `[fazendaId]`.

## Service hooks

| Hook type | Convention | Example |
|---|---|---|
| Query (single) | `useGet<Resource>` | `useGetRouthC`, `useGetFarm` |
| Query (list) | `useList<Resource>` | `useListRouthC`, `useListProjects` |
| Mutation (create) | `useCreate<Resource>` | `useCreateRegenerativeAssessment` |
| Mutation (update) | `useUpdate<Resource>` | `useUpdateRegenerativeAssessment` |
| Mutation (delete) | `useDelete<Resource>` | `useDeleteFarm` |
| Mutation (action) | `use<Verb><Resource>` | `usePostRouthCCalculate` |

## Schema factories and mappers

| Function | Convention | Example |
|---|---|---|
| Schema factory | `create<Feature>Schema` | `createRouthCModuloSchema` |
| Empty values factory | `empty<Feature>FormValues` | `emptyRouthCModuloFormValues` |
| Form values type | `<Feature>FormValues` | `RouthCModuloFormValues` |
| API → form mapper | `detailToFormValues` | — |
| Form → create body | `valuesToCreateBody` | — |
| Form → update body | `valuesToUpdateBody` | — |

## Form ID constants

One constant per form, SCREAMING_SNAKE_CASE, at the top of the schema or hook file:

```ts
export const CARBONO_REMOCAO_MODULO_FORM_ID = "carbono-remocao-modulo-form"
```

## i18n keys

Top-level keys: camelCase matching the domain (`routhC`, `regenerative`, `carbonEmission`).  
Nested keys: camelCase for structured namespaces, follow existing patterns in `messages/pt.json`.

```json
"routhC": {
  "toast": { "calculateSuccess": "...", "calculateError": "..." },
  "validation": { "nameRequired": "...", "latitudeInvalid": "..." }
}
```

## Rule of thumb

Match what the surrounding folder already does. Local consistency wins over global consistency.
