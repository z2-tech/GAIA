# 01 · Entendimento

## O pedido

Henrique, 30/09: por talhão já existem os módulos e o resultado de cada cálculo.
Falta ver isso **por fazenda, por produto e por projeto**: o que é o consolidado e
quais dados vale trazer.

Na reunião de 29/09: Henrique queria "sempre o consolidado da fazenda" [15:12];
Paulo, para a página do QR, "no projeto, uma média das fazendas" [38:20].

## O que existe hoje

Caminhos: `A` = `gaia-api`, `W` = `gaia-web/src`.

### Resultado por talhão (o que será somado)

| Módulo | Tela | Números principais | Unidade |
|---|---|---|---|
| Emissão | `W/features/carbon-emission/result/lca-result.tsx` | Fóssil, biogênico, remoção, líquido; por fase (agrícola, MUT, transporte, processamento); alocação massa/energia/econômica; uma aba por produto | kgCO₂e/kg de produto ou colhido |
| Remoção | `W/features/carbon-removal/calculation/...` | Estoque de C médio, ganho médio anual, BAU × projeto | tC/ha, tCO₂e/ha, t/ha/ano |
| Regenerativo | `W/features/regenerative/dashboard/regenerative-score.tsx` | Nota geral e 5 seções | 0–100 %; Bom ≥65, Atenção ≥40, Crítico |
| Biodiversidade | rota de **fazenda**, sem dashboard ("em construção") | score 0–100 no backend | — |

### Agregado que existe

- Página do projeto: cards de fazenda com % de preenchimento
  (`W/features/project/lib/farm-card-model.ts:4-12`).
- Página da fazenda: mapa, detalhes, lista de talhões com % de preenchimento. O
  menu da fazenda só tem "Dados gerais" (`W/features/farm/types/menu.ts:12`).
- Backend: completude por talhão, fazenda e projeto (`A/farms/services.py:161-343`,
  `A/projects/services.py:31-68`).
- A API de comparação devolve `summary {count, min, max, avg}` com **média simples**
  e corta em 20 sem avisar (`A/comparison/services.py:336-381`). Não serve como
  consolidado.
- SHARED-01 (`docs/tasks/shared/shared-01-visao-geral-projeto.md`) propõe
  `GET /projects/{id}/overview/`, mas só com completude.
- Design (`docs/agents/design/screens.md`): **não há tela de visão geral do projeto,
  dashboard de fazenda nem consolidado** no Penpot.

### O que é "produto" hoje

- `LcaProduct` (`A/lca/models.py:125`): identificado pelo **nome** (único). Seed com
  4 derivados: farelo de soja, óleo de soja refinado, farinha de trigo, farelo de
  trigo. **Soja grão não é produto**, é a cultura.
- Grão = `LcaProjectCulture.crop` (SOYBEAN, MAIZE…) + `result.total_agro`, em
  kgCO₂e/kg colhido.
- Derivado = `result.total[<nome>][mass|energetic|economic]`, chaveado por nome.
  Mais seguro agrupar por `product_id` via `LcaProjectCultureProductInput`.
- Absoluto: kgCO₂e/kg × `harvested_amount_t` = tCO₂e (fórmula já usada em
  `A/comparison/services.py:67-72`).

## Regras de soma por módulo (proposta)

| Módulo | Absoluto por talhão | Fazenda / projeto | Intensidade | Observações |
|---|---|---|---|---|
| Emissão | kgCO₂e/kg × massa colhida → tCO₂e, separado em fóssil, biogênico, MUT | Σ tCO₂e | kgCO₂e/kg = Σ tCO₂e / Σ t colhidas, **por cultura** (não misturar soja com milho) | tCO₂e/ha = Σ tCO₂e / Σ ha dos talhões com cálculo |
| Emissão por produto derivado | parcela alocada ao produto × massa do produto | Σ só com o **mesmo método de alocação** | Σ / Σ | `global_yield` entra na massa do derivado |
| Remoção | ganho anual (tCO₂e/ha/ano) × `Plot.area_ha` → tCO₂e/ano | Σ tCO₂e/ano | tCO₂e/ha/ano = Σ / Σ ha | `RothcCalculation` não tem área e `plot` pode ser nulo; BAU e projeto somados à parte; adicionalidade = Σ(projeto − BAU); mesma janela de anos |
| Regenerativo | nota do talhão | média **ponderada por área** | — | Faixa (Bom/Atenção/Crítico) da média e distribuição |
| Biodiversidade | nota da fazenda | projeto: média ponderada pela área da fazenda | — | Não existe por talhão na UI |
| Todos | — | **Cobertura:** talhões com cálculo oficial / total, e % da área | — | Talhão sem cálculo não vira zero |

## Bloqueios e riscos

1. **Cálculo oficial (feature 0).** Sem ele, simulações entram na soma.
2. **Período.** Somar safras diferentes dá número sem sentido. Precisa de filtro de
   safra ou regra "um período por vez" (pergunta 5 da feature 0).
3. **Área da remoção.** RothC é por ha e não guarda área; talhão nulo não soma.
4. **Divergência no delta RothC:** a comparação usa último mês projeto − último mês
   BAU (`A/comparison/selectors.py:136-144`); o serviço usa diferença das médias
   (`A/rothc/services.py:1807-1814`). Escolher uma antes de consolidar.
5. **Unidade de combustível** ignorada no cálculo (ver feature 01): o consolidado
   herdaria o erro.
6. **Performance:** somar dezenas de talhões pede um endpoint que agrega no backend,
   não N chamadas do front.
