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
  tabaco) usam propostas técnicas do sustainability-specialist. Cacau, manga, abacate,
  citros e palma foram recalibrados em 20/08 (ver seção "RothC: deposição de resíduo e
  harvest index") para representar resíduo anual real (serapilheira + poda), não fração
  da biomassa total da árvore.
- Correções aplicadas na expansão (v3): MAIZE 0.45→0.50, COFFEE 0.50→0.20, SOYBEAN
  0.50→0.45, WHEAT 0.55→0.50, PULSES 0.30→0.40. Resultados históricos não são afetados:
  `entrada_biomassa_kg_ha` é snapshot em `RothcMonthlyResult`; o catálogo só vale para
  cálculos novos.
- `dry_matter_fraction` das frutíferas (manga 0.17, abacate 0.25, citros 0.13, palma 0.10)
  são propostas técnicas para produto fresco (~80–90% água); produtividade informada é
  massa fresca colhida.
- Endpoint de catálogo: `GET /api/v2/rothc/crops/` — fonte de verdade para o dropdown do
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

## RothC: deposição de resíduo e harvest index

Decisão técnica registrada em 20/08 (card BE-59). Escopo: CACAU, MANGO, AVOCADO,
CITRUS, PALMA. Fórmula vigente: `resíduo = P_MS × (1 − HI) / HI`, com `P_MS =
produtividade × dry_matter_fraction` e retenção de 100% do resíduo no talhão.

### Decisão 1 — regime de deposição por tipo de cultura (mantido)

- **Anual**: resíduo integral injetado no mês final do ciclo (`fim_mes`). Manter.
- **Perene**: resíduo anual distribuído uniformemente, `resíduo / 12` por mês. Manter.

Justificativa:

- Cultura anual deposita praticamente toda a biomassa aérea de uma vez na colheita
  (palhada deixada no campo). O pulso único no mês final é a representação correta no
  passo mensal do RothC; inverter (espalhar) subestimaria o pico de decomposição pós-
  colheita e distorceria a dinâmica mensal de DPM/RPM. Ciclos sobrepostos já somam
  resíduos no mesmo mês.
- Perene (frutíferas, café, palma, pastagem) tem entrada contínua de resíduo via
  serapilheira e poda ao longo do ano — especialmente perenes tropicais perenifólios
  (citros, manga, abacate, cacau). Distribuir 1/12 mensal é a aproximação padrão em
  modelagem de carbono (FullCAM e similares usam entrada anual uniforme) e evita picos
  artificiais que acionariam decomposição excessiva de DPM em um único mês.
- Exceção flagrada para revisão futura: **eucalipto** é perene de ciclo longo cujo
  resíduo principal (bark, galhos, folhas) é depositado no corte raso, em pulso — o
  regime `/12` atual não o representa bem; tratar como pico de fim de rotação quando o
  modelo suportar colheita perene por ano.

### Decisão 2 — fator de resíduo para perenes lenhosas (alterado)

Problema: HI de frutíferas relaciona fruto à biomassa **total** da árvore, mas a
fórmula trata `(1 − HI)/HI` como resíduo **anual**. O tronco e galhos acumulam por
décadas e não retornam ao solo todo ano — com isso o resíduo anual ficava
superestimado (fatores efetivos CACAU 9.0×, MANGO 5.7×, AVOCADO 5.7×, CITRUS 4.0×,
PALMA 1.0× sobre o produto seco).

Decisão: para os cinco perenes lenhosos do escopo, adotar **fator de resíduo anual**
`F` (kg resíduo seco por kg de produto seco) calibrado em literatura de serapilheira +
poda, mantendo a fórmula `resíduo = P_MS × F`. Sem mudança de schema: o fator é
implementado via HI recalibrado, pois `HI = 1 / (1 + F)` reproduz `(1 − HI)/HI = F`.
Para anuais, pastagem e demais perenes o HI agronômico original permanece operacional.

Fatores finais (calibração conservadora — piso a meio da faixa de literatura, para não
superestimar crédito de remoção):

| Cultura | F (resíduo/produto seco) | Justificativa (serapilheira + poda, t MS/ha/ano) |
|---------|--------------------------|--------------------------------------------------|
| CACAU | 3.0 | Casca do fruto devolvida ao campo ≈ 1× o DM de amêndoas + serapilheira ~1.5× + poda ~0.5× |
| MANGO | 2.0 | Serapilheira 3–4 + poda 0.5–1.5 ≈ 4–5 t vs fruto seco 1.7–2.6 t |
| AVOCADO | 1.8 | Serapilheira 2–3 + poda 1–2 ≈ 3.5–5 t vs fruto seco 2–3 t |
| CITRUS | 1.3 | Serapilheira 2–3 + poda 1–2 ≈ 3–5 t vs fruto seco 2.6–3.9 t |
| PALMA | 0.15 | Cladódio é caule retido; só cladódios senescentes/liteira ~0.3–1 t vs cladódio seco 3–10 t |

Efeito: reduz a entrada de carbono simulada para essas culturas (de ~2× a ~6×),
tornando o sequestro estimado mais conservador e aderente à ciclagem real.

### Decisão 3 — tabela final de HI

Convenção agora dupla e documentada: anuais/pastagem → HI agronômico (IPCC);
perenes lenhosas do escopo → HI calibrado = `1 / (1 + F)` (parâmetro operacional que
produz o fator anual desejado; **não** deve ser lido como fração de biomassa total).

| Código | Cultura | HI anterior | HI final | F efetivo | Fonte |
|--------|---------|-------------|----------|-----------|-------|
| COCOA | Cacau | 0.10 | **0.25** | 3.0 | Literatura de ciclagem de cacau: casca ≈ amêndoa em MS + serapilheira de plantio maduro |
| MANGO | Manga | 0.15 | **0.33** | 2.0 | Serapilheira + poda em pomares de manga maduros |
| AVOCADO | Abacate | 0.15 | **0.36** | 1.8 | Serapilheira + poda em pomares de abacate |
| CITRUS | Citros | 0.20 | **0.43** | 1.3 | Serapilheira + poda em pomares cítricos maduros |
| PALMA | Palma forrageira | 0.50 | **0.87** | 0.15 | Cladódio retido como caule; resíduo = cladódios senescentes |
| PASTURE | Pastagem | 0.77 | 0.77 (inalterado) | 0.30 | Modelo de corte/fenação — prod é MS colhida, restolho 23% |
| EUCALYPTUS | Eucalipto | 0.65 | 0.65 (inalterado) | 0.54 | Fora do escopo; revisar regime de deposição (pulso de rotação) |
| COFFEE | Café | 0.20 | 0.20 (inalterado) | 4.0 | Fora do escopo; F 4.0 provavelmente alto — candidato a revisão futura |

Anuais (MAIZE 0.50, SOYBEAN 0.45, WHEAT 0.50, RICE 0.50 etc.) mantêm HI agronômico de
IPCC 2019 Refinement Vol 4 Ch 11 Tab 11.1A — inalterados pela decisão.

Somente alterou-se o que tinha justificativa forte: os cinco perenes lenhosos cujo HI
anterior representava fração da biomassa total (semântica incompatível com resíduo
anual). Valores com modelo de colheita coerente (pastagem, anuais) ficaram intactos.

### Regra de validação — fim ≥ início

Já implementada e preservada: em `_validate_assessment_input` (routhc/services.py),
todo ciclo anual é rejeitado com `fim deve ser posterior ou igual ao inicio` quando
`_month_index(fim_ano, fim_mes) < _month_index(inicio_ano, inicio_mes)`, i.e.
`fim_ano×12 + fim_mes ≥ inicio_ano×12 + inicio_mes` (ciclo de um único mês é válido).
Coberto por `test_invalid_annual_ranges_and_duplicates_rejected`.

### Fontes

- IPCC 2019 Refinement, Vol 4, Ch 11, Tab 11.1A/11.2 (HI/RAG de anuais e forrageiras).
- IPCC 2006 GL, Vol 4, Ch 11 (referência histórica de HI).
- Literatura de ciclagem de nutrientes em pomares tropicais (faixas de serapilheira e
  poda por cultura: cacau 2–3 t MS/ha/ano sem sombra; manga 3–4; abacate 2–3; citros
  2–3; liteira de palma forrageira < 1). Faixas citadas são valores típicos de
  literatura agronômica; a calibração adota o piso–meio por conservadorismo.
- Regime de deposição perene (entrada anual uniforme no passo mensal): prática padrão
  em RothC/FullCAM para entradas contínuas de liteira.

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
