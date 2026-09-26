# Design System GAIA no Penpot

**Status:** Em execução. Fases 1 a 4 concluídas (todas as telas existentes, cada módulo com a sua comparação). Fase 5: página `99 Drift` pronta; falta o handoff (migração do código).
**Atualizado:** 2026-09-25

## Contexto

O gaia-web usa shadcn/ui (estilo `new-york`) com Tailwind v4, mas nunca teve um design system visual, e o código foi divergindo. A auditoria de 2026-09-24 encontrou:

- **31 cores em hex** dentro de TS/TSX:
  - `components/charts/gauge-chart.tsx`
  - `features/carbon-emission/result/lib.ts`
  - `#e5e7eb` repetido em 4 charts
- **26 usos de `emerald`/`amber`**, que ficam fora do tema. A maioria está em `features/carbon-emission/result/*`.
- **95 classes de paleta crua** (`green-600`, `red-700`...), contra 556 usos de token semântico. Os piores arquivos:
  - `badge/percentage.tsx`
  - `badge/project-status.tsx`
  - `operational-status.tsx`
- **37 `bg-white`/`text-white`** onde deveria ser `bg-background`/`bg-card`.
- **Escala tipográfica invertida** em `components/ui/typography.tsx`: h2 = `text-base` e h3 = `text-lg`.
- **Bug em `app/layout.tsx:48`:** a classe `text-grey-900` não existe, então o body fica sem cor de texto.
- **Tokens que faltam:** não há `success`, `warning` nem `info`, e os charts ignoram os `--chart-*`.
- **Componentes duplicados:**
  - 3 displays de percentual/delta (`BadgePercentage`, `ColumnPercentage`, `DeltaBadge`)
  - 5 ou mais cards de KPI
  - 3 progressos radiais (`circular-progress`, `circle-chart`, `gauge-chart`)
  - 2 mapas de cor de status
  - 2 camadas de talhões no mapa
- **Radius arbitrários** (`rounded-[12px]`, `rounded-[4px]`) convivendo com `rounded-xl`, que é equivalente.
- **Tema `.dark` sem uso:** existe no `globals.css`, mas nunca é ativado.
- **`docs/agents/web/design-system.md` desatualizado:** usa nomes antigos (`BadgePorcentagem`, `CardLista`) e recomenda cores cruas para status.

**Objetivo:** criar no Penpot a fonte da verdade visual, com tokens padronizados, os primitivos shadcn, componentes GAIA unificados e as 27 telas. Depois, num plano separado, refatorar o gaia-web inteiro para bater com ela. O design não copia o código: onde o código não faz sentido, o design corrige.

## Decisões tomadas

| Decisão | Por quê |
|---|---|
| **O design é a fonte da verdade, e o código se adapta a ele** | O gaia-web inteiro será refatorado para bater com o Penpot. Onde o código não faz sentido (variante sem uso, valor arbitrário, duplicata), o design corrige, sem copiar. Cada divergência vai para a página de Drift. |
| Base visual = shadcn/ui new-york v4 canônico | É a base do código e uma referência consistente. O "design atual" do app só entra onde é identidade GAIA: fonte Atyp Display, azul da marca no primary e sidebar escura. |
| Construir via Penpot MCP, sem comprar o kit shadcnpenpot.com ($119+) | O kit usa ícones Tabler e o app usa Lucide. |
| Só tema light | O app nunca ativa `.dark`. Dark mode fica para o futuro. |
| Penpot primeiro, código depois | Aprovar o visual antes de mexer no código. A página de Drift vira o backlog da migração. |
| Core só com os degraus que o semantic referencia (23 cores) | Componentes consomem só tokens semantic. Degrau sem uso vira convite para cor crua. |
| Cinzas unificados no gray da marca (levemente azulado) | Hoje o shadcn usa um cinza neutro e a marca usa outro. |
| UI neutra, azul só no primary, no focus e em info | `secondary` e `accent` são cinza (gray.100 + gray.900), como no shadcn. O azul deixa de competir com a ação principal. |
| `foreground` = gray-900 #212123 | É a cor que o código tentou usar (`text-grey-900`, com erro de digitação). |
| Status via `success`/`warning`/`info`/`destructive` com variantes `-subtle` | Acaba com emerald, amber e as cores cruas. Todas as combinações passam AA. |
| Tipografia com escala única, mínimo de 12px | Corrige a inversão h2/h3 e elimina `text-[10px]`. |

## Estado atual no Penpot

- **Arquivos:** time "Z2 Tech", projeto "GAIA". Biblioteca "Design System" (`220f6449-533e-815b-8008-b020a89edaa3`) e um arquivo `GAIA · <Módulo>` por módulo de telas. Estrutura atual em [README](../agents/design/README.md#arquivo-penpot).
- **Fontes do time:**
  - Atyp Display, 8 variantes (400/500/600/700, normal e itálico), enviada via API (`create-font-variant`). O font id é `f2b32094-f257-46dc-9b78-45dd0c7d29bb`.
  - Geist Mono, que é Google Font.
- **Divisão (2026-09-25):** o arquivo único (Capa & Guia, Foundations, Primitives, GAIA Components e as páginas `NN Tela - <lote>`) chegou a 123 MB e travava o editor. Virou a biblioteca Design System, com uma página por seção, e cinco arquivos de módulo, com uma página por fluxo. O Guia foi removido: páginas, regras e status vivem nos docs do repositório.
- **Tokens:** tema `mode/light` com os sets `core` (55 tokens) e `semantic` (49 tokens).
- **Tipografias de biblioteca (grupo `GAIA`):** 11 estilos, listados na tabela abaixo.

A referência de tokens, tipografia e componentes fica em `docs/agents/design/` ([tokens.md](../agents/design/tokens.md), [components.md](../agents/design/components.md)). Este plano guarda só status, decisões e histórico.

## Capa

A `01 Capa` do Design System tem foto do login com overlay, `logo/full`, o título "Design System" e os badges v1.0, shadcn/ui new-york v4 e Setembro 2026. O status das fases fica só neste plano.

## Fases

Cada fase termina num checkpoint de aprovação.

1. ✅ **Foundations:** tokens, tipografias e a página `01 Foundations` (cores core e semantic, tipografia, radius, espaçamento e 72 ícones Lucide como componentes `icon/<nome>`).
2. ✅ **Primitives shadcn:** página `02 Primitives`, refeita em 2026-09-24 sobre o shadcn canônico. São 20 conjuntos de variantes (128 variantes) e 15 componentes simples. Todo fill, stroke e sombra está ligado a token semantic (auditoria: 0 soltos). Cada seção descreve na própria página a regra e o que saiu do código.

   | Seção | Componentes (variantes) |
   |---|---|
   | Button | Button 32 (default/secondary/outline/destructive × sm/default/lg + hover/focus/disabled/loading; link com 4 estados) · Button Icon 24 (default/secondary/outline/ghost) |
   | Form controls | Input 5 · Select Trigger 5 · Textarea 5 (state default/focus/error/disabled × placeholder/filled, só as combinações úteis) · Checkbox 6 · Label · Field 2 (default/error) · Input Group 4 (addon ícone/unidade) · Multi Select 2 · Dropzone 3 (default/active/error) · Slider |
   | Badge | Badge 7 (default, secondary, outline, destructive + success/warning/info em subtle) |
   | Card | Card (header, content, footer) |
   | Tabs | Tab 4 (default/line × active/inactive) · TabsList 2 |
   | Display | Avatar 3 · Tooltip · Breadcrumb · Skeleton · Separator 2 |
   | Menus | Menu Item 6 (default/destructive/checked × estados) · Dropdown Menu · Select Content · Command · Popover |
   | Overlays | Dialog · Alert Dialog · Sheet |
   | Data | Table Row 4 (header/default/hover/selected) · Table · Calendar Day 5 · Calendar |
   | Navigation | Sidebar Item 5 (expanded/collapsed × estados) · Sidebar 2 (expanded 256 / collapsed 48) |

   **O que o design corrigiu no código (entra na página de Drift):**
   - **button:** saem `primaryOutline`, `xl`, `input`, `min-w-40` e o `rounded-full` de sm/lg/icon. Tudo fica `rounded-md`. O `outline` usa border `border`, não `gray-400`. O default de size volta a ser `default`, não `lg`. Loading mostra spinner + texto, em vez de trocar o texto só pelo spinner. Ghost fica só no Button Icon.
   - **input/select/textarea:** `h-12` vira `h-9`, `rounded-[12px]` vira `rounded-md` e `bg-white` vira `bg-background`. O disabled usa só opacidade 50%, sem `bg-muted`. A sombra xs é a mesma nos três.
   - **badge:** `rounded-full` vira `rounded-md`. Entram success, warning e info.
   - **card:** `rounded-2xl` vira `rounded-xl`, e o gap segue o shadcn (py 24, gap 24). A variante com ícone no título sai do primitivo e vira `CardTitleIcon` na fase 3. O `radius.2xl` foi removido.
   - **dialog:** saem o `border-b` e o `border-t` de header e footer. Title = h2.
   - **search-input:** some. Vira Input Group com addon de ícone, `rounded-md` e 36 de altura, igual aos outros campos. `rounded-4xl` e `w-90` saem.
   - **sidebar:** continua escura (identidade GAIA). O hover ganha token próprio (`sidebar-hover`), no lugar de reusar o accent azul.
   - **Fora dos primitivos:** `circular-progress` vai para a fase 3 (unificado no RadialProgress). `collapsible` é só comportamento, sem visual. `typography` está documentada em Foundations.
3. ✅ **Componentes GAIA unificados:** página `03 GAIA Components`, montada com instâncias das primitivas, tokens semantic e tipografias da Foundations (auditoria: 0 soltos).

   | Seção | Componentes (variantes) | Absorve |
   |---|---|---|
   | Indicadores | IconChip 5 (sm/default/lg × default/inverse) · BadgeTrend 5 (better/worse/neutral/reference/empty) · BadgeStatus 5 · BadgeScore 4 (empty/low/mid/high) · RadialProgress 9 (sm/md/lg × success/warning/destructive) · ProgressRow 7 · ChartLegend 5 | DeltaBadge, DeltaPill, ColumnPercentage · BadgeProjectStatus · BadgePercentage · CircularProgress, CircleChart · barras internas do StageCard e do Score Regenerativo · 2 estilos de icon chip |
   | Charts | ChartCard (referência de estilo) | cores hex dos charts |
   | Cards | SectionHeader 2 · KpiCard 5 (content simple/breakdown/comparison × emphasis default/primary) · CardList 2 (project/farm) | TitleCard · KpiCard, AllocationKpiCard, StageCard, MetricCard, ComparisonMetricCard · CardList, CardProject, CardFarm |
   | Layout | AppHeader 2 (com/sem voltar) · ModuleStep 4 (active/completed/upcoming/locked) · ModuleStepper · ModuleShell · EmptyState 2 · MapPlaceholder 3 (loading/empty/ready) · PageTemplate | Header, ContentTemplate · ModuleStepper, MainStepper, ScenarioSubStepper · ModuleShell ×2 · EmptyPage · loading do MapView |
   | Formulários | FormField 10 (input/unit/select/date/textarea × default/error) · FormDialog | FormInput, FormSelect, FormCombobox, FormDatePicker, FormTextarea · FormDialog |
   | DataTable | SortHeader 3 · FacetedFilter 2 · TableState 2 · DataTableToolbar · DataTablePagination · DataTable | DataTableDefault, HeaderSort, toolbar do users-header, DataTableFacetedFilter, paginação |

   **O que o design corrige no código (entra na página de Drift):**
   - **Delta e percentual:** os 4 pills viram BadgeTrend. O tom segue "melhor/pior" (a regra do DeltaPill, que considera se mais é melhor) e o ícone segue o sinal. Os estados "Ref." e "—" entram no componente. Saem green-200, emerald e o `rounded-full`: vale `rounded-md` + `*-subtle`.
   - **BadgePercentage vira BadgeScore:** sai o `w-20 h-8` fixo e os `!` de override. As faixas continuam (0, <30, 30–70, >70).
   - **BadgeStatus:** é orientado por enum de status, não pela string da API em português. "Pendente" mostra "Pendente", não "Pendências" (a chave `projects.pending` era da coluna).
   - **KpiCard:** uma casca só, com `emphasis=primary` no lugar de `accent`, `active` e `highlighted`. `rounded-2xl p-5` vira `rounded-xl p-20` + shadow.sm. Sai o label em caixa alta. MetricCard perde o `text-5xl`: valor em display (32), comparison em h1. As cores `hsl(197 73% 44%)` e `oklch(0.58 0.2 295)` viram BAU = muted-foreground e Cenário = chart.1.
   - **StageCard e barras:** `#2563EB`, `#0E7490` e `#16A34A` viram `chart.1`, `chart.5` e `chart.2`, via ProgressRow.
   - **TitleCard vira SectionHeader:** h2 + ação opcional. As 2 chamadas com `onEdit={() => {}}` perdem o lápis.
   - **CardList:** sai a barra lateral `w-2 bg-primary` e o rótulo "Nome do Projeto/Fazenda". O link "Visualizar ..." vira Button outline sm "Visualizar". O status do projeto usa BadgeStatus.
   - **AppHeader:** sai avatar + nome + email (já estão na Sidebar), e o slot da direita recebe ações. O voltar usa Button Icon ghost com chevron-left, no lugar do `CircleChevronLeft` azul.
   - **Sidebar:** "Configurações" entra no grupo Gestão, e o rodapé mostra o usuário (NavUser do shadcn).
   - **ContentTemplate:** `bg-gray-100` vira `muted`. PageTemplate mantém o painel inset com `rounded-xl`.
   - **Stepper:** 3 implementações viram ModuleStep. Active = accent + número em primary (sai a linha `bg-primary` inteira), completed = check em primary, upcoming = número com borda, locked = cadeado.
   - **ModuleShell:** um só (o do carbon-removal sai), com aside de 256 e rodapé de ações separado por uma linha.
   - **EmptyPage vira EmptyState:** IconChip lg no lugar da Lottie, título h3 (não display), ação opcional.
   - **Formulários:** FormField padroniza label, controle, ajuda e erro com gap 8. FormCombobox usa Select Trigger (sai o Button `input` `xl`). "Nenhum item encontrado." vai para o i18n. FormDialog: "Voltar" em link vira "Cancelar" outline.
   - **DataTable:** o header `bg-primary` com texto branco e o body `bg-secondary` viram o padrão neutro do shadcn. SortHeader corrige o bug `justify-left/right`. "Colunas" e "Redefinir" vão para o i18n. Toolbar e FacetedFilter ficam genéricos no DataTable.
   - **Removidos (sem uso):** GaugeChart, Footer, OperationalStatus, FormCheckbox, FormNumberInput, ColumnBoolean, ColumnLink e os inputs de `filters/`. Se voltarem a ser necessários, são desenhados a partir das primitivas.
   - **Primitiva Table Row:** a primeira coluna passou a `fill`, para a linha esticar com a tabela.
4. ✅ **Telas:** 1440×900, montadas com instâncias, em lotes. Desde 2026-09-25, cada módulo é um arquivo `GAIA · <Módulo>` com uma página por fluxo (padrão em [screens.md](../agents/design/screens.md#fluxo-de-um-lote)). Os lotes 04 a 11 abaixo foram feitos no arquivo único e migrados.
   - **Regra das telas:** o conteúdo é o do código hoje (textos do i18n, campos, ações e estados). O design só melhora o layout e troca os elementos pelos componentes do sistema. Nada de texto, campo ou estado inventado.
   - ✅ Auth (3 rotas, 5 frames): Login, Login — erro, Login — senha redefinida, Recuperar senha e Redefinir senha.
     - **Layout:** fundo escuro (`background-photo` usa o `background.png` em modo cobrir) com overlay `sidebar` a 80%. Marca à esquerda (`logo/full`, headline em display, apoio em body-lg). À direita, um card de 440 (rounded-xl, p 40, shadow.lg) com `logo/mark`, h1 e subtítulo centralizados. Idioma no canto superior direito, em TabsList (PT/EN).
     - **O que muda no código:**
       - Os inputs só com linha embaixo (`border-b`, `h-12`) viram FormField padrão.
       - O Button `xl` vira `lg` de largura total, e o título display azul vira h1 em foreground.
       - O card colado embaixo (`rounded-t-2xl`) vira card centralizado.
       - O erro de login ("Erro ao fazer login, tente novamente") deixa de ser texto solto abaixo do botão e vira Alert destructive acima dele. O texto não muda.
       - `passwordResetSuccess` e `codeSent` aparecem como Alert (success no login, info em Redefinir senha), com o texto do i18n.
       - O código usa Input OTP (6 caixas), no lugar do input de texto.
     - **Adicionados ao sistema neste lote:** `logo/full` e `logo/mark` (SVG reais) em Foundations; Input OTP 4, Alert 3 (info/success/destructive) e Input Group `icon-end` em Primitives; FormField `password` em GAIA Components.
   - ✅ Core (`05 Tela - Core`, 5 telas em 10 frames):
     - **Meus Projetos:** lista, vazio e dialog Novo projeto.
     - **Gestão de Usuários:** tabela e os dialogs Novo usuário, Gerenciar permissões e Detalhes do usuário.
     - **Perfil, Trocar senha e Idioma.**
     - **Conteúdo:** textos, campos, colunas e estados do código (levantados das features e do `pt.json`). Os dados dinâmicos usam amostras realistas.
     - **Layout e componentes:**
       - Sidebar com o item ativo da seção e o logo real no lugar do texto "GAIA". O usuário fica no rodapé (NavUser), no lugar de avatar, nome e email no header.
       - Painel inset, com o AppHeader mostrando título e voltar.
       - A lista de projetos usa CardList project em 2 colunas.
       - A tabela de usuários é montada com SortHeader, Button Icon ghost e DataTablePagination.
       - Os dialogs seguem o padrão FormDialog. O "Voltar" em link vira outline, com o mesmo texto.
     - **Divergências mantidas pelo design (aprovadas em 2026-09-25):**
       - O CardList não tem o rótulo "Nome do Projeto" nem a barra lateral.
       - O BadgeStatus mostra "Pendente", não "Pendências".
       - O header da tabela é neutro.
       - O vazio de projetos usa EmptyState (ícone + "Nenhum projeto encontrado").
     - **Adicionados ao sistema neste lote:** Sidebar com a propriedade `active` (projects/users/settings) e `logo/full` no header, Toggle (off/on), Avatar `xl` (112) e IconChip `destructive`.
     - **Correções no sistema:** o ponto do `key-round` (fill `currentColor`) ficou ligado ao token do stroke. Os logos voltaram às cores originais (asset de marca, fora da regra de tokens).
   - ✅ Projeto & Fazenda (`06 Tela - Projeto & Fazenda & Talhão`, 21 frames): lista de fazendas, wizard Nova fazenda (3 passos, com Stepper), visão da fazenda e dialog Novo talhão, todos com estados. Detalhe em `docs/agents/design/screens.md`.
     - **Adicionados ao sistema:** Stepper, PlotCard, DetailsCard, FileItem, PlotItem, CardList farm `loading`, MapPlaceholder `plots`/`draw` e os ícones `locate-fixed` e `pentagon`.
     - **Correções no sistema:** o texto do Alert passa a esticar (`fill`), e o FacetedFilter do DataTableToolbar e o Dropzone `error` voltaram a ter os tokens ligados.
   - **Lotes do talhão** (aprovados em 2026-09-24, cerca de 78 frames). Todos usam a casca do talhão: AppHeader com voltar, título "{Fazenda} - {Talhão}", BadgeScore de preenchimento e as abas Dados gerais · Carbono emissão · Carbono remoção · Regenerativo.
     - ✅ `07 Tela - Talhão` (11 frames, detalhe em `docs/agents/design/screens.md`), com 3 fluxos:
       - Dados gerais: principal · carregando · erro · sem geometria
       - Editar talhão: dialog · erro de validação · salvando · erro ao salvar
       - Excluir talhão: dialog · excluindo · erro
       - **Adicionados ao sistema:**
         - SectionHeader `edit-delete`
         - MapPlaceholder `plot` e `no-geometry`
         - Alert Dialog da 02 com o texto do padrão de exclusão
         - helper `storage.plotScreen` no `helpers.js`, que monta a casca do talhão
     - ✅ `08 Tela - Carbono emissão` (31 frames: os 29 aprovados + 2 frames de scroll): aba Avaliações, Excluir avaliação, módulo ACV (5 passos), Resultado ACV, Adicionar produto e Remover produto. Detalhe em `screens.md`.
       - **Adicionados ao sistema:**
         - AssessmentCard
         - AnnualSoilCard
         - AbatementCard
         - MiniBarChart
         - Alert `warning` com Action
     - ✅ `09 Tela - Carbono emissão comparação` (20 frames, detalhe em `screens.md`; adicionados ao sistema os 9 componentes da seção Comparação da 03) (aprovado em 2026-09-24; fonte: artifact "Gaia Metrics — Compare Calculations" + `src/features/comparison`, textos de `comparison.*`). O botão "Comparar" de Avaliações e do Resultado ACV abre a página.
       - **Página** (8 frames): vazio (0, o modal abre sozinho) · 1 avaliação (vinda do Resultado ACV) · 2 · 3 · 4 (limite) · carregando · sem resultado calculado · scroll.
       - **Modal "Adicionar avaliação à comparação"** (12 frames): nada escolhido · projeto · projeto + fazenda · projeto + fazenda + talhão · 1 selecionada · vagas esgotadas · busca · busca sem resultado · coluna vazia · carregando · erro · aberto automaticamente vindo de Avaliações.
       - Séries das avaliações em `chart.1` a `chart.4`.
     - ✅ `10 Tela - Carbono remoção` (30 frames em 8 fluxos, detalhe em `screens.md`): aba Resultados, Renomear cálculo, Excluir cálculo, Preencher módulo (Parâmetros → BAU → Cenário), os dialogs da grade mensal (Aplicar em lote e Replicar valor), Editar preenchimento e Resultado do cálculo. Fechado em 2026-09-25: entrou o frame padrão do Cenário do projeto, o overflow de Parâmetros (erro de validação) foi corrigido e 326 strokes de ícone foram religados (auditoria 0).
     - ✅ `11 Tela - Carbono remoção comparação` (14 frames em 2 fluxos, detalhe em `screens.md`). Desenho novo, aprovado em 2026-09-25: o código não tem esse módulo. Compara só o Cenário do projeto. Entrou na 03 o CompareLineChart.
     - ✅ `12 Tela - Regenerativo` (13 frames em 2 fluxos, no arquivo `GAIA · Regenerativo`, detalhe em `screens.md`): a aba (Score + Tópicos: principal, carregando, erro, vazio e scroll) e o formulário no ModuleShell, com o aside de seções (sem manejo, preenchido, scroll, erro de validação, salvando, erro ao salvar, carregando e erro ao carregar).
       - **Decisões de 2026-09-25:** as seções usam o nome da API em todas as telas; a bandeira do tópico é ponto + rótulo (TopicFlag); o formulário usa o ModuleShell, com as seções no aside.
       - **Adicionados ao sistema:** TopicFlag e ScoreScale (página 18).
     - ✅ `13 Tela - Regenerativo comparação` (15 frames em 2 fluxos, nas páginas `Comparação · …`, detalhe em `screens.md`). A página tem 1 · 2 · 4 · só com diferença · vazio · carregando · sem resultado · scroll; o modal tem os 7 estados do lote 11. Os frames partiram do lote 11, copiados entre arquivos.
       - **Adicionados ao sistema:** ScoreOverview, TopicDistribution, SectionScores e TopicTable (página 25).
     - **Fora das telas:** Biodiversidade, Análise de contexto, Saúde do solo e Água. Ainda não existem no produto (no código são só placeholders); entram quando tiverem especificação.
   - **Decisões dos lotes do talhão:**
     - **Páginas longas** (resultados e módulos) ganham 2 frames:
       - `<Tela>`: 1440 × a altura do conteúdo, com a página inteira;
       - `<Tela> — scroll`: 1440×900. Mostra o que fica fixo (Sidebar, AppHeader, abas, stepper e rodapé de ações do módulo), a área que rola já deslocada e uma anotação da área de scroll.
     - **Excluir é um padrão só:** AlertDialog com título "Excluir …", a pergunta com o nome, o texto muted "Esta ação não pode ser desfeita.", e os botões "Cancelar" (outline) e "Confirmar" (destructive). O dialog de excluir cálculo do RothC ("Fechar"/"Excluir", sem estilo destructive) segue esse padrão.
     - **Bugs de texto:** o design já mostra o texto certo, e o código é corrigido depois. Exemplos:
       - o vazio de ACV passa a dizer "este talhão", e não "esta fazenda";
       - "Notas", "Nenhum item encontrado." e "Nenhum arquivo selecionado" viram chaves i18n.
     - **Design com padrão único:** as inconsistências do código são ignoradas, e vale o sistema aprovado:
       - ModuleShell/ModuleStep único, inclusive no RothC;
       - "Voltar" em link vira Button outline;
       - DeltaBadge vira BadgeTrend, e BadgePercentage vira BadgeScore;
       - as barras usam ProgressRow com `chart.*`;
       - ações de ícone ganham Tooltip.
5. 🔄 **Drift + handoff** (etapa 1, design system no código: ✅ implementada em 2026-09-26, plano [design-system-migration.md](./design-system-migration.md); falta a etapa 2, telas): página `99 Drift` com cada inconsistência (`arquivo:linha` → token/componente). ✅ Feita em 2026-09-25 na biblioteca Design System: 79 itens de base em 6 seções (Tokens 11, Tipografia 9, Cores cruas 11, Primitivos 21, Componentes GAIA 22, Remover 5), 4 deles bugs. Espelho em [drift.md](../agents/design/drift.md). Ela vira o input do plano de migração do código, que roda em duas etapas, nesta ordem:
   1. **Design system no código:** refatorar a base do gaia-web antes de tocar nas telas.
      - `globals.css`
      - `typography.tsx`
      - remoção de emerald/amber/hex
      - as correções de primitivos listadas na fase 2
      - consolidação dos duplicados nos componentes GAIA unificados da fase 3
      - atualização de `docs/agents/web/design-system.md` e `.opencode/agents/design-agent.md`
   2. **Telas:** com a base pronta, comparar tela por tela com o Penpot, por módulo (`GAIA · <Módulo>`, uma página por fluxo = uma task). Sobra só o que é da tela: layout, composição, estados e scroll. O `screens.md` já registra por lote o que mudou em relação ao código.

## Mecânica

Movida para [docs/agents/design/penpot.md](../agents/design/penpot.md). A operação passo a passo está na skill `penpot-design`, e o agente que executa é o `penpot-designer`.

## Definição de pronto

- Todo fill, stroke e texto no arquivo está ligado a token semantic ou tipografia de biblioteca. Uma auditoria via `execute_code` retorna 0 soltos.
- Toda tela usa só instâncias de componente.
- Os primitivos e os componentes GAIA unificados existem como componentes de biblioteca, com variantes.
- A página de Drift lista as inconsistências de base (tokens, tipografia, primitivos, duplicados) com o destino de cada uma. O drift de cada tela fica para a etapa de telas.

## Fora de escopo e pendências

- **Fora de escopo agora:** dark mode, protótipo interativo e qualquer mudança em gaia-web (fica para o plano de migração).
- **Retomada (estado em 2026-09-25, fim do lote 13):**
  - **Modo de trabalho:** só Penpot. O código é referência de conteúdo, sem mexer em código nem em i18n agora. Componentes de UX que faltam no código entram no design (o código é ajustado depois, no caminho contrário).
  - **Próximo passo:** a fase 5, etapa 2 (telas): comparar tela por tela com o Penpot, por módulo. A etapa 1 está implementada na `feat/design-system` do gaia-web.
- **Pendências:**
  - Apagar o retângulo `background` de origem da foto, se ainda existir.
  - Revogar os tokens (MCP `userToken` e PAT), que foram expostos no chat, e registrar tokens novos.
  - Decidir se `green/yellow/red.200` voltam como degrau intermediário. Por ora ficaram de fora, sem uso semantic.
