# 06 · Consolidado por módulo

Complementa o [01](01-entendimento.md) (regras de soma) e o [03](03-analise-produto.md)
(telas, que ficaram puxadas para a Emissão). Dados em
[../modulos-referencia.md](../modulos-referencia.md).

## Remoção (RothC)

**Como somar**

- Remoção anual do talhão = ganho médio anual (tCO₂e/ha/ano) × área do talhão.
  Fazenda e projeto = soma. Por hectare = soma ÷ área com cálculo.
- BAU e projeto somados à parte. **Adicionalidade** = Σ (projeto − BAU).
- Estoque médio de C (tC/ha): média ponderada por área, só como contexto.
- **Só somar a mesma janela de modelagem** (ou avisar). A janela não é gravada
  hoje; precisa passar a ser.
- Talhão sem área ou cálculo sem talhão: fica fora, e a cobertura mostra isso.
- Nunca abater da emissão. "Líquido" só como terceiro número rotulado.

**Bloco na fazenda e no projeto**

```
 REMOÇÃO (estimativa modelada, não é crédito)            cobertura: 8 de 14 talhões · 55% da área
 ┌ Projeto ──────────┐ ┌ BAU ─────────────┐ ┌ Diferença ─────────┐ ┌ Por hectare ────┐
 │ 1.210 tCO₂e/ano   │ │ 800 tCO₂e/ano    │ │ +410 tCO₂e/ano     │ │ 0,5 tCO₂e/ha/ano│
 └───────────────────┘ └──────────────────┘ └────────────────────┘ └─────────────────┘
 Talhões:  T-01  ●────────●  +0,9      (BAU ● ─── ● projeto, ordenado pela diferença)
           T-03     ●──────●  +0,6
           T-07  sem cálculo
```

**KPIs extras:** % de meses com solo coberto (média ponderada), aporte de biomassa,
taxa de adubação orgânica.

## Regenerativo

**Como resumir**

- Unidade: a avaliação **primária de cada fazenda** (é como o banco guarda hoje);
  se o produto quiser por talhão, depende do cálculo oficial (feature 0).
- **Principal: distribuição da área por faixa** (Bom, Atenção, Crítico). É como o
  mercado agrega (ROC, SAI FSA): por fração de área, não por média de notas.
- Apoio: nota média ponderada por área, e por seção.
- **Indicadores mais críticos do grupo:** quantas fazendas estão em Crítico em
  cada indicador. É o que diz onde agir.
- Não misturar fazendas com manejos diferentes sem aviso, por causa do denominador
  de pecuária.

**Bloco no projeto**

```
 REGENERATIVO (índice GAIA v1, autodeclarado)            cobertura: 11 de 12 fazendas
 Área por faixa   Bom ████████████████ 62%   Atenção ███████ 27%   Crítico ███ 11%
 Nota média ponderada: 64% · Atenção
 Por seção        Produção agrícola  71% Bom   Paisagem  48% Atenção   Impacto ambiental  39% Crítico …
 Onde agir        Redução de agrotóxicos sintéticos: 7 fazendas em Crítico
                  Faixas de proteção de corpos hídricos: 5 fazendas em Crítico
```

## Biodiversidade

**Como resumir**

- Avaliação é por talhão. Fazenda = média ponderada por área dos talhões (a
  confirmar) e distribuição por classificação.
- Projeto: % da área em baixa, média e alta; as 3 áreas (produção, pequena e grande
  não produtiva); perguntas com "Não" mais frequentes.
- Não somar notas; mostrar respondidas / total.

**Bloco no projeto**

```
 BIODIVERSIDADE (autoavaliação, não mede espécies)        cobertura: 20% da área
 Área por classificação   Alta ████ 18%   Média ██████████ 51%   Baixa ██████ 31%
 Por área                 Produção 58 · Pequena não produtiva 44 · Grande não produtiva 39
 Melhorias mais comuns    "…" (9 talhões) · "…" (7 talhões)
```

## Produto

O consolidado **por produto** só faz sentido para a Emissão (e, com cuidado, para a
Remoção da área que produziu aquele produto). Regenerativo e Biodiversidade são da
fazenda, não do produto: na visão de produto aparecem só como contexto ("fazendas
fornecedoras: 62 % da área em Bom").

## Visão geral do projeto (revisa o 03)

Uma linha de cobertura por módulo e um bloco por módulo, cada um com seu selo:
Emissão (tCO₂e, kgCO₂e/kg, hotspots) · Remoção (acima) · Regenerativo (acima) ·
Biodiversidade (acima). A tabela de fazendas ganha colunas de remoção anual, faixa
regenerativa e classificação de biodiversidade.
