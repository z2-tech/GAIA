# Questionário: consolidado e comparação ampliada

**Propósito:** definir o que o consolidado por fazenda, produto e projeto mostra, e
como a comparação funciona com até 20 itens.

**De:** Henrique (Z2) · **Para:** Paulo Rocha e Ruan Carlos Oliveira ·
**Como as respostas serão usadas:** viram as regras e as telas das features 05
(consolidado) e 06 (comparação ampliada). Sem resposta, seguimos com a sugestão
da Z2.

A mesma lista está na página interativa (link no README).

## Contexto

Hoje cada talhão tem o resultado de cada cálculo, mas a fazenda e o projeto só
mostram quanto está preenchido. Queremos mostrar o resultado somado por fazenda,
por produto (ex.: a soja de todas as fazendas) e por projeto. E a comparação, que
hoje aceita 4 itens, vai aceitar até 20.

Uma regra que vamos seguir: soma-se o total (tCO₂e, hectares, kg) e a intensidade
é o total dividido pelo total. Ex.: duas fazendas, uma com 100 t de soja a 0,2 e
outra com 900 t a 0,4, dão 0,38 kgCO₂e/kg, não 0,30 (média simples).

Isso vale para os quatro módulos (Emissão, Remoção, Regenerativo,
Biodiversidade), cada um com sua regra de soma. A seção M trata dos três últimos.

## Como responder

Até terça, 06/10. Uns 25 minutos. "Não sei" serve.

## K. Consolidado

### K1. Quais níveis mais importam? (pode marcar mais de uma)

Opções: fazenda · produto · projeto.

>

### K2. Quem olha o consolidado e para quê? (pode marcar mais de uma)

Opções: equipe (acompanhar o projeto) · cliente (ver o resultado dele) · comprador
(pegada do produto) · auditor.

>

### K3. Qual é o número principal de um projeto?

Opções: emissão total (tCO₂e) · intensidade (kgCO₂e/kg de produto) · emissão por
hectare · líquido (emissão − remoção) · nota regenerativa.

>

### K4. Quando vocês falam "média das fazendas", é qual?

Opções: ponderada pela produção ou área (total ÷ total) · média simples.
_Sugestão Z2: ponderada. A simples dá o mesmo peso a uma fazenda de 50 ha e a uma
de 5.000 ha._

>

### K5. Como mostrar emissão, remoção e líquido?

Opções: os três separados · só emissão e remoção · só o líquido.
_Sugestão Z2: os três separados, líquido rotulado. A norma do GHG Protocol para
agro exige emissão e remoção separadas._

>

### K6. A remoção entra como?

Opções: ganho anual (tCO₂e/ano) · variação total no período · estoque médio.

>

### K7. Mostrar a diferença da remoção contra o cenário BAU (o que o projeto adiciona)?

Opções: sim · não.

>

### K8. O que é "produto" no consolidado?

Opções: a cultura colhida (soja grão, milho grão) · derivados (farelo, óleo) · os dois.
_Hoje a plataforma trata farelo e óleo como produto e o grão como cultura._

>

### K9. No consolidado por produto, qual alocação usar?

Opções: sempre massa · o usuário escolhe · mostrar as três.
_A alocação pode mudar a pegada de um derivado em várias vezes; só dá para somar
fazendas com o mesmo método._

>

### K10. Período do consolidado?

Opções: uma safra por vez · pode misturar safras com aviso · último cálculo de cada
talhão.

>

### K11. Se só parte dos talhões tem cálculo, o que mostrar?

Opções: o número com a cobertura ao lado ("86% da área") · esconder abaixo de um
mínimo (qual?) · só mostrar com 100%.

>

### K12. Regenerativo e Biodiversidade no projeto: como resumir?

Opções: média ponderada por área · só a distribuição (quantas fazendas em Bom,
Atenção, Crítico) · os dois.

>

### K13. Mostrar de onde vem a emissão (fertilizante, diesel, N₂O do solo…) no consolidado?

Opções: sim · não.

>

### K14. Existe alguma referência externa para comparar (média nacional, Embrapa, meta de cliente)? Qual?

>

### K15. O consolidado do projeto é o que vai no PDF e na página do QR?

Opções: sim · só parte dele · não.

>

## M. Remoção, Regenerativo e Biodiversidade

### M1. Remoção: talhões com períodos de modelagem diferentes podem ser somados?

Opções: não, exigir o mesmo período · sim, com aviso.
_Sugestão Z2: não, exigir o mesmo período._

>

### M2. Regenerativo no consolidado: qual o número principal?

_O mercado (ROC, SAI) agrega por % da área em cada faixa, não por média de notas._

Opções: % da área em cada faixa · nota média ponderada · os dois.
_Sugestão Z2: % da área em cada faixa._

>

### M3. Regenerativo: a unidade é a avaliação principal da fazenda ou cada talhão?

Opções: fazenda · talhão.

>

### M4. Regenerativo: mostrar "onde agir" (indicadores com mais fazendas em Crítico)?

Opções: sim · não.
_Sugestão Z2: sim._

>

### M5. Regenerativo: fazenda só de lavoura tem os 22 pontos de pecuária no total, o que baixa a nota. Corrigir?

Opções: sim, tirar pecuária quando não se aplica · não, é proposital.
_Sugestão Z2: sim, tirar pecuária quando não se aplica._

>

### M6. Biodiversidade: a nota da fazenda é a média ponderada dos talhões?

Opções: sim · não, só a distribuição.

>

### M7. Comparação da Remoção: métrica padrão?

Opções: ganho anual do projeto · diferença contra o BAU · estoque médio.

>

### M8. Comparação do Regenerativo: comparar a mesma fazenda ao longo do tempo (antes × depois)?

Opções: sim · não.

>

### M9. Biodiversidade na comparação?

_Hoje não existe tela de comparação de Biodiversidade._

Opções: agora · depois.

>

## P. Comparação

### P1. Quantos itens no máximo?

Opções: até 10 · até 20 · sem limite.
_Acima de 20 sugerimos filtrar e ranquear, não comparar item a item._

>

### P2. O que vocês mais comparam? (pode marcar mais de uma)

Opções: talhões · fazendas · projetos · safras do mesmo talhão.

>

### P3. Com muitos itens, como ver?

Opções: ranking com gráfico e tabela · só gráfico · cartões lado a lado como hoje.
_Na reunião o Paulo sugeriu "só gráfico" com muitos itens._

>

### P4. Pode comparar níveis misturados (uma fazenda contra um talhão)?

Opções: sim · não.

>

### P5. Selecionar em lote (todos os talhões de uma fazenda ou todas as fazendas de um projeto)?

Opções: sim · não.
_Hoje é um talhão por vez._

>

### P6. Destacar alguns itens (1 a 3 coloridos, o resto em cinza)?

Opções: sim · não.

>

### P7. Qual métrica aparece primeiro?

Opções: por hectare · por kg de produto · total.

>

### P8. Mostrar a faixa de referência (média e faixa central) de todos os cálculos que o usuário pode ver?

Opções: sim · não.
_Só aparece com 5 ou mais cálculos, sem identificar ninguém._

>

### P9. Simulações podem entrar na comparação?

Opções: sim, marcadas como simulação · não, só oficiais.

>

### P10. Exportar a comparação para Excel?

Opções: sim · não.

>

### P11. No celular, a comparação precisa existir?

Opções: ranking de uma métrica · não precisa.

>

### P12. Algo que não perguntamos e deveríamos saber?

>
