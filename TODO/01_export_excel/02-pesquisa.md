# 02 · Pesquisa

## As planilhas de referência (`docs/references/domain`)

Dumps de cada aba ficaram no scratchpad da sessão; os pontos principais estão
aqui.

### LCA_Annual_Crops_Tool.xlsx (a mais importante)

- **Um arquivo por cultura × safra × talhão.** Não há fazendas lado a lado em
  lugar nenhum. O único bloco lado a lado são 19 culturas em
  `Em_Aplicacao_direta`, usado para escolher parâmetros.
- **Capa `Apresentacao` (F9:G21):** Cultura, Produto final 1/2/3, Safra, Produtor,
  Fazenda, Grupo, Talhão, Área (ha), Montante colhido (kg), Clima (Seco/Úmido),
  Planta.
- **Uma aba por categoria** (`Em_producao_Energia`, `Em_producao_Combustíveis`,
  `Em_Processo_defensivos`, `Em_Processo_fertilizantes`, `Em_Aplicação_Ureia`,
  `Em_Aplicacao_Corretivos`, `Em_producao_sementes`, `Em_Aplicacao_direta`,
  `Em_Aplicacao_indireta`, `Mudança no uso do solo`, `Manejo_do_solo`,
  `Em_transporte_planta_alocado`).
- **Insumos nas linhas, fator na mesma linha.** Ex.: `Em_Processo_fertilizantes!B9:J9`:
  nome · classificação (sintético/orgânico) · quantidade (kg) · % do nutriente ·
  quantidade de nutriente · unidade · FE · unidade do FE · fonte.
- **Fertilizantes agrupados por subtítulo:** Fósforo, Nitrogênio, Ureia, Potássio,
  Outros, Orgânicos (~75 produtos).
- **Legenda de cores em todas as abas:** "Dado Xfarm" (entrada, verde médio), "Dado
  fixado" (fatores, verde claro), "Resultado" (branco). Título em faixa
  azul-marinho, cabeçalhos em azul.
- **Resultado:** `Total_Agro!B9:E22`, categorias nas linhas (eletricidade,
  combustível, defensivos, fertilizante produção/direta/indireta, ureia, corretivo,
  semente, manejo, total agrícola, MUT, total) e colunas Fóssil, Biogênica,
  Remoções em kgCO₂e/kg.
- **Unidades misturadas:** fertilizante em kg total; defensivo e semente em kg/ha ×
  área; ureia e calcário em kg/ano; combustível em L, m³ ou kg conforme o tipo.
- **Pegadinhas:** N₂O direto/indireto usa FSN e FON digitados de novo, não a soma
  dos fertilizantes; clima Seco/Úmido calculado lado a lado; `Total_Agro!D18` conta
  CO₂ biogênico do combustível duas vezes; texto "Mudar esse texto" esquecido em
  `Em_Processo_defensivos!B25`.

### Outras

- **RothC_Model_short:** aba `Data` com uma linha por mês (1.440 meses) e entradas
  em colunas (chuva, evaporação, temperatura, argila, DPM/RPM, cobertura, resíduos,
  esterco, profundidade). Entradas vazias no arquivo.
- **Biodiversity Assessment Tool:** 43 perguntas em 3 abas (produção, área não
  produtiva pequena e grande), resposta Sim/Não embaixo de cada pergunta. Uma
  fazenda por arquivo.
- **EIQ_Final:** calculadora com **8 produtos lado a lado** em blocos de 3
  colunas. É o único exemplo de "vários itens em colunas".
- **STIR:** uma linha por operação, total no fim.
- **Emission_Factors_for_Cross_Sector_Tools (GHG Protocol):** tabelas numeradas,
  um gás por coluna, Região · Combustível · FE · Unidade. O FE de energia do Brasil
  2023 (0,0385 tCO₂/MWh) é o mesmo usado no LCA tool e na plataforma.

## Mercado

- **Cool Farm Tool:** exporta avaliações em Excel (só para membros); quem recebe
  por "share code" também exporta; o nome da fazenda pode ser ocultado.
  https://coolfarm.org/frequently-asked-questions/
- **openLCA:** exporta resultados em .xlsx com informações gerais, impactos e
  inventário; processos exportam e reimportam.
  https://greendelta.github.io/openLCA2-manual/res_analysis/save_export.html
- **GHG Protocol Agrícola (Brasil, WRI/Embrapa/Unicamp):** planilha organizada por
  **fonte de emissão** (calcário e gesso, N sintético, ureia, energia, combustível,
  resíduos…), reporte por gás e em CO₂e, biogênico e sequestro separados. Usa GWP do
  AR4, diferente da plataforma. Não consegui abrir a planilha atual.
  https://ghgprotocol.org/sites/default/files/2022-12/Metodologia.pdf
- Regrow, Sustell, Agreena, Farmers Edge: sem documentação pública de export.

## O que o auditor espera

- **ISO 14064-3:** o verificador pede as planilhas de cálculo, metodologia e fatores
  aplicados, e dados para **recalcular de forma independente**; amostra números e
  rastreia até a evidência.
  https://www.glocertinternational.com/resources/guides/iso-14064-3-verification-methodology-explained/
- **ISO 14067:** GWP-100 do IPCC mais recente, dado primário vs. secundário,
  qualidade de dados, período.
- **PACT (WBCSD), bom checklist de metadados:** período de referência, unidade
  declarada, conjunto de GWP (ex.: AR6), normas usadas, fontes de fatores com versão,
  % de dado primário, verificação, versão/status.
  https://wbcsd.github.io/tr/data-exchange-protocol/latest/

## Boas práticas de planilha

- **Formato longo** (uma linha por observação) é o que auditor e analista filtram
  e pivotam; o formato largo (insumo × fazenda) é para ler. Ter os dois.
  Wickham, *Tidy Data*: https://www.jstatsoft.org/article/view/v059i10
- Um dado por célula, unidade em coluna própria, célula vazia = não informado e
  zero = zero, dicionário em aba própria, cor não carrega significado sozinha.
  Broman & Woo: https://www.biostat.wisc.edu/~kbroman/publications/dataorg.pdf
- **XLSX em vez de CSV:** CSV no Excel pt-BR sofre com `;`, vírgula decimal e
  acentos. https://support.microsoft.com/pt-br/office/abrir-arquivos-utf-8-do-csv-corretamente-no-excel-8a935af5-3416-4edd-ba7e-3dfd2bc4a032
- **Injeção de fórmula:** texto livre começando com `= + - @` vira fórmula; neutralizar.
  https://owasp.org/www-community/attacks/CSV_Injection

## LGPD

- Produtor pessoa física é titular de dados. Coordenadas ou polígono junto com o
  nome identificam a pessoa. Pseudônimo ("Fazenda 3") com tabela de correspondência
  continua sendo dado pessoal.
  http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm
- Antes de mandar para outro controlador (auditor, trader), avaliar risco de
  reidentificação (estudo técnico da ANPD).
