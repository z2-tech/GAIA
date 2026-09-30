# 06 · Comparação ampliada (até 20)

Feature nova, pedida em 30/09/2026. Hoje a tela de comparação aceita 1 a 4 itens;
a API já aceita 20. Objetivo: comparar até 20 (talhões, fazendas, projetos) sem
perder leitura.

Estado: **discovery**. Nada criado no Plane.

Questionário: junto com o consolidado, seção P de
[../05_consolidado/04-questionario-produto.md](../05_consolidado/04-questionario-produto.md)
e da mesma página interativa: https://claude.ai/artifact/AKnyBf3xcTcYUvjQRZF5hd

## Arquivos

| Arquivo | Para quê |
|---|---|
| [01-entendimento.md](01-entendimento.md) | Onde está o limite de 4, o que quebra com 20, o que o backend já faz |
| [02-pesquisa.md](02-pesquisa.md) | Como comparar muitos itens (UX e visualização) |
| [03-analise-produto.md](03-analise-produto.md) | Proposta de design: modo detalhe (≤4) e modo ranking (5–20), com wireframes |
| [05-rascunho-tasks.md](05-rascunho-tasks.md) | Tasks prováveis |
| [06-por-modulo.md](06-por-modulo.md) | Modo ranking de Remoção, Regenerativo e Biodiversidade |

## Em uma página

- **Todos os módulos:** Remoção compara BAU → projeto por item (dumbbell);
  Regenerativo por nota com faixas e seções; Biodiversidade ganha tela de
  comparação. Ver [06](06-por-modulo.md) e [referência dos módulos](../modulos-referencia.md).
- **Trocar o 4 por 20 é uma linha** (`gaia-web/src/lib/comparison-url.ts:1`), mas a
  tela quebra: só existem 4 cores e elas se repetem a partir do quinto item, os
  slots são uma grade de 4, e as colunas por item ficam finas demais. Além disso,
  cada item dispara 2 chamadas à API: 20 itens = 40+ requisições.
- **Comparar 20 lado a lado não funciona para ninguém.** Pesquisa de UX (NN/g):
  tabela de colunas por item vai até ~5. Acima disso, o padrão muda: **linhas =
  itens**, ranking ordenado e destaque de poucos.
- **Proposta:** dois modos na mesma tela.
  - **Detalhe (1–4):** a tela de hoje, sem mudança.
  - **Ranking (5–20):** gráfico de barras ordenado de uma métrica por vez, faixa de
    referência, tabela com os itens nas linhas; 1 a 3 itens destacados em cor, o
    resto em cinza. Clicar em até 4 linhas abre o modo detalhe só com eles.
- **Picker:** selecionar em lote (todos os talhões da fazenda, todas as fazendas do
  projeto). Hoje é um talhão por vez.
- **Backend:** o front passa a usar a API genérica `POST /comparison/` (uma chamada
  para os 20), plano que já existia (FE-41). Corrigir N+1 de Remoção e Regenerativo
  antes.
