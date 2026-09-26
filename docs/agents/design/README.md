# Design System GAIA (Penpot)

Referência do que o design **define**. O arquivo Penpot é a fonte da verdade visual do gaia-web: o código será refatorado para seguir o design. Não o contrário.

- **Como operar o Penpot:** skill `penpot-design` (`.agents/skills/penpot-design/`).
- **Quem executa:** agente `penpot-designer`.
- **Histórico, status e decisões:** `docs/plans/penpot-design-system.md`.
- **Como o código atual implementa:** `docs/agents/web/design-system.md`. Descreve o código de hoje e será reescrito na migração.

## Princípios

1. **O design manda.** Variante sem uso, valor arbitrário e duplicata não entram no design. Cada divergência com o código vai para a página de Drift.
2. **Base = shadcn/ui new-york v4 canônico.** Do visual atual do app só ficam os traços de identidade GAIA:
   - a fonte Atyp Display;
   - o azul da marca no `primary`;
   - a sidebar escura.
3. **Cor só por token semantic.** Componente nunca usa token core nem hex. A única exceção são os assets de marca (`logo/*`).
4. **Texto só com as 11 tipografias da biblioteca** (grupo GAIA). Mínimo de 12 px.
5. **Uma peça por função.** Antes de criar, procure nas páginas `Primitivas ·` e `Componentes ·` do Design System. Se faltar algo, crie lá primeiro e depois use na tela.
6. **Telas partem do conteúdo do código.** Textos do i18n, campos, colunas, ações e estados vêm do código. O design melhora o layout, troca elementos pelos componentes do sistema e acrescenta os componentes de UX que faltam (ex.: Stepper num wizard). O código é ajustado depois, a partir do design.
7. **Botão com texto nunca é ghost.** Ação secundária com texto usa `outline`. Ghost só em Button Icon.
8. **Só tema light.** O dark mode está fora de escopo.
9. **Estados são obrigatórios.** Tudo o que depende de rede tem loading (skeleton na forma do conteúdo; spinner só em botão de ação), erro (mensagem + "Tentar novamente") e vazio. Detalhes em [states.md](./states.md).

## Arquivo Penpot

Time "Z2 Tech", projeto "GAIA". Fontes do time: Atyp Display (8 variantes) e Geist Mono.

**Um arquivo por função, uma página pequena por assunto.** O Penpot carrega o arquivo inteiro e desenha a página aberta; o arquivo monolítico antigo (123 MB) travava o editor.

### Design System (biblioteca compartilhada)

Única fonte de componentes, tipografias e tokens. Uma página por seção:

| Página | Conteúdo |
|---|---|
| `01 Capa` | Capa (miniatura do arquivo) |
| `02 Cores` a `05 Espaçamento` | Cores core e semantic, tipografia, radius, espaçamento e sombras |
| `06 Ícones` · `07 Logos` | 72 ícones Lucide (`icon/<nome>`) e logos (`logo/full`, `logo/mark`) |
| `08`–`17 Primitivas · <seção>` | Primitivas shadcn com variantes e estados: Button, Form controls, Badge, Card, Tabs, Display, Menus, Overlays, Data, Navigation. Detalhes em [components.md](./components.md). |
| `18`–`25 Componentes · <seção>` | Componentes do produto, montados com as primitivas: Indicadores, Cards, Layout, Formulários, DataTable, Charts, Documentação, Comparação |
| `99 Drift` | Onde o gaia-web diverge do design: 79 itens de base (tokens, tipografia, cores cruas, primitivos, componentes GAIA, remover), cada um com `arquivo:linha` e destino. Espelho em [drift.md](./drift.md). |

Seção nova vira página nova (`NN Primitivas · <seção>` ou `NN Componentes · <seção>`). As cores existem só como tokens: nenhuma cor de biblioteca.

### Arquivos de telas (um por módulo)

Padrão obrigatório para toda tela nova, detalhado em [screens.md](./screens.md#padrão-de-página-de-telas):

- **Um arquivo `GAIA · <Módulo>` por módulo**, criado com `node .agents/skills/penpot-design/scripts/penpot-files.js new "GAIA · <Módulo>"`.
- **Uma página por fluxo:** `00 Legenda`, `01 <fluxo>`, `02 <fluxo>`… O segundo lote do mesmo módulo leva prefixo (`Comparação · 01 …`).
- **Ligado ao Design System, sem componentes nem tipografias locais.** Peça nova nasce no Design System.
- **Tokens:** cada arquivo guarda uma cópia dos tokens (`core` e `semantic`) do Design System. Depois de mudar um token no Design System, rode `node .agents/skills/penpot-design/scripts/penpot-files.js sync-tokens`. Nunca edite tokens num arquivo de telas.

| Arquivo | Lotes |
|---|---|
| GAIA · Auth | 04 |
| GAIA · Core | 05 |
| GAIA · Projeto, Fazenda & Talhão | 06, 07 (`Talhão ·`) |
| GAIA · Carbono emissão | 08, 09 (`Comparação ·`) |
| GAIA · Carbono remoção | 10, 11 (`Comparação ·`) |
| GAIA · Regenerativo | 12, 13 (`Comparação ·`) |

## Documentos

| Arquivo | Conteúdo |
|---|---|
| [tokens.md](./tokens.md) | Tokens core e semantic, tipografia, radius, sombras e regras de contraste |
| [components.md](./components.md) | Inventário das páginas Primitivas e Componentes: propriedades, variantes, quando usar e o que cada um substitui no código |
| [states.md](./states.md) | Regras de loading, erro, vazio e sucesso, e como entram no Penpot |
| [screens.md](./screens.md) | Fluxo de um lote, padrão de arquivo e página de telas, esqueleto das telas, regra de conteúdo e lotes feitos |
| [penpot.md](./penpot.md) | Mecânica do Plugin API e da API REST, helpers, scripts e armadilhas conhecidas |

## Definição de pronto

- **Tokens:** todo fill, stroke e sombra está ligado a token semantic. A auditoria (`storage.audit`) retorna 0.
- **Tipografia:** todo texto usa uma tipografia da biblioteca.
- **Telas:** só instâncias e boards de layout, sem desenho solto.
- **Estados:** cada fonte de dados e cada ação têm os estados de [states.md](./states.md).
- **Telas:** arquivo `GAIA · <Módulo>` com uma página por fluxo, no [padrão de fluxos](./screens.md#padrão-de-página-de-telas), sem frame solto na raiz.
- **Registro:** cada lote novo é documentado em `screens.md` e entra na tabela de arquivos acima.
