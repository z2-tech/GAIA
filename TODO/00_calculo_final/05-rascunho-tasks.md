# 05 · Rascunho de tasks

Ainda **não criadas no Plane**. Títulos no padrão `BE:` / `FE:` / `PROD:`.
Regras (RN-n) e pendências (P-n) em [08-versao-final-2.md](08-versao-final-2.md).
Refeito em 02/10/2026 depois da reunião: o selo de oficial por talhão saiu e
entrou o fechamento por recorte. A versão de 30/09 está no histórico do git.

A coluna "Pendência" indica o que ainda pode mudar a task. "design" = depende da
apresentação do Penpot a Paulo e Ruan.

## Fase 1: design e apresentação

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Design do fechamento no Penpot | Tela de seleção em modo fechamento (cultura e ano → fazendas → talhões → cálculo por módulo), seleção em lote, resumo com números e cobertura, escolha com ou sem auditoria, confirmação | RN-07–16, RN-19 | P-4, P-5 |
| PROD: Design da lista de fechamentos do projeto | Aba de fechamentos com estado e números; devolvido em vermelho com atalho ao campo e comentário do auditor; reabrir com justificativa | RN-31, RN-36, RN-40 | P-1 |
| PROD: Design de período e ano nos cálculos | Emissão com mês e ano de início e fim; Regenerativo com ano safra e lista de vários por fazenda; cadeado e alerta de fator antigo no cálculo travado | RN-03, RN-05, RN-26 | — |
| PROD: Apresentação a Paulo e Ruan | Passar o design como apresentação, conferir dados, campos e textos; registrar ajustes | D18 | — |
| PROD: Receber o Excel da média ponderada do Paulo | Conferir a fórmula de RN-17 contra a planilha | RN-17, RN-18 | — |

## Fase 2: período e ano nos cálculos

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| BE: Período de cultivo na Emissão | `start_month/start_year/end_month/end_year` em `LcaProjectCulture`; `harvest_year` = ano de fim; validação fim ≥ início; antigos ficam com período vazio | RN-03, RN-45 | — |
| BE: Emissão com FK de talhão e autoria | `plot_id` inteiro solto vira FK; `created_by`/`updated_by` | — | — |
| BE: Ano safra e vários por fazenda no Regenerativo | `harvest_year`; remover `uniq_primary_assessment_per_project_farm` e o uso de `is_primary`; migração com ano pela data de criação | RN-05, RN-45 | — |
| BE: Ano safra na Biodiversidade | `harvest_year`, mesma migração | RN-06 | P-5 |
| FE: Período e ano nos formulários | Campos de início e fim na Emissão; ano safra no Regenerativo; lista de avaliações por ano na fazenda | RN-03, RN-05 | design |

## Fase 3: fechamento e números

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| BE: Modelo de fechamento | `Closing` (projeto, cultura, ano, com auditoria, estado, autoria das transições) e `ClosingItem` (fazenda, talhão, módulo, cálculo, área); um ativo por projeto × cultura × ano | RN-07, RN-08 | — |
| BE: Candidatos da tela de seleção | Endpoint que lista, por talhão e módulo, os cálculos compatíveis com o recorte (cultura, ano, janela da Remoção cobrindo o período) | RN-10 | P-5 |
| BE: Média ponderada talhão → fazenda → projeto | Selector com peso por área; números do recorte por módulo; cobertura | RN-13, RN-17–19 | P-5 |
| BE: Recorte mensal da Remoção | Soma do `RothcMonthlyResult` entre início e fim da Emissão do talhão; curva e projeção como informativas | RN-20, RN-21 | P-2 |
| BE: Criar fechamento | Endpoint que recebe a seleção, valida (um cálculo por talhão e módulo incluído, período preenchido), calcula e grava; permissão admin do projeto e gestor | RN-11, RN-12, RN-14, RN-15 | — |
| BE: Fim do concluído automático | Remover `auto_complete_project`; `completed` volta para em andamento; estado encerrado do projeto | RN-38, RN-39, RN-44 | — |
| FE: Tela de seleção em modo fechamento | Passos, seleção em lote, resumo, confirmação, saídas (fechar, fechar e auditar, comparar) | RN-09–16 | design |
| FE: Aba de fechamentos do projeto | Lista por recorte, estado, números, atalho para o devolvido | RN-31, RN-40 | design |

## Fase 4: trava e foto

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| BE: Bloquear escrita em cálculo travado | Nenhum update, recálculo ou cancelamento de cálculo que está em fechamento fechado, em verificação ou verificado, nos quatro módulos; devolvido libera só os cálculos daquele fechamento | RN-23, RN-30 | P-6 |
| BE: Versão dos catálogos de fator | Versão ou `valid_from` nos catálogos da Emissão; parar de `update()` em migration; cálculo guarda a versão usada | RN-25 | — |
| BE: Foto do fechamento | JSON imutável com seleção, inputs, resultados, fatores (valor e fonte), parâmetros e clima do RothC, pesos do Regenerativo, números; hash | RN-24 | — |
| BE: Reabrir fechado sem auditoria | Dono reabre com justificativa; destrava; documento anterior vira substituído | RN-36 | P-1 |
| BE: Correção de erro de cálculo pela GAIA | Staff refaz a foto com justificativa; documento anterior substituído | RN-37 | P-1 |
| FE: Cálculo travado | Cadeado, ações de escrita escondidas, alerta "Calculado com fatores de dd/mm/aaaa", duplicar como novo | RN-23, RN-26, RN-28 | design |

## Fase 5: auditoria (junto com a feature 04)

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| BE: Enviar, devolver, reenviar, aprovar | Transições do fechamento; devolver destrava só os cálculos dele; reenviar refaz a foto; aprovar trava de vez | RN-29–33 | P-3 |
| FE: Ações de auditoria no fechamento | Enviar (admin, gestor), devolvido em vermelho com atalho ao campo e comentário | RN-29–31 | design |

## Fora das fases, registrar à parte

| Título | O quê |
|---|---|
| FE: Rótulos de total ou por hectare na Emissão | Montante colhido (t total), combustível, energia (total da propriedade), transporte. Ruan, demo de 02/10 |
| BE/FE: Combustível por hectare | Decidido em 05/10: o campo passa a ser por ha no front. Conferir no back: hoje `LcaProjectFuelItem.annual_consumption` é total e o combustível é por fazenda; ou o campo vira por ha, ou o back converte pela área do cálculo |
| FE: Ureia duplicada e campo 0,46 no fertilizante | Ao adicionar ureia apareceram duas linhas; Ruan sugere tirar o campo de % de N. Conferir na tela |
| BE/FE: Uma semente por cálculo, puxada da cultura | O cálculo é de uma cultura (RN-03), então só uma semente: o front vem com a da cultura preenchida e não deixa adicionar outra; o back recusa mais de uma |
| PROD: Cadastrar o João na plataforma | Especialista em carbono do solo, vai validar a Remoção (pedido do Paulo) |
| BE/FE: Caixa de saída e conflito no celular | RN-41, RN-42; entra no plano do mobile |
| BE/FE: Validação de faixa nos inputs | Travar valores fora da realidade (Ruan J3) |
| BE: Auditor não pode escrever na Biodiversidade | `biodiversity/views.py:105-106`, `:225-226` aceitam POST do auditor |
| FE: Esconder ações de escrita para auditor na Emissão | Botão "novo" e menu aparecem para auditor |
