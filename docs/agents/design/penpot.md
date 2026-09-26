# Mecânica do Penpot

## Ordem de tentativa

Toda tarefa no Penpot segue esta ordem, sem pular etapa:

1. **API REST** (`scripts/penpot-files.js`): tente primeiro. Não depende de aba aberta e alcança todos os arquivos de uma vez (ler, listar, copiar tokens, editar shapes com `update-file`).
2. **Claude in Chrome** (`mcp__claude-in-chrome__*`): se a REST não resolver, abra no Chrome o arquivo certo, ative o plugin "Penpot MCP" e passe para a Plugin API. Não peça ao usuário para abrir abas ou o plugin enquanto essa ferramenta estiver disponível.
3. **Plugin API** (MCP `penpot`, `execute_code`): desenho dentro do arquivo aberto no plugin. Os helpers ficam em `.agents/skills/penpot-design/scripts/helpers.js`. Uma chamada carrega todos em `storage`, e eles persistem entre chamadas até o plugin recarregar.

Se as duas primeiras falharem, diga ao usuário o que foi tentado e o erro, e só então peça ajuda.

## Pré-requisitos

- **MCP:** o `penpot` fica no scope local do Claude Code (`claude mcp add --transport http --scope local penpot <url com userToken>`).
- **Plugin:** o "Penpot MCP" tem de estar aberto e conectado no arquivo em que você vai trabalhar: o Design System para peças e tokens, o `GAIA · <Módulo>` para telas. Confira com `penpot.currentFile.name`.
- **API REST:** `PENPOT_TOKEN` (Personal access token do Penpot) no `.env` do repositório, e `npm i` em `.agents/skills/penpot-design/scripts/` (instala o `transit-js`).
- **A aba do Penpot fica visível e parada.** Em segundo plano, o plugin é suspenso ("no heartbeat"), o texto renderiza em 1×1 e o flex não recalcula. Trocar de página durante um script faz a chamada falhar.
- **Um agente de cada vez.** Existe uma conexão só e um `storage` só.
- **Uma aba conectada de cada vez.** Com o plugin aberto em duas abas (ou em dois navegadores), as chamadas alternam entre os arquivos. Confira `penpot.currentFile.name` duas vezes seguidas antes de editar e feche a outra aba. O `storage` é por conexão: trocar de arquivo exige recarregar os helpers.

## Helpers

| Helper | O que faz |
|---|---|
| `tok(nome)` · `typo(nome)` | Busca um token (nos tokens do arquivo) ou uma tipografia (no Design System) |
| `bind(shape, token, props)` | Aplica o token só se for diferente do atual (`applyToken` é toggle) |
| `fill` · `stroke(shape, tok, w, align)` · `radius` · `shadow` | Atalhos de `bind` |
| `txt(texto, tipografia, tokCor)` | Texto com tipografia da biblioteca e cor por token |
| `icon(nome, size, tok)` | Instância de ícone Lucide com stroke escalado e cor por token |
| `box(nome, dir, gap, px, py)` · `stack` · `add` | Board com flex auto |
| `inst(nome, props)` | Instância de uma variante do Design System |
| `V(nome)` | Conjunto de variantes do Design System (os nomes são únicos) |
| `comp(nome)` | Componente simples (sem variantes) do Design System |
| `texts(inst, [..])` | Sobrescreve os textos na ordem. `null` pula e `false` esconde. |
| `setText(inst, texto)` | Troca o primeiro texto |
| `swapIn(inst, nomeIcone, tok)` | Troca o ícone aninhado numa instância (swap + `fitIcon` + stroke + token) |
| `variantSet(nome, [{board, props}])` | Cria um conjunto de variantes |
| `fitRows(v, porLinha)` · `fitAuto(v, largura)` | Ajusta o tamanho do container de variantes |
| `section(título, descrição)` · `desc(sec)` | Seção documentada nas páginas Primitivas e Componentes |
| `screen(nome, {title, back, active})` | Esqueleto de tela logada. Devolve `{f, content, inset}`. |
| `insetRadius(inset)` · `flushInsets(root)` | Raio só nos cantos da esquerda do painel · zera padding e margens da moldura e reaplica o raio em todo `Inset` sob `root` |
| `plotScreen(nome, {active, title})` | Casca do talhão: `screen` + BadgeScore + abas `line`. `title:false` para carregando e erro. Amostra em `storage.plot`. |
| `panel(título, w, desc)` · `fsec` · `row2` · `field` · `footer` · `withDialog` | Dialogs de formulário sobre uma tela |
| `ring(size, stroke, pct, tok)` | Arco de progresso (path com `A`) |
| `pageLegend(título, desc)` · `flowSection(n, título, desc, [[frame, kind]])` · `restack()` | Legenda do lote e board do fluxo com FlowTag; `restack` leva o board para 0,0 (veja screens.md) |
| `fitMap(m)` | Reposiciona os filhos absolutos de um MapPlaceholder redimensionado (zoom à direita, polígonos no centro) |
| `fitTexts(root)` | Refaz a medição dos textos (override em instância guarda a largura do main no editor) |
| `repairIcons(root)` | Religa strokes e fills de ícone que ficaram soltos, pelo hex resolvido |
| `audit(root)` | Lista fills e strokes sem token (ignora `logo/*` e `state-layer`) |

## Armadilhas

**Tokens**
- **`applyToken` é toggle.** Reaplicar o token que o shape já tem *remove* o binding. Use `bind`.
- **Reatribuir `strokes` e reaplicar o mesmo token na mesma chamada solta o binding** (a remoção é assíncrona). Depois de criar ícones, rode `repairIcons`.
- **Mudar o valor de um token não atualiza a cor já resolvida** nos shapes. Para propagar: atribua `fills`/`strokes`, espere e rode `bind`.
- **Opacidade de fill não sobrevive ao token.** Hover estilo `/90` usa um rect `state-layer` com `opacity`.
- **`applyToken` em `strokeColor` só pinta o primeiro stroke.** Use um stroke só.
- **Sombra não aceita `spread` negativo.**
- **O círculo cheio de ícones Lucide** (ex.: o ponto do `key-round`) tem fill: ligue-o ao mesmo token do stroke.

**Componentes e instâncias**
- **Instância não aceita filho novo** ("Cannot change the structure of a component copy"). Para variar o conteúdo, use variante, `texts`, `hidden` ou `swapIn`. Se não der, monte com board de layout + instâncias menores.
- **`swapComponent` herda a geometria dos filhos do ícone anterior** e deforma o desenho. `swapIn` já corrige isso com `fitIcon`.
- **Stroke de ícone não escala no `resize`.** `icon` e `swapIn` ajustam para 2 × size/24.
- **Clonar um main dentro do container de variantes cria uma variante nova** ("Value 2"). É o jeito de duplicar uma variante.
- **Texto trocado numa instância guarda a caixa do main no editor.** O botão com largura automática não cresce, e o texto vaza. O export do servidor re-mede e esconde o bug. Rode `fitTexts(root)` depois de montar.
- **Tracejado `inner` desenha cantos irregulares.** Use `strokeAlignment: 'center'`.
- **Texto sobrescrito numa instância às vezes some na exportação.** Recriar a instância e reaplicar os textos resolve.
- **A lista de componentes da biblioteca traz uma variante por conjunto.** Use `inst`, que percorre `variants.variantComponents()`.
- **Peça alterada no Design System só chega às telas depois de publicada.** No arquivo do módulo, aceite a atualização da biblioteca (aviso no canto inferior ou Assets → Libraries → Update).
- **Assets de logo** (`createShapeFromSvg`) mantêm a cor original em hex. Não passe `repairIcons` nem `bind` neles.
- **`switchVariant` não funciona em instância aninhada** (ex.: o Tab dentro de um TabsList, o Select Trigger dentro de um FormField). Use `swapComponent(<variante>)` e reaplique o texto.
- **`path.content` numa instância é gravado com deslocamento.** Depois de trocar o arco de um RadialProgress, reposicione `x`/`y` do path pela caixa esperada. Busque o anel pelo pai certo: o AppHeader também tem um RadialProgress (no BadgeScore).

**Layout**
- **`resize()` fixa o sizing do flex.** Volte para `auto` depois, se o conteúdo deve mandar.
- **Filhos absolutos de uma instância não seguem as constraints no `resize`.** Mapa redimensionado precisa de `fitMap`.
- **`resize` numa linha flex com `fill` trava a largura.** Depois do `resize`, volte `layoutChild.horizontalSizing` para `fill`. Linha `auto` com filho `fill` na vertical colapsa para 0: fixe a altura da linha.
- **Board de flex vazio nasce com 100 px de altura.** Spacer precisa de `resize(1,1)` e sizing `fix`.
- **Frame com flex ignora a ordem do array na sobreposição.** Scrim e dialog absolutos precisam de `layoutChild.zIndex`.
- **Container de variantes com wrap e `alignItems: center` mede errado.** `fitAuto` usa `start` e `alignContent: start`.
- **Instância de logo redimensionada não escala o SVG.** Redimensione também o `children[0]`.

**Páginas**
- **Só dá para editar a página aberta.** Abra com `penpot.openPage(...)` no começo da chamada e confira `penpot.currentPage.name`.
- **O plugin não move shapes entre páginas** ("Cannot modify a page that is not currently active"). Recriar um componente principal gera id novo e quebra as instâncias. Para mover, recorte e cole pelo editor, que mantém o id: selecione com `penpot.selection`, rode `scripts/key.sh x`, abra a página de destino e rode `scripts/key.sh v`. O `key.sh` usa `osascript`, recebe o app do navegador no segundo argumento (`scripts/key.sh x "Google Chrome"`; padrão `zen`) e exige Acessibilidade liberada para o app do terminal.
- **Copiar frames entre arquivos:** selecione com `penpot.selection`, rode `scripts/key.sh c`, abra o outro arquivo, clique no canvas e rode `scripts/key.sh v`. As instâncias continuam ligadas ao Design System, mas o arquivo de origem vira biblioteca do destino. Desligue com `unlink-file-from-library`.
- **`execute_code` corta em 120 s.** Uma tabela grande (ex.: a TopicTable, com 28 linhas × 4 colunas) ou uma varredura de várias páginas pode passar disso. O que já foi feito fica no arquivo: confira o estado antes de repetir e rode uma página por chamada.
- **O export pode mostrar a versão anterior** logo depois de uma edição. Espere uns segundos e exporte de novo antes de concluir que algo falhou.
- **Seção nova do design system vira página nova** (`NN Primitivas · <seção>` ou `NN Componentes · <seção>`), criada no fim da lista.
- **O plugin não reordena páginas.** Uma página nova vai para o fim da lista.
- **O Penpot normaliza `/` em nomes** (`section/Form` vira `section / Form`). Compare removendo espaços.

## Export e imagens

- **`export_shape`:** passe o id literal, porque ele não resolve expressões. Em boards grandes dá timeout; exporte por seção ou frame.
- **Imagem grande:** não envie pelo plugin. O usuário arrasta a imagem para o arquivo, e você reaproveita o `fillImage` do shape (`{...fill.fillImage, keepAspectRatio:true}`).
- **Fontes custom:** só aparecem em `penpot.fonts` depois de recarregar a aba e reconectar o plugin.

## Arquivos e API REST

`https://design.penpot.app/api/main/methods/<cmd>` com `Authorization: Token $PENPOT_TOKEN` e um User-Agent qualquer. A documentação fica em `https://design.penpot.app/api/main/doc`.

| Comando | O que faz |
|---|---|
| `node scripts/penpot-files.js new "GAIA · <Módulo>"` | Cria o arquivo do módulo no projeto GAIA, ligado ao Design System, com os tokens copiados e a página `00 Legenda` |
| `node scripts/penpot-files.js sync-tokens` | Copia os tokens do Design System para todos os arquivos `GAIA · *` |
| `node scripts/penpot-files.js list` | Lista os arquivos do projeto |

- **`update-file` só aceita transit** (`Content-Type: application/transit+json`). Em JSON, os uuids chegam como texto e o servidor rejeita a mudança.
- **Peça a resposta em JSON.** Em transit, um erro não é reconhecido como erro.
- **`add-page` recebe `page` (página inteira) ou `id` + `name`, nunca os dois.**
- **Requisição acima de ~8 MB cai** (curl 55/56). Página grande entra com `add-page` do board vazio seguido de `add-obj` em lotes de ~1500 objetos, sem separar uma instância de componente.
- **A validação exige consistência.** Uma cópia aninhada tem de apontar para o mesmo arquivo que a instância pai, então religue a página inteira de uma vez.
