# 06 · Análise das respostas (Paulo e Ruan, 30/09/2026)

Fontes: [Resosta_paulo.txt](Resosta_paulo.txt) e [resosta_ruan.txt](resosta_ruan.txt).
Ruan respondeu as 40. Paulo respondeu J e 1–23 com comentários longos e disse que
não entendeu as seções 5 e 6 (perguntas 24–30).

## O que mudou no nosso entendimento

1. **Linha de base e monitoramento são coletas reais, não simulações.** Paulo: a
   primeira coleta é a linha de base; as seguintes são monitoramento. Em cada
   uma há a "foto" real e, em cima dela, simulações para recomendar manejo. Logo,
   o oficial não é um só por talhão: é **um por talhão, módulo e safra** (Ruan,
   pergunta 6), e a linha de base é simplesmente a primeira safra do projeto.
2. **Projeto não é igual a safra.** Pode ser só linha de base (uma safra) ou
   linha de base + monitoramento de vários anos (Paulo J9, 5). Ruan prefere
   projeto novo por safra, com opção de duplicar os cálculos da safra anterior.
   Os dois casos existem, então os cálculos precisam de safra própria.
3. **O número declarado é da fazenda, média ponderada dos talhões.** Paulo (1,
   6, 27): o claim e o relatório com QR mostram um número por indicador por
   fazenda. Ruan (11): talhão, fazenda ou projeto, conforme o que o cliente quer
   reportar. O cálculo continua por talhão; a agregação é nova.
4. **Verificação é opcional e vem depois de finalizar.** Os dois concordam (J2,
   J5). Projeto sem claim para no "finalizado"; projeto com claim segue para a
   Control Union.
5. **QR só depois de verificado.** Paulo (18) e Ruan (J1 passo 8). PDF sem QR pode
   sair antes, marcado como não oficial (Paulo: a qualquer momento; Ruan: com
   marca d'água, ou só depois de finalizar se complicar).
6. **O auditor tem um fluxo próprio** (Paulo 4, Ruan 4, J6): só leitura; acesso a
   dados primários (planilha), PDF dos dashboards, evidências, fatores de emissão
   e equações; pode **aprovar** (trava de vez) ou **pedir correção** (reabre para
   Peterson e cliente). Ruan: a correção é uma não conformidade com prazo, ex.:
   30 dias.
7. **Todos os módulos precisam de oficial** (10), com foco em carbono (Paulo).

## Consenso: vira regra

| # | Regra | Base |
|---|---|---|
| R1 | Oficial por talhão × módulo × safra. Emissão também por cultura (soja e milho safrinha têm oficiais separados) | 6, 8 |
| R2 | Linha de base = primeira safra do projeto; monitoramento = as seguintes. Derivado, sem campo novo | Paulo 1, J1 |
| R3 | Simulação pode virar oficial | 2 (os dois) |
| R4 | Único cálculo do talhão vira oficial sozinho | 27 (os dois) |
| R5 | Finalizar é ação explícita. Acaba o "concluído" automático ao chegar a 100% | 13 (Ruan), J3/15 (Paulo) |
| R6 | Finaliza: admin do projeto; Ruan inclui gestor. Reabre: só a GAIA | 15, 16 |
| R7 | Ordem: finalizar → (opcional) verificar. Erro do auditor reabre o projeto | J5, J6 |
| R8 | Depois de verificado não reabre. Continuidade = novo projeto com os dados copiados | Paulo 16, 17 |
| R9 | Projeto finalizado: só leitura, inclusive simulações | Ruan 17, Paulo 17 |
| R10 | PDF sem QR a qualquer momento, marcado "não verificado". QR só verificado | 18 |
| R11 | Reabrir exige justificativa escrita | 22 (os dois) |
| R12 | Estado "verificado" existe na plataforma, com aprovação do auditor | Paulo 4, 20 |
| R13 | Remoção: estoque medido na linha de base, projeção de 5 anos, nova medição no 5º ano confirma | Ruan 9, Paulo 9 |
| R14 | Entregáveis: PDF, acesso à plataforma, QR, relatório formal, planilha | J7 |

Seções 5 e 6 (24–30) só o Ruan entendeu. As respostas dele seguem como padrão
até a reunião: dashboards e benchmark só com oficiais; simulações na comparação
só quando o usuário pedir; excluir o oficial pede para escolher outro; migrar os
projetos atuais marcando o mais recente como oficial.

## Divergências: decidir na reunião de 06/10

| Tema | Paulo | Ruan | Proposta |
|---|---|---|---|
| **Quando trava** (12) | Ao enviar para verificação. Projeto sem claim continua editável até o fim do contrato (J7) | Ao finalizar | **Finalizar trava.** Quem não vai fazer claim e quer continuar editando simplesmente não finaliza. Verificação é um passo depois do finalizado. Um estado a menos |
| **Remoção: o que se declara** (9) | Variação de estoque inicial × final, t CO2/ha | A projeção de 5 anos, confirmada por medição no 5º ano | Declarar a variação medida. A projeção aparece no relatório como informativa, separada. Normas (VM0042) só aceitam o período monitorado |
| **Fator de emissão atualizado** (19) | Ficam como estão (vai checar) | Recalcula, para comparar linha de base e safra atual na mesma metodologia | Os dois: o verificado nunca muda; no monitoramento seguinte a linha de base é **recalculada à parte** com os fatores novos só para comparação. Exige versão nos catálogos de fator nos dois casos |
| **Justificativa ao trocar oficial** (22) | Sempre | Só ao reabrir | Obrigatória só ao reabrir. Na troca, campo opcional |
| **Histórico de trocas para o auditor** (23) | Não | Sim | Gravar sempre (barato). Mostrar ao auditor fica para depois |
| **Dados do celular** (30) | Entram como oficial | Rascunho até alguém revisar | Entram como cálculo normal (R4 decide se vira oficial). A revisão dupla acontece na finalização (ver requisitos novos) |
| **Quem finaliza** (13, 15) | "Ação da GAIA, avaliando o contrato" (13) e "admin do projeto" (15) | Admin e gestor | Confirmar se o 13 fala de finalizar ou de bloquear acesso no fim do contrato |
| **Talhão sem oficial ao finalizar** (14) | Não entendeu | Bloquear | Bloquear. A média ponderada da fazenda precisa de todos os talhões |
| **Nome** (3) | Explicou BAU/cenário (só solo) | Não entendeu | Usar o vocabulário do Paulo: **Linha de base**, **Monitoramento**, **Simulação**, e o selo **Oficial** no cálculo escolhido |

## Requisitos novos (não estavam no questionário)

| Requisito | Quem pediu | Onde encaixa |
|---|---|---|
| Média ponderada por área dos talhões → número único por fazenda e projeto | Paulo 1, 6, 27 | Esta feature (agregação) |
| Validação de valores fora da realidade no preenchimento | Ruan J3 | Feature à parte, por módulo |
| Etapa de confirmação (dupla checagem) antes de finalizar | Ruan J3 | Stepper de finalização (já previsto) |
| Pedido de correção do auditor com prazo (não conformidade) | Ruan J6, Paulo 4 | Feature 04 (auditor) |
| Auditor vê evidências, fatores e equações | Paulo 4, Ruan 4 | Feature 04 |
| Duplicar projeto/cálculos para a safra seguinte | Ruan J9, Paulo 17 | Tarefa nova |
| Resultado anual consolidado da fazenda (até 3 safras) | Ruan 5 | Depois; depende da agregação |
| Bloquear acesso no fim do contrato | Paulo J7 | Fora do escopo; registrar |
| Proteção de dados (LGPD e leis globais) e suporte com resposta rápida | Ruan F1 | Fora do escopo; levar à reunião |

## O que o código diz sobre as respostas

- **Papéis são globais, mas o projeto tem um admin.** `Membership` liga usuário
  a papel (`admin`, `manager`, `technician`, `auditor`) sem projeto
  (`gaia-api/authx/models.py:153`). O projeto tem um campo `admin`, um usuário só
  (`projects/models.py:26`). "Admin do projeto" = esse usuário; "gestor" = papel
  global `manager`. "Só a GAIA reabre" mapeia para `is_staff`/`is_superuser`
  (`authx/authz/permissions.py:9`). Um usuário vê um projeto só se o criou, é o
  admin dele ou criou/é responsável por uma fazenda dele
  (`projects/selectors.py:17-28`). Não há como dar a um auditor acesso a um
  projeto específico: falta vínculo auditor × projeto.
- **Evidência existe só na Emissão**, e como texto: `evidence_file` é
  `CharField(500)` em insumos, fertilizantes, sementes, combustível, energia e
  transporte (`lca/models.py:400` em diante). Não há upload nos outros módulos.
- **Área do talhão existe** (`farms/models.py:86`, `area_ha`), então a média
  ponderada por área é viável. Para a pegada por kg de produto, o peso certo é a
  produção, não a área. Validar com o `sustainability-specialist`.
- **RothC não tem cultura por cálculo e o solo é contínuo entre safras.** O Paulo
  disse que o 8 é difícil para o solo. Proposta: na Remoção o oficial é por talhão
  e safra, sem cultura.

## Hipóteses

- **H1 (trava só ao finalizar): confirmada**, com ajuste. Finalizar trava;
  verificação é opcional e vem depois; o auditor pode devolver (reabre) ou aprovar
  (verificado, trava de vez).
- **H2 (jornada): confirmada**, com correções: passos 2 e 3 são o mesmo (o
  consultor coleta em campo já no computador ou celular); há dois tipos de projeto
  (com e sem claim); linha de base e monitoramento são coletas reais.

Estados do projeto propostos:

```
Em andamento ──100%──► Pronto para finalizar ──Finalizar (admin, revisão dupla,
     ▲                                          bloqueia talhão sem oficial)
     │                                                  │
     │ reabrir (só GAIA, justificativa;                 ▼
     │ PDF antigo deixa de valer)                   Finalizado ──Enviar para verificação──► Em verificação
     ├──────────────────────────────────────────────────┘                                    │      │
     └────────────────── Correção solicitada (auditor, prazo) ◄──────────────────────────────┘      │
                                                                                     Aprovar        ▼
                                                                                              Verificado (trava de vez, QR)
```

## Efeito no rascunho de tasks

[05-rascunho-tasks.md](05-rascunho-tasks.md) segue válido, com estas mudanças:

- **BE: Safra nos cálculos sem período** deixa de ser condicional. Projeto não é
  safra, então RothC, Regenerativo e Biodiversidade precisam de safra.
- **BE: Oficial por talhão e módulo** passa a ser por talhão × módulo × safra
  (× cultura na Emissão). Sem cultura na Remoção.
- **Nova: BE: Agregação ponderada por fazenda e projeto** (peso por área ou
  produção, conforme o indicador).
- **BE: Finalizar projeto** ganha os estados de verificação acima. Aprovar e
  pedir correção ficam na feature 04 (auditor), mas os estados nascem aqui.
- **BE: Snapshot** e **BE: Versão dos catálogos de fator** ficam confirmadas: as
  duas respostas do 19 precisam de versão de fator.
- **BE: Trilha de alterações do oficial**: gravar sempre; tela para auditor
  sai da fase 2.
- **Nova: BE/FE: Duplicar projeto para nova safra.**
- **Nova, fora desta feature: validação de faixa nos inputs.**

## Pauta para 06/10

1. Trava ao finalizar ou ao enviar para verificação (tabela acima, 1ª linha).
2. Remoção: variação medida ou projeção no claim.
3. Fator novo: o verificado fica, a linha de base é recalculada à parte. De acordo?
4. Acesso do auditor: quem libera a Control Union para um projeto (GAIA ou
   admin do projeto) e se o acesso acaba ao aprovar.
5. Peso da média: área ou produção, por indicador.
6. Refazer 24–30 com o Paulo mostrando telas, não texto. As perguntas estavam
   abstratas demais.
7. Prazo da não conformidade: a plataforma controla ou é só informativo?
