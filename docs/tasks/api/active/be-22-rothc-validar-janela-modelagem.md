# BE-22 — RothC: validar a janela de modelagem do assessment

> **Prioridade:** Média | **Assignee:** — | **Status:** Priorizado
> **Plane:** [GAIA-38](https://plane.z2t.dev/gaia/projects/fe4e534c-2855-4a42-af0a-1aca6bb7820c/issues/f3a4111a-831a-464f-947a-a2ce330ef595)

## Problema

Os quatro campos da janela de modelagem são validados entre si e depois ignorados.

- `start_month_modeling`, `start_year_modeling`, `end_month_modeling`,
  `end_year_modeling` passam por `RouthcAssessmentCreateSerializer.validate`
  (`routhc/serializers.py:310-317`) — que só checa fim > início.
- São repassados para `RouthcServiceV2.create_assessment` (`routhc/services.py:571-574`)
  e **nunca usados no corpo do método**.
- O período efetivo do cálculo sai de `dados_mensais` (`all_periods`,
  `routhc/services.py:605-609`).

Nada garante que as linhas mensais cobrem a janela declarada. Um cliente pode declarar
2020-01 → 2025-12 e enviar 3 meses de dados: a API aceita e devolve um resultado que não
corresponde à janela pedida.

No mock a janela é a fonte da verdade — ela gera o grid mensal, gera os anos de
`productivity_by_year` e delimita os ciclos anuais. A divergência silenciosa é um risco
real de dado errado em produção.

## O que fazer

- Validar no serializer que `dados_mensais` de `bau` e de `project` cobrem exatamente a
  janela: primeiro registro = início declarado, último = fim declarado. As regras de
  contiguidade e ordenação já existem em `validate_dados_mensais`
  (`routhc/serializers.py:269`) — reaproveitar.
- Alternativa: remover os 4 campos do contrato se a janela for redundante. **Preferir
  validar** — o frontend precisa dos campos para montar o formulário.
- Erro 400 apontando o campo divergente, não mensagem genérica.

## Aceite

- [ ] Janela declarada divergente de `dados_mensais` → 400.
- [ ] `bau` e `project` com janelas diferentes entre si → 400.
- [ ] Teste para cada caso.
