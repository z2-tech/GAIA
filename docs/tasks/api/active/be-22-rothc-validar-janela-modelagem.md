# BE-22 — RothC: validar a janela de modelagem do assessment

> **Prioridade:** Alta | **Assignee:** Fernando | **Status:** ✅ Concluído (2026-08-11)
> **Plane:** [GAIA-38](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/f3a4111a-831a-464f-947a-a2ce330ef595)

## Problema

Os quatro campos da janela de modelagem são validados entre si e depois ignorados.

- `start_month_modeling`, `start_year_modeling`, `end_month_modeling`,
  `end_year_modeling` passam por `RothcAssessmentCreateSerializer.validate`
  (`rothc/serializers.py:310-317`) — que só checa fim > início.
- São repassados para `RothcServiceV2.create_assessment` (`rothc/services.py:571-574`)
  e **nunca usados no corpo do método**.
- O período efetivo do cálculo sai de `dados_mensais` (`all_periods`,
  `rothc/services.py:605-609`).

Nada garante que as linhas mensais cobrem a janela declarada. Um cliente pode declarar
2020-01 → 2025-12 e enviar 3 meses de dados: a API aceita e devolve um resultado que não
corresponde à janela pedida.

No mock a janela é a fonte da verdade — ela gera o grid mensal, gera os anos de
`productivity_by_year` e delimita os ciclos anuais. A divergência silenciosa é um risco
real de dado errado em produção.

## O que fazer

- Validar no serializer que `dados_mensais` de `bau` e de `project` cobrem exatamente a
  janela inclusiva, comparando todos os pares `(ano, mes)`. As regras de contiguidade,
  duplicidade e ordenação continuam obrigatórias.
- Validar ciclos, produtividades anuais e aplicações de carbono dentro da mesma janela.
- Exigir a mesma série completa em BAU e Projeto também no GET por período; não validar
  somente a fatia solicitada.
- Alternativa: remover os 4 campos do contrato se a janela for redundante. **Preferir
  validar** — o frontend precisa dos campos para montar o formulário.
- Erro 400 apontando o campo divergente, não mensagem genérica.

## Aceite

- [x] Janela declarada divergente de `dados_mensais` → 400.
- [x] `bau` e `project` com janelas diferentes entre si → 400.
- [x] Ciclo, produtividade perene ou composto fora da janela → 400.
- [x] Testes para cada caso.

## Entregue

- `_validate_assessment_input` em `rothc/services.py` cobre todos os casos
- Testes em `TestAssessmentInputValidation`: missing/extra month, duplicate, out of order,
  cross-window cycle, perennial year mismatch, compost outside window
