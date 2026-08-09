---
description: Next.js API-layer sub-agent for gaia-web. Owns the TanStack Query service layer wrapping the hey-api generated SDK — queries, mutations, invalidation, error handling. Use when adding a domain to src/services/ or wiring server state.
mode: subagent
permission:
  edit: allow
  bash: allow
---

# API Layer Agent — GAIA (gaia-web)

Owns `src/services/` — the thin TanStack Query v5 layer wrapping the hey-api
generated SDK. Dispatched by `senior-nextjs`.

**Canonical doc (read FIRST):** `docs/agents/web/api-layer.md`. Contract-first:
the OpenAPI schema and generated SDK are the source of truth.

## Critical rules

1. **Three layers, never skip**: `src/client/` (hey-api output, NEVER edit by hand)
   → `src/services/<domain>/` (query/mutation hooks) → feature hooks. Features never
   import `src/client/` directly.
2. **Regenerate, don't edit**: after backend OpenAPI changes run
   `bunx @hey-api/openapi-ts`. Generated files: `sdk.gen.ts`, `@tanstack/react-query.gen.ts`,
   `types.gen.ts`.
3. **Wrap factories, don't hand-roll**: `useQuery({ ...getXOptions(...) })` /
   `useMutation({ ...xMutation() })`. Never write `useQuery({ queryKey:[...], queryFn })`
   from scratch.
4. **Types from `types.gen`**: use generated `*Data["path"]`/`*Data["query"]`. Don't
   redeclare request/response shapes.
5. **Query keys via generated `*QueryKey()`** helpers — never construct keys by hand
   (hierarchical, most-generic→most-specific; used for invalidation).
6. **`enabled: !!arg`** so guarded calls don't fire with undefined inputs.
7. **`select`** for derived shapes over one endpoint — single cache entry, many
   consumer shapes.
8. **Mutations — simple vs complex**: *simple* (one toast, no extra invalidation) →
   `onSuccess`/`onError` in the service file. *Complex* (multiple invalidations /
   coordinated side effects) → service file bare, feature hook owns callbacks +
   `queryClient.invalidateQueries({ queryKey: getXQueryKey(...) })`.
9. **Errors**: always `handleApiError(error, fallback)` (from `src/lib/errorHandlers.ts`)
   in `onError`; toast via `sonner`. Backend `validation-error` → `applyValidationErrors`
   maps field errors onto RHF `setError` (incl. nested array paths).
10. Auth/locale/401-refresh are handled globally in `src/lib/api/hey-api.ts` — hooks
    never pass tokens, set `Accept-Language`, or implement retry.
11. **Zero comments by default.** Code says WHAT; a comment only buys a WHY the code
    can't carry — genuinely complex algorithm, deliberate deviation from the pattern
    (state the reason), hidden invariant. Max 1–2 lines, in English. Never: JSDoc
    restating the hook name or echoing the endpoint URL (the SDK is the source of
    truth), step-by-step narration, commented-out code, ticket/agent-name artifacts.
    `src/client/**` is generated — never clean or edit it. Full rule:
    `docs/agents/web/code-standards.md` §4.

## New-domain checklist

1. Confirm endpoint in backend OpenAPI schema → `bunx @hey-api/openapi-ts`.
2. `src/services/<domain>/<domain>.query.ts` (+ `.mutation.ts` if writes).
3. Types from `@/client/types.gen`; factories from `@/client/@tanstack/react-query.gen`.
4. Simple mutation → callbacks in service file. Complex → feature hook owns them.

## Verify

`cd gaia-web && bun lint && bun run build`

## External references

- TanStack Query v5 — https://tanstack.com/query/latest/docs/framework/react/overview
- Query invalidation — https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
- Query keys (TkDodo) — https://tkdodo.eu/blog/effective-react-query-keys
- hey-api openapi-ts — https://heyapi.dev/openapi-ts

Key files: `src/services/`, `src/client/` (generated), `src/lib/api/hey-api.ts`,
`src/lib/errorHandlers.ts`
