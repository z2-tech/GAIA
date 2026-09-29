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

Um lote é um módulo do produto (ex.: Regenerativo) e vira **um arquivo Penpot próprio**, com **uma página por fluxo**. Página pequena abre e edita rápido; o arquivo monolítico antigo travava o editor.

1. **Levantar** no código as rotas do lote e, por tela, os textos exatos, campos, colunas, ações, dialogs e estados.
2. **Apresentar ao usuário a lista de fluxos → frames (com a FlowTag de cada um) e esperar confirmação** antes de desenhar.
3. **Criar o arquivo** com `node .agents/skills/penpot-design/scripts/penpot-files.js new "GAIA · <Módulo>"`. Ele nasce no projeto GAIA, ligado ao Design System, com os tokens copiados e a página `00 Legenda`. Se o lote é continuação de um módulo que já existe (ex.: uma comparação), use o arquivo dele e prefixe as páginas (`Comparação · 01 …`).
4. **Pedir ao usuário para abrir o arquivo e conectar o plugin** Penpot MCP nele. O plugin só enxerga o arquivo aberto.
5. **Criar uma página por fluxo**, na ordem de navegação: `01 <fluxo>`, `02 <fluxo>`… O Penpot cria páginas no fim da lista, então crie na ordem.
6. **Faltou peça?** Ela nasce no **Design System**, nunca no arquivo da tela: abra o Design System, crie na página `Primitivas ·` ou `Componentes ·` da seção, publique a biblioteca e aceite a atualização no arquivo do módulo. Só então use na tela.
7. **Montar** os frames, exportar cada um e conferir visualmente. Cada tela ou dialog ganha os frames de estado: `— carregando`, `— erro` e `— vazio`, além de `— salvando` e `— erro ao salvar` nos dialogs com ação (veja [states.md](./states.md)).
8. **Organizar** conforme o [padrão de página de telas](#padrão-de-página-de-telas): a Legenda na `00 Legenda` e, em cada página de fluxo, um board `Fluxo NN — <nome>` com FlowTag em cada frame.
9. **Rodar** `storage.repairIcons(root)` e depois `storage.audit(root)` em cada página, que tem de dar 0.
10. **Registrar** o lote abaixo e na tabela de arquivos do [README](./README.md#arquivo-penpot).

## Padrão de página de telas

Vale para todo arquivo `GAIA · <Módulo>`. Referência pronta: `GAIA · Auth`.

### Estrutura

```
GAIA · <Módulo>                  ← arquivo, ligado ao Design System
  00 Legenda                     ← página: board Legenda (nome do lote, descrição e as 6 FlowTag com significado)
  01 <fluxo>                     ← página: um único board na raiz
    Fluxo 01 — <tela ou dialog>
      Header                     ← "Fluxo 01" · título · descrição
      Telas                      ← linha: principal primeiro, estados à direita
        Tela                     ← FlowTag + nome do frame, e embaixo o frame 1440×900
  02 <fluxo>
  …
```

| Elemento | Especificação |
|---|---|
| Arquivo | Um por módulo, `GAIA · <Módulo>`, no projeto GAIA. Ligado ao Design System, sem componentes nem tipografias locais. Tokens copiados do Design System (veja [README](./README.md#arquivo-penpot)). |
| Página | `00 Legenda` e uma por fluxo, `NN <nome do fluxo>`. Na raiz, só o board `Legenda` ou o board `Fluxo NN — <nome>`, em x 0, y 0; nenhum frame solto. |
| Segundo lote no mesmo arquivo | Prefixo nas páginas: `Comparação · 00 Legenda`, `Comparação · 01 …`. |
| Legenda | Título do lote em `doc-display`, descrição em `doc-body` muted e a linha das 6 FlowTag, cada uma com o significado. |
| Fluxo | Board `Fluxo NN — <nome>`: bg `background`, borda `border` 2, `radius.xl`, padding 80, gap 64. Numeração em dois dígitos, na ordem de navegação do produto, igual à da página. |
| Header do fluxo | "Fluxo NN" em `doc-title` primary, título em `doc-display`, descrição de uma linha em `doc-body` muted (o que o usuário faz ali). |
| Linha de telas | Row com gap 120. O estado padrão primeiro e os estados à direita, na ordem: carregando → erro → vazio → sucesso. Em dialogs com ação: dialog → salvando → erro ao salvar. |
| Rótulo da tela | FlowTag + nome exato do frame em `doc-title`, gap 16, 24 acima do frame. |

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
// página 00 Legenda
storage.pageLegend('Auth', 'Login, recuperação e redefinição de senha. Uma página por fluxo; ...');

// página 01 Login, com os frames já criados na raiz e com os nomes finais
storage.flowSection(1, 'Login', 'Entrada na plataforma com email e senha.', [
  ['Login', 'principal'], ['Login — entrando', 'carregando'], ['Login — erro', 'erro'], ['Login — senha redefinida', 'sucesso'],
]);
storage.fitTexts(penpot.root);
await storage.restack(); // sempre por último: leva o board para 0,0 depois que o layout e o fitTexts assentam
```

- **Monte os frames soltos primeiro** (x/y livres), confira cada um com `export_shape` e só então agrupe no fluxo. Depois de agrupado, o frame continua exportável pelo id.
- **Editou um texto dentro do fluxo?** Rode `restack()` de novo.
- **Fluxo pesado** (mais de ~15 frames com mapa): monte os frames em mais de um `execute_code` para não passar do timeout de 120 s.

## Esqueleto das telas logadas

Montado com `storage.screen(nome, {title, back, active})`:

| Parte | Especificação |
|---|---|
| Frame | flex row, bg `sidebar`, sem padding, clip |
| Sidebar | instância `{state:'expanded', active}` com `active` = `projects`, `users` ou `settings`, e usuário no rodapé via override |
| Inset | column, bg `muted`, clip. Encosta no topo, na direita e na base; `radius.xl` só nos cantos da esquerda (junto da Sidebar) |
| AppHeader | `back=yes` quando o código tem voltar. Título h1 = o título do Header no código. `Actions` e `BadgeScore` escondidos se a tela não tem. |
| Content | column, padding 24, gap 24 |

**Dialogs:** o frame da tela de fundo recebe o scrim (rect `foreground` a 50%) e o painel. Os dois são absolutos, com `layoutChild.zIndex` 10 e 11. O painel é montado com `storage.panel(title, w, desc)`, e o rodapé usa `outline` + `default` com os textos do código.

## Auth (sem sidebar)

- **Fundo:** `background-photo` (foto em modo cobrir) + overlay `sidebar` a 80%.
- **Esquerda:** `logo/full` (320×64), headline em display `sidebar-foreground` e apoio em body-lg `sidebar-muted-foreground`.
- **Direita:** card de 440 (rounded-xl, p 40, `shadow.lg`) com `logo/mark` 48, h1 e subtítulo centralizados, campos e ações.
- **Idioma:** TabsList PT/EN no canto superior direito.

## Lotes feitos

Os lotes 04 a 11 foram montados no arquivo monolítico antigo e migrados em 2026-09-25 para os arquivos por módulo (tabela no [README](./README.md#arquivo-penpot)). Os nomes `NN Tela - <lote>` abaixo são os lotes; no Penpot, cada fluxo é uma página do arquivo do módulo.

### 04 Tela - Auth

**Implementado no gaia-web em 2026-09-26** (branch `feat/screens-auth`).

5 frames: Login, Login — erro, Login — senha redefinida, Recuperar senha e Redefinir senha.
- **Erro de login:** "Erro ao fazer login, tente novamente" vira Alert destructive acima do botão.
- **Mensagens do i18n:** `passwordResetSuccess` e `codeSent` aparecem em Alert.
- **Código:** vira Input OTP.
- **Campos e botão:** os inputs com linha embaixo viram FormField, e o Button `xl` vira `lg` de largura total.

### 05 Tela - Core

**Implementado no gaia-web em 2026-09-26** (branch `feat/screens-core`).

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

Implementado em 2026-09-27 (`feat/screens-carbon-emission`).

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

Implementado em 2026-09-27 (`feat/screens-carbon-emission`).

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

Implementado em 2026-09-27 (working tree da `feat/screens-carbon-emission`).

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

Implementado em 2026-09-29 (working tree da `develop`, `src/features/comparison/carbon-removal`).

14 frames em 2 fluxos. **Desenho novo:** o código não tem comparação de remoção (`ComparisonModule` só aceita `carbon-emission` e `regenerative`). Aprovado em 2026-09-25 como UX nova, no padrão do lote 09, comparando **só o Cenário do projeto** de cada avaliação.

| Fluxo | Frames |
|---|---|
| Comparar avaliações | 1 avaliação · 2 · 4 (limite, "Adicionar" desabilitado + Tooltip) · vazio · carregando · sem resultado calculado · scroll |
| Adicionar avaliação à comparação | nada escolhido · projeto, fazenda e talhão · 1 selecionada · vagas esgotadas · busca sem resultado · carregando · erro ao carregar |

- **Entrada:** o "Comparar" do Resultado do cálculo (lote 10) abre a página com aquele cálculo. O "Comparar" (outline) da lista de Resultados abre a página vazia com o modal no talhão atual (adicionado em 2026-09-29; falta o frame "aberto a partir da lista" no Penpot).
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

### 12 Tela - Regenerativo

Implementado em 2026-09-27 (working tree da `feat/screens-carbon-emission`).

13 frames em 2 fluxos, no arquivo `GAIA · Regenerativo`. Textos de `regenerative.*`. As perguntas e opções vêm do seed da API (`gaia-api/regenerative/fixtures/seed_indicators.sql`), não do `pt.json`.

| Fluxo | Frames |
|---|---|
| Regenerativo (aba do talhão) | principal · carregando · erro · vazio · scroll |
| Módulo regenerativo | sem manejo · preenchido (Agricultura + Pecuária) · scroll · erro de validação · salvando · erro ao salvar · carregando · erro ao carregar |

- **Nomes de seção (decisão de 2026-09-25):** vale o nome da API em todas as telas: Comunidade, Produção Agrícola Regenerativa, Manejo da Paisagem, Impacto Ambiental e Manejo Pecuário Regenerativo. O i18n (`regenerative.sections.*`: "Gestão da paisagem", "Gestão regenerativa de gado"…) passa a seguir a API.
- **Bandeira (decisão de 2026-09-25):** ponto + rótulo (TopicFlag: Bom/Atenção/Crítico/Não aplicável) na aba e na comparação. Na aba, o código mostra só o ponto.
- **Aba:**
  - O cabeçalho da página tem h2 "Módulo regenerativo", "Comparar" (outline sm) e "Editar módulo" ou "Preencher módulo" (default sm; no código é `primaryOutline`).
  - O card "Score Regenerativo" traz "Pontuação Regenerativa" com o RadialProgress lg (tom pela faixa 65/40) e o TopicFlag da faixa. Ao lado ficam as 5 seções em ProgressRow, na ordem da API.
  - O card "Tópicos" (340) tem a tabela "Tópico avaliado | Bandeira", agrupada por seção, com o TopicFlag.
  - **Estados que o código não tem:** o erro (ErrorState section, `common.errors.loadFailed`) e o skeleton na forma dos dois cards (no código é o texto "Carregando dashboard..."). O vazio usa EmptyState com `list-checks` no lugar da Lottie.
- **Módulo:**
  - Usa o ModuleShell único: TopBar "Módulo regenerativo" + "Ver resultados" (outline sm). O rodapé tem "Voltar" (outline, que era link no código) e "Salvar".
  - O aside lista as seções como navegação (ModuleStep `active` na seção visível, `upcoming` nas outras), na ordem do formulário: Características do sistema produtivo · Produção Agrícola · Manejo Pecuário · Manejo da Paisagem · Impacto Ambiental · Comunidade · Notas. Sem manejo escolhido, só Características e Notas aparecem.
  - Características: 4 FormField select em 2 colunas. Cada indicador é um FormField select de largura total, com a pergunta no label (no código, o label é `sr-only`). Opção longa é cortada com "…" no trigger.
  - O erro de validação fica no Manejo ("Preencha os campos de características do sistema produtivo."). O erro ao salvar aparece em Alert destructive ("Erro ao salvar o formulário regenerativo."), no lugar do toast. O erro ao carregar usa ErrorState page com o texto do código e "Voltar".
- **Chaves i18n novas propostas:** `common.errors.loadFailed` (erro da aba).

### 13 Tela - Regenerativo comparação

Implementado em 2026-09-27 (working tree da `feat/screens-carbon-emission`).

15 frames em 2 fluxos, nas páginas `Comparação · …` do `GAIA · Regenerativo`. Os frames partiram dos do lote 11 (copiados entre arquivos) e trocaram o corpo pelas peças regenerativas da 25. Textos de `comparison.*`.

| Fluxo | Frames |
|---|---|
| Comparar avaliações | 1 · 2 · 4 (limite + Tooltip) · só com diferença · vazio · carregando · sem resultado calculado · scroll |
| Adicionar avaliação à comparação | nada escolhido · projeto, fazenda e talhão · 1 selecionada · vagas esgotadas · busca sem resultado · carregando · erro ao carregar |

- **Página:** AppHeader "Comparar avaliações — Regenerativo" + "Adicionar", contador "N de 4 avaliações" e a faixa de ComparisonSlot. O slot mostra "<talhão> · <data>" e o caminho "Projeto › Fazenda › Talhão", sem período nem Select de produto. As seções, em ordem: ScoreOverview, TopicDistribution + SectionScores e TopicTable.
- **Só com diferença:** o toggle ativo esconde os tópicos iguais à referência.
- **Sem resultado calculado:** o slot fica em `error`, e a coluna da avaliação mostra "—" (BadgeTrend `empty`, marcador escondido).
- **Modal:** o do lote 11, com Badge "Módulo: Regenerativo" e a coluna "Avaliações regenerativas". O PickerOption mostra "<data>" (+ " · Principal") e a linha "Pontuação N%". Atrás do scrim fica a página regenerativa.
- **Diferenças para o código:** a faixa Bom/Atenção/Crítico usa os tokens `success`/`warning`/`destructive` a 30% (no código são `*-200`). "Referência" e "Ref." usam BadgeTrend `reference`. O cabeçalho da tabela não usa caixa alta.
- **Bug de texto:** o vazio dizia "avaliações de emissão". Chave nova proposta: `comparison.emptyDescriptionRegenerative` = "Adicione até {max} avaliações regenerativas para comparar.".

### Mobile · Auth (`GAIA Mobile · Auth`, 2026-09-29)

14 frames de 375×812 em 3 páginas, com `storage.authScreen`: topo primary com StatusBar, `logo/full` (28 de altura) e idioma PT/EN em MSegment; folha branca radius.4xl com h1, subtítulo body-lg, Form (gap 20) e HomeIndicator.
- **Login** (6): principal, entrando, erro de validação ("E-mail inválido", "Senha é obrigatória"), erro, senha redefinida, sem conexão.
- **Recuperar senha** (4): principal, enviando, erro de validação ("E-mail é obrigatório"), erro.
- **Redefinir senha** (4): principal, redefinindo, erro de validação ("O código deve ter 6 dígitos", "As senhas não coincidem"), erro. Os dois frames de erro passam de 812 (856 e 886): a folha rola.
- **Divergências do web:** sem a headline e a foto de fundo (o web já esconde em tela pequena); links viram MButton `link`; Alert vira MAlert; Input OTP vira MOtp.
- **Chave i18n nova:** `login.noConnection` = "Sem conexão. Conecte-se à internet para entrar." (frame Login — sem conexão; Entrar fica disabled).
- **Peças novas no DS - Mobile:** MButton `variant=link`, MOtp (3), MAlert (4), MField password `error/placeholder`, password `error/filled`, password `default/placeholder` e input `error/placeholder`.

### Mobile · Core (`GAIA Mobile · Core`, 2026-09-29)

25 frames em 4 páginas, com `storage.mscreen` (frame primary + AppBar + folha muted radius.4xl) e os helpers de `scripts/mobile.js`.
- **01 Início** (7): principal, carregando (título "GaiaMetrics", como o código), erro, vazio, busca sem resultado, offline (ConnectionBanner + SyncStatus offline + item pendente), projeto criado (MAlert "Projeto criado com sucesso").
- **02 Novo projeto** (10): wizard de 3 etapas com MobileStepper (Dados do projeto, Usuário Administrador, Módulos); lista de usuários em BottomSheet, carregando, sem conexão (MField offline), erros de validação, salvando e erro ao salvar. Botões "Próximo"/"Voltar"/"Salvar" (`farm.next`, `common.dialog.*`).
- **03 Sincronização** (6): fila com resumo (SyncStatus, última sincronização, "Enviar agora"), enviando, falha, conflito (BottomSheet conflict), tudo sincronizado (MEmptyState success), offline.
- **04 Menu da conta** (2): BottomSheet account e confirmação de saída com pendências.
- **Decisões:** preenchimento e criação funcionam offline e entram na fila; lista remota usa o cache ou mostra "Disponível quando houver conexão"; conflito = escolha do usuário ("Manter a do aparelho" / "Usar a do servidor").
- **Chaves i18n novas (sincronização):** "Sincronização", "Enviar agora", "Última sincronização: hoje às {hora}", "Aguardando envio ({n})", "{n} alterações para enviar", "Sincronizando…", "Offline · salvo no aparelho", "Falha ao sincronizar", "Sincronizado às {hora}", "Você está offline. As alterações ficam salvas no aparelho.", "Conexão restabelecida. Enviando {n} alterações…", "Não foi possível enviar {n} alterações.", "Tudo sincronizado", "Nenhuma alteração esperando envio.", "Conflito", "Resolver", "Resolver conflito", "Versão do aparelho", "Versão do servidor", "Manter a do aparelho", "Usar a do servidor", "Esta seção foi alterada no servidor depois da sua edição.", "Disponível quando houver conexão", "Sair mesmo assim", "Você tem {n} alterações não enviadas. Se sair agora, elas serão perdidas.".

### Mobile · Projeto, Fazenda & Talhão (`GAIA Mobile · Projeto, Fazenda & Talhão`, 2026-09-29)

40 frames em 8 páginas. Conteúdo do gaia-web `develop` (o wizard não tem mais Dados Técnicos nem Dados do Responsável, removidos em 27/09).
- **01 Projeto** (5): Fazendas, "Buscar por fazenda...", ListCard farm ("Responsável", "Qtd. Pendências"), FAB "Nova fazenda"; carregando, erro, vazio ("Nenhuma fazenda encontrada" + "Nova fazenda"), offline.
- **02 Nova fazenda** (12): wizard Dados Gerais (9 campos; Área Total vira label + sufixo `ha`, como no web) → Enviar arquivo (MDropzone, MFileItem, mapa, MPlotItem, "Talhões criados (3)", Nome do talhão em BottomSheet form, talhão com erro + "Corrija os talhões antes de salvar.", sem geometria com Latitude/Longitude, Substituir arquivo) → Imagem do perfil ("Criar fazenda", criando, erro).
- **03 Fazenda** (6): mapa, "Detalhes da Fazenda" (5 campos do código), Talhões + "Novo talhão"; carregando, erro, sem talhões, sem mapa, offline.
- **Sem abas na fazenda:** Biodiversidade saiu do escopo mobile (usuário, 2026-09-29), então a fazenda segue o código, sem menu de módulos.
- **04 Editar fazenda** (3), **05 Novo talhão** (4, com legenda tracejada), **06 Talhão** (4, abas Dados gerais | Carbono emissão | Carbono remoção | Regenerativo), **07 Editar talhão** (3), **08 Excluir talhão** (3, BottomSheet confirm/confirm-error).
- **Dialog → tela cheia** no mobile (Editar fazenda, Novo/Editar talhão), com ActionBar "Salvar"/"Salvar talhão" + "Cancelar".
- **Bugs do código registrados pelo levantamento:** chaves kebab-case inexistentes nos erros de geometria do PlotItem (os textos certos estão no design); textos "Nenhum talhão desenhado", "Selecionar arquivo", "Refazer", "Salvar e continuar" existem no i18n mas não aparecem.
- **Título da AppBar:** quebra linha (corrigido no main do DS em 2026-09-29).

### Mobile · Carbono emissão (`GAIA Mobile · Carbono emissão`, 2026-09-29)

25 frames em 3 páginas.
- **01 Avaliações** (7): aba "Carbono emissão" do talhão, "Avaliações Carbono Emissão", MAssessmentCard (Continuar / Editar), FAB "Nova avaliação"; carregando, erro, vazio ("Nenhuma avaliação ACV" + "Crie sua primeira avaliação ACV para este talhão."), Ações (BottomSheet menu: Editar, Duplicar, Excluir avaliação), módulo completo ("Transporte salvo. Módulo ACV completo!"), offline.
- **02 Excluir avaliação** (3): confirm, excluindo, erro ("Erro ao excluir avaliação").
- **03 Módulo ACV** (15): "Análise do Ciclo de Vida (ACV)", MobileStepper de 5 etapas, seções em cards com os campos exatos do código; itens repetíveis em blocos com lixeira ("Fertilizante 1"); unidade selecionável com MField `unitselect`; evidência em MFileItem/MDropzone ("Nenhum arquivo selecionado"). Frames: Cultura e Produto (+ erro de validação, lista de culturas, salvando, erro ao salvar, carregando), Solo (+ cultura salva, limite de 20 anos), Insumos (+ sem conexão), Combustíveis, Transporte (+ finalizando), Etapas (BottomSheet steps).
- **Sem resultado no app:** "Ver resultado" vira "Editar" (texto do menu); "Comparar" sai; ao concluir o Transporte, volta para a lista com a mensagem do código. "Salvar e ver resultado" não existe no mobile: com todas as etapas salvas, o botão é "Salvar alterações".
- **Rodapé do wizard:** "Salvar e continuar" + "Salvar e finalizar" (etapa 5: "Salvar e finalizar" + "Voltar"); voltar etapa pelo painel Etapas.
- **Peças novas no DS - Mobile:** MAssessmentCard (4), MStepItem (4), MField `unitselect` (2), BottomSheet `menu` e `steps`.

### Mobile · Carbono remoção (`GAIA Mobile · Carbono remoção`, 2026-09-29)

28 frames em 4 páginas.
- **01 Cálculos** (7): aba "Carbono remoção", "Resultados carbono remoção", MCalcCard (ID, "Criado em", "Editar"), FAB "Preencher módulo"; carregando, erro, vazio ("Este módulo ainda não foi preenchido!" + descrição + "Preencher módulo"), Ações (menu: Editar, Renomear, Duplicar, Excluir), calculado ("Roth C calculado com sucesso"), offline.
- **02 Renomear cálculo** (4): BottomSheet form ("Renomear cálculo", descrição, "Nome do cálculo", Salvar/Voltar); erro de validação ("Nome é obrigatório"), salvando, erro ("Erro ao atualizar o cálculo").
- **03 Excluir cálculo** (3): "Excluir este cálculo?", excluindo, erro ("Erro ao excluir o cálculo").
- **04 Módulo Roth-C** (14): "Carbono remoção \| Roth-C", 3 etapas. Parâmetros do projeto (+ erro de validação, carregando, "Cálculo incompleto"), BAU com produtividade + cultura anual (ciclos em blocos, grade mensal com "Mês sem cultura", composto), BAU com cultura perene (produtividade por ano), BAU com entrada de biomassa (linha kg/ha + Replicar), aplicar a vários meses e Replicar valor (BottomSheet months), BAU com erros, Cenário do projeto ("Não se aplica" marcado), finalizando, erro ao calcular ("Erro ao calcular Roth C"), Etapas.
- **Grade mensal no mobile:** um bloco por ano, MMonthHeader + MMonthRow por mês (mês em cima, DPM/RPM e Cobertura embaixo). O sub-stepper "Etapa atual" do web não existe no mobile (o web também o esconde abaixo de lg).
- **Sem resultado no app:** saem "Anos disponíveis" e "Visualizar"; depois de "Finalizar" o app volta para a lista com "Roth C calculado com sucesso".
- **Bug do código registrado:** o Ano final da modelagem reutiliza a mensagem "Ano inicial deve estar entre 1900 e 2100.".
- **Peças novas no DS - Mobile:** MCheck (4), MMonthRow (5), MMonthHeader, MCalcCard (3), BottomSheet `months`; menu ganhou "Renomear" (escondido) e form ganhou descrição e MAlert (escondidos).
- **Performance:** frames longos montados peça a peça passam de 2 min no plugin; os estados foram feitos com `clone()` do frame base (1 s cada). `mobile.js` agora guarda cache das buscas de componente.

### Mobile · Regenerativo (`GAIA Mobile · Regenerativo`, 2026-09-29)

21 frames em 2 páginas.
- **01 Regenerativo** (5): aba "Regenerativo" do talhão, "Módulo regenerativo"; vazio ("Este módulo ainda não foi preenchido!" + descrição + "Preencher módulo"), preenchido, carregando, erro, pendente de envio.
- **02 Módulo regenerativo** (16): **wizard por seção no mobile** (no web é um formulário único com navegação por rolagem e um "Salvar"): Características do sistema produtivo (+ sem manejo, 2 etapas; + erro "Preencha os campos de características do sistema produtivo."), Produção Agrícola Regenerativa (11 perguntas; + lista de opções da Cobertura do Solo), Manejo Pecuário Regenerativo, Manejo da Paisagem, Impacto Ambiental, Comunidade, Notas; salvando, erro ao salvar ("Erro ao salvar o formulário regenerativo."), salvo ("Formulário regenerativo salvo com sucesso."), Etapas (7), carregando, erro de carga.
- **Perguntas e opções:** da API (seed `gaia-api/regenerative/migrations/0002_seed_indicators.py`); todas são select com "Selecione...".
- **Rodapé:** "Próximo" (`farm.next`) + "Voltar"; na última etapa "Salvar" + "Voltar".
- **Sem resultado no app:** o Score Regenerativo e os Tópicos saem; "Comparar" sai. O preenchido mostra MEmptyState success com "Editar módulo" (texto do código).
- **Chaves i18n novas (do Figma mobile):** "Este módulo já foi preenchido!" e "A visualização dos resultados está disponível apenas na versão web.".
- **Abas do talhão:** a linha de MTab alinha à direita (Carbono remoção e Regenerativo) para a aba ativa aparecer.
- **DS - Mobile:** SheetOption e o MField select crescem em altura com opções longas; o BottomSheet steps tem 7 itens (6 e 7 escondidos); o círculo do MEmptyState ganhou borda e ícone no tom (primary, destructive, success).

### Resumo mobile (2026-09-29)

6 arquivos, 153 frames: Auth (14), Core (25), Projeto, Fazenda & Talhão (40), Carbono emissão (25), Carbono remoção (28), Regenerativo (21). Todos aceitaram a última versão do DS - Mobile e passaram na auditoria (0). Biodiversidade ficou fora (decisão do usuário).

### Próximo

Nenhum lote pendente. Biodiversidade, Análise de contexto, Saúde do solo e Água ainda não existem no produto e entram quando tiverem especificação.
