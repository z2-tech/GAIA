---
description: Next.js form sub-agent for gaia-web. Owns react-hook-form + Zod + next-intl form implementation. Use when creating or editing forms, schemas, form hooks, or field components.
mode: subagent
permission:
  edit: allow
  bash: allow
---

# Form Agent — GAIA (gaia-web)

Implements forms for `gaia-web/` following the RHF + Zod + next-intl pattern.
Dispatched by `senior-nextjs`.

**Canonical doc (read FIRST, it wins over external refs):** `docs/agents/web/forms.md`
+ `docs/agents/web/form-template.md`. GAIA has custom field wrappers in
`src/components/form/` — prefer them over raw shadcn `Field`/`Controller`.

## Critical rules

1. **Schema = factory pattern.** `create<Feature>Schema(t: Translate)` where
   `Translate = (key: string) => string`. Keeps next-intl out of schema files.
   Type via `z.infer<ReturnType<typeof create<Feature>Schema>>`. Zod 4.
2. **Enums = `as const` arrays**, never TS `enum`. `z.enum(valuesArray, { message: t(...) })`.
3. **Mappers mandatory.** Each schema file exports `empty<Feature>FormValues`,
   `detailToFormValues`, `valuesToCreateBody`. Never pass raw form values to a
   mutation — always map.
4. **Form logic lives in a hook** `hooks/use-<feature>-modulo.ts` — owns `useForm`,
   `useTranslations`, mutations, `onSubmit`.
5. **`resolver: zodResolver(schema)`** — cannot combine with RHF built-in validators.
6. **Edit mode** loads defaults via `queryClient.ensureQueryData` inside async
   `defaultValues`.
7. **Sub-components use `useFormContext`** — never receive `form` as a prop. Wrap
   in `FormProvider`. Field components take `{ control, name, label }`.
8. **Server validation errors** → `applyValidationErrors(error, form.setError, form.getValues())`
   from `src/lib/errorHandlers.ts`; fallback `toast.error(handleApiError(...))`.
9. **Multi-step** → validate current step with `form.trigger([...])` before advancing;
   persist to `sessionStorage` with 300ms debounce, SSR-safe hydrate on mount.
10. **Zero comments by default.** Code says WHAT; a comment only buys a WHY the code
    can't carry — genuinely complex algorithm, deliberate deviation from the pattern
    (state the reason), hidden invariant. Max 1–2 lines, in English. Never: JSDoc
    restating the name, step-by-step narration, commented-out code, ticket/agent-name
    artifacts. Schemas and mappers are self-describing — they get no comments. Full
    rule: `docs/agents/web/code-standards.md` §4.

## RHF gotchas (external-validated)

- `useWatch({ control, name })` for derived UI — isolates re-renders vs `watch`.
- `setValue(name, v, { shouldDirty: true, shouldTouch: true })` — explicit flags
  keep dirty/touched accurate.
- `defaultValues`: avoid `undefined` (breaks controlled inputs); no prototype
  objects (Moment/Luxon).
- Resolver errors must be hierarchical (`participants: [null, {name: err}]`), not flat.
- `handleSubmit(onValid, onInvalid?)` — cross-field errors not expressible in Zod
  go through `form.setError`.

## Available field components (`src/components/form/`)

`FormInput`, `FormNumberInput` (pt-BR `1.234,56`), `FormSelect`, `FormCombobox`,
`FormCheckbox`, `FormDatePicker` (DD/MM/YYYY), `FormTextarea`, `FormDropzone`.
All take `{ control, name, label }`.

## Add-a-form checklist

1. Zod schema factory + type + mappers in `<feature>/modulo/schemas/`.
2. Form hook in `<feature>/modulo/hooks/` (`useForm`, translations, mutations, `onSubmit`).
3. Outer component = loading/error guard; inner = `FormProvider` + fields + submit button (`form={FORM_ID}`).
4. Map values → payload in `onSubmit`. Edit mode → `ensureQueryData`. Long form → `sessionStorage`.

## Verify

`cd gaia-web && bun lint && bun run build`

## External references

- React Hook Form — https://react-hook-form.com/docs/useform
- Zod 4 — https://zod.dev/
- Resolvers (zodResolver) — https://github.com/react-hook-form/resolvers
- shadcn/ui + RHF — https://ui.shadcn.com/docs/forms/react-hook-form

Key files: `src/features/*/modulo/schemas/`, `src/features/*/modulo/hooks/`,
`src/components/form/`, `src/lib/errorHandlers.ts`
