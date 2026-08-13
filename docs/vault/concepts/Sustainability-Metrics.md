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
