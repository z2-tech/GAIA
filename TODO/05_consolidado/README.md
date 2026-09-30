# 05 · Consolidado (fazenda, produto, projeto)

Feature nova, pedida em 30/09/2026. Números 02–04 ficam reservados para PDF, QR
code e auditor, conforme o [escopo de 29/09](../../docs/references/meetings/29-09-26-estrategia-peterson-design-comparacao-mobile/29-09-26-escopo-export-qrcode-auditor.md).

Estado: **discovery**. Nada criado no Plane.

Depende de: [00 cálculo oficial](../00_calculo_final/README.md) (qual cálculo
entra na soma). Alimenta: PDF do dashboard (02), página do QR (03), export (01,
aba Resumo).

## Arquivos

| Arquivo | Para quê |
|---|---|
| [01-entendimento.md](01-entendimento.md) | O que é o consolidado, o que existe hoje, regras de soma por módulo |
| [02-pesquisa.md](02-pesquisa.md) | Normas e mercado: como agregar certo, que KPIs mostrar |
| [03-analise-produto.md](03-analise-produto.md) | Proposta de telas por nível, com wireframes |
| [04-questionario-produto.md](04-questionario-produto.md) | Perguntas para Paulo e Ruan (junto com a comparação) |
| [questionario.html](questionario.html) | Página interativa com as perguntas de consolidado **e** de comparação. Link abaixo |
| [05-rascunho-tasks.md](05-rascunho-tasks.md) | Tasks prováveis |
| [06-por-modulo.md](06-por-modulo.md) | Como somar e mostrar Remoção, Regenerativo e Biodiversidade |

## Em uma página

- **Todos os módulos:** Remoção soma em tCO₂e/ano (ganho × área, mesma janela);
  Regenerativo resume por % da área em cada faixa e "onde agir"; Biodiversidade
  por classificação. Ver [06](06-por-modulo.md) e
  [referência dos módulos](../modulos-referencia.md).
- **Hoje não existe consolidado.** Cada talhão tem o resultado de cada cálculo. Na
  fazenda e no projeto só aparece **% de preenchimento**. A tarefa SHARED-01
  ("Visão geral do projeto") também trata só de preenchimento.
- **Consolidado** = somar os resultados dos cálculos oficiais dos talhões para
  responder, em cada nível, "quanto emite, quanto remove, quão eficiente é, de onde
  vem a emissão, e quanto disso está coberto por dado".
- **Quatro níveis:** talhão (existe) → fazenda → produto (ex.: soja de todas as
  fazendas) → projeto.
- **Regra de ouro:** soma-se o absoluto (tCO₂e, ha, kg). Intensidade é o total
  dividido pelo total (Σ tCO₂e / Σ kg), **nunca a média das intensidades**. O Paulo
  falou em "média das fazendas"; isso vale só se for ponderada.
- **Emissão, remoção e líquido sempre separados**, com o líquido rotulado. O GHG
  Protocol Land Sector (vigente em 2027) exige isso.
- **Sempre mostrar cobertura:** "12 de 15 talhões · 86% da área".
- **Bloqueio:** sem o cálculo oficial (feature 0), um talhão com três simulações
  entra três vezes na soma.

## Link do questionário

https://claude.ai/artifact/AKnyBf3xcTcYUvjQRZF5hd (consolidado + comparação; respostas por pessoa na coleção `respostas`)
