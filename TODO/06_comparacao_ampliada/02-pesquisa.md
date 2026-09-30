# 02 · Pesquisa: comparar muitos itens

- **NN/g, tabelas de comparação:** decidir comparando atributo a atributo só
  funciona com poucas alternativas; acima de ~5, dar filtros para chegar a ≤5.
  Cabeçalho fixo, destacar diferenças, deixar o usuário escolher itens e
  atributos. https://www.nngroup.com/articles/comparison-tables/
- **Datawrapper:**
  - barra horizontal para muitos itens ou rótulos longos
    (https://www.datawrapper.de/blog/chart-types-guide);
  - dot plot, denso e sem precisar começar em zero
    (https://www.datawrapper.de/academy/how-to-create-a-dot-plot);
  - destacar poucos itens e deixar o resto em cinza
    (https://www.datawrapper.de/blog/emphasize-with-color-in-data-visualizations);
  - small multiples (https://www.datawrapper.de/blog/small-multiple-column-charts);
  - slope chart para antes/depois
    (https://academy.datawrapper.de/article/152-how-to-create-a-slope-chart).
- **FT Visual Vocabulary:** escolher o gráfico pela pergunta (ranking, desvio,
  distribuição, parte-todo). https://github.com/ft-interactive/visual-vocabulary
- **Stephen Few:** bullet graph para valor vs meta vs faixas; evitar pizza.
  https://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf
- **Power BI:** barras e escala de cor dentro da tabela.
  https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting
- **Regra de cor (skill de dataviz):** uma cor por item funciona até ~4 com rótulo
  direto e tem teto de 8. Com mais, nunca gerar cores novas: usar destaque (1–3 em
  cor, resto cinza), ordenar, ou small multiples. Cor segue o item, não a posição.

## Qual gráfico para qual pergunta

| Pergunta | Gráfico |
|---|---|
| Quem emite mais, quem é mais eficiente | Barra horizontal ordenada, uma métrica, valor no fim da barra |
| Onde cada item fica frente ao grupo | Dot plot com faixa p25–p75 e mediana |
| Emissão × remoção × líquido | Barra divergente (emissão para um lado, remoção para o outro, marcador no líquido) |
| De onde vem a emissão | Barra 100% empilhada, até 6 fontes + outras |
| BAU × projeto (Remoção) | Dumbbell (dois pontos ligados por item) |
| Nota contra faixas (Regenerativo) | Barra com faixas Crítico/Atenção/Bom ao fundo |
| Muitas métricas de uma vez | Tabela: itens nas linhas, métricas nas colunas, barras nas células, ordenação |
