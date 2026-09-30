# 05 · Rascunho de tasks

Ainda **não criadas no Plane**. Títulos `BE:` / `FE:` / `PROD:`. "Depende de" aponta
as perguntas do [questionário](04-questionario-produto.md).

## Antes do export (correções de dado)

| Título | O quê | Depende de |
|---|---|---|
| BE: Corrigir unidade de combustível no cálculo LCA | `lca/calculations/fuel.py:88-98` ignora m³, kg, t, TJ | — |
| BE: Guardar unidade digitada de calcário e gesso | Hoje convertidos para kg total ao salvar (`lca/services.py:70-74`) | C4 |
| BE: Fonte nos fatores de combustível | `LcaFuelType` sem campo de fonte | B3 |
| BE: Salvar fator usado por linha no resultado LCA | Hoje descartado (`lca/services.py:1014-1038`). Liga com o snapshot da feature 0 | B3 |

## Fase 1: Emissão

| Título | O quê | Depende de |
|---|---|---|
| PROD: Regras do export | Fechar respostas do questionário | A1–F3 |
| PROD: Planilha modelo | XLSX de exemplo com dados fictícios no layout proposto, validado com Paulo e Ruan antes do dev | C1–C7 |
| PROD: Design do export no Penpot | Botão Exportar, painel de opções, aviso de pendências | D1, D2, D5, D6 |
| BE: Endpoint de export XLSX do projeto | `openpyxl`; abas Sobre, Fazendas, uma por categoria (matriz insumo × fazenda), Fatores, Dados em lista, Dicionário; só valores; neutralizar injeção de fórmula | B1–B7, C1–C7, E1 |
| BE: Resumo por categoria | Aba estilo `Total_Agro`, fóssil/biogênico/remoções × fazenda | B2 |
| BE: Acesso e dados pessoais no export | Respeitar `list_project_farms`; lista fechada de campos; sem CPF/CNPJ/contato/coordenadas; registro de quem exportou | B4, B5, D3, D4 |
| FE: Botão e painel de export | Botão no projeto (e fazenda), painel com opções, download, aviso de pendências | design |

## Fase 2: outros módulos e opções

| Título | O quê | Depende de |
|---|---|---|
| BE: Versão sem identificação | Fazendas como código | D4 |
| BE: Export assíncrono | Só se a geração passar de ~30 s | — |

## Dependências entre features

- Feature 0 (cálculo oficial): define qual cálculo vira coluna (B7, D6).
- Feature 4 (auditor): o auditor só baixa quando tiver acesso ao projeto (D3).

## Por módulo (ver 06-por-modulo.md)

| Título | O quê | Depende de |
|---|---|---|
| BE: Abas de Remoção no export | Entradas, Culturas e compostos, Resultados (médio, fim, diferença BAU, ganho anual, total com área); parâmetros do modelo | M1–M4 |
| BE: Guardar janela de modelagem da Remoção | Hoje reconstruída dos resultados (`rothc/serializers.py:277-280`) | — |
| BE: Guardar data, laboratório e método do SOC inicial | Campo novo na Remoção | M4 |
| BE: Aba do Regenerativo no export | Contexto, 28 indicadores × fazendas (opção + pontos), seções, nota, faixa, quem respondeu | M5, M6, M8 |
| BE: Aba da Biodiversidade no export | 43 perguntas × talhões, nota por área, geral, classificação, respondidas | M7, M8 |
