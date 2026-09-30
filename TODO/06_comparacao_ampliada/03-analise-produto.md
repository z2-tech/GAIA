# 03 · Análise de produto e proposta de design

Formato da skill `business-product-strategist`. Wireframes em texto; o desenho
final vai para o Penpot.

## Avaliação geral

A comparação de hoje é boa para 2–4 itens: colunas lado a lado, uma cor por item,
detalhe por fase. É o formato certo para "estas duas fazendas, em detalhe". Não é o
formato certo para "como as 12 fazendas do projeto se comparam", que é o uso que o
Paulo descreveu. Esticar o formato atual até 20 produz 20 colunas finas, cores
repetidas e 40 chamadas de rede.

## Problemas encontrados

- Cores repetem a partir do 5º item: identidade por cor deixa de funcionar.
- Colunas por item não cabem na tela com mais de ~5.
- Gráfico de linha com 20 séries (Remoção) vira borrão.
- Montar a seleção é lento: um talhão por vez no picker.
- A média do resumo é simples e o corte em 20 é silencioso.
- Sem faixa de referência, não se sabe se um valor é bom ou ruim.

## Oportunidades

- **Responder "quem puxa o número" em segundos:** ranking ordenado.
- **Menos cliques:** "comparar todas as fazendas do projeto" em um clique.
- **Contexto:** faixa p25–p75 e mediana mostram o normal do grupo.
- **Ponte com o consolidado:** a tabela de fazendas do projeto (feature 05) é a
  mesma tabela do modo ranking.

## Redesign sugerido

### Dois modos, escolhidos pelo número de itens

| Itens | Modo | O que muda |
|---|---|---|
| 1–4 | **Detalhe** | A tela de hoje: colunas por item, uma cor por item, fases, alocação |
| 5–20 | **Ranking** | Itens nas linhas, uma métrica por vez, cor só para destaque |

A troca é automática, com um controle segmentado "Ranking | Detalhe" visível: em
Detalhe com mais de 4, o usuário escolhe quais 4 ver.

### Modo ranking (Emissão, 12 fazendas)

```
Comparação · Emissão                              12 de 20   [+ Adicionar]  [Exportar]
Métrica [Emissão por kg ▾]  Normalizar ( por ha | por kg | total )  Safra [25/26 ▾]
─────────────────────────────────────────────────────────────────────────────────────
                                           faixa do grupo p25–p75 ▒▒   mediana │
 Faz. Ipê             ████████████████████████████████████  0,44   ▒▒▒▒▒▒│▒▒▒
 Faz. Boa Vista  ◆    ██████████████████████████████  0,38 (destaque, cor 1)
 Faz. Pedra           ███████████████████████████  0,35
 Faz. Aurora     ◆    ████████████████████████  0,31 (destaque, cor 2)
 …                    (demais em cinza, ordenados)
 Faz. Sol Nascente    ████████████  0,18
                      0           0,1         0,2         0,3         0,4    kgCO₂e/kg

┌ Tabela ───────────────────────────────────────────────────────────────────────────┐
│ ☐ Fazenda ▸        Área   kgCO₂e/kg ▾  tCO₂e/ha   Fóssil   N₂O solo   Remoção  Status│
│ ☑ Faz. Ipê         620    ███ 0,44     2,6        ██ 61%   █ 24%     —        ● desat.│
│ ☑ Faz. Boa Vista   1.420  ██▌ 0,38     1,9        ██ 55%   █ 30%     1.210           │
│ ☐ …                                                                               │
│                                   [Ver 2 selecionados em detalhe]                 │
└───────────────────────────────────────────────────────────────────────────────────┘
 Composição da emissão (100%)  ▸ aba ao lado do ranking
```

- **Ranking:** barra horizontal ordenada, uma cor neutra; itens destacados (até 3)
  na cor de identidade, com marcador ◆ também na tabela.
- **Faixa de referência:** p25–p75 e mediana do grupo selecionado; opcionalmente de
  todos os cálculos acessíveis (benchmark, só com ≥5).
- **Tabela:** primeira coluna fixa, ordenação por coluna, barras nas células,
  "—" para ausente (nunca zero), selo de desatualizado e de simulação.
- **Abas do gráfico:** Ranking · Composição (100% empilhada por fonte) · Dispersão
  por item (dot plot).
- **Selecionar até 4 linhas** abre o modo Detalhe só com elas.

### Remoção e Regenerativo no modo ranking

- **Remoção:** dumbbell BAU ● ─── ● Projeto por item, ordenado pelo ganho; troca do
  gráfico de linha (que só fica no Detalhe).
- **Regenerativo:** barra da nota com faixas Crítico / Atenção / Bom ao fundo,
  ordenada; tabela com as 5 seções como colunas, em escala de cor.

### Picker (seleção)

```
Adicionar à comparação                                             12 de 20
┌ Projetos ─────────┐┌ Fazendas ───────────────┐┌ Talhões / cálculos ─────────┐
│ ● Soja MT 25/26   ││ [Selecionar todas (12)] ││ [Selecionar todos (3)]      │
│   Milho GO        ││ ☑ Boa Vista             ││ ☑ T-01 Sede · Soja · oficial │
│                   ││ ☑ Aurora                ││ ☐ T-01 Sede · Soja · simul.  │
└───────────────────┘└─────────────────────────┘└──────────────────────────────┘
 Nível da comparação ( Talhão | Fazenda | Projeto )     [Busca…]      [Comparar 12]
```

- **Nível escolhido antes:** comparar talhões, fazendas ou projetos (não misturar,
  a confirmar). Comparar fazendas usa o consolidado da fazenda (feature 05).
- **Seleção em lote:** "Selecionar todas" por coluna.
- **Chips** dos selecionados abaixo, removíveis; contador N de 20.
- **Padrão:** só cálculos oficiais; simulações aparecem com selo se o produto
  permitir.

### Celular

Lista ranqueada de uma métrica, sem tabela; Detalhe limitado a 2 itens.

## Novos componentes

- **Controle segmentado** Ranking | Detalhe.
- **Barra de ranking horizontal** com faixa p25–p75 e linha de mediana.
- **Tabela de comparação** (primeira coluna fixa, barras nas células, ordenação,
  seleção por checkbox). Reusa `@/components/table` (TanStack).
- **Dumbbell** para BAU × projeto.
- **Barra com faixas** para nota.
- **Picker com seleção em lote** e escolha de nível.

## Melhorias no fluxo

- Do consolidado do projeto: "Comparar selecionados" já abre o ranking com as
  fazendas marcadas.
- Um clique para "todas as fazendas do projeto".
- Estado na URL como hoje (`?items=`), mas com nível e filtros para links curtos
  (`?level=farm&project=…&season=…`) quando a seleção for "tudo do projeto".
- Aviso explícito quando o filtro passaria de 20 (hoje corta calado).

## Microinterações

- Hover numa barra destaca a linha da tabela e vice-versa.
- Clicar no nome no gráfico alterna o destaque (até 3).
- Troca de métrica reordena as barras com transição curta (desligada com
  `prefers-reduced-motion`).

## Impacto para o usuário

- O consultor enxerga o projeto inteiro e acha o fora da curva de primeira.
- O detalhe continua disponível para os 2–4 que interessam.
- Menos chamadas de rede: tela mais rápida.

## Prioridade

- **Alta:** front usando `POST /comparison/`; limite 20; modo ranking de Emissão
  (barra + tabela); seleção em lote; destaque.
- **Média:** Remoção (dumbbell) e Regenerativo (faixas) no ranking; faixa de
  referência; composição 100%; aviso de corte.
- **Baixa:** celular; export da comparação; benchmark de todos os acessíveis.

## Complexidade

- **Baixa:** subir o limite; controle segmentado; destaque.
- **Média:** migrar o front para a API genérica; picker em lote; tabela com
  ordenação e barras; ranking com faixa.
- **Alta:** comparar fazendas/projetos agregados (depende do consolidado, feature
  05); estender `details` da API para fases e produto da Emissão; corrigir N+1 e
  delta da Remoção.
