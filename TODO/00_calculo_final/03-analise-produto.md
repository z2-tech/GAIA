# 03 · Análise de produto

Formato da skill `business-product-strategist`. Analisa a experiência de hoje
(vários cálculos por talhão, sem hierarquia) e propõe o fluxo com Oficial e
Simulação. É proposta para discutir com produto, não decisão.

## Avaliação geral

Hoje a plataforma trata todo cálculo como igual. A lista de Emissão e de Remoção
mostra cards em ordem de criação, e nada diz qual deles a empresa assina embaixo.
Para uso interno isso passa. Para verificação, PDF e QR não passa: o número que sai
para o comprador tem de ser um só, identificável, e não pode mudar sozinho. A
maturidade é de ferramenta de cálculo. A feature leva para ferramenta de
declaração.

## Problemas encontrados

- **Sem hierarquia entre cálculos.** O usuário não sabe qual card é o válido. Com
  três ou quatro testes no mesmo talhão, a própria equipe perde o fio.
- **Consumidores escolhem por conta própria e de jeitos diferentes:** comparação
  usa todos, completude da LCA faz média, Regenerativo pega o mais recente. O mesmo
  talhão pode mostrar números diferentes em telas diferentes.
- **Benchmark contaminado.** Simulações entram na média, p25 e p75.
- **Número muda sem aviso.** Recalcular a LCA sobrescreve; editar RothC recria;
  score do Regenerativo muda se mudarem os pesos. Um PDF gerado hoje pode não
  bater com a tela amanhã.
- **O `is_primary` do Regenerativo é invisível.** Existe no banco, mas nenhuma tela
  deixa escolher.
- **Nome de cálculo é livre e opcional.** Não ajuda a distinguir "real" de "teste".

## Oportunidades

- **Confiança:** um selo único "Oficial" por talhão e módulo responde "qual é o
  número?" sem abrir nada.
- **Velocidade:** o sistema pode decidir sozinho na maior parte dos casos (primeiro
  cálculo vira oficial). O usuário só age quando cria uma simulação.
- **Comparação com sentido:** "oficial vs simulação" é a pergunta que o Paulo faz
  ("qual prática me dá mais carbono"). Hoje isso exige montar a comparação na mão.
- **Visão de prontidão:** no projeto, "12 de 15 talhões com oficial" mostra o que
  falta para gerar PDF ou pedir verificação.

## Redesign sugerido

**Lista de cálculos do talhão (Emissão, Remoção, Regenerativo)**

- O oficial fica fixo no topo, em card de destaque com badge **Oficial** e, se
  houver, a safra.
- Simulações ficam abaixo, agrupadas, com badge neutro **Simulação** e um resumo
  do delta contra o oficial ("−12% emissão").
- Sem oficial: estado vazio no topo com o aviso "Nenhum cálculo oficial neste
  talhão" e a ação "Marcar como oficial" nos cards.

**Ações**

- No menu do card: "Marcar como oficial" (simulação) e "Criar simulação a partir
  deste" (oficial). A segunda substitui o "Duplicar" genérico no oficial.
- Marcar abre confirmação curta: qual oficial será substituído e o que muda
  ("dashboards, comparação e PDF passam a usar este cálculo").
- Se o projeto estiver finalizado (hipótese H1), o card do oficial mostra um
  cadeado e as ações de edição somem. Correção só reabrindo o projeto, se o
  produto permitir (pergunta 16).

**Finalizar projeto (hipótese H1, a validar)**

Proposta de fluxo se a trava acontecer na finalização:

1. Quando todos os talhões chegam a 100%, o projeto mostra **"Pronto para
   finalizar"** (não "concluído" automático como hoje).
2. Botão **Finalizar projeto** abre uma tela de revisão em etapas (stepper):
   - **Revisão:** tabela talhão × módulo com o oficial escolhido em cada célula,
     o resultado principal e quantas simulações existem. Célula sem oficial em
     destaque. Filtros: "só pendências", por fazenda, por módulo. Trocar o
     oficial direto na célula (select), sem sair da tela.
   - **Resumo:** totais por fazenda e projeto calculados só com os oficiais, para
     o usuário conferir o número que vai sair no PDF.
   - **Confirmação:** texto claro do que trava ("os oficiais não poderão mais ser
     alterados") e quem está finalizando.
3. Depois de confirmar: status **Finalizado**, cadeado nos oficiais, ações de PDF,
   QR e auditor liberadas.

Por que em etapas: é a única hora em que o usuário olha o projeto inteiro de uma
vez, e é uma ação difícil de desfazer. A revisão em tabela evita abrir talhão por
talhão, e o resumo mostra o número final antes de travar.

**Projeto e fazenda**

- Indicador de cobertura: talhões com oficial / total, por módulo. Clicar leva ao
  primeiro talhão sem oficial.
- Dashboards de fazenda e projeto somam só oficiais, com nota de quantos talhões
  ficaram de fora.

**Comparação**

- Por padrão só oficiais. Chip "Incluir simulações" para quem quer explorar.
- Atalho no talhão: "Comparar simulações com o oficial".

## Novos componentes

- Badge de estado: Oficial / Simulação / Em verificação / Verificado / Substituído
  (cores semânticas do DS; nada de ghost com texto).
- Card de destaque do oficial (variante do card atual, não componente novo).
- Dialog de confirmação de troca de oficial.
- Barra de progresso de cobertura (já existe padrão de progresso nos cards de
  talhão).
- Timeline de versões do oficial (quem, quando, motivo), usada também pelo auditor.
- Stepper de finalização com tabela de revisão talhão × módulo (hipótese H1).
- Badge de status do projeto: Em andamento / Pronto para finalizar / Finalizado.

## Melhorias no fluxo

- **Primeiro cálculo do talhão/módulo/safra vira oficial automaticamente.** Zero
  clique no caso comum. Mesmo comportamento que o Regenerativo já tem.
- **Clone a partir do oficial nasce como simulação.** Evita a pergunta "isso é
  real ou teste?" no momento da criação.
- **Cancelar o oficial:** em vez de promover o mais recente em silêncio (regra do
  Regenerativo hoje), pedir para escolher o novo oficial ou deixar o talhão sem
  oficial. Promover sozinho pode colocar uma simulação no PDF.
- **Dados existentes:** migração marca como oficial o cálculo mais recente não
  cancelado de cada talhão/módulo. Aviso único na primeira visita pedindo revisão.

## Microinterações

- Ao marcar oficial, o card sobe para o topo com transição curta; o antigo desce
  para simulações.
- Toast com "Desfazer" por alguns segundos enquanto o oficial não está travado.
- Tooltip no badge Oficial: "Usado em dashboards, comparação, PDF e verificação.
  Marcado por X em dd/mm."

## Impacto para o usuário

- Técnico de campo e consultor: sabem qual número vale sem perguntar.
- Paulo e Ruan: conseguem mostrar à Control Union e ao comprador um número único,
  rastreável e que não muda.
- Auditor: vê o oficial e o histórico de mudanças, não uma pilha de testes.
- Plataforma: comparação, benchmark e completude passam a ter uma regra só.

## Prioridade

- **Alta:** marcação de oficial por talhão/módulo; consumidores (comparação,
  benchmark, completude, dashboards) usando só oficial; badges na lista.
- **Média:** finalização do projeto com revisão e trava (H1); congelamento
  (snapshot) no momento da finalização; cobertura no projeto; timeline de versões.
- **Baixa:** delta automático oficial × simulação no card; atalho de comparação.

## Complexidade

- **Baixa:** badges, ordenação na lista, ação de marcar (reusa padrão
  `is_primary`).
- **Média:** oficial por talhão em LCA, RothC e Regenerativo (três models, regras
  de cancelar/clonar); filtrar consumidores; migração dos dados existentes.
- **Alta:** congelamento real (snapshot de inputs, resultado e fatores), versão de
  catálogos de fator, estados travados. Também depende de ter safra/período nos
  módulos que não têm.
