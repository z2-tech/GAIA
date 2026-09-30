# Questionário: export Excel dos dados

**Propósito:** definir o que vai na planilha exportada da GAIA, para quem ela é e
como ela se organiza, antes de desenhar e desenvolver.

**De:** Henrique (Z2) · **Para:** Paulo Rocha e Ruan Carlos Oliveira ·
**Como as respostas serão usadas:** viram as regras do export e as tasks no Plane.
Sem resposta, seguimos com a sugestão da Z2.

## Contexto

Na reunião de 29/09, o Paulo pediu para "baixar os dados brutos, como se fosse a
planilha": num projeto de 20 fazendas, os insumos nas linhas, as fazendas nas
colunas, e os números. O auditor também vai baixar e precisa ver os fatores de
emissão usados.

Olhamos as planilhas de referência (LCA Annual Crops Tool, RothC, Biodiversidade,
EIQ, STIR). Nenhuma põe fazendas lado a lado: o LCA tool é um arquivo por cultura,
safra e talhão, com uma aba por categoria e o fator na mesma linha do insumo.
Nossa proposta junta os dois: abas e colunas iguais às do LCA tool, e uma coluna
por fazenda.

> **Proposta de planilha (a validar)**
>
> 1. **Sobre:** projeto, safra, quem exportou e quando, metodologia, legenda de cores.
> 2. **Resumo:** emissões por categoria × fazenda (fóssil, biogênico, remoções).
> 3. **Fazendas:** uma linha por fazenda com área, cultura, safra, colheita.
> 4. **Uma aba por categoria** (Fertilizantes, Defensivos, Sementes, Corretivos,
>    Combustíveis, Energia, Transporte, Solo): insumo, unidade, fator, fonte, e uma
>    coluna por fazenda com o total.
> 4a. **Remoção, Regenerativo e Biodiversidade:** abas próprias (entradas do
>    modelo e resultados BAU × projeto; 28 indicadores × fazendas; 43 perguntas ×
>    talhões). Ver 06-por-modulo.md e a seção M.
> 5. **Fatores de emissão:** todos os fatores usados, com fonte e versão.
> 6. **Dados em lista:** uma linha por valor, para filtrar e recalcular.
> 7. **Dicionário:** o que significa cada coluna.

## Como responder

Até a reunião de terça, 06/10. Uns 30 minutos. "Não sei" serve.

## A. Para que serve

### A1. Para que vocês vão usar a planilha? (pode marcar mais de uma)

Opções: conferir o que a equipe digitou · entregar ao cliente · entregar ao
auditor · análise própria (cruzar fazendas, achar outliers) · guardar uma cópia ·
levar para outra ferramenta.

>

### A2. Quem vai receber o arquivo? (pode marcar mais de uma)

Opções: equipe interna · cliente (produtor, trader, marca) · auditor · comprador.

>

### A3. Como é a planilha que vocês usam hoje quando o projeto tem muitas fazendas? Se puderem, mandem um exemplo.

>

### A4. Qual planilha é a referência mais próxima do que vocês querem?

Opções: LCA Annual Crops Tool · GHG Protocol Agrícola · uma planilha própria.

>

## B. O que vai na planilha

### B1. Quais módulos entram na primeira versão? (pode marcar mais de uma)

Opções: Emissão · Remoção · Regenerativo · Biodiversidade.
_Sugestão Z2: só Emissão na primeira versão; os outros em seguida._

>

### B2. Só os dados digitados, ou também os resultados?

Opções: só dados digitados · dados + resultado total · dados + resultado por
categoria (como a aba Total_Agro).
_Sugestão Z2: dados + resultado por categoria._

>

### B3. Os fatores de emissão entram?

Opções: sempre · só no arquivo do auditor · não.
_Sugestão Z2: sempre. Importante: hoje a plataforma só consegue mostrar o fator
atual; o fator exato usado em cada cálculo passa a ser guardado com a feature do
cálculo oficial._

>

### B4. Quais dados da fazenda devem aparecer? (pode marcar mais de uma)

Opções: nome da fazenda · nome do produtor · município e UF · área total ·
área agrícola · textura do solo · clima · cultura e safra · montante colhido.

>

### B5. Localização da fazenda entra?

Opções: não · só município e UF · coordenadas · polígono.
_Sugestão Z2: só município e UF. Coordenadas junto com nome identificam o
produtor (LGPD)._

>

### B6. Notas fiscais e outros arquivos de evidência anexados: o que aparece?

Opções: nada · só o nome do arquivo · link que exige login na GAIA.

>

### B7. Simulações entram?

Opções: só o cálculo oficial · oficial e simulações em aba separada.
_Sugestão Z2: só o oficial._

>

## C. Como a planilha se organiza

### C1. O que é cada coluna?

Opções: uma fazenda · um talhão · uma cultura/safra · fazenda com talhões
agrupados embaixo.

_Por que importa: uma fazenda tem vários talhões, culturas e safras._

>

### C2. Quando uma fazenda tem mais de uma cultura ou safra no período, o que fazer?

Opções: uma coluna por cultura/safra dentro da fazenda · somar tudo na fazenda ·
uma aba por safra.

>

### C3. Os valores saem por hectare ou total da fazenda?

Opções: total da área · por hectare · os dois.
_Sugestão Z2: total na matriz (soma certo entre talhões), por hectare na aba em
lista. Somar "kg/ha" de talhões diferentes dá número errado._

>

### C4. Unidades: como o usuário digitou ou padronizadas?

Opções: padronizada por aba (ex.: tudo em kg) · como foi digitado · os dois.
_Sugestão Z2: padronizada na matriz, a digitada na aba em lista._

>

### C5. Uma aba por categoria (como o LCA tool) ou tudo numa aba só?

Opções: uma aba por categoria · tudo numa aba, com blocos.

>

### C6. Querem também a aba "Dados em lista" (uma linha por valor, para filtrar e recalcular)?

Opções: sim · não.

>

### C7. Manter as cores do LCA tool (dado do produtor, dado fixado, resultado)?

Opções: sim · não.

>

## D. Quem pode exportar e o quê

### D1. De onde se exporta? (pode marcar mais de uma)

Opções: do projeto inteiro · de uma fazenda · de um talhão.

>

### D2. Precisa filtrar antes de exportar? (pode marcar mais de uma)

Opções: por safra · por fazendas escolhidas · por módulo · não precisa filtrar.

>

### D3. Quem pode exportar? (pode marcar mais de uma)

Opções: admin do projeto · gestor · técnico · auditor · cliente.

>

### D4. Precisa de uma versão sem identificação (fazendas como "Fazenda 1, 2, 3")?

_Por que importa: útil para mandar a terceiros. Pela LGPD, isso ainda é dado
pessoal se existir a tabela de correspondência._

>

### D5. Se um cálculo estiver desatualizado (dados mudaram depois do último cálculo), o que fazer?

Opções: exportar com aviso na célula · bloquear até recalcular · exportar sem aviso.

>

### D6. Se um talhão não tiver cálculo oficial, o que fazer?

Opções: deixar a coluna vazia com aviso · usar o cálculo mais recente · não
permitir exportar.

>

## E. Formato do arquivo

### E1. Formato?

Opções: só Excel (.xlsx) · Excel e CSV.
_Sugestão Z2: só .xlsx. CSV no Excel em português costuma abrir com números e
acentos quebrados._

>

### E2. Idioma?

Opções: português · português e inglês (escolher na hora) · inglês.

>

### E3. No futuro, querem editar a planilha e subir de volta na GAIA?

_Por que importa: se sim, o layout precisa ser pensado para reimportação desde já._

>

## M. Remoção, Regenerativo e Biodiversidade

### M1. Remoção: incluir o clima mensal usado pelo modelo (temperatura e chuva)?

Opções: sim · não.

>

### M2. Remoção: incluir os resultados mês a mês?

_Pode passar de 10 mil linhas num projeto grande._

Opções: sim, em aba opcional · não, só o resumo.

>

### M3. Remoção: qual estoque de carbono mostrar?

_Hoje a tela mostra a média do período modelado, não o estoque no fim._

Opções: estoque médio do período · estoque no fim do período · os dois.
_Sugestão Z2: os dois._

>

### M4. Remoção: incluir data, laboratório e método da análise de solo (SOC inicial)?

_Hoje a plataforma não guarda isso; o verificador costuma pedir._

Opções: sim, passar a guardar · não precisa.
_Sugestão Z2: sim, passar a guardar._

>

### M5. Regenerativo: o que mostrar em cada indicador?

Opções: a opção escolhida (texto) · os pontos · os dois.
_Sugestão Z2: os dois._

>

### M6. Regenerativo: cada coluna é uma fazenda (avaliação primária) ou um talhão?

Opções: fazenda · talhão.

>

### M7. Biodiversidade: cada coluna é um talhão ou a fazenda?

_A avaliação é feita por talhão._

Opções: talhão · fazenda (média ponderada por área) · os dois.

>

### M8. Regenerativo e Biodiversidade: incluir quem respondeu e quando?

Opções: sim · não.
_Sugestão Z2: sim._

>

## F. Pontos que achamos nas planilhas

### F1. No LCA Annual Crops Tool, a célula Total_Agro!D18 (semente, biogênico) puxa o CO₂ biogênico do combustível, que aparece duas vezes no total. É erro da planilha?

_Por que importa: se for, precisamos checar se a plataforma herdou isso._

>

### F2. A plataforma usa GWP do AR6; a ferramenta GHG Protocol Agrícola usa AR4. Isso deve aparecer explicado na planilha?

>

### F3. Algo que não perguntamos e deveríamos saber?

>
