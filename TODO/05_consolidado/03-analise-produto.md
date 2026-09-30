# 03 · Análise de produto e proposta de telas

Formato da skill `business-product-strategist`. Wireframes em texto para discutir;
o desenho final vai para o Penpot (design primeiro, dev depois).

## Avaliação geral

A plataforma responde bem "qual a pegada **deste talhão**", mas não responde
"qual a pegada **desta fazenda, desta soja, deste projeto**", que é a pergunta que
o cliente, o comprador e a Control Union fazem. Na fazenda e no projeto só existe
% de preenchimento: a tela diz se o trabalho está feito, não o que ele mostra. O
valor do produto aparece só no nível mais baixo.

## Problemas encontrados

- Para saber a emissão de uma fazenda, a pessoa abre cada talhão e soma à mão.
- Não dá para ver de onde vem a emissão (fertilizante, diesel, N₂O) no agregado,
  que é onde se decide o que mudar.
- Não há leitura por produto, que é a unidade do comprador ("kgCO₂e por kg de
  soja").
- A única "média" existente (summary da comparação) é simples e truncada.
- Sem cobertura visível, um número parcial parece completo.

## Oportunidades

- **Resumo executivo em segundos:** três números (emissão, remoção, líquido) e a
  intensidade no topo de cada nível.
- **Decisão:** hotspots mostram onde agir; ranking de talhões e fazendas mostra
  quem puxa o número para cima.
- **Venda:** o consolidado do projeto é o conteúdo natural do PDF e da página do QR.
- **Confiança:** cobertura e "desatualizado" sempre à vista.

## Redesign sugerido

Uma estrutura igual nos três níveis, para o usuário aprender uma vez:

1. **Filtros em uma linha:** safra (obrigatório, um período por vez) e, no produto,
   método de alocação.
2. **Faixa de cobertura:** "12 de 15 talhões com cálculo oficial · 86% da área ·
   2 desatualizados". Clique leva à lista do que falta.
3. **KPIs (4–5 cards):** emissão total, remoção, líquido (rotulado), intensidade,
   nota regenerativa.
4. **De onde vem a emissão:** barra horizontal empilhada por fonte (até 6 fontes +
   "outras").
5. **Quem compõe o número:** tabela das unidades de baixo (talhões na fazenda,
   fazendas no projeto), com barras dentro das células e ordenação por coluna.
   Botão "Comparar selecionados" leva para a comparação (feature 06).

### Fazenda (nova aba "Visão geral" no menu da fazenda)

```
Fazenda Boa Vista                                   Safra [25/26 ▾]   [Exportar]
─────────────────────────────────────────────────────────────────────────────────
 ▓▓▓▓▓▓▓▓▓▓▓▓▓░░  12 de 14 talhões com cálculo oficial · 91% da área · 1 desatualizado

┌ Emissão ───────┐ ┌ Remoção ───────┐ ┌ Líquido ───────┐ ┌ Intensidade ───┐ ┌ Regenerativo ┐
│ 4.820 tCO₂e    │ │ 1.210 tCO₂e/ano│ │ 3.610 tCO₂e    │ │ Soja 0,31      │ │ 68 · Bom     │
│ fóssil 3.900   │ │ +410 vs BAU    │ │ emissão−remoção│ │ Milho 0,22     │ │ pond. p/ área│
│ 1,9 tCO₂e/ha   │ │ 0,5 tCO₂e/ha/a │ │                │ │ kgCO₂e/kg      │ │              │
└────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘ └──────────────┘

De onde vem a emissão
 N₂O do solo      ██████████████████ 38%
 Fertilizantes    ████████████ 25%
 Diesel           ████████ 17%
 Calcário/ureia   █████ 11%
 Outras           ████ 9%

Talhões                               Área   Emissão    tCO₂e/ha   kgCO₂e/kg   Remoção   Nota
 T-03 Baixada       Soja              180    ████ 520   2,9        0,38        90        61
 T-01 Sede          Soja              220    ███ 410    1,9        0,29        150       72
 T-07 Rio           Milho             140    ██ 190     1,4        0,21        —         —   ← sem remoção
 …                                                             [Comparar selecionados]
```

### Produto (nova visão dentro do projeto)

```
Projeto Soja MT · Produto [Soja grão ▾]   Safra [25/26 ▾]   Alocação [Massa ▾]
─────────────────────────────────────────────────────────────────────────────────
 11 de 12 fazendas com cálculo oficial de soja · 94% da área

┌ Intensidade ───────┐ ┌ Produção ─────┐ ┌ Emissão alocada ┐ ┌ Área ─────────┐
│ 0,29 kgCO₂e/kg     │ │ 38.400 t      │ │ 11.140 tCO₂e    │ │ 12.100 ha     │
│ Σ emissão/Σ prod.  │ │               │ │                 │ │               │
└────────────────────┘ └───────────────┘ └─────────────────┘ └───────────────┘

Onde cada fazenda está  (kgCO₂e/kg)         faixa p25–p75 ▒▒  mediana │
 Faz. Sol Nascente   ●                          ▒▒▒▒▒│▒▒▒
 Faz. Boa Vista                 ●               ▒▒▒▒▒│▒▒▒
 Faz. Ipê                                ●      ▒▒▒▒▒│▒▒▒
 …                0,15           0,25          0,35         0,45
```

Soja grão usa o resultado da cultura; farelo e óleo usam a parcela alocada e só
somam com o mesmo método de alocação.

### Projeto (nova página "Visão geral", evolui a SHARED-01)

```
Projeto Soja MT 25/26                              Safra [25/26 ▾]   [Exportar] [PDF]
─────────────────────────────────────────────────────────────────────────────────
 Cobertura por módulo      Emissão ▓▓▓▓▓▓▓▓▓░ 92%   Remoção ▓▓▓▓▓░░░░░ 55%
                           Regenerativo ▓▓▓▓▓▓▓░░░ 70%   Biodiversidade ▓▓░░░░░░ 20%

KPIs: Emissão · Remoção · Líquido · Intensidade por produto · Nota regenerativa média

De onde vem a emissão (projeto)           Intensidade por produto
 N₂O do solo  ████████████ 36%             Soja grão   0,29 kgCO₂e/kg
 Fertilizante ████████ 27%                 Milho grão  0,20 kgCO₂e/kg
 …                                          Farelo soja 0,41 kgCO₂e/kg (massa)

Fazendas                        Área    Emissão     tCO₂e/ha   Remoção   Líquido   Regen.   Cobertura
 Faz. Boa Vista                 1.420   ████ 4.820  1,9        1.210     3.610     68       91%
 …                                                         [Comparar selecionados]
```

## Novos componentes

- **Barra de cobertura** (progress + texto), reusada nos três níveis e no PDF.
- **KPI card com linha de contexto** ("fóssil 3.900", "+410 vs BAU"): variação do
  `KpiCard` existente, não componente novo.
- **Barra empilhada horizontal de hotspots**, uma cor por fonte, no máximo 6 +
  "outras".
- **Tabela com barras nas células** e ordenação; primeira coluna fixa.
- **Dot plot com faixa p25–p75** para produto.
- **Seletor de safra** e de **método de alocação** como filtros de linha única.

## Melhorias no fluxo

- Do projeto para a fazenda para o talhão com um clique em cada linha (drill-down).
- Seleção na tabela vira comparação sem abrir o picker.
- Safra padrão = a mais recente com cálculo oficial.
- Talhão sem cálculo nunca vira zero: aparece "—" com motivo no tooltip.

## Microinterações

- Hover na barra de hotspot destaca a mesma fonte na tabela.
- Hover numa linha da tabela mostra o valor exato e a data do cálculo.
- Troca de safra mantém a rolagem e anima só os números.

## Impacto para o usuário

- Consultor vê o projeto inteiro em uma tela e acha o talhão problemático sem
  abrir 20 cálculos.
- Cliente e comprador recebem o número na unidade que usam (kgCO₂e/kg de produto).
- O PDF e o QR ganham conteúdo pronto.

## Prioridade

- **Alta:** regras de soma no backend (endpoint único); visão da fazenda; visão do
  projeto com KPIs, cobertura e tabela de fazendas.
- **Média:** hotspots; visão por produto (grão); ranking; drill-down.
- **Baixa:** produto derivado com alocação; adicionalidade de remoção; tendência
  contra safra anterior; incerteza.

## Complexidade

- **Baixa:** barra de cobertura; tabela com barras; reuso de `KpiCard`.
- **Média:** endpoint de consolidado com regras por módulo; hotspots por fonte a
  partir do JSON de resultado; filtro de safra.
- **Alta:** remoção em absoluto (área do talhão, talhão nulo); produto derivado com
  alocação; depende do cálculo oficial (feature 0).
