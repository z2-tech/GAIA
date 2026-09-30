# 06 · Export por módulo

Complementa o [03](03-analise-produto.md), que detalhou a Emissão. Dados e
normas de cada módulo em [../modulos-referencia.md](../modulos-referencia.md).

## Princípio comum

Todos os módulos seguem o mesmo padrão da Emissão: **itens nas linhas, unidades
(talhões agrupados por fazenda) nas colunas**, cabeçalho em duas linhas (fazenda em
cima, talhão embaixo), colunas fixas à esquerda com unidade e fonte, e a mesma
legenda de cores (dado digitado, dado fixado, resultado). Cada módulo também entra
na aba "Dados em lista" (formato longo) e no Dicionário.

| Módulo | Abas | Coluna = | Linha "Total da fazenda" |
|---|---|---|---|
| Emissão | uma por categoria de insumo | talhão/cultura | Soma (kg, L, MWh) |
| Remoção | Entradas · Culturas e compostos · Resultados · (Clima) · (Mensal) | talhão | Soma em tCO₂e/ano; médias ponderadas por área |
| Regenerativo | Regenerativo | fazenda (primária) ou talhão | Não soma; nota por unidade |
| Biodiversidade | Biodiversidade | talhão | Não soma; nota por unidade |

## Remoção (RothC)

**Remoção · Entradas** (itens × talhões)

```
                               Unid.    Fonte          Faz. Boa Vista      Faz. Ipê
                                                        T-01     T-03      T-02
 SOC inicial                   tC/ha    usuário         42,0     38,5      51,2
 Data / laboratório / método   —        (não existe hoje)
 Argila                        %        usuário         35       28        41
 Profundidade da camada        cm       usuário         30       30        20
 Janela de modelagem           mês/ano  usuário         01/2025–12/2034  …
 Tipo de entrada (BAU)         —        usuário         Produtividade + cultura …
 Tipo de entrada (projeto)     —        usuário         Biomassa  …
 Solo coberto (meses, projeto) %        calculado       75       58        …
 Clima                         —        Open-Meteo      temperatura e chuva mensais; futuro = média climatológica
```

**Remoção · Culturas e compostos** (lista, não matriz): fazenda, talhão, cenário
(BAU/projeto), cultura, produtividade (t/ha fresca), início, fim; compostos: ano,
mês, C orgânico (kg C/ha), material.

**Remoção · Resultados** (métricas × talhões)

| Métrica | Unidade | Observação |
|---|---|---|
| Estoque de C médio da janela, BAU e projeto | tC/ha | É média, não estoque final |
| Estoque de C no fim da janela, BAU e projeto | tC/ha | Último `total_oc`; a confirmar (pergunta M3) |
| Diferença projeto − BAU | tC/ha e tCO₂e/ha | Existe no backend, não aparece na tela |
| Ganho médio anual, BAU e projeto | tC/ha/ano e tCO₂e/ha/ano | |
| Área do talhão | ha | Necessária para o total |
| Remoção anual do talhão (projeto) | tCO₂e/ano | Ganho anual × área |

**Opcionais (perguntas M1, M2):** aba de clima mensal por talhão e aba mensal com
pools do modelo (1 linha por mês × cenário; pode passar de 10 mil linhas).

**Parâmetros do modelo** (na aba "Fatores e parâmetros"): versão do RothC e do
motor GAIA, constantes de decomposição (DPM 10, RPM 0,3, BIO 0,66, HUM 0,02),
tabela DPM/RPM por tipo de planta, fonte do clima.

**Avisos na aba:** estimativa modelada; sem incerteza; janela não fica gravada
(reconstruída dos resultados); remoção não abate a emissão.

## Regenerativo

**Regenerativo** (indicadores × fazendas)

```
                                            Máx.   Faz. Boa Vista         Faz. Ipê
 CONTEXTO
 Manejo                                     —      Agricultura            Agricultura + Pecuária
 Clima e solo · Chuva · Irrigação           —      Tropical · >1475 · Não …
 PRODUÇÃO AGRÍCOLA REGENERATIVA
 Cobertura do solo                          4      "Cobertura >75%" · 4   "…" · 2
 Plantio direto                             5      …
 …
 Seção (pontos · % · faixa)                 51     42 · 82% · Bom         27 · 53% · Atenção
 MANEJO DA PAISAGEM … IMPACTO AMBIENTAL … COMUNIDADE … MANEJO PECUÁRIO
 NOTA GERAL (pontos · % · faixa)            107    69 · 64% · Atenção     …
 Avaliação usada / data / respondido por           Primária · 12/08/2026 · autodeclarado
```

- Cada célula mostra a opção escolhida e os pontos (pergunta M4).
- Faixa escrita em texto (Bom, Atenção, Crítico), não só cor.
- **Aviso:** fazenda só de lavoura tem os 22 pontos de pecuária no denominador
  (problema do cálculo, ver referência). Registrar até ser corrigido.
- "Índice interno GAIA, autodeclarado; não é certificação."

## Biodiversidade

**Biodiversidade** (perguntas × talhões)

```
                                            Faz. Boa Vista      Faz. Ipê
                                            T-01     T-03       T-02
 ÁREA DE PRODUÇÃO (13)
 1. …                                       Sim      Não        Sim
 …
 Nota da área                               62       46         …
 PEQUENA ÁREA NÃO PRODUTIVA (12) … GRANDE ÁREA NÃO PRODUTIVA (18) …
 NOTA GERAL · classificação                 58 · média  41 · média  …
 Respondidas / total                        43/43    39/43
```

- Célula vazia = não respondida (não é "Não").
- **Aviso:** nota geral usa as respondidas; nota da área usa todas. Com respostas
  faltando, não batem.
- "Autoavaliação de potencial de biodiversidade; não mede espécies."

## Fases (revisa o 05-rascunho-tasks)

- Fase 1: Emissão **e** Regenerativo (dados simples, alto valor para conferência).
- Fase 2: Remoção (Entradas, Culturas, Resultados) e Biodiversidade.
- Fase 3: abas opcionais de clima e mensal da Remoção.

A ordem é sugestão; a pergunta B1 do questionário decide.
