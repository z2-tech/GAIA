# Cálculo oficial · versão final 1

Data: 30/09/2026. Base: reunião de 29/09, respostas do Paulo Rocha e do Ruan
Carlos Oliveira ao questionário ([análise](06-analise-respostas.md)) e o código
atual da `gaia-api`.

Regras marcadas com **(P-n)** são provisórias: seguem a proposta da Z2 até a
decisão da pendência n, listada no fim. As demais estão fechadas.

## 1. O que é a feature

Em cada talhão, módulo e safra, o usuário marca **qual cálculo é o oficial**: o
que representa a realidade coletada em campo. Os outros cálculos são
**simulações**: testes de manejo ("se eu adubar menos, quanto cai a emissão?").

Só o oficial entra nos números que saem da plataforma: dashboards de fazenda e
projeto, PDF, QR code, relatório, planilha e verificação pela Control Union.

Ao **finalizar o projeto**, os oficiais travam e o resultado vira uma foto
imutável daquele momento. Se o cliente quiser fazer um claim, o projeto vai para
verificação; o auditor aprova ou devolve para correção.

A feature é a base das próximas quatro (export, PDF, QR e auditor): todas mostram
o oficial.

## 2. Por que

- Hoje cada talhão acumula cálculos sem hierarquia. Ninguém sabe qual vale, e
  telas diferentes escolhem de jeitos diferentes (comparação usa todos, completude
  da Emissão faz média, Regenerativo pega o mais recente).
- Simulações contaminam o benchmark (média, p25, p75).
- O número muda sozinho: recalcular a Emissão sobrescreve o resultado, editar a
  Remoção apaga e recria, o score Regenerativo usa os pesos atuais, os fatores de
  emissão não têm versão. Um PDF de hoje pode não bater com a tela de amanhã.
- A Control Union verifica "a foto daquele momento" (Paulo). Sem trava, não há
  foto.

## 3. Vocabulário

| Termo | Significado |
|---|---|
| **Linha de base** | A primeira coleta real de um talhão. Ponto de partida contra o qual se medem as melhorias |
| **Monitoramento** | Cada coleta real depois da linha de base (safras seguintes) |
| **Simulação** | Cálculo de teste, para recomendar manejo. Nunca sai da plataforma como número declarado |
| **Oficial** | Selo no cálculo escolhido de cada talhão × módulo × safra. Na linha de base e em cada monitoramento há um oficial |
| **Claim** | Comunicação pública de um resultado (ex.: "pegada X kg CO2e/kg"). Exige verificação |
| **Finalizar** | Ação que encerra o projeto e trava os oficiais |
| **Verificado** | Projeto aprovado pelo auditor. Estado final, não reabre |

"Cenário BAU" e "cenário do projeto" continuam existindo **só dentro da Remoção**
(as duas rodadas do RothC num mesmo cálculo). Não confundir com Oficial e
Simulação.

## 4. Jornada do projeto

1. A Peterson fecha o projeto com o cliente (produtor, trader ou marca). O
   projeto tem uma ou mais fazendas e dura uma safra (só linha de base) ou várias
   (linha de base + monitoramento).
2. A Peterson dá acesso a quem vai coletar. Na maioria dos casos o próprio
   consultor da Peterson coleta em campo já no computador ou celular. Às vezes o
   técnico do cliente ou o produtor coleta. Pode ser misto.
3. O consultor preenche os cálculos reais e, em cima deles, as simulações que
   orientam a recomendação de manejo.
4. Cada talhão fica com um oficial por módulo e safra.
5. Peterson e cliente decidem encerrar. O admin do projeto finaliza, depois de uma
   revisão dupla. Os oficiais travam.
6. **Sem claim:** o projeto termina aqui. O cliente acompanha dashboards e baixa
   planilha e PDF sem QR.
7. **Com claim:** o projeto vai para verificação. A Control Union entra como
   auditora, só leitura, e confere dados primários, evidências, fatores e
   equações. Se achar erro, pede correção com prazo e o projeto reabre para
   Peterson e cliente. Se não, aprova.
8. Aprovado, o projeto fica **verificado**: travado para sempre, PDF com QR
   liberado. O QR pode ir no produto ou no lote.
9. Continuidade (nova safra ou novo contrato): novo projeto, com os cálculos da
   safra anterior copiados para acelerar o preenchimento.

## 5. Regras de negócio

### 5.1 Oficial

- **RN-01** Existe no máximo um oficial por talhão × módulo × safra. Na Emissão,
  também por cultura (soja e milho safrinha no mesmo talhão e safra têm oficiais
  separados). Na Remoção, sem cultura: o solo é contínuo entre as culturas.
- **RN-02** Vale para os quatro módulos: Emissão, Remoção, Regenerativo e
  Biodiversidade. Prioridade de entrega: Emissão e Remoção.
- **RN-03** O primeiro cálculo criado num talhão × módulo × safra vira oficial
  sozinho. Os seguintes nascem como simulação.
- **RN-04** Duplicar um cálculo gera uma simulação.
- **RN-05** Qualquer simulação pode ser marcada como oficial. O oficial anterior
  vira simulação na mesma operação.
- **RN-06** Enquanto o projeto está em andamento, marcar e trocar o oficial é
  livre, sem justificativa obrigatória. Campo de motivo opcional. **(P-9)**
- **RN-07** Cancelar o oficial não promove outro sozinho: a plataforma pede para
  escolher o novo oficial, ou o talhão fica sem oficial.
- **RN-08** Toda marcação, troca e desmarcação fica registrada: quem, quando,
  cálculo anterior, cálculo novo, motivo. Mostrar esse histórico ao auditor fica
  para depois. **(P-9)**
- **RN-09** Dados coletados no celular entram como cálculo normal e seguem a
  RN-03. A revisão acontece na finalização (RN-20). **(P-8)**

### 5.2 Safra e período

- **RN-10** Todo cálculo tem safra, em todos os módulos. Um projeto pode ter uma
  ou várias safras.
- **RN-11** A safra é identificada pelo ano de colheita, igual ao `harvest_year`
  que a Emissão já usa (safra 2025/26 = 2026). Projetos longos contam 12 meses.
  **(P-14)**
- **RN-12** Linha de base e monitoramento não são campos: a linha de base de um
  talhão e módulo é o oficial da safra mais antiga daquele talhão; as outras
  safras são monitoramento. Como o talhão pertence à fazenda e não ao projeto,
  isso vale também entre projetos. **(P-11)**

### 5.3 Agregação (o número declarado)

- **RN-13** O cálculo é por talhão. O número declarado é por fazenda: média
  ponderada dos oficiais dos talhões. O projeto agrega as fazendas do mesmo jeito.
  O talhão continua visível para quem quiser reportar nesse nível.
- **RN-14** O peso da média é a área do talhão (`area_ha`) para indicadores por
  hectare e score. Para pegada por kg de produto, o peso é a produção. **(P-5)**
- **RN-15** Dashboards de fazenda e projeto, PDF, QR, planilha e relatório usam só
  oficiais.
- **RN-16** Benchmark (média, p25, p75) ignora simulações.
- **RN-17** Na comparação, o padrão é só oficiais. Simulações aparecem quando o
  usuário pede.
- **RN-18** Remoção: o número declarado é a **variação de estoque medida** entre
  a linha de base e o monitoramento (t CO2/ha). A projeção de 5 anos do RothC
  aparece no relatório como informativa, separada do número declarado. **(P-2)**

### 5.4 Finalização

- **RN-19** Finalizar é ação explícita. O projeto deixa de virar "concluído"
  sozinho ao chegar a 100%: 100% passa a significar **pronto para finalizar**.
- **RN-20** Finalizar passa por revisão em etapas: (1) tabela talhão × módulo ×
  safra com o oficial de cada célula, trocável ali mesmo; (2) resumo com os totais
  por fazenda e projeto calculados só com oficiais; (3) confirmação explícita
  (dupla checagem) do que vai travar.
- **RN-21** A finalização é bloqueada enquanto houver talhão × módulo × safra
  contratado sem oficial. A média ponderada precisa de todos os talhões.
- **RN-22** Pode finalizar: o admin do projeto (`Project.admin`) e usuários com
  papel gestor (`manager`). A equipe GAIA (`is_staff`) também. **(P-7)**
- **RN-23** Finalizar trava os oficiais. Projeto sem claim que quer continuar
  editando não finaliza; fica em andamento até o fim do contrato. **(P-1)**

### 5.5 Trava e foto do momento

- **RN-24** Projeto finalizado, em verificação ou verificado é só leitura para
  todos: nenhum cálculo (oficial ou simulação) pode ser criado, editado,
  recalculado, cancelado ou ter o oficial trocado.
- **RN-25** Ao finalizar, a plataforma guarda uma foto de cada oficial: inputs,
  resultado, versão dos fatores de emissão, parâmetros e clima do RothC, pesos do
  score Regenerativo. O PDF, o QR e o auditor leem dessa foto, não do cálculo vivo.
- **RN-26** Os catálogos de fator de emissão passam a ter versão. Atualizar um
  fator cria versão nova; não altera a antiga.
- **RN-27** A foto de um projeto verificado nunca muda. Se os fatores mudarem, na
  safra de monitoramento seguinte a linha de base é **recalculada à parte** com os
  fatores novos, só para comparar na mesma metodologia. O número verificado
  continua o original. **(P-3)**

### 5.6 Reabertura

- **RN-28** Só a equipe GAIA reabre um projeto finalizado, sempre com
  justificativa escrita.
- **RN-29** Reabrir invalida o PDF gerado antes. O projeto volta para em
  andamento e a foto é refeita na próxima finalização.
- **RN-30** Projeto verificado não reabre. Correção ou continuidade = novo
  projeto.

### 5.7 Verificação e auditor

- **RN-31** Verificação é opcional. Só projeto finalizado pode ser enviado.
- **RN-32** O auditor só lê. Vê dados primários (e baixa planilha), PDF dos
  dashboards, evidências, fatores de emissão e equações do projeto que verifica.
- **RN-33** O auditor tem duas ações: **aprovar** (projeto vira verificado, com
  quem e quando) ou **pedir correção** (texto obrigatório, prazo; o projeto reabre
  para Peterson e cliente, e volta para verificação quando corrigido).
- **RN-34** O prazo da correção é informativo, padrão 30 dias. **(P-6)**
- **RN-35** O auditor só acessa projetos para os quais foi liberado. **(P-4)**

### 5.8 PDF e QR

- **RN-36** PDF sem QR pode ser baixado a qualquer momento, com a marca "não
  verificado".
- **RN-37** PDF com QR só em projeto verificado. O QR aponta para a foto
  verificada.

### 5.9 Dados existentes

- **RN-38** Na migração, cada talhão × módulo × safra recebe como oficial o
  cálculo mais recente não cancelado. Na primeira visita a plataforma avisa e pede
  revisão.
- **RN-39** Cálculos antigos sem safra (Remoção, Regenerativo, Biodiversidade)
  recebem a safra pela data de criação. **(P-14)**
- **RN-40** Projetos hoje em "concluído" voltam para "pronto para finalizar". Nada
  nasce finalizado.

## 6. Estados do projeto

```
Em andamento ──100%──► Pronto para finalizar ──Finalizar──► Finalizado
     ▲                        (volta se cair de 100%)          │     │
     │                                                         │     │ Enviar para
     │◄──── Reabrir (só GAIA, justificativa) ──────────────────┘     │ verificação
     │                                                               ▼
     │◄──── Pedir correção (auditor, texto + prazo) ────────── Em verificação
                                                                     │ Aprovar
                                                                     ▼
                                                                Verificado
```

| Estado | Edita cálculos | Troca oficial | PDF sem QR | PDF com QR | Auditor |
|---|---|---|---|---|---|
| Em andamento | sim | sim | sim | não | não |
| Pronto para finalizar | sim | sim | sim | não | não |
| Finalizado | não | não | sim | não | não |
| Em verificação | não | não | sim | não | lê, aprova, pede correção |
| Verificado | não | não | sim | sim | lê |

Estados de hoje (`in_progress`, `completed`, `cancelled`): `completed` passa a
significar "pronto para finalizar"; `cancelled` continua.

## 7. Quem faz o quê

| Ação | Técnico | Gestor | Admin do projeto | Auditor | GAIA (staff) |
|---|---|---|---|---|---|
| Criar e editar cálculos (em andamento) | sim | sim | sim | não | sim |
| Marcar ou trocar oficial | não | sim | sim | não | sim |
| Finalizar | não | sim | sim | não | sim |
| Enviar para verificação | não | sim | sim | não | sim |
| Reabrir finalizado | não | não | não | não | sim |
| Aprovar ou pedir correção | não | não | não | sim | não |
| Liberar auditor no projeto | não | não | não | não | sim **(P-4)** |

## 8. O que muda no sistema

| Área | Mudança |
|---|---|
| Emissão (`LcaProjectCulture`) | selo oficial; já tem safra e cultura; ganhar autoria (`created_by`) e FK de talhão para a trilha |
| Remoção (`RothcCalculation`) | selo oficial; safra nova |
| Regenerativo | `is_primary` por fazenda do projeto vira oficial por talhão e safra; safra nova |
| Biodiversidade | selo oficial; safra nova |
| Projeto | estados novos; fim do concluído automático; quem e quando finalizou, enviou, aprovou, reabriu |
| Fatores de emissão | versão nos catálogos |
| Foto | registro imutável por oficial ao finalizar |
| Consumidores | comparação, benchmark, completude e dashboards passam a usar só oficiais |
| Agregação | média ponderada por fazenda e projeto |
| Acesso | vínculo auditor × projeto |

## 9. Fases de entrega

1. **Oficial e safra:** selo, safra em todos os módulos, regras RN-01 a RN-12,
   consumidores só com oficial, migração. Destrava o PDF sem QR.
2. **Agregação:** média ponderada por fazenda e projeto (RN-13 a RN-18).
3. **Finalizar e travar:** estados, revisão em etapas, bloqueio de escrita, foto,
   versão de fatores, reabertura.
4. **Verificação:** envio, acesso do auditor, aprovar, pedir correção. Junto com a
   feature 04 (auditor). QR vem depois disso.

Tasks: [05-rascunho-tasks.md](05-rascunho-tasks.md).

## 10. Fora desta feature

| Item | Onde |
|---|---|
| Validação de valores fora da realidade no preenchimento (Ruan) | Feature à parte, por módulo |
| Duplicar projeto para a safra seguinte | Task própria, depois da fase 1 |
| Resultado anual consolidado da fazenda (até 3 safras) | Depois da agregação |
| Evidências por upload nos módulos que não têm (hoje só a Emissão, como texto) | Feature 04 (auditor) |
| Bloquear acesso do cliente no fim do contrato | Produto/comercial |
| Proteção de dados (LGPD e leis globais) e suporte com resposta rápida (Ruan) | Reunião, fora do produto |

## 11. Pendências

Decidir na reunião de 06/10. Até lá valem as regras provisórias indicadas.

| # | Pergunta | Paulo | Ruan | Regra provisória |
|---|---|---|---|---|
| P-1 | O oficial trava ao finalizar ou ao enviar para verificação? | Ao enviar; projeto sem claim segue editável | Ao finalizar | Finalizar trava; quem não quer travar não finaliza (RN-23) |
| P-2 | Na Remoção, o claim é a variação medida ou a projeção de 5 anos? | Variação medida | Projeção, confirmada no 5º ano | Variação medida; projeção informativa (RN-18) |
| P-3 | Fator de emissão atualizado: o verificado fica ou é recalculado? | Fica (vai checar) | Recalcula, para comparar | Verificado fica; linha de base recalculada à parte (RN-27) |
| P-4 | Quem libera a Control Union num projeto, e o acesso acaba ao aprovar? | — | — | GAIA libera; acesso de leitura continua (RN-35) |
| P-5 | Peso da média: área ou produção, por indicador? | — | — | Área; produção para pegada por kg (RN-14). Validar com o especialista de sustentabilidade |
| P-6 | O prazo da correção é controlado pela plataforma (bloqueia, avisa) ou só informativo? | — | 30 dias | Informativo (RN-34) |
| P-7 | Na pergunta 13 o Paulo disse "ação da GAIA avaliando o contrato". Finalizar é da GAIA ou do admin do projeto? | GAIA (13) e admin (15) | Admin e gestor | Admin, gestor e GAIA (RN-22) |
| P-8 | Dado do celular entra como oficial ou como rascunho até revisão? | Oficial | Rascunho | Cálculo normal; revisão na finalização (RN-09) |
| P-9 | Trocar o oficial exige justificativa? O auditor vê o histórico de trocas? | Sempre; não | Só ao reabrir; sim | Motivo opcional na troca; histórico gravado, tela depois (RN-06, RN-08) |
| P-10 | Perguntas 24–30 (dashboards, comparação, benchmark, cancelar oficial, migração) | Não entendeu | Respondeu | Respostas do Ruan (RN-07, RN-15 a RN-17, RN-38). Revalidar com o Paulo mostrando telas |
| P-11 | Linha de base atravessa projetos? Um novo contrato na mesma fazenda herda a linha de base antiga? | — | — | Sim, é a safra mais antiga do talhão (RN-12) |
| P-12 | Simulação promovida a oficial precisa aparecer como tal no PDF? | Pode virar oficial se verificada | Precisa ser confirmada com dados reais | Não; vira oficial igual aos outros (RN-05) |
| P-13 | Biodiversidade: o oficial é por talhão ou por fazenda? A tela hoje fica na fazenda | — | — | Por talhão, igual aos outros (RN-01) |
| P-14 | Formato da safra (ano de colheita) e safra dos cálculos antigos pela data de criação | Safra; projeto longo 12 meses | Safra | RN-11, RN-39 |
