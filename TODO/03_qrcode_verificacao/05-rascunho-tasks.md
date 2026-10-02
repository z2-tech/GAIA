# 05 · Rascunho de tasks

Ainda **não criadas no Plane**. Títulos no padrão `BE:` / `FE:` / `PROD:`.
Regras (RN-n) e pendências (P-n) em [08-versao-final-1.md](08-versao-final-1.md).
Revisado em 02/10/2026 com a resposta do Paulo.

A coluna "Pendência" indica a decisão de 06/10 que ainda pode mudar a task. Sem
pendência, a task pode começar.

## Fase 1: página e código

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Textos da página | Veredito, estados, avisos curtos por módulo, "O que é a GAIA", "média de N fazendas", PT e EN | RN-05–09, RN-15, RN-16 | P-4, P-5 |
| PROD: Layout da página no Penpot | Mobile e desktop; estados ativo, revogado, não encontrado; entrada manual; cards dos quatro módulos; três logos | RN-05–14 | P-1, P-7 |
| BE: Código e status na foto verificada | Código base32 de 80 bits, único, na foto verificada do projeto; status ativo/revogado; cada PDF gerado como filho com hash. Estende o `BE: Documento emitido` da feature 02 | RN-01–04 | P-1, P-2 |
| BE: Endpoint público de verificação | `AllowAny`, sem autenticação, throttle anônimo; devolve a foto filtrada pelo que foi liberado, status e hashes; mesma resposta para inexistente e mal formado | RN-07–10, RN-20 | P-3 |
| FE: Rota pública `/v/[token]` | Layout próprio, render no servidor, `noindex`, exceção no `proxy.ts` sem redirecionar logado; veredito; estados; PT/EN | RN-05, RN-06, RN-14, RN-21 | design |
| FE: Cards de módulo na página | Emissão (kg CO₂e/kg por cultura), Remoção (variação medida, projeção informativa), Regenerativo (score, faixa, % em Bom), Biodiversidade (% da área por classe); só contratados | RN-07, RN-08, RN-15, RN-16 | design, P-8 |
| FE: Entrada manual `/v` | Campo do código; normaliza hífen e caixa | RN-22 | — |
| FE: QR no PDF | Lib `qrcode`; QR no fim do PDF oficial com o código embaixo | RN-01, RN-03 | P-1 |

## Fase 2: controle do emissor

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Design da emissão e da aba Documentos | Escolha do que fica público com padrão mínimo; mapa; logos; baixar QR; revogar com motivo | RN-10–13, RN-17 | P-3, P-7 |
| BE: O que publicar, emissor e logos | Campos liberados (nomes, município/UF, mapa, PDF) na foto; nome e logo da empresa emissora e da verificadora | RN-10, RN-12, RN-13 | P-3, P-7 |
| BE: Imagem do mapa na foto | Gerar a imagem na emissão (sem mapa, municípios ou contornos) e servir por caminho que não expira | RN-11 | P-3 |
| BE: Revogar QR | Ação com motivo obrigatório (não publicado); gestor, admin do projeto e staff | RN-17–19 | P-9 |
| FE: QR na aba Documentos | Baixar PNG/SVG com o código embaixo; copiar link; ver página; revogar | RN-17 | design |
| FE: Escolhas de publicação na emissão | Formulário com padrão mínimo preenchido | RN-10–12 | design, P-3 |

## Fase 3: integridade

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| FE: Conferir PDF | SHA-256 no navegador (Web Crypto), compara com os hashes da foto; resultado "idêntico" ou "diferente" | jornada 5 | P-6 |

## Depois desta feature

| Título | O quê |
|---|---|
| BE/FE: Contador de leituras | Incrementa por acesso; exposto na aba Documentos (Paulo 18) |
| PROD: Pesquisa de referências | Puma, My Easy Farm, UCropIt, Sateligence (Paulo R1) |

## Dependências

- **02 PDF:** model do documento emitido e aba Documentos. A 03 muda o model
  (código na foto, PDF como filho).
- **00 cálculo oficial:** foto imutável (CF-RN-25), estado verificado (CF-RN-33),
  agregação por projeto (CF-RN-13).
- **04 auditor:** verificadora e data do selo.

## Saiu

| Título | Por quê |
|---|---|
| BE: Documento por fazenda | QR só de projeto (Paulo 3, 4) |
| Estado "substituído" | Código por foto verificada (RN-03); verificado não muda |
