# 07 · Análise das respostas (Paulo e Ruan, 01/10/2026)

Fontes: [Resosta_paulo.txt](Resosta_paulo.txt) e [resosta_ruan.txt](resosta_ruan.txt).
Ruan marcou opção em todas as perguntas. Paulo respondeu quase tudo em
comentário e disse que não entendeu C6, C7, M1 e o CSV do E1. Regras do cálculo
oficial citadas como CF-RN-n e CF-P-n, de
[../00_calculo_final/07-versao-final-1.md](../00_calculo_final/07-versao-final-1.md).

## O que mudou no nosso entendimento

1. **A planilha é de dados digitados; o resultado vai no PDF.** Paulo (B2, D5, D6):
   "não iremos exportar cálculos em planilhas, apenas os dados coletados e
   digitados, os cálculos serão exportados em PDF". Ruan queria dados + resultado
   por categoria. A proposta da Z2 (aba Resumo estilo `Total_Agro`) perde força: o
   PDF da feature 02 já mostra o resultado.
2. **Mesmo sem resultado, o oficial continua valendo.** Os dados digitados moram
   dentro de cada cálculo (insumos ficam em `LcaProjectCulture`, entradas do RothC
   em `RothcCalculation`). Uma simulação também tem insumos. Exportar "só dados" é
   exportar os dados do cálculo oficial (CF-RN-15). O D6 do Paulo não elimina a
   pergunta "e o talhão sem oficial?".
3. **A coluna segue o nível em que o dado foi coletado.** Paulo (C1, C3): coletado
   por talhão sai por talhão, coletado por fazenda sai por fazenda. Ruan marcou
   talhão. Na prática não brigam: Emissão e Remoção são por talhão; Regenerativo e
   Biodiversidade podem ser por fazenda ou por talhão (o `plot` é opcional nos dois
   modelos).
4. **Valor por hectare, não total.** Paulo (A3, C4): a planilha dele tem "Ureia
   kg/ha, diesel L/ha, produtividade kg/ha", e insumo sai sempre por hectare. Com
   a coluna sendo o talhão, kg/ha não tem o problema de soma que motivou a
   sugestão "total da área" da Z2. Ruan marcou total da área.
5. **Fator de emissão é só do auditor.** Os dois (B3). Paulo vai além: só o
   auditor deveria ter acesso aos fatores. A ideia de "um arquivo para todos com as
   abas de auditor no fim" (03) cai: são dois conteúdos.
6. **LGPD aparece em três respostas do Paulo.** Nome do produtor fora (B4, D4),
   cuidado com versão para terceiros. Ruan quer o nome do produtor e a versão sem
   identificação. O tema também aparece no PDF, no QR e no auditor.
7. **Evidência é arquivo para baixar, separado.** Paulo (B6): as notas e laudos
   deveriam ser baixáveis, em PDF, fora do Excel. Ruan: só o nome do arquivo. Hoje
   a evidência é só texto (`evidence_file` é `CharField(500)` na Emissão,
   `lca/models.py:400`), sem upload. O pacote de arquivos depende do upload da
   feature 04.

## Consenso: vira regra

| # | Regra | Base |
|---|---|---|
| R1 | Os quatro módulos entram, filtrados pelos contratados no projeto. Emissão e Remoção são certas | B1 (os dois) |
| R2 | Só o cálculo oficial. Simulação não entra | B7 (Ruan; Paulo deixou para o Ruan), CF-RN-15 |
| R3 | Fatores de emissão só no arquivo do auditor | B3 (os dois) |
| R4 | Unidade padronizada; insumo sempre por hectare | C4 (os dois), Paulo C4 |
| R5 | Export do projeto, com filtro por safra, fazendas e módulo | D1, D2 |
| R6 | Admin do projeto, gestor e auditor exportam | D3 (os dois) |
| R7 | Existe opção sem identificação ("Fazenda 1, 2, 3") | D4 (os dois) |
| R8 | Só `.xlsx`, sem CSV | E1 (os dois) |
| R9 | Português ou inglês, escolhido na hora | E2 (os dois) |
| R10 | Sem reimportação | E3 (os dois) |
| R11 | Remoção mostra estoque inicial e final | M3 (os dois; Ruan também quer o médio) |
| R12 | Remoção passa a guardar data, laboratório e método da análise de solo | M4 (os dois) |
| R13 | Regenerativo e Biodiversidade mostram quem respondeu e quando | M8 (os dois) |
| R14 | Regenerativo mostra a opção escolhida em cada indicador | M5 (Paulo só opção; Ruan opção e pontos) |
| R15 | Clima mensal da Remoção não entra | M1 (Ruan não; Paulo não entendeu) |

## Divergências: decidir na reunião de 06/10

As que mudam escopo viram pendência P-n em [08-versao-final-1.md](08-versao-final-1.md).

| Tema | Paulo | Ruan | Proposta |
|---|---|---|---|
| **Resultado na planilha** (B2, D5) | Só dados digitados; cálculo vai no PDF | Dados + resultado por categoria | Só dados digitados. O resultado está no PDF. Um bloqueio a menos: sem resultado, "cálculo desatualizado" (D5) não importa |
| **Por hectare ou total** (C3) | Por hectare, no nível em que foi coletado | Total da área | Célula em kg/ha (o que foi digitado), linha de área (ha) no topo. Quem precisa do total multiplica, ou a coluna Total da fazenda traz o total em kg |
| **Cultura e safra** (C2) | Uma coluna por cultura/safra dentro da fazenda | Uma aba por safra | Coluna por talhão × cultura, safra no cabeçalho. Filtro de safra (D2 do Ruan) gera o arquivo de uma safra só |
| **Abas** (C5) | Uma aba por módulo (entendeu a pergunta diferente) | Uma aba por categoria, como o LCA tool | Emissão em abas por categoria, nome com prefixo do módulo ("Emissão · Fertilizantes"); uma aba por módulo nos outros três. Validar com a planilha modelo |
| **Nome do produtor** (B4) | Fora, por LGPD | Dentro | Fora no padrão. Levar LGPD à reunião junto com PDF, QR e auditor |
| **Localização** (B5) | Coordenadas | Município e UF | Município e UF. Coordenadas só no arquivo do auditor, se a reunião aceitar |
| **Evidência** (B6) | Arquivos baixáveis, em PDF, separados do Excel | Só o nome do arquivo | Nome do arquivo na planilha agora. O pacote de arquivos vem com o upload de evidências (feature 04) |
| **Quem exporta** (D3) | Todos, inclusive cliente | Admin, gestor, auditor | Quem vê o projeto exporta as fazendas que vê. O cliente só recebe as dele. Técnico: decidir |
| **Talhão sem oficial** (D6) | Não se aplica (sem cálculo na planilha) | Não permitir exportar | Em andamento: exporta com coluna vazia e aviso na aba Sobre. Projeto finalizado nunca tem lacuna (CF-RN-21) |
| **Regenerativo: coluna** (M6) | Fazenda: o módulo é preenchido por fazenda | Talhão | Coluna = unidade em que a avaliação foi feita (`plot` preenchido = talhão; vazio = fazenda). Conflita com CF-RN-01 (oficial por talhão): levar ao CF |
| **Biodiversidade: coluna** (M7) | Os dois: preenchido por talhão e por fazenda | Talhão | Mesma regra do Regenerativo. Liga com CF-P-13 |
| **Remoção mês a mês** (M2) | Mensal só se foi digitado mensal; senão resumo | Sim, em aba opcional | Sem aba mensal agora. O mensal do RothC é resultado, não digitado |
| **Regenerativo: pontos** (M5) | Só a opção | Opção e pontos | Opção sempre. Pontos e nota seguem a decisão sobre resultado |
| **Explicar AR6 × AR4** (F2) | Não | Sim | Uma linha na aba Sobre ("GWP AR6"). Custa nada |

## Perguntas que o Paulo não entendeu

Refazer na reunião mostrando a planilha modelo, não texto.

| Pergunta | Como mostrar |
|---|---|
| C5 (abas por categoria) | Abrir a planilha modelo com as abas "Emissão · Fertilizantes", "Emissão · Combustíveis", "Remoção", "Regenerativo" |
| C6 (dados em lista) | Mostrar a mesma ureia em dois formatos: matriz (insumo × talhão) e lista (uma linha: fazenda, talhão, safra, "Ureia", 120, kg/ha). Perguntar: "vocês filtram assim no Excel?" |
| C7 (cores do LCA tool) | Print da aba Fertilizantes do LCA tool com a legenda (verde = dado do produtor, cinza = fator fixo) ao lado da nossa |
| M1 (clima da Remoção) | Mostrar a tabela de temperatura e chuva mensal que o RothC usa e perguntar se o auditor pede isso |
| E1 (CSV) | Não precisa. Os dois querem só `.xlsx` |
| F1 (`Total_Agro!D18`) | Paulo vai checar. Ruan confirmou erro. Conferir se a plataforma herdou |

## Requisitos novos (não estavam no questionário)

| Requisito | Quem pediu | Onde encaixa |
|---|---|---|
| Rastreabilidade: a planilha é cópia de guarda do que foi digitado | Paulo A1 | Aba Sobre com data, quem exportou, estado do projeto |
| Planilha própria do Paulo como referência | Paulo A3, A4 | Pedir o arquivo antes da planilha modelo |
| Cool Farm Tool como referência, além do LCA tool | Ruan A4 | Planilha modelo |
| Pacote de evidências em PDF, separado do Excel | Paulo B6 | Feature 04 (upload de evidência) |
| Só o auditor vê fatores de emissão, também fora da planilha | Paulo B3 | Feature 04. Levantar se as telas de cálculo mostram fator hoje |
| Uma planilha por fazenda é o que o Ruan usa hoje | Ruan A3 | Filtro por fazenda resolve |

## O que o código diz sobre as respostas

- **Regenerativo e Biodiversidade aceitam os dois níveis.** `RegenerativeAssessment`
  e `BiodiversityAssessment` têm `project_farm` obrigatório e `plot` opcional
  (`regenerative/models.py:65-78`, `biodiversity/models.py:22-35`). O primário do
  Regenerativo é único por `project_farm` (`regenerative/models.py:99-103`). A
  resposta do Paulo (Regenerativo por fazenda) bate com o código de hoje e não
  com CF-RN-01.
- **"Nome do produtor" não é campo.** A fazenda tem `responsible`, um usuário
  (`farms/models.py:13`). O nome do produtor seria o nome desse usuário, com
  e-mail, CPF e telefone no perfil. Fora por padrão é o caminho seguro.
- **Quem respondeu e quando já existe.** `BaseModel` tem `created_by`,
  `created_at` e `updated_by` (`core/models.py:4-27`).
- **Data, laboratório e método do SOC não existem.** `RothcCalculation` só tem
  `soc_tons_ha` (`rothc/models.py:66`).
- **Sem `openpyxl`** no projeto. É a única dependência nova.

## Efeito no rascunho de tasks

[05-rascunho-tasks.md](05-rascunho-tasks.md) foi reescrito. Mudanças:

- **Sai** "BE: Resumo por categoria" da fase 1. Vai para depois, se a reunião
  quiser resultado na planilha (P-1).
- **Sai** "Mesmo arquivo para todos". Entra "BE: Arquivo do auditor" com a aba
  de fatores.
- **Regenerativo e Biodiversidade sobem para a fase 1** com a Emissão e a Remoção
  (B1: os quatro, conforme contratados). São dados simples.
- **Coluna = unidade de coleta** muda o pivot: talhão × cultura na Emissão,
  talhão na Remoção, fazenda ou talhão no Regenerativo e na Biodiversidade.
- **BE: Guardar data, laboratório e método do SOC** deixa de ser condicional (M4).
- **Fica** a correção de unidade do combustível e de calcário/gesso: a planilha
  mostra o dado digitado e precisa da unidade certa.
- **Nova:** PROD: pedir a planilha própria do Paulo e montar a planilha modelo
  antes do dev.

## Pauta para 06/10

1. Resultado na planilha ou só no PDF (Paulo × Ruan, B2).
2. Por hectare ou total da área (C3).
3. LGPD em todas as saídas: nome do produtor, coordenadas, versão sem
   identificação. Decidir junto com PDF, QR e auditor.
4. Regenerativo e Biodiversidade: por fazenda ou por talhão. Muda o oficial do CF
   (CF-RN-01, CF-P-13), não só a planilha.
5. Cliente e técnico exportam?
6. Mostrar a planilha modelo e refazer C5, C6, C7.
7. Paulo manda a planilha própria (A3).
