# Referências de domínio

Inventário dos artefatos usados como referência funcional e metodológica pelos
módulos de sustentabilidade da GAIA.

## Integridade

### Planilhas funcionais

| Arquivo | Tamanho | SHA-256 |
|---------|---------|---------|
| `Biodiversity Assessment Tool Prototype_Final.xlsx` | 87 KB | `93a64f94057d9563159993ef051f91052663b1cb1a0bc407b2e9f2cdb8f2e21e` |
| `EIQ_Final.xlsx` | 744 KB | `7ceeb71fa3ab84f32f6098581db43983d6b94c76c2c5abf859ac9b9eba536206` |
| `STIR_calculadora_metric_v4.xlsx` | 20 KB | `5e75f4a600521e424fe0eee08ad8415f05410b72b6ad35fc2f85eef7e37f2398` |
| `RothC_Model_short (com dados coletados).xlsx` | 19,5 MB | `927fbf2d0639b287fcc3b76ced9da590c97edc486816ccb986ed504eabfa5f57` |

### Fontes científicas

| Arquivo | Tamanho | SHA-256 | Licença |
|---------|---------|---------|---------|
| `rothc/RothC_guide_WIN.pdf` | 971 KB | `fd44cfb2f973ef234b1e7d5341ced2a1aaa500ce26044b12430d1f6c181c5a8a` | Proprietário (exe); equações publicadas |
| `rothc/RothC_Code-v2.1.1.zip` | 658 KB | `728ef1320f8a660b14e12648fbf3d4d20917021016a24c46f5cde5c7609b9966` | Apache 2.0 |
| `olca/olca-app-master.zip` | 7,0 MB | `41c63aa3db22fa4cd7b6d505f5cdc36516083286c86bbffbf055fc6d15113bfb` | MPL 2.0 |
| `fullcam/fullcam-api-documentationv1-2.pdf` | 1,3 MB | `25aef06fe930d79e453f5ee804a2b673918d118b6e2af80192c55372ede04182` | CC BY 4.0 |
| `fao/fao-soils-portal-data-hub.html` | 128 KB | `ff8500767f80329cd73aec39a29cb57fa05826ada8b37d677b649373d746b30c` | FAO open data |

---

## BAT — Biodiversity Assessment Tool

`Biodiversity Assessment Tool Prototype_Final.xlsx`

- 43 questões em 3 áreas: produção (1–13), pequena área não produtiva (14–25),
  grande área não produtiva (26–43).
- Abas de entrada, `Pontuação`, `Pontuação_referencia` e `Resultdo`.
- Respostas `Sim` → pesos de 1 ou 2 pontos. Resultado por área e por grupo.
- Referência funcional; autoria, versão metodológica e licença pendentes.

## EIQ — Environmental Impact Quotient

`EIQ_Final.xlsx`

- Base `EIQ values_August 2025`: 631 ingredientes ativos, CAS, tipo, EIQ final,
  componentes worker/consumer/ecological.
- NYS IPM/Cornell como origem do método. Critérios de toxicidade, persistência,
  sistemicidade, lixiviação e runoff.
- `Calculator` com até 8 produtos em kg/ha, converte para lb/ac e calcula
  Field Use EIQ.
- Não fornece fatores de emissão nem valida LCA.

## STIR — Soil Tillage Intensity Rating

`STIR_calculadora_metric_v4.xlsx`

- Abas `Calculadora`, `Resultado`, `Biblioteca` e `Ajuda`.
- Biblioteca PT-BR com 9 implementos: tillage type, distúrbio, profundidade.
- `STIR = (velocidade_mph × 0,5) × (tillage_type × 3,25) × profundidade_in × distúrbio`.
- Classificação: baixo `≤30`, médio `31–80`, alto `>80`.
- Cita NRCS/RUSLE2; thresholds precisam de confirmação.

## RothC — template interno

`RothC_Model_short (com dados coletados).xlsx`

- Abas `Data` e `Tables`; `Model structure` e `Graphic` vazias.
- Passo mensal para DPM/RPM/BIO/HUM/IOM, decomposição e emissão.
- k: DPM=10, RPM=0,3, BIO=0,66, HUM=0,02. Modificadores T, umidade/TSMD e cover.
- 1.440 meses com ano e mês; colunas de entrada (chuva, evaporação, temperatura,
  argila, resíduos, FYM) estão vazias.
- Criado por João Victor Marcal Fernandes, modificado por Paulo Roberto da Rocha
  (2024–2025). Sem proveniência Rothamsted.

---

## RothC — guia oficial (Rothamsted Research)

`rothc/RothC_guide_WIN.pdf`

- **Título**: RothC-26.3 — Model description and users guide (Windows version)
- **Autores**: K. Coleman & D.S. Jenkinson, Rothamsted Research, atualizado Jun/2014
- **Licença**: executável Windows proprietário; equações matemáticas publicadas em
  literatura peer-reviewed (Jenkinson 1990, Coleman & Jenkinson 2014)

### O que contém

- **Constantes k**: DPM=10, RPM=0,3, BIO=0,66, HUM=0,02 (mesmas da planilha interna)
- **Modificador de temperatura**: `RM_TMP = 47,91 / (1 + exp(106,06 / (T + 18,27)))`
- **Balanço hídrico TSMD**: acumula déficit mensal `chuva - 0,75 × evap_bandeja`,
  capped em `-(20 + 1,3×argila% - 0,01×argila%²)`; fator b interpola entre 0,2 e 1,0
- **Fator de cobertura**: vegetado=0,6, solo nu=1,0
- **Partição CO₂/(BIO+HUM)**: `X = 1,67 × (1,85 + 1,60×exp(-0,0786×argila%))`,
  fração CO₂ = X/(X+1), fração BIO+HUM = 1/(X+1); BIO=46%, HUM=54%
- **Relações DPM/RPM**: culturas agrícolas=1,44, pastagem melhorada=1,44,
  pastagem não melhorada=0,67, arbustivo=0,67, decidual=0,25, tropical=0,25
- **FYM split**: 49% DPM, 49% RPM, 2% HUM
- **IOM**: constante durante a simulação; estimável por `0,049 × COS¹·¹³⁹`
  (Falloon 1998) quando sem radiocarbono
- **Spin-up**: cicla os primeiros 12 meses de clima até `|ΔCOS| < 10⁻⁶ tC/ha`
- **Validação**: Hoosfield Continuous Barley (1852+); 3 tratamentos modelados,
  acordo qualitativo. Sem golden vector preenchido.

### O que NÃO contém

- Código-fonte executável (só .exe com senha)
- Vetor dourado com valores intermediários mês a mês
- Métricas formais de acurácia (RMSE, R²)
- Sub-solo, solos hidromórficos ou vulcânicos
- Curva de ¹⁴C atmosférico além de 2013
- Modo inverso detalhado

---

## RothC — implementação canônica Fortran (Rothamsted Models)

`rothc/RothC_Code-v2.1.1.zip`

- **Fonte**: https://github.com/Rothamsted-Models/RothC_Code, commit `03c7b3f`
- **Versão**: v2.1.0, ago/2025
- **Licença**: Apache 2.0 — código aberto, redistribuível
- **Autores**: Kevin Coleman, Jonah Prout; financiado por BBSRC UK

### Conteúdo do zip

| Arquivo | Função |
|---------|--------|
| `RothC.for` | Subrotinas canônicas: `RothC`, `decomp`, `RMF_Tmp`, `RMF_Moist`, `RMF_PC` |
| `Shell.for` | Driver: leitura de input, spin-up, loop mensal, escrita de output |
| `RothC_input.dat` | 70 anos de dados de exemplo (Rothamsted, 23,4% argila, 23 cm) |
| `year_results.out` | Snapshots anuais de dezembro (1939–2007) — **vetor dourado de 70 anos** |
| `month_results.out` | Saída mensal completa incluindo equilíbrio pós-spin-up |
| `RothC_description.pdf` | Documentação resumida (27 pp.) |
| `README.md` | Instruções de compilação (gfortran) e execução |
| `Revision_History.md` | Changelog v1.0.0 → v2.1.0 |

### Golden vectors disponíveis

| Checkpoint | DPM | RPM | BIO | HUM | SOC total | Fonte |
|---|---|---|---|---|---|---|
| Equilíbrio (após ~1743 anos) | 0,1606 | 5,8208 | 0,8717 | 32,6202 | 42,4774 | `year_results.out:3` |
| Dez/1939 | 0,0796 | 5,5522 | 0,8402 | 32,5776 | 42,0538 | `year_results.out:4` |
| Ago/1939 (pós-input 1,46 tC/ha) | 0,8749 | 5,9661 | 0,8165 | 32,5549 | — | `month_results.out` |

**Estes 70 anos de snapshots anuais são o teste de conformidade**: se a
implementação Python da GAIA reproduzir esses valores com tolerância ≤ 10⁻⁴
tC/ha, ela é um RothC-26.3 correto.

### Diferenças críticas identificadas vs GAIA

| Achado | Impacto |
|--------|---------|
| Sem spin-up; pools iniciais = % fixa do SOC | Inicialização incorreta |
| IOM recalculado todo mês por `0.049×SOC¹·¹³⁹` | Deveria ser constante |
| Evapotranspiração usa Q0/ET0 computado (Penman-Monteith) | Deveria usar evaporação de bandeja como input |
| Balanço hídrico simplificado vs SMD acumulado canônico | Dinâmica de umidade diferente |
| Termo `0.02 × fym_input` sem proveniência | Não existe no Fortran canônico |
| Falta guarda `T < -5°C → RM_TMP = 0` | Só relevante em clima frio |
| Plant input usa ratio fixo, não frações mensais | Equivalente se ratio=1.44, mas menos flexível |

---

## openLCA — referência de domínio LCA (GreenDelta)

`olca/olca-app-master.zip`

- **Fonte**: https://github.com/GreenDelta/olca-app
- **Versão**: 2.7.0-SNAPSHOT, Java 25 + Eclipse RCP
- **Licença**: MPL 2.0

### Relevância para GAIA

openLCA é a aplicação LCA open-source de referência mundial. Seu modelo de
domínio é canônico para design de software de sustentabilidade:

- **Entidades**: Flows, Processes, Product Systems, Impact Categories,
  Characterization Factors, Units, Flow Properties, Locations, EPDs
- **Avaliação de impacto (LCIA)**: fatores de caracterização com incerteza,
  regionalização via GeoJSON, normalização/ponderação
- **Formatos**: JSON-LD (nativo), ILCD, EcoSpold 1/2, SimaPro CSV, openEPD
- **Bancos de dados**: ecoinvent, ELCD, GaBi, Agribalyse, PSILCA, EXIOBASE
- **API de colaboração**: Git-based repository sync via Collaboration Server

### Uso na GAIA

- **Referência de arquitetura de domínio**: o schema JSON-LD do openLCA
  (`olca-schema`) é o padrão aberto para modelagem LCA. GAIA deve mapear
  seu modelo contra ele para garantir interoperabilidade.
- **Não é executável diretamente**: Java/Eclipse RCP, não Python/Django.
- **Padrões de importação/exportação**: ILCD e EcoSpold são os formatos que
  qualquer motor LCA deve suportar para ingestão de fatores.

---

## FullCAM — referência de API (Austrália)

`fullcam/fullcam-api-documentationv1-2.pdf`

- **Fonte**: Department of Climate Change, Energy, the Environment and Water
  (DCCEEW), Commonwealth of Australia, 2024
- **Licença**: CC BY 4.0 — requer atribuição
- **Citação**: FullCAM PR External API Documentation v1.2, DCCEEW, 2024

### Relevância para GAIA

FullCAM é o sistema australiano de contabilidade de carbono. Seu motor de solo
**não é RothC** (modelo proprietário de 5 pools). API limitada à Austrália.

**Aproveitável como referência de engenharia:**

- **Workflow assíncrono**: Upload → Poll → Download com Azure Durable Functions.
  Padrão maduro para simulações pesadas (RothC multi-talhão, LCA multi-cenário).
- **Separação Data Builder vs Simulation**: APIs de consulta de referência
  (clima, solo, espécies) vs APIs de execução de modelo.
- **Modelo temporal TimeSeries**: envelope padronizado com origem, passo e
  extrapolação — unificaria clima, cenários e resultados na GAIA.
- **Templates de simulação**: cenários pré-configurados (reflorestamento,
  manejo) como ponto de partida para o usuário.
- **Versionamento de parâmetros**: 2020 vs 2024 com coeficientes calibrados
  diferentes — GAIA deve versionar fatores de emissão e parâmetros RothC.

**Não é integration target**: Austrália-only, subscription-gated,
coordenadas fora do bounding box australiano são rejeitadas.

---

## FAO Soils Portal — datasets de solo globais

`fao/fao-soils-portal-data-hub.html`

- **URL**: https://www.fao.org/soils-portal/data-hub/soil-maps-and-databases/en/
- **Licença**: CC BY-NC (maioria dos datasets)

### Datasets prioritários para GAIA

| Prioridade | Dataset | O que fornece |
|---|---|---|
| **P0 — baixar** | HWSD v2.0 | Argila % (RothC), COS por camada (0–100 cm), densidade aparente, textura |
| **P0 — baixar** | GSOCmap v1.5 | Estoque COS 0–30 cm — inicialização direta RothC |
| **P1 — estudar** | GSOCseq | FAO já roda RothC globalmente; metodologia, clima e spin-up são referência direta |
| **P1 — baixar** | SISLAC | Perfis de solo da América Latina e Caribe (27 países, incl. Brasil) |
| **P2 — validar** | WoSIS | Perfis pontuais (~200k globais) para validação de simulações |
| **P3 — contexto** | FAO Soil Map | Classificação WRB, escala 1:5M |

### Acesso

- Todos gratuitos via download no portal FAO
- GSOCmap disponível no Google Earth Engine
- Formato predominante: GeoTIFF (~1 km) + CSV de atributos
- Sem REST API; GEE é o acesso programático mais próximo

### Ausente nesta página

- Dados climáticos mensais (buscar CHIRPS, WorldClim, ERA5-Land)
- Cobertura/uso da terra (ESA CCI global, MapBiomas Brasil)
- Fatores de emissão (IPCC 2019 Refinement)
- Dados de manejo agrícola

---

## Escopo e bloqueadores

| Trilha | Status |
|--------|--------|
| D0, P1, P2 do BE-18 | Prosseguir |
| Mapeamento estático RothC | Prosseguir (fórmulas confirmadas pelo guia oficial) |
| Validação RothC Python × Fortran | **Desbloqueado** — golden vectors de 70 anos disponíveis |
| Correção RothC (spin-up, IOM, SMD, evap) | Bloqueado até validação terminar |
| LCA — modelo de domínio | Referência openLCA disponível; sem fatores de emissão ainda |
| LCA — validação científica | Bloqueado — sem fonte de fatores/emissão |
| FAO datasets | HWSD v2.0 + GSOCmap devem ser baixados antes de P3 |
