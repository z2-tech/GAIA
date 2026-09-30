# 01 · Entendimento

## O pedido

- 29/09 [41:12]: a Control Union "verifica dentro da plataforma se os cálculos
  estão ok e fala: está ok, dado real verificado". Depois vem PDF e QR.
- 29/09 [43:04]: Ruan preocupado em não deixar "qualquer um tentar se cadastrar
  como auditor".
- 29/09 [44:32]: Z2: "não vamos pensar em ambiente, vamos pensar em permissões".
- 29/09 [46:40]: modelo de outro projeto da Z2: quem fez o projeto **convida o
  auditor por e-mail**, ele cria a conta e ganha acesso só àquele projeto. Ruan:
  "acho que funciona".
- 29/09 [49:40–51:00]: o auditor vê todas as fazendas e talhões, os cálculos
  **finais** de cada módulo, os **dados primários** (defensivos, produtos) e os
  **fatores de emissão** usados. Baixa Excel e PDF.
- 29/09 [52:16–52:44], futuro: pedir verificação pela Control Union na plataforma
  (cobrada à parte); lista de verificadores credenciados que pagam para aparecer,
  como os VVBs da Verra.

Perguntas já feitas em outros questionários, **não repetidas aqui**:

| Onde | Pergunta |
|---|---|
| 00 · J5 | Verificação antes ou depois de finalizar o projeto |
| 00 · J6 | Se o auditor achar erro, quem corrige e como volta para ele |
| 00 · 16 | Reabrir projeto finalizado e o que acontece com a verificação |
| 00 · 20 | Ter o estado "verificado" na plataforma ou só guardar o documento |
| 00 · 23 | Histórico de trocas do oficial |
| 01 · aba de fatores | Fatores de emissão no Excel, para todos ou só para o auditor |
| 01 · quem exporta | Se o auditor pode exportar |

## O que existe

Caminhos: `A` = `gaia-api`, `W` = `gaia-web/src`.

### Papel `auditor`: existe, mas é global

- Papéis em `A/authx/models.py`: `Role` + `Membership` (usuário ↔ papel, **sem
  projeto**). Seeds: admin, manager, technician, auditor
  (`A/authx/migrations/0003_seed_default_roles.py`).
- `HasRole("admin", "manager", "technician", "auditor")` em 78 views. A escrita é
  barrada dentro da view com `user_has_role_name(..., "admin", "manager",
  "technician")` na maioria dos casos. Furos:
  - Biodiversidade: auditor cria e cancela avaliação (`A/biodiversity/views.py:106`,
    `:226`, já registrado em [../modulos-referencia.md](../modulos-referencia.md)).
  - Upload: auditor pede URL de upload (`A/uploads/views.py:43`).
- Na web, `useCanWriteAssessments` (`W/services/auth/authz.query.ts:36`) esconde
  botões de escrita se o usuário tem o papel auditor em qualquer lugar.
- **Problema:** somente leitura é global. Um técnico da empresa A convidado como
  auditor do projeto B continua técnico, e escreve no B. O "somente leitura"
  precisa valer **por projeto**.

### Acesso a projeto: por dono, não por membro

- Quem vê um projeto: `created_by`, `admin` do projeto, criador ou responsável de
  alguma fazenda, ou staff. Três funções decidem tudo:
  - `ProjectSelectors._user_accessible_project_qs` (`A/projects/selectors.py:17`)
  - `ProjectSelectors.user_has_project_farm_access` (`A/projects/selectors.py:70`)
  - `FarmSelectors._user_accessible_farm_qs` (`A/farms/selectors.py:11`)
- 33 chamadas passam por elas, e os cálculos de LCA, RothC, Regenerativo e
  Biodiversidade checam acesso via `user_has_project_farm_access`. **Bom sinal:**
  incluir "membro convidado do projeto" nessas três funções libera a leitura em
  todos os módulos de uma vez.
- Não existe membro de projeto, convite nem lista de acesso.

### Contas e e-mail

- Só admin cria usuário (`register_user`, `HasRole("admin")`). Não há cadastro
  aberto nem convite.
- Senha gerada e **enviada em texto no e-mail** (Resend,
  `A/core/email_service.py`), com `must_change_password`. Para um convite externo,
  link com token é melhor que senha por e-mail.
- `PasswordResetToken` (hash do token, validade, uso único,
  `A/authx/models.py`) é o padrão a copiar para o token de convite.

### Fatores de emissão

- Catálogos com `fe` e `fe_unit` (`LcaFertilizer`, `LcaDefensive`, `LcaSeed`,
  `LcaFuelType`…, `A/lca/models.py`). `source` só em alguns (fertilizante não tem).
  **Sem versão.**
- O resultado da LCA (`LcaCalculationResult.result`, JSON) guarda o `fe` usado por
  item em fertilizante, defensivo, semente e energia (`A/lca/calculations/*.py`).
  Nos demais, e nas constantes em código (`FE_ENERGY`), não fica claro qual valor
  valia no dia.
- Nenhuma tela mostra fator por cálculo.

### Outros

- **Sem log de auditoria** (nem `django-simple-history`, nem `auditlog`). Não há
  como mostrar quem mudou o quê e quando.
- A web tem badge "Em auditoria" (`W/components/badge/badge-status.tsx:12`), mas a
  API só conhece `in_progress`, `completed`, `cancelled`
  (`A/projects/enum/project_status.py`).
- Remoção: janela de modelagem não é gravada (`A/rothc/serializers.py:277-280`). O
  verificador pede.

## Dependências

| Feature | Por quê | Sem ela |
|---|---|---|
| 00 cálculo oficial | O auditor verifica o oficial; simulação não entra | Auditor não sabe qual cálculo olhar |
| 01 export | O auditor baixa os dados e os fatores | Verificação só na tela |
| 02 PDF | O auditor baixa o PDF; o selo muda para "verificado" | — |
| 03 QR | A página pública mostra "Verificado por … em dd/mm" | Página diz só "Autodeclarado" |

## Decisões técnicas (Z2)

- **Membro de projeto, não papel global:** tabela `ProjectMember` (projeto,
  usuário, papel no projeto, convidado por, validade, revogado em). O papel
  `auditor` do projeto é somente leitura **naquele projeto**, qualquer que seja o
  papel global.
- **Três funções de acesso** passam a incluir membros ativos. Leitura liberada em
  todos os módulos sem mexer em cada view.
- **Escrita:** uma checagem por projeto ("é auditor deste projeto? então não
  escreve") no lugar do `user_has_role_name` espalhado. Fecha os furos de
  Biodiversidade e upload.
- **Convite:** token aleatório de 128 bits com hash no banco, uso único, validade
  de 7 dias (limite do NIST para código de cadastro), preso ao e-mail convidado. Quem já tem conta só aceita; quem não tem cria nome e
  senha na hora. Nada de senha por e-mail.
- **Web:** permissão vem do projeto (`/projects/{id}/me` ou campo no detalhe do
  projeto), não dos papéis globais.
- **Log de acesso** do auditor (o que abriu, o que baixou): tabela simples, sem
  lib, se o produto pedir.

## Riscos

- **Vazamento entre clientes:** o auditor da Control Union verifica vários
  clientes. Qualquer furo nas três funções de acesso mostra projeto de outro
  cliente. Precisa de teste por módulo.
- **LGPD:** o auditor vê nome, CPF e localização do produtor. Precisa de base
  legal e contrato com a verificadora.
- **Fator sem versão:** se o catálogo mudar entre o cálculo e a auditoria, a tela
  mostra o fator novo para um cálculo feito com o antigo.
- **Edição durante a auditoria:** sem trava ou log, o auditor aprova um número que
  muda no dia seguinte (liga com a H1 da feature 00: o oficial trava ao
  finalizar).
- **Cadastro de auditor falso** (preocupação do Ruan): com convite preso ao e-mail
  e sem cadastro aberto, só entra quem o dono convidou.
