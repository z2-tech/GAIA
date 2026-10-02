# Auditor · versão final 1

Data: 02/10/2026. Base: reunião de 29/09, resposta do Paulo Rocha a este
questionário ([análise](07-analise-respostas.md)), respostas de Paulo e Ruan
Carlos Oliveira sobre auditor no questionário do cálculo final e o código atual
da `gaia-api`.

Regras marcadas com (P-n) são provisórias: seguem a proposta da Z2 até a decisão
da pendência n, listada no fim. As demais estão fechadas. Regras do cálculo final
aparecem como CF-RN-n e CF-P-n
([07 do cálculo final](../00_calculo_final/07-versao-final-1.md)).

## 1. O que é a feature

Uma verificadora (Control Union ou outra) entra na plataforma convidada para um
projeto específico. Ela lê os cálculos oficiais, os dados primários, os fatores
de emissão com fonte e as evidências, e baixa Excel e PDF. Não altera nada.

Durante a verificação o projeto fica travado. O auditor registra apontamentos.
Se algo precisa mudar, devolve o projeto para correção. Quando está tudo certo,
marca o projeto como verificado e anexa a declaração assinada. O acesso dele
acaba aí.

O verificado alimenta o selo do PDF (feature 02) e a página do QR (feature 03).

## 2. Por que

- Hoje a verificação acontece por e-mail e planilha. Cada pergunta do auditor
  vira uma rodada de dias.
- O papel `auditor` existe, mas vale para a plataforma inteira. Não dá para
  liberar alguém só num projeto, e um usuário com outro papel continuaria
  escrevendo.
- Não há convite: só o admin cria contas, com senha no e-mail.
- Sem trava, o auditor aprovaria um número que muda no dia seguinte. A trava vem
  do cálculo final (CF-RN-24).
- O QR só pode sair de projeto verificado (CF-RN-37). Sem o estado verificado na
  plataforma, o QR não sai.

## 3. Vocabulário

| Termo | Significado |
|---|---|
| Verificadora | Empresa que verifica (Control Union, de preferência). Texto livre no convite |
| Auditor | Pessoa da verificadora com acesso a um projeto |
| Apontamento | Registro do auditor sobre um item do projeto, com tipo e status |
| Devolver para correção | Ação do auditor que reabre o projeto para Peterson e cliente corrigirem |
| Verificado | Estado final do projeto, marcado pelo auditor, com a declaração anexada. Não reabre |
| Às cegas | O auditor não vê dados pessoais do produtor |

"Verificado" quer dizer cálculo e metodologia verificados. Não é crédito de
carbono nem verificação pelo padrão Verra.

## 4. Jornada

1. O projeto está finalizado (CF-RN-19 a CF-RN-23). Peterson e cliente decidem
   fazer o claim.
2. Admin do projeto, gestor ou GAIA envia o projeto para verificação. O estado
   passa a "Em verificação" e continua travado.
3. A equipe GAIA/Peterson convida o auditor pelo e-mail, com o nome da
   verificadora.
4. O auditor recebe o link, cria a conta ou entra com a que tem, e cai no
   projeto. Vê só esse projeto (e outros para os quais foi convidado).
5. No painel de verificação, o auditor vê fazenda × módulo com o oficial de cada
   um. Cada célula abre o rastro do cálculo. Baixa Excel (com fatores) e PDF.
6. O auditor registra apontamentos. Peterson e cliente respondem.
7. Se algo precisa mudar, o auditor devolve. O projeto volta para em andamento,
   Peterson e cliente corrigem, finalizam de novo e reenviam. O auditor continua
   com acesso.
8. Com tudo certo, o auditor marca verificado e anexa a declaração assinada. O
   projeto trava de vez. O acesso do auditor acaba.
9. PDF com selo verificado e QR ficam liberados (features 02 e 03).

## 5. Regras de negócio

### 5.1 Quem é o auditor e como entra

- RN-01 Qualquer verificadora pode ser convidada. A Control Union é a
  preferência, não exclusividade. O convite guarda o nome da verificadora.
- RN-02 Só a equipe GAIA/Peterson convida. Na plataforma: usuário `is_staff` ou
  com papel global `admin`. Admin do projeto e gestor do cliente não convidam.
  (P-1)
- RN-03 O convite é por e-mail, com link de uso único, válido por 7 dias e preso
  ao e-mail convidado. Quem não tem conta cria nome e senha no aceite; quem tem,
  só aceita. Nunca senha por e-mail.
- RN-04 Pode convidar quando o projeto está finalizado ou em verificação. Antes
  disso, não. (P-2)
- RN-05 Um projeto pode ter mais de um auditor. O mesmo auditor pode estar em
  projetos de clientes diferentes e nunca vê um projeto para o qual não foi
  convidado.
- RN-06 O papel de auditor vale por projeto. Um usuário que é técnico num projeto
  e auditor em outro escreve só no primeiro.

### 5.2 Fim do acesso

- RN-07 O acesso do auditor acaba quando o projeto vira verificado. A GAIA pode
  revogar antes. (P-3)
- RN-08 Devolver para correção não encerra o acesso. O auditor acompanha a
  correção e recebe o projeto de volta.
- RN-09 Encerrado o acesso, o registro de verificado, a declaração e a foto
  ficam no projeto. Se a verificadora precisar consultar de novo, a GAIA convida
  outra vez.

### 5.3 O que o auditor vê

- RN-10 Só leitura. A única escrita do auditor é registrar apontamentos, devolver,
  marcar verificado e anexar a declaração.
- RN-11 Só os oficiais. Simulações não aparecem em lista, painel, comparação ou
  download (CF-RN-15).
- RN-12 O auditor lê da foto feita na finalização (CF-RN-25), não do cálculo
  vivo.
- RN-13 Às cegas: o auditor não vê nome, CPF/CNPJ nem contato do produtor. Vê a
  fazenda pelo nome, com município e UF. (P-4)
- RN-14 Fator de emissão: valor e fonte do fator usado no cálculo, como estava na
  foto. A versão do catálogo existe por dentro (CF-RN-26), mas não aparece.
- RN-15 O auditor baixa o Excel com a aba de fatores (só o arquivo do auditor tem
  fatores, feature 01) e o PDF (feature 02).
- RN-16 O auditor não vê o histórico de alterações nem de trocas do oficial. A
  trilha é gravada mesmo assim (CF-RN-08). (P-7)

### 5.4 O que o auditor vê, por módulo

Todos os módulos entram na verificação.

| Módulo | Rastro do cálculo | Evidência que o auditor confere |
|---|---|---|
| Emissão | Uma linha por insumo: dado informado, unidade, fator, fonte do fator, emissão. Separado por fonte (fertilizante, calcário, defensivo, semente, combustível, energia, transporte, mudança de uso do solo) e por fóssil, biogênico e mudança de uso. Produção, alocação e a divisão que dá o kgCO2e/kg | Nota fiscal de insumo, combustível, energia |
| Remoção | Entradas do modelo: SOC inicial (com data, laboratório e método da análise), argila, profundidade, latitude, clima e fonte, janela de modelagem, culturas e manejo por cenário (BAU e projeto), versão do modelo. Estoque inicial e final | Laudo de solo |
| Regenerativo | Contexto da fazenda e resposta de cada um dos 28 indicadores, com pontos obtidos e disponíveis; versão do índice e das faixas | Evidência por indicador (foto, documento) |
| Biodiversidade | As 43 respostas sim/não por área, score geral e por seção | Evidência por resposta |

- RN-17 Regenerativo e Biodiversidade são autodeclarados. O auditor confere as
  respostas com evidência.
- RN-18 Evidência é anexada a cada dado, nos quatro módulos. O anexo é opcional;
  sem ele, o auditor pede por apontamento. (P-8)

### 5.5 Apontamentos

- RN-19 O auditor registra apontamentos em um item: o projeto, uma célula
  fazenda × módulo, ou uma linha do rastro.
- RN-20 Tipos: correção obrigatória, esclarecimento e observação (para a próxima
  verificação). Mesmo padrão dos CAR, CL e FAR da Verra.
- RN-21 Status: aberto → respondido → fechado. Peterson e cliente (técnico,
  gestor, admin do projeto, GAIA) respondem com texto. Só o auditor fecha. O
  auditor pode reabrir um respondido.
- RN-22 Apontamentos ficam no projeto depois da verificação e passam de uma
  rodada de correção para a seguinte.

### 5.6 Devolver para correção

- RN-23 O auditor devolve o projeto quando há correção obrigatória. Exige pelo
  menos um apontamento aberto desse tipo.
- RN-24 Devolver leva o projeto de "Em verificação" para "Em andamento"
  (CF-RN-33). Os cálculos voltam a ser editáveis. A foto anterior deixa de valer
  e é refeita na próxima finalização (CF-RN-29).
- RN-25 A devolução tem prazo informativo, 30 dias por padrão. A plataforma
  mostra o prazo e não bloqueia nada ao vencer (CF-RN-34). (P-6)
- RN-26 Corrigido, o admin do projeto finaliza de novo (com a revisão do
  CF-RN-20) e reenvia para verificação. O mesmo auditor recebe o projeto.

### 5.7 Verificado

- RN-27 O único resultado final é "verificado". Não existe "não verificado" nem
  "verificado com ressalvas".
- RN-28 Marcar verificado é bloqueado enquanto houver apontamento de correção
  obrigatória ou esclarecimento sem fechar. Observação aberta não bloqueia. (P-5)
- RN-29 O registro de verificado guarda: data, verificadora, nome do auditor,
  escopo (fazendas e módulos), período (safras) e o PDF da declaração assinada.
  Logo da verificadora opcional, usado na página do QR (feature 03). Sem nível de
  garantia.
- RN-30 Projeto verificado não reabre (CF-RN-30). Correção ou continuidade =
  novo projeto.
- RN-31 O verificado muda o selo do PDF para "Verificado por <verificadora> em
  dd/mm/aaaa" e libera o QR (features 02 e 03).

### 5.8 Negócio

- RN-32 O acesso do auditor não é cobrado à parte. Está no custo do projeto.
- RN-33 Contratar a verificadora pela plataforma e lista de verificadores que
  pagam para aparecer ficam para depois.

## 6. Estados do projeto

Os estados nascem no cálculo final (fase 3). Esta feature liga as transições do
auditor.

```
Finalizado ──Enviar para verificação──► Em verificação ──Marcar verificado──► Verificado
    ▲          (admin, gestor, GAIA)          │   (auditor, sem correção ou
    │                                         │    esclarecimento aberto)
    │                                         │
    └──Finalizar de novo◄── Em andamento ◄────┘
                                       Devolver para correção
                                       (auditor, apontamento de correção, prazo)
```

O nome do estado é "Em verificação". A web hoje tem o badge "Em auditoria"; ele
muda. (P-9)

| Estado | Auditor vê | Auditor age | Peterson e cliente |
|---|---|---|---|
| Finalizado | sim, se já convidado | não | leem; enviam para verificação |
| Em verificação | sim | aponta, devolve, verifica | leem; respondem apontamentos |
| Em andamento (devolvido) | sim, com aviso "em correção, dados podem mudar" | aponta, fecha | editam, respondem, finalizam, reenviam |
| Verificado | não (acesso encerrado) | não | leem; PDF com selo e QR |

## 7. Quem faz o quê

| Ação | Técnico | Gestor | Admin do projeto | Auditor | GAIA/Peterson |
|---|---|---|---|---|---|
| Enviar para verificação | não | sim | sim | não | sim |
| Convidar e revogar auditor | não | não | não | não | sim (P-1) |
| Ver o projeto em verificação | sim | sim | sim | sim | sim |
| Registrar e fechar apontamento | não | não | não | sim | não |
| Responder apontamento | sim | sim | sim | não | sim |
| Devolver para correção | não | não | não | sim | não |
| Marcar verificado e anexar declaração | não | não | não | sim | não |
| Baixar Excel com fatores | não | não | não | sim | sim |
| Baixar PDF | sim | sim | sim | sim | sim |

"GAIA/Peterson" = `is_staff` ou papel global `admin` (P-1).

## 8. O que muda no sistema

| Área | Mudança |
|---|---|
| Membro de projeto | Tabela nova: projeto, usuário, papel no projeto (auditor), verificadora, convidado por, aceito em, revogado em, encerrado em |
| Acesso | As três funções de acesso (`_user_accessible_project_qs`, `user_has_project_farm_access`, `_user_accessible_farm_qs`) incluem membros ativos |
| Escrita | Checagem "é auditor deste projeto" nas escritas, no lugar do papel global. Fecha os furos da Biodiversidade e do upload |
| Convite | Token com hash, uso único, 7 dias, preso ao e-mail, no padrão do `PasswordResetToken`; e-mail via Resend |
| Permissão na web | A web lê o papel do usuário no projeto, não os papéis globais (`useCanWriteAssessments` sai) |
| Dados pessoais | Serializers escondem nome, CPF/CNPJ e contato do produtor para o auditor |
| Rastro | Endpoint por módulo que lê da foto: valor e fonte do fator em todas as fontes da Emissão; entradas do RothC; respostas do Regenerativo e da Biodiversidade |
| Catálogos de fator | `source` em todos (fertilizante não tem) |
| Apontamento | Tabela nova: projeto, alvo (célula ou linha), tipo, status, texto, respostas, quem e quando |
| Verificação | Transições enviar, devolver e verificar; registro de verificado com declaração e logo |
| Evidência | Anexo por dado nos quatro módulos, via upload S3 que já existe; substitui o `evidence_file` de texto da Emissão |

## 9. Fases de entrega

0. **Correções antes de abrir:** unidade de combustível, janela do RothC, delta
   BAU × projeto, denominadores do Regenerativo e da Biodiversidade, furos de
   escrita do auditor.
1. **Acesso:** membro de projeto, convite, leitura por projeto, só oficiais, às
   cegas, permissão na web. Pode ser construída já; só vai para produção junto
   com a fase 3 do cálculo final, porque o convite exige projeto finalizado
   (RN-04).
2. **Painel e rastro:** painel fazenda × módulo, rastro com valor e fonte,
   downloads. Depende da foto (CF fase 3) e do Excel do auditor (feature 01).
3. **Verificação:** enviar, apontamentos, devolver, verificar, registro e fim do
   acesso. Destrava o selo do PDF e o QR.
4. **Evidências:** anexo por dado nos quatro módulos.

Tasks: [05-rascunho-tasks.md](05-rascunho-tasks.md).

## 10. Fora desta feature

| Item | Onde |
|---|---|
| Estados do projeto, finalizar, reabrir, foto, versão de fatores | Cálculo final (fase 3) |
| Aba de fatores no Excel do auditor | Feature 01 |
| Selo verificado no PDF | Feature 02 |
| Página do QR com verificadora e logo | Feature 03 |
| Histórico de alterações e de trocas do oficial para o auditor | Depois (P-7) |
| Log de acesso do auditor (o que abriu, o que baixou) | Depois, se pedirem |
| Contratar verificadora pela plataforma; lista de verificadores | Depois (RN-33) |
| Bloquear acesso do cliente no fim do contrato | Produto/comercial |

## 11. Pendências

Decidir na reunião de 06/10. Até lá valem as regras provisórias indicadas. O
Ruan não respondeu este questionário; a coluna dele traz o que disse no cálculo
final, quando disse.

| # | Pergunta | Paulo | Ruan | Regra provisória |
|---|---|---|---|---|
| P-1 | Quem é "equipe GAIA/Peterson" na plataforma? Os usuários da Peterson têm o papel global `admin`? | Só GAIA/Peterson convida (4) | — | `is_staff` ou papel global `admin` (RN-02) |
| P-2 | Pode convidar antes de finalizar, para o auditor acompanhar? | — | — | Só finalizado ou em verificação (RN-04) |
| P-3 | O acesso acaba ao verificar? Muda a regra provisória do CF-P-4 (leitura continua) | Até o fim da verificação (5) | — | Acaba ao verificar; GAIA reconvida se preciso (RN-07, RN-09) |
| P-4 | Às cegas: o que esconder? E nota fiscal e laudo, que trazem nome e CPF do produtor? | Sem dados pessoais (9); tirar nome do produtor no export | Proteção de dados é o ponto principal (CF F1) | Esconde nome, CPF/CNPJ e contato; fazenda pelo nome com município e UF; evidência vai como está (RN-13) |
| P-5 | Pode marcar verificado com apontamento aberto? Quais tipos bloqueiam? | Só verificado (15) | — | Correção e esclarecimento bloqueiam; observação não (RN-28) |
| P-6 | O prazo da devolução é controlado ou informativo? | — | 30 dias (CF J6) | Informativo, 30 dias (RN-25) |
| P-7 | O auditor vê o histórico de trocas e alterações? | Não (12; CF 23) | Sim (CF 23) | Não vê; trilha gravada (RN-16) |
| P-8 | Evidência é obrigatória para verificar Regenerativo e Biodiversidade? | Anexada a cada dado, "se possível" (11); confere com evidência (M2) | Auditor vê evidência (CF 4) | Opcional; auditor pede por apontamento (RN-18) |
| P-9 | Nome do estado: "Em verificação" ou "Em auditoria"? | "Em auditoria" (7) | — | "Em verificação", igual ao cálculo final |
