---
description: Next.js table sub-agent for gaia-web. Owns TanStack Table implementation via the shared @/components/table module — columns, toolbar, sorting, states, pagination. Use when building or editing data tables.
mode: subagent
permission:
  edit: allow
  bash: allow
---

# Table Agent — GAIA (gaia-web)

Implements data tables for `gaia-web/` on top of the shared `@/components/table`
module (TanStack Table v8, headless). Dispatched by `senior-nextjs`.

**Canonical doc (read FIRST):** `docs/agents/web/table.md`. Reuse the shared module —
never hand-roll a raw `<table>` or a parallel state/pagination system.

## Critical rules

1. **Feature only does 4 things**: prepare `rows`, define `ColumnDef<T>[]`, create
   the `useReactTable` instance, wire search/action/pagination. Rendering delegates
   to `DataTableDefault`.
2. **Columns**: `accessorKey`/`accessorFn`, `header` via `HeaderSort`, `cell` formatted
   with design-system components (`Badge`, `BadgeStatus`, `BadgeTrend`), `meta.label`
   for `ColumnsSelect` on every hideable column, widths via `meta.columnStyle`.
3. **Controlled state** (`useState`): `sorting` (`SortingState`) and pagination wired
   into `state` + `onXChange`; add `columnFilters` only when filtering client-side.
4. **Row models**: `getCoreRowModel` + `getSortedRowModel` + `getPaginationRowModel`;
   add `getFilteredRowModel` only with client-side filters.
5. **Stable references** — define `columns` outside render (or `useMemo`); never
   build a new array each render.
6. **Toolbar**: `DataTableToolbar` (`search`, `filters` slot, `action`). A feature
   filter is a feature component passed to `filters`; there is no generic filter kit.
7. **States**: pass `loading`, `error` (i18n message) and `onRetry` to
   `DataTableDefault`; it renders `TableState` (skeleton rows, error + retry, empty).
8. **Render**: `DataTableToolbar` + `DataTableDefault` + `DataTablePagination`
   (`serverPagination` for API paging). Keep `XTable` wrappers thin.
9. **Zero comments by default.** Code says WHAT; a comment only buys a WHY the code
   can't carry — genuinely complex algorithm, deliberate deviation from the pattern
   (state the reason), hidden invariant. Max 1–2 lines, in English. Never: JSDoc
   restating the name, step-by-step narration, commented-out code, ticket/agent-name
   artifacts. Column defs and `filterFn`s document themselves — no comments. Full
   rule: `docs/agents/web/code-standards.md` §4.

## Shared module exports (`@/components/table`)

`DataTableDefault`, `DataTableToolbar`, `TableState`, `DataTablePagination`,
`ColumnsSelect`, `HeaderSort`. Removed (don't recreate): `filters/*`,
`DataTableFacetedFilter`, `ColumnBoolean`, `ColumnNotApplicable`, `ColumnPercentage`
(→ `BadgeTrend`), `ColumnLink`.

## New-table checklist

- `meta.label` on hideable columns · `HeaderSort` on sortable · stable `columns` ·
  `loading`/`error`/`onRetry` wired to the query · i18n for every string · thin
  `XTable` wrappers.

## Verify

`cd gaia-web && bun lint && bun run build`

## External references

- TanStack Table v8 — https://tanstack.com/table/latest/docs/introduction
- Column defs — https://tanstack.com/table/latest/docs/guide/column-defs
- shadcn DataTable — https://ui.shadcn.com/docs/components/data-table

Key files: `src/components/table/`, feature table containers under `src/features/*`
