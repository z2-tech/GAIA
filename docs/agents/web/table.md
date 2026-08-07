# Tabelas (`src/components/table`)

Este guia documenta o ecossistema de tabela do projeto (baseado em TanStack Table), como configurar colunas/filtros e como aplicar o mesmo padrão já usado nas features atuais.

## Objetivo do módulo

O módulo `src/components/table` padroniza:

- renderização da tabela (`DataTableDefault`);
- paginação (`DataTablePagination`);
- visibilidade de colunas (`ColumnsSelect`);
- cabeçalhos ordenáveis (`HeaderSort`);
- filtros reutilizáveis por tipo (`Text`, `Numeric`, `DateRange`, `MultiSelect`, `BooleanTri`).

Com isso, cada feature precisa focar só em:

1. preparar os dados (`rows`);
2. definir as colunas (`ColumnDef[]`);
3. criar a instância do `useReactTable` **no container da feature** (não na page de `app/`);
4. conectar os filtros e ações de UI.

---

## Imports diretos (sem barrel)

Não há `src/components/table/index.tsx`. Importe sempre o arquivo concreto:

```tsx
import { ColumnsSelect } from "@/components/table/columns-select";
import { DataTableDefault } from "@/components/table/data-table";
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { DataTablePagination } from "@/components/table/data-table-pagination";
import { HeaderSort } from "@/components/table/header-components/header-sort";
import { textIncludesFilterFn } from "@/components/table/filters/text-filter/text-filter-fn";
import { TextFilterInput } from "@/components/table/filters/text-filter/text-filter-input";
import { useTextFilter } from "@/components/table/filters/text-filter/use-text-filter";
import { numericFilterFn } from "@/components/table/filters/numeric-filter/numeric-filter-fn";
import { NumericFilterInput } from "@/components/table/filters/numeric-filter/numeric-filter-input";
import { useNumericFilter } from "@/components/table/filters/numeric-filter/use-numeric-filter";
import { dateRangeFilterFn } from "@/components/table/filters/date-range-filter/date-range-filter-fn";
import { DateRangeFilterInput } from "@/components/table/filters/date-range-filter/date-range-filter-input";
import { useDateRangeFilter } from "@/components/table/filters/date-range-filter/use-date-range-filter";
import { multiSelectFilterFn } from "@/components/table/filters/multi-select-filter/multi-select-filter-fn";
import { MultiSelectFilterInput } from "@/components/table/filters/multi-select-filter/multi-select-filter-input";
import { useMultiSelectFilter } from "@/components/table/filters/multi-select-filter/use-multi-select-filter";
import { booleanTriFilterFn } from "@/components/table/filters/boolean-tri-filter/boolean-tri-filter-fn";
import { BooleanTriFilterInput } from "@/components/table/filters/boolean-tri-filter/boolean-tri-filter-input";
import { useBooleanTriFilter } from "@/components/table/filters/boolean-tri-filter/use-boolean-tri-filter";
```

---

## Fluxo padrão de implementação

## 1) Defina as colunas (`ColumnDef<T>[]`)

Em cada coluna, normalmente você configura:

- `accessorKey` ou `accessorFn`
- `header` (geralmente com `HeaderSort`)
- `cell` para formatação
- `filterFn` quando filtrável
- `meta.label` para o seletor de colunas (`ColumnsSelect`)

Exemplo:

```tsx
const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <HeaderSort align="left" column={column} title="Nome" />,
    filterFn: textIncludesFilterFn<Row>(),
    meta: { label: "Nome" },
  },
];
```

## 2) Crie a instância da tabela (`useReactTable`)

No container da feature:

```tsx
const [sorting, setSorting] = useState<SortingState>([]);
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

const table = useReactTable({
  data: rows,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  onColumnVisibilityChange: setColumnVisibility,
  state: { sorting, columnFilters, columnVisibility },
});
```

> `getFacetedRowModel/getFacetedUniqueValues` são importantes para `MultiSelectFilterInput` gerar opções dinamicamente com base na coluna.

## 3) Renderize os componentes de tabela

```tsx
<>
  <div className="flex gap-2">
    <ColumnsSelect table={table} />
  </div>

  <DataTableDefault columns={columns} table={table} loading={isLoading} />
  <DataTablePagination table={table} />
</>
```

---

## Componentes principais

## `DataTableDefault`

Arquivo: `src/components/table/data-table.tsx`

Props:

- `table: Table<TData>`
- `columns: ColumnDef<TData, TValue>[]`
- `loading?: boolean`

Comportamento:

- renderiza `Loader` quando `loading=true`;
- renderiza `"Sem resultados"` quando não há linhas;
- usa `meta` da coluna para estilos:
  - `meta.columnStyle` (aplica em header e cell),
  - `meta.headerStyle`,
  - `meta.cellStyle`.

## `DataTablePagination`

Arquivo: `src/components/table/data-table-pagination.tsx`

Props:

- `table: Table<TData>`

Comportamento:

- mostra total filtrado (`table.getFilteredRowModel().rows.length`);
- controla page size (`10, 20, 25, 30, 40, 50`);
- navega entre páginas (primeira, anterior, próxima, última).

Importante: para funcionar corretamente, a instância do `useReactTable` precisa estar com modelo de paginação habilitado no fluxo da feature.

## `ColumnsSelect`

Arquivo: `src/components/table/columns-select.tsx`

Props:

- `table: Table<TData>`

Comportamento:

- lista apenas colunas com `getCanHide() === true`;
- usa `column.columnDef.meta.label` como nome amigável (fallback = `column.id`);
- permite resetar visibilidade para padrão (`toggleVisibility(true)`).

Recomendação:

- defina `meta.label` em toda coluna que pode ser escondida.

## `HeaderSort`

Arquivo: `src/components/table/header-components/header-sort.tsx`

Props:

- `column: Column<T>`
- `title: string`
- `align?: "left" | "center" | "right"`

Comportamento:

- ciclo de ordenação: sem ordenação -> asc -> desc -> sem ordenação.

---

## Filtros reutilizáveis

O padrão adotado no projeto é:

1. criar o estado com hook (`useXFilter`);
2. renderizar input (`XFilterInput`) em modo controlado;
3. no botão "Aplicar", chamar `handleApply()` de cada filtro;
4. no botão "Limpar", chamar `handleClear()`.

Isso evita filtrar a cada tecla e dá UX consistente nos sheets de filtro.

## Texto

- `textIncludesFilterFn<T>()`
- `useTextFilter({ columnId, table })`
- `TextFilterInput`

Regra: busca "contains", case-insensitive.

## Numérico

- `numericFilterFn<T>()`
- `useNumericFilter({ columnId, table })`
- `NumericFilterInput`

Formatos aceitos:

- `>10`, `>=10`, `<30`, `<=30`, `=20`
- `20` (equivale a `=20`)
- `10-15` (intervalo inclusivo)

Boas práticas:

- quando o valor da célula vem formatado (`"1.234,56"`), use `accessorFn` para converter em número antes do filtro.

## Data (intervalo)

- `dateRangeFilterFn<T>()`
- `useDateRangeFilter({ columnId, table })`
- `DateRangeFilterInput`

Suporta:

- `startDate`
- `endDate`
- `includeNull`
- `onlyNull`

Detalhes:

- comparação ignora hora (normaliza data);
- `onlyNull` filtra apenas registros sem data;
- `includeNull` inclui sem data junto com o intervalo escolhido.

## Multi-select

- `multiSelectFilterFn<T>()`
- `useMultiSelectFilter({ columnId, table, disabled? })`
- `MultiSelectFilterInput`

Pode operar em dois modos:

- opções fixas (`options`);
- opções dinâmicas (lidas dos valores únicos da coluna).

Extras:

- `getOptionLabel` para traduzir enums/códigos;
- modo controlado com `selectedValues` + `onValuesChange`.

## Boolean tri-state

- `booleanTriFilterFn<T>()`
- `useBooleanTriFilter({ columnId, table })`
- `BooleanTriFilterInput`

Estados:

- `"all"` -> filtro desativado;
- `"true"` -> filtra `true`;
- `"false"` -> filtra `false`.

---

## Componentes auxiliares de célula

- `ColumnBoolean`: badge visual para booleanos (check/x).
- `ColumnNotApplicable`: marcador de não aplicável (`-`).
- `ColumnPercentage`: percentual com direção (up/down/neutral).
- `ColumnLink`: link de navegação a partir do valor da célula.

---

## Exemplo completo (padrão recomendado)

```tsx
type Row = {
  name: string;
  amount: string | number;
  created_at?: string | null;
  status: "OPEN" | "CLOSED";
  active?: boolean;
};

function parseMaybeNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return Number.NaN;
  const normalized = value.replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", ".");
  const num = Number.parseFloat(normalized);
  return Number.isFinite(num) ? num : Number.NaN;
}

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <HeaderSort align="left" column={column} title="Nome" />,
    filterFn: textIncludesFilterFn<Row>(),
    meta: { label: "Nome" },
  },
  {
    id: "amount_num",
    accessorFn: (row) => parseMaybeNumber(row.amount),
    header: ({ column }) => <HeaderSort align="right" column={column} title="Valor" />,
    filterFn: numericFilterFn<Row>(),
    meta: { label: "Valor" },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <HeaderSort column={column} title="Data" />,
    filterFn: dateRangeFilterFn<Row>(),
    meta: { label: "Data" },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <HeaderSort align="left" column={column} title="Status" />,
    filterFn: multiSelectFilterFn<Row>(),
    meta: { label: "Status" },
  },
  {
    accessorKey: "active",
    header: ({ column }) => <HeaderSort column={column} title="Ativo" />,
    filterFn: booleanTriFilterFn<Row>(),
    meta: { label: "Ativo" },
  },
];

export function ExampleTable({ rows, isLoading }: { rows: Row[]; isLoading?: boolean }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const textFilter = useTextFilter({ columnId: "name", table });
  const amountFilter = useNumericFilter({ columnId: "amount_num", table });
  const dateFilter = useDateRangeFilter({ columnId: "created_at", table });
  const statusFilter = useMultiSelectFilter({ columnId: "status", table });
  const activeFilter = useBooleanTriFilter({ columnId: "active", table });

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  });

  const handleApplyAll = () => {
    textFilter.handleApply();
    amountFilter.handleApply();
    dateFilter.handleApply();
    statusFilter.handleApply();
    activeFilter.handleApply();
  };

  const handleClearAll = () => {
    textFilter.handleClear();
    amountFilter.handleClear();
    dateFilter.handleClear();
    statusFilter.handleClear();
    activeFilter.handleClear();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <TextFilterInput
          columnId="name"
          label="Nome"
          table={table}
          filterValue={textFilter.filterValue}
          onFilterChange={textFilter.setFilterValue}
        />

        <NumericFilterInput
          columnId="amount_num"
          label="Valor"
          table={table}
          filterValue={amountFilter.filterValue}
          onFilterChange={amountFilter.setFilterValue}
        />

        <Button onClick={handleClearAll}>Limpar</Button>
        <Button onClick={handleApplyAll}>Aplicar</Button>
        <ColumnsSelect table={table} />
      </div>

      <DataTableDefault columns={columns} table={table} loading={isLoading} />
      <DataTablePagination table={table} />
    </div>
  );
}
```

---

## Checklist para novas tabelas

- definir `meta.label` nas colunas escondíveis;
- usar `HeaderSort` em colunas ordenáveis;
- sempre casar `columnId` dos filtros com `accessorKey/id` real;
- para número formatado, criar `accessorFn` numérico e filtrar no `id` numérico;
- centralizar `handleApplyAll` e `handleClearAll` quando tiver múltiplos filtros;
- manter wrappers `XTable` simples, delegando a renderização para `DataTableDefault`.

