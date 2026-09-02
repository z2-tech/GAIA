---
tags: [concept]
---

# Sustainability-Metrics

GAIA's sustainability assessment framework currently tracks seven modules.

## Modules

| Módulo | Status | Descrição |
|--------|--------|-----------|
| **LCA** (Carbono Emissão) | ⚠️ Engine não validada | Motor executável; GHG Protocol v2.0 cobre combustíveis e grid BR. Fatores de emissão para fertilizantes/calcário/defensivos ainda ausentes. GWP IPCC AR6 confirmado (N₂O=273). |
| **RothC** (Carbono Remoção) | ⚠️ Engine não validada | Implementação Python executável; guia oficial RothC-26.3 e código Fortran canônico (Apache 2.0) com golden vectors de 70 anos disponíveis. Validação cruzada desbloqueada. |
| **Regenerativo** | ✅ Implementado | Avaliação de agricultura regenerativa — indicadores ponderados, dashboard de scores. |
| **BAT** (Biodiversidade) | ⚠️ Parcial | Biodiversity Assessment Tool — questionário de biodiversidade (43 questões). UI parcial no gaia-web. Planilha de referência: `Biodiversity Assessment Tool Prototype_Final.xlsx` |
| **EIQ** (Impacto Ambiental) | 📋 Planejado | Environmental Impact Quotient — avaliação de risco de pesticidas. 631 nomes preenchidos na planilha `EIQ_Final.xlsx`. |
| **STIR** (Manejo do Solo) | 📋 Planejado | Soil Tillage Intensity Rating — calculadora de intensidade de preparo do solo. Biblioteca de implementos (PT-BR). Planilha: `STIR_calculadora_metric_v4.xlsx` |
| **CFP** (Cool Farm Platform) | ⚠️ Parcial | Integração com Cool Farm Tool — payload-only, API externa pendente. |

## Contrato do MVP

- Avaliações de sustentabilidade pertencem a `ProjectFarm`; talhões cadastrais não
  são uma unidade de assessment no contrato atual.
- O Web lista múltiplos assessments por ID. Registros cancelados ficam ocultos,
  drafts podem ser retomados e resultados concluídos preservam sua versão.
- LCA usa fatores de referência server-owned e versionados; atividade, alocação e
  valores de processo do formulário são snapshot do assessment. Transporte é o
  quinto passo obrigatório e ausência nunca equivale a zero.
- RothC recebe parâmetros compartilhados e dois cenários, `bau` e `project`, na
  mesma janela mensal. Clima e versões metodológicas são compartilhados.
- BAT faz parte do MVP somente no contrato já representado pelo formulário. EIQ,
  STIR e contratos de dashboard ainda não representados ficam fora.

## RothC — regras de entrada do MVP

- Coordenadas da fazenda são a única fonte para clima e radiação do assessment.
- Produtividade é a massa colhida por hectare na unidade natural da cultura (kg/ha).
  Culturas de produto fresco (frutas, palma) têm `dry_matter_fraction` < 1 no catálogo;
  a modelagem converte para matéria seca antes da fórmula de resíduo. O resíduo aéreo
  retornado é `P_MS × (1 − HI) / HI`, com retenção de 100%; raízes e rizodeposição ficam
  fora do MVP.
- Cultura anual fica ativa no intervalo inclusivo e injeta o resíduo no mês final. Ciclos
  podem se sobrepor; cada cultura usa seu próprio HI e os resíduos são somados.
- Cultura perene distribui o resíduo anual por 12. Anos parciais não são renormalizados.
- Meses sem ciclo representam pousio com entrada vegetal zero; cobertura do solo continua
  sendo informada mensalmente.
- Culturas e índices de colheita são catálogo seedado. Resultados mensais se relacionam às
  culturas por FKs, permitindo múltiplas culturas ativas sem JSON.
- Carbono orgânico é informado diretamente em kg C/ha e modelado como FYM-equivalente:
  49% DPM, 49% RPM e 2% HUM, adicionados após a decomposição do mês.
- Massa física legada de composto não é convertida para carbono sem fator conhecido;
  métricas dependentes dessa conversão permanecem `null`.

## RothC — catálogo de culturas

- Cada cultura (`RothcCrop`) carrega `harvest_index` (fração colhida da biomassa aérea
  seca), `crop_type` (`annual`/`perennial`) e `dry_matter_fraction` (fração de matéria
  seca da produtividade informada, default 1.0).
- Convenção de HI: `resíduo = P_MS × (1 − HI) / HI`. Exceções: cana 0.85 (deliberado e
  conservador — assume palhada removida, não o HI econômico ~0.41); batata/mandioca
  (HI opera sobre biomassa total, produto subterrâneo).
- Fontes: IPCC 2019 Refinement Vol 4 Ch 11 Tab 11.1A (RAG → HI) para centeio, milheto e
  forrageiras; IPCC 2006/Tab 11.2 e literatura agronômica para os demais. Frutíferas e
  arbóreas sem default internacional (manga, abacate, citros, cacau, eucalipto, palma,
  tabaco) usam propostas técnicas do sustainability-specialist — frações de biomassa
  removida — pendentes de validação metodológica externa.
- Correções aplicadas na expansão (v3): MAIZE 0.45→0.50, COFFEE 0.50→0.20, SOYBEAN
  0.50→0.45, WHEAT 0.55→0.50, PULSES 0.30→0.40. Resultados históricos não são afetados:
  `entrada_biomassa_kg_ha` é snapshot em `RothcMonthlyResult`; o catálogo só vale para
  cálculos novos.
- `dry_matter_fraction` das frutíferas (manga 0.17, abacate 0.25, citros 0.13, palma 0.10)
  são propostas técnicas para produto fresco (~80–90% água); produtividade informada é
  massa fresca colhida.
- Endpoint de catálogo: `GET /api/v2/routhc/crops/` — fonte de verdade para o dropdown do
  Web (substitui a lista hardcoded de i18n, que incluía `SOIL`, inexistente no backend).

## RothC — decisões de produto registradas

- Cana: manter HI 0.85 (conservador para crédito de carbono); não migrar para 0.70
  (colheita crua) até decisão de posicionamento.
- Pastagem: PASTURE HI 0.77 corresponde a corte/fenação (prod = MS colhida). Pastejo não
  usa o código PASTURE: usa `monthly_input_mode = biomass` com entrada explícita de
  resíduo + `dpm_rpm = IMPROVED_GRASSLAND`.
- Agregados CROPS/PULSES/OILSEEDS permanecem como fallback; UI deve priorizar códigos
  específicos.
- Unidade de produtividade: diferenciação é sistêmica no backend via
  `dry_matter_fraction`; o Web só precisa expor a unidade correta por cultura (t MS/ha
  vs t produto fresco/ha), sem mudança de contrato.

## LCA — catálogo de culturas (emissão direta)

- `cultura` do LCA aceita os códigos do catálogo RothC (27 códigos), rota única de
  referência para o select. `IPCC_PARAMS` em `lca/calculos/direta.py` é a fonte de
  validação (sem dependência cross-app de banco).
- Parâmetros `RAG`, `DRY`, `NAG`, `Cf`, `RS`, `NBG`, `FracRenew` por cultura. Fonte:
  planilha `Em_Aplicacao_direta` + IPCC 2019 Refinement Vol 4 Ch 11 Tab 11.1a; conflitos
  resolvidos planilha-first.
- Culturas anuais (`supported=true`) computam FCR normalmente. Perenes/frutíferas/forrageiras
  (COFFEE, PASTURE, PALMA, MANGO, EUCALYPTUS, AVOCADO, CITRUS, COCOA) têm `supported=false`
  com parâmetros zerados — FCR=0 explícito, não erro.
- Código fora da tabela é **erro explícito** (400), nunca zero silencioso.

## LCA — estoque de carbono (mudança de uso do solo)

- Bloco único "Mudança de uso do solo": `manejo_atual` + N entradas `manejo_anterior` +
  `anos_desde_mudanca` (selects, sem carbono digitado). `csolo`/`cbm` são resolvidos
  server-side pela tabela de referência `LcaCarbonStock` (clima × uso da terra → tC/ha).
- Fonte da tabela (decisão 16/08): planilha Município (`docs/references/domain/LCA_Annual_Crops_Tool.xlsx`),
  fatores de estoque de carbono no solo Novaes et al. 2017 + fitofisionomias MCTI 2020
  para biomassa; `NATURAL_VEGETATION.cbm` é a média dos buckets fitofisionômicos.
  Unidades tC/ha, valores validados célula a célula.
- Janela de 20 anos ancorada no ano da colheita (regra IPCC): mudanças com
  `anos_desde_mudanca > 20` ficam fora da janela e contribuem com zero na saída
  amortizada. Amortização linear por posição (`indice × 0.005 − 0.0025`); `FATOR_TOTAL = 0.5`
  hardcoded conforme planilha (D41 = SUM × 0.5) — pendente validação com PM.
- Saída biogênica de manejo (delta de `csolo` × 44/12 × área) é computada sobre toda a
  cadeia de pares, sem teto — alimenta FSOM na emissão direta.

## LCA — manejo atual e remoção anual (2026-09)

- **Campo `current_management_practice`** em `LcaProjectSoil` (FK virtual `SoilManagementPractice`, nullable). Dropdown na aba Solo; seed server-owned `LcaSoilManagementFactor` (DB SSOT, `lca/migrations/0039_add_soil_management_practice.py`). 11 práticas (ordenadas `sort_order`): `CONVENTIONAL (−0.81)`, `MINIMUM_TILLAGE (0.55)`, `COVER_CROP (1.17)`, `NO_TILL (1.39)`, `NO_TILL_ROTATION_COVER (2.09)`, `DEGRADED_PASTURE (−0.73)`, `WELL_MANAGED_PASTURE (1.72)`, `ICL (2.20)`, `ILPF (2.05)`, `AGROFORESTRY (2.64)`, `PERENNIAL_CONSORTIUM (1.94)` tCO2e/ha/ano. Tabela consolidada Paulo Rocha compilada via `Fatores de emissão Gaia.pptx` (CORAZZA 1999, TIECHER 2020, POEPLAU & DON 2015, BAYER 2006, OLIVEIRA 2022/2023, CARVALHO 2010, LORENZ & LAL 2014, DE STEFANO & JACOBSON 2018, SHANG 2024). Próxima atualização = `delta_tC/tCO2e` via migration data (não hardcode).
- **Fórmula anual:** `delta = factor_tCO2e_ha_year × area_ha`; `removal = max(delta,0)`, `emission = max(−delta,0)` (tCO2e/ano). Normalizado `kgCO2e/kg produto = tCO2e×1000 / harvested_kg`. Puro em `lca/calculations/soil_management_annual.py`; service `_build_annual_soil_management` lê DB via `LcaSelectors.get_soil_management_factor` com fallback enum para testes sem seed.
- **Net líquido:** `Líquido = Emissões − Remoções` (reunião). `total_agro` soma `soil_management_annual` a `total_agricultural` (bio/removal) e computa `net = fossil+bio−removal` por bloco (`total_agricultural`, `luc`, `total`). `total` (alocação) também expõe `net` por produto×critério. Pode ser **negativo** (sequestro líquido). PPT verde "Remoção" abate do total no dashboard. LUC olha 20a histórico (penalização); manejo anual bonifica presente.
- **API:** `GET /api/v1/lca/soil-management-practices/` lista fatores (DB, ordenado). Serializers `LcaAnnualSoilSerializer`, `LcaTotalAgroTripleSerializer.net`.

## LCA — comparação e benchmark (2026-09)

- **Registry dinâmico por módulo/projeto/fazenda/talhão:** app `comparison` orquestra via `DISPATCH = {lca, carbono, regenerativo, biodiversidade, cfp}` cada com `get_by_ids`, `filter`, `calc_map`, `benchmark_rows` (+ opcional `build_item`). Adicionar nova calculadora = adicionar entrada + builder (N cenários via `assessment_ids` OU `filters {project_ids,farm_ids,plot_ids,crop_codes,harvest_year}`; cap 20). Tenant-isolated via `ProjectSelectors._user_accessible_project_qs` → `ProjectFarm`; cross-user → 403. Módulo-isolado (não mistura lca×carbono). Métrica default LCA `sequestro_anual_total` (per_ha/per_kg/absolute) ou `net_liquid`.
- **Rotas:** genérica `POST /api/v1/comparison/comparison/` + `GET /api/v1/comparison/comparison/benchmark/` e shim LCA `POST /api/v1/lca/comparison/` + `GET /api/v1/lca/comparison/benchmark/` (thin wrapper, contrato rico flat vs genérico `details`). Benchmark anônimo `avg/median/p25/p75/min/max/count` exige `count≥5` senão `available:false` (LGPD, sem nomes). Futuro: média global anônima sem nomes já coberto pelo threshold.
- **Filtros simplificados:** `assessment_ids` (explícito) xor `filters` (escopo); `project_ids/farm_ids/plot_ids` resolvem via subquery `ProjectFarm` (evita `FieldError` em `LcaProjectCulture.project_farm_id` int).

## EIQ — Environmental Impact Quotient

Ferramenta de suporte à decisão desenvolvida pelo NY State Integrated Pest Management Program. Avalia o impacto ambiental de pesticidas considerando:

- Toxicidade dérmica para mamíferos (DT)
- Toxicidade crônica (C)
- Toxicidade para peixes (F), aves (B), abelhas (Z), artrópodes benéficos (A)
- Persistência no solo (S) e na planta (P)
- Potencial de lixiviação (L) e runoff (R)

A planilha contém 631 nomes preenchidos na coluna de ativos; linhas formatadas vazias não contam como registros. O módulo GAIA adaptaria a fonte ao contexto brasileiro.

## STIR — Soil Tillage Intensity Rating

Calculadora de intensidade de preparo do solo desenvolvida pelo USDA-NRCS. Adaptada para implementos brasileiros:

- Biblioteca de implementos em PT-BR (arado de aiveca, arado de discos, grade niveladora, etc.)
- Categorias: aração, gradagem, plantio direto, cultivo mínimo
- Parâmetros: velocidade (km/h), profundidade (cm), distúrbio (%), tillage type
- Resultado: índice STIR por operação e acumulado

## BAT — Biodiversity Assessment Tool

Questionário de avaliação de biodiversidade com 43 questões em 3 áreas:

1. **Área de produção** — diversidade de culturas, raças de gado, rotação
2. **Pequena área não produtiva** — habitats naturais, margens de campo, corredores
3. **Grande área não produtiva** — pastagens naturais, matas, práticas de manejo

Sistema de pontuação com thresholds para classificação (baixa/média/alta biodiversidade).

## Referências

- Inventário em `docs/references/domain/README.md`: BAT, EIQ, STIR, template RothC,
  guia oficial RothC-26.3 (Coleman & Jenkinson 2014), código Fortran canônico
  v2.1.1 (Apache 2.0) com golden vectors, openLCA, FullCAM, FAO Soils Portal.
- Fonte científica LCA: modelo de domínio (openLCA) disponível; fatores de emissão e vetores ainda ausentes.
- Fonte científica RothC: guia oficial + código canônico Fortran com vetores dourados de 70 anos disponíveis. Validação Python × Fortran desbloqueada.
- Código e testes atuais descrevem comportamento executável, não autoridade científica.
- PDFs de reunião são contexto de produto e contêm decisões ainda não aprovadas.
