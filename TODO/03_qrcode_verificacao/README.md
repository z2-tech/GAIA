# 03 · QR code e página pública de verificação

Feature 3 do [escopo de 29/09/2026](../../docs/references/meetings/29-09-26-estrategia-peterson-design-comparacao-mobile/29-09-26-escopo-export-qrcode-auditor.md):
o QR do PDF abre uma página pública no domínio da GAIA que prova que o resultado
saiu da plataforma e não foi alterado.

Estado: **discovery**. Nada criado no Plane. O conteúdo da página é pendência do
Paulo e do Ruan desde 29/09; o questionário serve para fechar isso.

## Arquivos

| Arquivo | Para quê |
|---|---|
| [01-entendimento.md](01-entendimento.md) | O pedido, os dois usos, o que existe no código, decisões técnicas, riscos |
| [02-pesquisa.md](02-pesquisa.md) | O que Regrow e outras plataformas mostram, validadores de documento, LGPD, claims (EmpCo, CONAR) |
| [03-analise-produto.md](03-analise-produto.md) | Estrutura da página, estados, fluxo do emissor |
| [04-questionario-produto.md](04-questionario-produto.md) | Perguntas para Paulo e Ruan |
| [questionario.html](questionario.html) | Mesmas perguntas em página interativa (link abaixo) |
| [05-rascunho-tasks.md](05-rascunho-tasks.md) | Tasks prováveis |
| [06-por-modulo.md](06-por-modulo.md) | Número principal e aviso curto de cada módulo na página |

## Em uma página

- **Dois usos na mesma página:** o comprador ou a Control Union conferindo um PDF,
  e o consumidor escaneando o QR colado no lote. A página começa pelo veredito
  ("Documento emitido pela GAIA", data, código, status) e só depois mostra os
  números.
- **A página lê o snapshot do documento emitido (feature 02), não o dado atual.**
  Se lesse o dado ao vivo, PDF e página divergiriam no primeiro recálculo. Mapa
  incluso: a imagem é guardada na emissão.
- **Terreno livre:** nenhuma plataforma agrícola de carbono pesquisada (Regrow,
  Agreena, Indigo, Cool Farm, Sustell) tem página pública por resultado; todas
  deixam a prova para registros de terceiros. O mais parecido é o Climate ID da
  ClimatePartner. No algodão brasileiro, o SouABR da ABRAPA já põe QR na etiqueta,
  mas de rastreio, não de pegada.
- **Página pública = cuidado com o que publica:** o contorno da fazenda cruzado com
  o CAR identifica o produtor (LGPD). Padrão proposto: município, UF, área e safra;
  contorno e nome só se o emissor liberar.
- **Claims:** o CONAR (Anexo U, item 7) proíbe recurso gráfico que sugira
  certificação inexistente, e a EmpCo proíbe selo próprio na UE. Nada de check
  verde até a Control Union verificar; Remoção nunca como compensação.
- **Código hoje:** a API exige login em tudo e não tem throttle; no Next, a lista de
  rotas públicas redireciona quem está logado para `/projects`, então a página
  precisa de uma exceção própria. Módulos contratados já existem
  (`Project.modules`).

## Hipóteses de trabalho

- **H1 · Um token por documento emitido** (80 bits, 16 caracteres base32), o mesmo
  no QR e para digitar em `/v`. Nada de `gaia/prova/<id do projeto>`.
- **H2 · Documento de fazenda junto com o do projeto:** ao emitir o projeto, cada
  fazenda ganha um QR próprio. O lote leva o da fazenda de onde saiu (pergunta 3).
- **H3 · Mapa padrão = município e UF.** Contorno só se o emissor liberar
  (pergunta 8).
- **H4 · QR colado não muda; a página muda.** Substituído aponta para a versão nova;
  revogado mostra só status e data, como o diploma digital.

## Link do questionário

https://claude.ai/artifact/PLQ9keXu68sh7pYbjKKtdb (respostas por pessoa na coleção `respostas`)
