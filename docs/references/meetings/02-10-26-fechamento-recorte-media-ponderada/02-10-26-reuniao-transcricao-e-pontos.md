# Reunião 02/10/2026: fechamento por recorte, média ponderada, trava e auditor

Documentos desta pasta:

| Arquivo | Conteúdo |
|---|---|
| este arquivo | Ata: resumo por tema, decisões, efeito nos planos do `TODO/`, pendências e próximos passos |
| [`02-10-26-transcricao.md`](02-10-26-transcricao.md) | Transcrição com nome de quem fala, gerada da legenda do Meet |
| `02-10-26-legendas-meet.srt` | Legenda automática do Meet extraída do vídeo, sem edição |
| `02-10-26-whisper.srt` | Transcrição do áudio pelo whisper (large-v3-turbo, pt), sem nome de quem fala. Segunda fonte para trechos que a legenda cortou |

## Fontes e confiança

| Fonte | Cobertura |
|---|---|
| `~/Downloads/sct-expc-ros (2026-10-02 12_01 GMT-3).mp4` (fora do repo), gravação do Meet com legenda PT embutida e nome de quem fala | 00:00–1:10:04 |
| Mesmo vídeo, áudio transcrito pelo whisper local | 00:00–1:10:03 |

Os tempos `[mm:ss]` são do vídeo. A legenda perde texto quando duas pessoas
falam juntas. A conta "Z2 Tech" é a da Z2, com o Henrique conduzindo; aqui
aparece como **Z2**. Trechos de demo em que só se digitam valores de teste
ficaram resumidos.

## Participantes

| Nome | Lado |
|---|---|
| Paulo Rocha | GAIA / Peterson |
| Ruan Carlos Oliveira | GAIA |
| Henrique (conta Z2 Tech) | Z2 |

Citados: **João** (especialista em carbono do solo, topou validar os cálculos),
**LDC** (exemplo de cliente), **PepsiCo** e **Nestlé** (pegadas sem auditoria
que a equipe faz hoje), **Regenagri** (exemplo de fluxo de auditoria lento),
**Control Union**, **Verra**.

## Por que a reunião

Os questionários de 30/09 e 01/10 deixaram dúvidas que mudam o desenho do
cálculo final (feature 00). A Z2 abriu dizendo que ainda não tinha entendido
como o produto deve funcionar e montou um caso real na plataforma ("Projeto
Henrique", uma fazenda, milho 2025) para perguntar em cima da tela.

## Resumo por tema

### 1. O oficial se escolhe na tela de seleção, na hora de fechar [01:00–02:30, 30:28–31:32, 1:00:56–1:03:36]

- Ideia do Paulo logo na abertura: usar a tela onde hoje se filtram fazendas e
  talhões (a da comparação) para escolher o dado que vai como oficial. É ali que
  o usuário fecha o projeto, pede verificação e gera o QR.
- Durante o trabalho nada muda. O usuário faz quantos cálculos quiser. Antes de
  pedir verificação, entra nessa tela e seleciona o real. Exemplo dele: "Milho
  2025 modelo 1" e "Milho 2025 modelo 2" são testes; ele escolhe qual é o real
  da fazenda 1, qual é o da fazenda 2.
- A seleção desce em níveis: projeto → fazendas → talhões → o cálculo de cada
  talhão. Um talhão pode ser a fazenda inteira, ou a fazenda pode ter vários
  talhões, cada um com cinco testes. Só o escolhido entra.
- O resultado da tela é um número por projeto, para uma cultura específica, na
  área total do projeto.
- Z2 perguntou se, havendo um cálculo só, ele entra sozinho. Paulo concordou que
  o usuário deve clicar e confirmar.
- A tela tem três saídas, nas palavras do Paulo [1:01:40]: "fecha o projeto com
  auditoria, ou só fecha o projeto, ou eu comparo".

### 2. Recorte: cultura e ano safra, sem ano no projeto [13:04–17:00, 23:40–31:32]

- O certificado é emitido por cultura. "Eu quero uma verificação pro meu milho,
  eu quero uma verificação pra minha soja. Você vai pedir isso separado."
- Pedido normal: a cultura do ano atual (o produtor tem o silo cheio e achou um
  comprador que exige o carbono). Pode ser retroativo, ex.: 2022, se houver
  evidência. Também pode pedir 2023, 2024 e 2025.
- Dentro de um ano safra cabem até três culturas.
- Z2 propôs fixar o ano na criação do projeto, para tudo dentro dele ser daquele
  escopo [27:56]. Paulo e Ruan recusaram: o projeto não leva ano. Registra-se
  projeto, depois fazenda, e o ano entra nos cálculos. Na hora de fechar o
  usuário escolhe o ano. "Eu acho que não precisa mudar nada em termos de
  estrutura" [29:16].
- Cada módulo olha o tempo de um jeito (Paulo [28:24]):
  - Emissão: a cultura, se for anual.
  - Remoção: um período modelado, para trás ou para frente.
  - Regenerativo: a fazenda inteira, independente do talhão, naquele ano.
- **Regenerativo ganha ano safra**, e o usuário pode criar quantos quiser (um
  por ano). Ano fechado, não período [29:52].
- **Emissão ganha período**: em vez de só o ano, mês e ano de início e mês e ano
  de fim (plantio e colheita). Proposta da Z2 [40:52], aceita pelo Paulo: com a
  data de plantio e o mês de colheita o recorte da Remoção fica certo. É esse
  período da Emissão que define o recorte.

### 3. Remoção: recorte do ano e alocação entre culturas [13:20–14:44, 17:00–21:40, 25:12–27:12, 36:00–42:12]

- A Remoção modela vários anos e várias culturas (ex.: feijão 2024, milho 2025).
  Ao fechar milho 2025, a plataforma pega só o trecho da modelagem que cabe no
  período do milho.
- Quando a rotação tem várias culturas (soja, milho, algodão, pecuária), é
  preciso um critério de alocação do carbono entre elas. Café, por ser perene,
  não tem esse problema. Paulo: "aí é que a gente vai ter que quebrar a cabeça".
  Sem critério definido.
- Remoção e Emissão podem ser feitas por talhão ou pela fazenda inteira (um
  talhão do tamanho da fazenda). Geralmente a Remoção é por fazenda. A estrutura
  de hoje atende.
- **Claim da Remoção** (pendência P-2 do cálculo final). Paulo separou dois
  casos:
  - Offsetting, tipo Verra: o claim sai da modelagem. No ano zero se calcula a
    linha de base, projeta 5 anos, emite os créditos; no 5º ano mede de novo.
  - Insetting, que é o caso da GAIA: "se eu vou vender o meu milho desse ano, eu
    não vou fazer o claim de uma coisa que vai ser modelada para 5 anos". O claim
    é do ano: modela o período inteiro para entender a curva, mas recorta o ano
    da safra.
  - Ruan, que tinha respondido "projeção de 5 anos", disse que pensava no caso
    offset e concordou. "Se a gente bota offset, aí vai complicar demais."

### 4. Talhão ou fazenda [17:00–21:40]

- Ruan sugeriu desenhar primeiro a propriedade e perguntar se o usuário quer
  dividir em talhões; hoje o desenho já nasce como talhão.
- Decisão: fica como está. Fazenda com um talhão só é a fazenda inteira. Se der
  problema no uso, a Z2 muda a tela.

### 5. Média ponderada por área [01:48–02:30, 21:44–23:32, 50:44–53:24]

- O certificado sai no nível do projeto. Primeiro média ponderada dos talhões
  para ter a fazenda, depois média ponderada das fazendas para ter o projeto.
- Exemplo do Paulo: fazenda de 100 ha com 0,1 t CO2e por t de milho e fazenda de
  1.000 ha com 0,2 t/t. A média precisa pesar o tamanho.
- Peso: Paulo hesitou entre área e produção. Na Emissão, pesar por área
  "penaliza quem tem área menor e produtividade alta". Concluiu: "média
  ponderada pela área mesmo", para todos os indicadores [53:16]. No solo a área
  já era a escolha óbvia.
- Paulo vai mandar uma planilha Excel com o cálculo da média ponderada.

### 6. Trava, auditoria e fator de emissão [31:52–48:08, 56:12–57:36]

- **Quando trava** (P-1). Paulo: ao mandar para verificação o projeto trava;
  só o auditor mexe. Se o auditor acha pendência, devolve e destrava. Se aprova,
  "não tem como voltar atrás".
- Ruan levantou o caso sem auditoria, comum hoje (pegada para PepsiCo, Nestlé):
  o projeto fica finalizado, mas ele quer poder abrir e editar depois. Paulo:
  "é questão de contrato". Há projetos com começo, meio e fim, projetos só de
  linha de base e projetos de vários anos com verificação a cada ano.
- Z2 ficou com: trava ao finalizar, porque há casos sem auditoria [47:12].
  Auditoria é um pacote que a Peterson pode vender ou não.
- Se vai ter auditoria se decide na hora de fechar, não na criação do projeto.
  Alguns clientes só decidem no meio, quando os dados ficam bons.
- Auditor devolveu: corrige-se o cálculo que foi enviado, não se cria um "milho
  2025 v2" [56:28].
- Ruan pediu que a correção seja rápida (no Regenagri demora muito). Proposta da
  Z2: o projeto em auditoria com pendência fica vermelho; o clique leva direto
  ao campo com o comentário do auditor embaixo. Argumento de venda: o auditor
  vê tudo pela plataforma e não precisa ir à fazenda.
- **Fator de emissão atualizado** (P-3). Paulo: o que foi travado fica.
  "Vendi o milho com aquele fator, depois se muda não fica legal." Só muda se
  for erro de cálculo. Em projeto de 5 anos, os anos novos usam o fator novo.
  Ruan concordou ("não pode mandar depois mesmo não"), o que muda a resposta
  dele no questionário. Z2 propôs: manter a foto e mostrar um alerta "este
  cálculo usou fatores anteriores". Paulo: pode ser.

### 7. Quem fecha o projeto [53:28–54:32]

- O dono do projeto, admin ou gestor. Exemplo: Peterson e LDC decidem fechar,
  mandar para verificação ou encerrar.
- A GAIA não mexe. Se ninguém fechar, a GAIA fecha quando o contrato acaba.

### 8. Celular [54:32–56:08]

- Dado coletado no celular vale como se fosse preenchido na web. O celular é só
  coleta; o processamento é no computador.
- O "rascunho" do Ruan era a caixa de saída do celular: salvo offline até ser
  enviado. Enviado, é dado oficial. Era nomenclatura, não divergência.
- Z2 lembrou o conflito de sincronização (dois editaram o mesmo cálculo): ao
  voltar a internet, o app mostra o que mudou e o usuário escolhe.

### 9. Dashboard do fechamento e projeto plurianual [57:36–1:05:36]

- A Z2 imaginou uma aba nova no projeto com o dashboard do projeto finalizado,
  somando talhões e fazendas pela média ponderada.
- Paulo: o projeto continua se for de vários anos. O fechado fica travado lá
  dentro; o projeto segue com os talhões de 2024, 2025 e os seguintes. O dado do
  ano anterior serve para gráfico de evolução.
- Paulo separou três coisas: comparar fazendas, comparar talhões dentro da
  fazenda, e o dado da verificação. Este último é "um número único só, não vai
  ter vários gráficos". Mais simples que o dashboard de comparação:
  - Emissão: pegada de carbono e emissão por hectare.
  - Remoção: remoção no período daquela cultura, em t C e t CO2.
  - Regenerativo: o score daquele ano.
- Biodiversidade não foi citada.
- Com 10 fazendas, cada uma com talhões, a seleção passa de 4 itens. É o motivo
  da comparação ampliada (feature 06).

### 10. Export Excel [1:06:24–1:08:32]

- Linhas = variáveis (ureia, combustível), colunas = fazendas. Só dado bruto,
  sem cálculo nem resultado. Ruan: "limpo e seco".
- Para o auditor: os fatores de emissão e a fonte de cada um, num Excel à parte,
  anexado. É uma planilha padrão, igual para todo mundo. Ruan: o auditor precisa
  da fonte do fator e da origem do dado.
- O auditor também baixa a planilha de dados primários por fazenda e os PDFs.

### 11. Auditor [48:32–49:28]

- Pode ser qualquer empresa de auditoria. A Control Union é preferência, não
  exclusividade.
- Paulo: cadastra o e-mail e manda login e senha. O auditor entra num ambiente
  onde não altera dado, mas acessa planilha, PDFs e evidências, baixa e comenta.
- Prazos (quanto tempo o auditor tem para responder, quanto tempo o cliente tem
  para corrigir, quantas rodadas) ficaram sem resposta. A Z2 vai pensar quando
  chegar no auditor.

### 12. Notas da demo [04:00–13:04]

Observações sobre o formulário da Emissão enquanto a Z2 preenchia o caso real:

- Montante colhido em t é o total da área, não por hectare. Ruan achou o rótulo
  ambíguo.
- Fertilizante: ao adicionar ureia apareceram duas linhas onde devia ser uma
  ("era só uma mesmo"). Ruan sugeriu tirar o campo com 0,46 (% de N da ureia) e
  os demais desse tipo.
- Semente: o cálculo é de uma cultura só; a semente poderia vir da cultura já
  escolhida. Z2 vai verificar.
- Combustível: o campo hoje é consumo total. Paulo: deveria ser tudo por
  hectare. Ruan concordou que facilita. Energia elétrica fica total, porque é da
  propriedade. Ruan: os rótulos precisam dizer claramente se é total ou por
  hectare.
- Transporte em km; a plataforma calcula.

### 13. Encerramento [1:08:36–1:10:04]

- Z2 não vai mandar mais questionário. Vai desenhar direto no Penpot e
  apresentar a Paulo e Ruan como apresentação, para eles conferirem dados,
  campos e textos. Com o design aprovado, o desenvolvimento anda mais rápido.
- Ordem: primeiro o fechamento (feature 00), "porque vai mexer bastante coisa".
  PDF, QR code e auditor vêm depois.
- A Z2 precisa de Paulo e Ruan: o que mostrar no dashboard, no PDF e na página
  do QR. Pode ser um modelo à mão.
- Depois do tchau, Paulo pediu para cadastrar o João na plataforma. O João
  topou validar os cálculos de carbono do solo.

## Decisões tomadas

| # | Decisão | Fecha |
|---|---|---|
| D1 | O oficial não é um selo marcado durante o trabalho. É escolhido na tela de seleção, na hora de fechar: projeto → fazendas → talhões → cálculo, com clique explícito | CF-RN-03 a 07 mudam |
| D2 | Fechamento por recorte: cultura × ano safra, dentro do projeto. O projeto não tem ano e continua depois do fechamento | CF-P-11, CF-P-14 |
| D3 | Emissão ganha período (mês e ano de início e de fim). Esse período define o recorte da Remoção | CF-P-14 |
| D4 | Regenerativo ganha ano safra e pode ter vários por fazenda | CF-RN-10 |
| D5 | Claim da Remoção = sequestro do ano da safra, recortado da modelagem (insetting). A projeção de 5 anos fica informativa | CF-P-2 |
| D6 | Média ponderada por área (ha) em todos os indicadores: talhão → fazenda → projeto | CF-P-5 |
| D7 | Fechar trava os cálculos escolhidos, com ou sem auditoria | CF-P-1 (parcial, ver P1 abaixo) |
| D8 | Auditoria se decide ao fechar, não ao criar o projeto | — |
| D9 | Auditor devolveu: corrige o cálculo enviado, não cria outro | — |
| D10 | Fator novo não altera o que foi travado; anos novos usam o fator novo; alerta no cálculo antigo | CF-P-3 |
| D11 | Fecha: admin do projeto ou gestor. A GAIA só fecha no fim do contrato | CF-P-7 |
| D12 | Dado do celular, depois de enviado, é dado oficial | CF-P-8 |
| D13 | Auditor pode ser de qualquer empresa | AU-RN-01 (confirma) |
| D14 | Excel: variáveis nas linhas, fazendas nas colunas, só dado bruto | EX-P-1, EX-P-4 (parcial) |
| D15 | Fatores de emissão e fontes num Excel padrão à parte, para o auditor | EX-RN-08, EX-RN-15 mudam |
| D16 | Dashboard da verificação: um número por indicador, mais simples que a comparação | PDF e QR (conteúdo) |
| D17 | Talhão × fazenda: estrutura fica. Fazenda com um talhão = fazenda inteira | — |
| D18 | Z2 desenha o fechamento no Penpot e valida com Paulo e Ruan em apresentação, sem novo questionário | Processo |

## Em aberto

| # | Pergunta | Situação |
|---|---|---|
| P1 | Fechamento sem auditoria pode ser reaberto pelo dono para editar? Ruan quer; Paulo diz que depende do contrato | Proposta na [versão final 2](../../../../TODO/00_calculo_final/08-versao-final-2.md), P-1; validar no design |
| P2 | Critério de alocação da Remoção entre culturas da rotação (soja, milho, algodão, pecuária) | Paulo e especialista (João) |
| P3 | Prazos da auditoria: tempo do auditor, tempo da correção, número de rodadas | Na feature 04 |
| P4 | Conteúdo do PDF, da página do QR e do dashboard | Paulo e Ruan mandam modelo |
| P5 | Biodiversidade entra no fechamento? Não foi citada | Confirmar no design |
| P6 | Um cálculo de Remoção de vários anos entra em dois fechamentos (milho 2025 e soja 2026)? Se o primeiro trava o cálculo, o segundo não consegue editar | Proposta na versão final 2, P-6 |
| P7 | Combustível por hectare: muda o campo (hoje `annual_consumption` total por fazenda) ou só o rótulo? | Decidir no design da Emissão |
| P8 | Excel com fazenda na coluna e fazenda com vários talhões: a célula é soma, média ponderada ou kg/ha? | Validar com a planilha do Paulo |

## Responsáveis

| Quem | O quê |
|---|---|
| Paulo | Mandar o Excel da média ponderada |
| Paulo e Ruan | Mandar o que mostrar no dashboard, no PDF e no QR (modelo simples serve) |
| Z2 | Desenhar o fechamento no Penpot e apresentar |
| Z2 | Cadastrar o João na plataforma |
| Z2 | Conferir os ajustes de formulário da Emissão (seção 12) |

## Efeito nos planos

Atualizados em `TODO/` no mesmo dia:

- [`00_calculo_final/08-versao-final-2.md`](../../../../TODO/00_calculo_final/08-versao-final-2.md):
  reescrita com o modelo de fechamento por recorte. Substitui a versão final 1.
- [`00_calculo_final/05-rascunho-tasks.md`](../../../../TODO/00_calculo_final/05-rascunho-tasks.md):
  tasks refeitas.
- [`TODO/ajustes-02-10.md`](../../../../TODO/ajustes-02-10.md): o que muda nas
  features 01 a 06, regra por regra.
- READMEs das features: estado e pendências.
