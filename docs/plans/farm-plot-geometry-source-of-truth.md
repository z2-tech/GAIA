# Geometria de fazenda e talhões — fonte única de verdade

> **Status:** Proposto — aguardando aprovação do time
> **Última atualização:** 2026-08-19
> **Repos:** `gaia-api` (Django DRF) + `gaia-web` (Next.js) — mudança cross-stack
> **Orquestradores:** `senior-backend` → `senior-nextjs`
> **Pré-requisito confirmado:** não há dados em produção. Nenhum backfill, nenhum
> fallback de compatibilidade, nenhuma janela de migração.

---

## 1. Resumo executivo

Hoje a geometria dos talhões existe em **dois lugares ao mesmo tempo**: dentro do
arquivo KML gravado no S3 no momento da criação da fazenda, e nas linhas da tabela
`plots` no Postgres. O KML é escrito uma única vez e nunca mais é atualizado. Toda
criação, edição ou exclusão de talhão feita depois disso altera apenas o Postgres.

O resultado é que o arquivo KML fica permanentemente desatualizado a partir do
primeiro talhão criado após a fazenda. Como a UI ainda lê esse arquivo para desenhar
o mapa, o usuário vê talhões antigos, não vê os novos, e vê contornos fantasmas de
talhões já excluídos.

**A proposta é eliminar a duplicidade:** o KML passa a ser exclusivamente um
*formato de importação*, e a geometria passa a viver só no banco — o contorno da
fazenda num campo novo `Farm.boundary_geometry`, e os talhões em `Plot.geometry`,
como já é hoje. O mapa deixa de baixar o arquivo do S3 e passa a ser montado a partir
da API.

Custo estimado: **backend pequeno** (1 migration, 3 serializers, 1 validator, 2
ajustes de service), **frontend médio** (o wizard de criação, o mapa da fazenda e o
drawer de talhão), **SDK regenerado** entre os dois.

---

## 2. Como funciona hoje

### 2.1 Criação da fazenda (wizard `new-farm`, passo 2)

1. O usuário sobe um arquivo `.kml`, `.kmz` ou shapefile. `toKmlFileIfNeeded()`
   converte shapefile para KML; `parseKml()` / `parseKmz()` convertem para GeoJSON.
   — `gaia-web/src/features/project/components/new-farm/upload-kml.tsx:51-99`
2. O GeoJSON resultante vai para o estado do `PlotsProvider` como `parsedKml`, junto
   com o XML bruto em `rawKmlXml`.
   — `gaia-web/src/components/map/plots-context.tsx:47-52`
3. O usuário **desenha os talhões à mão** por cima desse contorno, com o Geoman.
   Cada polígono desenhado vira um item em `state.plots`, com um id local gerado por
   `crypto.randomUUID()`.
   — `gaia-web/src/components/map/plots-layer.tsx:83-97`, `use-plots-map.ts:16-45`
4. No submit, `buildFinalKmlFile()` chama `generateKml({ original: rawKmlXml, plots })`,
   que **injeta um `<Folder id="talhoes">` dentro do KML original** com um `<Placemark>`
   por talhão desenhado.
   — `gaia-web/src/features/project/hooks/use-create-farm.ts:156-187`,
     `gaia-web/src/lib/geo/kml-generator.ts:141-172`
5. Esse arquivo modificado é enviado ao S3 por presigned URL. A chave é um UUID novo
   a cada upload.
   — `gaia-api/uploads/services.py:44-79`
6. `POST /farms/create/` recebe **as duas coisas**: `kml_url` (a chave S3) **e** a
   lista `plots[]` com a `geometry` de cada talhão.
   — `gaia-web/src/features/project/schemas/new-farm.ts:125-150`
7. O backend grava `Farm.kml_url = key` e cria N linhas `Plot` com `geometry` em
   `JSONField`.
   — `gaia-api/farms/services.py:386-397`

Ao fim do wizard, a mesma geometria existe em dois lugares — e eles já nascem
consistentes, o que esconde o problema até a primeira edição.

### 2.2 Criação/edição de talhão depois da fazenda

1. `PlotDrawer` abre com um mapa. Ele faz `fetch(farm.kml_url)` e desenha o arquivo
   do S3 como camada de fundo.
   — `gaia-web/src/features/farm/plots/plot-drawer.tsx:66-81`
2. O usuário desenha ou ajusta um polígono e salva.
3. `useCreatePlot` / `useUpdatePlot` chamam `POST`/`PATCH .../plots/`.
   — `gaia-web/src/services/farms/plots.mutation.ts`
4. `PlotService.create_plot` / `update_plot` gravam **apenas** a linha `Plot`.
   — `gaia-api/farms/services.py:489-514`
5. O cache invalidado é **só** `listPlots`. Nada toca `kml_url`, nada toca a fazenda.

**Nenhum ponto do sistema regenera, reenvia ou invalida o arquivo KML.**

---

## 3. O bug e por que ele acontece

### 3.1 Causa raiz

Duas fontes de verdade para a mesma informação, com apenas uma delas sendo escrita
nas operações do dia a dia. A divergência é garantida, não é uma condição de corrida.

### 3.2 Sintoma relatado — "ao adicionar um talhão aparece o KML antigo"

`plot-drawer.tsx:66-81` baixa `farm.kml_url` e o usa como fundo do mapa. Esse arquivo
**já contém o `<Folder id="talhoes">` gravado no wizard**. Portanto, ao abrir o drawer
para criar um talhão novo, o usuário vê:

- os talhões **do wizard**, desenhados como contorno de fundo (estilo azul do
  `KmlLayer`), como se fossem parte do terreno;
- **nenhum** dos talhões criados depois da fazenda, porque eles nunca entraram no
  arquivo;
- nenhuma indicação de qual área já está ocupada — o que leva a desenhar talhões
  sobrepostos sem perceber.

### 3.3 Sintoma no modo edição

`plot-drawer.tsx:83-100` semeia no mapa **somente o talhão sendo editado**. Os demais
talhões reais não são desenhados. Mesmo problema de falta de contexto.

### 3.4 O paliativo atual na página da fazenda, e por que ele quebra

`farm-kml-map.client.tsx:31-40` tenta esconder a duplicata filtrando por **nome**:
toda feature do KML cujo `properties.name` bate com o nome de algum `Plot` retornado
pela API é removida da camada de contorno.

Esse filtro falha em quatro situações reais:

| Situação | O que acontece |
|---|---|
| Talhão renomeado | O nome deixa de bater. O contorno antigo volta a aparecer, sobreposto ao talhão atual — dois polígonos com geometrias diferentes |
| Talhão excluído | O nome não bate mais com nada. O contorno fantasma permanece no mapa para sempre |
| Talhão criado após a fazenda | Não está no KML. Aparece só pela camada de plots — funciona por acidente, não por design |
| Perímetro da fazenda com o mesmo nome de um talhão | O perímetro é filtrado junto e some do mapa |

O motivo de o filtro ser por nome, e não por id: `kml-generator.ts:77-82` grava no
KML um `talhao_id` que é o **id local do navegador** (`crypto.randomUUID()`), gerado
antes de o backend existir na conversa. Ele nunca corresponde ao `Plot.id` do banco.
O KML, na prática, nunca foi reconciliável com o banco por identidade.

---

## 4. Inventário completo de defeitos encontrados na análise

Estes foram levantados junto com a causa raiz. Nem todos entram nesta rodada — a
coluna **Escopo** indica.

| # | Defeito | Local | Escopo |
|---|---|---|---|
| 1 | KML no S3 nunca é atualizado após a criação da fazenda | `farms/services.py:489-514`, `plots.mutation.ts` | **Nesta rodada** |
| 2 | Drawer de talhão desenha o KML congelado como fundo | `plot-drawer.tsx:66-81` | **Nesta rodada** |
| 3 | Modo edição do drawer não mostra os outros talhões | `plot-drawer.tsx:83-100` | **Nesta rodada** |
| 4 | Dedupe do mapa da fazenda é por nome, quebra em 4 cenários | `farm-kml-map.client.tsx:31-40` | **Nesta rodada** |
| 5 | `plot_count` é gravado uma vez na criação e nunca atualizado; a UI mostra número errado | `farms/models.py:33`, `use-create-farm.ts:296`, exibido em `general-data.tsx:62` e `operational-status.tsx:50` | **Nesta rodada** |
| 6 | `Plot.geometry` é `JSONField` sem validação — aceita qualquer JSON, inclusive `{"foo": 1}` | `farms/serializers.py:319` | **Nesta rodada** |
| 7 | `PlotService.update_plot` faz `setattr` genérico, sem `full_clean()` e sem `update_fields` | `farms/services.py:506-514` | **Nesta rodada** |
| 8 | Trocar o arquivo KML no wizard **não limpa os talhões já desenhados** — talhões do arquivo A acabam gravados junto com o arquivo B | `use-create-farm.ts:110-116` vs `upload-kml.tsx:51-88` | **Nesta rodada** |
| 9 | Falha no download do KML é engolida com `.catch(() => {})` — mapa fica em branco, sem erro e sem estado vazio | `farm-kml-map.client.tsx:64`, `plot-drawer.tsx:77` | **Nesta rodada** (some junto com o `fetch`) |
| 10 | Cada upload gera uma chave S3 nova; a anterior nunca é apagada | `uploads/services.py:57` | Fora — vira menor com a mudança |
| 11 | Upload S3 fora da transação de criação: se `createFarm` falha, sobra objeto órfão no bucket | `use-create-farm.ts:268-301` | Fora |
| 12 | `build_public_url` exige bucket público para leitura; qualquer um com a URL lê o KML | `uploads/services.py:81` | Fora — deixa de ser lido pelo browser |
| 13 | Não existe validação de sobreposição entre talhões nem de containment no perímetro | `lib/geo/validators.ts:38-88` | Fora — próxima rodada |
| 14 | Não existe UI de edição de fazenda; não há `useUpdateFarm` em `farms.mutation.ts`, embora o `PATCH` exista no backend | `farms.mutation.ts`, `farms/views.py:159` | Fora — próxima rodada |

---

## 5. Decisão

### 5.1 Alternativas avaliadas

**Opção A — o KML deixa de ser fonte de verdade.** Ele vira apenas formato de
importação e arquivo de origem arquivado. A geometria passa a viver só no banco.

**Opção B — o KML continua canônico e é regerado a cada mutação de talhão.**
Exigiria reimplementar `kml-generator.ts` em Python (o gerador atual usa `DOMParser`
e `document.implementation`, que só existem no browser), regravar o objeto no S3
dentro da transação de cada create/update/delete de talhão, apagar a chave anterior,
e invalidar o cache da fazenda no frontend a cada mutação de talhão.

### 5.2 Escolha: **Opção A**

Motivos:

1. **Custo.** A tem uma migration e nenhuma lógica nova de sincronização. B tem
   duplicação de um gerador de KML em duas linguagens, mais escrita em storage
   externo dentro de transação de banco.
2. **Consistência.** Em A a divergência é impossível por construção — não existe
   segunda cópia. Em B ela continua possível: se a escrita no S3 falhar depois do
   commit no Postgres, os dois voltam a divergir, e agora com um modo de falha
   silencioso.
3. **Latência.** Em A o mapa é montado com dados que a página já busca. Em B toda
   renderização de mapa depende de um round-trip extra para o S3 (hoje: dois fetches
   por página, um por mapa).
4. **Segurança.** Em A o browser deixa de baixar direto do bucket, o que remove a
   necessidade de leitura pública (defeito #12).

**Opção B só se justificaria se algum sistema externo consumisse o arquivo do S3
diretamente.** Isso precisa ser confirmado pelo time — ver §11.

### 5.3 O que acontece com o arquivo KML

Ele **continua sendo enviado e continua existindo** em `Farm.kml_url`, como arquivo
de origem: rastreabilidade de qual arquivo o cliente entregou, e download futuro. O
que muda é que:

- o wizard **para de injetar** o `<Folder id="talhoes">` — sobe o arquivo como veio
  (com a única conversão KMZ→KML necessária para satisfazer o `content_type` aceito
  pelo `upload_type: FARM_KML`);
- **ninguém mais lê esse arquivo para renderizar mapa**;
- `gaia-web/src/lib/geo/kml-generator.ts` pode ser **apagado por inteiro**.

Se, no futuro, "baixar o KML atualizado da fazenda" virar requisito de produto, a
forma correta é um endpoint `GET /farms/{id}/kml/` que **gera o arquivo na hora** a
partir de `boundary_geometry` + `plots`. Isso não cria estado duplicado. Está fora
desta rodada.

---

## 6. Modelo alvo

```
Farm
├── kml_url          → chave S3 do arquivo de origem (arquivo morto, não é lido para render)
├── kml_photo        → inalterado
└── boundary_geometry → GeoJSON FeatureCollection: TUDO que veio do KML importado
                        (perímetro, benfeitorias, estradas, pontos). Fonte de verdade
                        do contorno da fazenda.

Plot
└── geometry         → GeoJSON Polygon. Fonte de verdade do talhão. Já existe.
```

**Por que `FeatureCollection` e não um único `Polygon`?** O KML importado
frequentemente traz mais do que o perímetro — `parseKml` já conta linhas e pontos
(`kml-parser.ts:35-100`), e o `KmlLayer` hoje desenha tudo isso na página da fazenda.
Guardar a `FeatureCollection` inteira preserva a paridade visual exata com o
comportamento atual e não descarta informação do cliente.

**Sobre o nome do campo:** `boundary_geometry` descreve o papel (a base cartográfica
da fazenda, o contorno sobre o qual os talhões são desenhados), não uma restrição de
que seja um polígono único. O `help_text` da migration deixa isso explícito. Se o time
preferir `base_geojson` ou `farm_geometry`, é uma troca de nome sem impacto no
desenho — decidir antes da migration, porque depois custa uma migration a mais.

---

## 7. Fase 1 — Backend (`gaia-api`, orquestrador `senior-backend`)

### 7.1 Modelo e migration

**`farms/models.py`** — adicionar após `kml_photo` (linha 58):

```python
boundary_geometry = models.JSONField(
    null=True,
    blank=True,
    help_text=(
        "GeoJSON FeatureCollection com a base cartográfica da fazenda "
        "(perímetro e demais feições importadas do KML). Os talhões NÃO ficam "
        "aqui — eles são linhas da tabela `plots`."
    ),
)
```

**Remover** o campo `plot_count` (linha 33). Ele é uma denormalização que já nasce
errada e não tem quem a mantenha. Passa a ser derivado — ver §7.3.

**Migration `farms/migrations/0009_farm_boundary_geometry.py`**: `AddField` do campo
novo + `RemoveField` de `plot_count`. Como não há produção, é uma migration única e
destrutiva, sem `SeparateDatabaseAndState`.

**`farms/test_factories.py:26`** — remover `plot_count` da factory.

### 7.2 Validação de GeoJSON — arquivo novo `farms/validators.py`

Hoje `Plot.geometry` aceita qualquer JSON (defeito #6). Criar dois validators
compartilhados:

```python
_GEOMETRY_TYPES = {
    "Point", "MultiPoint", "LineString",
    "MultiLineString", "Polygon", "MultiPolygon",
}

def validate_geojson_polygon(value): ...
    # exige type == "Polygon", coordinates lista de anéis,
    # cada anel com >= 4 posições e fechado (primeira == última),
    # cada posição com 2 ou 3 números finitos

def validate_geojson_feature_collection(value): ...
    # exige type == "FeatureCollection", features lista,
    # cada feature com geometry.type em _GEOMETRY_TYPES
```

Erros seguem o padrão de `farms/messages.py` (`CustomValidationError` com mensagem
tipada), não `ValidationError` cru do DRF.

Aplicar em:

- `PlotCreateSerializer.geometry` (`serializers.py:319`) → `validate_geojson_polygon`
- `FarmCreateSerializer.boundary_geometry` → `validate_geojson_feature_collection`
- `FarmUpdateSerializer.boundary_geometry` → idem

**Mudança de contrato:** `PlotCreateSerializer.geometry` passa de
`required=False, allow_null=True` para **obrigatório**. Sob o modelo novo, um talhão
sem geometria não tem razão de existir — é ele que define o talhão. No `PATCH`
(`update_plot`) o campo continua opcional, porque a view usa `partial=True`
(`views.py:376`).

### 7.3 Serializers — `farms/serializers.py`

| Serializer | Linhas | Mudança |
|---|---|---|
| `FarmCreateSerializer` | 34-98 | `+ boundary_geometry` (campo + `Meta.fields`); `- plot_count` |
| `FarmUpdateSerializer` | 130-186 | `+ boundary_geometry` (campo + `Meta.fields`); `- plot_count` |
| `FarmDetailSerializer` | 259-304 | `+ boundary_geometry` em `Meta.fields`; `plot_count` vira `SerializerMethodField` derivado |
| `FarmListSerializer` | 230-247 | Sem mudança — não expõe geometria nem `plot_count`, e deve continuar assim (payload de listagem) |

`plot_count` derivado:

```python
def get_plot_count(self, obj) -> int:
    return getattr(obj, "active_plot_count", None) or obj.plots.filter(
        canceled_at__isnull=True
    ).count()
```

Para evitar N+1, anotar no selector — **`farms/selectors.py:33` `get_farm_by_id`**:

```python
.annotate(
    active_plot_count=Count("plots", filter=Q(plots__canceled_at__isnull=True))
)
```

`to_representation` (`serializers.py:298-304`) **não muda**: ele só reescreve
`kml_url` e `kml_photo` para URL pública. `boundary_geometry` é JSON puro e passa
direto.

### 7.4 Services — `farms/services.py`

Boa notícia: quase nada muda.

- `create_farm` (linha 386) faz `Farm.objects.create(**farm_data)`. O campo novo passa
  sozinho assim que estiver no serializer. **Sem mudança.**
- `update_farm` (linhas 441-449) faz `setattr` genérico + `full_clean()` + `save(update_fields=...)`.
  **Sem mudança.**
- `PlotService.update_plot` (linhas 506-514) — **corrigir o defeito #7**: adicionar
  `plot.full_clean()` antes do save e passar `update_fields` com as chaves realmente
  alteradas, em vez de gravar a linha inteira.

### 7.5 Schema OpenAPI

Rodar e validar:

```bash
python manage.py spectacular --validate --fail-on-warn
```

O `JSONField` sai como `object` genérico no schema. Se o time quiser um tipo melhor
no SDK, dá para anotar com `@extend_schema_field(OpenApiTypes.OBJECT)` ou um
componente nomeado — decisão de qualidade de contrato, não bloqueia.

---

## 8. Fase 2 — SDK (cross-stack)

Sem esta fase o frontend não enxerga o campo novo. Regra do projeto: o SDK gerado é
a única fonte de tipos no `gaia-web` — nada de mirror local nem de
`as unknown as`.

```bash
# gaia-api
python manage.py spectacular --file schema.yaml
# gaia-web
bun run generate-types
```

Conferir que `FarmDetail`, `FarmCreate` e `FarmUpdate` em
`gaia-web/src/client/types.gen.ts` passaram a carregar `boundary_geometry`, e que
`plot_count` sumiu dos tipos de request.

---

## 9. Fase 3 — Frontend (`gaia-web`, orquestrador `senior-nextjs`)

### 9.1 Wizard de criação — enviar o contorno junto

**`features/project/hooks/use-create-farm.ts`**

- `buildFinalKmlFile()` (linhas 156-187) encolhe drasticamente. Não chama mais
  `generateKml`. Fica só:
  - arquivo `.kml` → sobe como está;
  - arquivo `.kmz` → sobe `state.rawKmlXml` embrulhado por `buildKmlFile()`
    (extração já feita por `parseKmz`), porque o `upload_type: FARM_KML` não aceita
    `content_type` de KMZ.
- No `submitHandler` (linha 290), incluir `boundary_geometry: plots.state.parsedKml?.geojson ?? null`
  no corpo, e **remover** `plotCount`.
- **Corrigir o defeito #8**: `handleKmlFileChange` (linhas 110-116) passa a chamar
  `plots.clear()` quando o arquivo é trocado. Talhões desenhados sobre o arquivo
  anterior não podem sobreviver à troca de base cartográfica.

**`features/project/schemas/new-farm.ts`** — `valuesToCreateBody` (linhas 119-150):
trocar `plotCount` por `boundaryGeometry` em `CreateFarmBodySideInputs` e no corpo
montado.

**Apagar `lib/geo/kml-generator.ts`** e seus testes, se houver. Nada mais o usa.
(`lib/geo/geojson-to-kml.ts` **permanece** — é usado pelo caminho de shapefile.)

### 9.2 Mapa da fazenda — parar de baixar do S3

**`features/farm/components/farm-kml-map.client.tsx`**

- Remover o `useEffect` de `fetch(kmlUrl)` (linhas 55-68) e o estado `geojson`.
- Remover **todo** o bloco `plotNames` + `boundaryGeojson` (linhas 23-40) — o filtro
  por nome deixa de existir. Isso mata os quatro cenários de quebra do §3.4 de uma vez.
- A camada de contorno passa a receber `farm.boundary_geometry` direto.
- A prop do componente muda de `kmlUrl: string` para `boundary: FeatureCollection | null`.

**`app/(private)/projects/[projectId]/farm/[farmId]/(farm)/page.tsx:26`** — a
condição de render deixa de ser `farm?.kml_url &&`. O mapa passa a renderizar sempre
que houver contorno **ou** talhões; se não houver nem um nem outro, mostrar estado
vazio explícito em vez de sumir com o card (defeito #9).

### 9.3 Drawer de talhão — o coração do bug relatado

**`features/farm/plots/plot-drawer.tsx`**

- Remover o `useEffect` de `fetch(farm.kml_url)` (linhas 66-81).
- Semear o contexto do mapa com `farm.boundary_geometry` via `setParsed`.
- **Semear também os talhões existentes**: no modo `create`, desenhar todos os
  talhões de `useListPlots(farmId)` como camada de referência não editável; no modo
  `edit`, desenhar todos os outros e deixar editável somente o talhão alvo
  (hoje, linhas 83-100, só o alvo é desenhado).
- Isso exige distinguir, no `PlotsProvider`, talhões **editáveis** de talhões de
  **referência**. Duas saídas, a decidir na implementação:
  - **(a)** passar os talhões de referência como uma `FeatureCollection` extra para
    o `MapView`, renderizada por um `KmlLayer` próprio com estilo distinto — menor
    mudança, mantém o reducer intacto;
  - **(b)** adicionar um flag `readOnly` ao tipo `Plot` do contexto e o `TalhoesLayer`
    respeitar — mais correto a longo prazo, mexe em `plots-context.tsx` e
    `plots-layer.tsx`.

  **Recomendação: (a)** nesta rodada. (b) vale quando entrar a validação de
  sobreposição (§10), que precisa dos vizinhos no mesmo modelo de dados.

- O `seededRef` (linha 65) e o reset em `finish()` precisam continuar coerentes com a
  semeadura nova — abrir e fechar o drawer duas vezes não pode duplicar camadas.

### 9.4 Cache / invalidação

**`services/farms/plots.mutation.ts`** — as três mutations (`create`, `update`,
`delete`) passam a invalidar **também** a query da fazenda (`getFarmQueryKey`), porque
`plot_count` agora é derivado no `FarmDetail` e muda a cada mutação de talhão.

### 9.5 i18n

Chaves novas em `messages/pt.json` **e** `messages/en.json` (as duas, sempre):

- estado vazio do mapa quando a fazenda não tem contorno nem talhões;
- rótulo/legenda da camada de talhões de referência no drawer;
- confirmação ao trocar o arquivo KML no wizard, avisando que os talhões desenhados
  serão descartados (defeito #8).

---

## 10. Fora de escopo desta rodada

| Item | Por quê fica de fora |
|---|---|
| Validação de sobreposição entre talhões e containment no perímetro | Mudança de regra de negócio com decisão de produto envolvida (bloquear ou só avisar? tolerância de sobreposição?). Merece card próprio. Fica **muito** mais barato depois desta rodada, porque os vizinhos passam a estar disponíveis no mapa |
| UI de edição de fazenda (`useUpdateFarm`) | O `PATCH` já existe e já aceita `boundary_geometry`; falta só a tela. Card próprio |
| Endpoint de export `GET /farms/{id}/kml/` | Só se "baixar KML atualizado" for requisito de produto — ver §11 |
| Limpeza de objetos órfãos no S3 (#10, #11) | Independente desta mudança |
| Migrar leitura do S3 para presigned GET (#12) | Deixa de ser urgente quando o browser para de baixar o KML |

---

## 11. Pendências para o time responder

1. **Algum sistema externo consome o arquivo KML direto do S3?** Se sim, a Opção A
   precisa vir acompanhada do endpoint de export (§5.3). Se não, nada a fazer.
2. **"Baixar o KML da fazenda" é requisito de produto?** Se sim, entra como card
   seguinte, gerando o arquivo on-the-fly.
3. **Nome do campo:** `boundary_geometry` ou outro? Decidir **antes** da migration.
4. **Importar polígonos do KML como talhões automaticamente** — hoje o usuário sobe o
   KML e desenha os talhões à mão por cima, mesmo quando o arquivo do cliente já traz
   um polígono por talhão. Não é regressão desta mudança (é o comportamento atual),
   mas é uma melhoria óbvia que o modelo novo destrava. Vale um card?

---

## 12. Definição de pronto

**Comportamento**

- [ ] Criar fazenda com KML + N talhões desenhados → `boundary_geometry` gravado, N
      linhas em `plots`, e o KML no S3 **sem** `<Folder id="talhoes">`
- [ ] Abrir o drawer de novo talhão → aparece o contorno da fazenda **e** todos os
      talhões existentes; nenhum talhão fantasma
- [ ] Criar um talhão novo → ele aparece no mapa da fazenda e no drawer seguinte, sem
      reload manual
- [ ] Renomear um talhão → nenhum contorno duplicado aparece (cenário que quebrava
      hoje)
- [ ] Excluir um talhão → o contorno some do mapa (cenário que quebrava hoje)
- [ ] "Número de talhões" na tela da fazenda bate com a lista, após criar e após
      excluir
- [ ] Trocar o arquivo KML no wizard descarta os talhões desenhados, com confirmação
- [ ] Fazenda sem contorno e sem talhões → estado vazio explícito, não card sumido
- [ ] `POST /plots/create/` com `geometry` inválida (`{"foo": 1}`, anel aberto, menos
      de 4 posições) → 400 com mensagem tipada

**Comandos de gate**

```bash
# gaia-api
source venv/bin/activate
python test_runner.py --settings=test_settings --keepdb
python manage.py spectacular --validate --fail-on-warn
pre-commit run --all-files

# gaia-web
bun lint
bun run typecheck
bun run test:ci
bun run build
```

**Revisão**

- [ ] `grep -rn "kml_url" gaia-web/src --include="*.tsx"` não retorna nenhum `fetch`
- [ ] `kml-generator.ts` não existe mais e nada o importa
- [ ] Nenhuma chave i18n nova faltando em `pt.json` ou `en.json`
- [ ] Nenhum tipo espelhado à mão nem `as unknown as` no código novo — tudo do SDK
