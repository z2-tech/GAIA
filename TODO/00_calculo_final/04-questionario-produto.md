# Questionário: cálculo oficial vs simulação

**Propósito:** definir as regras do "cálculo final" pedido na reunião de
29/09/2026 antes de desenhar as telas e abrir as tasks. As respostas decidem o
modelo de dados, que é caro de mudar depois.

**De:** Henrique (Z2) · **Para:** Paulo Rocha e Ruan Carlos Oliveira ·
**Como as respostas serão usadas:** viram as regras da feature e as tasks no Plane;
as que ficarem sem resposta seguem com o padrão sugerido em cada pergunta.

## Contexto

Na reunião, combinamos que cada talhão terá um cálculo "real" e que os outros
serão simulações. O real é o que vai para o PDF, o QR code, o auditor e a
verificação pela Control Union. Hoje a plataforma deixa criar vários cálculos por
talhão sem dizer qual vale, e alguns números podem mudar depois de gerados (ao
recalcular ou se um fator de emissão for atualizado). Pesquisamos como normas
(ISO 14067, GHG Protocol, VM0042) e ferramentas (Cool Farm Tool, Regrow, Agreena)
tratam isso.

Nossa proposta de partida, que queremos validar com vocês: **enquanto o projeto
está em andamento, tudo é livre**. Dá para fazer quantos cálculos quiser e trocar
qual é o oficial a qualquer momento. **Quando o projeto é finalizado**, o usuário
revisa e confirma, talhão por talhão, quais cálculos são os oficiais, e só então
eles travam. A seção 3 é sobre essa proposta.

Nas perguntas usamos **Oficial** para o cálculo real e **Simulação** para os
outros. Se preferirem outro nome, a pergunta 3 é sobre isso.

## Como responder

Até a reunião de terça, 06/10, 16h. Leva uns 40 minutos. Respostas curtas servem.
"Não sei" também serve: marquem e seguimos com o padrão sugerido. As perguntas
estão em ordem de importância. A seção J vem primeiro porque é ela que explica
todo o resto: se só der tempo para ela, já ajuda muito.

## J. A jornada do projeto

Queremos entender como um projeto acontece de verdade, do começo ao fim, para
desenhar a plataforma em cima disso. Abaixo está o que entendemos da reunião de
29/09. Corrijam à vontade.

> **Nosso entendimento (a validar)**
>
> 1. A Peterson fecha um projeto com um cliente (produtor, trader como a LDC, ou
>    marca). O projeto tem várias fazendas.
> 2. A equipe de campo coleta os dados das fazendas (no futuro, pelo celular,
>    offline).
> 3. Um consultor ou técnico cadastra o projeto na GAIA e preenche os cálculos.
>    Faz a linha de base e várias simulações de práticas.
> 4. Escolhe, em cada talhão, qual cálculo é o oficial.
> 5. Alguém finaliza o projeto e os oficiais travam.
> 6. Uma verificadora (Control Union) entra como auditora, confere os dados e os
>    fatores de emissão, e aprova.
> 7. A plataforma gera o PDF com QR code, que vai para o cliente e, dele, para o
>    comprador (ex.: Nestlé). O QR pode ir pregado no lote do produto.

### J1. Descrevam, passo a passo, um projeto real do começo ao fim: quem contrata, quem coleta, quem preenche, quem revisa, quem entrega e para quem.

_Por que importa: é a base para decidir quem pode fazer o quê na plataforma e em
que ordem._

>

### J2. O que está errado ou faltando no "nosso entendimento" acima?

>

### J3. Na prática, quem finaliza o projeto? E como essa pessoa decide que ele está pronto?

_Por que importa: finalizar trava os oficiais. Precisamos saber se é o consultor
que preencheu, um responsável técnico que revisa, o gestor do projeto ou o
cliente._

>

### J4. Quem usa a GAIA no dia a dia (consultor da Peterson, técnico de campo, produtor, cliente) e o que cada um faz nela?

>

### J5. A verificação pela Control Union acontece antes ou depois de finalizar o projeto?

_Por que importa: se for depois, um erro encontrado pelo auditor obriga a reabrir
o projeto. Se for antes, a finalização pode ser o "ok" final depois da
verificação._

>

### J6. Se o auditor encontrar um erro, quem corrige e como isso volta para ele?

>

### J7. Depois de finalizado, o que é entregue, para quem e por qual meio (PDF por e-mail, acesso à plataforma, QR no produto, relatório)?

>

### J8. O cliente final (produtor, trader, comprador) acessa a GAIA ou só recebe o resultado?

>

### J9. Quanto tempo dura um projeto típico? Na safra seguinte, é um projeto novo ou o mesmo continua?

>

## 1. O conceito

### 1. O cálculo oficial representa o que aconteceu numa safra (inventário), ou o ponto de partida contra o qual vamos medir melhorias?

_Por que importa: nas normas, "linha de base" quer dizer ponto de partida ou
cenário contrafactual. Se for inventário da safra, cada safra terá seu oficial. Se
for ponto de partida, é um só por talhão._

>

### 2. Uma simulação pode virar oficial, ou o oficial sempre é criado à parte com os dados reais?

>

### 3. Que nome faz sentido para o cliente: Oficial, Declarado, Real, Linha de base, outro?

_Por que importa: "cenário" e "linha de base" já aparecem na Remoção (cenário BAU e
cenário do projeto) com outro sentido._

>

### 4. Na reunião o Paulo citou uma conversa anterior sobre "um ambiente para fazer verificação". O que foi combinado nela?

_Por que importa: não encontramos registro dessa conversa nos nossos documentos._

>

## 2. Unidade e período

### 5. Um projeto corresponde a uma safra (ou campanha) específica?

_Por que importa: se sim, o próprio projeto define o período e cada talhão tem um
oficial por módulo dentro dele. Se um projeto cobre vários anos, o oficial precisa
de uma safra própria._

>

### 6. Deve existir um oficial por talhão e módulo, ou um por talhão, módulo e safra?

_Padrão sugerido: depende da 5. Sem período, não há como declarar pegada de
produto (ISO 14067 pede a safra) nem ver a evolução ano a ano._

>

### 7. O que define o período: safra agrícola, ano civil ou 12 meses a partir de uma data?

>

### 8. Como tratar duas safras no mesmo ano no mesmo talhão (ex.: soja e milho safrinha)? Cada cultura tem seu oficial?

_Por que importa: a Emissão já separa por cultura e ano; os outros módulos não._

>

### 9. Na Remoção (RothC), o que vai para a declaração: a variação de estoque no período, o estoque no momento, ou a projeção?

_Por que importa: o Paulo falou em "estoque naquele momento, no máximo +5 anos".
As normas pedem remoções reportadas separadas das emissões e só do período
monitorado._

>

### 10. Regenerativo e Biodiversidade também precisam de oficial, ou só Emissão e Remoção?

>

### 11. Para a Control Union e para o comprador, qual é a unidade do número declarado: talhão, fazenda, projeto ou lote de produto?

_Por que importa: define como os oficiais dos talhões são somados ou ponderados._

>

## 3. Finalização do projeto e trava

### 12. A proposta faz sentido: tudo livre enquanto o projeto está em andamento, e os oficiais travam só quando o projeto é finalizado?

_Alternativas: travar ao marcar como oficial; travar ao gerar o PDF/QR; travar ao
enviar para verificação._

>

### 13. Finalizar o projeto deve ser uma ação explícita de alguém, ou pode acontecer sozinho quando tudo estiver 100% preenchido?

_Por que importa: hoje a plataforma marca o projeto como concluído sozinha ao
chegar a 100%, e volta para "em andamento" se algo mudar. Com a trava, isso
precisa mudar: sugerimos que 100% vire "pronto para finalizar"._

>

### 14. Na hora de finalizar, o que fazer com um talhão ou módulo sem oficial?

_Opções: bloquear a finalização; finalizar deixando-o de fora dos totais; usar o
cálculo mais recente._

>

### 15. Em termos de permissão na plataforma, quem pode finalizar o projeto: admin do projeto, gestor, técnico?

_Complementa a J3: lá é quem finaliza na prática, aqui é quem a plataforma deve
permitir._

>

### 16. Um projeto finalizado pode ser reaberto? Se sim, por quem, e o que acontece com o PDF, o QR e a verificação já emitidos?

_Opções para o que já foi emitido: continua válido mostrando "substituído por nova
versão"; deixa de valer; reabrir é proibido depois de verificado._

>

### 17. Depois de finalizado, o usuário ainda pode ver ou criar simulações naquele projeto?

_Por que importa: simular a próxima safra a partir do oficial é o uso que o Paulo
descreveu ("qual prática me dá mais carbono")._

>

### 18. O PDF e o QR code só podem ser gerados depois de finalizar o projeto, ou pode existir um PDF de rascunho antes?

>

### 19. Se um fator de emissão for atualizado na plataforma, os oficiais de projetos finalizados devem ficar como estão ou ser recalculados?

_Por que importa: o GHG Protocol pede recálculo acima de um limite de
significância; a VM0042 diz que o que já foi verificado não muda._

>

### 20. A plataforma precisa ter o estado "verificado" (com quem verificou e quando), ou a verificação acontece fora e só guardamos o documento?

>

## 4. Quem faz o quê

### 21. Durante o projeto, quem pode marcar ou trocar o oficial: admin do projeto, gestor, técnico?

>

### 22. Trocar o oficial ou reabrir um projeto precisa de justificativa escrita?

>

### 23. O auditor precisa ver o histórico de trocas do oficial (quem, quando, motivo)?

>

## 5. Onde o oficial aparece

### 24. Dashboards de fazenda e projeto devem somar só os oficiais?

>

### 25. Na comparação, simulações devem aparecer por padrão ou só quando o usuário pedir?

>

### 26. Médias de referência (benchmark) devem ignorar simulações?

>

## 6. Casos do dia a dia

### 27. Quando o talhão tem um único cálculo, ele deve virar oficial automaticamente?

_Padrão sugerido: sim, para não exigir clique no caso comum._

>

### 28. Se alguém excluir o oficial, a plataforma deve escolher outro sozinha, pedir para escolher, ou deixar o talhão sem oficial?

>

### 29. Nos projetos que já existem, podemos marcar como oficial o cálculo mais recente de cada talhão e pedir revisão?

>

### 30. Dados coletados no celular (offline) entram como oficial ou como rascunho até alguém revisar?

>

## Mais alguma coisa?

Algo que não perguntamos e deveríamos saber? Por exemplo, exigências que a Control
Union ou os compradores (Nestlé, LDC, Mars) já fizeram sobre o dado declarado.

>
