# Estados (loading, erro, vazio, sucesso)

Regra básica de UX: **tudo o que depende de rede tem os seus estados desenhados.** Uma tela ou componente que carrega dados, ou uma ação que chama a API, não está pronto no design sem eles.

| Origem | Estados obrigatórios |
|---|---|
| Carregamento de dados (lista, tabela, detalhe, card, gráfico, select com opções remotas, mapa) | carregando · com dados · vazio · erro |
| Ação do usuário que chama a API (salvar, criar, excluir, enviar, calcular) | parado · executando · erro (sucesso quando houver retorno visual) |
| Campo de formulário | normal · erro de validação |

## Loading

**Princípio:** o loading tem a **forma do conteúdo** que vai chegar. Use skeleton para conteúdo e spinner só para ação ou para área sem forma conhecida.

| Onde | Como desenhar |
|---|---|
| Botão de ação (Salvar, Entrar, Criar...) | Button `state=loading`: spinner + texto do botão. Enquanto roda, os outros controles do form e o botão secundário ficam `disabled`. O dialog não fecha. |
| Lista ou grid de cards | Cards skeleton **no mesmo grid e tamanho** dos reais, na quantidade de uma página típica (ex.: 4 CardList em 2 colunas). O header da lista, a busca e as ações continuam visíveis. |
| Tabela | Header real + 5 a 8 linhas skeleton (uma barra por célula, com largura variada). Toolbar visível e paginação desabilitada. |
| Página de detalhe | Título, badges e KPIs em skeleton. Sidebar, AppHeader e tabs continuam reais. |
| KpiCard, ChartCard ou card isolado | O card real com o título; só o valor, o plot ou a lista interna viram skeleton. |
| Select ou combobox com opções da API | Trigger desabilitado com o texto de carregamento do código (ex.: "Carregando usuários..."). |
| Mapa | MapPlaceholder `state=loading` ("Carregando mapa..."). |
| Página inteira sem forma conhecida | Spinner (`loader-circle` 24, `muted-foreground`) centralizado no Content, com "Carregando..." (`common.loading`). É o último recurso. |

- **Skeleton:** use a primitiva Skeleton (bg `accent`, `radius.md`). Linhas de texto têm 12 a 16 de altura; avatares e ícones usam `radius.full`.
- **Nunca** use um spinner solto no lugar de uma lista ou tabela que tem forma conhecida.
- **Para o código:** só mostre o loading se a espera passar de ~300 ms, para evitar o pisca.

## Erro

**Princípio:** o erro aparece **onde a falha aconteceu**, diz o que houve e oferece a saída (tentar de novo, corrigir ou voltar). Uma falha local não derruba a página inteira.

| Onde | Como desenhar |
|---|---|
| Lista, grid ou tabela que falhou ao carregar | ErrorState no lugar do conteúdo: IconChip `destructive` com `circle-alert`, mensagem (i18n da feature, ex.: "Não foi possível carregar a lista de usuários.") e Button outline **"Tentar novamente"**. Header, busca e filtros continuam visíveis. |
| Card ou gráfico isolado que falhou | ErrorState compacto dentro do card: ícone, mensagem curta e "Tentar novamente" (Button outline sm). O resto da página segue normal. |
| Página inteira (detalhe não encontrado, sem permissão) | ErrorState centralizado no Content, com a mensagem e a ação "Voltar". |
| Ação que falhou (salvar, criar, excluir) | Alert `destructive` no topo do dialog ou do form, com a mensagem do código (ex.: "Erro ao criar projeto"). Os dados digitados ficam, e o botão volta ao estado normal. Toast só para ação sem contexto visual (ex.: um toggle aplicado na hora). |
| Validação de campo | FormField `state=error` com a mensagem do schema sob o campo, e o foco no primeiro campo inválido. Se houver muitos, também o Alert "Corrija os campos inválidos" (`common.errors.fixTheInvalidFields`). |
| Select com opções que falharam | Trigger com borda `destructive` e ajuda "Não foi possível carregar..." + "Tentar novamente" (link) sob o campo. |

- **"Tentar novamente"** refaz a mesma chamada. Enquanto isso, a área volta ao estado de loading.
- **Tom do erro:** o ErrorState usa `destructive` só no ícone. A mensagem fica em `foreground`, e o fundo continua neutro. Área de erro não fica vermelha.

## Vazio

- **Vazio ≠ erro.** Vazio é uma resposta válida sem itens.
- **Lista vazia sem filtro:** EmptyState com a mensagem do código (ex.: "Nenhum projeto encontrado") e a ação de criar, se o usuário puder.
- **Vazio por busca ou filtro:** "Nenhum resultado encontrado." (`common.table.noResults`) e, se houver filtro ativo, a ação de limpar filtros.

## Sucesso

- **Ação que cria ou altera algo visível:** o resultado aparece na tela (o item na lista, o valor atualizado), junto com o toast de sucesso do código.
- **Ação sem resultado visível** (ex.: trocar a senha): toast ou Alert `success` com a mensagem do código.

## Textos

- **Use a mensagem da feature quando existir:** `users.couldNotLoadTheUserList`, `projects.toast.errorCreatingProject`, `farm.loadingMap` etc.
- **Textos genéricos que já existem:** "Carregando..." (`common.loading`) e "Nenhum resultado encontrado." (`common.table.noResults`).
- **"Tentar novamente"** existe só em `farm.retry`. A migração deve movê-lo para `common.retry`.
- **Quando o código não tem o texto de um estado obrigatório**, use o texto padrão abaixo e registre-o como **chave i18n nova** na doc do lote. Isso não é conteúdo inventado: é a aplicação desta regra.

| Chave proposta | Texto |
|---|---|
| `common.retry` | Tentar novamente |
| `common.errors.loadFailed` | Não foi possível carregar os dados. |
| `common.errors.actionFailed` | Algo deu errado. Tente novamente. |
| `common.errors.notFound` | Não encontramos o que você procurava. |

## Como entra no Penpot

**Componentes** (páginas Primitivas e Componentes): cada um que exibe dados remotos tem as variantes de estado, ou uma composição de skeleton ao lado.

| Componente | Estados |
|---|---|
| Button | já tem `loading` |
| TableState | `empty` · `loading` (linhas skeleton) · `error` |
| ErrorState | `page` · `section` · `compact` |
| CardList | variante skeleton |
| KpiCard | variante skeleton |
| MapPlaceholder | já tem `loading` |

**Telas:** cada tela com dados remotos ganha frames de estado na mesma linha: `<Tela> — carregando`, `<Tela> — erro` e `<Tela> — vazio` (quando fizer sentido). Por padrão de dialog com ação, desenhe ao menos um `— salvando` e um `— erro ao salvar`.

**Checklist do lote:** antes de fechar, confira na tabela de telas que cada fonte de dados e cada ação tem os estados acima.
