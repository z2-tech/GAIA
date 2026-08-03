# API Layer

> How the app talks to the backend: `hey-api/openapi-ts` generates a typed SDK from the backend's OpenAPI schema, and a thin `src/services/` layer of TanStack Query hooks wraps it for consumers. See [`project-structure.md`](project-structure.md) for the broader file-layout rule.

## Three layers

- **`src/client/`** — hey-api output, never edit by hand. Three files matter:
  - `sdk.gen.ts` — raw async functions (e.g. `getRouthcCalculationDetail`) for non-hook calls.
  - `@tanstack/react-query.gen.ts` — `*Options` and `*Mutation` factories that return ready-to-use TanStack Query configs (queryKey, queryFn, payload typing, mutationFn).
  - `types.gen.ts` — all request and response types (`GetRouthcCalculationDetailData`, …).
- **`src/services/<domain>/`** — one folder per backend domain. Reads in `<domain>.query.ts`, writes in `<domain>.mutation.ts`.
- **Consumers** — feature hooks call service hooks. Feature hooks never import from `src/client/` directly.

Regenerate `src/client/` with:

```bash
bunx @hey-api/openapi-ts
```

## HTTP client config

[`src/lib/api/hey-api.ts`](../src/lib/api/hey-api.ts) configures the global fetch wrapper:

- `baseUrl` — reads `NEXT_PUBLIC_API_URL` env var.
- `auth()` — injects `Authorization: Bearer <accessToken>` from cookies on every request. Hooks don't pass tokens manually.
- `Accept-Language` header — reads the `locale` cookie (set by next-intl) so every API request carries the active locale automatically. Don't set it manually per hook unless overriding.
- **401 → refresh → replay** — on a 401, the fetch wrapper auto-refreshes the access token via `refresh-manager.ts` (queues concurrent requests during refresh) and replays the original request. Feature hooks don't implement retry logic.

## Queries

Wrap the generated `*Options` factory inside `useQuery`. From [`src/services/routh-c/routh-c.query.ts`](../src/services/routh-c/routh-c.query.ts):

```ts
export function useGetRouthC({ calculationId, ano }: { calculationId: number; ano?: number }) {
  return useQuery({
    ...getRouthcCalculationDetailOptions({
      query: ano ? { ano } : undefined,
      path: { calculation_id: calculationId },
    }),
    enabled: !!calculationId,
  })
}
```

Conventions:

- **Type inputs from `types.gen`** — use the generated `*Data["path"]` / `*Data["query"]` shapes. Don't redeclare request types by hand.
- **Add `enabled: !!arg`** so guarded calls don't fire with undefined inputs.
- **Use `select`** for derived shapes over the same endpoint — one cache entry, multiple consumer shapes.
- **Use the generated `*QueryKey()`** helpers for invalidation. Never construct queryKeys by hand.

## Mutations

Wrap the generated `*Mutation` factory inside `useMutation`. Toast feedback via `sonner`. Error handling via `handleApiError`.

Simple mutation (toast in service file):

```ts
// src/services/routh-c/routh-c.mutation.ts
export function usePostRouthCCalculate() {
  const t = useTranslations("routhC.toast")

  return useMutation({
    ...calcularRouthcMutation(),
    onSuccess: () => toast.success(t("calculateSuccess")),
    onError: (error) => toast.error(handleApiError(error, t("calculateError"))),
  })
}
```

Complex mutation (invalidation + toast owned by the feature hook):

```ts
// service file — no toast, no invalidation
export function useCreateRegenerativeAssessment() {
  return useMutation({ ...createRegenerativeAssessmentMutation() })
}

// feature hook — owns onSuccess/onError and invalidation
const { mutateAsync } = useCreateRegenerativeAssessment()
const queryClient = useQueryClient()

await mutateAsync(
  { body: payload },
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getRegenerativeAssessmentByFarmQueryKey({ query: { project_id, farm_id } }),
      })
      toast.success(t("saveSuccess"))
    },
    onError: (error) => toast.error(handleApiError(error, t("saveError"))),
  },
)
```

Use **simple** when one mutation → one toast with no extra invalidation. Use **complex** when there are multiple invalidations or the feature hook needs to coordinate side effects.

## Error handling

Always use `handleApiError(error, fallback)` from `src/lib/errorHandlers.ts` in `onError`.  
It extracts `title → detail → message → error` from the API error shape and falls back to the provided string.

For validation errors from the backend (`type: "validation-error"`), use `applyValidationErrors` from the same file — it maps backend field errors onto RHF via `setError`, including nested array paths.

## Adding a new domain

1. Confirm the endpoint exists in the backend OpenAPI schema, then regenerate: `bunx @hey-api/openapi-ts`.
2. Create `src/services/<domain>/<domain>.query.ts` and (if needed) `<domain>.mutation.ts`.
3. Type inputs from `@/client/types.gen`. Don't hand-roll request/response shapes.
4. Use `*Options` / `*Mutation` factories from `@/client/@tanstack/react-query.gen`. Don't write `useQuery({ queryKey: [...], queryFn: ... })` from scratch.
5. Simple mutations: add `onSuccess`/`onError` in the service file. Complex mutations: leave the service file bare, let the feature hook own callbacks and invalidation.
