# Questionário: QR code e página pública de verificação

**Propósito:** definir o que a página do QR code mostra, para quem, e o que
acontece quando o documento muda. É a pendência de vocês desde 29/09.

**De:** Henrique (Z2) · **Para:** Paulo Rocha e Ruan Carlos Oliveira ·
**Como as respostas serão usadas:** viram o layout da página no Penpot e as tasks.
Sem resposta, seguimos com a sugestão da Z2.

## Contexto

Cada PDF oficial ganha um código próprio e um QR. Quem escaneia cai numa página
pública da GAIA, sem login, que confirma que o documento foi emitido pela
plataforma e mostra os números **do momento da emissão**, não o dado atual. Se o
cálculo mudar depois, o PDF e a página continuam batendo.

A mesma página atende dois usos: o comprador ou a Control Union conferindo um PDF,
e o consumidor escaneando o QR colado no lote. Por isso ela começa pelo veredito e
só depois mostra os números.

> **Proposta da página (a validar)**
>
> 1. Veredito: "Documento emitido pela GAIA", data de emissão, código, status (válido,
>    substituído, revogado) e selo de verificação.
> 2. Identidade: fazenda ou projeto, cultura, safra, município e UF, quem emitiu,
>    mapa se liberado.
> 3. Um bloco por módulo contratado: um número principal e uma frase de aviso.
> 4. Conferir um PDF: envia o arquivo e a página diz se é idêntico ao emitido.
> 5. Detalhes técnicos (fechado): período, normas, versões, hash.
> 6. O que é a GAIA, em duas linhas.

A regra de substituição (o que acontece com o documento antigo quando se gera
outro) vem da pergunta 12 do questionário do PDF.

## Como responder

Até terça, 06/10. Uns 15 minutos.

## P. Para quem e para quê

### 1. Quem vai escanear o QR? (pode marcar mais de uma)

Opções: comprador ou trader · verificador (Control Union) · consumidor final ·
banco ou investidor · cliente do Peterson.

>

### 2. O QR vai ser colado no produto ou no lote?

Opções: só no PDF · no PDF e no lote · ainda não sabemos.

>

### 3. De que nível é o QR?

_um lote sai de uma fazenda. O QR do projeto mostraria a média
das 20 fazendas, não a daquele pacote._

Opções: projeto · fazenda · os dois (ao emitir o projeto, cada fazenda ganha um QR
próprio).
_Sugestão Z2: os dois._

>

### 4. A estrutura proposta acima faz sentido?

Opções: sim · sim, com ajustes (dizer no comentário) · não.

>

### 5. Precisam baixar o QR sozinho (PNG ou SVG) para imprimir em etiqueta?

Opções: sim · não.
_Sugestão Z2: sim._

>

## C. O que aparece

### 6. Quais módulos aparecem na página?

Opções: só os contratados no projeto · todos que tiverem cálculo · só a Emissão.
_Sugestão Z2: só os contratados._

>

### 7. Na Emissão, qual é o número principal?

Opções: kgCO₂e por kg do produto · total em tCO₂e · os dois.
_Sugestão Z2: por kg em destaque; o total nos detalhes._

>

### 8. Como mostrar o mapa da fazenda?

_a página é pública. O contorno da fazenda mostra a qualquer
pessoa onde ela fica exatamente._

Opções: contorno da fazenda · só município e UF · sem mapa · o emissor escolhe na
hora de gerar.
_Sugestão Z2: o emissor escolhe; padrão município e UF._

>

### 9. O que pode aparecer publicamente? (pode marcar mais de uma)

Opções: nome da fazenda · nome do produtor · município e UF · área (ha) · cultura e
safra · empresa que emitiu · lista das fazendas do projeto.

>

### 10. A página deixa enviar o PDF para conferir se é idêntico ao emitido?

_Como o validador do diploma digital do MEC. O arquivo não sai do navegador._

Opções: sim · depois · não.
_Sugestão Z2: sim._

>

### 11. O PDF completo fica disponível para baixar na página?

Opções: sim · não · o emissor escolhe.
_Sugestão Z2: o emissor escolhe._

>

## S. Status e confiança

### 12. A página mostra se o resultado foi verificado?

_"Autodeclarado" até a Control Union verificar; depois, "Verificado por Control
Union em dd/mm"._

Opções: sim · não.
_Sugestão Z2: sim._

>

### 13. O emissor pode revogar um QR?

_QR colado em milhares de pacotes não sai do pacote. Revogar é o
único jeito de tirar um número errado de circulação._

Opções: sim · não.
_Sugestão Z2: sim._

>

### 14. Quando revogado, a página mostra…

Opções: só "revogado" e a data · "revogado", a data e o motivo · "revogado" e os
números antigos marcados.
_Sugestão Z2: só "revogado" e a data._

>

### 15. O documento vence?

Opções: não vence, mostra o período (safra) que cobre · vale 1 ano · vale 2 anos.

>

## A. Aparência

### 16. Idioma da página?

Opções: português · português e inglês (visitante troca).
_Sugestão Z2: português e inglês. O comprador pode ser de fora._

>

### 17. Marca na página?

Opções: igual à do PDF · só GAIA · GAIA + empresa que emitiu.

>

### 18. O emissor quer ver quantas vezes o QR foi escaneado?

Opções: sim · depois · não.
_Sugestão Z2: depois._

>

## M. Remoção, Regenerativo e Biodiversidade

### M1. A Remoção aparece na página pública?

_consumidor não lê metodologia. "+0,8 tCO₂e/ha/ano" ao lado da
pegada pode ser lido como compensação._

Opções: sim, com aviso "estimativa de modelo, não é crédito de carbono" · só no
PDF · não.
_Sugestão Z2: sim, com aviso._

>

### M2. Regenerativo: como aparece?

Opções: faixa (Bom, Atenção, Crítico) e % da área em Bom · nota em % · não aparece.
_Sugestão Z2: faixa e % da área. Nunca "fazenda regenerativa"._

>

### M3. Biodiversidade entra na página agora?

_A tela de Biodiversidade ainda está em construção._

Opções: sim · depois.
_Sugestão Z2: depois._

>

### M4. Os avisos curtos por módulo podem ir como estão?

_Emissão: "Pegada do berço à porteira da fazenda, autodeclarada, calculada pela GAIA conforme ISO 14067. Não
verificada por terceira parte." · Remoção: "Estimativa de modelo (RothC). Não é
crédito de carbono e não compensa a pegada." · Regenerativo: "Índice interno GAIA,
autodeclarado. Não é certificação nem selo."_

Opções: sim · com ajustes (comentário) · não.
_Sugestão Z2: sim._

>

## R. Referências

### R1. Quais plataformas com QR vocês querem como referência?

_Na reunião apareceram Regrow, "Puma", "CR" e "Farm…". Pesquisamos: a Regrow não
tem página pública; "CR" deve ser o Cargill RegenConnect (usa a Regrow); "Puma" e
"Farm…" não achamos. O mais parecido foi o Climate ID da ClimatePartner e o
SouABR da ABRAPA. Nomes e links, se tiverem._

>

### 19. Algo mais?

>
