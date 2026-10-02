# 05 · Rascunho de tasks

Ainda não criadas no Plane. Títulos no padrão `BE:` / `FE:` / `PROD:`.
Regras (RN-n) e pendências (P-n) em [08-versao-final-1.md](08-versao-final-1.md).
Revisado em 02/10/2026 com a resposta do Paulo.

A coluna "Pendência" indica a decisão de 06/10 que ainda pode mudar a task. Sem
pendência, a task pode começar.

As tasks de verificação que estavam na fase 4 do
[cálculo final](../00_calculo_final/05-rascunho-tasks.md) (vínculo auditor ×
projeto, enviar, aprovar, pedir correção) moram aqui, nas fases 1 e 3. O cálculo
final mantém os estados do projeto, a finalização, a foto e a reabertura (fase 3
de lá).

## Fase 0: correções antes de abrir para auditor

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| BE: Unidade de combustível ignorada | `lca/calculations/fuel.py:88-98` | 5.4 | — |
| BE: Gravar janela de modelagem do RothC | `rothc/serializers.py:277-280` | 5.4 | — |
| BE: Delta BAU × projeto único | `comparison/selectors.py:136` vs `rothc/services.py:1807` | 5.4 | — |
| BE: Pecuária no denominador do Regenerativo | `regenerative/selectors.py:126-135` | 5.4 | — |
| BE: Denominador da Biodiversidade | `biodiversity/services.py:35-48` vs `:170-216` | 5.4 | — |

Os furos de escrita do auditor (Biodiversidade e upload) fecham na task "BE:
Somente leitura por projeto", fase 1.

## Fase 1: acesso por projeto

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Design do acesso do auditor no Penpot | Aba Acesso (membros, convites pendentes, revogar, reenviar), diálogo de convite (e-mail, verificadora), tela de aceite, faixa "Verificação · somente leitura" | RN-01–09 | P-1, P-2 |
| BE: Membro de projeto | Model `ProjectMember` (projeto, usuário, papel no projeto, verificadora, convidado por, aceito em, revogado em, encerrado em). Substitui o "vínculo auditor × projeto" da fase 4 do cálculo final | RN-05–07 | P-3 |
| BE: Acesso por membro | Membros ativos em `_user_accessible_project_qs`, `user_has_project_farm_access`, `_user_accessible_farm_qs`; teste de isolamento entre clientes por módulo (LCA, RothC, Regenerativo, Biodiversidade, comparação, uploads) | RN-05 | — |
| BE: Somente leitura por projeto | Checagem "é auditor deste projeto" nas escritas, no lugar de `user_has_role_name`; fecha Biodiversidade (criar, cancelar) e upload; exceção para apontamento, transições e declaração | RN-06, RN-10 | — |
| BE: Convite do auditor | Token com hash, uso único, 7 dias, preso ao e-mail; e-mail via Resend; aceite cria conta ou anexa à existente; reenviar, cancelar, revogar; só `is_staff` ou papel global `admin`; só projeto finalizado ou em verificação | RN-02–04, RN-07 | P-1, P-2 |
| BE: Auditor vê só oficiais e às cegas | Filtrar simulações para o auditor do projeto; esconder nome, CPF/CNPJ e contato do produtor nos serializers | RN-11, RN-13 | P-4 |
| BE: Permissão do usuário no projeto | Campo ou endpoint com o papel do usuário naquele projeto, para a web | RN-06 | — |
| FE: Aba Acesso do projeto | Lista de membros e convites, status, convidar, reenviar, revogar; visível só para GAIA/Peterson | RN-02, RN-07 | design, P-1 |
| FE: Aceite do convite | Rota pública do link: criar conta ou entrar, depois cai no projeto | RN-03 | design |
| FE: Modo auditor | Faixa fixa, menu reduzido, botões de escrita pela permissão do projeto (substitui `useCanWriteAssessments`) | RN-06, RN-10 | design |

## Fase 2: painel e rastro

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Design do painel e do rastro no Penpot | Matriz fazenda × módulo com o oficial; rastro por módulo; Excel e PDF no topo | RN-14, RN-15, 5.4 | — |
| BE: Fonte em todos os catálogos de fator | `source` nos catálogos que não têm (fertilizante); fator, unidade e fonte gravados em todas as fontes da Emissão, não só em quatro | RN-14 | — |
| BE: Rastro do cálculo | Endpoint por módulo lendo da foto: linhas da Emissão com fator e fonte; entradas do RothC (com dados da análise de solo); respostas do Regenerativo e da Biodiversidade | RN-12, RN-14, 5.4 | — |
| FE: Painel de verificação | Matriz fazenda × módulo, contagem de apontamentos por célula, Excel do auditor e PDF no topo | RN-15 | design |
| FE: Rastro do cálculo | Tabela insumo → quantidade → fator → fonte → emissão; entradas do RothC; respostas do Regenerativo e da Biodiversidade | 5.4 | design |

Excel do auditor com aba de fatores: feature 01. PDF: feature 02. A guarda de
laboratório, método e data da análise de solo vem da feature 01 (M4).

## Fase 3: verificação

Depende da fase 3 do cálculo final (estados, finalizar, foto).

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Design da verificação no Penpot | Enviar para verificação, apontamentos (lista, tipo, status, responder), devolver com prazo, marcar verificado com declaração, registro exibido no projeto | RN-19–31 | P-5, P-6, P-9 |
| BE: Enviar para verificação | Finalizado → Em verificação; admin do projeto, gestor ou GAIA; quem e quando | CF-RN-31 | P-9 |
| BE: Apontamentos | Model (projeto, alvo, tipo, status, texto, respostas, quem e quando); auditor cria, fecha e reabre; técnico, gestor, admin e GAIA respondem; persistem entre rodadas | RN-19–22 | — |
| BE: Devolver para correção | Em verificação → Em andamento; exige apontamento de correção aberto; prazo informativo; foto anterior invalidada; reenvio ao mesmo auditor | RN-23–26 | P-6 |
| BE: Marcar verificado | Bloqueio por correção ou esclarecimento sem fechar; registro (data, verificadora, auditor, escopo, período, declaração em PDF, logo opcional); encerra o acesso dos auditores; expõe o registro para PDF e QR | RN-27–31, RN-07 | P-3, P-5 |
| FE: Ações de verificação | Botão enviar (admin, gestor, GAIA); devolver e marcar verificado (auditor); aviso de correção pendente com prazo | RN-23–28 | design |
| FE: Apontamentos | Lista por projeto com filtro por status, criar a partir de célula ou linha do rastro, responder, fechar | RN-19–22 | design |
| FE: Registro de verificado | Diálogo do auditor com os campos e upload da declaração; card no projeto verificado | RN-29 | design |
| FE: Estado "Em verificação" | Trocar o badge "Em auditoria" da web pelo nome escolhido | — | P-9 |

## Fase 4: evidências

| Título | O quê | Regras | Pendência |
|---|---|---|---|
| PROD: Evidência por dado | Onde anexa em cada módulo, formatos, tamanho, como o auditor vê | RN-17, RN-18 | P-4, P-8 |
| BE: Anexo de evidência por dado | Model de anexo ligado ao item (insumo, análise de solo, indicador, resposta) nos quatro módulos, via URL pré-assinada do S3 que já existe; migrar o `evidence_file` de texto da Emissão | RN-18 | P-8 |
| FE: Anexar e ver evidência | Upload no formulário de cada módulo; lista no rastro para o auditor | RN-18 | design |

## Depois desta feature

| Título | O quê |
|---|---|
| BE/FE: Histórico de alterações para o auditor | Se a P-7 mudar. A trilha do oficial já é gravada no cálculo final |
| BE/FE: Log de acesso do auditor | O que abriu e o que baixou, visível à GAIA |
| BE/FE: Contratar verificação pela plataforma | Pedido à verificadora dentro da GAIA |
| BE/FE: Lista de verificadores | Verificadoras credenciadas que pagam para aparecer |
