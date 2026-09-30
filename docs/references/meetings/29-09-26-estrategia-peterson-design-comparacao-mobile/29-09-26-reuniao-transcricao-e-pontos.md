# Reunião 29/09/2026: estratégia Peterson, design system, comparação, mobile, export, QR code e auditor

Documentos desta pasta:

| Arquivo | Conteúdo |
|---|---|
| este arquivo | Ata: resumo por tema, decisões, responsáveis, pendências e transcrição normalizada |
| [`29-09-26-escopo-export-qrcode-auditor.md`](29-09-26-escopo-export-qrcode-auditor.md) | Escopo das próximas features (cálculo final, export, PDF, QR code, auditor), pronto para virar tasks |
| `29-09-26-legendas-meet.srt` | Legenda automática do Meet extraída do vídeo, sem edição |

## Fontes e confiança

| Fonte | Conteúdo | Cobertura |
|---|---|---|
| `~/Downloads/crb-yspc-hnb (2026-09-29 16_05 GMT-3).mp4` (fora do repo) | Gravação completa do Meet com legenda PT embutida, com nome de quem fala | 00:00–58:49 |
| Wispr Flow, nota `Platform Design Review and Strategy` | Transcrição com diarização | 00:00–~27:30 (termina em "peraí que eu travei") |
| `~/Downloads/Reuniao_gaia_29_09.mp4` | Clipe de 4,9 s: "A empresa tem a divisão de tecnologia, que é uma bosta, mas tem..." | Frase solta, anterior à gravação |

Os tempos `[mm:ss]` deste documento são do vídeo.

**Limitações**

- A legenda do Meet perde texto quando duas pessoas falam juntas. Muitas frases
  começam no meio. Até ~27 min, as lacunas foram preenchidas com a transcrição
  do Wispr (é de lá que vem, por exemplo, o valor da proposta da Mars).
- Quem fala sem nome na legenda é a conta que compartilhou a tela, da Z2
  (Henrique conduzindo a demo). A partir de ~44 min aparece a conta **"Z2
  Tech"**, também da Z2. Aqui as duas estão rotuladas como **Z2**.
- A conexão do Paulo caiu entre ~28:30 e ~31:00. A conversa paralela desse
  intervalo foi omitida.
- Trechos pessoais (finanças pessoais, cachorro, cerveja) foram omitidos.

**Correções em relação à versão anterior desta ata (feita só com o Wispr)**

- A empresa é a **Peterson**, não "Petz". O Paulo chama a **Control Union** de
  "empresa irmã da Peterson" [41:12]. A pasta foi renomeada.
- Várias falas atribuídas ao Paulo são do **Ruan Carlos Oliveira**: a pergunta
  sobre usar a verba de design na UX da plataforma, o prazo da verba
  (fevereiro/março), o "até janeiro" e toda a explicação sobre a cotação e a
  conta da empresa.
- A "segunda coisa" do export, que a versão anterior deixava em aberto, é o
  **PDF do dashboard com QR code**. A reunião seguiu por mais 30 minutos depois
  do corte do Wispr, com decisões sobre QR code, auditor e cálculo final.

**Termos corrigidos:** "Pets/Petz/Pitec" → Peterson; "Controle Uno" → Control
Union; "MRAV"/"VI" → MRV; "Qcode"/"SRCode" → QR code; "Cloud" → Claude;
"Juan" → Ruan; "DID" → Day (confirmar grafia); "PaintPoint" → Penpot.
**"Rosa"** [13:08] é quem vai fazer a API de opções da comparação: nome não
confirmado.

## Participantes

| Nome | Lado | Papel na conversa |
|---|---|---|
| Paulo Rocha | GAIA / Peterson | Idealizador (pós-doc), trabalha na Peterson, define prioridades de produto |
| Ruan Carlos Oliveira | GAIA | Comercial e estratégia, verba de design, visão de mercado (Nestlé, Verra) |
| Henrique | Z2 | Conduz a demo e a discussão técnica |
| Felipe Gonçalves | Z2 | Planejamento, acompanhamento no Plane |
| Leonardo Paiva | Z2 | Pontual ("simulação") |

Pessoas e empresas citadas: **Pica/"Betão"** (diretor da Peterson, já viu a
plataforma, hoje com visão global), **Pedro Malta** (diretor novo, risco
político), **Danilo** (diretor no Brasil, próximo a ser abordado), **Gabriel**
(designer do fluxo de comparação), **Beto** (designer de marca, tem CNPJ),
**João** (especialista em carbono do solo), **Day** (especialista em emissões),
**Control Union** (verificadora, empresa irmã da Peterson), **Mars**, **Nestlé**,
**LDC**, **Verra**.

## Resumo por tema

### 1. Estratégia com a Peterson e risco político [00:00–09:00]

- O Paulo mostrou a plataforma ao Pica como "um negócio do meu pós-doc": mapa,
  dashboard, "o olho dele cresceu". O Pica perguntou se era algo com a "Farm Tur"
  (nome incerto na legenda) e se ele ia disponibilizar. O Paulo disse que ia
  vender para a Peterson. O Pica levantou o ponto "você trabalha na empresa e
  cria um negócio", e o Paulo respondeu que apresenta direito quando terminar.
  Não houve mais conversa depois.
- O Pica não puxou a GAIA para dentro: está sem tempo, com visão estratégica
  (viagens: África do Sul, Ásia). Mas já sabe, e ninguém vai "fofocar" antes.
- Próximo passo: pequenos ajustes e apresentação ao diretor no Brasil (Danilo)
  com o discurso "a gente procura um MRV, já viu vários, nenhum fechou; no meu
  pós-doc eu fiz um; vamos testar nos projetos".
- Risco: o diretor novo **Pedro Malta** pode questionar o conflito de interesse.
- Cenário extremo (o Paulo diz não esperar): se for demitido, vende
  **consultoria + implementação + MRV com a GAIA dentro**. "Em quase todos os
  projetos a GAIA encaixa."
- A GAIA não paga salário para o Paulo nesse cenário: a receita viria de
  projetos fechados, com a GAIA cobrada como a parte de processamento de dados/MRV.
- Plano: primeiro o Brasil (maior volume de projetos), depois outras regiões.

### 2. Abordagem comercial [06:56–09:00]

- Ruan: a GAIA **não compete**, agrega valor aos projetos e faz a Peterson
  vender mais. "O Danilo quer dinheiro na conta."
- Estrutura proposta pelo Paulo: ele traz a solução do pós-doc, a Peterson usa
  com **contrato com opção de compra**.
- Evidência de demanda: proposta de **300 mil euros para a Mars** (2 anos,
  consultoria agronômica + coleta de dados + MRV) perdida porque a Peterson não
  tinha MRV. A Mars foi para uma empresa que já trabalha com arroz e tem as
  ferramentas.
- Plano B: se a Peterson não quiser, vender a plataforma direto a outras
  empresas.

### 3. Demo da plataforma web [09:00–16:00]

- Design migrado do **Figma → Penpot** (grátis, fácil de operar com IA). Existe
  um **design system** (componentes, tipografia, cores).
- Processo novo: **cada módulo passa primeiro pelo design**, com conferência
  campo a campo, e só depois vai para o desenvolvimento.
- Visual: mais "quadradinho", **menu sempre recolhido**, talhão melhorado (a
  tela de talhão ainda carece de informação). Gráficos de carbono e emissão
  iguais aos de antes.
- **Comparação** (refeita a partir do trabalho do Gabriel):
  - Respeita permissões: cada usuário vê só os projetos a que tem acesso.
  - A seleção vai melhorar com uma **API que retorna só opções válidas** ("o
    Rosa vai fazer").
  - **1 a 4** itens na UI (a API aceita até 20). Visualização por linha e total.
  - Funciona em Emissão, Remoção e Regenerativa. O botão de comparar da Remoção
    "acho que não subiu" em dev. **Verificar.**
- Os cálculos ainda precisam de teste mais rigoroso. Tudo está em **dev**.

**Feedback sobre a comparação**

- Paulo: "bem melhor". Projetos costumam ter **~10 fazendas**, então 4 parece
  pouco. Sugestão: com muitos itens, **comparação só por gráfico**, sem números.
- Henrique: a ideia é ter sempre o **consolidado da fazenda**. Dashboard só se
  valida usando.
- **Aprovado** como novo padrão da plataforma ("Sim, muito bom").

### 4. Validação dos cálculos por especialistas [11:20–12:00 e 56:08]

- Paulo e Ruan querem pagar **diárias** para **João** (carbono do solo) e **Day**
  (emissões) testarem a plataforma várias vezes. A Z2 não os conhece.
- Henrique: "tem dinheiro pra isso". Serve também como teste de usabilidade por
  terceiros.
- No fechamento, a Z2 pediu isso como **demanda urgente**: "senão a gente só fica
  fazendo, e quando vê errou um negócio lá atrás". O Paulo explicou que estava
  esperando validar a primeira versão para trazer dados reais.

### 5. Mobile [16:00–19:00]

- Foco em **coleta de dados**, sem gráficos por enquanto.
- **Offline-first**: preenche sem internet e sincroniza com o web depois.
- **Tela de conflito**: quando web e celular editam o mesmo dado, o usuário
  escolhe a fonte da verdade.
- Telas derivadas do web com o Claude e ajustadas no design.
- Teste por **APK Android enviado no grupo do WhatsApp**. iPhone exige conta
  Apple paga e fica para depois. Os celulares da empresa são Android.
- Paulo: "não é prioridade número 1 agora", mas a primeira pergunta do cliente
  vai ser "consegue coletar sem internet?".

### 6. Verba de design (R$ 5 mil) [19:00–26:30]

- **Beto**, designer que fez a logo da Z2, tem **CNPJ** e completa a **terceira
  cotação** para liberar os 5 mil. Perfil: logo, posts, landing page, animações.
  Não é designer de plataforma.
- Paulo: a prioridade é **entrar na Peterson**. Se entrar, marca/site perdem
  importância. Se não, vão precisar para vender de outra forma.
- Ruan: dá para usar a verba na **UX da plataforma** em vez de site/logo?
  Henrique: para plataforma faz mais sentido o Gabriel, e o padrão
  (formulários + gráficos) já está estável. Um redesign só se os testes com
  João e Day mostrarem fluxos ruins, e seria de fluxos, não de logo/cores.
- **Decisão: esperar o desfecho com a Peterson (até janeiro).** Se a GAIA virar
  empresa independente, investe em logo, landing page e divulgação.
- Ruan: a verba tem de ser usada **até março** ("vamos falar fevereiro"), senão
  volta. O dinheiro está na conta da empresa do Ruan e vai **direto ao
  fornecedor**, sem passar pela Z2.
- Ruan: **cotação só perto do pagamento**. Cotação de setembro paga em janeiro
  abre questionamento de preço. O Beto fica avisado para emitir quando for
  preciso.
- Z2 (depois de chamar o Felipe): a cotação também envolve o Gabriel, que já tem
  dois CNPJs e está alinhado.

### 7. Próximas features: export, PDF, QR code, auditor, cálculo final [26:30–55:00]

Detalhamento em
[`29-09-26-escopo-export-qrcode-auditor.md`](29-09-26-escopo-export-qrcode-auditor.md).

- Paulo, antes da biodiversidade: **"baixar os dados"**. São duas coisas:
  1. **Dados brutos em Excel**, "como se fosse a planilha": num projeto de 20
     fazendas, linhas com os insumos (fertilizante, calcário etc.), colunas com
     as fazendas, e os números.
  2. **Dashboard em PDF**, por projeto e por módulo, com um **QR code** no fim.
- **QR code**: ao escanear, abre uma página no domínio da GAIA que prova que o
  resultado foi gerado na plataforma e não foi manipulado (Ruan comparou com o
  QR code de declarações de universidade). Caso de uso do Paulo: a empresa
  imprime o QR e prega no lote (algodão, milho) para dar rastreabilidade
  (pegada de carbono, score regenerativo).
  - Nível **fazenda/projeto**, não cadeia. Ruan lembrou que em cadeia (caso
    Nestlé) entra balanço de massa. Paulo: "não estou preocupado a nível de
    cadeia".
  - **Página pública**, sem login. Paulo: quem prega no produto quer que seja
    público. Ruan: criar usuário para público externo gera complexidade demais.
  - Z2: página gerada automaticamente por projeto (algo como
    `gaia/prova/<id do projeto>`), lendo do banco. "Essa parte é fácil." O que a
    Z2 não sabe é **o que mostrar** para gerar confiança: pendência do lado
    GAIA.
  - Primeira ideia de conteúdo: dashboard **bem simplificado**, a fazenda, o
    mapa da fazenda, carbono; resumo dos módulos contratados; no projeto, média
    das fazendas.
- **Cálculo final vs simulação** (Z2 levantou, Paulo confirmou): hoje todo
  cálculo feito num talhão vira "mais um cálculo". Precisa marcar qual é o
  **real** (a linha de base, a "foto daquele momento") e quais foram
  simulações. Paulo: simulações servem para escolher práticas; na venda vai
  só a linha de base, no máximo com projeção de estoque de carbono de +5 anos.
  É o dado real que a verificação usa.
- **Auditor**: Ruan cogitou domínio/ambiente separado. Z2: **pensar em
  permissões, não em ambiente**. Modelo de outro projeto da Z2: quem é dono do
  projeto **convida o auditor por e-mail**, ele cria a conta e ganha acesso ao
  projeto. Vê todas as fazendas, talhões e os cálculos marcados como finais,
  os **dados primários** (Ruan), baixa Excel e PDF, e precisa ver os **fatores
  de emissão** usados (Paulo).
- Negócio: na plataforma, opção de **pedir verificação pela Control Union**,
  que cobra à parte. Ruan: no futuro, lista de verificadores credenciados que
  pagam para estar na relação (modelo dos verification bodies da Verra).
  Cobrança do auditor ficou em aberto.
- Paulo resumiu em três passos [47:20]: (1) baixar Excel e PDF; (2) QR code no
  PDF ligado a um domínio GAIA; (3) auditor com acesso ao projeto como usuário.
- **Biodiversidade espera.** Paulo: "tô doido pra colocar esse módulo", mas o
  foco agora é fechar a estrutura de cálculo, verificação, QR code e download.

### 8. Encerramento [55:00–58:49]

- Z2 vai desenhar algo a partir da gravação. Paulo pediu para pesquisar o que
  outras plataformas mostram no QR code: **Regrow**, "Puma", "CR" e "Farm…"
  (nomes incertos na legenda). O Paulo vai **mandar os nomes por escrito**.
- Felipe: planejar o desenvolvimento hoje/amanhã, atualizar a GAIA toda
  semana, e Paulo/Ruan devem acompanhar pelo **Plane** (eles já têm conta).
- **Reunião semanal: terças, 16h.** Próxima: **06/10/2026**.

## Decisões tomadas

1. **Prioridade de negócio:** entrar na Peterson. Resposta esperada até
   janeiro. Logo e landing page ficam em espera.
2. **Novo padrão visual** (design system Penpot + comparação nova) aprovado.
3. **Processo:** design primeiro (Penpot), dev depois.
4. **Comparação** segue com limite de 4 na UI por enquanto.
5. **Mobile:** só APK Android, via WhatsApp. iOS fora por custo.
6. **Verba de design:** esperar. Cotação só perto do pagamento, uso até
   fevereiro/março.
7. **Ordem de desenvolvimento:** export Excel + PDF → QR code de verificação →
   auditor. Marcação de cálculo final vs simulação entra como base disso.
   **Biodiversidade depois.**
8. **Página do QR code é pública**, sem login.
9. **Auditor é permissão, não ambiente:** convite por e-mail pelo dono do
   projeto, acesso ao projeto dentro da própria plataforma.
10. **Reunião semanal** às terças, 16h.

## Responsáveis

| Quem | O quê | Tempo |
|---|---|---|
| Paulo | Conversar com o Danilo e apresentar a GAIA como MRV dos projetos | [01:20], [08:52] |
| Paulo + Ruan | Contratar diárias do João e da Day para testar os cálculos com dados reais. **Urgente** | [11:20], [56:08] |
| Paulo + Ruan | Definir o que a página do QR code mostra | [37:32], [48:36], [55:08] |
| Paulo | Mandar por escrito a lista de plataformas concorrentes com QR code | [55:28] |
| Ruan | Manter o Beto avisado para emitir a cotação quando for pagar | [25:56] |
| Z2 / Felipe | Planejar as tasks no Plane e atualizar a GAIA toda semana | [57:24] |
| Z2 / Henrique | Rascunho de design do export/PDF/QR a partir da gravação | [55:00] |
| Z2 | Pesquisar QR code/verificação em Regrow e nas outras plataformas | [55:28] |
| Z2 | Melhorar a seleção da comparação (API só com opções válidas) | [13:08] |
| Z2 | Conferir o botão de comparar da Remoção em dev | [14:04] |
| Z2 | Seguir o mobile Android e mandar o APK no grupo | [17:56] |

## Em aberto

- Conteúdo da página do QR code: resumo por projeto ou por fazenda? Quais
  módulos (só os contratados)? Mostra status de verificação?
- Export Excel: granularidade (projeto × fazenda × talhão), uma aba por módulo?
  Só cálculos finais?
- PDF: quais dashboards entram, por projeto e/ou por fazenda?
- Cálculo final: um por talhão e módulo, ou por safra? Trava depois de
  verificado? O QR mostra a foto do momento da geração ou o dado atual?
- Auditor: cobrança; se a Control Union é acionada pela plataforma.
- Comparação: manter 4 ou permitir mais em modo "só gráfico".
- Nomes das plataformas citadas ("Puma", "CR", "Farm…", "Farm Tur").
- Quem é o "Rosa" da API da comparação.

## Transcrição normalizada

Falas de preenchimento ("Uhum", "Entendi") foram removidas e trechos pessoais
omitidos com `[…]`. Colchetes com texto são complementos para dar sentido a
frases cortadas pela legenda.

### Estratégia com a Peterson

**Paulo [00:00]:** E assim eu sentei e falei: "Cara, estou fazendo meu pós-doc,
deixa eu te mostrar um negócio que estou fazendo lá". Abri a plataforma, comecei
a mexer: bota mapa aqui, mostra dashboard, e o olho dele só crescendo. Aí ele
falou: "Você está fazendo outro com a Farm Tur?". Falei: "Não, melhor. [A outra]
dá pra plugar aqui". Ele: "Mas o que você vai fazer com isso? Vai tornar
disponível?". Falei: "Não, vou vender pra Peterson". Ele: "Pô, não é assim".
Falei: "A gente conversa. Estou tentando fazer isso há 4 anos e não consigo". Eu
tenho sócios lá; se fosse só eu, a gente podia até conversar. Aí ele levantou:
"Mas você trabalha na empresa e cria um negócio". Falei: "Não esquenta, quando
eu terminar te apresento certinho. Ainda faltam alguns detalhes". Saímos da
sala e não falou mais nada.

**Paulo [01:12]:** Agora é a gente fazer esses pequenos ajustes pra poder
mostrar aqui no Brasil. Vou sentar com o nosso diretor aqui no Brasil e falar:
"Cara, a gente está procurando um MRV, já viu vários, não fechou com nenhum. No
meu pós-doc eu fiz um, é isso daqui. Vamos testar nos projetos". Se a gente
colocar pra dentro, fizer um projeto, acabou. Minha preocupação maior é um
diretor novo, um cara meio complicado, o Pedro Malta. Ele pode empinar a
carroça: "o cara trabalha na empresa e cria uma plataforma pra competir". O
máximo que vai acontecer é dar ruim pra mim, quererem me mandar embora. O que
pra eles não acho que seja o melhor caminho: se me mandam embora, eu tenho a
plataforma, tenho conhecimento, vou pro mercado prestar o serviço que eles
prestam. Não quero fazer isso hoje, porque ganho relativamente bem e estou numa
fase em que não posso arriscar muito. […] Mas se acontecer, vou pro mercado
oferecer consultoria, implementação e MRV. Simples assim.

**Z2 [03:04]:** No pior dos casos, se você sair de tudo e ficar full GAIA, o
dinheiro que a gente tem pra GAIA vira um salário pra você?

**Paulo [03:12]:** Não dá. Agradeço a sua hombridade. Se isso acontecer, o que
vou ter que fazer é ir atrás de projeto. Projeto fechado de consultoria com a
GAIA dentro. No tipo de serviço que a gente faz, em quase todos os projetos a
GAIA encaixa. Se a gente for colocando os módulos todos, quando terminar, em
todos os serviços encaixa.

**Z2 [04:04]:** Então daria pra pôr a GAIA como uma cobrança adicional, e o
dinheiro da GAIA ir pra GAIA.

**Paulo [04:08]:** É. Fechou o projeto: tem a parte de benchmark, de coleta de
dados, que é o que eu vou fazer. E tem a parte de processamento de dado, de
MRV, que é o serviço da GAIA. Estou falando de uma situação extrema, não acho
que vai acontecer. Quero acreditar que no fim eles vão falar: "beleza, vamos
ver como usa". Se falarem "não queremos usar", a gente vai caçar um cliente pra
vender. É outra oportunidade: bater na porta de algumas empresas e falar "tenho
a plataforma, é essa e custa tanto, quer?". Mas a semente foi plantada. O Pica
sabe, então ninguém vai chegar pra ele fofocando, que era o meu medo. Fui logo
no Pica, e agora vamos atacar aqui embaixo.

**Paulo [05:16]:** Ele poderia morder a isca e já querer puxar pra dentro. Não
foi o caso: ele está com um milhão de coisas. Quando era só diretor Américas,
ainda tinha tempo pra olhar inovação. Hoje a visão dele é extremamente
estratégica. Ficamos duas horas reunidos sobre a área que estou implantando no
Brasil, na região Américas, e como vou atuar globalmente pra dar suporte aos
outros projetos. […] Nas próximas três semanas ele vai estar fora: essa semana
na África do Sul, semana que vem na Ásia. Parte do plano está ok: ele já sabe,
mostrei a plataforma, o olho dele cresceu. Agora a gente ataca aqui no Brasil,
que é onde tem maior volume de projeto, e se der certo aqui vai jogando pras
outras regiões.

**Ruan [06:56]:** A gente alinha direitinho a abordagem, Paulo. O objetivo não é
competir, não é vender pra ninguém, é agregar valor em cima dos projetos. "A
ideia é vender mais pra Peterson, é a Peterson ganhar mais em cima disso." E pro
Danilo, cara, o Danilo quer dinheiro na conta.

**Paulo [07:24]:** [A gente não tem a] solução. Eu estou trazendo a solução,
que é um negócio que estou fazendo no meu pós-doc. Quero colocar dentro, ganhar
um pouco de dinheiro também, e depois vocês compram. Pra gente poder usar, dá
pra fazer um contrato com opção de compra, estruturar certinho e botar pra
dentro. Demanda tem, a gente não tem a solução, a gente está perdendo projeto
por isso. [Mandamos uma proposta pra Mars de 300 mil euros] — era o projeto
completo, pra dois anos. Tinha toda a parte de consultoria agronômica, de coleta
de dados, mas os caras queriam um MRV pra processar os dados, e a gente não
tinha. A proposta não foi, porque deram opção pra outra empresa, que já
trabalha com arroz e já tem as ferramentas adequadas. E as ferramentas
adequadas são isso. Agora é sentar com o Danilo pra mostrar pra ele.

### Demo: design system e plataforma

**Z2 [09:00]:** Aproveitando a deixa, vamos mostrar como está ficando a
plataforma, as coisas novas, o design que a gente fez. Está tudo em dev, fiquem
à vontade pra acessar. [Eu tinha pedido pro Gabriel] fazer a comparação, porque
não estava gostando do fluxo: estava difícil, a visualização não estava legal.
Ele deu uma mudada, mas estava demorando demais, e ele já tinha feito um
exemplo. O que a gente fez na Z2: pegou tudo que ele tinha feito no Figma e
passou pra uma ferramenta nova, [o Penpot, que é mais fácil de usar com
inteligência] artificial e é inteiramente grátis. Passei pra lá tudo que a
gente tinha no código, como design, e do Figma também. Agora a gente tem um
design system: todos os componentes, toda a tipografia, todas as cores. Vai
ficar muito fácil testar fluxo. A gente vai fazer biodiversidade agora:
primeiro passa pra design, deixa bonitinho, confere campo por campo no design,
porque lá é bem mais fácil fazer qualquer alteração. Dando ok, passa pra
desenvolvimento com o negócio praticamente pronto. Aproveitando essa passada,
deixei as coisas mais padronizadas, que é o que está na plataforma.

**Z2 [11:04]:** A gente ainda precisa testar com mais afinco, ver se os
cálculos estão certos, mas está tudo lá. Já estamos pra passar [pra próxima
fase].

**Paulo [11:20]:** Sobre isso, eu e o Ruan estávamos conversando de pagar uma
diária pra parte de carbono do solo pro João, e uma diária pra parte de emissão
pra Day. São especialistas na área, e eles vão testar várias vezes.

**Z2 [11:44]:** Eles já foram apresentados pra gente, ou a gente nem sabe quem
são?

**Paulo:** Não, vocês não conhecem.

**Z2 [12:00]:** [A plataforma segue o mesmo] fluxo: gestão de usuários,
configurações. Ficou um pouco mais quadradinha, o menu agora está sempre
recolhido pra dar mais atenção [ao conteúdo]. O talhão a gente melhorou um
pouco. [Temos que melhorar a tela do] talhão, mas hoje a gente não tem
informação. Em carbono e emissão, o gráfico continua o mesmo. Isso vocês já
tinham visto.

### Demo: comparação

**Z2 [12:32]:** A novidade é a comparação. Como funciona: tenho todas as minhas
informações e posso selecionar. Essa tela a gente vai melhorar pra ficar fácil
pro usuário, mas aqui vejo todos os projetos a que tenho acesso. [Aqui sou
usuário total. Se fosse o Paulo,] só com os projetos dele, ele ia ver só os
projetos dele e selecionar a fazenda que quiser. Deixa eu achar uma que está
válida; testo tanto que fico meio louco. Isso a gente vai melhorar: o Rosa vai
fazer uma API que só retorna as opções possíveis, pra não ter que ficar caçando
igual estou fazendo agora. Aqui consigo selecionar de 1 a 4. Fiz de 1 a 4 por
questão de visualização, acho que começa a ficar muito dado. Vocês podem falar
"a API já aceita até 20", mas comparar 20 projetos de uma vez é meio [absurdo].
Vejo por linha, vejo o total. Falta usar pra ver se realmente faz sentido. Foi
tudo feito a partir do design. Posso vir em remoção também, comparar remoção,
ver o total. Cadê o botão de comparar aqui? Acho que não subiu. Na regenerativa
a mesma coisa: demos uma pequena mudada.

**Paulo [14:20]:** Bem melhor, bem melhor sim. Bacana demais. Só acho que a
gente poderia colocar mais fazendas, porque a gente trabalha com projetos de 10
fazendas.

**Z2 [14:52]:** [O limite é] quatro [na comparação]. Você acha que tem que poder
comparar mais de quatro?

**Paulo [14:56]:** Acho que sim. Talvez, em vez de ter os números, colocar
comparação só de gráfico. O que você acha?

**Z2 [15:12]:** Isso vai ser tudo usabilidade, a gente vai ter que pensar e ver.
[O que pensei também é ter sempre o consolidado da fazenda.] Mas tem que usar:
infelizmente dashboard só usando que a gente consegue pensar nas coisas. Esse é
o novo padrão da plataforma, está fácil fazer essas coisas. Agora a gente
consegue desenvolver as telas meio industrial.

**Paulo [15:44]:** Ficou top. Show de bola.

### Demo: mobile

**Z2 [16:08]:** Outra coisa, que está andando um pouco mais devagar, é o mobile.
No celular a gente vai focar inteiramente em dados. Por enquanto não queremos
pegar muito gráfico. Isso aqui eu pedi pro Claude fazer: "a gente tem essas
telas no web, quero passar pra celular". Dou um toquezinho no design pra ficar
mais bonitinho. Já vamos começar a andar com o mobile. Só tem um ponto: se for
Android, é fácil testar. Consigo te mandar o APK, que é o arquivo do aplicativo,
você baixa no celular e usa. Se for iPhone, a gente tem que ter uma conta na
Apple e começa a gastar dinheiro.

**Paulo [17:24]:** Acho que hoje tem outras prioridades. A gente vai evoluir pra
isso, mas não é a prioridade número um agora. Até porque os celulares da
empresa…

**Ruan [17:40]:** São todos Android. Temos o celular da empresa, a gente
consegue usar.

**Z2 [17:56]:** A gente manda o arquivo no grupo do WhatsApp mesmo, vocês
baixam e usam.

**Paulo [18:04]:** Principalmente pra coleta de dados. Gráfico é um plus.

**Z2 [18:24]:** O foco principal é ser offline: você está no campo [e preenche
tudo sem internet].

**Paulo [18:32]:** A primeira coisa que o cara da Peterson vai perguntar é:
"consegue fazer coleta de dados sem acesso à internet?".

**Z2 [18:40]:** Quando tiver internet, você clica em sincronizar e manda pro web.
[Estou fazendo até uma tela pra quando mexerem no] web e no celular ao mesmo
tempo, duas pessoas diferentes: dá pra definir qual dado é a fonte da verdade.

### Verba de design

**Z2 [19:04]:** Agora, próximos passos. Não, mais uma coisa antes, sobre design.
Com um amigo nosso que é designer, a gente está fazendo a logo da Z2. Ele é
muito bom, ficou muito legal, e a gente está pensando em pegar [ele pros 5 mil
de design; ele tem CNPJ e fecha a terceira cotação]. [A pergunta é se vocês
querem investir] num redesign, ou se como está hoje vocês estão satisfeitos e
não precisa gastar com isso agora. Ele faz postagem, landing page. Hoje a gente
só tem a plataforma. Landing page pra pessoa entrar e entender o que é, a logo,
as cores, umas animações. Vocês acham interessante termos isso como GAIA? Ou,
por enquanto, só plataforma e boca a boca, e quando precisar de design a gente
usa esse [valor]?

**Paulo [20:48]:** A gente não pode focar só nisso. Hoje a nossa primeira
prioridade é conseguir jogar pra dentro da Peterson. Se conseguir, não tem tanta
necessidade. Se não conseguir, vamos precisar, porque vamos ter que vender de
outra maneira. Não sei, Ruan.

**Ruan [21:12]:** O que estou pensando é: essa galera que está com vocês
consegue construir alguma coisa pra plataforma? Não um site, uma landing page,
mas pra plataforma, baseado no serviço que o Gabriel fez. Dá pra usar esse
recurso pra melhorar logo de cara a plataforma, deixar mais bonita, trazer um
toque de design, uma experiência de usuário melhor, se essa pessoa agregar mais
que o Gabriel nesse sentido? Se vocês acharem que sim, o dinheiro é pra usar,
com foco na plataforma nesse primeiro momento. Se sobrar recurso e depois valer
a pena investir no site, a gente usa.

**Z2 [22:04]:** Esse cara se chama Beto, ele é mais focado nessa parte. Isso aqui
é o que ele fez. [Não é tanto de] plataforma. Se for plataforma, continua [com
o] Gabriel, porque a gente não vai fugir muito do padrão que temos hoje, que é
formulário e gráfico. [Se a usabilidade estiver] ruim, igual vocês falaram de
contratar aquelas duas pessoas pra testar, é interessante porque a gente vê por
um terceiro como está o preenchimento. Se falarem que está ruim, aí a gente
pensa num [redesign de fluxos, não de logo e cores]. Esse cara é realmente de
logo, postagem.

**Paulo [23:08]:** Pra esse momento, acho que a gente pode esperar.

**Ruan [23:12]:** Esse recurso a gente tem que usar até março. Vamos falar
fevereiro. A gente tem até fevereiro pra tomar uma decisão, pra não perder essa
grana, porque se não usar ela volta.

**Z2 [23:40]:** Então vamos esperar e ver o que vai virar com a Peterson. Se não
der certo lá e a GAIA virar uma empresa independente, a gente segue com isso.
Até janeiro a gente tem essa resposta?

**Ruan [23:56]:** Tem que ter. Tem que ter até pra gente poder avançar.

[…]

**Z2 [24:52]:** Vamos esperar. Temos o dinheiro. Vou falar pra ele fazer o
documento, e quando precisar a gente [decide].

**Ruan [25:00]:** Beleza. Mas aí a gente seleciona o Gabriel ou ele? […] O
dinheiro nem vai passar pela Z2. Está na conta da empresa que eu tenho e vai pro
fornecedor.

**Z2 [25:24]:** Mas ele vai passar pra você aquele documento…

**Ruan [25:28]:** A cotação. Como a gente não vai fazer agora, não precisa da
cotação agora. A ideia é pegar a cotação e, com tudo ok, já pagar. Se pegar uma
cotação agora e só pagar em janeiro, vão falar: "você pegou uma cotação de
setembro e pagou só em janeiro? O preço não mudou?". Pode abrir margem pra
questionamento. Então deixa pra mais perto. Deixa ele já no esquema, pra quando
precisar ele saber como é e só emitir.

**Z2 [26:08]:** Felipe, você ia falar alguma coisa? […] [O Gabriel tem] dois
CNPJs, mas ele também está alinhado com isso há um tempo, então tudo certo.
Vamos pausar isso por agora.

### Próximos passos: export e PDF

**Z2 [26:32]:** Agora, próximos passos da plataforma: biodiversidade?

**Paulo [26:40]:** Acho que antes tem a função de conseguir baixar os dados.
Isso é super importante. Baixar os dados em formato Excel ou PDF.

**Z2 [27:08]:** Que dados exatamente?

**Paulo [27:12]:** São duas coisas. A primeira é baixar os dados brutos, porque
a gente vai entrar com consumo de fertilizante, consumo de não sei o quê.
Digamos que dentro de um projeto a gente tenha 20 fazendas. A gente teria que
ter esses dados que entramos (fertilizante, calcário etc.) e aqui as fazendas e
os números. Isso é importante ter. E aí baixar só em PDF o dashboard. De
preferência, não sei como é isso, colocar um QR code no fim, de forma que o
cara escaneia e vai direto pra plataforma. Acho que fazer essas duas coisas e
depois a gente entra em biodiversidade, que é o próximo módulo.

*[28:30–30:56: a conexão do Paulo cai; conversa paralela omitida.]*

### QR code de verificação

**Paulo [31:04]:** […] por projeto, por módulo, em formato PDF. E se conseguir
colocar um QR code pra fazer uma verificação (não sei como fazer isso): na hora
que você baixa o PDF, se o cara escaneia, vai pro site da GAIA e consegue ver
que de fato aquele resultado foi gerado dentro da plataforma.

**Ruan [31:36]:** Faz uma validação.

**Z2 [31:44]:** [Abre] naquela mesma [tela]? Porque o cara teria que ter
acesso. Não é qualquer um que pode entrar com QR code. Tem que pensar qual é o
[modelo de acesso].

**Paulo [31:52]:** Deixa eu pensar. Não sei como essas outras empresas fazem.
[Mas pensa no] seguinte: a empresa pode imprimir esse QR code. Ela está
vendendo um lote de algodão, por exemplo, e prega isso dentro do pacote. O cara
escaneia e tem a informação daquele lote, a rastreabilidade: qual a pegada de
carbono, qual foi o score regenerativo. Mas aí acho que ele teria que ter uma
senha, talvez.

**Z2 [32:36]:** É de se pensar, mas dá pra desenvolver. Pode ter uma senha, mas
qual seria? Está no QR code de um PDF, como eu mando a senha pra essa pessoa?
Ou pode ser algo público: qualquer um que tiver a URL vê. Mas aí qualquer
pessoa teria acesso a esse resultado.

**Paulo [33:00]:** Eu penso assim: se o cara prega isso num pacote de algodão,
ele quer que seja público. Senão ele não imprime e não prega. Ele pode ter só o
resultado com o QR code sem pregar. Mas se quer pregar, acho que esse dado pode
ser público. Não tem problema.

**Z2 [33:28]:** [Mas aí] você vê um QR code num algodão, abre a GAIA e nem sabe
o que é a GAIA…

**Paulo [33:40]:** Hoje a turma está buscando o que a gente chama de
rastreabilidade, informação. Essa é uma maneira de tornar público um dado de
pegada de carbono, por exemplo. Minha dúvida, Ruan: o cara escaneia o QR code e
é livre ou não? Não sei como as outras plataformas estão fazendo. Sei que elas
colocam o QR code, o dashboard vem com QR code. Não sei se qualquer um que
escanear tem acesso.

**Ruan [34:24]:** A gente tem que pensar como isso vai ser operacionalizado. O
que acontece hoje com essas grandes marcas, falando do que a gente está fazendo
agora com a Nestlé: eles têm um QR code, mas imprimem embalagem aos milhares,
não puxam lote por lote. O consumidor pega uma média geral da emissão e uma
rastreabilidade potencial mais focada, mas aí entra balanço de massa. Não sei o
quanto isso ficaria complexo. Tenho o resultado do meu projeto de algodão,
tenho uma blusa, mas só consigo reportar o volume que usei daquela fazenda,
daquele projeto, pra dizer que é aquele algodão com aquela pegada. Se misturar
com outro algodão, babou.

**Paulo [35:08]:** Não estou preocupado a nível de cadeia. Estou preocupado com
essa fazenda aqui, esse algodão que está saindo…

**Ruan [35:20]:** Então é mais a nível de fazenda. Entendi, faz sentido. A nível
de fazenda, isso pode ficar dentro da GAIA mesmo. Sabe aqueles documentos que a
gente tira na universidade? Acho que o principal ponto do QR code é validar que
o dado veio de um site real, que não foi manipulado, nem por IA. […] Hoje tem o
QR code: escaneio e ele confirma no site da própria universidade. A ideia é
essa: mostrar que o dado não foi manipulado, cair no site da GAIA e mostrar que
é um dado real. Como transformar isso numa página de validação, não tenho
ideia, mas deve ter alguma coisa no mercado pra gente beber da fonte.

**Paulo [36:52]:** Digamos que a gente tem 10 projetos diferentes. Como
funcionaria? 10 QR codes, um pra cada projeto. Teria que criar uma página pra
cada projeto, ou dá pra automatizar?

**Z2 [37:12]:** Automatizado. Seria tipo `gaia/prova/<id do projeto>`. Quando o
cara acessar essa página, a gente pega do banco e mostra as informações
necessárias. Essa parte é fácil, a gente faz. O que a gente precisa saber é
como isso vai ser algo real, o que tem que mostrar. Vocês têm que trazer isso.

**Paulo [37:44]:** Talvez o dashboard simplificado.

**Ruan [37:52]:** Bem simplificado mesmo. Só o grosso.

**Paulo [38:00]:** A fazenda, aquele mapinha da fazenda e o dashboard
simplificado. [Carbono…]

**Z2 [38:12]:** [E o] do projeto é o acumulado de todas as [fazendas]?

**Paulo [38:20]:** Teria que ser uma média [das fazendas].

### Cálculo final vs simulação

**Z2 [38:32]:** [A plataforma deixa o cara] brincar, fazer projeções. A gente
tem que pensar agora em ter o valor que o cara quer usar, o que ele realmente
fez. Qual cálculo de carbono/emissão daquele talhão, daquela fazenda, daquele
projeto ele está usando. Faz sentido?

**Paulo [38:52]:** Faz sentido.

**Z2 [38:56]:** [Tipo] o cara seleciona um cálculo e fala: "esse é o real".
Num outro projeto que a gente está fazendo, os caras conseguem fazer
exatamente isso, brincar. Qual é o nome, Felipe?

**Leonardo [39:20]:** Simulação.

**Z2 [39:24]:** No nosso a gente não tem isso. O cara faz o cálculo e vira um
dos cálculos. A gente não marca como simulação. Então faz sentido ter na
plataforma o cálculo que é o real: no talhão A da fazenda A do projeto A, o
cálculo A é o real; B, C e D foram testes que eu quis fazer.

**Paulo [39:44]:** Geralmente, por exemplo: vou vender milho de Santa Catarina
pros Estados Unidos. Quando começo o projeto, crio a minha linha de base. Em
cima dela posso fazer essas simulações: qual prática vou implementar que me dá
mais carbono ou reduz a minha emissão. Mas quando fecho o projeto e vou vender o
milho, não mando essas simulações. Mando a linha de base: qual a minha pegada de
carbono naquele momento e qual o estoque de carbono naquela área naquele
momento. Posso até mandar aquele momento mais 5 anos, pra estoque de carbono,
pro cara ter uma ideia, mas não entrego simulações irreais na venda. Quero o
dado preciso, a foto daquele momento.

**Z2 [41:00]:** Entendi. Então isso é uma coisa nova na plataforma: além de ter
os dados, definir o que é o cálculo final e o que foi simulação.

**Paulo [41:12]:** Porque isso entra naquele papo que a gente teve lá atrás, de
colocar um ambiente pra verificação. A verificação dos dados é feita com o dado
real, a foto daquele momento. Se eu sou uma LDC, uma trader, quero vender esse
milho pra uma Nestlé nos Estados Unidos, e a Nestlé fala: "quero saber a sua
pegada de carbono dentro da fazenda". No cálculo que fechei, meu grupo de
fazendas é esse, tenho a pegada de carbono de cada fazenda. Chamo uma terceira
parte, a empresa irmã da Peterson, a Control Union. Ela verifica dentro da
plataforma se os cálculos estão ok e fala: "está ok, dado real verificado". Eu
gero o dashboard, gero o QR code, prego no milho e mando pra fora. Faz sentido?

**Ruan [42:40]:** Faz.

### Auditor

**Ruan [43:04]:** Pensando nisso, a gente mantém na mesma página? Ou cria um
domínio só pra parte de auditor, libera um módulo ou perfil de auditor pra um
auditor credenciado acessar? Fico pensando como operacionalizar pra não
permitir que qualquer um tente se cadastrar como auditor. Claro que vai ter
filtros pra barrar, mas não sei se é a melhor maneira.

**Paulo [43:44]:** Em relação ao projeto e por fazenda, beleza. Agora esse outro
ambiente pro auditor [separado] do técnico, do nosso ambiente, tem que criar.
Ou não sei se a gente faz isso fora da plataforma, porque como ele vai
conseguir baixar os dados, por exemplo?

**Z2 [44:32]:** Não vamos pensar em ambiente, vamos pensar em permissões. [A
página do QR code é uma] URL, igual a gente tem hoje o dev.gaia, só que essa
página é pública, qualquer um pode [ver]. Como é na internet, é difícil
bloquear o download da página, porque dá pra fazer isso por fora do navegador.
Mas qualquer pessoa ter acesso àquele dashboard simplificado é totalmente
possível. A questão do auditor, de falar "ok, esse projeto está ok", também.

**Paulo [45:24]:** Talvez o que daria pra fazer: estou com a folha do dashboard
na mão, com os dados de cálculo de carbono e o QR code. Escaneio, vai pra GAIA.
Pra ter acesso a isso dentro da GAIA, talvez criar um usuário e senha simples,
só pro cara logar e ter acesso só ao dash, sem mexer em nada.

**Z2 [46:12]:** Mas se [qualquer um] tem acesso, vai ser aberto: qualquer pessoa
pode criar um usuário e acessar.

**Ruan [46:28]:** Isso já gera muita complexidade, abrir usuário só pro público
externo bater o olho nas informações. Pro auditor não: pro auditor auditar os
dados, sim.

**Z2 [46:40]:** Num projeto que a gente teve, que tinha relação com auditor,
existia o usuário tipo auditor. A gente queria ele dentro da plataforma porque
era um usuário que agregava valor. Quem fez o projeto convidava o auditor: era
um convite mesmo, ia um e-mail pro cara criar a conta, e aí ele tinha acesso ao
seu projeto, o acesso que você quisesse dar, e via tudo lá e fazia a auditoria.

**Ruan [47:08]:** Acho que funciona.

**Paulo [47:20]:** Resolveu. Eu trouxe três coisas. Deixa eu dar um passo pra
trás, porque a gente começou a discutir um monte de coisa. A primeira é baixar
os dados em Excel e baixar o dash em PDF. Quero ter no meu computador, eu
baixo. Esse é o primeiro passo. O segundo é, junto com esse PDF, criar um QR
code pra dar visibilidade e segurança àquele dado. Como a pessoa de fora da
GAIA vai acessar é com vocês. Ela só precisa do QR code ligado a um domínio
GAIA, pro cara falar: "esse dado saiu de dentro dessa plataforma".

**Z2 [48:36]:** Isso é fácil. O que a gente precisa saber de vocês é o que vai
trazer confiança pro usuário falar: "aqui tem, sei lá, dois [indicadores de]
carbono. Ok, gostei, confio".

**Paulo [48:56]:** O que a gente precisa definir é se vai trazer um resumo do
projeto, um dado de carbono. Se o cara contratou todos os módulos, um resumo de
todos; se contratou dois, um resumo só dos dois. O que vai vir. Isso é o que o
mercado oferece. Não sei se a gente consegue oferecer mais, mas é o ponto que
precisa discutir, que não está claro. O terceiro ponto é o auditor. A gente
define que o auditor vai ter acesso ao projeto e pronto: cadastra ele como
usuário, ele entra, vê os dados, baixa o Excel, baixa o PDF.

**Ruan [50:04]:** Acho que sim. PDF pro auditor não vai ser muito [útil], ele
vai ver tudo.

**Z2 [50:16]:** Ele vai ter acesso aos cálculos do projeto: todas as fazendas,
todos os talhões e os cálculos de cada módulo que o usuário definiu como o
cálculo final, o real. […] É o dashboard final, ou é tudo? É tudo que ele
selecionou: tais defensivos, tais produtos.

**Ruan [50:52]:** Tem que ter, principalmente os dados primários.

**Paulo [51:00]:** Isso. A única coisa que talvez a gente tenha que colocar como
extra pro auditor é a planilha e quais fatores de emissão foram usados. Tem um
fator de emissão pro fertilizante X e Y. Geralmente eles conferem quais fatores
de emissão foram utilizados.

**Z2 [51:40]:** Faz sentido. Ele basicamente vai ver o formulário que o
[usuário preencheu] e os cálculos. Outra coisa: a gente vai pensar em alguma
forma de cobrança pra esse auditor, ou ele vai ser um a mais que a gente vende?
Você usa a GAIA e consegue dar acesso ao auditor que quiser, ele olha tudo pela
GAIA e facilita a sua vida.

**Paulo [52:16]:** [Na] plataforma a gente fala: "lá no fim tem a opção de pedir
uma verificação desse dado pela Control Union". Depois, se tiver demanda, a
gente fala pra Control: "temos a plataforma, um ambiente específico pra
auditor, a empresa tal pediu a auditoria". Eles vão cobrar tanto pela
verificação, e a gente passa esse [custo].

**Ruan [52:44]:** É isso. Acontece até com a Verra: tem os verification bodies
certificados, só as empresas autorizadas fazem a auditoria. No futuro a gente
faz isso também. Tem a Control, mas se a gente for pro mercado independente da
Peterson, coloca a relação de outras auditorias. E eles pagam: não acho que
estar na relação de certified body seja de graça. Depois a gente pensa como
funciona.

**Z2 [53:24]:** Na outra plataforma que a gente tinha, os auditores ganhavam
acesso [à plataforma]. Ter o auditor lá facilita a vida dele e diminui o custo
[do] tempo fazendo auditoria: vai estar tudo na plataforma. Beleza, definimos
três [coisas].

**Paulo [53:56]:** Acho que fecha bem essa parte. Claro que estou doido pra
colocar o módulo de biodiversidade, porque é diferente, vai ter as abelhinhas.
Mas nesse momento vamos focar nisso pra fechar essa estrutura: cálculo de
carbono, verificação, QR code, baixar o dado. Estou super ansioso pelo módulo
de biodiversidade, vai ser um chamariz diferente, mas vamos focar no que é mais
importante agora.

### Encerramento

**Z2 [54:44]:** O que dá mais valor [vem primeiro], o outro espera. Três coisas
já é bastante desenvolvimento pra gente, vai dar um tempo. Vou pegar a gravação
e tentar desenhar alguma coisa com base no que a gente falou, mas vai ter
demanda pra vocês, principalmente o que mostrar no QR code, porque a gente tem
zero noção. Pelo contexto que a gente tem, a IA que a gente treinou vai trazer
algumas [ideias].

**Paulo [55:24]:** [Pede pra ela] pesquisar o que a plataforma Puma está
fazendo, o que a CR está fazendo, o que a Regrow está fazendo. Todos eles têm
QR code. Vê o que eles estão fazendo. Tem outras também, se quiser eu passo.
Farm[…] também é uma outra plataforma.

**Z2 [55:44]:** Isso é muito importante, já ajudou 1000%. [A transcrição] é meio
ruim de acertar nome; se você puder passar por escrito…

**Paulo:** Posso.

**Z2 [56:08]:** Outra demanda de vocês, que seria bom ser mais urgente: trazer
essas duas pessoas pra testar a plataforma. Senão a gente só fica fazendo,
fazendo, e quando vê errou um negócio lá atrás e estragou tudo.

**Paulo [56:24]:** Já vou. A gente queria validar a primeira [versão] aqui, por
isso estava demorando, pra já trazer dados reais e fazer os testes.

**Z2 [56:44]:** Bom demais. Por mim a gente já segue.

**Ruan [56:56]:** Hoje é terça. Próxima semana, ou antes, outra reunião pra
manter o fluxo?

**Felipe [57:24]:** Justamente sobre isso: a gente deve pegar hoje, amanhã
talvez, pra planejar o que tem que ser desenvolvido. É importante falar toda
semana pra vocês verem o que está evoluindo e acompanharem de perto. Vocês têm
conta no Plane que a gente estava usando, não têm? É bom dar uma passada rápida
lá pra ter noção do que está sendo desenvolvido.

**Paulo [57:48]:** Beleza.

**Z2 [58:08]:** Então fica marcado: semana que vem, terça-feira, 16h, essa
reunião.
