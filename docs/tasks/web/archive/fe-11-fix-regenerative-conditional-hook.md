# FE-11 — Fix rules-of-hooks em regenerative.query.ts

> **Prioridade:** Alta | **Assignee:** — | **Status:** ✅ Concluído

## Problema

`src/services/regenerative/regenerative.query.ts:38-63` chama `useQuery`
condicionalmente dentro de um `if` (branch `treat404AsEmpty`) **antes** de um
segundo `useQuery` incondicional. Viola as rules-of-hooks do React — a ordem de
hooks muda entre renders, quebra em runtime. Além disso o branch faz `queryFn`
+ `queryKey` na mão em vez de usar o factory `*Options`.

## Solução

- Colapsar em **um único** `useQuery` incondicional spreading
  `getRegenerativeAssessmentByFarmOptions({ path: { farmId } })`.
- Implementar `treat404AsEmpty` via `select` / normalização de erro (padrão
  404-as-empty documentado em `api-layer.md`), não com segundo `useQuery`.
- Usar `*QueryKey` gerado para qualquer invalidação relacionada.

## Checklist

- [x] Remover o `useQuery` dentro do `if`
- [x] Único `useQuery` com `queryKey` do `*Options` factory
- [x] 404 → `null`/vazio via `queryFn` com `throwOnError: false` (padrão do doc)
- [x] Confirmar consumidores continuam funcionando (dashboard/resultado regenerativo)
- [x] `bunx tsc --noEmit` limpo

## Refs

- doc: `docs/agents/web/api-layer.md` (404-as-empty)
- file: `gaia-web/src/services/regenerative/regenerative.query.ts:38-63`
