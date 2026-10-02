# 05 · Rascunho de tasks

Ainda **não criadas no Plane**. Títulos no padrão `BE:` / `FE:` / `PROD:`.
Regras (RN-n) e pendências (P-n) em [07-versao-final-1.md](07-versao-final-1.md).
Revisado em 30/09/2026 com as respostas de Paulo e Ruan.

A coluna "Pendência" indica a decisão de 06/10 que ainda pode mudar a task. Sem
pendência, a task pode começar.

## Fase 1: oficial e safra

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Design do oficial e simulação no Penpot | Badges Oficial/Simulação, oficial no topo da lista, ação "Marcar como oficial", confirmação de troca, escolha de novo oficial ao cancelar, estado sem oficial, seletor de safra, cobertura no projeto | RN-01–09 | P-10 |
| BE: Safra em todos os cálculos | Campo `harvest_year` em `RothcCalculation`, `RegenerativeAssessment`, `BiodiversityAssessment` (a Emissão já tem); migração preenchendo pela data de criação | RN-10, RN-11, RN-39 | P-14 |
| BE: Oficial por talhão, módulo e safra | `is_official` + constraint parcial única (talhão × safra; × cultura na Emissão) nos quatro módulos; substitui `is_primary` por `project_farm` no Regenerativo; endpoint marcar; primeiro cálculo vira oficial; duplicar nasce simulação; cancelar o oficial não promove outro | RN-01–05, RN-07 | P-13 |
| BE: Trilha do oficial | Registro de marcar, trocar, desmarcar: quem, quando, anterior, novo, motivo opcional | RN-06, RN-08 | P-9 |
| BE: Emissão com autoria e FK de talhão | `LcaProjectCulture` ganha `created_by`/`updated_by` e FK real de `plot` (hoje `plot_id` é inteiro solto) | RN-08 | — |
| BE: Consumidores usam só o oficial | Comparação (padrão oficial, parâmetro para incluir simulações), benchmark, completude do talhão (os três módulos) | RN-15–17 | P-10 |
| BE: Migração dos dados existentes | Oficial = mais recente não cancelado por talhão × módulo × safra (× cultura); flag de aviso de revisão | RN-38 | P-10 |
| FE: Oficial e simulação nas listas de cálculo | Badges, oficial no topo, ações no menu, confirmação, escolha ao cancelar, filtro por safra, aviso de revisão pós-migração, esconder ações para auditor | RN-01–09, RN-38 | design |
| FE: Safra nos formulários | Campo safra em Remoção, Regenerativo e Biodiversidade | RN-10 | design |
| FE: Filtro de simulações na comparação | Chip "Incluir simulações", padrão só oficial | RN-17 | design |
| FE: Cobertura de oficial no projeto | Talhões com oficial / total por módulo e safra; atalho para o primeiro pendente | RN-21 | design |

## Fase 2: agregação

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Peso da média por indicador | Definir com o `sustainability-specialist` qual indicador usa área e qual usa produção | RN-14 | P-5 |
| BE: Agregação ponderada por fazenda e projeto | Selector que agrega os oficiais por fazenda e projeto com o peso definido; Remoção como variação medida entre safras, projeção separada | RN-13, RN-14, RN-18 | P-2, P-5 |
| BE: Dashboards de fazenda e projeto só com oficiais | Trocar a fonte dos dashboards para a agregação | RN-15 | — |
| FE: Número declarado nos dashboards | Número único por fazenda e projeto, nota de talhões fora; Remoção com projeção destacada como informativa | RN-13, RN-18 | design, P-2 |

## Fase 3: finalizar, travar e foto do momento

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Design da finalização no Penpot | Stepper revisão → resumo → confirmação; tabela talhão × módulo × safra com troca inline e filtro "só pendências"; badges de estado do projeto; cadeado nos cálculos | RN-19–23, estados | P-1 |
| BE: Estados do projeto e finalização | Estados `ready_to_finalize`, `finalized`, `in_verification`, `verified`; `auto_complete_project` passa a marcar "pronto para finalizar"; endpoint finalizar com bloqueio por pendência; `finalized_by/at`; migrar `completed` | RN-19, RN-21–23, RN-40 | P-1, P-7 |
| BE: Bloquear escrita em projeto travado | Nenhum create/update/recalcular/cancelar/trocar oficial em finalizado, em verificação ou verificado, nos quatro módulos | RN-24 | — |
| BE: Versão dos catálogos de fator | Versão/`valid_from` nos catálogos da Emissão; parar de `update()` em migration; cálculo guarda a versão usada | RN-26 | — |
| BE: Foto imutável na finalização | Guardar inputs, resultado, versão de fatores, parâmetros e clima do RothC, pesos do Regenerativo de cada oficial; hash; PDF e QR leem daqui | RN-25 | — |
| BE: Reabrir projeto finalizado | Só `is_staff`; justificativa obrigatória; invalida PDF anterior; volta para em andamento | RN-28–30 | — |
| BE: Linha de base recalculada à parte | Recalcular a linha de base com os fatores atuais só para comparação, sem tocar na foto | RN-27 | P-3 |
| FE: Fluxo de finalização | Stepper, tabela de revisão com troca inline, resumo, confirmação | RN-20 | design |
| FE: Projeto travado em modo leitura | Cadeado, ações de escrita escondidas, badge de estado, reabrir (só GAIA) com justificativa | RN-24, RN-28 | design |

## Fase 4: verificação (junto com a feature 04, auditor)

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Design do fluxo de verificação no Penpot | Enviar para verificação, painel do auditor, aprovar, pedir correção com prazo, histórico de pedidos | RN-31–35 | P-4, P-6 |
| BE: Vínculo auditor × projeto | Liberar um auditor num projeto; `_user_accessible_project_qs` passa a considerar o vínculo | RN-35 | P-4 |
| BE: Enviar, aprovar e pedir correção | Transições finalizado → em verificação → verificado, e em verificação → em andamento com pedido (texto, prazo, quem, quando) | RN-31, RN-33, RN-34 | P-6 |
| FE: Ações de verificação | Botão enviar (admin/gestor), aprovar e pedir correção (auditor), aviso de correção pendente com prazo | RN-31–34 | design |

## Depois desta feature

| Título | O quê |
|---|---|
| BE/FE: Duplicar projeto para a safra seguinte | Novo projeto com fazendas e cálculos copiados como ponto de partida (Ruan J9, Paulo 17) |
| BE/FE: Resultado anual consolidado da fazenda | Soma de até 3 safras no mesmo ano (Ruan 5) |
| BE/FE: Validação de faixa nos inputs | Travar valores fora da realidade no preenchimento, por módulo (Ruan J3) |

## Colaterais (registrar à parte)

| Título | O quê |
|---|---|
| BE: Auditor não pode escrever na Biodiversidade | `biodiversity/views.py:105-106`, `:225-226` aceitam POST do auditor |
| FE: Esconder ações de escrita para auditor na Emissão | Botão "novo" e menu aparecem para auditor |
