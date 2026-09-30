# 05 · Rascunho de tasks

Não criadas no Plane. "Depende de" aponta perguntas do
[questionário](04-questionario-produto.md) (K = consolidado).

| Título | O quê | Depende de |
|---|---|---|
| PROD: Regras do consolidado | Níveis, número principal, ponderação, período, cobertura | K1–K15 |
| PROD: Design das visões consolidadas no Penpot | Fazenda (aba Visão geral), Produto, Projeto (Visão geral); cobertura, KPIs, hotspots, tabela | K1–K3, K13 |
| BE: Endpoint de consolidado | `GET /projects/{id}/consolidated/?level=farm|product|project&season=…`; só cálculos oficiais; soma absoluta; intensidade Σ/Σ por cultura; cobertura; desatualizados | feature 0, K4, K10, K11 |
| BE: Hotspots por fonte | Extrair do JSON de resultado LCA a emissão por fonte (fertilizante, N₂O direto/indireto, diesel, calcário, ureia, energia, semente, MUT) e somar | K13 |
| BE: Remoção em absoluto | Ganho anual × área do talhão; tratar talhão nulo; BAU e projeto separados; alinhar o delta de `comparison/selectors.py:136` com `rothc/services.py:1807` | K6, K7 |
| BE: Consolidado por produto | Grão por cultura; derivados por `product_id` com mesmo método de alocação | K8, K9 |
| FE: Visão geral da fazenda | Nova aba no menu da fazenda | design |
| FE: Visão geral do projeto | Substitui/evolui a SHARED-01 | design |
| FE: Visão por produto | Dentro do projeto | design |
| FE: Drill-down e "Comparar selecionados" | Linhas levam ao nível de baixo; seleção abre a comparação | feature 06 |

Relacionados: SHARED-01 (visão geral, só completude) deve ser fundida nesta
feature. O endpoint de consolidado também alimenta o export (aba Resumo), o PDF e
a página do QR.

## Por módulo (ver 06-por-modulo.md)

| Título | O quê | Depende de |
|---|---|---|
| BE: Consolidado da Remoção | Ganho anual × área, BAU e projeto separados, diferença, mesma janela, cobertura de área | M1 |
| BE: Consolidado do Regenerativo | % da área por faixa, nota ponderada, por seção, indicadores mais críticos | M2–M4 |
| BE: Corrigir denominador do Regenerativo | Tirar pecuária do total quando o manejo não inclui (`regenerative/selectors.py:126-135`) | M5 |
| BE: Consolidado da Biodiversidade | Por classificação, por área, melhorias mais comuns; alinhar denominadores geral × seção | M6 |
| FE: Blocos de Remoção, Regenerativo e Biodiversidade | Na visão da fazenda e do projeto; colunas novas na tabela de fazendas | design |
