# Naming Conventions

Canonical reference for how to name things in this repo.

## Language: English everywhere structural

**Every identifier is English** — file names, folder names, feature names, route
segments, components, hooks, types, variables, constants, i18n keys. Portuguese
appears **only** in rendered UI copy: the string *values* in `messages/pt.json`
(and business domain terms inside those values, e.g. "Fazenda", "Talhão").

- `farm/`, not `fazenda/`. `carbon-removal/`, not `carbono-remocao/`. `module/`,
  not `modulo/`. `[projectId]`, not `[projetoId]`.
- The route URL is English too (`/projects/[projectId]/farm/[farmId]/carbon-removal`).
- Never mix languages in one identifier or across a layer — no `farm` next to
  `fazenda` in code.

> The `pt-BR` locale is the product's primary display language; that lives in the
> i18n message values, not in code, files, or routes.

## The table

| Element | Convention | Example |
|---|---|---|
| **Components** | PascalCase | `ModuleForm`, `FarmHeader` |
| **Custom Hooks** | `use` + camelCase | `useRothCModule`, `useGetFarm` |
| **Props** | camelCase | `projectId`, `isLoading` |
| **Event Handlers** | `on` + PascalCase | `onChange`, `onSubmit` |
| **Handler functions** | `handle` + PascalCase | `handleSubmit`, `handleBack` |
| **State Variables** | camelCase | `currentStep`, `isHydrated` |
| **Booleans** | `is` / `has` / `can` + PascalCase | `isLoading`, `hasError`, `canSubmit` |
| **Variables / functions** | camelCase | `formValues`, `parseDecimal` |
| **Constants (primitives)** | camelCase | `defaultLocale` |
| **Constants (objects)** | UPPER_SNAKE_CASE | `FARM_MENU_ITEMS`, `CARBON_REMOVAL_MODULE_FORM_ID` |
| **Enum-like values** | `as const` array | `monthlyInputModeValues` — no TypeScript enums |
| **Types from Const** | PascalCase | `MonthlyInputMode`, `FarmMenuMessageKey` |
| **Types / Interfaces** | PascalCase | `RothCModuleFormValues`, `ApiErrorShape` |
| **Files** | kebab-case | `roth-c-module.ts`, `use-roth-c-module.ts` |

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

Examples: `roth-c.query.ts`, `use-roth-c-module.ts`, `roth-c-module.ts` (schema).

## Routes (Next.js App Router)

- `page.tsx` for the route entry point (Next.js convention).
- Folder names: **kebab-case English** for all route segments (`carbon-removal`,
  `regenerative`, `farm`, `projects`) — matching the service-layer directories.
- Route groups use parentheses: `(auth)`, `(private)`, `(dashboard)`.
- Dynamic segments use brackets, camelCase English: `[projectId]`, `[farmId]`.

## Service hooks

| Hook type | Convention | Example |
|---|---|---|
| Query (single) | `useGet<Resource>` | `useGetRothC`, `useGetFarm` |
| Query (list) | `useList<Resource>` | `useListRothC`, `useListProjects` |
| Mutation (create) | `useCreate<Resource>` | `useCreateRegenerativeAssessment` |
| Mutation (update) | `useUpdate<Resource>` | `useUpdateRegenerativeAssessment` |
| Mutation (delete) | `useDelete<Resource>` | `useDeleteFarm` |
| Mutation (action) | `use<Verb><Resource>` | `usePostRothCCalculate` |

## Schema factories and mappers

| Function | Convention | Example |
|---|---|---|
| Schema factory | `create<Feature>Schema` | `createRothCModuleSchema` |
| Empty values factory | `empty<Feature>FormValues` | `emptyRothCModuleFormValues` |
| Form values type | `<Feature>FormValues` | `RothCModuleFormValues` |
| API → form mapper | `detailToFormValues` | — |
| Form → create body | `valuesToCreateBody` | — |
| Form → update body | `valuesToUpdateBody` | — |

## Form ID constants

One constant per form, SCREAMING_SNAKE_CASE, at the top of the schema or hook file:

```ts
export const CARBON_REMOVAL_MODULE_FORM_ID = "carbon-removal-module-form"
```

## i18n keys

Keys are **English** (`rothC`, `regenerative`, `carbonEmission`); only the string
**values** are Portuguese in `messages/pt.json` (English in `messages/en.json`).
Top-level keys: camelCase matching the domain. Nested keys: camelCase for
structured namespaces.

```json
"rothC": {
  "toast": { "calculateSuccess": "...", "calculateError": "..." },
  "validation": { "nameRequired": "...", "latitudeInvalid": "..." }
}
```

## Rule of thumb

Match what the surrounding folder already does. Local consistency wins over global consistency.
