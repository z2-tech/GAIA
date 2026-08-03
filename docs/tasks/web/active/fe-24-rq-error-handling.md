# FE-24 — Normalizar error handling do React Query (callbacks vs try/catch)

> **Prioridade:** Média | **Assignee:** — | **Status:** ⬜ Pendente

## Problema

`principles.md` P7: usar `onError`/`onSuccess` callbacks, não `try/catch` em volta
de `mutateAsync`. ≥6 hooks fazem `try/catch`.

Arquivos: `features/perfil/hooks/use-editar-senha.ts:26-35`,
`features/usuarios/hooks/use-novo-usuario.ts:92-122`,
`features/carbono-emissao/modulo/hooks/use-lca-step-insumos.ts:50-83`,
`use-nova-fazenda.ts`, `use-routh-c-modulo.ts`, `use-regenerativo-modulo-form.ts`.

## Solução

- Substituir `try/catch` por `onError`/`onSuccess` no `useMutation`.
- Onde precisa aplicar field errors (forms), usar `handleFormError` (já existe em
  `src/lib/errorHandlers.ts`) dentro do `onError`.

## Checklist

- [ ] Cada hook: mover tratamento p/ callbacks
- [ ] Forms usam `handleFormError` no `onError`
- [ ] Comportamento de toast/field-error preservado
- [ ] `bunx tsc --noEmit` limpo

## Refs

- doc: `docs/agents/web/principles.md` (P7), `api-layer.md` (error model)
- util: `gaia-web/src/lib/errorHandlers.ts`
