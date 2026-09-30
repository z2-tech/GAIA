# 05 · Rascunho de tasks

Não criadas no Plane. "Depende de" aponta perguntas do
[questionário](04-questionario-produto.md).

| Título | O quê | Depende de |
|---|---|---|
| PROD: Regras da página pública | Leitores, nível (projeto/fazenda), o que publicar, status, revogação, validade | 1–15 |
| PROD: Textos da página | Veredito, estados, avisos curtos por módulo, "O que é a GAIA", PT e EN; revisão do Paulo | 16, M1–M4 |
| PROD: Layout no Penpot | Mobile e desktop; estados válido, substituído, revogado, não encontrado; entrada manual; etiqueta do QR | 4, 5, 17 |
| BE: Token e status no documento emitido | Token base32 de 80 bits, único; status; motivo e data de revogação; `replaced_by`; o que foi liberado para publicar. **Estende o model da feature 02** | 8, 9, 11, 13–15 |
| BE: Documento por fazenda | Na emissão do projeto, um documento filho por fazenda, com snapshot e token próprios | 3 |
| BE: Endpoint público de verificação | `AllowAny`, sem autenticação, throttle anônimo; devolve snapshot filtrado pelo que foi liberado, status e hash; 404 igual para inexistente e inválido | 9, 12, 14 |
| BE: Imagem do mapa no snapshot | Guardar a imagem na emissão e servir por caminho que não expira | 8 |
| BE: Revogar documento | Ação com motivo; só quem pode emitir | 13, 14 |
| BE: Contador de leituras | Incrementa por acesso ao endpoint público; exposto na aba Documentos | 18 |
| FE: Rota pública `/v/[token]` | Layout próprio, render no servidor, `noindex`, exceção no `proxy.ts` sem redirecionar logado; estados; PT/EN | layout |
| FE: Entrada manual `/v` | Campo do código, normaliza hífens e caixa | — |
| FE: Conferir PDF | Hash SHA-256 no navegador, compara com o do documento | 10 |
| FE: QR no PDF e na aba Documentos | Lib `qrcode`; QR no fim do PDF; baixar PNG/SVG com o código embaixo; copiar link; revogar; leituras | 5 |

## Dependências

- **02 PDF:** model do documento emitido e aba Documentos. A 03 estende os dois.
- **00 cálculo oficial:** só o oficial entra no snapshot.
- **05 consolidado:** números do projeto.
- **04 auditor:** selo "Verificado por …".

## Por módulo (ver 06-por-modulo.md)

| Título | O quê | Depende de |
|---|---|---|
| FE: Cards de módulo na página | Emissão, Remoção, Regenerativo (Biodiversidade depois), número principal e aviso; só módulos contratados | M1–M4 |
| PROD: Avisos curtos por módulo | Versões de uma linha dos avisos da referência, para consumidor | M4 |
