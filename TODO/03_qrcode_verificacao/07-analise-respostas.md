# 07 · Análise das respostas (Paulo, 01/10/2026)

Fonte: [Resosta_paulo.txt](Resosta_paulo.txt). Só o Paulo respondeu. O Ruan não
mandou o questionário do QR; o que depende dele está marcado com "falta Ruan".
Regras do cálculo final citadas como CF-RN-n e CF-P-n
([07 do cálculo final](../00_calculo_final/07-versao-final-1.md)).

## O que mudou no nosso entendimento

1. **O QR é do projeto, não da fazenda.** Paulo (3, 4): QR por fazenda "será muito
   bom, mas fica muito complexo". A hipótese H2 (documento filho por fazenda) sai.
   Consequência: o pacote de café ou o fardo de algodão mostra a média ponderada
   do projeto (CF-RN-13), não a fazenda de onde saiu. A página precisa dizer isso
   ("média de 20 fazendas do projeto").
2. **O consumidor final escaneia.** Paulo (1) marcou comprador, consumidor final
   e cliente do Peterson, e citou o café. A página é lida por quem não conhece a
   GAIA. Os avisos por módulo continuam necessários.
3. **Onde o QR vai colado ainda não se sabe** (2). Em cadeias longas a fazenda
   fica longe do produto final. O PDF é o uso certo; a etiqueta (saco de café) é
   o segundo uso (5).
4. **A página mostra o status de verificação, "quando é um ou outro"** (12). Lido
   ao pé da letra, existe QR de projeto não verificado. Isso contradiz a CF-RN-37
   (QR só em projeto verificado) e a resposta 18 do próprio Paulo no cálculo
   final. Ver divergência abaixo.
5. **Pouca coisa pública por padrão** (9). Ele só marcou "empresa que emitiu" e
   escreveu "precisamos discutir, por conta de LGPD". O mapa fica a critério do
   emissor (8). LGPD aparece também no export (nome do produtor), no PDF (passo 6)
   e no auditor ("às cegas"). É tema de todas as features.
6. **Biodiversidade entra** (M3), contra a sugestão da Z2 de deixar para depois.
   **Regenerativo mostra também o score do projeto** (M2), além da faixa e do %
   da área em Bom.
7. **Marca com três logos** (17): GAIA, empresa que emitiu e verificadora.

## Consenso com a proposta da Z2: vira regra

| # | Regra | Base |
|---|---|---|
| R1 | Um QR por projeto. Sem QR por fazenda | 3, 4 |
| R2 | Baixar o QR sozinho (PNG e SVG) para etiqueta, além do QR no PDF | 5 |
| R3 | Só os módulos contratados (`Project.modules`) aparecem | 6 |
| R4 | Emissão: número principal em kgCO₂e por kg do produto | 7 |
| R5 | Mapa: o emissor escolhe na hora de gerar | 8 |
| R6 | PDF completo para baixar na página: o emissor escolhe | 11 |
| R7 | A página mostra o status de verificação | 12 |
| R8 | O emissor pode revogar. Revogado mostra só "revogado" e a data | 13, 14 |
| R9 | O documento não vence. Mostra a safra que cobre | 15, CF-RN-11 |
| R10 | Página em PT e EN, o visitante troca | 16 |
| R11 | Contador de leituras fica para depois | 18 |
| R12 | Remoção aparece, com aviso "estimativa de modelo, não é crédito de carbono" | M1 |
| R13 | Regenerativo: faixa, % da área em Bom e score do projeto | M2 |
| R14 | Biodiversidade entra na página | M3 |

## Divergências e pontos em aberto

| Tema | Paulo | Proposta Z2 | Falta Ruan |
|---|---|---|---|
| **QR antes da verificação** (12) | "Mostrar quando é um ou outro" | Manter a CF-RN-37: QR só em projeto verificado. A página já nasce com o selo de verificação como campo, então liberar QR para projeto finalizado depois é troca de regra, não de tela | sim |
| **Token por PDF ou por projeto verificado** | não perguntado | Um token por foto verificada do projeto. Todo PDF gerado dessa foto (PT, EN, com ou sem mapa) leva o mesmo QR e registra o próprio hash. Assim a etiqueta já impressa não vira "substituída" quando alguém gera o PDF em inglês | sim |
| **O que é público** (9) | Só empresa emissora; resto a discutir (LGPD) | Padrão: empresa emissora, cultura, safra, número de fazendas, área total do projeto. Nome de fazenda, município, UF e mapa só se o emissor liberar | sim |
| **Aviso da Remoção** (M1) | Sim na página | Manter na página. Contradiz a resposta 6 do PDF, onde ele dispensou o aviso. Proposta: aviso curto na página (o consumidor não é da área); no PDF, uma linha "remoção modelada", sem texto longo | sim |
| **Avisos por módulo** (M4) | "Com ajustes (comentário)", sem comentário escrito | Usar os textos do 06-por-modulo até ele mandar os ajustes | sim |
| **Texto do "verificado"** | Auditor (1): a verificação cobre só cálculos e metodologia, não é Verra | Selo diz "Cálculos e metodologia verificados por <verificadora> em dd/mm", nunca "certificado" | — |
| **Biodiversidade no projeto** (M3) | Sim | A classificação (baixa, média, alta) é por talhão. No projeto: % da área em cada classe | sim |
| **Conferir o PDF** (10) | "Como assim?" | Refazer com exemplo (abaixo). Proposta: entra, é barato | sim |

### Pergunta 10 reformulada

> Alguém recebe o PDF por e-mail, abre num editor e troca "0,29 kgCO₂e/kg" por
> "0,19". O PDF continua com o QR certo, então a página abre normal e mostra 0,29.
> Quem compara com atenção vê a diferença; quem não compara, não vê.
>
> Com a conferência, a pessoa arrasta o PDF que recebeu para a página e ela
> responde "idêntico ao emitido pela GAIA" ou "diferente do emitido". O arquivo
> não sai do computador dela.
>
> Vale ter isso na primeira versão?

## Requisitos novos

| Requisito | Quem pediu | Onde encaixa |
|---|---|---|
| Logo da empresa emissora e da verificadora na página | Paulo 17 | Esta feature. Não existe empresa nem logo no código hoje |
| Score do projeto no Regenerativo | Paulo M2 | Esta feature, lê a agregação do cálculo final |
| Plataformas de referência: Puma, My Easy Farm, UCropIt, Sateligence | Paulo R1 | Pesquisar antes do Penpot. A PUMA não tinha sido encontrada em 30/09 |
| Página informa que o número é a média do projeto | consequência de R1 | Esta feature |

## O que o código diz

- **Não há empresa nem logo.** Nenhum model tem `logo` ou `ImageField`, e não há
  model de empresa ou organização (`gaia-api/projects/models.py` tem `Project`,
  `Module`, `ProjectModule`, `ProjectFarm`). "Empresa que emitiu" precisa de nome
  e logo guardados em algum lugar. Proposta: no documento emitido, preenchidos na
  emissão, com padrão "Peterson".
- **Módulos contratados existem** (`Project.modules`), então R3 sai sem mudança
  de model.
- **O documento emitido é da feature 02** (`BE: Documento emitido` em
  [../02_pdf_dashboard/05-rascunho-tasks.md](../02_pdf_dashboard/05-rascunho-tasks.md)),
  com status válido, substituído e revogado. A proposta de token por foto
  verificada muda esse model: o token e o status passam para a foto, e o PDF vira
  arquivo filho com hash próprio.
- Nada mudou no resto do [01](01-entendimento.md): API sem rota pública nem
  throttle, `proxy.ts` redireciona logado, nenhuma lib de QR.

## Efeito no rascunho de tasks

- **BE: Documento por fazenda** sai.
- **BE: Token e status** passa a ser da foto verificada do projeto, não de cada
  PDF.
- **Nova: BE: Emissor e logos no documento** (empresa emissora, logo, logo da
  verificadora).
- **Cards de módulo** ganham Biodiversidade e o score do projeto no Regenerativo.
- **BE: Contador de leituras** vai para depois.
- **FE: Conferir PDF** fica com pendência (P-6).

## Pauta para 06/10

1. QR só para projeto verificado (CF-RN-37) ou também para finalizado com selo
   "autodeclarado"? A pergunta 12 e a resposta 18 do cálculo final dizem coisas
   diferentes.
2. Token por projeto verificado, não por PDF. De acordo?
3. O que fica público por padrão (LGPD). Levar junto com export, PDF e auditor.
4. Aviso de "não é crédito de carbono": na página sim, no PDF não? Fechar uma
   regra para os dois.
5. Ajustes nos avisos por módulo (M4 veio sem comentário).
6. Pergunta 10 com o exemplo acima.
7. Quem é a "empresa que emitiu": sempre a Peterson, ou o cliente quando ele
   gera?
8. Pedir ao Ruan as respostas deste questionário.
