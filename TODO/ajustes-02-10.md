# Ajustes de 02/10/2026 nas features 01 a 06

Base: [reunião de 02/10](../docs/references/meetings/02-10-26-fechamento-recorte-media-ponderada/02-10-26-reuniao-transcricao-e-pontos.md)
(decisões D1–D18) e o [cálculo final v2](00_calculo_final/08-versao-final-2.md)
(regras CF-RN-n).

A mudança que puxa todas as outras: **não existe mais "projeto finalizado" nem
selo de oficial por talhão**. Existe o **fechamento** de um recorte (projeto ×
cultura × ano safra), feito na tela de seleção, com ou sem auditoria. O projeto
continua depois. Onde as versões finais 1 dizem "oficial", leia "cálculo
escolhido no fechamento"; onde dizem "projeto finalizado", leia "fechamento
fechado, em verificação ou verificado".

As versões finais 1 de cada feature ficam como estão até a apresentação do
design. Este arquivo lista o que já mudou, regra por regra. Prefixos: EX
(export), PDF, QR, AU (auditor).

## 01 · Export Excel

| Regra v1 | Muda para | Base |
|---|---|---|
| EX-RN-01, EX-P-1 (resultado na planilha?) | **Fechada:** só dado bruto, sem resultado nem cálculo. Paulo e Ruan concordaram | D14 |
| EX-RN-02, EX-RN-03 (só oficial, foto do finalizado) | O export sai da tela de seleção. Com fechamento, lê a foto. Sem fechamento, lê os cálculos selecionados na hora e a aba Sobre diz "cópia de trabalho" | CF-RN-09, CF-RN-24 |
| EX-RN-09, EX-P-4 (coluna = unidade de coleta) | **Coluna = fazenda.** Linhas = variáveis (ureia, combustível...) | D14 |
| EX-RN-11, EX-RN-12 (kg/ha por talhão, total na fazenda) | Fazenda com vários talhões: valor por ha ponderado pela área dos talhões selecionados, com a área numa linha no topo. A validar com o Excel do Paulo (ata, P8) | D6 |
| EX-RN-13, EX-P-3 (uma safra por arquivo) | **Fechada:** um recorte (cultura × ano) por arquivo | D2 |
| EX-RN-08, EX-RN-15 (aba de fatores no arquivo do auditor) | Fatores de emissão, fonte e origem num **Excel padrão à parte**, igual para todos, anexado na área do auditor. Uma versão por versão de catálogo (CF-RN-25) | D15 |
| EX-RN-05 (dados da fazenda) | Entra o período de cultivo (início e fim) da Emissão | CF-RN-03 |
| EX-RN-22, EX-RN-23, EX-P-9 (talhão sem oficial) | **Caem.** A seleção exige um cálculo por talhão e módulo incluído | CF-RN-12 |
| EX-RN-24 (estado do projeto na aba Sobre) | Estado do fechamento: cópia de trabalho, fechado, em verificação, verificado | CF §6 |

Seguem abertas: EX-P-2 (por ha ou total, agora no nível fazenda), EX-P-5 (LGPD),
EX-P-6 (evidência), EX-P-7 (abas e cores), EX-P-8 (cliente e técnico exportam?).

## 02 · PDF

| Regra v1 | Muda para | Base |
|---|---|---|
| PDF-RN-01 (um PDF do projeto completo) | **Um PDF por fechamento** (projeto × cultura × ano) | D2 |
| PDF-RN-03, PDF-RN-20–23 (números) | Os números do fechamento: pegada e emissão por ha; remoção no período da cultura em t C e t CO2; score Regenerativo do ano. "Um número único, não vários gráficos" | D16, CF-RN-19 |
| PDF-P-3 (destaque da Remoção) | **Fechada:** remoção do período da cultura. Projeção de 5 anos só informativa | D5 |
| PDF-RN-08–10 (versões por estado do projeto) | Por estado do fechamento: sem fechamento = rascunho; fechado ou em verificação = autodeclarado; verificado = verificado com QR | CF §6 |
| PDF-RN-12 (substituído ao reabrir) | Substituído também ao reenviar depois de devolvido e na correção de erro pela GAIA | CF-RN-32, CF-RN-36, CF-RN-37 |
| PDF-RN-14, PDF-P-1 (quem gera) | Admin do projeto e gestor, os mesmos que fecham. A GAIA não gera | D11 |
| PDF §6 página 2 (gráficos por módulo) | Revisar: o Paulo pediu o mais simples possível. Esperar o modelo de Paulo e Ruan | D16, ata P4 |

Biodiversidade no PDF depende da CF-P-5. Seguem abertas: PDF-P-2, PDF-P-4,
PDF-P-5, PDF-P-6 (agora com o exemplo do devolvido), PDF-P-7, PDF-P-8.

## 03 · QR code

| Regra v1 | Muda para | Base |
|---|---|---|
| QR-RN-02, QR-RN-03 (QR do projeto, código por foto verificada) | **Um código por fechamento verificado.** O projeto pode ter vários QRs (milho 2025, soja 2025, milho 2026) | D2 |
| QR-RN-08 (média ponderada das fazendas) | Confirmada, peso área | D6 |
| QR-RN-09 (safra pelo ano de colheita) | Cultura e ano do recorte, com o período de cultivo | CF-RN-03 |
| QR §5.3 Remoção (variação medida) | Remoção do período da cultura, t CO2. Projeção só nos detalhes | D5 |
| QR-RN-19 (outro número = novo projeto) | Outro número = novo fechamento. Verificado só muda por erro de cálculo, via GAIA, e o código antigo passa a mostrar a versão nova | CF-RN-35, CF-RN-37 |
| QR-P-9 (quem gera e revoga) | Admin do projeto e gestor geram; revogar segue com GAIA também | D11 |

O conteúdo da página espera o modelo de Paulo e Ruan (ata, P4).

## 04 · Auditor

| Regra v1 | Muda para | Base |
|---|---|---|
| AU-RN-01 (qualquer verificadora) | Confirmada | D13 |
| AU-RN-03 (convite por link) | O Paulo descreveu "cadastra o e-mail e manda login e senha". O link de uso único entrega o mesmo para ele e evita senha no e-mail. Mostrar no design | ata §11 |
| AU-RN-04 (convidar com projeto finalizado) | Convidar quando um fechamento vai para auditoria | CF-RN-16 |
| AU-RN-11, AU-RN-12 (só oficiais, foto da finalização) | Só os cálculos do fechamento em verificação, lidos da foto | CF-RN-24 |
| AU-RN-10, AU-RN-19–22 (apontamentos com tipo e status) | O Paulo falou em comentário. Começar com comentário por campo; tipos (correção, esclarecimento, observação) a validar no design | ata §11 |
| AU-RN-23–26 (devolver reabre o projeto) | Devolver muda só o fechamento para "devolvido" e destrava só os cálculos dele. Corrige-se o mesmo cálculo, sem trocar a seleção. Devolvido em vermelho, clique vai ao campo com o comentário. Ruan pediu fluxo rápido | D9, CF-RN-30, CF-RN-31 |
| AU-RN-25, AU-P-6 (prazo) | Segue aberto, agora com número de rodadas | ata P3 |
| AU-RN-15 (downloads) | Excel de dados primários por fazenda, Excel padrão de fatores e fontes, PDFs e evidências | D14, D15 |
| AU-RN-30 (verificado não reabre) | Exceto erro de cálculo, só pela GAIA | CF-RN-37 |
| AU §6 (estados do projeto) | Estados do fechamento (CF §6) | D2 |

Seguem abertas: AU-P-1 (quem convida: o dono do projeto que envia para
auditoria ou só GAIA/Peterson), AU-P-2, AU-P-3, AU-P-4, AU-P-5, AU-P-7, AU-P-8,
AU-P-9.

## 05 · Consolidado

- O número consolidado do projeto é o número do fechamento: talhão → fazenda →
  projeto, média ponderada pela **área** em todos os indicadores (D6).
- A "regra de ouro" deste plano (somar absolutos, intensidade = Σ tCO2e / Σ kg,
  nunca média de intensidades) diverge da decisão do Paulo. Fica registrado.
  Conferir com o Excel que ele vai mandar antes de implementar.
- O nível "produto" é a cultura do recorte.
- O dashboard do fechamento é simples: um número por indicador (D16). O
  dashboard do projeto ganha a aba de fechamentos por ano, base do gráfico de
  evolução (CF-RN-40).
- Proposta: consolidado só a partir de fechamento. Antes de fechar, a
  exploração é pela comparação.

## 06 · Comparação ampliada

- A tela de seleção da comparação passa a ter o **modo fechamento** (CF-RN-09).
  É o que mais justifica sair do limite de 4: 10 fazendas com seus talhões.
- O Paulo separou três usos: comparar fazendas, comparar talhões dentro da
  fazenda, e o fechamento (número único). Os dois primeiros seguem a proposta
  de modo detalhe e modo ranking.
- A seleção em lote (todos os talhões da fazenda, todas as fazendas do projeto)
  vira requisito do fechamento, não só da comparação.

## Ordem combinada

1. Fechamento (feature 00): design no Penpot, apresentação a Paulo e Ruan,
   implementação.
2. Depois: PDF, QR code, auditor, com o conteúdo que Paulo e Ruan mandarem.

Export e comparação ampliada andam junto com o fechamento, porque usam a mesma
tela de seleção.
