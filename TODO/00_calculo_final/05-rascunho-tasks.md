# 05 · Rascunho de tasks

Ainda **não criadas no Plane**. Títulos no padrão `BE:` / `FE:` / `PROD:`.
A coluna "Depende de" aponta as perguntas do [questionário](04-questionario-produto.md)
que mudam o escopo da task.

A fase 2 parte da hipótese H1 (trava só ao finalizar o projeto, ver
[README](README.md)). Se o produto escolher outro momento de trava (pergunta 12),
as tasks de finalização mudam; as de snapshot e versão de fatores continuam.

## Fase 1: marcação livre (projeto em andamento)

| Título | O quê | Depende de |
|---|---|---|
| PROD: Regras do cálculo oficial | Coletar respostas do questionário e fechar a jornada do projeto e as regras (unidade, período, trava, permissões) | J1–J9 |
| PROD: Design do oficial e simulação no Penpot | Badges, card de destaque, ação "Marcar como oficial", confirmação de troca, estado sem oficial, cobertura no projeto | 1, 3, 6, 27, 28 |
| BE: Oficial por talhão e módulo | `is_official` + constraint parcial única em `LcaProjectCulture`, `RothcCalculation`, `RegenerativeAssessment` (substitui `is_primary` por `project_farm`); `official_marked_by/at`; endpoint marcar/desmarcar; primeiro cálculo vira oficial; clone nasce simulação; regra ao cancelar | 5, 6, 8, 10, 21, 27, 28 |
| BE: Safra nos cálculos sem período | Campo de período em RothC e Regenerativo (e Bio, se entrar) para a constraint. Some se projeto = safra | 5, 6, 7, 8 |
| BE: Consumidores usam só o oficial | Comparação (padrão oficial, filtro para incluir simulações), benchmark, completude do talhão, agregação fazenda/projeto | 24, 25, 26 |
| BE: Migração de dados existentes | Marcar oficial o mais recente não cancelado por talhão/módulo(/safra) | 29 |
| FE: Oficial e simulação nas listas de cálculo | Badges, oficial no topo, ações no menu, confirmação, toast com desfazer, esconder ações para auditor | design |
| FE: Filtro de simulações na comparação | Chip "Incluir simulações", padrão só oficial | design, 25 |
| FE: Cobertura de oficial no projeto | Progresso por módulo e atalho para talhão sem oficial | design, 14 |

## Fase 2: finalização, trava e congelamento (hipótese H1)

| Título | O quê | Depende de |
|---|---|---|
| PROD: Design da finalização do projeto no Penpot | Stepper revisão → resumo → confirmação; tabela talhão × módulo com filtro "só pendências"; status Pronto para finalizar / Finalizado; cadeado nos oficiais | J3, J5, 12–18 |
| BE: Finalizar projeto | Status `finalized` separado do `completed` automático; `auto_complete_project` passa a indicar "pronto para finalizar"; endpoint de finalização com validação de pendências; `finalized_by/at` | J3, J5, 12, 13, 14, 15 |
| BE: Bloquear escrita em projeto finalizado | Oficiais e cálculos não editáveis nem canceláveis; regra para simulações | 16, 17 |
| BE: Snapshot imutável na finalização | Guardar inputs, resultado, versão de fatores, parâmetros RothC e clima de cada oficial ao finalizar; hash | 19 |
| BE: Versão dos catálogos de fator de emissão | `valid_from`/versão nos catálogos LCA, parar de `update()` em migration | 19 |
| BE: Reabrir projeto finalizado | Se permitido: nova versão do oficial, motivo, efeito em PDF/QR já emitidos | 16, 22 |
| BE: Trilha de alterações do oficial | Quem marcou, trocou, finalizou, reabriu, com motivo; leitura para auditor | 22, 23 |
| FE: Fluxo de finalização do projeto | Stepper, tabela de revisão com troca inline, resumo, confirmação | design |
| FE: Projeto finalizado em modo leitura | Cadeado, ações de escrita escondidas, badge de status | design, 17 |
| FE: Timeline do oficial | Histórico de versões para usuário e auditor | design, 23 |

## Colaterais (registrar à parte)

| Título | O quê |
|---|---|
| BE: Auditor não pode escrever na Biodiversidade | `biodiversity/views.py:105-106`, `:225-226` aceitam POST do auditor |
| FE: Esconder ações de escrita para auditor na Emissão | Botão "novo" e menu aparecem para auditor |
| BE: `LcaProjectCulture` sem `created_by` e sem FK de talhão | Necessário para a trilha de auditoria |
