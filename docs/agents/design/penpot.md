# Mecânica do Penpot

Todo desenho é feito pelo MCP `penpot` (`execute_code`, Plugin API). Os helpers ficam em `.agents/skills/penpot-design/scripts/helpers.js`. Uma chamada carrega todos em `storage`, e eles persistem entre chamadas até o plugin recarregar.

## Pré-requisitos

- **MCP:** o `penpot` fica no scope local do Claude Code (`claude mcp add --transport http --scope local penpot <url com userToken>`).
- **Plugin:** o "Penpot MCP" tem de estar aberto e conectado no arquivo.
- **A aba do Penpot fica visível e parada.** Em segundo plano, o plugin é suspenso ("no heartbeat"), o texto renderiza em 1×1 e o flex não recalcula. Trocar de página durante um script faz a chamada falhar.
- **Um agente de cada vez.** Existe uma conexão só e um `storage` só.

## Helpers

| Helper | O que faz |
|---|---|
| `tok(nome)` · `typo(nome)` | Busca um token ou uma tipografia |
| `bind(shape, token, props)` | Aplica o token só se for diferente do atual (`applyToken` é toggle) |
| `fill` · `stroke(shape, tok, w, align)` · `radius` · `shadow` | Atalhos de `bind` |
| `txt(texto, tipografia, tokCor)` | Texto com tipografia da biblioteca e cor por token |
| `icon(nome, size, tok)` | Instância de ícone Lucide com stroke escalado e cor por token |
| `box(nome, dir, gap, px, py)` · `stack` · `add` | Board com flex auto |
| `inst(nome, props)` | Instância de uma variante (busca na 02) |
| `V(nome)` | Container de variantes da 03 |
| `comp(nome)` | Componente simples (sem variantes) |
| `texts(inst, [..])` | Sobrescreve os textos na ordem. `null` pula e `false` esconde. |
| `setText(inst, texto)` | Troca o primeiro texto |
| `swapIn(inst, nomeIcone, tok)` | Troca o ícone aninhado numa instância (swap + `fitIcon` + stroke + token) |
| `variantSet(nome, [{board, props}])` | Cria um conjunto de variantes |
| `fitRows(v, porLinha)` · `fitAuto(v, largura)` | Ajusta o tamanho do container de variantes |
| `section(título, descrição)` · `desc(sec)` | Seção documentada nas páginas 02 e 03 |
| `screen(nome, {title, back, active})` | Esqueleto de tela logada. Devolve `{f, content, inset}`. |
| `plotScreen(nome, {active, title})` | Casca do talhão: `screen` + BadgeScore + abas `line`. `title:false` para carregando e erro. Amostra em `storage.plot`. |
| `panel(título, w, desc)` · `fsec` · `row2` · `field` · `footer` · `withDialog` | Dialogs de formulário sobre uma tela |
| `ring(size, stroke, pct, tok)` | Arco de progresso (path com `A`) |
| `pageLegend(título, desc)` · `flowSection(n, título, desc, [[frame, kind]])` · `restack()` | Organização das páginas de tela em fluxos com FlowTag (veja screens.md) |
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
- **`library.local.components` lista uma variante por conjunto.** Use `inst`, que percorre `variants.variantComponents()`.
- **Assets de logo** (`createShapeFromSvg`) mantêm a cor original em hex. Não passe `repairIcons` nem `bind` neles.

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
- **Não dá para mover shapes entre páginas.** Recrie na página de destino.
- **O plugin não reordena páginas.** Uma página nova vai para o fim da lista.
- **O Penpot normaliza `/` em nomes** (`section/Form` vira `section / Form`). Compare removendo espaços.

## Export e imagens

- **`export_shape`:** passe o id literal, porque ele não resolve expressões. Em boards grandes dá timeout; exporte por seção ou frame.
- **Imagem grande:** não envie pelo plugin. O usuário arrasta a imagem para o arquivo, e você reaproveita o `fillImage` do shape (`{...fill.fillImage, keepAspectRatio:true}`).
- **Fontes custom:** só aparecem em `penpot.fonts` depois de recarregar a aba e reconectar o plugin.
- **API REST** (fonte, upload): `https://design.penpot.app/api/main/methods/<cmd>` com `Authorization: Token <PAT>` e um User-Agent qualquer.
