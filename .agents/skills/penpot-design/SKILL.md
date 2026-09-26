---
name: penpot-design
description: Operate the GAIA design system in Penpot via the Penpot MCP (execute_code / Plugin API). Use when designing or changing screens, components, tokens in the GAIA Penpot files (Design System library + one GAIA · <Módulo> file per module) — e.g. "desenhar as telas do lote X", "criar componente no Penpot", "ajustar o design system", "nova tela no Penpot", "novo módulo no Penpot". Loads a helper library, follows the batch workflow (survey code content → confirm list → build → audit → document) and enforces the GAIA design rules.
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

**Ordem de tentativa:** primeiro a API REST (`scripts/penpot-files.js`). Se ela não resolver, use o Claude in Chrome para abrir o arquivo e o plugin, e siga com a Plugin API. Só peça ajuda ao usuário depois das duas. Detalhe em `docs/agents/design/penpot.md` → Ordem de tentativa.

1. **MCP ativo:** chame `mcp__penpot__high_level_overview` uma vez por sessão.
2. **Conexão e arquivo:** rode `return [penpot.currentFile.name, penpotUtils.getPages().map(p=>p.name)]`. Peças e tokens são editados no **Design System**; telas, no arquivo `GAIA · <Módulo>`. Se falhar ou for o arquivo errado, peça ao usuário para abrir o plugin "Penpot MCP" no arquivo certo.
3. **Helpers:** leia `.agents/skills/penpot-design/scripts/helpers.js` e passe o arquivo **inteiro** como `code` de um `execute_code`. O retorno lista arquivo, biblioteca (`Design System: N components` num arquivo de telas), páginas, tokens e o número de helpers (cerca de 50). Recarregue sempre que `storage.box` não existir: o `storage` se perde quando o plugin recarrega.
4. **Aba:** peça ao usuário para manter a aba do Penpot visível e **não trocar de página** enquanto você trabalha.

## 1. Regras que não se negociam

- **Cor:** só por token semantic, via `storage.bind`/`fill`/`stroke` (`applyToken` direto é toggle). Nunca hex. Exceção: `logo/*`.
- **Texto:** só via `storage.txt(texto, tipografia, tokCor)`.
- **Peças:** reuse o que existe no Design System (páginas `Primitivas ·` e `Componentes ·`). Se faltar, crie lá (com `variantSet`, documentado na seção da página), publique a biblioteca e só então use na tela. Nunca crie componente num arquivo de telas.
- **Tokens:** só no Design System. Depois de mudar um token, rode `node .agents/skills/penpot-design/scripts/penpot-files.js sync-tokens`.
- **Telas:** conteúdo idêntico ao código (i18n, campos, colunas, ações e estados). Nada inventado nem reescrito. Divergência que vem de um componente aprovado é avisada ao usuário e registrada.
- **Botão com texto:** nunca ghost.
- **Estados:** toda fonte de dados tem carregando (skeleton na forma do conteúdo), erro (mensagem + "Tentar novamente") e vazio. Toda ação tem executando (Button `loading`) e erro (Alert destructive). Veja `states.md`.
- **Edição:** só na página aberta. Comece cada chamada com `penpot.openPage(...)` quando precisar, e confira `penpot.currentPage.name`.
- **Um agente de cada vez** no Penpot.

## 2. Fluxo de um lote de telas

1. **Levantar o conteúdo.** Liste as rotas em `gaia-web/src/app/(private|auth)/…`. Para cada tela, extraia do código os textos exatos (resolva `t("key")` em `messages/pt.json`), campos, colunas, ações, dialogs e estados vazio/erro. Para varrer muitas features, delegue a um agente de exploração, pedindo strings exatas.
2. **Confirmar.** Apresente ao usuário a tabela de fluxos → frames, **incluindo os frames de estado** e a FlowTag de cada um, e espere o ok. Registre as dúvidas de escopo (ex.: telas que pertencem a outro lote).
3. **Criar o arquivo e as páginas.** Módulo novo: `node .agents/skills/penpot-design/scripts/penpot-files.js new "GAIA · <Módulo>"` (ligado ao Design System, com tokens e a página `00 Legenda`). Continuação de módulo existente (ex.: comparação): use o arquivo dele, com prefixo nas páginas (`Comparação · 01 …`). Peça ao usuário para abrir o arquivo e conectar o plugin. Crie **uma página por fluxo** com `penpot.createPage()`, nome `NN <fluxo>`, na ordem de navegação (a página nova vai para o fim).
4. **Faltou peça?** Ela nasce no Design System: com o plugin nele, adicione na página `Primitivas · <seção>` ou `Componentes · <seção>`, atualize a descrição da seção, publique, e aceite a atualização da biblioteca no arquivo do módulo.
5. **Montar as telas logadas:**
   ```js
   const {f, content} = storage.screen('Tela — estado', {title, back, active});
   storage.listHeader(content, título, placeholderBusca, ação);
   // conteúdo: instâncias + storage.box para layout
   ```
   **Dialog:** `storage.panel` + `fsec` + `row2` + `field` + `footer` + `withDialog`. Depois de um `sleep`, centralize o painel.
   **Frames:** 1440×900, montados soltos na raiz da página do fluxo; o agrupamento vem no passo 7.
6. **Conferir:** rode `export_shape` de cada frame, com o id literal, e olhe a imagem. Corrija corte, overflow e alinhamento.
7. **Organizar em fluxos** (padrão obrigatório, veja `screens.md` → Padrão de página de telas):
   ```js
   // página 00 Legenda
   storage.pageLegend(lote, descrição);
   // em cada página de fluxo (dialog é fluxo próprio; wizard é um fluxo só)
   storage.flowSection(1, 'Tela', 'o que o usuário faz ali', [['Tela','principal'],['Tela — carregando','carregando'],['Tela — erro','erro']]);
   ```
   Depois de `fitTexts`, rode `await storage.restack()` sempre por último.
8. **Fechar:**
   - confira que cada fonte de dados e cada ação tem os estados de `states.md`;
   - rode `storage.fitTexts(root)`, que corrige textos de override transbordando no editor;
   - rode `await storage.repairIcons(root)`;
   - rode `storage.audit(root)`, que tem de dar `[]`;
   - registre o lote em `docs/agents/design/screens.md` e o arquivo na tabela do `README.md`;
   - atualize o status em `docs/plans/penpot-design-system.md`.
9. **Reportar ao usuário:**
   - frames feitos;
   - o que mudou só de layout;
   - peças novas no sistema;
   - divergências que precisam de decisão.

## 3. Criar ou alterar um componente

1. Com o plugin no **Design System**, abra a página da seção (`Primitivas ·` = primitiva shadcn, `Componentes ·` = composição GAIA). Seção nova vira página nova.
2. Monte cada variante como board com `storage.box` e tokens, depois rode `storage.variantSet(nome, [{board, props}])`.
   - **Variante nova num conjunto existente:** crie o board, `lib.createComponent([b])`, depois `container.appendChild(b)` e `setVariantProperty`.
   - **Atalho:** clonar um main dentro do container cria uma variante.
3. Coloque o componente na seção certa, com título h3, e acrescente a regra na descrição da seção.
4. Rode `fitRows`/`fitAuto` e `repairIcons`. A auditoria tem de dar 0.
5. Atualize `docs/agents/design/components.md`.
6. Publique a biblioteca e aceite a atualização nos arquivos `GAIA · *` que usam a peça.

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
