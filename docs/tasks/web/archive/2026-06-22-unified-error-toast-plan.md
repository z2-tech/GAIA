# Unified Error Toast Standard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the bug where `validation-error` API responses show the generic title "Erro de validação" instead of the specific `detail` message, and establish a unified error toast standard for the whole app.

**Architecture:** Two standard patterns — `handleApiError` for mutations (`onError` callbacks), `handleFormError` for form submissions (applies field errors + shows toast). Root fix is in `src/lib/errorHandlers.ts`. Five LCA step hooks get DRY'd by the new `handleFormError` utility.

**Tech Stack:** TypeScript, TanStack Query, React Hook Form, sonner (toast), next-intl.

## Global Constraints

- Never edit `src/client/` (auto-generated).
- All new i18n keys must go in **both** `messages/pt.json` AND `messages/en.json`.
- `"use client"` already present on all feature hooks — do not remove.
- No new dependencies.
- All changes must be type-safe (run `bunx tsc --noEmit` to verify).

---

## Root Cause

API returns `{ type: "validation-error", title: "Erro de validação", detail: "\"trigo\" is not a valid choice." }`.

`handleApiError` priority: **title → detail → message → error → fallback**.
`title` matches first → "Erro de validação" shown. `detail` (the useful message) is skipped.

`applyValidationErrors` silently fails when `detail` is a string (expects an object keyed by field name), returns `false`, so `handleApiError` is called — and picks `title`.

## Two Unified Patterns (post-fix)

### Pattern A — Service mutations (`onError` callback)
Use when there is no RHF form context:
```typescript
onError: (error) => {
  toast.error(handleApiError(error, t("fallback-key")))
}
```
After the fix, `handleApiError` will correctly return `detail` for `validation-error` types.

### Pattern B — Form step hooks (try/catch with field error support)
Use when the caller has access to `form` (UseFormReturn):
```typescript
try {
  await mutate(payload)
} catch (error) {
  handleFormError(error, form.setError, form.getValues(), t("fallback-key"), t("common:fix-the-invalid-fields"))
}
```
`handleFormError` (new util) tries `applyValidationErrors` first; if fields were applied shows fix-fields message; otherwise calls `handleApiError` (which after fix shows `detail`).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/lib/errorHandlers.ts` | Modify | Fix `handleApiError` + add `handleFormError` |
| `messages/pt.json` | Modify | Move `fix-the-invalid-fields` to `common` namespace |
| `messages/en.json` | Modify | Move `fix-the-invalid-fields` to `common` namespace |
| `src/features/carbono-emissao/modulo/hooks/use-lca-step-cultura.ts` | Modify | Use `handleFormError` |
| `src/features/carbono-emissao/modulo/hooks/use-lca-step-solo.ts` | Modify | Use `handleFormError` |
| `src/features/carbono-emissao/modulo/hooks/use-lca-step-insumos.ts` | Modify | Use `handleFormError` |
| `src/features/carbono-emissao/modulo/hooks/use-lca-step-combustivel.ts` | Modify | Use `handleFormError` |
| `src/features/carbono-emissao/modulo/hooks/use-lca-step-transporte.ts` | Modify | Use `handleFormError` |

Service mutations (`auth.mutation.ts`, `profile.mutation.ts`, `farms.mutation.ts`, `projects.mutation.ts`, `routh-c.mutation.ts`, `uploads.mutation.ts`) already use Pattern A correctly — no changes needed there after Task 1.

---

## Task 1: Fix `handleApiError` + add `handleFormError`

**Files:**
- Modify: `src/lib/errorHandlers.ts`

**Interfaces:**
- Produces: `handleApiError(error, fallback): string` (same signature, fixed behavior)
- Produces: `handleFormError(error, setError, getValues, fallbackMessage, fixFieldsMessage): void`

`handleFormError` parameters:
```typescript
handleFormError(
  error: unknown,
  setError: (field: any, error: { message: string }) => void,
  getValues: Record<string, unknown>,
  fallbackMessage: string,      // e.g. t("error-saving-crop-data") from caller's namespace
  fixFieldsMessage: string,     // t("common.fix-the-invalid-fields") from caller
): void
```

- [ ] **Step 1: Read current file**

Read `src/lib/errorHandlers.ts` (already shown above — skip if you have it in context).

- [ ] **Step 2: Write updated `src/lib/errorHandlers.ts`**

Replace the entire file with:

```typescript
type ApiErrorShape = {
  type?: unknown;
  title?: unknown;
  detail?: unknown;
  message?: unknown;
  error?: unknown;
};

function asObject(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

/**
 * Extrai mensagem amigável de erro de API.
 * Para validation-error: prioriza detail (mensagem específica) antes do title (genérico).
 * Para outros erros: title → detail → message → error → fallback.
 */
export function handleApiError(error: unknown, fallbackMessage: string): string {
  const errorObj = asObject(error);
  const response = asObject(errorObj?.response);
  const responseData = asObject(response?.data);
  const data = asObject(errorObj?.data);

  const candidates: Array<ApiErrorShape | null> = [
    responseData as ApiErrorShape | null,
    data as ApiErrorShape | null,
    errorObj as ApiErrorShape | null,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;

    // validation-error: detail comes first (it's the specific message; title is always generic)
    if (candidate.type === "validation-error") {
      const detail = readString(candidate.detail);
      if (detail) return detail;
    }

    const title = readString(candidate.title);
    if (title) return title;

    const detail = readString(candidate.detail);
    if (detail) return detail;

    const message = readString(candidate.message);
    if (message && message !== "Unknown error") return message;

    const directError = readString(candidate.error);
    if (directError) return directError;
  }

  return fallbackMessage;
}

/**
 * Traverses form values recursively and returns all dot-paths whose leaf key
 * matches targetField (e.g. "porcentagem_nutriente" → ["fertilizantes.0.porcentagem_nutriente"]).
 */
function findMatchingPaths(values: unknown, targetField: string, prefix = ""): string[] {
  const paths: string[] = [];
  if (Array.isArray(values)) {
    values.forEach((item, i) => {
      const nested = findMatchingPaths(item, targetField, prefix ? `${prefix}.${i}` : String(i));
      paths.push(...nested);
    });
  } else if (typeof values === "object" && values !== null) {
    for (const [key, value] of Object.entries(values as Record<string, unknown>)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      if (key === targetField) {
        paths.push(currentPath);
      }
      const nested = findMatchingPaths(value, targetField, currentPath);
      paths.push(...nested);
    }
  }
  return paths;
}

/**
 * Detecta erro de validação da API e aplica os erros de campo via setError do RHF.
 * Retorna true se erros de validação foram encontrados e aplicados.
 *
 * Formato esperado: { type: "validation-error", detail: { "fieldLeafName": ["message"] } }
 * Se o campo não existir no nível raiz, busca todos os paths que terminam com esse nome
 * dentro de formValues (ex: "porcentagem_nutriente" → "fertilizantes.0.porcentagem_nutriente").
 */
export function applyValidationErrors(
  error: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError: (field: any, error: { message: string }) => void,
  formValues?: Record<string, unknown>,
): boolean {
  const obj = asObject(error);
  if (!obj || obj.type !== "validation-error") return false;

  const detail = asObject(obj.detail);
  if (!detail) return false;

  let applied = false;
  for (const [field, messages] of Object.entries(detail)) {
    const msg = Array.isArray(messages) && messages.length > 0
      ? String(messages[0])
      : String(messages);

    if (formValues) {
      const paths = findMatchingPaths(formValues, field);
      if (paths.length > 0) {
        paths.forEach((path) => setError(path, { message: msg }));
        applied = true;
        continue;
      }
    }

    setError(field, { message: msg });
    applied = true;
  }
  return applied;
}

/**
 * Padrão unificado para erros em formulários.
 * - Se há erros de campo (detail como objeto): aplica via setError e dispara fixFieldsMessage.
 * - Caso contrário: dispara handleApiError (inclui validation-error com detail string).
 *
 * Importar toast no caller NÃO é necessário — esta função importa sonner internamente.
 */
export function handleFormError(
  error: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError: (field: any, err: { message: string }) => void,
  formValues: Record<string, unknown>,
  fallbackMessage: string,
  fixFieldsMessage: string,
): void {
  // dynamic import to avoid circular deps and keep errorHandlers framework-agnostic
  // sonner is a peer dep so this is safe
  const { toast } = require("sonner") as typeof import("sonner");
  const hasFieldErrors = applyValidationErrors(error, setError, formValues);
  toast.error(hasFieldErrors ? fixFieldsMessage : handleApiError(error, fallbackMessage));
}
```

- [ ] **Step 3: Verify types**

```bash
bunx tsc --noEmit 2>&1 | head -30
```

Expected: no errors from `src/lib/errorHandlers.ts`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/errorHandlers.ts
git commit -m "fix(errors): prioritize detail over title for validation-error; add handleFormError"
```

---

## Task 2: Add `fix-the-invalid-fields` to `common` i18n namespace

The key exists today only in `carbon-emissions` namespace. Move it to `common.errors` so `handleFormError` callers in other features can use it.

**Files:**
- Modify: `messages/pt.json`
- Modify: `messages/en.json`

**Note:** Do NOT remove from `carbon-emissions` yet — the 5 LCA hooks still reference it there until Task 3 is done.

- [ ] **Step 1: Add key to `messages/pt.json`**

In `messages/pt.json`, inside the `"common"` object, add an `"errors"` sub-key:

```json
"common": {
  ...existing keys...,
  "errors": {
    "fix-the-invalid-fields": "Corrija os campos inválidos"
  }
}
```

- [ ] **Step 2: Add key to `messages/en.json`**

In `messages/en.json`, inside the `"common"` object, add:

```json
"common": {
  ...existing keys...,
  "errors": {
    "fix-the-invalid-fields": "Fix the invalid fields"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add messages/pt.json messages/en.json
git commit -m "i18n(common): add errors.fix-the-invalid-fields to common namespace"
```

---

## Task 3: Update 5 LCA step hooks to use `handleFormError`

All 5 hooks have the same pattern to replace:

**Before (current):**
```typescript
import { applyValidationErrors, handleApiError } from "@/lib/errorHandlers"
// ...
const hasFieldErrors = applyValidationErrors(
  error,
  form.setError,
  form.getValues() as Record<string, unknown>,
)
toast.error(
  hasFieldErrors
    ? t("fix-the-invalid-fields")
    : handleApiError(error, t("error-saving-crop-data")),
)
```

**After:**
```typescript
import { handleFormError } from "@/lib/errorHandlers"
// remove: import { toast } from "sonner" if only used for this error call
// ...
const commonT = useTranslations("common")
handleFormError(
  error,
  form.setError,
  form.getValues() as Record<string, unknown>,
  t("error-saving-crop-data"),
  commonT("errors.fix-the-invalid-fields"),
)
```

**Files:**
- Modify: `src/features/carbono-emissao/modulo/hooks/use-lca-step-cultura.ts`
- Modify: `src/features/carbono-emissao/modulo/hooks/use-lca-step-solo.ts`
- Modify: `src/features/carbono-emissao/modulo/hooks/use-lca-step-insumos.ts`
- Modify: `src/features/carbono-emissao/modulo/hooks/use-lca-step-combustivel.ts`
- Modify: `src/features/carbono-emissao/modulo/hooks/use-lca-step-transporte.ts`

### 3a — `use-lca-step-cultura.ts`

- [ ] **Step 1: Read current file**

Path: `src/features/carbono-emissao/modulo/hooks/use-lca-step-cultura.ts`

- [ ] **Step 2: Replace imports**

Change:
```typescript
import { applyValidationErrors, handleApiError } from "@/lib/errorHandlers"
```
To:
```typescript
import { handleFormError } from "@/lib/errorHandlers"
```

Remove `import { toast } from "sonner"` only if `toast` is not used anywhere else in the file.

Add `const commonT = useTranslations("common")` inside the hook body (alongside existing `const t = useTranslations("carbon-emissions")`).

- [ ] **Step 3: Replace the catch block**

Find:
```typescript
    } catch (error) {
      const hasFieldErrors = applyValidationErrors(
        error,
        form.setError,
        form.getValues() as Record<string, unknown>,
      )
      toast.error(
        hasFieldErrors
          ? t("fix-the-invalid-fields")
          : handleApiError(error, t("error-saving-crop-data")),
      )
    }
```

Replace with:
```typescript
    } catch (error) {
      handleFormError(
        error,
        form.setError,
        form.getValues() as Record<string, unknown>,
        t("error-saving-crop-data"),
        commonT("errors.fix-the-invalid-fields"),
      )
    }
```

- [ ] **Step 4: Verify types**

```bash
bunx tsc --noEmit 2>&1 | grep "use-lca-step-cultura"
```

Expected: no output (no errors).

### 3b — `use-lca-step-solo.ts`

Path: `src/features/carbono-emissao/modulo/hooks/use-lca-step-solo.ts`

- [ ] **Step 1: Replace imports** (same as 3a — swap `applyValidationErrors, handleApiError` for `handleFormError`; remove `toast` import if unused elsewhere)

- [ ] **Step 2: Add `commonT`** inside hook: `const commonT = useTranslations("common")`

- [ ] **Step 3: Replace catch block**

Find:
```typescript
      const hasFieldErrors = applyValidationErrors(
        error,
        form.setError,
        form.getValues() as Record<string, unknown>,
      )
      toast.error(
        hasFieldErrors
          ? t("fix-the-invalid-fields")
          : handleApiError(error, t("error-saving-soil-data")),
      )
```

Replace with:
```typescript
      handleFormError(
        error,
        form.setError,
        form.getValues() as Record<string, unknown>,
        t("error-saving-soil-data"),
        commonT("errors.fix-the-invalid-fields"),
      )
```

- [ ] **Step 4: Type check**

```bash
bunx tsc --noEmit 2>&1 | grep "use-lca-step-solo"
```

### 3c — `use-lca-step-insumos.ts`

Path: `src/features/carbono-emissao/modulo/hooks/use-lca-step-insumos.ts`

- [ ] **Step 1: Replace imports** (same as 3a)

- [ ] **Step 2: Add `commonT`** inside hook

- [ ] **Step 3: Replace catch block**

Find:
```typescript
      const hasFieldErrors = applyValidationErrors(
        error,
        form.setError,
        form.getValues() as Record<string, unknown>,
      )
      toast.error(
        hasFieldErrors
          ? t("fix-the-invalid-fields")
          : handleApiError(error, t("error-saving-inputs")),
      )
```

Replace with:
```typescript
      handleFormError(
        error,
        form.setError,
        form.getValues() as Record<string, unknown>,
        t("error-saving-inputs"),
        commonT("errors.fix-the-invalid-fields"),
      )
```

Note: `toast.error(t("error-uploading-file"))` calls elsewhere in this file stay as-is — they're non-API UI errors.

- [ ] **Step 4: Type check**

```bash
bunx tsc --noEmit 2>&1 | grep "use-lca-step-insumos"
```

### 3d — `use-lca-step-combustivel.ts`

Path: `src/features/carbono-emissao/modulo/hooks/use-lca-step-combustivel.ts`

- [ ] **Step 1: Replace imports** (same as 3a — keep `toast` import since other `toast.error` calls remain)

- [ ] **Step 2: Add `commonT`** inside hook

- [ ] **Step 3: Replace catch block**

Find:
```typescript
      const hasFieldErrors = applyValidationErrors(
        error,
        form.setError,
        form.getValues() as Record<string, unknown>,
      )
      toast.error(
        hasFieldErrors
          ? t("fix-the-invalid-fields")
          : handleApiError(error, t("error-saving-fuels")),
      )
```

Replace with:
```typescript
      handleFormError(
        error,
        form.setError,
        form.getValues() as Record<string, unknown>,
        t("error-saving-fuels"),
        commonT("errors.fix-the-invalid-fields"),
      )
```

- [ ] **Step 4: Type check**

```bash
bunx tsc --noEmit 2>&1 | grep "use-lca-step-combustivel"
```

### 3e — `use-lca-step-transporte.ts`

Path: `src/features/carbono-emissao/modulo/hooks/use-lca-step-transporte.ts`

- [ ] **Step 1: Replace imports** (same as 3a — keep `toast` since `toast.error(t("error-calculating-lca"))` remains)

- [ ] **Step 2: Add `commonT`** inside hook

- [ ] **Step 3: Replace catch block**

Find:
```typescript
      const hasFieldErrors = applyValidationErrors(
        error,
        form.setError,
        form.getValues() as Record<string, unknown>,
      )
      toast.error(
        hasFieldErrors
          ? t("fix-the-invalid-fields")
          : handleApiError(error, t("error-saving-transport")),
      )
```

Replace with:
```typescript
      handleFormError(
        error,
        form.setError,
        form.getValues() as Record<string, unknown>,
        t("error-saving-transport"),
        commonT("errors.fix-the-invalid-fields"),
      )
```

- [ ] **Step 4: Final type check + commit**

```bash
bunx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

```bash
git add \
  src/features/carbono-emissao/modulo/hooks/use-lca-step-cultura.ts \
  src/features/carbono-emissao/modulo/hooks/use-lca-step-solo.ts \
  src/features/carbono-emissao/modulo/hooks/use-lca-step-insumos.ts \
  src/features/carbono-emissao/modulo/hooks/use-lca-step-combustivel.ts \
  src/features/carbono-emissao/modulo/hooks/use-lca-step-transporte.ts
git commit -m "refactor(lca): use handleFormError in all step hooks"
```

---

## Task 4: Remove stale `fix-the-invalid-fields` from `carbon-emissions` namespace

After Task 3, the key is no longer referenced from the `carbon-emissions` i18n namespace (all 5 hooks now use `commonT`). Remove it to avoid confusion.

**Files:**
- Modify: `messages/pt.json`
- Modify: `messages/en.json`

- [ ] **Step 1: Confirm no remaining references**

```bash
grep -r "fix-the-invalid-fields" src/ --include="*.ts" --include="*.tsx"
```

Expected output: zero lines (or only the `errorHandlers.ts` comment if present).

- [ ] **Step 2: Remove from `messages/pt.json`**

Delete this line from the `"carbon-emissions"` namespace object:
```json
"fix-the-invalid-fields": "Corrija os campos inválidos",
```

- [ ] **Step 3: Remove from `messages/en.json`**

Delete this line from the `"carbon-emissions"` namespace object:
```json
"fix-the-invalid-fields": "Fix the invalid fields",
```

- [ ] **Step 4: Commit**

```bash
git add messages/pt.json messages/en.json
git commit -m "i18n(carbon-emissions): remove fix-the-invalid-fields (moved to common.errors)"
```

---

## Verification

After all tasks complete:

1. Submit LCA culture form with `trigo` as crop value → toast should show `"trigo" is not a valid choice.` not `"Erro de validação"`.
2. Submit with a field-level validation error (object detail) → field highlighted + "Corrija os campos inválidos" toast.
3. Any other API error → generic fallback message still works.
4. All service mutations (`auth`, `farms`, etc.) show specific `detail` for validation errors automatically (no code change needed).

```bash
bunx tsc --noEmit && bun lint
```

Expected: no errors.
