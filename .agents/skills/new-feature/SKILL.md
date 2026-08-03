---
name: new-feature
description: Scaffold a new farm-level feature module end-to-end in gaia-web following the GaiaMetrics pattern. Trigger when the user says "new feature", "create feature", "scaffold feature", "add feature module", or names a new domain to implement (e.g. "add biodiversidade module"). 5-step checklist: i18n → menu tab → service layer → feature folder → thin pages.
---

# new-feature skill — gaia-web

Scaffold a new GaiaMetrics farm-level feature module end-to-end. Canonical
patterns: `docs/agents/web/` (GAIA) — read `project-structure.md`, `forms.md`,
`naming-conventions.md`, `architecture.md`, `design-system.md` before scaffolding.

Mirrors the frontend sub-agents (dispatch via `senior-nextjs` when doing real work):
`api-layer-agent` (Step 3 services), `form-agent` (Step 4 schema/hook/form),
`design-agent` (page/dialog UI), `i18n-key-validator` (Step 1 locale check).
Rules below are the scaffold shortcut — the agents own the full spec.

## Inputs to gather before starting

If the user hasn't provided these, ask:
- **Feature name** (English camelCase, used for keys): e.g. `carbonEmission`
- **Feature slug** (kebab-case Portuguese, used for URL): e.g. `carbono-emissao`
- **Service domain** (English kebab-case, `src/services/<domain>/`): e.g. `lca`
- **Portuguese label** (farm tab menu): e.g. `Carbono — Emissão`
- **API endpoints available?** (yes/no — real service layer vs stub)

## Execution steps

Read the relevant files before each step to avoid overwriting existing content.

---

### Step 1 — i18n keys

Add to **both** `messages/pt.json` AND `messages/en.json` under the feature key:

```json
"<featureName>": {
  "farmPage": {
    "title": "<Portuguese title>",
    "fillModule": "Preencher módulo",
    "editModule": "Editar módulo",
    "viewResults": "Ver resultados"
  },
  "modulo": {
    "fields": {},
    "toast": {
      "saveSuccess": "Dados salvos com sucesso!",
      "saveError": "Erro ao salvar os dados."
    },
    "validation": {}
  },
  "dashboard": {}
}
```

Add the menu label under `"fazendaMenu"` in both files:
```json
"fazendaMenu": {
  "<featureName>": "<Portuguese label>"
}
```

**Verify:** both files updated, keys identical in shape (run `i18n-key-validator`).

---

### Step 2 — Farm tab menu

Edit `src/features/fazenda/types/menu.ts`:

1. Add `"<featureName>"` to the `FazendaMenuMessageKey` union type.
2. Add `{ messageKey: "<featureName>", slug: "<feature-slug>" }` to `FAZENDA_MENU_ITEMS`.

**Verify:** TypeScript union exhaustive, no lint errors.

---

### Step 3 — Service layer

Create `src/services/<domain>/`:

**`<domain>.query.ts`** — if API endpoints exist:
```ts
"use client"

import { useQuery } from "@tanstack/react-query"
import { get<Resource>Options } from "@/client/@tanstack/react-query.gen"

export function useGet<Resource>({ projectId, farmId }: { projectId: number; farmId: number }) {
  return useQuery({
    ...get<Resource>Options({ path: { project_id: projectId, farm_id: farmId } }),
    enabled: !!projectId && !!farmId,
  })
}
```

**`<domain>.mutation.ts`** — simple pattern:
```ts
"use client"

import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { create<Resource>Mutation } from "@/client/@tanstack/react-query.gen"
import { handleApiError } from "@/lib/errorHandlers"

export function useCreate<Resource>() {
  const t = useTranslations("<featureName>.modulo.toast")
  return useMutation({
    ...create<Resource>Mutation(),
    onSuccess: () => toast.success(t("saveSuccess")),
    onError: (error) => toast.error(handleApiError(error, t("saveError"))),
  })
}
```

If no API endpoints yet, create empty stubs with a `// TODO:` comment. The service
layer is the **only** place that imports `@/client/` (biome enforces this).

**Verify:** `bunx tsc --noEmit` passes.

---

### Step 4 — Feature folder

Create `src/features/<feature-slug>/`:

```
modulo/
  schemas/<feature-slug>-modulo.ts    # Zod schema factory + mappers (domain layer, no React)
  hooks/use-<feature-slug>-modulo.ts  # Form hook: useForm, mutations, onSubmit
  components/modulo-form.tsx          # Outer (loading guard) + Inner (FormProvider)
dashboard/
  dashboard.tsx                       # Placeholder: <p>Em breve</p> if not ready
```

**`modulo/schemas/<feature-slug>-modulo.ts`** skeleton:
```ts
import z from "zod"

type Translate = (key: string) => string

export function create<Feature>Schema(t: Translate) {
  return z.object({
    project_id: z.number().int().min(1),
    farm_id: z.number().int().min(1),
    // TODO: add domain fields
  })
}

export type <Feature>FormValues = z.infer<ReturnType<typeof create<Feature>Schema>>

export function empty<Feature>FormValues(projectId: number, farmId: number): <Feature>FormValues {
  return { project_id: projectId, farm_id: farmId }
}
```

**`modulo/hooks/use-<feature-slug>-modulo.ts`** skeleton:
```ts
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { create<Feature>Schema, empty<Feature>FormValues, type <Feature>FormValues } from "../schemas/<feature-slug>-modulo"

export function use<Feature>Modulo() {
  const t = useTranslations("<featureName>")
  const validationT = useTranslations("<featureName>.validation")
  const { projetoId, fazendaId } = useParams<{ projetoId: string; fazendaId: string }>()

  const schema = create<Feature>Schema(validationT)
  const form = useForm<<Feature>FormValues>({
    resolver: zodResolver(schema),
    defaultValues: empty<Feature>FormValues(Number(projetoId), Number(fazendaId)),
  })

  const onSubmit = form.handleSubmit(async (values) => {
    // TODO: call mutation
  })

  return { form, onSubmit }
}
```

**Verify:** `bunx tsc --noEmit` passes.

---

### Step 5 — Thin pages

Create `src/app/(private)/projetos/[projetoId]/fazenda/[fazendaId]/<feature-slug>/`:

**`page.tsx`** — farm landing page:
```tsx
"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function <Feature>Page() {
  const { projetoId, fazendaId } = useParams<{ projetoId: string; fazendaId: string }>()
  const basePath = `/projetos/${projetoId}/fazenda/${fazendaId}/<feature-slug>`
  const t = useTranslations("<featureName>.farmPage")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <Button asChild>
          <Link href={`${basePath}/modulo`}>{t("fillModule")}</Link>
        </Button>
      </div>
    </div>
  )
}
```

**`modulo/page.tsx`** — form page:
```tsx
"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { ModuloForm } from "@/features/<feature-slug>/modulo/components/modulo-form"

export default function <Feature>ModuloPage() {
  const { projetoId, fazendaId } = useParams<{ projetoId: string; fazendaId: string }>()
  const basePath = `/projetos/${projetoId}/fazenda/${fazendaId}/<feature-slug>`
  const t = useTranslations("<featureName>.farmPage")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-2">
        <Link href={basePath} className="text-sm text-muted-foreground hover:underline">
          {t("title")}
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-medium">{t("fillModule")}</span>
      </div>
      <ModuloForm />
    </div>
  )
}
```

**Verify:** `bunx tsc --noEmit` passes, `bun lint` passes.

---

## Done checklist

- [ ] `messages/pt.json` updated
- [ ] `messages/en.json` updated (identical key shape)
- [ ] `FazendaMenuMessageKey` union extended
- [ ] `FAZENDA_MENU_ITEMS` array extended
- [ ] `src/services/<domain>/` created
- [ ] `src/features/<feature-slug>/modulo/` created (schema, hook, component)
- [ ] `src/features/<feature-slug>/dashboard/dashboard.tsx` created
- [ ] `src/app/.../<feature-slug>/page.tsx` created
- [ ] `src/app/.../<feature-slug>/modulo/page.tsx` created
- [ ] `bunx tsc --noEmit` passes
- [ ] `bun lint` passes
