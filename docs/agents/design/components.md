# Componentes

Inventário das páginas `Primitivas ·` (08 a 17) e `Componentes ·` (18 a 25) do Design System, uma por seção. Variantes no formato `propriedade=valores`. Nem toda combinação existe: só as úteis. Cada seção na página do Penpot traz a própria descrição com as regras e o que saiu do código.

Para instanciar: `storage.inst('<Nome>', {prop: valor})`. Componentes das páginas `Componentes ·` são buscados com `storage.V('<Nome>')`. Veja [penpot.md](./penpot.md).

## Primitivas (shadcn new-york v4)

### Button

| Componente | Variantes | Regras |
|---|---|---|
| **Button** (32) | `variant=default/secondary/outline/destructive/link` · `size=sm/default/lg` · `state=default/hover/focus/disabled/loading` | `rounded-lg` (radius.lg, desde 2026-09-26), alturas 32/36/40. Hover: primary/90, secondary/80, outline → accent. Focus = ring 3 px. Disabled = 50%. Loading = spinner + texto. Largura total: `layoutChild.horizontalSizing='fill'`. |
| **Button Icon** (24) | `variant=default/secondary/outline/ghost` · `size=sm/default/lg` · `state=default/hover/focus/disabled` | Único lugar do ghost. Troque o ícone com `swapIn`. |

### Form controls

| Componente | Variantes | Regras |
|---|---|---|
| **Input**, **Select Trigger**, **Textarea** (5 cada) | `state=default/focus/error/disabled` · `content=placeholder/filled` | h 36 (Textarea 64), rounded-md, border `input`, `shadow.xs`. Error = borda `destructive`; a mensagem fica no Field. |
| **Input Group** (6) | `addon=icon/unit/icon-end` · `content=placeholder/filled` | `icon` = busca e data · `unit` = sufixo (ha, kg) · `icon-end` = olho da senha. Substitui o SearchInput. |
| **Checkbox** (6) | `checked=false/true` · `state=default/focus/error/disabled` | 16 px, `radius.xs`. |
| **Label** | — | `label` 14/500. |
| **Field** (2) | `state=default/error` | Label + Input + ajuda. Nas telas, prefira o FormField (Componentes). |
| **Multi Select** (2) | `content=placeholder/filled` | Filled mostra Badges secondary e "+N". |
| **Dropzone** (3) | `state=default/active/error` | Borda tracejada, `radius.lg`. |
| **Input OTP** (4) | `state=empty/filled/focus/error` | 6 caixas de 40 em 2 grupos de 3. Para códigos de verificação. |
| **Toggle** (2) | `state=off/on` | Chip selecionável, h 32. On = bg accent, borda primary e check. Para seleção múltipla de opções (ex.: Módulos). |
| **Slider** | — | Track muted, range primary. |

### Badge, Card, Tabs, Display

| Componente | Variantes | Regras |
|---|---|---|
| **Badge** (7) | `variant=default/secondary/outline/destructive/success/warning/info` | rounded-md, `caption-strong`. Os status usam o estilo subtle. |
| **Card** | — | rounded-xl, border, py 24, gap 24. Title h3, description body muted, footer à direita. |
| **Tab** (4) / **TabsList** (2) | `variant=default/line` · `state=active/inactive` | default: lista muted com aba ativa em background. line: indicador de 2 px. |
| **Avatar** (4) | `size=sm/default/lg/xl` | 24/32/40/112, fallback de iniciais em muted. |
| **Alert** (4) | `variant=info/success/destructive/warning` | rounded-lg, bg `*-subtle`, ícone + título + descrição. Para mensagem de uma linha, esconda o título. `warning` tem `Action` (Button outline sm à direita, ex.: "Recalcular"). |
| **Separator** (2) | `orientation=horizontal/vertical` | 1 px `border`. |
| **Tooltip**, **Breadcrumb**, **Skeleton** | — | Tooltip em bg foreground. Breadcrumb com chevron-right. Skeleton em bg accent. |

### Menus e Overlays

| Componente | Variantes | Regras |
|---|---|---|
| **Menu Item** (6) | `variant=default/destructive/checked` · `state=default/hover/disabled` | rounded-sm, px 8 py 6. Hover = accent (destructive → destructive-subtle). |
| **Dropdown Menu**, **Select Content**, **Command**, **Popover** | — | Superfície bg popover, border, rounded-md, `shadow.md`. |
| **Dialog**, **Alert Dialog**, **Sheet** | — | Dialog: rounded-lg, `shadow.lg`, title h2, footer à direita. Desde 2026-09-26: Header 24/24/16 + Separator de ponta a ponta (linha entre o cabeçalho e o conteúdo), conteúdo 16/24 (única área com scroll), rodapé 16/24/24. Sheet: 384 de largura. **Excluir (padrão único):** Alert Dialog "Excluir <item>", descrição "Tem certeza que deseja excluir <o item> \"<nome>\"? Esta ação não pode ser desfeita." e Cancelar (outline) + Confirmar (destructive). |

### Data e Navigation

| Componente | Variantes | Regras |
|---|---|---|
| **Table Row** (4) | `type=header/default/hover/selected` | A primeira coluna estica (`fill`). Hover e selected = muted. |
| **Calendar Day** (5) / **Calendar** | `state=default/today/selected/outside/disabled` | Dia de 32. Selected = primary, today = accent. |
| **Sidebar Item** (5) | `mode=expanded/collapsed` · `state=default/hover/active` | h 32. Active = `sidebar-accent`, hover = `sidebar-hover`. |
| **Sidebar** (4) | `state=expanded/collapsed` · `active=projects/users/settings` | Expandida 256, recolhida 64 (só ícones, botões 36 com ícone 16, `logo/mark` no topo). Começa recolhida. `logo/full` no topo; no fim, o item "Recolher menu"/"Expandir menu" (ícone + nome) acima do separador e o usuário no rodapé (NavUser). Grupos: Geral (Meus Projetos) e Gestão (Gestão de Usuários, Configurações). |

## Componentes GAIA

### Indicadores

| Componente | Variantes | Substitui no código |
|---|---|---|
| **IconChip** (7) | `size=sm/default/lg` · `tone=default/inverse/destructive` | Os 2 estilos de chip de ícone |
| **BadgeTrend** (5) | `tone=better/worse/neutral/reference/empty` | DeltaBadge, DeltaPill, ColumnPercentage. O tom segue melhor/pior e o ícone segue o sinal. |
| **BadgeStatus** (5) | `status=em-andamento/em-auditoria/concluido/pendente/outro` | BadgeProjectStatus |
| **BadgeScore** (4) | `band=empty/low/mid/high` (0 · <30 · 30–70 · >70) | BadgePercentage |
| **RadialProgress** (9) | `size=sm/md/lg` · `tone=success/warning/destructive` | CircularProgress, CircleChart. Trilho na cor do tom a 20% (não `muted`), para aparecer sobre o fundo `*-subtle` do BadgeScore (mudança de 2026-09-26). |
| **ProgressRow** (7) | `tone=chart-1/chart-5/chart-2/success/warning/destructive/inverse` | Barras do StageCard e do Score Regenerativo. `inverse` é para uso sobre primary. |
| **ChartLegend** (5) | `series=chart-1/chart-5/chart-2/baseline/scenario` | Legendas dos gráficos |
| **TopicFlag** (4) | `flag=good/attention/critical/na` | Bandeira do tópico regenerativo: ponto `success`/`warning`/`destructive`/`muted-foreground` + "Bom"/"Atenção"/"Crítico"/"Não aplicável". Faixas: ≥ 65 bom, ≥ 40 atenção, < 40 crítico. Substitui o ponto sem rótulo da aba e o chip da comparação. |
| **ScoreScale** (2) | `size=lg/sm` | Escala 0–100 nas faixas Crítico/Atenção/Bom (`destructive`/`warning`/`success` a 30%), com um marcador por avaliação (`m1`–`m4`, nas séries da comparação). `lg` (1080) traz os ticks. Mova os marcadores para o valor e esconda os que sobram. |
| **ChartCard** | — | Referência de estilo de gráfico (grid tracejado em border, eixos em caption muted). Emissões por Fase usa o ChartCard vertical, na largura do conteúdo. |
| **MiniBarChart** | — | Card compacto com 3 barras (chart-1/chart-5/chart-2). Perfil por fase (sem XLabels) e comparação de alocação (XLabels Massa/Energia/Econômico). |

### Cards

| Componente | Variantes | Substitui no código |
|---|---|---|
| **SectionHeader** (3) | `action=none/edit/edit-delete` | TitleCard. `edit-delete` = lápis + lixeira (destructive) em Button Icon ghost; nas telas, cada ícone ganha Tooltip. |
| **KpiCard** (5) | `content=simple/breakdown/comparison` · `emphasis=default/primary` | KpiCard, AllocationKpiCard, StageCard, MetricCard, ComparisonMetricCard. `primary` substitui accent, active e highlighted. |
| **CardList** (2) | `kind=project/farm` | CardList, CardProject, CardFarm. Ação "Visualizar" em Button link, pequeno, no topo à direita (mudança de 2026-09-26). |
| **PlotCard** (3) | `state=default/highlighted/loading` | PlotCard da grade de talhões. `highlighted` = borda primary, em sincronia com o polígono em hover. |
| **AssessmentCard** (3) | `progress=incomplete/complete` · `state=default/loading` | Card da avaliação ACV (aba Carbono emissão): nome, Badge da cultura e do ano, Área e Montante, ProgressRow "Progresso", "Continuar →" ou "Ver resultado →" e menu Ações. |
| **AnnualSoilCard** (2) | `state=default/empty` | Manejo Anual do Solo: prática em Badge, dica e 6 métricas. `empty` = borda tracejada sem sombra. |
| **AbatementCard** | — | Abatimento por remoção (visão agrícola): Emissões brutas, Remoção e Total Líquido em `foreground`. |
| **DetailsCard** (2) | `state=default/loading` | FarmDetails, PlotDetails. SectionHeader + pares rótulo/valor empilhados. |

### Layout

| Componente | Variantes | Regras |
|---|---|---|
| **AppHeader** (2) | `back=no/yes` | h 64, título h1, slot de ações. Esconda `Actions` e `BadgeScore` quando a tela não tem. |
| **ModuleStep** (4) / **ModuleStepper** | `state=active/completed/upcoming/locked` | Substitui os 3 steppers. |
| **ModuleShell** | — | Aside de 256 com o stepper, main com SectionHeader e rodapé de ações. |
| **EmptyState** (2) | `action=none/yes` | IconChip lg + h3 + descrição. Esconda o que a tela não tem. |
| **MapPlaceholder** (7) | `state=loading/empty/ready/plots/draw/plot/no-geometry` | Mapa Leaflet. `plots` = talhões em success-subtle, hover em primary + Tooltip. `draw` = DrawToolbar (polígono/editar/remover), referência tracejada em warning e polígono novo com vértices. `plot` = um talhão só, enquadrado (tela do talhão). `no-geometry` = talhão sem geometria, sem ação. Depois de redimensionar uma instância, rode `storage.fitMap(m)`. |
| **Stepper** (3) | `current=1/2/3` | Novo: indicador horizontal de passos para wizard em dialog (Nova fazenda). |
| **PageTemplate** | — | Referência visual. As telas reais são montadas com `storage.screen` (veja [screens.md](./screens.md)). |

### Formulários e DataTable

| Componente | Variantes | Regras |
|---|---|---|
| **FormField** (12) | `control=input/unit/select/date/textarea/password` · `state=default/error` | Label + controle + ajuda ou erro, gap 8. Use `storage.field(...)` nas telas. |
| **FormDialog** | — | Referência do padrão de dialog de formulário: 2 colunas e rodapé outline + default. |
| **FileItem** (2) | `state=done/uploading` | Card do arquivo enviado (KML etc.), com progresso no upload. |
| **PlotItem** (2) | `state=default/error` | Item da lista de talhões do wizard. `error` = borda destructive + erros de geometria. |
| **SortHeader** (3) | `sort=none/asc/desc` | Cabeçalho ordenável |
| **FacetedFilter** (2) | `state=empty/selected` | Filtro tracejado |
| **TableState** (2) | `state=empty/loading` | "Nenhum resultado encontrado." e spinner |
| **DataTableToolbar**, **DataTablePagination**, **DataTable** | — | A paginação mostra "N itens", "Linhas por página", "Página X de Y" e 4 botões. |

## Comparação

Página `25 Componentes · Comparação`. Séries das avaliações: `chart.1`, `chart.4`, `chart.3` e `chart.2`, nessa ordem. A 1ª é a referência por padrão. Nas telas, esconda as linhas, colunas e barras das avaliações que não estão na comparação.

| Componente | Variantes | Regras |
|---|---|---|
| **ComparisonSlot** (6) | `kind=filled/reference/add/empty/loading/error` | Card da avaliação na faixa de 4 vagas: ponto da série, nome, "Ref.", remover (x), caminho Projeto › Fazenda › Talhão · período e Select do produto. `add` = tracejado "Adicionar Nª avaliação". `error` = "Sem resultado calculado". |
| **CompareMetricCard** | — | Uma métrica, com uma linha por avaliação: valor h3 + BadgeTrend vs. referência + barra da série. |
| **StageMatrix** | — | Fases × avaliações. Cada célula tem valor + BadgeTrend + "Fóssil · Bio · Remoção". A linha Total fica em `accent`. |
| **CompareStageChart** | — | Barras horizontais por fase, com abas Líquido/Fóssil/Biogênico/Remoção. |
| **CompareDeltaChart** | — | Barras divergentes a partir do zero: "← Menor" / "Maior →", verde = menor, vermelho = maior. |
| **CompareAllocationChart** | — | Colunas por método de alocação (Massa, Energia, Econômica). |
| **CompareLineChart** | — | Linha no tempo, uma série por avaliação, legenda embaixo. "Ganho de carbono do solo" da comparação de remoção. Loading: LineChart `state=loading` com a legenda escondida. |
| **PickerItem** (2) | `state=default/active` | Item das colunas Projeto/Fazenda/Talhão: nome, meta e chevron. `active` = accent. |
| **PickerOption** (5) | `state=available/selected/in-comparison/full/not-calculated` | Avaliação no modal: checkbox, nome, linha (período · líquido) e tag Disponível/Selecionada/Já na comparação/Sem vagas/Não calculada. |
| **SelectionChip** | — | Item na bandeja do rodapé do modal: nome, local e remover. |
| **ScoreOverview** | — | Regenerativo: pontuação geral por avaliação (`Col 1`–`Col 4`), com valor em display, TopicFlag da faixa, BadgeTrend em p.p. contra a referência, "Faltam N pts para Bom" ou "Na faixa Bom" e ScoreScale lg. |
| **TopicDistribution** | — | Regenerativo: uma linha por avaliação (`Row 1`–`Row 4`), com barra empilhada crítico/atenção/bom, BadgeTrend em bons contra a referência e a legenda das contagens. |
| **SectionScores** | — | Regenerativo: uma ScoreScale sm por seção, com valor na cor da faixa e delta em p.p. por avaliação (`Col N`, marcador `mN`, legenda `Item N`). |
| **TopicTable** | — | Regenerativo: tópicos × avaliações, com linha de seção em `accent` e célula TopicFlag + seta (`arrow-up` success / `arrow-down` destructive) contra a referência. O toggle é "Todos os tópicos \| Só com diferença": no modo só com diferença, esconda as linhas `Topic · …` e o Separator antes delas; as `Topic* · …` diferem da referência. |

- **BadgeTrend:** o tom segue melhor/pior e o ícone segue o sinal (`trending-down` para −, `trending-up` para +). Use `storage.fixTrends(root)` depois de trocar os textos.

## Estados

Veja [states.md](./states.md).

| Componente | Variantes | Regras |
|---|---|---|
| **ErrorState** (3) | `variant=page/section/compact` | page: IconChip lg `destructive` + h3 + "Voltar". section: IconChip + mensagem + "Tentar novamente" (lista, tabela). compact: ícone + mensagem + "Tentar novamente" sm (dentro de card ou dialog). |
| **TableState** (3) | `state=empty/loading/error` | loading = linhas skeleton de 4 colunas genéricas. Se a tabela tem outras colunas, monte as linhas skeleton alinhadas às colunas reais. |
| **CardList** | `state=default/loading` (loading em `kind=project` e `kind=farm`) | Skeleton na forma do card |
| **KpiCard** | `state=default/loading` (loading em `content=simple`) | Skeleton na forma do card |
| **Button** | `state=loading` também em `size=lg` (default e destructive) | Para CTA de largura total |

## Documentação (anotação das páginas de tela)

| Componente | Variantes | Regras |
|---|---|---|
| **FlowTag** (6) | `kind=principal/carregando/erro/sucesso/vazio/dialog` | Marca o papel de cada frame no fluxo. Fora do produto. Tipografias `doc-display` (64), `doc-title` (32) e `doc-body` (24) só para anotação. |

## Mobile (`DS - Mobile`)

Arquivo separado, ligado ao Design System. Estilo mais redondo (referência: Delivery App UI Kit, Penpot Hub): pílulas, cards radius.3xl sobre folha muted com topo radius.4xl. Os helpers `storage.V`/`comp` procuram no Design System e no `DS - Mobile`. Frame 375×812, margem 16, alvo de toque mínimo 40. Regras completas na página `02 Fundamentos`.

### Primitivas (`04 Primitivas`)

| Componente | Variantes | Regras |
|---|---|---|
| **MButton** (11) | `variant=default/secondary/outline/destructive/link` · `size=lg/sm` · `state=default/loading/disabled` | Pílula. lg 48 (texto h3), sm 36 (label). Principal em largura total. `link` (sm) = texto primary sem fundo, para links do código ("Esqueci minha senha"). Nunca ghost com texto. |
| **MField** (19) | `control=input/select/unit/unitselect/date/password/textarea` · `state=default/error` · `content=filled/placeholder` | Label + controle de 48 (textarea 112), radius.xl, texto body-lg (16, evita zoom do iOS). Ajuda escondida; ícone info escondido. |
| **MSearch** (2) | `content=placeholder/filled` | Pílula de 48, limpar quando preenchida. |
| **MCheck** (4) | `state=unchecked/checked/indeterminate/disabled` | Caixa de seleção com rótulo e alvo de 44. |
| **MOtp** (3) | `state=empty/filled/error` | Label + 6 caixas elásticas de altura 56, radius.xl, dígito em h2. |
| **MEmptyState** (3) | `kind=empty/error/success` | Ícone 64 em círculo background com borda e ícone no tom (primary/destructive/success), texto centralizado, h3, descrição e ação opcionais. Substitui EmptyState e ErrorState no mobile. error usa "Tentar novamente" (`common.retry`). |
| **MAlert** (4) | `variant=info/success/destructive/warning` | Mensagem inline radius.2xl, ícone em círculo background, texto body em *-subtle-foreground. Substitui o Alert no mobile. |
| **MChip** (2) | `state=default/selected` | Pílula de 36. selected = info-subtle + borda primary + check. |
| **MTab** (2) | `state=active/inactive` | Aba de navegação em pílula de 36 numa linha que rola (fazenda, talhão). active = primary. |
| **MSegment** (2) / **MSegmented** (2) | `state=active/inactive` · `items=2/3` | Controle segmentado em pílula (track muted). Troca de módulo e de visão. |

### Componentes

| Componente | Variantes | Regras |
|---|---|---|
| **StatusBar** (2) · **HomeIndicator** (2) | `tone=dark/light` | Moldura do iOS, fora do produto. |
| **MIconButton** (2) | `on=primary/surface` | Círculo de 40. primary: state-layer branca a 16%; surface: background + borda. |
| **AppBar** (3) | `kind=title/farm/home` | Topo em primary com StatusBar light, 20 px de respiro para a folha de conteúdo. farm: fazenda + SyncStatus + BadgeScore. home: Avatar + usuário + SyncStatus + sincronizar agora. |
| **ActionBar** (4) | `actions=one/two` · `state=default/loading` | Rodapé flutuante: topo radius.4xl, shadow.lg, MButton lg + HomeIndicator. |
| **FAB** (2) | `kind=icon/extended` | Círculo de 56 ou pílula com rótulo ("Nova fazenda"). Um por tela. |
| **ListCard** (9) | `kind=project/farm/plot` · `state=default/pending/loading` | Card radius.3xl, ícone em círculo info-subtle, dados num bloco muted radius.2xl. Campos do código: project = Fazendas, Pendências, Status; farm = Responsável, Qtd. Pendências; plot = Área. |
| **MAssessmentCard** (4) | `state=incomplete/complete/pending/loading` | Avaliação de módulo: nome + menu, Badges cultura/ano, Área e Montante, Progresso (chart.1; success em 100%), "Continuar" ou "Editar". |
| **MCalcCard** (3) | `state=default/pending/loading` | Cálculo Roth-C: nome + menu, ID e "Criado em", "Editar". |
| **MMonthRow** (5) · **MMonthHeader** | `mode=crop/biomass` · `state=default/nocrop/error` | Grade mensal: mês em cima, DPM/RPM (estica) + Cobertura (120) embaixo; biomass acrescenta kg/ha + Replicar; nocrop = warning-subtle. |
| **MStepItem** (4) | `state=completed/active/upcoming/locked` | Etapa no BottomSheet steps. |
| **MDropzone** | — | Envio de arquivo, borda tracejada input, radius.2xl. |
| **MFileItem** (2) | `state=done/uploading` | Arquivo: ícone, nome, Badge do tipo, tamanho, remover; uploading com barra. |
| **MPlotItem** (2) | `state=default/error` | Talhão do wizard: nome, área, Centralizar/Renomear/Excluir; error com borda e mensagem. |
| **MobileStepper** | — | Card: "Etapa N de T" (primary), etapa em h2, barra de 8 (`Progress` = N/T) e MIconButton list-checks que abre as etapas num BottomSheet. |
| **SyncStatus** (10) | `state=synced/pending/syncing/offline/error` · `on=surface/primary` | Pílula. surface em *-subtle; primary com state-layer branca. Textos novos, sem i18n no gaia-web. |
| **ConnectionBanner** (3) | `state=offline/reconnected/error` | Aviso radius.2xl no topo da folha; error abre a fila de pendências. |
| **SyncItem** (5) | `state=pending/syncing/error/synced/conflict` | Card da fila: seção, local, hora, Badge. error: mensagem + Revisar e Tentar novamente (MButton sm). |
| **SheetOption** (2) · **SheetAction** (2) | `state=default/selected` · `tone=default/destructive` | Opção de lista (mínimo 52, cresce com texto longo) e linha de ação com ícone (Sincronização, Sair). |
| **ConflictOption** (2) | `source=device/server` | Uma versão do dado em conflito: origem, quem editou e quando, campos que diferem. |
| **BottomSheet** (9) | `kind=options/confirm/confirm-error/form/menu/steps/months/conflict/account` | Substitui Select Content, Dialog e Alert Dialog. Topo radius.4xl. confirm usa a copy do Alert Dialog do web; conflict mostra as duas ConflictOption e "Manter a do aparelho" / "Usar a do servidor"; account tem usuário, Sincronização e Sair. |
| **Ícones** | `cloud-off`, `cloud-check`, `cloud-alert`, `smartphone`, `cloud` | Lucide que faltavam no Design System. |

**FormSection (padrão, não componente):** card radius.3xl, padding 20, título h3 e MFields com gap 16. Uma seção do módulo por etapa do wizard.

**Reuso do Design System:** Avatar, Badge, BadgeStatus, BadgeScore, RadialProgress, Checkbox, Input OTP, Dropzone, FileItem, Skeleton, EmptyState, ErrorState, MapPlaceholder, Separator, FlowTag.

## Removidos do código (sem uso)

GaugeChart, Footer, OperationalStatus, FormCheckbox, FormNumberInput, ColumnBoolean, ColumnLink e os inputs de `filters/`. Se algum voltar a ser necessário, desenhe a partir das primitivas.
