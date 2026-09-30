# 03 · Análise de produto e fluxo

Formato da skill `business-product-strategist`. Telas vão para o Penpot antes do
dev.

## Avaliação geral

O pedido cabe numa frase ("convida por e-mail, vê só aquele projeto, só lê"), e a
primeira versão pode ser isso. Mas o auditor não é um usuário comum com menos
botões: ele chega com uma pergunta diferente. O técnico pergunta "o que falta
preencher?"; o auditor pergunta "de onde veio este número e dá para refazer?". Se
a plataforma só esconder os botões de editar, ele navega por telas feitas para
preencher, abre talhão por talhão, e a verificação volta para planilha e e-mail.

## Problemas encontrados

- O papel auditor é global. Não serve para "auditor deste projeto".
- Não há convite nem membro de projeto; hoje só o admin da GAIA cria contas, com
  senha no e-mail.
- As telas mostram resultado e formulário, não o **rastro**: insumo → quantidade →
  fator → fonte → emissão.
- Fator sem versão e sem fonte em alguns catálogos. O verificador pede os dois.
- Sem log e sem trava: nada impede o número mudar no meio da auditoria.
- Simulações e oficiais misturados (resolvido pela feature 00).
- **A Control Union ainda não é VVB da Verra para carbono no solo** (só para
  plástico; VCS em acreditação). Ela pode verificar a pegada (ISO 14064-3), não a
  Remoção pelo padrão Verra ([02](02-pesquisa.md)). A promessa de venda precisa
  refletir isso.

## Oportunidades

- **Encurtar a verificação:** tudo que a Control Union pede num lugar (dado
  primário, fator, fonte, cálculo) corta dias de ida e volta por e-mail.
- **Vantagem de venda:** "a verificadora trabalha dentro da plataforma" é
  argumento para o Peterson e para a Control Union.
- **Base para o negócio futuro:** pedir verificação dentro da GAIA e a lista de
  verificadores só funcionam se o auditor já trabalha aqui.
- **Selo que se prova:** o "verificado" registrado na plataforma alimenta o PDF e
  a página do QR sem digitação.

## Redesign sugerido

### Fluxo do convite

```
Dono do projeto                          Auditor
─────────────────                        ─────────────────
Projeto ▸ Acesso ▸ [Convidar auditor]
  e-mail, organização, acesso até dd/mm
        │
        └──► e-mail "Você foi convidado para auditar o projeto X"
                                          │
                                          ├─ não tem conta → nome + senha → entra
                                          └─ tem conta     → login → aceita → entra
Acesso ▸ lista
  Ana (Control Union) · ativo até 30/12 · último acesso ontem   [Revogar]
  joao@… · convite pendente · vence em 5 dias                   [Reenviar] [Cancelar]
```

### O que o auditor vê

Entra direto no(s) projeto(s) para o(s) qual(is) foi convidado. Menu reduzido.
Faixa fixa: **"Auditoria · somente leitura · Projeto X · acesso até 30/12"**.

**Painel de verificação do projeto** (tela nova, a mais importante):

```
Projeto Soja MT 2025/26 · 12 fazendas · 18.400 ha          [Baixar Excel] [Baixar PDF]

            Emissão       Remoção       Regenerativo
Faz. A      ● oficial     ● oficial     ● oficial
Faz. B      ● oficial     ○ sem oficial ● oficial
Faz. C      ● oficial     ● oficial     ○ sem oficial
…
```

Cada célula abre o **rastro do cálculo**, em vez do formulário:

```
Fazenda A · Talhão 3 · Emissão · oficial de 12/09/2026

Fonte              Dado informado        Fator                      Fonte do fator         Emissão
Ureia              180 kg/ha             0,7330 kgCO₂e/kg           Ecoinvent 3.9 (…)      132 kgCO₂e/ha
Glifosato          3 L/ha                …                          …                      …
Diesel             45 L/ha               …                          …                      …
───────────────────────────────────────────────────────────────────────────────────────────
Total                                                                                      1.240 kgCO₂e/ha
Produção 3.600 kg/ha → 0,344 kgCO₂e/kg
```

Uma linha por insumo, com o fator **do dia do cálculo**, a fonte e a conta. Em
Remoção, as entradas do modelo (SOC, argila, profundidade, clima, janela,
culturas). Em Regenerativo e Biodiversidade, as respostas por indicador.

### Apontamentos e verificação (depois da v1)

- **Apontamento** num item (talhão × módulo, ou uma linha do rastro): tipo
  (correção obrigatória, esclarecimento, observação), texto, status (aberto,
  respondido, fechado). O dono responde; o auditor fecha. Mesmo padrão dos
  CAR/CL/FAR da Verra.
- **Ao enviar para verificação, o projeto trava** (como no One Click LCA); o
  auditor marca verificado ou não verificado.
- **Registrar verificação:** escopo (fazendas e módulos), período, nível de
  asseguração (limitada ou razoável), data, verificadora, arquivo da declaração. O
  selo do PDF e da página do QR passa a "Verificado por … em dd/mm".

## Hipóteses de trabalho

- **H1 · v1 = convite + leitura + download.** Apontamentos e registro de
  verificação na v2. Até lá, a Control Union aponta por fora e a GAIA só guarda o
  resultado (liga com a pergunta 20 da feature 00).
- **H2 · Auditor vê só oficiais.** Simulações ficam de fora.
- **H3 · Acesso com data de fim** definida no convite; o dono revoga quando quiser.
  Na v2, termina sozinho ao registrar a verificação, como no Vanta.
- **H4 · Só o admin do projeto convida.**

## Novos componentes

- Aba **Acesso** no projeto: membros, convites pendentes, revogar, reenviar.
- **Diálogo de convite** (e-mail, organização, data de fim).
- **Tela de aceite** do convite (criar conta ou entrar).
- **Faixa de modo auditoria.**
- **Painel de verificação** (matriz fazenda × módulo).
- **Rastro do cálculo** (tabela insumo → fator → fonte → emissão).
- v2: **apontamentos** (lista por projeto, badge de contagem nas células) e
  **registro de verificação**.

## Melhorias no fluxo

- Um convite, um clique no e-mail, direto no projeto. Sem ticket para a GAIA criar
  conta.
- Painel em vez de navegação talhão por talhão: o auditor vê o que falta de um
  olhar.
- Excel e PDF no topo do painel, sem procurar.

## Microinterações

- Convite enviado: toast com o e-mail e a validade.
- Hover numa célula do painel: data do oficial e quem marcou.
- Copiar uma linha do rastro para citar num apontamento.

## Impacto para o usuário

- Control Union verifica mais rápido e com menos pedidos por e-mail.
- Dono controla quem vê o quê e até quando.
- Peterson vende "verificação dentro da plataforma".

## Prioridade

- **Alta:** membro de projeto e checagem de acesso; somente leitura por projeto;
  convite com token; aba Acesso; revogar; auditor vê só oficiais; download.
- **Média:** painel de verificação; rastro do cálculo com fator e fonte; log de
  acesso; fechar os furos de escrita (Biodiversidade, upload).
- **Baixa (v2):** apontamentos; registro de verificação; versão dos fatores;
  anexar evidência; pedir verificação à Control Union; lista de verificadores.

## Complexidade

- **Baixa:** aba Acesso; faixa de modo auditoria; esconder simulações.
- **Média:** `ProjectMember` nas três funções de acesso, com teste por módulo;
  permissão de escrita por projeto (API e web); convite com token e aceite.
- **Alta:** rastro do cálculo com o fator do dia (exige guardar fator e fonte em
  todos os cálculos, não só em quatro); versão de catálogo de fatores;
  apontamentos com fluxo de status.
