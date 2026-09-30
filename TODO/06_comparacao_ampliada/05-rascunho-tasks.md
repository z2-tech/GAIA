# 05 · Rascunho de tasks

Não criadas no Plane. "Depende de" aponta perguntas P do
[questionário](../05_consolidado/04-questionario-produto.md).

| Título | O quê | Depende de |
|---|---|---|
| PROD: Regras da comparação ampliada | Limite, níveis, modos, métrica padrão, simulações | P1–P12 |
| PROD: Design do modo ranking e do picker em lote no Penpot | Ranking, tabela, dumbbell, faixas, picker; atualizar lotes 09/11/13 e `components.md` (faixa de 4, m1–m4, Col 1–4) e `design-system.md:65` | P3, P5, P6 |
| BE: Performance da comparação | Tirar N+1 de Remoção e Regenerativo; limite e cache no benchmark | — |
| BE: Aviso de corte e média ponderada | `summary` ponderado; avisar quando o filtro passaria de 20 | P1 |
| BE: Delta de Remoção único | Alinhar `comparison/selectors.py:136` com `rothc/services.py:1807` | — |
| BE: Detalhe por fase/produto na API genérica | Estender `details` para o modo detalhe não precisar de chamadas por item | — |
| BE: Comparar fazendas e projetos agregados | Usa o endpoint de consolidado (feature 05) | P2, P4 |
| BE: Acesso por fazenda na comparação | `comparison/selectors.py:5` libera todas as fazendas do projeto; alinhar com a listagem | — |
| FE: Comparação via `POST /comparison/` | Uma chamada para N itens (FE-41) | — |
| FE: Limite 20 e modos Ranking/Detalhe | Constante, slots, contador, i18n, controle segmentado, destaque até 3 | design |
| FE: Modo ranking da Emissão | Barra ordenada, faixa, tabela, composição | design |
| FE: Picker em lote | Nível, "selecionar todas", chips, busca | design, P5 |

## Por módulo (ver 06-por-modulo.md)

| Título | O quê | Depende de |
|---|---|---|
| FE: Ranking da Remoção | Dumbbell BAU → projeto, tabela com entradas e resultados, aviso de janela diferente | M7 (questionário 05) |
| FE: Ranking do Regenerativo | Barra com faixas, tabela de seções com expansão para indicadores, coluna de manejo; antes × depois | M8 |
| FE: Comparação da Biodiversidade | Tela nova: ranking, 3 áreas, respondidas | M9 |
