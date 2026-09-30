# 06 · Comparação por módulo

Complementa o [03](03-analise-produto.md), que detalhou o modo ranking da Emissão.
Dados em [../modulos-referencia.md](../modulos-referencia.md).

A regra de cor vale para todos: até 4 itens, uma cor por item (modo detalhe); de 5
a 20, cor só para os destacados (até 3) e o resto em cinza. Faixas de nota (Bom,
Atenção, Crítico) usam as cores de status **com o texto ao lado**, nunca só cor.

## Emissão

Ver 03: ranking por kgCO₂e/kg, tCO₂e/ha ou total; composição por fonte (100 %);
tabela com fóssil, N₂O, remoção.

## Remoção (RothC)

**Modo ranking**

```
Comparação · Remoção                  Métrica [Ganho anual do projeto ▾]  ( por ha | total )
─────────────────────────────────────────────────────────────────────────────────────
                    BAU ●───● projeto   (tCO₂e/ha/ano)
 T-01 Sede          0,2 ●────────────● 1,1        +0,9
 T-05 Alto  ◆       0,3 ●──────────● 0,9          +0,6   (destaque)
 T-03 Baixada       0,1 ●──────● 0,5              +0,4
 T-09 Rio           ⚠ janela diferente (2025–2030)
 …
Tabela: talhão · SOC inicial · argila · janela · estoque médio BAU/proj · diferença ·
        ganho anual · solo coberto % · biomassa · compostos
```

- **Gráfico:** dumbbell BAU → projeto, ordenado pela diferença. O gráfico de linha
  (estoque mês a mês) fica só no modo detalhe.
- **Métricas:** ganho anual do projeto, diferença contra BAU, estoque médio,
  remoção total (precisa de área).
- **Aviso** quando os itens têm janelas diferentes (comparação injusta).
- Corrigir antes: a comparação calcula a diferença BAU × projeto de outro jeito que
  a tela da Remoção.

## Regenerativo

**Modo ranking**

```
Comparação · Regenerativo                         Métrica [Nota geral ▾]
─────────────────────────────────────────────────────────────────────────────────────
               Crítico      │ Atenção  │ Bom
 Faz. Sol          ███████████████████████████████  82% Bom
 Faz. Boa Vista ◆  ██████████████████████████  71% Bom
 Faz. Ipê          ████████████████  48% Atenção     (Agric. + Pecuária)
 Faz. Pedra        ██████████  33% Crítico
Tabela (seções × fazendas, célula = % + faixa escrita):
 Fazenda       Manejo          Produção  Paisagem  Impacto  Comunidade  Pecuária  Geral
 Faz. Sol      Agricultura     88 Bom    75 Bom    62 Aten. 100 Bom     —         82 Bom
 …                                            [Abrir indicadores ▸]
```

- **Gráfico:** barra da nota com faixas ao fundo, ordenada.
- **Tabela:** seções nas colunas; expandir mostra os 28 indicadores.
- Coluna **Manejo**, porque o denominador de pecuária pune fazendas só de lavoura
  (até corrigir o cálculo).
- **Evolução:** comparar a mesma fazenda em datas diferentes (antes × depois) é o
  uso que frameworks como regenagri pedem (melhoria anual). Slope chart.

## Biodiversidade

- **Hoje não há tela de comparação** de Biodiversidade no front (a API já aceita o
  módulo).
- **Modo ranking:** barra da nota com faixas baixa/média/alta; tabela com as 3 áreas
  e respondidas/total.
- Perguntas com "Não" mais comuns entre os itens (onde melhorar).

## Comparar módulos juntos?

Hoje cada comparação é de um módulo. Para "como as fazendas do projeto se saem em
tudo", a tabela de fazendas do consolidado (feature 05) já traz uma coluna por
módulo. Proposta: não criar comparação multimódulo; usar a tabela do consolidado.
