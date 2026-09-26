# Design System — gaia-web

Guia prático de como o gaia-web aplica o design system. Descreve o código depois da migração (Parte 1, branch `feat/design-system`).

## Princípio

O Penpot é a fonte da verdade visual: [docs/agents/design/](../design/README.md). Quando o código diverge do Penpot, o código muda. Componente novo nasce primeiro no Penpot e entra em `src/components/<grupo>/` com o mesmo nome.

| Precisa de | Leia |
|---|---|
| Valores de token, tipografia, radius, sombra | [tokens.md](../design/tokens.md) |
| Variantes e regras de cada componente | [components.md](../design/components.md) |
| Loading, erro, vazio | [states.md](../design/states.md) |

## Shell da página

```
PageTemplate            SidebarProvider bg-sidebar
├── AppSidebar          sidebar escura (NavMain + NavUser no rodapé)
└── SidebarInset        bg-muted rounded-l-xl overflow-hidden
    ├── Header          h-16 border-b bg-background px-6
    └── ContentTemplate flex-1 flex-col gap-6 bg-muted p-6 overflow-hidden
        └── conteúdo da feature
```

- `PageTemplate` já está no layout `app/(private)/layout.tsx`. A página só monta `AppHeader` + `ContentTemplate`.
- `AppHeader` (`@/components/layout/app-header`):

| Prop | Tipo | Efeito |
|---|---|---|
| `title` | `string` | Título em `Typography variant="h1"`, truncado. Vazio mostra `-`. |
| `linkTo` | `string` | Mostra o voltar: Button `ghost` `icon-sm` com `ChevronLeft`. |
| `score` | `number \| null` | Mostra `BadgeScore` ao lado do título. `undefined` esconde. |
| `actions` | `ReactNode` | Slot à direita (`ml-auto gap-2`). |

- `ContentTemplate` já traz `gap-6` entre seções. Não repita padding nem fundo.

## Tokens

Só classes semânticas. `bun lint:tokens` recusa paleta crua (`bg-gray-100`, `text-blue-500`, `bg-white`), cor arbitrária (`bg-[#…]`), literal de cor em string e tamanho de fonte cru.

| Uso | Classes |
|---|---|
| Superfície | `bg-background`, `bg-card`, `bg-popover`, `bg-muted` (fundo do inset), `bg-accent` (hover, ativo) |
| Texto | `text-foreground`, `text-muted-foreground`, `text-primary`, `text-destructive` |
| Borda | `border` (= `border-border`), `border-input`, `ring-ring` |
| Marca | `bg-primary text-primary-foreground` |
| Status em texto ou fundo | `bg-{success,warning,info,destructive}-subtle text-{…}-subtle-foreground` |
| Status em ponto, ícone, fill | `bg-success`, `bg-warning`, `bg-info`, `bg-destructive` (nunca `text-success` em texto: 2,8:1) |
| Sidebar | `bg-sidebar`, `text-sidebar-foreground`, `sidebar-accent`, `sidebar-hover`, `sidebar-border` |
| Série de gráfico (classe) | `bg-chart-N`, `stroke-chart-N` |
| Série de gráfico (prop de Recharts, Leaflet, `style`) | string `"var(--color-chart-N)"` |

Radius: `rounded-md` (button, input, badge), `rounded-lg` (dialog), `rounded-xl` (card, KpiCard, ModuleShell, inset). `rounded-full` só em avatar, ponto, barra e anel de progresso.

### Séries

| Série | Token | Onde está |
|---|---|---|
| Fóssil | `chart-1` | `features/carbon-emission/result/lib.ts` |
| Biogênico | `chart-5` | idem |
| Remoção | `chart-2` | idem |
| BAU | `muted-foreground` | `features/carbon-removal/calculation/lib/scenario-colors.ts` |
| Cenário / projeto | `chart-1` | idem |
| Comparação, avaliações 1 a 4 | `chart-1`, `chart-4`, `chart-3`, `chart-2` | `features/comparison/shared/slot-colors.ts` |

Reuse essas constantes. Não crie outra cor de série.

## Tipografia

`Typography` (`@/components/ui/typography`) com `variant` e `tone` (`default`, `muted`, `primary`, `destructive`). Cada variante escolhe a tag (`h1`–`h3`, `p`, `span`); `as` troca.

| `variant` | Classe | px / lh / peso | Uso |
|---|---|---|---|
| `display` | `text-display` | 32/40/600 | Número de destaque (KPI, RadialProgress lg) |
| `h1` | `text-h1` | 24/32/600 | Título da página (Header) |
| `h2` | `text-h2` | 20/28/600 | Título de seção (SectionHeader), dialog |
| `h3` | `text-h3` | 16/24/600 | Título de card, EmptyState |
| `body-lg` | `text-body-lg` | 16/24/400 | Parágrafo de destaque |
| `body` | `text-body` | 14/20/400 | Padrão da UI, tabela, formulário |
| `label` | `text-label` | 14/20/500 | Label de campo, botão, cabeçalho de tabela |
| `body-strong` | `text-body-strong` | 14/20/600 | Valor em destaque |
| `caption` | `text-caption` | 12/16/400 | Ajuda, metadados, eixos, legenda |
| `caption-strong` | `text-caption-strong` | 12/16/500 | Badge, grupo |
| `mono` | `font-mono text-body tabular-nums` | 14/20/400 | Números tabulares, códigos |

- Fora da `Typography`, use a classe `text-<variant>` direto (já carrega line-height e peso). Não some `font-semibold`.
- Nunca `text-xs`/`text-sm`/`text-base`/`text-lg`/`text-xl`: a escala padrão do Tailwind foi zerada (`--text-*: initial`) e o `lint:tokens` recusa.
- `cn` conhece a escala (`extendTailwindMerge`), então `text-body` + `text-muted-foreground` não se anulam.

## Componentes

| Componente | Caminho (`@/components/…`) | Quando usar |
|---|---|---|
| `Button` | `ui/button` | `variant`: `default` (primária, submit), `outline` (secundária com texto), `secondary`, `destructive` (irreversível), `link` (link inline), `ghost` (só ícone). `size`: `default` h-9 (padrão, não declare), `sm` h-8 (ação em card, toolbar), `lg` h-10 (CTA de largura total), `icon`/`icon-sm`/`icon-lg`. `loading` mostra spinner e desabilita. Botão com texto nunca é `ghost`. |
| `Badge` | `ui/badge` | `default`, `secondary`, `outline`, `destructive`, `success`, `warning`, `info` (status em estilo subtle). Não passe cor por `className`. |
| `BadgeStatus` | `badge/badge-status` | Status do projeto. `projectStatusKey(apiLabel)` mapeia o rótulo da API para `em-andamento`/`em-auditoria`/`concluido`/`pendente`/`outro`. |
| `BadgeScore` | `badge/badge-score` | Percentual de preenchimento: `value` → faixa empty/<30/30–70/>70 com `RadialProgress sm`. |
| `BadgeTrend` | `badge/badge-trend` | Delta contra referência. `trendTone(delta, lowerIsBetter)` dá a cor, `trendDirection(delta)` dá o ícone. Tons `reference` e `empty` mostram "Ref." e "—". |
| `TopicFlag` | `badge/topic-flag` | Bandeira do tópico regenerativo com rótulo. `topicFlag(score)`: ≥65 bom, ≥40 atenção, <40 crítico, `null` não aplicável. |
| `IconChip` | `icons/icon-chip` | Ícone Lucide em quadrado. `size` `sm`/`default`/`lg`, `tone` `default`/`inverse` (sobre primary)/`destructive`. |
| `RadialProgress` | `charts/radial-progress` | Anel de progresso `sm` 16 / `md` 48 / `lg` 160. Tom automático por `scoreTone(value)`. |
| `ProgressRow` | `charts/progress-row` | Rótulo + barra + valor. `tone` `chart-1/5/2`, `success`, `warning`, `destructive`, `inverse`. |
| `ChartLegend` | `charts/chart-legend` | Ponto + rótulo de série: `chart-1`, `chart-5`, `chart-2`, `baseline`, `scenario`. |
| `KpiCard` | `cards/kpi-card` | Métrica. `content` `simple`/`breakdown` (com `ProgressRow`)/`comparison` (BAU × Cenário), `emphasis` `default`/`primary`, `loading`, `onClick` vira botão. |
| `SectionHeader` | `cards/section-header` | Título de seção (h2) com `IconChip` opcional e ações `onEdit`/`onDelete` (ícone ghost + Tooltip). |
| `CardList` | `cards/card-list` | Item de listagem `kind` `project`/`farm`. Use os wrappers `CardProject` e `CardFarm`. |
| `Card` | `ui/card` | Base: `rounded-xl border p-6 gap-6 shadow-sm`. Padding ou no `Card` ou no `CardContent`, nunca nos dois. |
| `EmptyState` | `layout/empty-state` | Vazio: `IconChip lg` + h3 + descrição + `action` opcional. |
| `ModuleStepper` / `ModuleStep` | `module/module-stepper` | Passos de módulo. `getModuleStepState(current, step, enabled)` → `active`/`completed`/`upcoming`/`locked`. |
| `ModuleShell` | `module/module-shell` | Módulo com stepper: aside `nav` de 256, título, conteúdo rolável, `footer` de ações à direita. |
| `FormInput`, `FormSelect`, `FormCombobox`, `FormDatePicker`, `FormTextarea`, `FormDropzone` | `form/form-*` | Todo campo de formulário. Montam o layout FormField via `FormField` (`form/form`): label `text-label`, controle, ajuda ou erro `text-caption`, gap 8. `FormGrid` alinha campos em colunas. |
| `FormDialog` | `dialog/form-dialog` | Dialog com formulário: não fecha ao clicar fora, rodapé Cancelar/Voltar `outline` + submit `default` com `loading`. |
| `DataTable` | `table/data-table` | Tabela. Props `loading`, `error` + `onRetry`; renderiza `TableState` sozinha. |
| `DataTableToolbar` | `table/data-table-toolbar` | Busca (`search`), `filters`, `ColumnsSelect` e `action` à direita. |
| `TableState` | `table/table-state` | `empty` (mensagem), `loading` (linhas skeleton), `error` (mensagem + "Tentar novamente"). Uso direto só fora do `DataTable`. |
| `DataTablePagination` | `table/data-table-pagination` | "N itens", linhas por página, "Página X de Y" e 4 botões. `serverPagination` para paginação na API. |
| `SortHeader` | `table/sort-header` | Cabeçalho ordenável (none → asc → desc → none). |

Detalhe de tabela: [table.md](./table.md). Detalhe de formulário: [forms.md](./forms.md).

## Estados

Regra completa em [states.md](../design/states.md). Todo dado de rede tem os três.

| Estado | Como |
|---|---|
| Loading | `Skeleton` na forma do conteúdo (`KpiCard loading`, `TableState loading`, `CardList` com thumb em skeleton). Spinner só em botão (`loading`). |
| Erro | Mensagem + Button `outline` "Tentar novamente" (`common.table.retry`). Em tabela: `DataTable error onRetry`. |
| Vazio | `EmptyState` com ícone, título e descrição do i18n. Em tabela: `TableState empty`. |

## Espaçamento

| Contexto | Classe |
|---|---|
| Entre seções | `gap-6` (já no `ContentTemplate`) |
| Dentro de card | `gap-6` (já no `Card`) |
| Entre campos de formulário | `gap-4` (`FormGrid`, corpo do `FormDialog`) |
| Label e controle | `gap-2` (já no `FormField`) |
| Ações lado a lado | `gap-2` |

## Guardrails

| Comando | Garante |
|---|---|
| `bun lint:tokens` | Nenhuma cor crua nem tamanho de fonte cru em `src/` (fora de `src/client` e testes) |
| `bun lint:boundaries` | Nenhuma feature importa outra feature |
| `bun lint` · `bun run build` | Biome e build |

- Zero comentários por padrão: só um WHY que o código não carrega, 1–2 linhas, em inglês. Regra em [code-standards.md](./code-standards.md) §4.
- `"use client"` em todo arquivo de feature ou service que usa hooks.
- Não importe `src/client/` em páginas nem features; use `src/services/`.
- Sombra: `shadow-sm` no Card, `shadow-xs` em controles. Nada de `shadow-lg` fora de dialog e sheet.

## Erros de envio

- **Em dialog, e em formulário com estado de erro desenhado no Penpot:** o erro da API aparece num `Alert` `variant="destructive"` (com `CircleAlert`) no topo do corpo, com o texto de `handleApiError(error, <chave de fallback>)`. Nada de `toast.error`.
- **Validação:** aparece por campo, via schema Zod, e não em toast.
- **Toast:** fica para sucesso e para erro fora de dialog, quando não há onde mostrar inline.
- **Lista com falha de carga:** usa `ErrorState` (IconChip destructive + mensagem + "Tentar novamente"). Dentro de tabela, usa `TableState`.
