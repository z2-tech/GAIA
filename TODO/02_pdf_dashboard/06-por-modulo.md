# 06 · PDF por módulo

Complementa o [03](03-analise-produto.md). As normas de pegada (ISO 14067, GHG
Protocol Product) valem só para a Emissão. Remoção, Regenerativo e Biodiversidade
têm regras próprias, resumidas em [../modulos-referencia.md](../modulos-referencia.md).

## Emissão

Como no 03: kgCO₂e/kg e tCO₂e; fóssil, biogênico e mudança de uso do solo
separados; de onde vem a emissão; alocação; metodologia ISO 14067; aviso de
limitações e de comparação entre produtos.

## Remoção (RothC)

**Página(s) da Remoção**

1. **Números principais:** ganho médio anual do projeto (tCO₂e/ha/ano), diferença
   contra o BAU (tCO₂e/ha), remoção anual total (tCO₂e/ano, se houver área),
   estoque médio de C BAU × projeto.
2. **Gráfico:** estoque de C ao longo da janela, BAU × projeto (o mesmo do
   dashboard, estático).
3. **O que entrou no modelo:** SOC inicial, argila, profundidade, janela, culturas
   por cenário, compostos, fonte do clima (Open-Meteo; meses futuros pela média).
   Isso é o que o verificador pede (VM0042/VMD0053).
4. **Por fazenda/talhão:** tabela com ganho anual, diferença contra BAU, área,
   cobertura.
5. **Aviso padrão (obrigatório):** "Estimativa modelada (RothC), não verificada por
   terceira parte. Não é crédito de carbono, não é remoção reportável sob o GHG
   Protocol sem monitoramento contínuo e não sustenta alegação de neutralidade. Sem
   dedução de incerteza nem reserva para reversão. O carbono pode ser perdido se o
   manejo mudar."

**Regras**

- Remoção **nunca** é subtraída da emissão na capa nem nos totais. Se houver
  "líquido", aparece como terceiro número, rotulado.
- Nada de "neutro", "carbono positivo" ou "compensa".
- O código de verificação (QR) aponta para o snapshot com as entradas e a versão do
  modelo.

## Regenerativo

**Página do Regenerativo**

1. **Nota geral e faixa** (Bom, Atenção, Crítico), com a versão do índice.
2. **As 5 seções** em barras com as faixas ao fundo.
3. **Pontos fortes e pontos de atenção:** indicadores em Bom e em Crítico, em
   texto (como o Biodiversity Performance Tool faz). Mais útil que um número
   isolado.
4. **Contexto:** manejo, clima e solo, chuva, irrigação.
5. **No PDF do projeto:** distribuição da área por faixa ("62 % da área em Bom")
   em vez de só a média.
6. **Aviso padrão:** "Índice interno GAIA (versão X), autodeclarado. Não é
   certificação nem selo."

**Regras de linguagem**

- Não escrever "fazenda regenerativa" ou "produto regenerativo" (UE/EmpCo, CONAR,
  SAI FSA). Usar "X % da área na faixa Bom do índice GAIA v1, em [data]".
- Se a fazenda é só de lavoura, avisar que a nota inclui pontos de pecuária até o
  cálculo ser corrigido.

## Biodiversidade

**Página da Biodiversidade**

1. **Nota e classificação** (baixa, média, alta) e as 3 áreas (produção, pequena e
   grande área não produtiva).
2. **Pontos fortes e melhorias:** perguntas com "Sim" e com "Não" mais relevantes.
3. **Respondidas / total**, para mostrar completude.
4. **Aviso padrão:** "Autoavaliação de práticas que indica potencial de
   biodiversidade. Não mede espécies nem impacto e não é uma avaliação TNFD."

## Capa do PDF do projeto (revisa o 03)

Os números da capa ficam em blocos separados por módulo, cada um com seu selo:

```
 EMISSÃO                REMOÇÃO (estimativa)     REGENERATIVO           BIODIVERSIDADE
 0,29 kgCO₂e/kg soja    +0,8 tCO₂e/ha/ano        62% da área em Bom     Média (58)
 11.140 tCO₂e           vs BAU                   índice GAIA v1         autoavaliação
 Autodeclarado          Modelado, não é crédito  Não é certificação     Não mede espécies
```
