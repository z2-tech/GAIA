# Referência dos módulos: Emissão, Remoção, Regenerativo, Biodiversidade

Base comum para todas as features em `TODO/`. Cada feature tem um
`06-por-modulo.md` que aplica isto ao seu caso. Regra: **toda feature trata os
quatro módulos**, não só a Emissão.

Caminhos relativos a `gaia-api/` salvo indicação. Levantado em 30/09/2026.

## Visão rápida

| | Emissão (LCA) | Remoção (RothC) | Regenerativo | Biodiversidade (BAT) |
|---|---|---|---|---|
| O que é | Pegada de carbono da produção | Estimativa modelada de carbono no solo | Índice interno de práticas | Autoavaliação de práticas |
| Unidade do resultado | kgCO₂e/kg de produto; fóssil, biogênico, MUT | tC/ha e tCO₂e/ha; ganho anual; BAU × projeto | 0–100 % | 0–100 |
| Escopo no banco | Cultura × safra, ligado a talhão (sem FK) | Talhão (pode ser nulo) | `project_farm` + talhão opcional; `is_primary` por fazenda | Talhão obrigatório; sem primário |
| Resultado guardado? | Sim (JSON), sobrescrito ao recalcular | Sim, mensal; apagado e recriado ao editar | **Não**, calculado na hora | Score sim; seções recalculadas |
| Norma de referência | ISO 14067, GHG Protocol Product | GHG Protocol LSR, VM0042/VMD0053, ISO 14064-2 | Sem norma; frameworks (Embrapa PARS, SAI FSA, regenagri, Regen10) | Sem norma; BPT, TNFD |
| Pode virar claim? | Pegada autodeclarada, com avisos | **Não é crédito**, não abate pegada, não sustenta "neutro" | **Não é certificação**; evitar "regenerativo" sem qualificador | Não mede espécies; não é avaliação TNFD |

## Remoção (RothC)

### Entradas

| Campo | Rótulo na tela | Unidade |
|---|---|---|
| `soc_tons_ha` | SOC | tC/ha |
| `clay_content_percent` | Argila | % |
| `depth_soil_layer_cm` | Profundidade da camada | cm |
| latitude | (vem da fazenda) | ° |
| Janela de modelagem | Mês/ano inicial e final | — (**não é gravada**; reconstruída dos resultados) |
| Por cenário (BAU e projeto) | Tipo de entrada (biomassa ou produtividade + cultura), cultura anual/perene | — |
| Ciclos de cultura | Cultura, produtividade (t/ha fresca), início, fim | t/ha |
| Compostos | Ano, mês, C orgânico, material | kg C/ha |
| Mensal | DPM/RPM (6 tipos), solo coberto (sim/não), biomassa | kg/ha/mês |
| Clima | Open-Meteo: temperatura média e chuva mensais; meses futuros = média climatológica | °C, mm |

`rothc/models.py:40-280`, `rothc/serializers.py:189-283`, `openmeteo/services.py:46-99`.

### Saídas

- Mensal (`RothcMonthlyResult`): pools, **total_oc** (tC/ha), CO₂, perdas, fatores.
- Resumo (`rothc/services.py:1633-1731`): **estoque de C = média da janela** (não o
  estoque no fim), ganho médio anual (último − primeiro / anos), taxa de adubação
  orgânica, biomassa anual, % de meses com solo coberto, culturas.
- Delta projeto − BAU (`services.py:1807-1814`): existe, **não aparece no dashboard**.
- Sem incerteza. Sem área no cálculo (precisa de `Plot.area_ha` para tCO₂e).

### O que as normas pedem

- **GHG Protocol LSR** (vigente em 2027): remoções separadas das emissões, nunca
  abatidas por padrão; só reportáveis com rastreabilidade até a área, dado
  primário, monitoramento contínuo e tratamento de reversão.
  https://ghgprotocol.org/blog/land-sector-and-removals-standard-what-you-need-know
- **VM0042 v2.2 / VMD0053:** modelo validado para a prática e região; BAU
  reavaliado a cada 5 anos; incerteza deduzida; buffer de não permanência; SOC
  medido por método aceito. https://verra.org/methodologies/vm0042-improved-agricultural-land-management-v2-2/
- **ISO 14064-2:** uso pretendido, fontes e sumidouros, cenário de linha de base,
  plano de monitoramento, incerteza.
- **O que o verificador quer ver:** fonte e período do clima; argila; SOC inicial
  com data, laboratório, método e profundidade; ciclos, resíduos, composto;
  definição do BAU; versão do modelo; calibração; janela.

### Aviso padrão (PDF, página do QR)

"Estimativa modelada (RothC), não verificada por terceira parte. Não é crédito de
carbono, não é remoção reportável sob o GHG Protocol sem monitoramento contínuo e
não sustenta alegação de neutralidade. Sem dedução de incerteza nem reserva para
reversão. O carbono pode ser perdido se o manejo mudar."

## Regenerativo

### Dados

- Contexto: manejo (agricultura, agricultura + pecuária, pecuária), clima e solo
  (5 opções), chuva (3 faixas), irrigação.
- **5 seções, 28 indicadores, 107 pontos** (`regenerative/fixtures/seed_indicators.sql`):

| Seção | Indicadores | Pontos |
|---|---|---|
| Comunidade | 1 | 3 |
| Produção Agrícola Regenerativa | 11 (cobertura do solo, plantio direto, rotação, policultivo, perenes, fertilização natural, redução de sintéticos, proteção natural, redução de agrotóxicos, irrigação, análise de solo) | 51 |
| Manejo da Paisagem | 5 (biodiversidade, faixas de corpos hídricos, cercas vivas, habitat natural, reflorestamento) | 18 |
| Impacto Ambiental | 4 (água, plástico, captação de chuva, energia renovável) | 13 |
| Manejo Pecuário Regenerativo | 7 | 22 |

- Nota = pontos obtidos / disponíveis. Faixas: **Bom ≥ 65 %, Atenção ≥ 40 %,
  Crítico abaixo**; aplicadas ao geral, a cada seção e a cada indicador.
- **Problema:** o denominador sempre soma os 107 pontos. Uma fazenda só de lavoura
  tem os 22 pontos de pecuária contra ela (`regenerative/selectors.py:126-135`).
- Respostas não obrigatórias; resultado não é guardado (muda se mudarem os pesos).

### Referências

- **Embrapa PARS (2025):** 6 dimensões, 124 indicadores ponderados. Melhor
  referência nacional para comparar. https://www.embrapa.br/en/busca-de-publicacoes/-/publicacao/1177864/protocolo-padrao-de-agricultura-regenerativa-sustentavel-no-brasil
- **SAI FSA:** níveis Bronze/Silver/Gold; **autoavaliação não permite claim**; usa
  "verificado", nunca "certificado".
  https://saiplatform.org/wp-content/uploads/documents/8613/fsa-statement-and-claims-guidance-mar2020.pdf
- **regenagri:** mínimo de 65 % ajustado ao contexto; exige melhoria anual.
- **ROC:** níveis por % da área ou receita, não média de notas.
- **Regen10, OP2B:** foco em resultados (solo, água, biodiversidade, clima), não
  só práticas.
- **Claims:** UE (EmpCo) proíbe selos autodeclarados e claims genéricos desde
  27/09/2026; CONAR Anexo U pede dado verificável e acessível.

### Aviso padrão

"Índice interno GAIA (versão X), autodeclarado. Não é certificação nem selo."
Preferir "X % da área na faixa Bom do índice GAIA v1, em [data]" a "fazenda
regenerativa".

## Biodiversidade (BAT)

### Dados

- **43 perguntas sim/não**, todas com peso 1 (`biodiversity/migrations/0002_seed_bat_questions.py`):

| Área | Perguntas |
|---|---|
| Área de produção | 13 |
| Pequena área não produtiva | 12 |
| Grande área não produtiva | 18 |

- Score geral = sim / **respondidas** × 100; score da seção = sim / **total da
  seção** × 100. Com respostas faltando, os dois não batem.
- Classificação: baixa até 33, média até 66, alta acima.
- Escopo: **talhão obrigatório** na API; a UI está na fazenda e ainda é
  "em construção". Sem primário; várias avaliações podem coexistir.

### Referências

- **Biodiversity Performance Tool:** avalia **potencial** para biodiversidade, não
  espécies; mostra pontos fortes e melhorias; alimenta um plano de ação.
  https://www.biodiversity-performance.org/
- **TNFD (agro):** questionário de práticas não substitui a etapa de localização
  (área sensível, georreferência). https://tnfd.global/publication/additional-sector-guidance-food-and-agriculture/

### Aviso padrão

"Autoavaliação de práticas que indica potencial de biodiversidade. Não mede
espécies nem impacto e não é uma avaliação TNFD."

## Achados de código (fora das features, registrar)

| Módulo | Problema | Onde |
|---|---|---|
| Emissão | Unidade de combustível ignorada no cálculo | `lca/calculations/fuel.py:88-98` |
| Remoção | Janela de modelagem não gravada | `rothc/serializers.py:277-280` |
| Remoção | Delta BAU × projeto diferente na comparação | `comparison/selectors.py:136` vs `rothc/services.py:1807` |
| Regenerativo | Pecuária entra no denominador de fazenda só de lavoura | `regenerative/selectors.py:126-135` |
| Biodiversidade | Denominador do geral ≠ das seções | `biodiversity/services.py:35-48` vs `:170-216` |
| Biodiversidade | Auditor pode criar e cancelar | `biodiversity/views.py:105-106`, `:225-226` |
