# GAIA: sources

The files behind the rules. The reference files still live in `docs/references/domain/` until `/sync route docs/references` moves them here.

Worth, from strongest to weakest: normative, scientific, functional reference (how the client computes today, not proof it is right), product context (meetings, never a scientific source). The code is implemented behavior, never an independent validation.

| Source | What it is | Worth | Where | Cited by |
|---|---|---|---|---|
| IPCC 2006 and 2019 Refinement, Vol 4 | National greenhouse gas inventory guidelines for agriculture and land use | normative | [ipcc-nggip.iges.or.jp](https://www.ipcc-nggip.iges.or.jp/public/2019rf/vol4.html) | RD-2, RD-4 |
| IPCC AR6 WG1 | Global warming potentials | scientific | [ipcc.ch](https://www.ipcc.ch/report/ar6/wg1/) | RD-1 |
| Novaes et al. 2017; MCTI 2020 | Soil carbon stocks in Brazil; biomass stocks per phytophysiognomy | scientific | inside `LCA_Annual_Crops_Tool.xlsx` | RD-3 |
| LCA_Annual_Crops_Tool.xlsx | Client LCA spreadsheet: Município carbon stock sheet, direct emission parameters, soil management, fertilizer list (`Em_Processo_fertilizantes`), climate per município (`Clima`, 5,571 municípios) | functional reference | [file](../references/domain/LCA_Annual_Crops_Tool.xlsx) | `emissao-lca` RN-06, RN-08, RN-17, RN-22 |
| Fatores de emissão Gaia.pptx | Paulo Rocha's table of 11 soil practices with yearly factors, from Corazza 1999, Tiecher 2020, Poeplau & Don 2015, Bayer 2006, Oliveira 2022 and 2023, Carvalho 2010, Lorenz & Lal 2014, De Stefano & Jacobson 2018, Shang 2024 | functional reference | not in the repo, ask Paulo Rocha | `emissao-lca` RN-09, RN-13 |
| RothC-26.3 guide (Coleman & Jenkinson 2014) and Fortran code v2.1.1 | Official model description and canonical code (Apache 2.0) with 70 year golden vectors | scientific | [folder](../references/domain/rothc/) | RD-5 |
| RothC_Model_short (com dados coletados).xlsx | Client RothC template with collected data | functional reference | [file](../references/domain/RothC_Model_short%20(com%20dados%20coletados).xlsx) | |
| Biodiversity Assessment Tool Prototype_Final.xlsx | BAT questionnaire, 43 questions and scoring | functional reference | [file](../references/domain/Biodiversity%20Assessment%20Tool%20Prototype_Final.xlsx) | |
| EIQ_Final.xlsx | EIQ values from the New York State IPM Program, 631 active ingredients filled | functional reference | [file](../references/domain/EIQ_Final.xlsx) | |
| STIR_calculadora_metric_v4.xlsx | USDA-NRCS STIR calculator with Brazilian implements | functional reference | [file](../references/domain/STIR_calculadora_metric_v4.xlsx) | |
| openLCA, FullCAM, FAO Soils Portal | Reference models and soil data | scientific | [olca](../references/domain/olca/) · [fullcam](../references/domain/fullcam/) · [fao](../references/domain/fao/) | |
| GHG Protocol v2.0 | Emission factors for diesel, gasoline, biodiesel, and the Brazilian grid 2016 to 2023 | normative | not in the repo | `emissao-lca` P-3 |
| EXIOBASE 3.9.6 | Cradle to gate factors, 200 sectors × 214 countries (about 1 GB) | scientific | outside the repo | `emissao-lca` P-3 |
| PestLCI Consensus, Embrapa 2021 | Pesticide emission fractions, 27 molecules, 35 Brazilian mesoregions | scientific | not in the repo | `emissao-lca` P-3 |
| MCTI 2023 grid factor | Brazilian electricity factor, 0.0385 t CO2e per MWh | normative | not in the repo | `emissao-lca` RN-20 |
| TRACI 2.2 (US EPA) | Impact method for eutrophication, public domain, for later | scientific | not in the repo | |
| Open-Meteo | Temperature and rainfall for RothC climate | functional reference | [open-meteo.com](https://open-meteo.com/) | `remocao-rothc` RN-02 |
| IBGE, EMBRAPA | Soil types and biomes | scientific | not in the repo | |
| Cool Farm Tool API | Outside carbon footprint (CFP module) | functional reference | not connected yet | |
| Meeting PDFs and minutes | Product context; may hold decisions not yet approved | product context | `docs/meetings/` | |
