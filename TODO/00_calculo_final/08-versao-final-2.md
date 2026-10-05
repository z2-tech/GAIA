# Cálculo final · versão final 2: fechamento por recorte

Data: 02/10/2026. Base: [reunião de 02/10](../../docs/references/meetings/02-10-26-fechamento-recorte-media-ponderada/02-10-26-reuniao-transcricao-e-pontos.md)
(decisões D1–D18), a [versão final 1](07-versao-final-1.md) e o código atual da
`gaia-api`.

Substitui a versão final 1. A v1 fica como histórico: o modelo dela (selo
"oficial" marcado em cada talhão durante o trabalho e projeto inteiro
finalizado de uma vez) caiu na reunião.

Regras marcadas com **(P-n)** são provisórias e seguem a proposta da Z2 até a
decisão da pendência n, no fim. As demais estão fechadas. Próxima validação: a
apresentação do design no Penpot, sem novo questionário (D18).

## 1. O que é a feature

Durante o projeto o usuário faz quantos cálculos quiser, em qualquer talhão e
módulo. Nenhum é "oficial" enquanto está sendo feito.

Quando o cliente precisa de um número para vender ou reportar, o dono do
projeto faz um **fechamento**: escolhe uma cultura e um ano safra (ex.: milho
2025), seleciona as fazendas, os talhões e, em cada talhão, o cálculo que
representa o real. A plataforma faz a média ponderada por área e mostra um
número por indicador para o projeto. Ao confirmar, os cálculos escolhidos
travam e a plataforma guarda uma foto daquele momento.

O fechamento pode ir para auditoria ou não. O projeto continua: no ano seguinte
faz-se outro fechamento, e o anterior fica travado lá dentro.

Export, PDF, QR code e auditor leem do fechamento.

## 2. O que mudou desde a versão 1

| Tema | v1 | v2 |
|---|---|---|
| Oficial | Selo em cada talhão × módulo × safra, marcado durante o trabalho; o primeiro cálculo virava oficial sozinho | Não existe selo. O real é escolhido na tela de seleção, na hora de fechar, com clique explícito (D1) |
| O que fecha | O projeto inteiro | Um recorte: projeto × cultura × ano safra. O projeto continua (D2) |
| Safra | `harvest_year` em todos os módulos | Emissão com mês e ano de início e de fim; Regenerativo com ano safra; Remoção com a janela que já tem (D3, D4) |
| Número declarado | Por fazenda, depois projeto | Por projeto, para uma cultura e um ano (D2, D16) |
| Peso da média | Área; produção na pegada por kg | Área em todos (D6) |
| Remoção declarada | Variação de estoque medida | Sequestro modelado recortado no período da cultura (D5) |
| Trava | Ao finalizar o projeto | Ao fechar o recorte, com ou sem auditoria (D7) |
| Fator novo | Linha de base recalculada à parte | Travado fica; alerta "fatores anteriores"; anos novos usam o fator novo (D10) |
| Quem fecha | Admin, gestor e GAIA | Admin do projeto e gestor; a GAIA só encerra o projeto no fim do contrato (D11) |
| Reabrir | Só GAIA | Verificado nunca; fechado sem auditoria em aberto (P-1) |
| Correção do auditor | Projeto volta para em andamento | O fechamento destrava; corrige-se o mesmo cálculo, sem trocar a seleção (D9) |
| Celular | Pendente | Enviado = dado oficial (D12) |

## 3. Vocabulário

| Termo | Significado |
|---|---|
| **Cálculo** | Qualquer avaliação feita num talhão ou fazenda, em qualquer módulo. Pode ser teste ou real; a plataforma não distingue até o fechamento |
| **Recorte** | Cultura + ano safra. Ex.: milho 2025 |
| **Fechamento** | Registro que junta, para um recorte, os cálculos escolhidos de cada talhão, as médias ponderadas e a foto. Tem estado próprio |
| **Foto** | Cópia imutável, feita ao fechar, dos inputs, resultados, fatores e números agregados |
| **Fechado** | Fechamento sem auditoria, travado |
| **Em verificação** | Fechamento enviado ao auditor, travado |
| **Devolvido** | O auditor pediu correção; os cálculos do fechamento destravam |
| **Verificado** | O auditor aprovou. Não reabre |
| **Claim** | Comunicação pública de um resultado. Na GAIA é insetting: claim do ano, não da projeção |

"Linha de base" e "cenário BAU/projeto" continuam só dentro da Remoção (as duas
rodadas do RothC). "Simulação" e "oficial" deixam de ser termos de tela.

## 4. Jornada

1. A Peterson fecha contrato com o cliente. Cadastra o projeto (sem ano), as
   fazendas e os talhões. Fazenda homogênea = um talhão só, do tamanho da
   fazenda.
2. A equipe coleta em campo (web ou celular) e preenche os cálculos: Emissão
   por cultura e período, Remoção com a janela de modelagem, Regenerativo por
   ano. Faz quantos testes quiser.
3. O cliente acha um comprador que exige o carbono do milho 2025.
4. O admin do projeto abre a tela de seleção, escolhe **milho 2025**, as
   fazendas, os talhões e, em cada talhão e módulo, o cálculo real.
5. A plataforma mostra o resumo: pegada e emissão por hectare, remoção no
   período do milho, score Regenerativo do ano, com a cobertura (fazendas e
   área).
6. O admin escolhe **fechar sem auditoria** ou **fechar e enviar para
   auditoria** e confirma. Os cálculos escolhidos travam; a foto é gravada.
7. Com auditoria, o auditor lê, comenta e devolve ou aprova. Devolvido, o
   fechamento aparece em vermelho; o clique leva ao campo com o comentário; a
   equipe corrige o mesmo cálculo e reenvia.
8. Aprovado, o fechamento fica verificado. PDF com QR liberado.
9. No ano seguinte, a equipe preenche 2026 no mesmo projeto e faz o fechamento
   milho 2026. O de 2025 segue travado e alimenta o gráfico de evolução.
10. No fim do contrato, se ninguém encerrou, a GAIA encerra o projeto.

## 5. Regras de negócio

### 5.1 Cálculos e período

- **RN-01** Cada talhão pode ter quantos cálculos quiser em cada módulo. Antes
  de entrar num fechamento, todos são iguais: sem selo, sem ordem de
  prioridade.
- **RN-02** O projeto não tem ano. O período fica em cada cálculo.
- **RN-03** Emissão: cultura e período de cultivo, com mês e ano de início
  (plantio) e mês e ano de fim (colheita). O ano safra do cálculo é o ano de
  fim. Um talhão pode ter até três culturas no mesmo ano safra.
- **RN-04** Remoção: a janela de modelagem e os ciclos de cultura com mês e ano,
  como hoje (`RothcScenarioCropCycle`). Pode ser por talhão ou pela fazenda
  inteira (talhão único).
- **RN-05** Regenerativo: ano safra, ano fechado. A fazenda pode ter vários,
  normalmente um por ano. Sai a regra de um `is_primary` por fazenda do
  projeto.
- **RN-06** Biodiversidade: ano safra, igual ao Regenerativo. **(P-5)**

### 5.2 Fechamento

- **RN-07** Um fechamento é de um projeto, uma cultura e um ano safra. O projeto
  pode ter vários, inclusive de anos anteriores (retroativo, com evidência) e
  de culturas diferentes no mesmo ano.
- **RN-08** Não pode haver dois fechamentos ativos com o mesmo projeto, cultura
  e ano.
- **RN-09** O fechamento é feito na tela de seleção, a mesma da comparação, em
  modo fechamento. Saídas da tela: fechar sem auditoria, fechar e enviar para
  auditoria, ou só comparar (não fecha nada).
- **RN-10** Passos: cultura e ano → fazendas → talhões de cada fazenda → em cada
  talhão e módulo, o cálculo. A tela só oferece cálculos compatíveis:
  - Emissão da cultura escolhida com ano safra igual ao do recorte.
  - Remoção cuja janela cobre o período da Emissão escolhida no talhão.
  - Regenerativo da fazenda com o ano do recorte.
- **RN-11** Nada entra sem clique do usuário, nem quando o talhão tem um cálculo
  só. Seleção em lote é possível; o desenho fica para o Penpot.
- **RN-12** Entram os módulos contratados no projeto (`Project.modules`). O
  usuário pode tirar um módulo do fechamento. Cada talhão selecionado precisa
  de um cálculo em cada módulo incluído. **(P-5)**
- **RN-13** Fazendas e talhões não selecionados ficam de fora. O fechamento
  mostra a cobertura: "8 de 10 fazendas, 82% da área do projeto".
- **RN-14** Antes de confirmar: resumo com os números agregados e a lista do que
  vai travar, e confirmação explícita.
- **RN-15** Fecham: o admin do projeto (`Project.admin`) e o gestor
  (`manager`). A GAIA não fecha recortes.
- **RN-16** Auditoria se escolhe ao fechar, não ao criar o projeto. Fechado sem
  auditoria pode ser enviado depois.

### 5.3 Números do fechamento

- **RN-17** Agregação em dois níveis: talhão → fazenda e fazenda → projeto, por
  média ponderada pela área. Peso do talhão: a área do cálculo (`area_ha` na
  Emissão; área do talhão nos outros). Peso da fazenda: a soma das áreas dos
  talhões selecionados.
- **RN-18** O peso é a área em todos os indicadores. O Paulo sabe que isso dá
  menos peso a fazenda pequena de alta produtividade e decidiu assim (D6).
  Conferir a fórmula com a planilha que ele vai mandar.
- **RN-19** Números do recorte (D16):
  - Emissão: pegada (kg CO2e por kg ou t do produto) e emissão por hectare.
  - Remoção: remoção no período da cultura, em t C e t CO2.
  - Regenerativo: score do ano.
  - Biodiversidade: **(P-5)**.
- **RN-20** Remoção recortada: soma do sequestro modelado nos meses entre o
  início e o fim da Emissão escolhida naquele talhão. O RothC já grava o
  resultado mês a mês (`RothcMonthlyResult`). O recorte pelo período da cultura
  é a regra de alocação provisória entre culturas da rotação. **(P-2)**
- **RN-21** A curva completa e a projeção de 5 anos aparecem como informativas,
  fora do número do recorte.
- **RN-22** A Remoção nunca é subtraída da Emissão.

### 5.4 Trava e foto

- **RN-23** Fechar trava os cálculos escolhidos: não editam, não recalculam,
  não cancelam. Os outros cálculos do projeto continuam livres, e o projeto
  segue.
- **RN-24** Ao fechar, a plataforma grava a foto: a seleção, inputs e resultado
  de cada cálculo, fatores usados (valor e fonte), parâmetros e clima do RothC,
  pesos do Regenerativo, as médias e os números do recorte, com hash.
- **RN-25** Os catálogos de fator ganham versão. Fator novo não altera foto nem
  cálculo travado.
- **RN-26** Cálculo travado feito com fator que já mudou mostra o alerta
  "Calculado com fatores de dd/mm/aaaa". Nada é recalculado.
- **RN-27** Um cálculo de Remoção pode entrar em mais de um fechamento (milho
  2025 e soja 2026 na mesma janela). Trava no primeiro. **(P-6)**
- **RN-28** Duplicar um cálculo travado cria um cálculo novo, livre.

### 5.5 Auditoria

- **RN-29** Enviado para auditoria, o fechamento fica em verificação. Só o
  auditor age: lê, comenta, devolve ou aprova (feature 04).
- **RN-30** Devolver: o auditor deixa comentário nos campos com problema. Os
  cálculos do fechamento destravam para correção. A seleção não muda: corrige-se
  o mesmo cálculo, não se troca por outro (D9).
- **RN-31** Na lista de fechamentos, o devolvido aparece em vermelho. O clique
  leva ao campo com o comentário do auditor.
- **RN-32** Corrigido, o admin ou gestor reenvia. A foto é refeita.
- **RN-33** Aprovado, o fechamento fica verificado, travado para sempre. Libera
  PDF com QR.
- **RN-34** Prazos da auditoria (resposta do auditor, correção, número de
  rodadas). **(P-3)**

### 5.6 Reabertura

- **RN-35** Verificado não reabre para o usuário. A única exceção é erro de
  cálculo da plataforma (RN-37).
- **RN-36** Fechado sem auditoria: o admin do projeto ou o gestor pode reabrir,
  com justificativa escrita. Os cálculos destravam; o PDF anterior vira
  substituído; fechar de novo gera foto nova. **(P-1)**
- **RN-37** Erro de cálculo da plataforma num fechamento travado: só a GAIA
  corrige, com justificativa, gerando foto nova e marcando o documento anterior
  como substituído. **(P-1)**

### 5.7 Projeto e contrato

- **RN-38** 100% de preenchimento não fecha nada. Sai o `auto_complete_project`.
- **RN-39** O projeto fica em andamento até o fim do contrato. Quem encerra é o
  dono do projeto ou, se ninguém encerrar, a GAIA. Projeto encerrado é só
  leitura.
- **RN-40** O projeto ganha uma aba de fechamentos: um por linha (milho 2025,
  soja 2025, milho 2026), com estado e os números do recorte. Base para o
  gráfico de evolução.

### 5.8 Celular

- **RN-41** O celular só coleta. O dado fica na caixa de saída até o envio;
  enviado, vale como dado preenchido na web.
- **RN-42** Conflito na sincronização (outra pessoa mexeu no mesmo cálculo): o
  app mostra o que mudou e o usuário escolhe.

### 5.9 Consumidores e dados existentes

- **RN-43** Comparação, dashboards de talhão e completude usam todos os cálculos,
  como hoje. Benchmark (média, p25, p75) usa só cálculos que estão em
  fechamento. **(P-10)**
- **RN-44** Nada vira fechamento na migração. Projetos em `completed` voltam
  para em andamento.
- **RN-45** Emissão antiga: o período fica vazio e a tela de fechamento pede para
  completar antes de usar o cálculo. Regenerativo antigo: ano pela data de
  criação; o `is_primary` sai.

## 6. Estados do fechamento

```
                ┌─ sem auditoria ─► Fechado ──Reabrir (dono, justificativa)──► (cálculos livres)
Tela de seleção ┤                     │
  (confirmar)   │                     └─Enviar para auditoria─┐
                └─ com auditoria ─────────────────────────────┴─► Em verificação ──Aprovar──► Verificado
                                                                      │   ▲
                                                               Devolver   Reenviar
                                                                      ▼   │
                                                                   Devolvido
```

| Estado | Cálculos do fechamento | PDF | QR | Auditor |
|---|---|---|---|---|
| Fechado | travados | autodeclarado | não | não |
| Em verificação | travados | autodeclarado | não | lê, comenta, devolve, aprova |
| Devolvido | editáveis (mesmos cálculos) | autodeclarado anterior vira substituído | não | lê, comenta |
| Verificado | travados para sempre | verificado | sim | lê |

Estado do projeto: só **em andamento** e **encerrado**. `completed` sai.

## 7. Quem faz o quê

| Ação | Técnico | Gestor | Admin do projeto | Auditor | GAIA (staff) |
|---|---|---|---|---|---|
| Criar e editar cálculos livres | sim | sim | sim | não | sim |
| Fechar recorte | não | sim | sim | não | não |
| Enviar para auditoria | não | sim | sim | não | não |
| Reabrir fechado sem auditoria | não | sim **(P-1)** | sim **(P-1)** | não | não |
| Corrigir erro de cálculo em fechamento travado | não | não | não | não | sim **(P-1)** |
| Comentar, devolver, aprovar | não | não | não | sim | não |
| Encerrar o projeto | não | sim | sim | não | sim, no fim do contrato |

## 8. O que muda no sistema

| Área | Mudança |
|---|---|
| Emissão (`LcaProjectCulture`) | `start_month`, `start_year`, `end_month`, `end_year`; `harvest_year` passa a ser o ano de fim; FK real de `plot` (hoje `plot_id` é inteiro solto); `created_by` |
| Remoção | Nada estrutural. Recorte lê `RothcMonthlyResult`; gravar a janela de modelagem (já listado como correção do auditor) |
| Regenerativo | `harvest_year`; sai a constraint `uniq_primary_assessment_per_project_farm` |
| Biodiversidade | `harvest_year` **(P-5)** |
| Fechamento (novo) | `Closing`: projeto, cultura, ano safra, com auditoria, estado, quem e quando fechou, enviou, devolveu, aprovou, reabriu, justificativa. `ClosingItem`: fazenda, talhão, módulo, cálculo, área usada como peso |
| Foto (nova) | JSON imutável com hash, ligado ao fechamento |
| Agregação | Selector de média ponderada talhão → fazenda → projeto; recorte mensal da Remoção |
| Trava | Bloqueio de escrita nos quatro módulos para cálculo em fechamento travado |
| Fatores | Versão nos catálogos; o cálculo guarda a versão usada; alerta de fator antigo |
| Projeto | Sai `auto_complete_project`; estado encerrado; aba de fechamentos |
| Tela de seleção | Modo fechamento na comparação; mais de 4 itens (feature 06) |
| Celular | Caixa de saída e tela de conflito |

## 9. Fases de entrega

1. **Design no Penpot e apresentação** (D18): tela de seleção em modo
   fechamento, resumo e confirmação, lista de fechamentos do projeto, estados,
   devolvido em vermelho com atalho ao campo, alerta de fator antigo, período na
   Emissão, ano no Regenerativo. Fecha P-1, P-5, P-10 e parte da P-6.
2. **Período e ano nos cálculos:** Emissão com início e fim, Regenerativo com ano
   safra e vários por fazenda, migração.
3. **Fechamento e números:** modelo, tela de seleção, médias ponderadas, recorte
   da Remoção, resumo, aba de fechamentos. Depende do Excel do Paulo para
   conferir a média.
4. **Trava e foto:** bloqueio de escrita, foto com hash, versão de fatores,
   alerta, reabertura.
5. **Auditoria:** enviar, devolver, reenviar, aprovar. Junto com a feature 04.

Tasks: [05-rascunho-tasks.md](05-rascunho-tasks.md).

## 10. Fora desta feature

| Item | Onde |
|---|---|
| Ajustes no formulário da Emissão vistos na demo (rótulos total ou por ha, ureia duplicada, campo 0,46, uma semente por cálculo, puxada da cultura, combustível por ha) | Task própria, [05](05-rascunho-tasks.md) |
| Validação de valores fora da realidade (Ruan) | Feature à parte |
| Prazos e rodadas da auditoria | Feature 04 |
| Conteúdo do PDF e da página do QR | Features 02 e 03, depois do modelo de Paulo e Ruan |
| Desenhar a propriedade antes de dividir em talhões (Ruan) | Só se o uso mostrar problema (D17) |
| LGPD | Transversal |

## 11. Pendências

### Decididas em 02/10 (pendências da v1)

| v1 | Pergunta | Decisão |
|---|---|---|
| P-1 | Trava ao finalizar ou ao enviar para verificação? | Ao fechar, com ou sem auditoria (D7; reconfirmado em 05/10). Reabertura sem auditoria segue aberta (P-1 abaixo) |
| P-2 | Remoção: variação medida ou projeção? | Sequestro do ano, recortado da modelagem (D5) |
| P-3 | Fator atualizado | Travado fica; alerta; anos novos usam o novo (D10) |
| P-5 | Peso da média | Área, sempre (D6) |
| P-7 | Quem finaliza | Admin do projeto e gestor; GAIA só no fim do contrato (D11) |
| P-8 | Dado do celular | Oficial depois de enviado (D12) |
| P-9 | Justificativa ao trocar oficial e histórico | Caiu: não há mais troca de oficial |
| P-11 | Linha de base entre projetos | Caiu: o projeto é plurianual e não tem ano |
| P-12 | Simulação promovida a oficial | Caiu: qualquer cálculo pode ser escolhido no fechamento |
| P-13 | Biodiversidade por talhão ou fazenda | Vira P-5 abaixo |
| P-14 | Formato da safra | Emissão com início e fim; Regenerativo com ano (D3, D4) |

### Em aberto

| # | Pergunta | Regra provisória |
|---|---|---|
| P-1 | Fechado sem auditoria pode ser reaberto? Por quem? E erro de cálculo em fechamento travado? Ruan quer reabrir; Paulo diz que depende do contrato | Dono reabre fechado sem auditoria com justificativa; erro de cálculo só a GAIA (RN-36, RN-37) |
| P-2 | Critério de alocação da Remoção entre culturas da rotação. Meses de pousio entre culturas vão para quem? | Recorte pelo período da cultura; pousio fica fora (RN-20). Validar com o João |
| P-3 | Prazos da auditoria | Feature 04 |
| P-4 | Conteúdo do dashboard, PDF e QR | Modelo de Paulo e Ruan |
| P-5 | Biodiversidade entra no fechamento? Com ano? Qual número? | Ano safra, fora do número do recorte até o design (RN-06, RN-12) |
| P-6 | Remoção em dois fechamentos: o segundo aceita um cálculo já travado pelo primeiro? | Sim, usa o travado (RN-27) |
| ~~P-7~~ | Combustível por hectare: muda o campo `annual_consumption` (hoje total, por fazenda) ou só o rótulo? | **Decidida em 05/10:** por hectare. Muda o front; conferir no back se o campo vira por ha ou se converte pela área |
| P-10 | Benchmark e dashboards antes de fechar: todos os cálculos ou só os de fechamento? | Benchmark só com fechados; resto com todos (RN-43) |
