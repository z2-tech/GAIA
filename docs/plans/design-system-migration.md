# Migração do design system para o gaia-web — Parte 1 (Drift)

**Status:** Em execução. Etapas 1 a 3 no `develop` (`678cbe3`). Etapas 4 (`580061d`…`a603f03`) e 5 (`4617bd0`) commitadas na `feat/design-system`, aguardando conferência visual e merge. Falta a etapa 6 e o fechamento.
**Atualizado:** 2026-09-25
**Branch:** `feat/design-system` no gaia-web, criada a partir do `develop` em `f94b9b0`

## Contexto

- O design system está pronto no Penpot (plano [penpot-design-system.md](./penpot-design-system.md), fases 1 a 4). O design é a fonte da verdade, e o código se adapta a ele.
- A página `99 Drift` da biblioteca Design System lista 79 divergências de base entre o gaia-web e o design, cada uma com `arquivo:linha` e destino. O espelho em markdown é [drift.md](../agents/design/drift.md), e os IDs deste plano (T1, Y3, P9…) são os de lá.
- Esta parte cobre só o Drift: a etapa 1 da fase 5 ("design system no código"). O drift de cada tela, comparando tela por tela com o Penpot, é a Parte 2, com plano próprio.
- Estado do código quando este plano foi escrito: o `develop` acabou de receber a comparação nova (`4e97d71`). Nele, typecheck, `next build`, Vitest (62 testes) e import boundaries estão verdes. O Biome dá 0 erros e 86 avisos, todos anteriores.

## Decisões

| Decisão | Por quê |
|---|---|
| Seis etapas, na ordem Tokens → Tipografia → Primitivos → Componentes GAIA → Cores cruas → Remover | Cada camada usa a anterior. Os componentes GAIA são montados com primitivos já corrigidos, e a varredura de cores cruas só faz sentido depois que os componentes que as carregam foram trocados. |
| Um checkpoint com o usuário ao fim de cada etapa, com merge no `develop` depois do ok | Uma etapa pequena é fácil de revisar e de reverter. A branch não fica semanas longe do `develop`. |
| Os degraus core que saem ficam num bloco `legacy` do `globals.css` até a etapa 5 | Hoje cerca de 120 classes usam degraus crus (ex.: `gray-50`, `blue-0`, `green-200`). Se o degrau some na etapa 1, a classe cai no padrão do Tailwind e muda de cor sem aviso. O bloco `legacy` mantém cada etapa visualmente estável até a varredura da etapa 5. |
| Os valores de cor vêm em hex, iguais aos do Penpot ([tokens.md](../agents/design/tokens.md)) | Uma única fonte e comparação 1:1 com o design. Hoje as cores estão em oklch, recalculadas à mão. |
| Escala tipográfica como tokens do Tailwind (`--text-h1`, `--text-h1--line-height`…) no `@theme` | Tanto a `Typography` quanto os poucos casos que precisam da classe crua usam o mesmo valor, e o display de 32 px não existe na escala padrão do Tailwind. |
| O bloco `.dark` fica como está | Dark mode está fora de escopo, e nada no código aplica a classe `dark`. Mexer nele agora é trabalho sem uso. |
| Os tamanhos de fonte crus (Y9) entram na etapa 5, não na 2 | Boa parte dos 179 usos está dentro de componentes que serão trocados na etapa 4. Varrer antes seria retrabalho. |
| A etapa 5 termina com uma checagem automática (`lint:tokens`) | Sem ela, cor e tamanho crus voltam no próximo PR. É o mesmo modelo do `lint:boundaries`, que já existe. |
| Componentes GAIA ficam em `src/components/<grupo>/`, com o mesmo nome do Penpot | É a pasta que já existe (`badge/`, `cards/`, `layout/`, `module/`, `form/`, `table/`). O nome igual ao Penpot faz a busca funcionar nos dois lados. |

## Etapas

Cada etapa segue a mesma verificação (seção Verificação) e termina em commit na `feat/design-system`, push, checkpoint e merge no `develop`.

### Etapa 1 — Tokens (T1–T11) · commitada

**Arquivo:** `src/app/globals.css`.

1. **Core:** a escala do Penpot com 23 degraus, em hex: gray 0/100/200/300/400/600/800/900, blue 50/200/400/600, green 50/600/800, yellow 50/600/800, red 50/700/800, purple 600 e aqua 600 (T10). Os degraus que saem (blue-0/500/800, gray-50/500/700, green-200/500, aqua-200, purple-50/200/500, yellow-200/500, red-200/500/600 e pink) vão para o bloco `legacy`, com os valores de hoje.
2. **Semantic em `:root`:** mapeado para o core como em `tokens.md` (T1–T6, T8). Destaques:
   - `secondary-foreground` e `accent-foreground` deixam de ser azuis;
   - `border` = gray.200 e `input` = gray.300;
   - `ring` = blue.200;
   - `chart-1` a `chart-5` = blue.400, green.600, yellow.600, purple.600 e aqua.600.
3. **Tokens novos (T6, T7, T9):** cada um com o `--color-*` correspondente no `@theme inline`:
   - `destructive-foreground`, `destructive-subtle` e `destructive-subtle-foreground`;
   - success, warning e info, cada um com as mesmas 4 variações;
   - `sidebar-hover` e `sidebar-muted-foreground`.
4. **Sidebar (T9):** `sidebar-border` = gray.800. Não removo `sidebar-primary` nem `sidebar-ring`, porque o `sidebar.tsx` do shadcn usa os dois (5 usos): viram aliases de `sidebar-accent` e `ring`.
5. **Radius (T11):** `--radius-xs: 4px` no `@theme`.

**O que muda na tela:** o neutro passa a ser o cinza azulado da marca, os textos secundários deixam de ser azuis, e os gráficos que usam `chart-*` trocam laranja e teal pela paleta GAIA.

### Etapa 2 — Tipografia (Y1–Y8) · commitada

**Arquivos:** `src/app/globals.css` (tokens `--text-*`) e `src/components/ui/typography.tsx`.

1. Tokens de tamanho e altura de linha para display, h1, h2, h3, body-lg, body, label e caption, com os valores de `tokens.md`.
2. Variantes da `Typography` com a escala do design (Y1–Y6):
   - h1 24/32;
   - h2 20/28;
   - h3 16/24 (hoje o h3 é maior que o h2);
   - display 32/40;
   - body, body-lg, label e caption com a altura de linha certa.
3. Variantes novas `body-strong`, `caption-strong` e `mono` (Y7), com a tag certa em `TAG_BY_VARIANT`.
4. Sai o tone `strong` (Y8, 1 uso), porque o default já é `foreground`.
5. **Feito também:** o `cn` registra a escala no `tailwind-merge` (sem isso, `text-h1` seria descartado como cor ao lado de `text-muted-foreground`). As 20 chamadas que recriavam `body-strong` ou `caption-strong` com `font-semibold`/`font-medium` passaram a usar as variantes.

**O que muda na tela:** os títulos crescem um degrau: 11 usos de h1, 19 de h2, 5 de h3 e 6 de display. O texto de corpo fica mais compacto (altura de linha 20, em vez de cerca de 23).

### Etapa 3 — Primitivos (P1–P21) · commitada

**Arquivos:** `src/components/ui/*` e as chamadas afetadas.

1. **Button (P1–P9):**
   - sai `primaryOutline` e os 25 usos viram `outline`;
   - sai o size `xl`: os 3 usos no Auth viram `lg`, e o FormCombobox muda na etapa 4;
   - sai a variante `input`;
   - `rounded-md` em todos os tamanhos e sem `min-w-40`;
   - outline com `border` + `shadow-xs`;
   - o default de size volta a `default`, o que deixa 86 botões sem `size` com 36 de altura em vez de 40;
   - loading mostra spinner + texto;
   - **bug P9:** `disabled` passa a ser calculado depois do spread, com teste novo em Vitest.
2. **Input, Select e Textarea (P10–P12):** 36 de altura, `rounded-md`, `bg-background`, disabled só com opacidade e `shadow-xs` nos três.
3. **Badge (P13):** `rounded-md` e variantes `success`, `warning` e `info` (subtle).
4. **Card (P14):** `rounded-xl`, py 24 e gap 24. O `CardTitleIcon` (P15) sai na etapa 4, junto com o SectionHeader que o substitui.
5. **Dialog (P16):** sem bordas no header e no footer, e título no estilo h2.
6. **SearchInput → Input Group (P17):** o `input-group.tsx` já existe. Os 4 usos migram e o `search-input.tsx` é apagado.
7. **Sidebar (P18–P20):** o hover usa `sidebar-hover`. **Bug P19:** `hsl(var(--sidebar-*))` vira `var(--sidebar-*)`. O `bg-gray-900!` vira o token `sidebar`.
8. **Table (P21):** header e body neutros (`background` e `border`), sem `bg-primary` nem `bg-secondary`.

**Como ficou (decisões da implementação):**
- **FormCombobox:** usa Button `outline` com largura total até virar FormField, na etapa 4.
- **Card (P14):** ficou só `rounded-xl` + `shadow-sm`. O `py-6 flex-col` do shadcn quebraria o `p-6` sem `flex-col` de hoje em dezenas de telas, então o espaçamento vai para a Parte 2.
- **SearchInput (P17):** não foi apagado, porque ele carrega o debounce. Virou o Input Group padrão, com largura `w-90` (360, igual ao Penpot).
- **Table (P21):** o `text-white` do SortHeader e os `text-primary-foreground`/`bg-primary` dos cabeçalhos do Composto e da grade mensal saíram junto, senão ficariam branco no branco.
- **Button:** novo `button.test.tsx` cobre o loading e o bug P9.

### Etapa 4 — Componentes GAIA (G1–G22) · commitada

A maior etapa, dividida em 5 commits, um por grupo, na ordem abaixo. Cada componente segue a variante do Penpot, documentada em [components.md](../agents/design/components.md). As features passam a usar o componente novo, e o antigo é apagado no mesmo commit.

| Commit | Itens | Componentes (pasta) |
|---|---|---|
| 4a Indicadores | G1–G5, G17 | BadgeTrend, TopicFlag, BadgeScore, BadgeStatus, IconChip, RadialProgress, ProgressRow (`badge/`, `charts/`) · **bug G5:** chave própria para o badge "Pendente" |
| 4b Cards | G6–G10 | KpiCard (emphasis default/primary; absorve KpiCard, AllocationKpiCard, StageCard, MetricCard e ComparisonMetricCard), SectionHeader (absorve TitleCard e sai o `onEdit` vazio), CardList project/farm (`cards/`) · sai o `CardTitleIcon` (P15) |
| 4c Layout | G11–G16 | AppHeader, Sidebar com Configurações no grupo Gestão e NavUser no rodapé, PageTemplate `muted` + inset, ModuleStep + ModuleStepper (absorve os 3 steppers), ModuleShell único, EmptyState (sai a Lottie) (`layout/`, `module/`) |
| 4d Formulários | G18–G20 | FormField (FormInput, FormSelect, FormTextarea e FormDatePicker passam a usá-lo), FormCombobox com Select Trigger e texto no i18n, FormDialog com "Cancelar" outline (`form/`, `dialog/`) |
| 4e DataTable | G21, G22 | DataTable + DataTableToolbar genérica, textos "Colunas" e "Redefinir" no i18n, **bug G22:** SortHeader com `justify-start` e `justify-end` (`table/`) |

**Atenção:** o 4a e o 4b mexem na comparação que acabou de entrar no `develop` (`delta.tsx`, `regenerative-bits`, os cards do resultado ACV e da remoção). As chaves novas de i18n entram em `pt.json` e `en.json`, e o `i18n-key-validator` confere.

**Como ficou (decisões da implementação):**
- **Specs:** as medidas saíram do Penpot (dump dos componentes das páginas 18 a 22) e os agentes seguiram esse dump.
- **Status do projeto (G4):** a API manda o status já traduzido ("Em andamento", "In Progress") e não o `StatusEnum`, e "Em auditoria" e "Pendente" não existem no backend. O `badge-status.tsx` tem uma única função de mapeamento. **Pendência para o gaia-api:** mandar o `StatusEnum` na listagem de projetos.
- **FormField (4d):** o `FormBase` de `form.tsx`, que já era montado com o Field do shadcn, virou o FormField, sem arquivo novo. O FormDialog fecha com "Cancelar" outline, e o wizard da Nova fazenda mantém "Voltar" outline, para voltar de passo.
- **DataTable (4e):** o erro da lista de usuários aparece dentro da tabela, com "Tentar novamente".
- **Cards (4b):** valores negativos deixam de ser verdes, os cards de alocação ganharam barras ProgressRow, e BAU e Cenário não são mais coloridos nos cards.
- **Layout (4c):**
  - Configurações foi para o grupo Gestão. O NavUser no rodapé ficou só com "Sair".
  - O `useLogout` foi para `src/hooks`.
  - A Lottie e a dependência `@lottiefiles/dotlottie-react` saíram.
  - Um passo que ainda não pode ser escolhido aparece como `locked`.
- **Ficou para a etapa 5 (cores cruas):**
  - `BAU_COLOR`/`PROJECT_COLOR` na legenda e no gráfico da remoção (C5);
  - hex das barras em `allocation-section`;
  - o ícone amber do aviso em `agro-result-view`;
  - o `ScaleTrack` de `regenerative-bits` (red, amber e green-200);
  - o `uppercase` do cabeçalho de tópicos.
- **Ficou para a Parte 2 (telas):** o DetailsCard em `farm-details` e o espaçamento dos cards.

### Etapa 5 — Cores e tamanhos crus (C1–C11, Y9) · commitada

1. **Charts e mapas (C4–C8):** passam a ler o token do CSS com um helper `cssVar("--color-chart-1")`, em vez de ter hex copiado:
   - `lib.ts`, `scenario-colors.ts` e `slot-colors.ts`: Fóssil chart.1, Biogênico chart.5 e Remoção chart.2; BAU = `muted-foreground` e Cenário = chart.1; os slots da comparação usam chart.1/4/3/2;
   - Leaflet (`kml-layer`, `plots-layer`, `farm-plots-layer`, `map-view.client`).
2. **emerald, amber e paleta crua que sobraram (C1–C3, C9–C11):** trocados por tokens semantic (`*-subtle`, `*-subtle-foreground`, `background`, `muted`, `border`).
3. **Tamanhos crus (Y9):** `text-xs`, `text-sm` etc. viram `Typography` ou a classe da escala.
4. **Saída do bloco `legacy`:** o `globals.css` fica só com a escala do Penpot. A paleta padrão do Tailwind é desligada (`--color-*: initial`, com `white`, `black` e `transparent` redefinidos), então uma cor crua deixa de gerar CSS.
5. **Checagem nova, `scripts/check-design-tokens.mjs` (`bun lint:tokens`):** falha com classe de paleta crua, `text-[…]`/`bg-[#…]`, hex, `hsl(`, `oklch(` ou `rgb(` em `.ts`/`.tsx` fora de `src/client` e do `globals.css`.

**Como ficou (decisões da implementação):**
- **Checagem primeiro:** o `lint:tokens` foi escrito antes da varredura. Ele achou 290 ocorrências, que foram divididas em 3 agentes por pasta, e a checagem terminou com 0.
- **Gráficos e Leaflet:** leem `var(--color-…)` direto, porque o SVG aceita. Só o canvas do upload de KML usa `getComputedStyle`. A comparação passou a ter uma única sequência de séries (chart-1, 4, 3, 2) para todos os módulos.
- **`globals.css`:**
  - saíram o `legacy` e os `--color-<core>` do `@theme`;
  - a paleta e os tamanhos padrão do Tailwind foram desligados (`--color-*: initial`, `--text-*: initial`, com `white` e `black` redefinidos);
  - os degraus core ficam só como variáveis do `:root` que o semantic referencia.
- **O que muda na tela:**
  - textos de 10 e 11 px viraram 12 px, porque a escala não tem menor;
  - números `font-bold` em display ou h2 passaram a 600;
  - o realce dos meses sem cobertura na grade mensal ficou mais claro (`warning-subtle` é yellow.50, no lugar de yellow-200);
  - na linha Total da matriz de fases da comparação, o detalhe perdeu o negrito;
  - o separador da sidebar passou a gray.400.
- **Pendências para a Parte 2 (telas):**
  - eixos, grade e tooltip do Recharts ainda usam o padrão da lib, e ficam para seguir o ChartCard do Penpot (grade tracejada em `border`, eixos em caption muted, tooltip em `popover`);
  - rótulos `uppercase` em `picker-dialog`, `kpi-compare-cards` e `score-overview`;
  - o `font-bold` do título do login.

### Etapa 6 — Remover (R1–R5)

Apagar GaugeChart, Footer, OperationalStatus, FormCheckbox, FormNumberInput, ColumnBoolean, ColumnLink, ColumnPercentage, `table/filters/`, DataTableFacetedFilter e Collapsible. Antes, confirmo que continuam com 0 imports: `lint:boundaries` e `tsc` pegam qualquer sobra. É independente das outras etapas e pode ser adiantada, se você preferir.

### Fechamento

- Atualizar os docs do front com os tokens, as variantes e os componentes novos: `docs/agents/web/design-system.md` (hoje descreve `bg-gray-100`, `rounded-2xl` e o header branco) e `.opencode/agents/design-agent.md` (as regras 4 e 9 ainda dizem Button com size `lg` padrão e `rounded-full`).
- Marcar os itens feitos em `drift.md` e na página `99 Drift` do Penpot.
- Status deste plano = Concluído, e fase 5 / etapa 1 fechada em `penpot-design-system.md`.
- Reindexar o CodeGraph (`.opencode/bin/codegraph-global-sync.sh`).

## Verificação (toda etapa)

1. `bun run typecheck` · `bunx biome check src messages` (0 erros e nenhum aviso novo) · `bun run lint:boundaries` · `bunx vitest run` · `bun run build`. Rodo `biome` em `src`, porque o `bun lint` quebra com o `biome.json` do worktree antigo em `.claude/worktrees/`.
2. **Visual:** `bun dev` e as telas afetadas pela etapa, abertas no Chrome e comparadas com o Penpot. Isso depende da API local e de um login de teste. Se eles não estiverem disponíveis, você faz a conferência no checkpoint.
3. As chaves novas de i18n passam pelo `i18n-key-validator`.

## Definição de pronto

- Os 79 itens de `drift.md` estão resolvidos ou têm decisão registrada aqui.
- O `lint:tokens` passa sem exceção, e nenhuma cor ou tamanho cru sobra em `src/` (fora de `src/client`).
- Todos os componentes da página Componentes GAIA usados no código existem com o nome do Penpot, e os duplicados foram apagados.
- Os bugs P9, P19, G5 e G22 estão corrigidos. P9 e G22 ganham teste.
- Build, typecheck, Vitest e boundaries estão verdes e o `develop` está atualizado a cada etapa.

## Fora de escopo e pendências

- **Parte 2 (telas):** layout, composição, estados e scroll de cada tela, por módulo, com plano próprio depois desta parte.
- **Carbono remoção sem comparação:** a antiga foi removida, e a nova (lote 11 do Penpot) vira feature própria.
- **Dark mode** e o bloco `.dark`.
- **Resolvido em 2026-09-25:** o worktree `comparison-slots`, o `.patch` e a branch local foram apagados. O `.gitignore` do gaia-web ignora `.claude/worktrees/` e `.claude/*.patch` (não a pasta inteira, porque os hooks e settings do `.claude/` são versionados).
