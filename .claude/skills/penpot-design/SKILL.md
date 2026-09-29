---
name: penpot-design
description: Operate the GAIA design system in Penpot via the Penpot MCP (execute_code / Plugin API). Use when designing or changing screens, components, tokens or the cover/guide in the GAIA Penpot file — e.g. "desenhar as telas do lote X", "criar componente no Penpot", "ajustar o design system", "nova tela no Penpot", "atualizar o Guia". Loads a helper library, follows the batch workflow (survey code content → confirm list → build → audit → document) and enforces the GAIA design rules.
---

# penpot-design — GAIA

Procedimento para operar o arquivo Penpot do design system. **O que** o design define está em `docs/agents/design/` (leia antes). Aqui fica só o **como**.

| Leia | Para |
|---|---|
| `docs/agents/design/README.md` | Princípios, páginas, definição de pronto |
| `docs/agents/design/components.md` | O que já existe (reuse antes de criar) |
| `docs/agents/design/screens.md` | Regra de conteúdo, esqueleto e lotes feitos |
| `docs/agents/design/penpot.md` | Helpers e armadilhas do Plugin API |
| `docs/agents/design/tokens.md` | Tokens e tipografia |
| `docs/agents/design/states.md` | Estados obrigatórios: loading, erro, vazio, sucesso |

## 0. Pré-voo (toda sessão)

**Ordem de tentativa:** primeiro a API REST (`scripts/penpot-files.js`). Se ela não resolver, use o Claude in Chrome para abrir o arquivo e o plugin, e siga com a Plugin API. Só peça ajuda ao usuário depois das duas. Detalhe em `docs/agents/design/penpot.md` → Ordem de tentativa e → MCP local.

1. **Chrome sem congelamento:** o Chrome congela timers e renderização de abas escondidas, e o plugin passa a levar minutos por chamada (uma espera de 1 s dentro do plugin demorando mais de 1 min é o sintoma). A flag de `chrome://flags` para isso não existe mais (Chrome 153). Peça ao usuário para fechar o Chrome (`Cmd+Q`) e reabrir pelo prompt com `! open -a "Google Chrome" --args --disable-background-timer-throttling --disable-renderer-backgrounding --disable-backgrounding-occluded-windows`. Vale até o Chrome ser fechado de novo. Sem isso, a janela do Penpot precisa ficar visível.
2. **MCP:** o `penpot` do Claude Code é o MCP cloud do Penpot (`design.penpot.app/mcp/stream`): ele reconecta sozinho em todo arquivo aberto, sem plugin nem permissão. Com o Chrome do passo 1 ele não trava. O servidor local (`penpot-local`, `npx @penpot/mcp`) fica de plano B: exige abrir o plugin, permitir acesso à rede local e clicar em Connect a cada arquivo (detalhe em `penpot.md` → MCP local).
3. **Trocar de arquivo:** navegue a aba pelo Claude in Chrome e espere uns 10 s. Se o arquivo mostrar "Existem atualizações nas bibliotecas compartilhadas", clique em **Atualizar**. Confira com `pp.js -e "return penpot.currentFile.name"`.
4. **Rodar código:** `node .agents/skills/penpot-design/scripts/pp.js helpers.js mobile.js` (MCP cloud; `PP_LOCAL=1` usa o local) carrega os helpers direto do disco (cada arquivo vira um `execute_code`); `pp.js -e "<código>"` roda código solto; `pp.js <script.js>` roda um arquivo; `pp.js --export <id> out.png` exporta um frame para conferir com Read. Recarregue os helpers a cada reconexão: o `storage` é por conexão. Mantenha cada chamada abaixo de ~2 min (limite do MCP cloud): um fluxo por script. Frame longo (grade, muitos campos) montado peça a peça passa disso: monte o frame base uma vez e faça os estados com `frame.clone()` + ajustes (cerca de 1 s cada). Enquanto executa, o plugin não manda heartbeat ("suspended"); o `pp.js` repete a chamada, então espere o trabalho anterior terminar antes de mandar outro.
5. **Arquivo certo:** `pp.js -e "return [penpot.currentFile.name, penpotUtils.getPages().map(p=>p.name)]"`. Peças e tokens são editados no **Design System** (web) ou no **DS - Mobile**; telas, no arquivo `GAIA · <Módulo>` ou `GAIA Mobile · <Módulo>`.

## 1. Regras que não se negociam

- **Cor:** só por token semantic, via `storage.bind`/`fill`/`stroke` (`applyToken` direto é toggle). Nunca hex. Exceção: `logo/*`.
- **Texto:** só via `storage.txt(texto, tipografia, tokCor)`.
- **Peças:** reuse o que existe na 02 e na 03. Se faltar, crie lá (com `variantSet`, documentado na seção da página) e só então use.
- **Telas:** conteúdo idêntico ao código (i18n, campos, colunas, ações e estados). Nada inventado nem reescrito. Divergência que vem de um componente aprovado é avisada ao usuário e registrada.
- **Botão com texto:** nunca ghost.
- **Estados:** toda fonte de dados tem carregando (skeleton na forma do conteúdo), erro (mensagem + "Tentar novamente") e vazio. Toda ação tem executando (Button `loading`) e erro (Alert destructive). Veja `states.md`.
- **Edição:** só na página aberta. Comece cada chamada com `penpot.openPage(...)` quando precisar, e confira `penpot.currentPage.name`.
- **Um agente de cada vez** no Penpot.

## 2. Fluxo de um lote de telas

1. **Levantar o conteúdo.** Liste as rotas em `gaia-web/src/app/(private|auth)/…`. Para cada tela, extraia do código os textos exatos (resolva `t("key")` em `messages/pt.json`), campos, colunas, ações, dialogs e estados vazio/erro. Para varrer muitas features, delegue a um agente de exploração, pedindo strings exatas.
2. **Confirmar.** Apresente ao usuário a tabela de fluxos → frames, **incluindo os frames de estado** e a FlowTag de cada um, e espere o ok. Registre as dúvidas de escopo (ex.: telas que pertencem a outro lote).
3. **Criar a página.** Use `penpot.createPage()` com o nome `NN Tela - <lote>`. A página nova vai para o fim; crie os lotes na ordem.
4. **Faltou peça?** Adicione na 02 ou na 03 (abra a página, crie, atualize a descrição da seção e volte).
5. **Montar as telas logadas:**
   ```js
   const {f, content} = storage.screen('Tela — estado', {title, back, active});
   storage.listHeader(content, título, placeholderBusca, ação);
   // conteúdo: instâncias + storage.box para layout
   ```
   **Dialog:** `storage.panel` + `fsec` + `row2` + `field` + `footer` + `withDialog`. Depois de um `sleep`, centralize o painel.
   **Frames:** 1440×900, montados soltos na raiz; o agrupamento em fluxos vem no passo 7.
6. **Conferir:** rode `export_shape` de cada frame, com o id literal, e olhe a imagem. Corrija corte, overflow e alinhamento.
7. **Organizar em fluxos** (padrão obrigatório, veja `screens.md` → Padrão de página de telas):
   ```js
   storage.pageLegend(lote, descrição);
   storage.flowSection(1, 'Tela', 'o que o usuário faz ali', [['Tela','principal'],['Tela — carregando','carregando'],['Tela — erro','erro']]);
   // um flowSection por tela ou dialog (dialog é fluxo próprio; wizard é um fluxo só)
   ```
   Depois de `fitTexts`, rode `await storage.restack()` sempre por último.
8. **Fechar:**
   - confira que cada fonte de dados e cada ação tem os estados de `states.md`;
   - rode `storage.fitTexts(root)`, que corrige textos de override transbordando no editor;
   - rode `await storage.repairIcons(root)`;
   - rode `storage.audit(root)`, que tem de dar `[]`;
   - registre o lote em `docs/agents/design/screens.md`;
   - atualize o status do Guia (`00 Capa & Guia`, texto da fase 4);
   - atualize o status em `docs/plans/penpot-design-system.md`.
9. **Reportar ao usuário:**
   - frames feitos;
   - o que mudou só de layout;
   - peças novas no sistema;
   - divergências que precisam de decisão.

## 3. Criar ou alterar um componente

1. Abra a página (02 = primitiva shadcn, 03 = composição GAIA).
2. Monte cada variante como board com `storage.box` e tokens, depois rode `storage.variantSet(nome, [{board, props}])`.
   - **Variante nova num conjunto existente:** crie o board, `lib.createComponent([b])`, depois `container.appendChild(b)` e `setVariantProperty`.
   - **Atalho:** clonar um main dentro do container cria uma variante.
3. Coloque o componente na seção certa, com título h3, e acrescente a regra na descrição da seção.
4. Rode `fitRows`/`fitAuto` e `repairIcons`. A auditoria tem de dar 0.
5. Atualize `docs/agents/design/components.md`.

## 4. Armadilhas mais comuns

A lista completa está em `docs/agents/design/penpot.md`.

- **`applyToken` é toggle.** Use `bind`.
- **Instância não aceita filho novo.** Use variante, `texts` (`null` pula, `false` esconde) ou `swapIn` para o ícone.
- **`resize` fixa o sizing do flex.** Volte para `auto` depois.
- **Board vazio nasce com 100 px.** Spacer usa `resize(1,1)`.
- **Sobreposição em frame com flex precisa de `layoutChild.zIndex`.**
- **Texto de override sumiu na exportação.** Recrie a instância e reaplique os textos.
- **Texto trocado em instância transborda no editor** (o botão não cresce), mas a exportação mostra certo. Rode `fitTexts` antes de fechar e não confie só no export.
- **Tracejado com `strokeAlignment: inner` desenha cantos irregulares.** Use `center`.
- **`export_shape` recebe o id literal.** Ele não resolve `{storage...}`.
