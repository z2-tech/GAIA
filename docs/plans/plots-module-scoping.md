# Talhões (plots) como unidade central dos módulos

**Status:** ✅ Concluído (fases A–G; F removida por decisão de produto; build do LCA pendente — seção 9)
**Criado:** 2026-08-18
**Atualizado:** 2026-08-18
**Repositório:** `gaia-web` (frontend apenas — `gaia-api` **não** é tocado nesta entrega)
**Cards de origem:** FE-34 (GAIAPROJEC-76), incremento "Talhões + Clima (BE-06/BE-40)" · backend BE-41..BE-44 (ver seção 9)

---

## 0. Progresso

| Fase | Status | Entrega |
|------|--------|---------|
| A — Persistir talhões no create da fazenda | ✅ Concluída | `plots` no body do create |
| B — Reestruturar tela da fazenda | ✅ Concluída | Dados gerais + listagem de talhões (menu removido) |
| C — Tela do talhão (espelho da fazenda) | ✅ Concluída | Menu de módulos + mapa preview + páginas de módulo |
| D — Criar/editar/excluir talhão depois | ✅ Concluída | `PlotDrawer` (create/edit) + `PlotDeleteDialog` (excluir) |
| E — Módulos do talhão (placeholder) | ✅ Concluída | Listagens herdadas da fazenda (reuso sem filtro) |
| F — Completude por talhão no dashboard | ➖ Removida | Rota `/dashboard` removida; a home da fazenda já lista talhões com completude |
| G — i18n + gates | ✅ Concluída | Chave órfã `farm.dashboard` removida; paridade pt/en; `bun lint` verde |

### Como retomar

Fases A–G concluídas. A fase F foi removida por decisão de produto (manter só a home da
fazenda, que já lista talhões com completude). Resta apenas destravar o build do LCA
(seção 9): migração do front de `carbon-emission` ao novo schema do SDK, uma task
separada desta entrega.

### Desvios vs. plano (fases A–G)

- **Menu**: D1 confirmado. Em vez de manter um item "Dados gerais", o `FarmMenu` foi
  totalmente removido do `FarmLayout` (só o conteúdo). `farm-menu.tsx` / `menu.ts`
  permanecem no código para reuso na fase C.
- **Layout**: mapa KML mantido + `FarmDetails` em cima; `PlotList` em largura total
  abaixo (mais foco na listagem).
- **Cards de talhão**: clicáveis → rota do talhão; botões editar/excluir removidos da
  listagem (ficam na página do talhão, fase D).
- **Fase C concluída**: `use-plot.ts`, `plot-details.tsx`, `PlotLayout`/`PlotMenu`/
  `PlotHeader` (espelho do `FarmLayout`/`FarmMenu`/`FarmHeader`), mapa preview do
  `geometry` (`plot-geometry-map`) e as páginas de módulo (`carbon-emission`,
  `carbon-removal`, `regenerative`) sob `plot/[plotId]`. O botão "Preencher módulo"
  aponta para a rota `/module` da fazenda (preenchimento por talhão é fase futura).
- **Service layer**: além dos hooks planejados, criados `useGetPlot` e
  `useInvalidatePlots`; `useGetPlotCompleteness` tipado via `select` (o SDK devolve
  `unknown`).
- **Mapa compartilhado**: `MapView`/`MapViewClient`, `PlotsProvider`, `TalhoesLayer`,
  `use-plots-map` e `plots-context` subiram de `features/project/...` para
  `components/map/` (reuso no `PlotDrawer`). `KmlLayer` ganhou `style`/`pointStyle`
  parametrizáveis; `FarmKmlMapClient` agora sobrepõe os talhões (`FarmPlotsLayer`, com
  hover/click → rota do talhão) e o KML desenha só a fronteira não-talhão.
- **Fase D concluída**: `PlotDrawer` (modos `create` e `edit`) desenha sobre o KML da
  fazenda (mesmo `fetch(kml_url)` do `farm-kml-map`), com edição de geometria via geoman
  (`editOnly`) e salvamento por `useCreatePlot`/`useUpdatePlot`; exclusão via
  `PlotDeleteDialog` (`AlertDialog`) com retorno à fazenda. Botões editar/excluir na
  página do talhão (`PlotDetails`), como planejado.
- **Fazenda sem KML**: o `PlotDrawer` centraliza em `latitude`/`longitude` da fazenda
  (`initialCenter`) quando não há `kml_url` — mapa vazio para desenho livre.
- **Fase F removida**: o dashboard da fazenda foi descartado (decisão de produto "sem nada
  por agora"); a rota órfã `/dashboard` foi excluída e a chave `farm.dashboard` removida de
  pt/en. A home da fazenda já lista os talhões com completude (`PlotList`).
- **Fase G**: sem chaves novas — A/B/D já cobriram o léxico. Restou remover a chave órfã
  `farm.dashboard` e validar a paridade pt/en.

---

## 1. Premissa central

Hoje a hierarquia é **Projeto → Fazendas → Módulos (Emissão, Remoção, Bio)**, com os
módulos preenchidos no nível da fazenda. O alvo é **Projeto → Fazendas → Talhões →
Módulos (dentro do talhão)**.

O backend que sustenta isso já está mergeado em `gaia-api/develop`
(`7a42905 feat(farms): add Plot model, CRUD APIs, and plot-scoped assessments across
modules`): model `Plot`, CRUD completo, `plot_id` opcional nos 4 módulos e completude por
talhão. O SDK do `gaia-web` já foi regenerado e expõe tudo isso.

**Esta entrega cobre só a estrutura.** O preenchimento/filtro por talhão dentro dos
módulos fica para a fase seguinte (seção 9), que depende de contrato backend novo
(BE-41..BE-44).

---

## 2. Estado do código quando este plano foi escrito

### Backend (`gaia-api/develop`) — já disponível

| Recurso | Onde |
|---|---|
| Model `Plot` (farm FK, `name`, `area_ha`, `geometry` GeoJSON, soft-delete) | `farms/models.py:68` |
| CRUD de plots | `farms/views.py` — `list_plots:287`, `create_plot:312`, `get_plot:343`, `update_plot:375`, `delete_plot:417` |
| Completude por talhão (média ponderada por área) | `farms/views.py:251` · `farms/services.py:225` |
| `PlotSelectors` / `PlotService` | `farms/selectors.py:54` · `farms/services.py:424` |
| `create_farm` aceita `plots` | `farms/services.py:290` (`plots_data = farm_data.pop("plots")`) |
| `plot_id` opcional no create dos 4 módulos | LCA `lca/serializers.py:528`, RothC `routhc/serializers.py:411`, Regenerativo `regenerative/serializers.py:41`, Biodiversidade |

### SDK (`gaia-web/src/client`) — já regenerado

- Endpoints: `listPlots`, `createPlot`, `getPlot`, `updatePlot`, `deletePlot`,
  `getPlotCompleteness`.
- Tipos: `FarmCreateRequest.plots` (`types.gen.ts:678`, docstring
  `[{name, area_ha, geometry?}]`), `PlotCreateRequest` (`types.gen.ts:1655`),
  `PlotDetail` (`1661`), `PlotList` (`1671`). **`area_ha` é `string` decimal**,
  `geometry` é `unknown` (GeoJSON).

### Frontend — o que já existe (do fluxo de criação de fazenda)

- Desenho de talhões: `features/project/state/plots-context.tsx` (`PlotsProvider`,
  `usePlots`), `hooks/use-plots-map.ts`, `components/new-farm/map/{map-view.client.tsx,
  plots-layer.tsx, plots-list.tsx, plot-name-dialog.tsx}`, `lib/geo/{types,validators,
  kml-generator}.ts`, `components/map/{kml-layer.tsx, fit-to-bounds.tsx}`.
- O `Plot` local (`lib/geo/types.ts:36`) é um GeoJSON `Feature<Polygon>` com
  `name` e `areaM2`; a área é **m²**, o backend quer **ha**.
- `FARM_MENU_ITEMS` (`features/farm/types/menu.ts:13`) hoje = Dados gerais, Emissão,
  Remoção, Regenerativo.

### Frontend — o que **falta** (este plano)

1. `valuesToCreateBody` (`features/project/schemas/new-farm.ts:119`) só envia
   `plot_count` (inteiro); **não** envia o array `plots` com geometria.
2. Não existe tela "Talhões" nem service layer de plots (`services/farms/` só tem
   `farms.mutation.ts` e `farms.query.ts` — sem `useListPlots` etc.).
3. Não existe rota/tela do talhão.
4. O form de LCA já aceita `plotId` internamente (`buildCulturaPayload`), mas a rota não
   lê `plotId` de `searchParams`.
5. As listagens (`LcaListing`, `CarbonRemovalListing`, `RegenerativeDashboard`) listam a
   fazenda inteira, sem noção de talhão.

---

## 3. Decisões tomadas (produto + técnica)

| # | Decisão | Justificativa |
|---|---|---|
| D1 | Fazenda = **dados gerais + listagem de talhões**, sem módulos no menu | Resposta do usuário: "ao entrar em uma fazenda vejo os dados gerais e ao lado a listagem de talhões, sem mais módulos dentro da fazenda" |
| D2 | Talhão = **tela espelho da fazenda** (dados gerais + Emissão/Remoção/Bio) | "ao clicar em um talhão vou para a tela dele, com dados gerais e os módulos, como hoje é a fazenda" |
| D3 | Módulos do talhão retornam, por enquanto, a **listagem completa da fazenda** (placeholder) | "estrutura primeiro, depois passamos para o preenchimento; hoje pode retornar dentro do talhão a listagem completa da resposta da fazenda" |
| D4 | **Sem caso "sem talhão"** | "vamos limpar os dados, então não vou ter esse caso" |
| D5 | "Novo talhão" **desenha sobre o KML mais atualizado da fazenda** | "preciso pegar o mapa mais atualizado da fazenda, com o KML mais atualizado, para saber exatamente onde desenhar" |
| D6 | Dashboard da fazenda mostra **completude por talhão** (cards) | Resposta: "sim, cards por talhão" |
| D7 | Escopo = **estrutura primeiro**; filtro real por talhão fica para a fase seguinte | depende de BE-41..BE-44 (seção 9) |
| D8 | Conversão de área m² → ha no front | O `Plot` local calcula `areaM2`; o backend quer `area_ha` (decimal string) |
| D9 | Reaproveitar `MapViewClient` + `KmlLayer` + `PlotsProvider` para o `PlotDrawer` | O desenho já existe no new-farm; não reinventar o mapa |

---

## 4. Inventário de API (o que tem / o que vai precisar)

### ✅ Disponível agora — sustenta as fases A–G

| Necessidade | Recurso |
|---|---|
| Criar talhões junto da fazenda | `FarmCreateRequest.plots` |
| Listar/criar/editar/excluir talhão | `listPlots` / `createPlot` / `updatePlot` / `deletePlot` |
| Completude por talhão | `getPlotCompleteness` |
| `plot_id` no create dos módulos | `plot_id` já nos create requests |

### ❌ Falta na API — fase seguinte (seção 9)

| GAP | Card |
|---|---|
| `plot_id` filtro + `plot_id` no item de listagem do **LCA** | BE-41 (GAIAPROJEC-78) |
| idem **RothC** | BE-42 (GAIAPROJEC-79) |
| idem **Regenerativo** | BE-43 (GAIAPROJEC-80) |
| idem **Biodiversidade** | BE-44 (GAIAPROJEC-81) |

> A UI de talhões (CRUD + navegação + create-da-fazenda) sai 100% com a API atual. Só a
> parte "módulos **dentro** do talhão" (filtro/label por talhão nas listagens) depende
> dessas cards.

---

## 5. Fases

### Fase A — Persistir talhões no create da fazenda ✅

- **Alterar** `features/project/schemas/new-farm.ts` — `valuesToCreateBody` (linha 119)
  passa a receber `plots: Plot[]` em `CreateFarmBodySideInputs` e monta o array
  `[{ name, area_ha, geometry }]`:
  - `area_ha` = `computePlotAreaM2(plot) / 10000`, formatado como string decimal.
  - `geometry` = `plot.feature.geometry`.
- **Alterar** `features/project/hooks/use-create-farm.ts` — `submitHandler` (linha 290)
  passa `plots: plots.state.plots` no `valuesToCreateBody`.
- **Novo** helper de conversão em `lib/geo/` (ou `features/project/lib/`) — `m2ToHa`.
- Manter `plot_count` (backend ainda aceita; pode ser derivado de `plots.length`).

### Fase B — Reestruturar a tela da fazenda ✅

- **Alterar** `features/farm/types/menu.ts` — `FARM_MENU_ITEMS` perde
  `carbonEmission`/`carbonRemoval`/`regenerative`; vira Dados gerais + Talhões
  (ou só a home da fazenda, com o menu reduzido).
- **Alterar** a página da fazenda (`app/(private)/projects/[projectId]/farm/[farmId]/
  page.tsx` e/ou `general-data.tsx`) — layout lado a lado: `FarmDetails` +
  `PlotList` (grid `lg:grid-cols-2` ou aside).
- **Novo** `features/farm/plots/plot-list.tsx` — cards de talhão (nome, `area_ha`,
  completude, ações editar/excluir) + botão "Novo talhão".
- **Novo** `services/farms/plots.query.ts` / `plots.mutation.ts` (ou estender
  `farms.*`): `useListPlots(farmId)`, `useCreatePlot(farmId)`,
  `useUpdatePlot(farmId)`, `useDeletePlot(farmId)`, `useGetPlotCompleteness`.

### Fase C — Tela do talhão (espelho da fazenda) ✅

- **Novo** rota `app/(private)/projects/[projectId]/farm/[farmId]/plot/[plotId]/` com:
  - `layout.tsx` → `PlotLayout` (PlotHeader + PlotMenu).
  - `page.tsx` → dados gerais do talhão (nome, área, mapa preview do `geometry`).
  - `carbon-emission/page.tsx`, `carbon-removal/page.tsx`, `regenerative/page.tsx`.
- **Novo** `features/farm/plots/plot-menu.tsx` / `plot-layout.tsx` — reaproveitar a
  lógica de `FarmMenu`/`FarmLayout` parametrizando `basePath` (o menu de módulos é
  genérico: generalData + carbonEmission + carbonRemoval + regenerative).
- **Novo** hook `features/farm/hooks/use-plot.ts` (espelho de `use-farm.ts`, lê
  `plotId` de `useParams`).

### Fase D — Criar/editar/excluir talhão depois

- **Novo** `features/farm/plots/plot-drawer.tsx` (dialog "Novo talhão"):
  1. busca a fazenda (`useGetFarmById`) → pega `kml_url`;
  2. baixa/parseia o KML e injeta no `PlotsProvider` (como `parsedKml`);
  3. renderiza `MapViewClient` (reusa `KmlLayer` + `TalhoesLayer`) em modo editable;
  4. salva o polígono via `useCreatePlot` (name + `area_ha` + `geometry`).
- **Novo** edição (nome/área) via `useUpdatePlot`; exclusão via `useDeletePlot`
  (AlertDialog de confirmação).

### Fase E — Módulos do talhão (placeholder) ✅

- As páginas de módulo do talhão reusam `LcaListing` / `CarbonRemovalListing` /
  `RegenerativeDashboard` (listagem completa da fazenda), sem filtro por enquanto.
- Nenhuma mudança nas listagens em si nesta fase.

### Fase F — Completude por talhão no dashboard

- **Alterar** `app/(private)/projects/[projectId]/farm/[farmId]/dashboard/page.tsx` —
  cards por talhão consumindo `useGetPlotCompleteness`.

### Fase G — i18n + gates

- Chaves novas em `messages/pt.json` **e** `messages/en.json` (talhão, novo talhão,
  área, completude, excluir, etc.).
- `i18n-key-validator` no diff; `bun lint` · `bun run build`.

---

## 6. Roteamento de agentes

| Camada | Agente |
|---|---|
| Orquestrador | `senior-nextjs` |
| Service layer (hooks de plots, queries) | `api-layer-agent` |
| Formulários (create/edit de talhão, seleção de talhão) | `form-agent` |
| UI (tela Talhões, cards, menu, PlotDrawer) | `design-agent` |
| Chaves pt/en | `i18n-key-validator` |
| Contrato (filtro `plot_id` nas listagens — fase seguinte) | `cross-stack` + `senior-backend` |

Sem `sustainability-specialist` (mudança de UX/estrutura, sem fórmula de domínio).

---

## 7. Definição de pronto

- [x] `bun lint` verde
- [ ] `bun run build` verde (bloqueado por erros pré-existentes do LCA — seção 9)
- [x] `i18n-key-validator` sem chave órfã (paridade pt/en ok, `farm.dashboard` removida)
- [x] Create da fazenda persiste os talhões desenhados (`plots` no payload)
- [x] Tela da fazenda mostra dados gerais + listagem de talhões, sem módulos no menu
- [x] Tela do talhão (espelho da fazenda) com dados gerais + Emissão/Remoção/Bio (menu + mapa preview + páginas placeholder)
- [x] "Novo talhão" desenha sobre o KML atualizado e salva; editar/excluir funcionam
- [x] Fase F cancelada por decisão de produto — rota `/dashboard` removida
- [x] `.opencode/bin/codegraph-global-sync.sh` rodado ao final

---

## 8. Fora de escopo (fase seguinte)

- Qualquer alteração em `gaia-api`.
- Filtro/label por talhão dentro das listagens de módulo (depende de BE-41..BE-44).
- Rotas de módulo com `plotId` + leitura de `searchParams`.
- Migração do `plotId` no form de LCA para os demais módulos.

## 9. Pendências abertas

- **Build do LCA quebrado (bloqueia `bun run build`)** ⚠️: o SDK de `gaia-web` foi
  regenerado (não commitado) contra um schema mais novo do `gaia-api/develop`, trazendo
  mudanças de LCA (`montante_colhido_kg` → `montante_colhido_t`, reestruturação de
  `mudanca_uso_solo`, `quantidade`/`unidade_quantidade` em fertilizantes/defensivos). O
  frontend de `carbon-emission` ainda usa os campos antigos → **erros de typecheck
  pré-existentes**, fora do escopo A/B. Precisa de task para migrar o front do LCA às
  novas types (ou reverter a regen do SDK).
- **Backend (cards já criadas, Backlog)**: BE-41 (LCA), BE-42 (RothC), BE-43
  (Regenerativo), BE-44 (Biodiversidade) — `plot_id` como filtro + `plot_id` no item de
  listagem. Depois do merge: **regenerar o SDK** e wirar o filtro.
- **Clima automático (BE-40)**: o soil step pode omitir `clima` (backend resolve do
  município). Não faz parte desta entrega de estrutura; registrar quando o form de LCA
  for migrado para dentro do talhão.

### Resolvidas nesta entrega

- **Editar/excluir + mapa preview do talhão**: `PlotDrawer` (edit) + `PlotDeleteDialog`
  na página do talhão (fase D); o mapa preview do `geometry` já existia desde a fase C
  (`plot-geometry-map`).
- **Resolução de `kml_url`**: o `PlotDrawer` usa o mesmo `fetch(kml_url)` direto que o
  `farm-kml-map.client.tsx` já usava; sem resolução presigned nesta entrega.
- **Fazenda sem KML**: o `PlotDrawer` desenha sobre mapa vazio centralizado em
  `latitude`/`longitude` da fazenda (`initialCenter`).
