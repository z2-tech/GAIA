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
5. **Uma peça por função.** Antes de criar, procure na 02 e na 03. Se faltar algo, crie lá primeiro e depois use.
6. **Telas partem do conteúdo do código.** Textos do i18n, campos, colunas, ações e estados vêm do código. O design melhora o layout, troca elementos pelos componentes do sistema e acrescenta os componentes de UX que faltam (ex.: Stepper num wizard). O código é ajustado depois, a partir do design.
7. **Botão com texto nunca é ghost.** Ação secundária com texto usa `outline`. Ghost só em Button Icon.
8. **Só tema light.** O dark mode está fora de escopo.
9. **Estados são obrigatórios.** Tudo o que depende de rede tem loading (skeleton na forma do conteúdo; spinner só em botão de ação), erro (mensagem + "Tentar novamente") e vazio. Detalhes em [states.md](./states.md).

## Arquivo Penpot

- **Time "Default"**, arquivo "New File 1" (a renomear para "GAIA Design System").
- **Fontes do time:** Atyp Display (8 variantes) e Geist Mono.

| Página | Conteúdo |
|---|---|
| `00 Capa & Guia` | Capa e Guia (páginas, regras, status das fases, base técnica). Atualize o status ao fechar cada lote. |
| `01 Foundations` | Cores core e semantic, tipografia, radius, espaçamento, sombras, 72 ícones Lucide (`icon/<nome>`) e logos (`logo/full`, `logo/mark`). |
| `02 Primitives` | Primitivas shadcn com variantes e estados. Detalhes em [components.md](./components.md). |
| `03 GAIA Components` | Componentes do produto, montados com as primitivas. |
| `NN Tela - <lote>` | Telas de 1440×900 organizadas em fluxos: Legenda no topo e um board `Fluxo NN — <nome>` por tela ou dialog, com FlowTag em cada frame. Padrão em [screens.md](./screens.md#padrão-de-página-de-telas). |

## Documentos

| Arquivo | Conteúdo |
|---|---|
| [tokens.md](./tokens.md) | Tokens core e semantic, tipografia, radius, sombras e regras de contraste |
| [components.md](./components.md) | Inventário das páginas 02 e 03: propriedades, variantes, quando usar e o que cada um substitui no código |
| [states.md](./states.md) | Regras de loading, erro, vazio e sucesso, e como entram no Penpot |
| [screens.md](./screens.md) | Padrão de página por lote, esqueleto das telas, regra de conteúdo e lotes feitos |
| [penpot.md](./penpot.md) | Mecânica do Plugin API, helpers e armadilhas conhecidas |

## Definição de pronto

- **Tokens:** todo fill, stroke e sombra está ligado a token semantic. A auditoria (`storage.audit`) retorna 0.
- **Tipografia:** todo texto usa uma tipografia da biblioteca.
- **Telas:** só instâncias e boards de layout, sem desenho solto.
- **Estados:** cada fonte de dados e cada ação têm os estados de [states.md](./states.md).
- **Página de telas:** segue o [padrão de fluxos](./screens.md#padrão-de-página-de-telas), sem frame solto na raiz.
- **Registro:** cada lote novo é documentado em `screens.md`, e o status do Guia é atualizado.
