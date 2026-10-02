# 07 · Análise das respostas (Paulo, 01/10/2026)

Fonte: [Resosta_paulo.txt](Resosta_paulo.txt). Só o Paulo respondeu este
questionário. Segunda fonte: o que Paulo e Ruan já disseram sobre auditor no
questionário do cálculo final (J5, J6, J7, 4, 16, 20, 23 e F1), analisado em
[../00_calculo_final/06-analise-respostas.md](../00_calculo_final/06-analise-respostas.md).

Regras do cálculo final citadas como CF-RN-n e CF-P-n
([07 do cálculo final](../00_calculo_final/07-versao-final-1.md)).

## O que mudou no nosso entendimento

1. **Apontamentos e "verificado" entram na primeira versão útil.** A hipótese H1
   (v1 só convite, leitura e download) caiu. Paulo (2, 3): o auditor consulta,
   faz apontamentos, devolve o projeto para correção ou marca verificado. Sem
   isso o auditor na plataforma não resolve nada que o e-mail já não resolva.
2. **Quem convida é a GAIA/Peterson, não o dono do projeto** (4). H4 caiu. O
   cliente não escolhe o auditor.
3. **O acesso acaba quando a verificação termina** (5). Não há data no convite.
   Isso contradiz a regra provisória do CF-P-4 (leitura continua depois de
   aprovar).
4. **Qualquer verificadora serve.** Paulo (1): a verificação agora é só dos
   cálculos e da metodologia, então não precisa de credenciamento Verra. A
   Control Union é preferência, não exclusividade. O alerta do README sobre a
   Control Union não ser VVB de solo deixa de bloquear: o que se promete é
   "cálculo e metodologia verificados", não crédito.
5. **Resultado final único: verificado** (15). Devolver para correção é um passo
   no meio do caminho, não um resultado. Não existe "não verificado" nem "com
   ressalvas".
6. **Auditor "às cegas"** (9). Não vê dados pessoais do produtor. Bate com o
   Paulo no export (B4, D4: tira o nome do produtor por LGPD) e com o Ruan no
   CF F1 (proteção de dados). Vira regra transversal.
7. **Evidência anexada a cada dado é o ideal** (11, "se possível seria o melhor
   dos mundos"), e o auditor confere Regenerativo e Biodiversidade com evidência
   (M2). Hoje só a Emissão tem campo de evidência, e é texto.
8. **Verificação cobre os quatro módulos** (M1).

## Consenso: vira regra

Com uma resposta só, "consenso" aqui é: Paulo respondeu, não há conflito com o
Ruan no CF e a resposta bate com a sugestão da Z2 ou com regra já fechada.

| # | Regra | Base |
|---|---|---|
| R1 | Auditor é qualquer verificadora convidada, Control Union de preferência. Organização é texto livre no convite | 1 |
| R2 | Auditor consulta, faz apontamentos, devolve para correção e marca verificado | 2, 3; CF 4 (Paulo e Ruan) |
| R3 | O mesmo auditor pode atuar em projetos de clientes diferentes | 6 |
| R4 | Projeto em verificação fica travado | 7; CF J5 e CF-RN-24 |
| R5 | Auditor vê só os oficiais | 8; CF-RN-15 |
| R6 | Fator de emissão: o auditor vê valor e fonte | 10 |
| R7 | Apontamento com tipo e status (aberto, respondido, fechado) | 13 |
| R8 | Registro de verificado: data, verificadora, nome do auditor, escopo (fazendas e módulos), período, PDF da declaração assinada. Sem nível de garantia | 14 |
| R9 | Verificação pedida quando Peterson e cliente decidem: é a ação "Enviar para verificação" do projeto finalizado | 16; CF-RN-31 |
| R10 | Acesso do auditor não é cobrado à parte; está no custo do projeto. Nada a construir | 17 |
| R11 | Lista de verificadores que pagam para aparecer: depois | 18 |
| R12 | Verificação cobre Emissão, Remoção, Regenerativo e Biodiversidade | M1 |
| R13 | Regenerativo e Biodiversidade: o auditor confere as respostas com evidência | M2 |
| R14 | Auditor não precisa ver o histórico de alterações | 12; Paulo CF 23 |

## Pontos em aberto

| Tema | Paulo | Outra fonte | Proposta |
|---|---|---|---|
| Quem convida (4) | "Só a equipe GAIA/Peterson" | Sugestão Z2: admin do projeto | Não há modelo de organização. Peterson não é `is_staff`. Proposta: convida quem é `is_staff` ou tem o papel global `admin` (hoje é quem cria contas). Confirmar que os usuários da Peterson têm esse papel |
| Fim do acesso (5) | Até o fim da verificação | CF-P-4 provisório: leitura continua | Acesso acaba ao registrar o verificado. Declaração e foto ficam no projeto. Ajustar CF-RN-35 |
| Nome do estado (7) | "Em auditoria" (a web já tem esse badge) | CF: "Em verificação" | "Em verificação": casa com "Enviar para verificação" e "Verificado". Trocar o badge da web |
| Às cegas (9) | Sem dados pessoais | Export: Paulo tira o nome do produtor; Ruan quer versão anonimizada (D4) | Esconder nome, CPF/CNPJ e contato do produtor. Fazenda aparece pelo nome, com município e UF. Problema: nota fiscal e laudo trazem nome e CPF do produtor. Decidir se a evidência vai como está (contrato com a verificadora cobre) ou se exige tarja |
| Verificar com apontamento aberto | — | Verra: CAR e CL fecham antes; FAR fica para a próxima | Bloquear o verificado com "correção" ou "esclarecimento" não fechado. "Observação" não bloqueia |
| Prazo da devolução | Não falou | Ruan (CF J6): não conformidade, 30 dias | Informativo, 30 dias por padrão (CF-RN-34) |
| Histórico para o auditor (12) | Não | Ruan (CF 23): sim | Não mostra. A trilha do oficial é gravada (CF-RN-08); tela depois |
| Evidência obrigatória (11, M2) | "Se possível" | Ruan (CF 4): auditor vê evidência | Anexo opcional por dado. Sem evidência, o auditor pede por apontamento |

## Requisitos novos (não estavam no questionário)

| Requisito | Quem pediu | Onde encaixa |
|---|---|---|
| Logo da verificadora na página do QR | Paulo, questionário 03 (17) | Registro de verificado guarda o logo; feature 03 usa |
| Fatores de emissão só para o auditor, nunca para o cliente | Paulo, export (B3); Ruan, export (B3: só no arquivo do auditor) | Feature 01 (aba de fatores no Excel do auditor) e rastro desta feature |
| Auditor exporta Excel | Paulo e Ruan, export (D3) | Feature 01; botão no painel desta feature |
| Upload da declaração pelo auditor | Derivado da 14 | Única escrita permitida ao auditor. Exceção na regra de somente leitura |

## O que o código diz sobre as respostas

Caminhos em `gaia-api`.

- **Papel `auditor` é global.** `Membership` liga usuário a papel, sem projeto
  (`authx/models.py:153`). Um técnico convidado como auditor de outro projeto
  continuaria escrevendo nele. Falta vínculo usuário × projeto com papel.
- **"GAIA/Peterson convida" não tem par no código.** Não há organização. O mais
  perto é `is_staff`/`is_superuser` (`authx/authz/permissions.py:14`) e o papel
  global `admin`, que já cria usuários.
- **Estados do projeto:** só `in_progress`, `completed`, `cancelled`
  (`projects/enum/project_status.py`). "Em verificação" e "Verificado" nascem no
  cálculo final (fase 3).
- **Evidência só na Emissão, como texto:** `evidence_file` é `CharField(500)` em
  seis tabelas de `lca/models.py` (linhas 400 a 593). Remoção, Regenerativo e
  Biodiversidade não têm nada. O upload por URL pré-assinada do S3 existe
  (`uploads/views.py:43`) e serve de base.
- **Furos de escrita do auditor:** o upload aceita o papel auditor
  (`uploads/views.py:43`) e a Biodiversidade deixa o auditor criar e cancelar
  avaliação (`biodiversity/views.py:106`, `:226`). Corrigir antes de abrir.

## Hipóteses

- **H1 (v1 = convite + leitura + download): derrubada.** Apontamentos e
  verificado são o centro da feature (2, 3).
- **H2 (auditor vê só oficiais): confirmada** (8).
- **H3 (acesso com data de fim): substituída.** Acaba ao registrar o verificado;
  revogável antes (5).
- **H4 (só o admin do projeto convida): derrubada.** Convida a GAIA/Peterson (4).
- **H5 (projeto trava durante a auditoria): confirmada** (7).

## Efeito no rascunho de tasks

[05-rascunho-tasks.md](05-rascunho-tasks.md) reescrito:

- As tasks de verificação da fase 4 do cálculo final (vínculo auditor × projeto,
  enviar, aprovar, pedir correção) **passam a morar aqui**. O cálculo final
  mantém os estados do projeto (fase 3) e aponta para cá.
- Apontamentos e registro de verificado saem da v2 e entram na fase de
  verificação.
- Convite muda de dono: GAIA/Peterson, não o admin do projeto. Sem data de fim.
- Versão de fator sai do escopo desta feature (já está no CF-RN-26). O rastro
  mostra valor e fonte gravados na foto.
- Nova fase de evidências por dado nos quatro módulos.
- Log de acesso e histórico de alterações para o auditor: depois.

## Pauta para 06/10

1. Quem é "equipe GAIA/Peterson" na plataforma: papel global `admin`? Os
   usuários da Peterson têm esse papel?
2. Acesso do auditor acaba ao verificar. De acordo em mudar o CF-RN-35?
3. Às cegas: o que esconder, e o que fazer com nota fiscal e laudo que trazem
   nome e CPF do produtor.
4. Nome do estado: "Em verificação" ou "Em auditoria".
5. Pode marcar verificado com observação aberta?
6. Evidência por dado: opcional ou obrigatória para Regenerativo e
   Biodiversidade?
