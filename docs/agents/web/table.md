# Tabelas (`src/components/table`)

Módulo de tabela do projeto, sobre TanStack Table. Referência viva: `features/users/` (`users-page.tsx`, `users-header.tsx`, `list-users.tsx`). Visual: `DataTable`, `DataTableToolbar`, `TableState` e `DataTablePagination` no Penpot ([components.md](../design/components.md#formulários-e-datatable)).

## O que o módulo cobre

| Componente | Arquivo | Papel |
|---|---|---|
| `DataTable` | `data-table.tsx` | Renderiza cabeçalho, linhas e os estados loading/erro/vazio |
| `DataTableToolbar` | `data-table-toolbar.tsx` | Busca, filtros da feature, seletor de colunas e ação principal |
| `TableState` | `table-state.tsx` | Linha de estado: `empty`, `loading` (skeleton), `error` (+ retry) |
| `DataTablePagination` | `data-table-pagination.tsx` | Total, linhas por página, página atual e navegação |
| `ColumnsSelect` | `columns-select.tsx` | Menu "Colunas" com mostrar/esconder e "Redefinir" |
| `SortHeader` | `sort-header.tsx` | Cabeçalho ordenável |

Não há barrel: importe o arquivo concreto (`@/components/table/data-table`). Não existem mais filtros genéricos (`filters/`), `DataTableFacetedFilter` nem helpers de célula (`ColumnBoolean`, `ColumnLink`, `ColumnPercentage`). Delta em célula usa `BadgeTrend`; filtro específico entra no slot `filters` da toolbar.

A feature faz quatro coisas:

1. prepara as linhas (`rows`);
2. define as colunas (`ColumnDef<T>[]`, estáveis via `useMemo` ou fora do render);
3. cria o `useReactTable` no container da feature (não na page de `app/`);
4. conecta busca, ação e paginação.

## Colunas

| Campo | Uso |
|---|---|
| `accessorKey` / `accessorFn` | Valor da célula |
| `header` | `SortHeader` quando ordenável |
| `cell` | Formatação com componentes do design system (`Badge`, `BadgeStatus`, `BadgeTrend`) |
| `meta.label` | Nome no `ColumnsSelect`. Obrigatório em coluna escondível. |
| `meta.columnStyle` / `headerStyle` / `cellStyle` | Largura e alinhamento. `columnStyle` vale para cabeçalho e célula. |

```tsx
{
  accessorKey: "name",
  header: ({ column }) => <SortHeader column={column} title={t("name")} />,
  meta: { label: t("name") },
}
```

`SortHeader`: props `column`, `title`, `align?: "left" | "center" | "right"`. Ciclo: sem ordenação → asc → desc → sem ordenação.

## Instância

```tsx
const table = useReactTable({
  data: rows,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onSortingChange: setSorting,
  state: { sorting, pagination: { pageIndex: page - 1, pageSize } },
});
```

Acrescente `getFilteredRowModel` e `columnFilters` só quando a feature filtra no cliente.

## Render

```tsx
<DataTableToolbar
  table={table}
  search={{ value, onChange, placeholder: t("searchByName") }}
  action={<CreateItem />}
/>
<DataTable
  columns={columns}
  data={rows}
  table={table}
  loading={isLoading}
  error={isError ? t("couldNotLoad") : undefined}
  onRetry={() => refetch()}
/>
<DataTablePagination table={table} serverPagination={{ page, pageSize, totalItems, onPageChange, onPageSizeChange }} />
```

| Componente | Props | Comportamento |
|---|---|---|
| `DataTable` | `columns`, `data`, `table?`, `loading?`, `error?`, `onRetry?` | `loading` → 5 linhas skeleton; `error` → mensagem + "Tentar novamente"; sem linhas → "Nenhum resultado encontrado.". Linha h-11, hover `muted`. |
| `DataTableToolbar` | `table`, `search?`, `filters?`, `action?` | Busca (`SearchInput` h-8, com debounce) e `filters` à esquerda; `ColumnsSelect` e `action` à direita. |
| `DataTablePagination` | `table`, `serverPagination?` | Sem `serverPagination`, usa o estado do `table`. Tamanhos 10, 20, 25, 30, 40, 50, 100. |
| `TableState` | `colSpan` + `state` | Para tabela montada à mão com `ui/table`. Dentro do `DataTable` já é automático. |

## Checklist

- `meta.label` em coluna escondível e `SortHeader` em coluna ordenável;
- colunas estáveis (`useMemo`);
- `loading`, `error` e `onRetry` sempre ligados à query;
- textos (busca, erro, colunas) do i18n;
- wrappers `XTable` finos, delegando ao `DataTable`.
