---
tags: [concept]
---

# Sustainability-Metrics

GAIA's sustainability assessment framework currently tracks seven modules.

## Modules

| Módulo | Status | Descrição |
|--------|--------|-----------|
| **LCA** (Carbono Emissão) | ⚠️ Engine não validada | Cálculo executável; metodologia, fatores versionados e vetores científicos ainda ausentes. |
| **RothC** (Carbono Remoção) | ⚠️ Engine não validada | Implementação Python executável; guia oficial RothC-26.3 e código Fortran canônico (Apache 2.0) com golden vectors de 70 anos disponíveis. Validação cruzada desbloqueada. |
| **Regenerativo** | ✅ Implementado | Avaliação de agricultura regenerativa — indicadores ponderados, dashboard de scores. |
| **BAT** (Biodiversidade) | ⚠️ Parcial | Biodiversity Assessment Tool — questionário de biodiversidade (43 questões). UI parcial no gaia-web. Planilha de referência: `Biodiversity Assessment Tool Prototype_Final.xlsx` |
| **EIQ** (Impacto Ambiental) | 📋 Planejado | Environmental Impact Quotient — avaliação de risco de pesticidas. 631 nomes preenchidos na planilha `EIQ_Final.xlsx`. |
| **STIR** (Manejo do Solo) | 📋 Planejado | Soil Tillage Intensity Rating — calculadora de intensidade de preparo do solo. Biblioteca de implementos (PT-BR). Planilha: `STIR_calculadora_metric_v4.xlsx` |
| **CFP** (Cool Farm Platform) | ⚠️ Parcial | Integração com Cool Farm Tool — payload-only, API externa pendente. |

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
