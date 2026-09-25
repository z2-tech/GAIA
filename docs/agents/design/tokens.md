# Tokens e tipografia

Tema `mode/light` com dois sets: `core` (55 tokens) e `semantic` (49 tokens). Componentes e telas usam só `semantic`. O `core` existe para o `semantic` referenciar.

## Cores core (23)

Entram só os degraus que o semantic usa. Um degrau sem uso vira convite para cor crua.

| Família | Degraus |
|---|---|
| gray (levemente azulado, cinza da marca) | 0 `#FFFFFF` · 100 `#EEF2FC` · 200 `#E4E7F0` · 300 `#DADDE5` · 400 `#B6B8BE` · 600 `#737478` · 800 `#353538` · 900 `#212123` |
| blue | 50 `#F5F7FF` · 200 `#AABDFF` · 400 `#0D6AFE` · 600 `#1938A3` |
| green | 50 `#F1FAF2` · 600 `#24B25F` · 800 `#0E6636` |
| yellow | 50 `#FFF8ED` · 600 `#F59E0B` · 800 `#944E12` |
| red | 50 `#FFF2F2` · 700 `#D02B30` · 800 `#A21A20` |
| purple | 600 `#8B5CF6` |
| aqua | 600 `#2DD4BF` |

## Cores semantic

| Grupo | Token → core | Uso |
|---|---|---|
| Superfícies | `background`, `card`, `popover` → gray.0 · `foreground`, `card-foreground`, `popover-foreground` → gray.900 | Fundo e texto padrão |
| Marca | `primary` → blue.400 · `primary-foreground` → gray.0 | Ação principal, foco da marca |
| Neutros | `secondary`, `muted`, `accent` → gray.100 · `secondary-foreground`, `accent-foreground` → gray.900 · `muted-foreground` → gray.600 · `border` → gray.200 · `input` → gray.300 · `ring` → blue.200 | UI neutra. Azul só no primary, no focus e em info. |
| destructive | base red.700 · `-foreground` gray.0 · `-subtle` red.50 · `-subtle-foreground` red.800 | Erro, exclusão |
| success | base green.600 · `-foreground` gray.0 · `-subtle` green.50 · `-subtle-foreground` green.800 | Concluído, ativo |
| warning | base yellow.600 · `-foreground` **gray.900** · `-subtle` yellow.50 · `-subtle-foreground` yellow.800 | Pendente, atenção |
| info | base blue.400 · `-foreground` gray.0 · `-subtle` blue.50 · `-subtle-foreground` blue.600 | Em andamento, aviso neutro |
| chart | 1 blue.400 · 2 green.600 · 3 yellow.600 · 4 purple.600 · 5 aqua.600 | Séries de gráficos |
| sidebar | `sidebar` gray.900 · `-foreground` gray.0 · `-muted-foreground` gray.400 · `-accent` blue.400 · `-accent-foreground` gray.0 · `-border` gray.800 · `-hover` gray.800 | Sidebar escura e fundos de Auth |

**Regras de cor:**
- **Contraste:** o texto de status usa `*-subtle-foreground` sobre `*-subtle`, e todas essas combinações passam AA.
- **success:** tem 2,8:1 sobre branco, então serve para fill ou ícone, nunca para texto.
- **warning:** o foreground é escuro (gray.900), não branco.
- **Séries de gráfico:** Fóssil = `chart.1`, Biogênico = `chart.5`, Remoção = `chart.2`. BAU usa `muted-foreground` e Cenário usa `chart.1`.
- **Opacidade:** não existe token com opacidade. Hover do tipo `bg-primary/90` usa uma camada `state-layer` por cima (veja [penpot.md](./penpot.md)).

## Radius

Escala do shadcn v4 (`--radius` 10).

| Token | px | Uso |
|---|---|---|
| `radius.xs` | 4 | Checkbox, topo das barras de gráfico |
| `radius.sm` | 6 | Menu item |
| `radius.md` | 8 | Button, input, select, badge, tooltip, menus, alert |
| `radius.lg` | 10 | Dialog, TabsList, Dropzone, Alert |
| `radius.xl` | 14 | Card, KpiCard, painel inset das telas |
| `radius.full` | 9999 | Avatar, slider, dots |

## Sombras (semantic)

O Penpot não aceita `spread` negativo, então as sombras do shadcn foram aproximadas numa camada só.

| Token | Valor | Uso |
|---|---|---|
| `shadow.xs` | 0 1 2 / 5% | Input, select, textarea, outline button |
| `shadow.sm` | 0 1 3 / 10% | Card, aba ativa |
| `shadow.md` | 0 4 8 / 8% | Menus, popover, command |
| `shadow.lg` | 0 10 24 / 12% | Dialog, sheet, card de Auth |

## Outros tokens core

- **space:** 0/1/2/3/4/5/6/8/10/12/16, em passos de 4 px.
- **font-size:** 12, 14, 16, 18, 20, 24, 32.
- **font-weight:** 400, 500, 600, 700.
- **font-family:** sans = Atyp Display, mono = Geist Mono.
- **border:** 1 e 2.

## Tipografia (biblioteca, grupo GAIA)

| Estilo | px / line-height | Peso | Uso |
|---|---|---|---|
| `display` | 32/40 | 600 | Número de destaque, título de Capa e Auth |
| `h1` | 24/32 | 600 | Título de página (AppHeader), título de card de Auth |
| `h2` | 20/28 | 600 | Título de seção, de dialog e de sheet |
| `h3` | 16/24 | 600 | Título de card, legenda de seção de formulário |
| `body-lg` | 16/24 | 400 | Parágrafo de destaque |
| `body` | 14/20 | 400 | Padrão da UI, tabela, formulário |
| `label` | 14/20 | 500 | Label de campo, item de menu, título de linha |
| `body-strong` | 14/20 | 600 | Valor em destaque |
| `caption` | 12/16 | 400 | Ajuda, metadados, eixos de gráfico |
| `caption-strong` | 12/16 | 500 | Badge, tag, grupo da sidebar |
| `mono` | 14/20 | 400 (Geist Mono) | Números tabulares, códigos |

O ícone Lucide padrão tem 16 px, com stroke 1.33 (2 × 16/24). Em 12 px o stroke é 1, e em 24 px é 2.
