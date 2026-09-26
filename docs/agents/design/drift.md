# Drift

Onde o código do gaia-web diverge do design system. Espelha a página `99 Drift` da biblioteca Design System no Penpot, que é a fonte. Cada linha é um item do backlog da migração, etapa 1 (design system no código). O drift de cada tela fica para a etapa 2, por módulo. Caminhos relativos a `gaia-web/`. Levantamento de 2026-09-25.

## Resolução

**Status: resolvido em 2026-09-26**, na branch `feat/design-system` do gaia-web. Plano: [design-system-migration.md](../../plans/design-system-migration.md). A checagem `bun lint:tokens` impede que cor e tamanho crus voltem.

| Itens | Commit |
|---|---|
| T1–T11 Tokens | `794e6b5` (o bloco `legacy` saiu em `4617bd0`) |
| Y1–Y8 Tipografia | `c3aff0b` |
| P1–P21 Primitivos | `06f3727` (P15 em `6af229a`) |
| G1–G5, G17 Indicadores | `580061d` |
| G6–G10 Cards | `6af229a` |
| G11–G16 Layout | `a603f03` |
| G18–G20 Formulários | `683c3e1` |
| G21–G22 DataTable | `addb7a9` |
| C1–C11 Cores cruas e Y9 | `4617bd0` |
| R1–R5 Remover | `b0b3cb4` |

**Resolvidos com ressalva:**
- **P14 (Card):** só `rounded-xl` + `shadow-sm`. O espaçamento `py-6 flex-col` do shadcn fica para a Parte 2 (telas).
- **P17 (SearchInput):** não foi apagado, porque carrega o debounce. Virou o Input Group padrão.
- **G4 (BadgeStatus):** a API manda o status traduzido, e não o `StatusEnum`. Fica uma função de mapeamento até o gaia-api mandar o enum.

**Tipos:** **Ajuste** (valor ou classe muda, a peça continua) · **Adicionar** (falta no código e existe no design) · **Substituir** (a peça do código vira outra do design) · **Remover** (sem uso ou fora do sistema) · **Bug** (comportamento errado achado no levantamento)

## Tokens

src/app/globals.css. O semantic ainda está no neutro do shadcn, não na escala GAIA. Fonte: tokens.md (sets core e semantic do tema mode/light). O bloco .dark fica fora: dark mode está fora de escopo.

| # | Onde | Hoje | Destino | Tipo |
|---|---|---|---|---|
| T1 | `src/app/globals.css:88, 90, 92` | foreground, card- e popover-foreground = oklch(0.145 0 0), preto neutro | foreground → gray.900 #212123 | Ajuste |
| T2 | `src/app/globals.css:95-100` | secondary, muted e accent = oklch(0.97 0 0) neutro. secondary- e accent-foreground = azul do primary | secondary, muted, accent → gray.100. Os *-foreground → gray.900: azul só no primary, focus e info | Ajuste |
| T3 | `src/app/globals.css:98` | muted-foreground = oklch(0.556 0 0) neutro | muted-foreground → gray.600 #737478 | Ajuste |
| T4 | `src/app/globals.css:102-103` | border e input iguais, oklch(0.922 0 0) | border → gray.200 · input → gray.300 | Ajuste |
| T5 | `src/app/globals.css:104` | ring cinza, oklch(0.708 0 0) | ring → blue.200 #AABDFF | Ajuste |
| T6 | `src/app/globals.css:101` | destructive padrão do shadcn, sem foreground nem subtle | destructive → red.700 #D02B30, com -foreground, -subtle e -subtle-foreground | Ajuste |
| T7 | `src/app/globals.css (não existe)` | Sem success, warning e info. Badges e alertas usam green, yellow e blue crus | success, warning e info, cada um com -foreground, -subtle e -subtle-foreground. warning-foreground = gray.900 | Adicionar |
| T8 | `src/app/globals.css:105-109` | chart-1 a 5 padrão do shadcn (laranja, teal, azul-escuro, amarelos) | chart.1 blue.400 · chart.2 green.600 · chart.3 yellow.600 · chart.4 purple.600 · chart.5 aqua.600 | Ajuste |
| T9 | `src/app/globals.css:111-118` | sidebar-border branco. sidebar-primary e sidebar-ring sem uso. Sem hover nem texto secundário | sidebar-border → gray.800 · novos sidebar-hover (gray.800) e sidebar-muted-foreground (gray.400) · sai sidebar-primary* | Ajuste |
| T10 | `src/app/globals.css:46-80, 120-162` | Core com degraus sem uso: blue-0/500/800, gray-50 (igual a blue-0), gray-500/700, green-200/500, aqua-200, purple-50/200/500, yellow-200/500, red-200/500/600, pink-* | Escala core do Penpot, 23 degraus. Entram gray-600/800, green-800, yellow-800, red-700/800 | Substituir |
| T11 | `src/app/globals.css:41-44` | radius sm/md/lg/xl corretos. xs cai no padrão do Tailwind (2px) | radius.xs = 4 (checkbox, topo das barras) | Ajuste |

## Tipografia

src/components/ui/typography.tsx (93 imports). A escala do código está deslocada: o h3 é maior que o h2 e o display tem o tamanho do h1 do design. Fonte: tipografias do grupo GAIA na Foundations.

| # | Onde | Hoje | Destino | Tipo |
|---|---|---|---|---|
| Y1 | `src/components/ui/typography.tsx:8` | h1 = text-xl (20), leading-tight | h1 24/32 600 | Ajuste |
| Y2 | `src/components/ui/typography.tsx:9` | h2 = text-base (16) | h2 20/28 600 | Ajuste |
| Y3 | `src/components/ui/typography.tsx:10` | h3 = text-lg (18), maior que o h2 | h3 16/24 600 | Ajuste |
| Y4 | `src/components/ui/typography.tsx:11` | display = text-2xl (24) | display 32/40 600 | Ajuste |
| Y5 | `src/components/ui/typography.tsx:12-13` | body e body-lg com leading-relaxed (≈23 e 26) | body 14/20 · body-lg 16/24 | Ajuste |
| Y6 | `src/components/ui/typography.tsx:14-15` | label e caption com leading-tight | label 14/20 500 · caption 12/16 | Ajuste |
| Y7 | `src/components/ui/typography.tsx (não existe)` | Sem body-strong, caption-strong e mono | body-strong 14/20 600 · caption-strong 12/16 500 · mono 14/20 Geist Mono | Adicionar |
| Y8 | `src/components/ui/typography.tsx:22` | tone strong = text-gray-900 | Sai: o default já é foreground | Remover |
| Y9 | `src/ (fora da Typography)` | Tamanhos crus em 179 lugares: text-xs 60 · text-sm 88 · text-base 11 · text-lg 4 · text-xl 8 · text-2xl 4 · text-3xl 2 · text-4xl 1 · text-5xl 1 | Typography com a variante da escala | Substituir |

## Cores cruas

Cor fora de token em src/ (sem src/client). As que somem junto com um componente da seção Componentes GAIA estão lá. Charts e mapas leem o token do CSS (var(--color-*)), não um hex copiado.

| # | Onde | Hoje | Destino | Tipo |
|---|---|---|---|---|
| C1 | `src/features/carbon-emission/result/components: annual-soil-card:39-108 (7) · allocation-kpi-card:28, 61 · kpi-card:30 · stage-card:41, 82 · agro-result-view:66 · stale-banner:32, 36` | emerald-* e amber-* em 15 linhas | success-subtle / -subtle-foreground · warning-subtle / -subtle-foreground | Substituir |
| C2 | `src/features/comparison/shared/delta.tsx:7, 13, 19 · picker-dialog.tsx:384 · regenerative/components/regenerative-bits.tsx:11-41 (6) · topic-table.tsx:46, 133 · carbon-emission/components/stage-charts.tsx:173` | emerald-* e amber-* em 13 linhas | BadgeTrend, TopicFlag e *-subtle (ver Componentes GAIA) | Substituir |
| C3 | `src/features/farm/plots/plot-drawer.tsx:186` | amber-* | warning-subtle-foreground | Substituir |
| C4 | `src/features/carbon-emission/result/lib.ts:3-5` | #2563EB · #0E7490 · #16A34A | Fóssil chart.1 · Biogênico chart.5 · Remoção chart.2 | Substituir |
| C5 | `src/features/carbon-removal/calculation/lib/scenario-colors.ts:1-2 (11 refs)` | hsl(197 73% 44%) · oklch(0.58 0.2 295) | BAU → muted-foreground · Cenário → chart.1 | Substituir |
| C6 | `src/features/comparison/shared/slot-colors.ts:1-3` | 8 hex, uma paleta por módulo | Uma sequência só: chart.1, chart.4, chart.3, chart.2 (1ª = referência) | Substituir |
| C7 | `src/features/carbon-emission/result/components: allocation-section:43, 44, 101 · emission-charts:64, 90 · full-emission-profile:61 · removal-abatement-bar:25 · stage-card:27, 34` | hex, rgba e white nos gráficos | chart.* · card · border · muted-foreground | Substituir |
| C8 | `src/components/map/kml-layer.tsx:28-40 · plots-layer.tsx:30-41 · map-view.client.tsx:25, 29 · src/features/farm/components/farm-plots-layer.tsx:11-22` | oklch do primary copiado e #f59e0b | primary e warning lidos do CSS | Substituir |
| C9 | `src/features/login/components/template.tsx:19` | bg-[#33373B] opacity-80 (overlay do Auth) | sidebar a 80% | Substituir |
| C10 | `src/features/project/lib/kml-photo-upload.ts:34` | fallback #ffffff | background lido do CSS | Ajuste |
| C11 | `src/ (56 arquivos, ≈149 classes)` | Paleta crua: bg-white 18 · bg-gray 15 · text-white 12 · red 22 · bg-yellow 11 · bg-green 10 · border-gray 9 · blue 14 · bg-black 4 | Tokens semantic: background, muted, border, *-foreground, *-subtle | Substituir |

## Primitivos

src/components/ui/*. O design segue o shadcn new-york v4 canônico, página Primitivas. Variante sem uso ou valor arbitrário sai.

| # | Onde | Hoje | Destino | Tipo |
|---|---|---|---|---|
| P1 | `src/components/ui/button.tsx:17 (25 usos)` | variante primaryOutline | Button outline | Remover |
| P2 | `src/components/ui/button.tsx:28 (4 usos)` | size xl: h-12 rounded-full px-8 | Button lg no Auth · Select Trigger no FormCombobox | Remover |
| P3 | `src/components/ui/button.tsx:22 (1 uso, form-combobox:62)` | variante input: border bg-white rounded-[12px]! | Select Trigger | Remover |
| P4 | `src/components/ui/button.tsx:26-31` | rounded-full em sm, lg, xl e icon* | radius.md em todos os tamanhos | Ajuste |
| P5 | `src/components/ui/button.tsx:27` | min-w-40 no lg | Sem largura mínima | Ajuste |
| P6 | `src/components/ui/button.tsx:16` | outline com border-gray-400 | border + shadow.xs | Ajuste |
| P7 | `src/components/ui/button.tsx:36` | defaultVariants size lg | size default (36) | Ajuste |
| P8 | `src/components/ui/button.tsx:66` | loading troca o texto pelo spinner | Spinner + texto (Button loading) | Ajuste |
| P9 | `src/components/ui/button.tsx:63` | disabled={loading} vem antes de {...props}: o disabled de quem chama anula o loading | disabled = loading \|\| disabled, depois do spread | Bug |
| P10 | `src/components/ui/input.tsx:13-20` | h-12 · rounded-[12px] · bg-white · disabled:bg-muted · sem sombra | Input: 36 · radius.md · background · disabled só opacidade 50% · shadow.xs | Ajuste |
| P11 | `src/components/ui/select.tsx:32` | h-12 · rounded-[12px] · bg-white · sem sombra | Select Trigger igual ao Input | Ajuste |
| P12 | `src/components/ui/textarea.tsx:9` | bg-transparent | background, igual ao Input | Ajuste |
| P13 | `src/components/ui/badge.tsx:8, 11-18` | rounded-full · só default, secondary, destructive e outline | radius.md · entram success, warning e info (subtle) | Ajuste |
| P14 | `src/components/ui/card.tsx:9` | rounded-2xl | radius.xl · py 24 · gap 24 | Ajuste |
| P15 | `src/components/ui/card.tsx:38, 50 (4 usos)` | CardTitleIcon com círculo bg-blue-0 | Sai do primitivo: IconChip no SectionHeader | Remover |
| P16 | `src/components/ui/dialog.tsx:81, 92, 104` | border-b no header · border-t no footer · título text-lg leading-none | Sem bordas · título h2 | Ajuste |
| P17 | `src/components/ui/search-input.tsx:40 (4 usos)` | w-90 rounded-4xl | Input Group com addon de ícone (36, radius.md) | Substituir |
| P18 | `src/components/ui/sidebar.tsx:466, 470, 472 (+419, 551, 663)` | hover = sidebar-accent (o mesmo azul do ativo) | sidebar-hover · o accent fica só no item ativo | Ajuste |
| P19 | `src/components/ui/sidebar.tsx:472` | hsl(var(--sidebar-*)) sobre variáveis em oklch: cor inválida | var(--sidebar-*) direto | Bug |
| P20 | `src/components/layout/sidebar/app-sidebar.tsx:19` | bg-gray-900! | sidebar | Ajuste |
| P21 | `src/components/ui/table.tsx:14, 25, 35` | table e body em bg-secondary · header em bg-primary | Table Row header e default neutros (background, border) | Ajuste |

## Componentes GAIA

Duplicados e cascas que viram um componente unificado da página Componentes GAIA. A migração troca o componente e apaga o antigo.

| # | Onde | Hoje | Destino | Tipo |
|---|---|---|---|---|
| G1 | `src/components/badge/delta-badge.tsx:21 · src/features/comparison/shared/delta.tsx:40 (6 usos) · picker-dialog.tsx:379` | DeltaBadge (green-200, rounded-full), DeltaPill (emerald) e tag available | BadgeTrend: tom melhor/pior, ícone pelo sinal, Ref. e —. A tag vira Badge success | Substituir |
| G2 | `src/features/comparison/regenerative/components/regenerative-bits.tsx:23` | FLAG_CHIP com amber e emerald | TopicFlag (ponto + rótulo) | Substituir |
| G3 | `src/components/badge/percentage.tsx:31 (4 usos)` | BadgePercentage: w-20 h-8 fixo e overrides com ! em :8-27 | BadgeScore (faixas 0, <30, 30-70, >70) | Substituir |
| G4 | `src/components/badge/project-status.tsx:7-24` | Status mapeado pela string em português da API, cores cruas | BadgeStatus por enum de status | Substituir |
| G5 | `messages/pt.json:210` | projects.pending = "Pendências" também no badge: status Pendente aparece como Pendências | Badge mostra "Pendente" com chave própria | Bug |
| G6 | `src/features/carbon-emission/result/components: kpi-card.tsx:12, 36, 41 (8 usos) · allocation-kpi-card.tsx:11, 34 · stage-card.tsx:14, 47` | 3 cascas com accent, active e highlighted · rounded-2xl p-5 · label em caixa alta | KpiCard: emphasis default/primary · radius.xl p 20 · shadow.sm | Substituir |
| G7 | `src/features/carbon-removal/calculation/components: metric-card.tsx:26, 35 · comparison-metric-card.tsx:71, 97 (8 usos)` | text-5xl · ícone de título feito à mão | KpiCard (valor em display, comparison em h1) | Substituir |
| G8 | `src/features/carbon-emission/result/components/stage-card.tsx` | Barras internas com hex | ProgressRow com chart.* | Substituir |
| G9 | `src/features/farm/components/title-card.tsx:14 (5 usos) · farm-details.tsx:82 · general-data.tsx:42` | TitleCard · 2 chamadas com onEdit={() => {}} | SectionHeader (h2 + ação opcional) · sem lápis vazio | Substituir |
| G10 | `src/components/cards/card-list.tsx:26, 34, 36-38 · card-project.tsx:14 · card-farm.tsx:14` | Barra w-2 bg-primary · rótulo Nome do Projeto/Fazenda · link Visualizar … | CardList project/farm · Button outline sm "Visualizar" · status em BadgeStatus | Substituir |
| G11 | `src/components/layout/header.tsx:20, 26, 35, 66-72 (8 usos)` | Avatar + nome + email · CircleChevronLeft azul · bg-white | AppHeader: voltar em Button Icon ghost chevron-left · slot de ações | Substituir |
| G12 | `src/components/layout/sidebar/nav-user.tsx:30 · app-sidebar.tsx:29-32` | Configurações no rodapé, dentro do NavUser | Item no grupo Gestão · rodapé com o usuário (NavUser) | Ajuste |
| G13 | `src/components/layout/content-template.tsx:5 (5 usos)` | bg-gray-100 | PageTemplate: muted + painel inset radius.xl | Substituir |
| G14 | `src/components/module/module-stepper.tsx:23, 53 · src/features/carbon-removal/module/components/main-stepper.tsx:17, 48 · scenario-sub-stepper.tsx:17, 63, 75` | 3 steppers, o MainStepper é cópia do ModuleStepper | ModuleStep + ModuleStepper (active, completed, upcoming, locked) | Substituir |
| G15 | `src/components/module/module-shell.tsx:13 · src/features/carbon-removal/module/components/module-shell.tsx:17` | 2 ModuleShell (o do carbon-removal embute o MainStepper) | ModuleShell único: aside 256 e rodapé de ações | Substituir |
| G16 | `src/components/layout/pages/empty-page.tsx:10, 14 (9 usos)` | Animação Lottie check-list | EmptyState: IconChip lg + h3 + ação opcional | Substituir |
| G17 | `src/components/charts/circle-chart.tsx · src/components/ui/circular-progress.tsx:20 (1 uso)` | Dois anéis de progresso com hex | RadialProgress | Substituir |
| G18 | `src/components/form/form-input.tsx:15 (61) · form-select.tsx:20 (38) · form-text-area.tsx:4 (8) · form-date-picker.tsx:49 (1)` | Cada Form* monta label, controle e erro do seu jeito | FormField: label, controle, ajuda e erro com gap 8 | Substituir |
| G19 | `src/components/form/form-combobox.tsx:61-62, 78 (5 usos)` | Button input xl como gatilho · "Nenhum item encontrado." fixo | FormField select (Select Trigger) · texto no i18n | Substituir |
| G20 | `src/components/dialog/form-dialog.tsx:87, 92 (3 usos)` | "Voltar" em Button link | FormDialog: "Cancelar" outline | Ajuste |
| G21 | `src/components/table/data-table.tsx:36 · header-sort.tsx:32 · columns-select.tsx:33, 60 · src/features/users/components/users-header.tsx:17` | Header branco sobre primary · "Colunas" e "Redefinir" fixos · toolbar própria de usuários | DataTable + DataTableToolbar genérica · textos no i18n | Substituir |
| G22 | `src/components/table/header-components/header-sort.tsx:15-16 (4 usos)` | justify-left e justify-right não existem no Tailwind: alinhamento ignorado | SortHeader com justify-start e justify-end | Bug |

## Remover

Sem nenhum import fora do próprio arquivo. Se voltarem a ser necessários, são desenhados a partir das primitivas antes de voltar ao código.

| # | Onde | Hoje | Destino | Tipo |
|---|---|---|---|---|
| R1 | `src/components/charts/gauge-chart.tsx:15 · src/components/layout/footer.tsx:3 · src/features/farm/components/operational-status.tsx:38` | GaugeChart, Footer e OperationalStatus | Apagar | Remover |
| R2 | `src/components/form/form-checkbox.tsx:8 · src/components/form/form-number-input.tsx:11` | FormCheckbox e FormNumberInput | Apagar | Remover |
| R3 | `src/components/table/column-components/column-boolean.tsx:12 · column-link.tsx:8 · column-percentage.tsx:26` | ColumnBoolean, ColumnLink e ColumnPercentage | Apagar | Remover |
| R4 | `src/components/table/filters/ (5 pastas, 16 exports) · src/components/table/data-table-faceted-filter.tsx:32` | Filtros e FacetedFilter sem uso | Apagar. O FacetedFilter do design entra quando houver uso | Remover |
| R5 | `src/components/ui/collapsible.tsx:5` | Collapsible sem uso | Apagar | Remover |
