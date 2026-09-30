# 05 · Rascunho de tasks

Não criadas no Plane. "Depende de" aponta perguntas do
[questionário](04-questionario-produto.md).

## v1: convite, leitura, download

| Título | O quê | Depende de |
|---|---|---|
| PROD: Regras do auditor | Quem convida, duração, vários clientes, trava durante auditoria, simulações, dados pessoais | 1–9 |
| PROD: Telas no Penpot | Aba Acesso, diálogo de convite, aceite, faixa de modo auditoria, painel de verificação, rastro do cálculo | 3 |
| BE: Membro de projeto | Model `ProjectMember` (projeto, usuário, papel no projeto, convidado por, acesso até, revogado em) | 4, 5 |
| BE: Acesso por membro | Incluir membros ativos em `_user_accessible_project_qs`, `user_has_project_farm_access`, `_user_accessible_farm_qs`; teste de isolamento por módulo (LCA, RothC, Regenerativo, Biodiversidade, comparação, uploads) | 6 |
| BE: Somente leitura por projeto | Checagem "é auditor deste projeto" nas escritas, no lugar de `user_has_role_name`; fecha Biodiversidade (criar, cancelar) e upload | — |
| BE: Convite | Token de 128 bits com hash, uso único, 7 dias, preso ao e-mail; e-mail via Resend; aceite cria conta ou anexa à existente; reenviar, cancelar, revogar | 4, 5 |
| BE: Só oficiais para o auditor | Filtrar simulações nas listagens quando o usuário é auditor do projeto | 8 |
| BE: Permissão do usuário no projeto | Campo ou endpoint que diz à web o papel do usuário naquele projeto | — |
| FE: Aba Acesso | Lista de membros e convites, status, último acesso, convidar, reenviar, revogar | layout |
| FE: Aceite do convite | Rota pública do link: criar conta ou entrar, depois cai no projeto | layout |
| FE: Modo auditoria | Faixa fixa, menu reduzido, botões de escrita pela permissão do projeto (substitui `useCanWriteAssessments`) | layout |
| FE: Painel de verificação | Matriz fazenda × módulo com o oficial; Excel e PDF no topo | layout, 00, 01, 02 |

## v1.5: rastro do cálculo

| Título | O quê | Depende de |
|---|---|---|
| BE: Fator e fonte em todo cálculo | Guardar fator, unidade e fonte usados em todas as fontes da LCA, não só fertilizante, defensivo, semente e energia; `source` em todos os catálogos | 10 |
| BE: Versão do catálogo de fatores | Versão por catálogo; cálculo guarda a versão | 10 |
| FE: Rastro do cálculo | Tabela insumo → quantidade → fator → fonte → emissão; entradas do RothC; respostas do Regenerativo e da Biodiversidade | 10 |
| BE: Log de acesso do auditor | O que abriu e o que baixou; visível ao dono | 9, 12 |

## v2: apontamentos e verificação

| Título | O quê | Depende de |
|---|---|---|
| BE/FE: Apontamentos | Por item (talhão × módulo ou linha do rastro); tipo (correção, esclarecimento, próxima verificação); status aberto → respondido → fechado | 2, 13 |
| BE/FE: Enviar para verificação | Trava o projeto; status "Em auditoria" na API (a web já tem o badge) | 7 |
| BE/FE: Registro de verificação | Campos da pergunta 14 e PDF da declaração; atualiza selo do PDF (02) e da página do QR (03); encerra o acesso do auditor | 14, 15 |
| BE: Histórico de alterações | Quem mudou o quê e quando | 12 |
| BE/FE: Evidências | Anexos por dado primário | 11 |

## Dependências

- **00 cálculo oficial:** o auditor olha o oficial.
- **01 export:** Excel com fatores.
- **02 PDF / 03 QR:** selo "Verificado por … em dd/mm".

## Antes de abrir para auditor (correções já conhecidas)

| Título | Onde |
|---|---|
| BE: Unidade de combustível ignorada | `lca/calculations/fuel.py:88-98` |
| BE: Gravar janela de modelagem do RothC | `rothc/serializers.py:277-280` |
| BE: Delta BAU × projeto único | `comparison/selectors.py:136` vs `rothc/services.py:1807` |
| BE: Pecuária no denominador do Regenerativo | `regenerative/selectors.py:126-135` |
| BE: Denominador da Biodiversidade | `biodiversity/services.py:35-48` vs `:170-216` |
