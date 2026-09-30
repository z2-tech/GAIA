# 03 · Análise de produto e estrutura da página

Formato da skill `business-product-strategist`. O layout final vai para o Penpot
(mobile primeiro) antes do dev.

## Avaliação geral

É a única tela da GAIA que quem não é cliente vai ver. Quem escaneia não sabe o
que é a GAIA, não tem login, está no celular e decide em segundos se confia. Por
isso a página não pode ser um dashboard menor: ela responde **uma pergunta
primeiro** ("isto saiu mesmo da GAIA?") e só depois mostra os números. Um verificador
precisa conseguir ir mais fundo; um consumidor precisa entender sem ir.

## Problemas encontrados

- O pedido junta dois usos (conferir o PDF e QR no lote) com leitores e riscos
  diferentes. Uma página só atende os dois se a hierarquia for clara.
- "Mostrar o mapa da fazenda" e "página pública" se chocam: o polígono diz onde a
  fazenda fica, para qualquer pessoa.
- Projeto com 20 fazendas e lote que sai de uma fazenda: o QR do projeto mostraria
  a média do grupo, não o algodão daquele pacote.
- Sem status (válido, substituído, revogado), um QR colado em milhares de pacotes
  continua "provando" um número que o emissor já corrigiu.
- Sem aviso por módulo, a remoção vira "compensa a emissão" e o índice
  regenerativo vira "certificado" na leitura do consumidor.

## Oportunidades

- **Confiança em um olhar:** veredito no topo, como validador de diploma.
- **Terreno livre:** nenhuma plataforma agrícola de carbono pesquisada (Regrow,
  Agreena, Indigo, Cool Farm, Sustell) tem página pública por resultado; todas
  deixam a prova pública para registros de terceiros. O mais parecido é o Climate
  ID da ClimatePartner ([02](02-pesquisa.md)).
- **Material de venda para o Peterson:** a página é a vitrine pública do trabalho;
  bem feita, vende o próximo projeto.
- **Menos ida e volta com a Control Union:** código, data, hash e metodologia na
  mesma tela.
- **Prova real de integridade:** enviar o PDF e a página dizer "idêntico ao
  emitido" ou "diferente". É o que o ITI VALIDAR faz para documento assinado;
  página só com status não prova que o PDF não foi alterado.
- **Link para o verificador:** quando a Control Union verificar, a página aponta
  para a declaração dela. É o padrão de FSC, Verra e Provenance.
- **Dado para o emissor:** quantas vezes o QR foi escaneado mostra o valor da
  rastreabilidade para o cliente dele.

## Redesign sugerido: estrutura da página

Mobile primeiro (quase todo acesso vem da câmera do celular), uma coluna,
renderizada no servidor.

```
┌─────────────────────────────────────┐
│ GAIA                       PT | EN  │
├─────────────────────────────────────┤
│ ▣ Documento emitido pela GAIA       │  1. Veredito
│   em 30/09/2026                     │
│   Código 7K3F-92QD-M4XA-TR8P        │
│   [Válido]  [Autodeclarado]         │
├─────────────────────────────────────┤
│ Fazenda Boa Vista                   │  2. Identidade
│ Algodão · safra 2025/26             │
│ Luís Eduardo Magalhães, BA · 1.240 ha│
│ Emitido por: <empresa>              │
│ [ mapa, se permitido ]              │
├─────────────────────────────────────┤
│ EMISSÃO                             │  3. Números dos
│ 0,29 kgCO₂e por kg de algodão       │     módulos contratados
│ Do berço à porteira · autodeclarado │
│ ─────────────────────────────────── │
│ REMOÇÃO (estimativa)                │
│ +0,8 tCO₂e/ha/ano                   │
│ Modelado. Não é crédito de carbono  │
│ ─────────────────────────────────── │
│ REGENERATIVO                        │
│ 62% da área na faixa Bom            │
│ Índice GAIA v1. Não é certificação  │
├─────────────────────────────────────┤
│ Conferir um PDF                     │  4. Integridade
│ [ Selecionar arquivo ]              │
│ → Idêntico ao documento emitido     │
├─────────────────────────────────────┤
│ ▸ Detalhes técnicos                 │  5. Para o verificador
│   período, normas, versões, hash    │
│ ▸ O que é a GAIA                    │  6. Para quem não conhece
└─────────────────────────────────────┘
```

1. **Veredito:** "Documento emitido pela GAIA", data de emissão, código, dois
   selos: status do documento e status de verificação. Nada de check verde ou selo
   que pareça certificação enquanto não houver verificação externa (CONAR Anexo U,
   item 7; EmpCo).
2. **Identidade:** o que foi medido (fazenda ou projeto, cultura, safra), onde
   (município e UF), quem emitiu. Mapa conforme o que o emissor liberou.
3. **Números:** um bloco por módulo contratado (`Project.modules`), um número
   principal, uma frase de aviso. No projeto: número consolidado (ponderado) e
   "20 fazendas · 12.400 ha", com a lista se liberada.
4. **Conferir um PDF:** hash calculado no navegador, comparado com o do servidor.
5. **Detalhes técnicos** (fechado por padrão): período, fronteira, normas, versão
   do método e dos fatores, data e hora da emissão, SHA-256, link para o PDF se
   liberado.
6. **O que é a GAIA:** duas linhas e link para o site.

### Estados

| Estado | O que aparece |
|---|---|
| Válido | Neutro/azul. Tudo acima. Verde só quando verificado por terceira parte |
| Substituído | Amarelo: "Existe uma versão mais nova deste documento", link para ela. Números antigos visíveis e marcados como antigos |
| Revogado | Vermelho: "Este documento foi revogado pelo emissor em dd/mm". Sem números, como o diploma digital |
| Não encontrado | Neutro: "Código não encontrado. Confira os caracteres." Não diz se existiu |
| Rascunho | Não tem QR |

### Entrada manual

`/v` sem código: um campo "Digite o código do documento" (aceita com ou sem
hífens, maiúsculas ou minúsculas). Serve para quem tem o PDF impresso e não
consegue escanear.

## Fluxo do emissor

Nenhuma etapa nova no caso comum: o QR nasce com o PDF oficial (feature 02).

```
Gerar PDF oficial ──► documento GAIA-7K3F… criado ──► QR no fim do PDF
                             │
                             └─ Aba Documentos
                                 ├─ [Copiar link] [Baixar QR (PNG/SVG)] ← etiqueta do lote
                                 ├─ [Ver página pública]
                                 ├─ Escaneado 1.240 vezes
                                 └─ [Revogar] (pede motivo)
```

Na emissão, uma escolha curta, com padrão preenchido: **o que publicar** (nome da
fazenda, mapa, lista de fazendas, PDF para baixar).

## Hipóteses de trabalho

- **H1 · Um token por documento emitido,** o mesmo do PDF. Nada de página por
  projeto que lê o dado atual.
- **H2 · Documento de fazenda junto com o do projeto:** ao emitir o PDF do projeto,
  cada fazenda ganha um documento filho, com QR próprio. O lote leva o QR da
  fazenda de onde saiu; a página mostra aquela fazenda e "parte do projeto X".
  Quem escaneia um pacote não vê as outras 19 fazendas.
- **H3 · Mapa padrão = localização aproximada** (município, UF). Polígono só se o
  emissor liberar.

## Novos componentes

- **Faixa de veredito** com os quatro estados.
- **Selo de status** (Válido · Substituído · Revogado) e **selo de verificação**
  (Autodeclarado · Verificado por …), os mesmos do PDF.
- **Card de módulo** com número principal e aviso de uma linha.
- **Conferidor de arquivo** (arrastar ou escolher PDF; resultado inline).
- **Accordion** de detalhes técnicos.
- **Seletor de idioma** PT/EN.
- Na aba Documentos: **Baixar QR**, **contador de leituras**, **Revogar**.

## Melhorias no fluxo

- Zero cliques extras para ter o QR: vem com o PDF.
- Etiqueta pronta: QR em SVG com o código embaixo, para a gráfica.
- Página abre sem JS pesado: o número aparece antes de qualquer gráfico.
- Idioma pelo navegador, com troca manual (comprador estrangeiro).

## Microinterações

- Resultado da conferência do PDF com animação curta de check ou alerta.
- Copiar código com um toque.
- Skeleton só no mapa; o resto vem pronto do servidor.

## Impacto para o usuário

- Comprador e verificador confirmam o documento em segundos, sem pedir acesso.
- Consumidor entende o que está vendo e por que confiar, sem conhecer a GAIA.
- Emissor controla o que fica público e pode retirar um QR.
- Peterson ganha uma vitrine pública de cada projeto.

## Prioridade

- **Alta:** rota pública com token; veredito e status; números do snapshot por
  módulo contratado com avisos; entrada manual do código; revogação.
- **Média:** documento por fazenda (H2); o que publicar na emissão; conferência do
  PDF por hash; baixar QR para etiqueta; PT/EN.
- **Baixa:** contador de leituras; mapa com polígono; PDF para baixar na página;
  marca do cliente.

## Complexidade

- **Baixa:** rota `(public)/v/[token]` com layout próprio; `noindex`; entrada
  manual; baixar QR; hash no navegador.
- **Média:** view pública com throttle; exceção no `proxy.ts`; imagem do mapa no
  snapshot servida sem URL que expira; revogação e substituição.
- **Alta:** depende do documento emitido (02), do oficial (00) e do consolidado
  (05); documento por fazenda muda a emissão do 02; textos de aviso para
  consumidor precisam de revisão do Paulo.
