# FE-24 — Normalizar error handling do React Query (callbacks vs try/catch)

> **Prioridade:** Média | **Assignee:** — | **Status:** ✅ Concluído (2026-08-06)
>
> Implementado em `gaia-web` branch `develop`. Card original citava nomes PT
> pré-FE-17/18; paths abaixo são os reais.

## Problema

`principles.md` P7: usar `onError`/`onSuccess` callbacks, não `try/catch` em volta
de `mutateAsync`. ≥6 hooks faziam `try/catch`.

Arquivos (mapeamento old → atual):

| Card (PT) | Path atual |
|---|---|
| `use-editar-senha` | `features/profile/hooks/use-update-password.ts` |
| `use-novo-usuario` | `features/users/hooks/use-create-user.ts` |
| `use-lca-step-insumos` | `features/carbon-emission/module/hooks/use-lca-step-inputs.ts` |
| `use-nova-fazenda` | `features/project/hooks/use-create-farm.ts` |
| `use-routh-c-modulo` | `features/carbon-removal/module/hooks/use-roth-c-module.ts` |
| `use-regenerativo-modulo-form` | `features/regenerative/module/hooks/use-regenerative-module-form.ts` |

## Solução

- Substituir `try/catch` por `onError`/`onSuccess` no `useMutation`.
- Onde precisa aplicar field errors (forms), usar `handleFormError` (já existe em
  `src/lib/errorHandlers.ts`) dentro do `onError`.
- Fora do RQ: `safePromise` → `[value, null] | [null, Error]`; retorno `null`
  para control flow (sem throw).

### O que foi implementado

**Core (já na develop antes do polish residual):**

- 6 hooks do card usam callbacks RQ; zero `try/catch` em volta de `mutateAsync`.
- Forms (LCA steps + regenerative) usam `handleFormError` no `onError`.
- Service mutations toastam via `onError` + `handleApiError`.
- `safePromise` em `src/lib/safe-promise.ts` para promises fora do RQ.

**Polish residual (P7 control flow / single toast):**

- Farm KML photo: `uploadKmlPhoto` → `Promise<string | null>`;
  `captureAndUpload` → `Promise<boolean>`; `new-farm.tsx` sem try/catch.
- LCA S3: `uploadLcaFile` com `safePromise` + `onStorageError`; steps sem `.catch` toast.

## Checklist

- [x] Cada hook: mover tratamento p/ callbacks
- [x] Forms usam `handleFormError` no `onError`
- [x] Comportamento de toast/field-error preservado
- [x] `bunx tsc --noEmit` limpo
- [x] Residual: farm photo + LCA upload sem throw / sem double toast

## Refs

- doc: `docs/agents/web/principles.md` (P7), `api-layer.md` (error model)
- util: `gaia-web/src/lib/errorHandlers.ts`, `gaia-web/src/lib/safe-promise.ts`
