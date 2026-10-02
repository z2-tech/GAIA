# 05 · Rascunho de tasks

Ainda **não criadas no Plane**. Títulos no padrão `BE:` / `FE:` / `PROD:`.
Regras (RN-n) e pendências (P-n) em [08-versao-final-1.md](08-versao-final-1.md).
Revisado em 02/10/2026 com as respostas de Paulo e Ruan.

A coluna "Pendência" indica a decisão de 06/10 que ainda pode mudar a task. Sem
pendência, a task pode começar.

## Fase 1: planilha modelo

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Planilha modelo do export | Pedir a planilha própria do Paulo (A3); montar XLSX com dados fictícios: abas, cabeçalho fazenda/talhão/cultura-safra, kg/ha, total da fazenda, lista, cores; validar com Paulo e Ruan | RN-09–16 | P-2, P-3, P-7 |
| PROD: Design do export no Penpot | Botão Exportar, painel (safra, fazendas, módulos, idioma, sem identificação), aviso de talhão sem oficial | RN-17–22, RN-26 | P-8, P-9 |

## Fase 2: correções de dado (antes do export)

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| BE: Corrigir unidade de combustível no cálculo LCA | `lca/calculations/fuel.py:88-98` trata m³, kg, t e TJ como litro | RN-11 | — |
| BE: Guardar unidade digitada de calcário e gesso | Hoje convertidos para kg total ao salvar (`lca/services.py:70-74`) | RN-11 | — |
| BE: Guardar janela de modelagem da Remoção | Hoje reconstruída dos resultados (`rothc/serializers.py:277-280`) | Seção 5 | — |
| BE: Data, laboratório e método da análise de solo | Campos novos em `RothcCalculation`, ao lado de `soc_tons_ha` | Seção 5 | — |
| FE: Data, laboratório e método no formulário da Remoção | Três campos novos no passo do SOC inicial | Seção 5 | design |

## Fase 3: export dos quatro módulos

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| BE: Endpoint de export XLSX do projeto | `openpyxl`; filtros safra, fazendas, módulos, idioma; só oficiais; abas Sobre, Fazendas, Dados em lista, Dicionário; só valores; neutralizar injeção de fórmula | RN-01–05, RN-13–15, RN-25–28 | P-1, P-3, P-7 |
| BE: Abas da Emissão | Uma aba por categoria; coluna talhão × cultura; kg/ha padronizado; linha de área; total da fazenda em kg; nome do arquivo de evidência | RN-07, RN-09–12 | P-2, P-6 |
| BE: Aba da Remoção | Entradas do RothC por talhão; ciclos de cultura e compostos em bloco de lista | RN-09, seção 5 | P-1 |
| BE: Abas do Regenerativo e da Biodiversidade | Coluna = fazenda ou talhão conforme a avaliação; opção ou Sim/Não por item; quem respondeu e quando (`created_by`, `created_at`) | RN-09, seção 5 | P-4 |
| BE: Acesso e dados pessoais no export | Segue `list_project_farms`; lista fechada de campos; sem nome do produtor, contato, coordenadas e geometria; opção sem identificação; log de exportação | RN-05, RN-06, RN-17–21 | P-5, P-8 |
| BE: Talhão sem oficial no export | Coluna vazia e lista na aba Sobre; estado do projeto na aba Sobre | RN-22, RN-24 | P-9 |
| FE: Botão e painel de export | Botão outline no cabeçalho do projeto; painel com padrões; aviso de pendências com atalho; download; toast | RN-17, RN-22, RN-26 | design |

## Fase 4: arquivo do auditor

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| BE: Fonte nos fatores de combustível | `LcaFuelType` sem campo de fonte | RN-08 | — |
| BE: Aba Fatores e parâmetros | Fatores usados por linha (da foto, com versão), constantes do código, parâmetros do RothC; só para auditor e staff | RN-03, RN-08 | — |
| BE: Export lê da foto em projeto travado | Projeto finalizado, em verificação ou verificado: dados da foto (CF-RN-25) | RN-03 | — |

## Depois desta feature

| Título | O quê |
|---|---|
| BE: Resumo de resultados na planilha | Só se a reunião decidir P-1 por "sim": `Total_Agro` por categoria, estoques da Remoção, notas do Regenerativo e da Biodiversidade |
| BE/FE: Pacote de evidências em PDF | Depende do upload de evidência (feature 04) |
| BE: Export assíncrono | Só se a geração passar de ~30 s |

## Dependências entre features

- Feature 0 (cálculo oficial): fase 1 (selo e safra) antes da fase 3 daqui; fase 3
  (foto e versão de fatores) antes da fase 4 daqui.
- Feature 2 (PDF): recebe os resultados que saíram da planilha (P-1).
- Feature 4 (auditor): vínculo auditor × projeto e upload de evidência.

## Colaterais (registrar à parte)

| Título | O quê |
|---|---|
| BE: Conferir erro herdado de `Total_Agro!D18` | Ruan confirmou o erro na planilha (semente puxa CO₂ biogênico do combustível); ver se a plataforma repete |
| BE: Comparação libera fazendas que a listagem esconde | `comparison/selectors.py:5` × `projects/selectors.py:94-114` |
