# 06 · Auditor por módulo

Complementa o [03](03-analise-produto.md). Base: [../modulos-referencia.md](../modulos-referencia.md).
Em todos: o auditor vê só o cálculo **oficial** de cada talhão, somente leitura.

## Emissão (LCA)

**Rastro do cálculo**

- Uma linha por insumo: dado informado (quantidade e unidade), fator, unidade do
  fator, fonte do fator, emissão resultante.
- Separado por fonte (fertilizante, calcário, defensivo, semente, combustível,
  energia, transporte, mudança de uso do solo) e por fóssil, biogênico e mudança
  de uso do solo.
- Produção declarada e a divisão que dá o kgCO₂e/kg; alocação usada.

**O que falta no código**

- Fator guardado no resultado só para fertilizante, defensivo, semente e energia.
  Nos demais o rastro mostraria o fator **atual** do catálogo.
- `source` não existe em todos os catálogos (fertilizante não tem).
- Unidade de combustível ignorada no cálculo (`lca/calculations/fuel.py:88-98`).
  O auditor vai achar. Corrigir antes de abrir a auditoria.

## Remoção (RothC)

**O que o verificador pede** (VM0042/VMD0053, ISO 14064-2):

- SOC inicial com data, laboratório, método e profundidade.
- Argila, profundidade da camada, latitude.
- Clima: fonte (Open-Meteo), período, e que meses futuros usam a média
  climatológica.
- Culturas por cenário (BAU e projeto), produtividade, resíduos, compostos,
  cobertura do solo mês a mês.
- Definição do BAU, janela de modelagem, versão do modelo.

**O que falta no código**

- Janela de modelagem não gravada (`rothc/serializers.py:277-280`).
- Nada guarda laboratório, método ou data da análise de solo.
- Delta BAU × projeto calculado de dois jeitos (`comparison/selectors.py:136` vs
  `rothc/services.py:1807`). O auditor vê números diferentes em telas diferentes.

## Regenerativo

- Contexto (manejo, clima e solo, chuva, irrigação) e resposta de cada um dos 28
  indicadores, com pontos obtidos e disponíveis.
- Versão do índice e das faixas.
- É autodeclarado: sem evidência anexada, o auditor só confere coerência.
- **Problema a corrigir antes:** fazenda só de lavoura tem os 22 pontos de
  pecuária no denominador (`regenerative/selectors.py:126-135`).

## Biodiversidade

- As 43 respostas sim/não por área, score geral e por seção.
- **Problemas a corrigir antes:**
  - Auditor cria e cancela avaliação (`biodiversity/views.py:105-106`, `:225-226`).
  - Denominador do geral ≠ das seções (`biodiversity/services.py:35-48` vs
    `:170-216`).

## Qual módulo a Control Union verifica?

Não sabemos. Pegada de produto (ISO 14067) é o serviço mais comum; carbono no solo
(VM0042) é outro processo, mais pesado. Regenerativo e Biodiversidade são
autodeclarados e não têm norma. Está no questionário (M1).
