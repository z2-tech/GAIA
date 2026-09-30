# 01 · Entendimento

## O pedido

Henrique, 30/09: a comparação hoje é liberada no front para 4 itens. Precisa de
mais, até 20. Como fica no design?

Reunião de 29/09: Paulo disse que projetos têm ~10 fazendas e sugeriu, com muitos
itens, "comparação só de gráfico, sem os números" [14:56]. Ficou "limite de 4 por
enquanto".

## Onde está o limite de 4 (front)

Caminhos relativos a `gaia-web/src`.

| Ponto | Arquivo |
|---|---|
| Constante `MAX_COMPARISON_ITEMS = 4` | `lib/comparison-url.ts:1` |
| Truncamento da URL | `lib/comparison-url.ts:30` |
| Itens selecionados | `features/comparison/.../use-comparison-items.ts:37` |
| Faixa de slots (grade de 4), "cheio", slots vazios | `comparison-shell.tsx:46-50`, `:90` (`lg:grid-cols-4`) |
| Contador e tooltip | `comparison-shell.tsx:68`, `:82` |
| Picker: vagas e bloqueio | `picker-dialog.tsx:90`, `:124` |
| Texto do estado vazio | `comparison-page.tsx:110` |
| i18n | `messages/pt.json:904-975` (já usa `{max}`) |

## O que quebra com 20

| Parte | Problema |
|---|---|
| Cores | Só 4 (`features/comparison/shared/slot-colors.ts:1-6`), repetidas com `index % 4` |
| Slots | Grade de 4 colunas |
| Emissão | `KpiCompareCards` com uma linha por item (20 linhas por card); `StageMatrix` com uma coluna de 160 px por item (3.200 px de largura) |
| Remoção | `LineChart` com 20 séries (ilegível) |
| Regenerativo | `ScoreOverview` em `repeat(N, 1fr)`: 20 colunas finas |
| Legendas | 20 cores repetidas |
| Rede | Emissão: resultado + detalhe por item → 40+ chamadas; o picker também busca resultado por candidato |
| Picker | Um talhão por vez; juntar 10 fazendas = 10 navegações |

## O que o backend já faz

Caminhos relativos a `gaia-api`.

- `POST /api/v1/comparison/comparison/`: `module`, `assessment_ids` ou `filters`
  (projetos, fazendas, talhões, culturas, safras), `metric`, `normalize`
  (per_ha, per_kg, absolute). Devolve itens com valor da métrica e
  `summary {count, min, max, avg}`.
- Limite 20 em três lugares (`comparison/services.py:9`, `serializers.py:31`, `:50`).
  Com filtros, **corta em 20 sem avisar** (`services.py:336`).
- `GET /comparison/benchmark/`: média, mediana, p25, p75 de todos os cálculos
  acessíveis; só com 5 ou mais.
- O front **não usa** essa API (plano FE-41, não feito).
- Não traz o detalhe por fase e produto da Emissão; a visão detalhe ainda precisa
  das chamadas por item.
- Performance: Remoção faz 2–5 queries por item (`comparison/selectors.py:49-53`,
  `:123-161`); Regenerativo busca pontos por item (`:242`); benchmark sem limite
  nem cache.
- **Delta de Remoção diferente do resto da plataforma** (`selectors.py:136-144` vs
  `rothc/services.py:1807-1814`).
- `summary.avg` é média simples.
- A comparação libera todas as fazendas do projeto (`comparison/selectors.py:5`),
  diferente da listagem (`projects/selectors.py:94-114`).

## Design atual

- Penpot: lotes 09 (Emissão), 11 (Remoção), 13 (Regenerativo), todos com frame
  "4 (limite)" (`docs/agents/design/screens.md:276-402`).
- `docs/agents/design/components.md:116-132`: `ComparisonSlot` "faixa de 4 vagas",
  `ScoreScale` com marcadores m1–m4, `ScoreOverview` com Col 1–4.
- `docs/agents/web/design-system.md:65`: "avaliações 1 a 4 → chart-1/4/3/2".
- SHARED-04 já pedia definir "limite prático, overflow e legibilidade".
