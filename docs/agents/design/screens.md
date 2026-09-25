# Telas

## Regra de conteúdo

O conteúdo de cada tela é o que o código mostra hoje:
- textos do i18n (`messages/pt.json`), exatos;
- campos, placeholders, colunas, ações e estados.

O design só melhora o layout e troca os elementos pelos componentes do sistema.

- **Nunca** invente título, mensagem, campo ou estado, nem reescreva um texto (nem pontuação).
- **Pode:**
  - mover a mensagem para um componente melhor (texto solto → Alert);
  - trocar o componente (link → Button outline com o mesmo texto; input de texto → Input OTP);
  - reorganizar o grid;
  - acrescentar componentes de UX que faltam no código (ex.: Stepper num wizard, toolbar de desenho no mapa). O design lidera, e o código é ajustado depois.
- **Dados dinâmicos** (nomes, números, listas vindas da API) usam amostras realistas e consistentes entre telas. O usuário logado é "Maria Silva / maria@fazenda.com.br".
- **Estados obrigatórios** ([states.md](./states.md)) entram mesmo quando o código não os tem. Use o texto da feature se existir; senão, o texto padrão de `states.md`, registrado como chave i18n nova. Não conta como conteúdo inventado.
- **Divergências vindas de componentes já aprovados** (ex.: CardList sem o rótulo "Nome do Projeto") entram na doc do lote e são avisadas ao usuário.

## Fluxo de um lote

1. **Levantar** no código as rotas do lote e, por tela, os textos exatos, campos, colunas, ações, dialogs e estados.
2. **Apresentar ao usuário a lista de fluxos → frames (com a FlowTag de cada um) e esperar confirmação** antes de desenhar.
3. **Criar a página** `NN Tela - <lote>`. O Penpot cria páginas no fim da lista, então crie na ordem.
4. **Faltou peça?** Crie na 02 ou na 03 primeiro, e só depois use na tela.
5. **Montar** os frames, exportar cada um e conferir visualmente. Cada tela ou dialog ganha os frames de estado: `— carregando`, `— erro` e `— vazio`, além de `— salvando` e `— erro ao salvar` nos dialogs com ação (veja [states.md](./states.md)).
6. **Organizar em fluxos** conforme o [padrão de página de telas](#padrão-de-página-de-telas): Legenda, um board por fluxo e FlowTag em cada frame.
7. **Rodar** `storage.repairIcons(root)` e depois `storage.audit(root)`, que tem de dar 0.
8. **Registrar** o lote abaixo e atualizar o status no Guia (`00 Capa & Guia`).

## Padrão de página de telas

Vale para toda página `NN Tela - <lote>` (04 em diante). Referência pronta: `04 Tela - Auth`.

### Estrutura

```
Legenda                        ← nome do lote, descrição e as 6 FlowTag com significado
Fluxo 01 — <tela ou dialog>    ← board do fluxo
  Header                       ← "Fluxo 01" · título · descrição
  Telas                        ← linha: principal primeiro, estados à direita
    Tela                       ← FlowTag + nome do frame, e embaixo o frame 1440×900
    Tela ...
Fluxo 02 — ...
```

| Elemento | Especificação |
|---|---|
| Página | Uma por lote, `NN Tela - <lote>`. Só boards `Legenda` e `Fluxo NN — <nome>` na raiz; nenhum frame solto. |
| Legenda | Board no topo (x 0, y 0): título do lote em `doc-display`, descrição em `doc-body` muted e a linha das 6 FlowTag, cada uma com o significado. |
| Fluxo | Board `Fluxo NN — <nome>`: bg `background`, borda `border` 2, `radius.xl`, padding 80, gap 64. Numeração em dois dígitos, na ordem de navegação do produto. |
| Header do fluxo | "Fluxo NN" em `doc-title` primary, título em `doc-display`, descrição de uma linha em `doc-body` muted (o que o usuário faz ali). |
| Linha de telas | Row com gap 120. O estado padrão primeiro e os estados à direita, na ordem: carregando → erro → vazio → sucesso. Em dialogs com ação: dialog → salvando → erro ao salvar. |
| Rótulo da tela | FlowTag + nome exato do frame em `doc-title`, gap 16, 24 acima do frame. |
| Espaço entre fluxos | 240 na vertical, todos alinhados em x 0. |

### O que é um fluxo

- **Uma tela ou um dialog com os seus estados.** Um dialog aberto a partir de uma tela vira um fluxo próprio, logo abaixo dela (ex.: `Meus Projetos` → `Novo projeto`).
- **Wizard** é um fluxo só, com os passos em sequência e os estados de cada passo logo depois do passo (ex.: `Nova fazenda`).
- **Tela sem estados** também é um fluxo, de um frame só (ex.: `Perfil`).

### FlowTag (qual usar)

| Tag | Quando |
|---|---|
| Principal | Estado padrão de uma tela |
| Dialog | Estado padrão de um dialog, sheet ou alert dialog; cada passo de wizard |
| Carregando | Skeleton de dados e ação em andamento (salvando, enviando, criando) |
| Erro | Falha de carga, falha de ação e erro de validação |
| Sucesso | Retorno positivo visível (Alert success, item criado) |
| Vazio | Resposta válida sem itens |

As tipografias `doc-display` (64), `doc-title` (32) e `doc-body` (24) e o componente FlowTag servem só para anotação. Nunca entram numa tela.

### Nome do frame

`<Tela>` ou `<Tela> — <estado>`. Dialogs: `<Tela> — <Dialog>` e `<Tela> — <Dialog> (<estado>)`. Exemplos: `Meus Projetos — carregando`, `Meus Projetos — Novo projeto (salvando)`.

### Como montar

```js
// frames já criados na raiz da página, com os nomes finais
storage.pageLegend('Auth', 'Login, recuperação e redefinição de senha. Um board por fluxo; ...');
storage.flowSection(1, 'Login', 'Entrada na plataforma com email e senha.', [
  ['Login', 'principal'], ['Login — entrando', 'carregando'], ['Login — erro', 'erro'], ['Login — senha redefinida', 'sucesso'],
]);
// ... um flowSection por fluxo
storage.fitTexts(penpot.root);
await storage.restack(); // sempre por último: as alturas só assentam depois do layout e do fitTexts
```

- **Monte os frames soltos primeiro** (x/y livres), confira cada um com `export_shape` e só então agrupe em fluxos. Depois de agrupados, o frame continua exportável pelo id.
- **Editou um texto dentro de um fluxo?** Rode `restack()` de novo. Sem isso, os boards se sobrepõem.
- **Página pesada** (mais de ~15 frames com mapa): chame `flowSection` em mais de um `execute_code` para não passar do timeout de 120 s.

## Esqueleto das telas logadas

Montado com `storage.screen(nome, {title, back, active})`:

| Parte | Especificação |
|---|---|
| Frame | flex row, bg `sidebar`, padding 8 (topo, direita e base), clip |
| Sidebar | instância `{state:'expanded', active}` com `active` = `projects`, `users` ou `settings`, e usuário no rodapé via override |
| Inset | column, bg `muted`, `radius.xl`, clip |
| AppHeader | `back=yes` quando o código tem voltar. Título h1 = o título do Header no código. `Actions` e `BadgeScore` escondidos se a tela não tem. |
| Content | column, padding 24, gap 24 |

**Dialogs:** o frame da tela de fundo recebe o scrim (rect `foreground` a 50%) e o painel. Os dois são absolutos, com `layoutChild.zIndex` 10 e 11. O painel é montado com `storage.panel(title, w, desc)`, e o rodapé usa `outline` + `default` com os textos do código.

## Auth (sem sidebar)

- **Fundo:** `background-photo` (foto em modo cobrir) + overlay `sidebar` a 80%.
- **Esquerda:** `logo/full` (320×64), headline em display `sidebar-foreground` e apoio em body-lg `sidebar-muted-foreground`.
- **Direita:** card de 440 (rounded-xl, p 40, `shadow.lg`) com `logo/mark` 48, h1 e subtítulo centralizados, campos e ações.
- **Idioma:** TabsList PT/EN no canto superior direito.

## Lotes feitos

As páginas 04 a 06 foram reorganizadas no padrão de fluxos em 2026-09-24.

### 04 Tela - Auth

5 frames: Login, Login — erro, Login — senha redefinida, Recuperar senha e Redefinir senha.
- **Erro de login:** "Erro ao fazer login, tente novamente" vira Alert destructive acima do botão.
- **Mensagens do i18n:** `passwordResetSuccess` e `codeSent` aparecem em Alert.
- **Código:** vira Input OTP.
- **Campos e botão:** os inputs com linha embaixo viram FormField, e o Button `xl` vira `lg` de largura total.

### 05 Tela - Core

10 frames:

| Linha | Frames |
|---|---|
| Meus Projetos | lista · vazio · Novo projeto |
| Gestão de Usuários | tabela · Novo usuário · Gerenciar permissões · Detalhes do usuário |
| Configurações | Perfil · Trocar senha · Idioma |

- **Divergências vindas dos componentes:**
  - O CardList não tem o rótulo "Nome do Projeto".
  - O BadgeStatus mostra "Pendente" (no código aparece "Pendências" por bug de i18n).
  - O vazio de projetos usa EmptyState.
- **"Voltar" dos dialogs:** vira Button outline, com o mesmo texto.

### Estados adicionados (regra de estados)

- **Auth** (10 frames, uma linha por tela):
  - Login — entrando;
  - Recuperar senha — enviando e — erro ("Erro ao solicitar redefinição de senha");
  - Redefinir senha — redefinindo e — erro ("Erro ao redefinir senha").
- **Core** (22 frames):
  - Meus Projetos — carregando (CardList skeleton) e — erro (ErrorState section, texto padrão `common.errors.loadFailed`, chave nova);
  - Novo projeto — salvando e — erro ao salvar ("Erro ao criar projeto");
  - Gestão de Usuários — carregando (linhas skeleton nas 6 colunas) e — erro ("Não foi possível carregar a lista de usuários.");
  - Gerenciar permissões — carregando e — erro ("Não foi possível carregar os perfis.");
  - Detalhes do usuário — carregando e — erro ("Não foi possível carregar os dados do usuário.");
  - Trocar senha — salvando e — erro ("Erro ao trocar senha").
- **Chaves i18n novas propostas:** `common.retry` ("Tentar novamente"; hoje só em `farm.retry`) e `common.errors.loadFailed`.

### 06 Tela - Projeto & Fazenda & Talhão

21 frames:

| Linha | Frames |
|---|---|
| Projeto (lista de fazendas) | lista · carregando · erro · vazio |
| Nova fazenda (wizard, 3 passos) | Dados Gerais · Dados Gerais (erro de validação) · Enviar arquivo · Enviar arquivo (enviando) · Enviar arquivo (talhões desenhados) · Nome do talhão · Substituir arquivo · Imagem do perfil · Imagem do perfil (criando) · Imagem do perfil (erro ao criar) |
| Fazenda | visão · carregando · erro · vazio |
| Fazenda — Novo talhão | dialog · salvando · erro ao salvar |

- **Componentes que faltavam no código:**
  - **Stepper** no wizard Nova fazenda (o código não tem indicador de passo);
  - **DrawToolbar** e estados do mapa (`plots`, `draw`) no MapPlaceholder;
  - **PlotItem** `error` com os erros de geometria (as chaves i18n não existem no código; textos propostos: "O polígono não pode se cruzar.", "Área abaixo do mínimo de 100 m².").
- **Layout:**
  - A lista de fazendas ganha o título "Fazendas" no ListHeader (padrão de Meus Projetos).
  - O hover de talhão liga o polígono (Tooltip com o nome) e o PlotCard `highlighted`.
  - "Área Total (ha)" vira label "Área Total" + sufixo `ha` (FormField `unit`).
  - O nome do talhão no dialog Novo talhão vira FormField no corpo, e sai do rodapé.
  - O dialog Nome do talhão usa rodapé "Cancelar" + "Salvar talhão", no lugar dos botões redondos X/enviar.
  - O wizard mantém a altura entre os passos (corpo fixo), e o mapa ocupa a coluna direita no passo 2.
- **Divergências vindas do sistema:** BadgePercentage → BadgeScore; header sem avatar; "Status da Auditoria" em BadgeStatus; o lápis de "Detalhes da Fazenda" sai (handler vazio); "Voltar" em link → outline; CardList farm sem "Nome da Fazenda" e sem "Área".
- **Bug do código registrado:** a busca "Buscar por fazenda..." não filtra a lista.
- **Fora deste lote:** a tela do talhão (Dados gerais, Editar talhão, Excluir talhão) vai para o lote dos módulos do talhão.

### 07 Tela - Talhão

11 frames em 3 fluxos:

| Fluxo | Frames |
|---|---|
| Dados gerais | principal · carregando · erro · sem geometria (vazio) |
| Editar talhão | dialog · erro de validação · salvando · erro ao salvar |
| Excluir talhão | dialog · excluindo · erro |

- **Casca do talhão** (vale para os lotes 08 a 10):
  - AppHeader com voltar, título "{Fazenda} - {Talhão}" e BadgeScore com a % de preenchimento.
  - Logo abaixo, a barra de abas em Tab `line` (Dados gerais · Carbono emissão · Carbono remoção · Regenerativo) sobre bg `background` com Separator. O `border-b` do AppHeader fica escondido, e header e abas formam um bloco só.
  - Montada com `storage.plotScreen(nome, {active, title})`.
- **Layout:**
  - O mapa ocupa a altura toda do conteúdo, com o talhão enquadrado (MapPlaceholder `plot`).
  - O DetailsCard (368) usa SectionHeader `edit-delete` e mostra Área e Data de Registro, sem os dois-pontos do código.
  - Os ícones de editar e excluir ganham Tooltip ("Editar talhão"/"Excluir talhão", os títulos dos dialogs).
- **Editar talhão:**
  - Segue o padrão do Novo talhão (dialog de 768, mapa `draw`, legenda tracejada, FormField "Nome do talhão" no corpo).
  - A ferramenta de edição fica ativa no DrawToolbar.
  - O salvar ganha `loading`, que o código não tem, e o erro vai para um Alert.
- **Excluir talhão:** é o padrão único de exclusão. O título e a descrição vêm do código; o texto muted entra na descrição; os botões são Cancelar (outline) e Confirmar (destructive). Excluindo = loading; o erro "Erro ao excluir talhão" aparece em Alert.
- **Estados que o código não tem:**
  - erro de carga do talhão (ErrorState section, `common.errors.loadFailed`);
  - loading de página (skeleton no título, card em skeleton, mapa carregando);
  - sem geometria.
- **Chave i18n nova:** `plot.noGeometry` = "Talhão sem geometria cadastrada.".
- **Bug do código registrado:** o Salvar do Editar talhão não faz nada quando o mapa não tem exatamente um polígono. O design não cobre esse caso; o código deve mostrar um erro.

### 08 Tela - Carbono emissão

31 frames em 6 fluxos:

| Fluxo | Frames |
|---|---|
| Avaliações | lista (menu Ações aberto) · carregando · erro · vazio |
| Excluir avaliação | dialog · excluindo · erro |
| Módulo ACV | Cultura e Produto · erro de validação · Solo · Solo (limite de 20 anos) · Insumos · Combustíveis · Transporte · salvando · erro ao salvar · carregando · scroll |
| Resultado ACV | por produto · desatualizado · produto não calculado · visão agrícola · carregando · indisponível · scroll |
| Adicionar produto | dialog · salvando · erro |
| Remover produto | dialog · removendo · erro |

- **Páginas longas:** o frame tem a altura do conteúdo, e um frame `— scroll` (1440×900) mostra a área de rolagem marcada com tracejado primary e o Badge info (anotação, fora do produto).
  - **Módulo:** rola só o corpo da etapa. TopBar, etapas e rodapé ficam fixos.
  - **Resultado:** rola o conteúdo. AppHeader e abas ficam fixos.
- **Módulo ACV:**
  - A casca do talhão fica, e o conteúdo vira o ModuleShell. O TopBar tem o título do módulo e "Sair" em outline sm; o aside "Etapas" usa ModuleStep; o rodapé fica separado por uma linha.
  - Cada seção numerada tem h3 + ícone info.
  - Os itens repetíveis ("Fertilizante 1") viram um bloco com borda e lixeira.
  - Os campos com unidade selecionável usam FormField + Select Trigger de 112.
  - A evidência é FileItem (anexo atual) ou Dropzone ("Nenhum arquivo selecionado").
  - As etapas seguintes aparecem `upcoming` (a próxima) e `locked` (as outras).
- **Resultado ACV:**
  - O cabeçalho da página tem voltar (Button Icon ghost), h2 e "Comparar" em outline sm.
  - As abas de produto e o seletor de alocação usam TabsList default.
  - As 5 fases ficam em grade de 3 colunas. O Total usa `emphasis=primary`.
  - A alocação selecionada usa KpiCard breakdown `primary`, e o gráfico é MiniBarChart.
  - O perfil tem 4 MiniBarChart + ChartLegend.
  - O cálculo desatualizado vira Alert `warning` com "Recalcular".
- **Correções de design sobre o código:**
  - "Emissões por Categoria" sai: usa os mesmos dados de "Emissões por Fase", que vira um ChartCard vertical na largura toda.
  - Na visão agrícola, o ícone de aviso com tooltip vira Alert `warning` com a ação "Adicionar produto". Sai o "Clique aqui para adicionar um produto."
  - O vazio de ACV diz "este talhão".
  - "Nova avaliação" (primaryOutline) vira Button default.
  - Em "Resultado indisponível", o "← Voltar" sai (fica o voltar do cabeçalho) e o "Comparar" fica escondido.
  - O Total não mostra a linha "Métrica de certificação prioritária: …", que já aparece no KPI Total Fóssil.
- **Chaves i18n novas:** `common.errors.loadFailed` (erro da lista). "Notas", "Nenhum item encontrado." e "Nenhum arquivo selecionado" saem do texto fixo no código.
- **Estados que o código não tem:**
  - erro da lista;
  - skeleton da lista, do módulo e do resultado;
  - erro ao salvar em Alert (hoje é só toast);
  - excluindo/removendo com loading.

### 09 Tela - Carbono emissão comparação

20 frames em 2 fluxos. Fonte: o artifact "Gaia Metrics — Compare Calculations" e o código em `src/features/comparison`, com os textos de `comparison.*` e `carbonEmissions.*`.

| Fluxo | Frames |
|---|---|
| Comparar avaliações | vazio · 1 · 2 · 3 · 4 (limite, "Adicionar" desabilitado + Tooltip) · carregando · sem resultado calculado · scroll |
| Adicionar avaliação à comparação | aberto a partir de Avaliações · nada escolhido · projeto · projeto e fazenda · projeto, fazenda e talhão · 1 selecionada · vagas esgotadas · busca · busca sem resultado · coluna vazia · carregando · erro ao carregar |

- **Entrada:** o "Comparar" de Avaliações abre a página vazia, e o modal se abre sozinho no talhão atual. O "Comparar" do Resultado ACV abre a página com aquela avaliação já na comparação.
- **Página:**
  - Tela logada comum (Sidebar em Meus Projetos), sem as abas do talhão.
  - O AppHeader tem voltar, "Comparar avaliações — Carbono Emissão" e o botão "Adicionar".
  - O contador "N de 4 avaliações" fica em Badge secondary acima da faixa de 4 ComparisonSlot.
  - Seções, em ordem: 4 CompareMetricCard, StageMatrix, CompareStageChart + CompareDeltaChart, CompareAllocationChart.
  - Com 1 avaliação, o gráfico de variação sai (não há o que comparar).
- **Modal:**
  - Dialog de 1140.
  - Header: título, Badge "Módulo: Carbono Emissão", vagas e busca.
  - Corpo: breadcrumb (com "—" no nível ainda não escolhido) e 4 colunas (Projeto/Fazenda/Talhão com PickerItem; avaliações com PickerOption).
  - Rodapé: bandeja de SelectionChip, "Cancelar" e "Adicionar à comparação (N)".
- **Diferenças para o artifact:**
  - Os textos saem do i18n (o artifact estava parte em inglês).
  - A busca filtra as colunas, como no código, sem lista de resultados separada.
  - Botões com `rounded-md`.
  - O cabeçalho de coluna não usa caixa alta.
  - O cinza e o azul vêm dos tokens.
- **Estados que o código não tem:**
  - skeleton na coluna em carregamento (o código mostra "Carregando...");
  - erro de carga na coluna (ErrorState compacto);
  - skeleton na página.
- **Chave i18n nova:** `common.errors.loadFailed`.

### 10 Tela - Carbono remoção

30 frames em 8 fluxos. Textos de `carbonRemoval.*` no `pt.json`.

| Fluxo | Frames |
|---|---|
| Resultados carbono remoção | lista (menu Ações aberto) · carregando · erro · vazio |
| Renomear cálculo | dialog · erro de validação · salvando · erro ao salvar |
| Excluir cálculo | dialog · excluindo · erro |
| Preencher módulo | Parâmetros do projeto · Parâmetros (erro de validação) · BAU (entrada biomassa) · BAU (cultura perene) · BAU (culturas anuais) · Cenário do projeto · Cenário (finalizando) · Cenário (erro ao calcular) · scroll |
| Aplicar em lote | dialog |
| Replicar valor | dialog |
| Editar preenchimento | principal · carregando · não encontrado · incompleto |
| Resultado do cálculo | principal · carregando · erro · scroll |

- **Resultados:** cards de cálculo em 2 colunas (nome com link, ID, Criado em, Anos disponíveis, com o ano selecionado em primary) e menu Ações (Editar, Renomear, Duplicar, Excluir em destructive). "Preencher módulo" fica no cabeçalho e no EmptyState.
- **Módulo RothC:** usa o ModuleShell único (TopBar com "Ver resultados" em outline sm). O aside mostra "Etapas" (as 3 etapas) e "Etapa atual" (as seções da etapa aberta).
  - **Grade mensal:** uma tabela por ano, com Select Trigger em DPM/RPM e Cobertura solo, e Button Icon de replicar na entrada de biomassa.
  - **Culturas anuais:** as culturas viram blocos com borda e lixeira. Os meses sem cultura ficam em `warning-subtle`, com a legenda "Mês sem cultura".
  - **Composto / fertilizante:** Checkbox "Não se aplica" + "+ Adicionar composto" em outline, com tabela Ano/Mês/Quantidade ou o vazio tracejado.
  - **Finalizar:** o Cenário tem o estado padrão, `finalizando` (Button loading, "Voltar" desabilitado) e erro ("Erro ao calcular Roth C" em Alert destructive).
- **Excluir cálculo:** o padrão único de exclusão, com os textos do código ("Excluir este cálculo?"). "Fechar"/"Excluir" viram Cancelar (outline) e Confirmar (destructive).
- **Resultado do cálculo:** cabeçalho com voltar, h2 com o nome, Período (De/Até em Select Trigger) e "Comparar" em outline sm. Legenda BAU (`muted-foreground`) × Cenário (`chart.1`), KpiCard `comparison` com BadgeTrend e o ChartCard de linha "Ganho de carbono do solo".
- **Estados que o código não tem:** skeleton da lista, do módulo e do resultado; erro de carga (ErrorState section, `common.errors.loadFailed`); salvando/excluindo com loading; erro ao salvar em Alert.

### 11 Tela - Carbono remoção comparação

14 frames em 2 fluxos. **Desenho novo:** o código não tem comparação de remoção (`ComparisonModule` só aceita `carbon-emission` e `regenerative`). Aprovado em 2026-09-25 como UX nova, no padrão do lote 09, comparando **só o Cenário do projeto** de cada avaliação.

| Fluxo | Frames |
|---|---|
| Comparar avaliações | 1 avaliação · 2 · 4 (limite, "Adicionar" desabilitado + Tooltip) · vazio · carregando · sem resultado calculado · scroll |
| Adicionar avaliação à comparação | nada escolhido · projeto, fazenda e talhão · 1 selecionada · vagas esgotadas · busca sem resultado · carregando · erro ao carregar |

- **Entrada:** o "Comparar" do Resultado do cálculo (lote 10) abre a página com aquele cálculo. A lista de Resultados não tem "Comparar", então o frame "aberto a partir da lista" do 09 não existe aqui.
- **Página:**
  - AppHeader com voltar, "Comparar avaliações — Carbono Remoção" e "Adicionar". Badge secondary com o contador e a nota "Valores do Cenário do projeto de cada avaliação".
  - ComparisonSlot sem o Select de produto: o caminho termina no período de modelagem.
  - 7 CompareMetricCard com as métricas do Resultado do cálculo (Estoque de C, Estoque de CO₂eq., Ganho médio anual de C, Ganho médio anual CO₂eq, Taxa de adubação orgânica, Aporte de biomassa anual, Meses com solo coberto). Maior é melhor: BadgeTrend `better` com `trending-up`.
  - Culturas no mesmo card, sem BadgeTrend nem barra.
  - CompareLineChart "Ganho de carbono do solo", uma série por avaliação.
  - Avaliação sem resultado: slot `error`, valores "—" e a série fora do gráfico.
- **Modal:** o do 09, com Badge "Módulo: Carbono Remoção", coluna "Avaliações de remoção" e a linha do PickerOption "período · Ganho de C {valor}". Carregando = cards skeleton na forma do PickerOption (o Skeleton some sobre o `muted` da coluna); erro = ErrorState compact.
- **Chaves i18n novas propostas** (`comparison.*`): `titleRemoval` "Comparar avaliações — Carbono Remoção", `moduleBadgeRemoval` "Módulo: Carbono Remoção", `assessmentsColumnRemoval` "Avaliações de remoção", `emptyDescriptionRemoval` "Adicione até {max} avaliações de remoção para comparar.", `cGainLine` "Ganho de C {value}", `scenarioOnlyHint` "Valores do Cenário do projeto de cada avaliação".
- **Para o código:** `ComparisonModule` ganha `carbon-removal`, e o Resultado do cálculo ganha o botão "Comparar".

### Próximo

`12 Tela - Regenerativo` e `13 Tela - Regenerativo comparação`, com as listas de frames em `docs/plans/penpot-design-system.md`. Depois vêm os módulos da fazenda e as comparações.
