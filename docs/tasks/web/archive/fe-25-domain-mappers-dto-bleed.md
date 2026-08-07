# FE-25 — Mappers de domínio para DTO bleed

> **Prioridade:** Média | **Assignee:** — | **Status:** ✅ Implementado

## Problema

`architecture.md`: componentes consomem UI model, não DTO cru de `client/`. Hoje
DTOs entram direto em componentes (incl. value imports, não só type).

Ex: `features/carbono-remocao/dashboard/listagem-carbono-remocao.tsx:3` (value
import `RouthcCalculationListItem`), `components/cards/card-projeto.tsx:1`,
`card-fazenda.tsx`, `features/carbono-emissao/dashboard/listagem-lca.tsx`.

Também simple create-forms constroem `body` inline no hook em vez de mapper
exportado pelo schema (`novo-projeto`, `novo-usuario`, `nova-fazenda`, `login`).

## Solução

- Por feature: UI model + mapper (`dtoToModel`) — componentes recebem model.
- Schema files exportam `valuesTo*Body` / `empty*FormValues`; hooks param de
  construir `body: {...}` inline.

## Checklist

- [x] UI model + mapper para listagens/cards que hoje recebem DTO
- [x] `valuesTo*Body` em `novo-projeto`, `novo-usuario`, `nova-fazenda`, schemas de login
- [x] Hooks usam mapper (sem `body:{...}` inline)
- [x] `import type` onde só o tipo é usado
- [x] `bunx tsc --noEmit` limpo

## Refs

- doc: `docs/agents/web/architecture.md` (DTO→model→mapper), `forms.md`
