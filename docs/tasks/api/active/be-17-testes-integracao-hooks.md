# BE-17 — Testes de integração dos hooks de auto-complete (RothC + LCA)

> **Prioridade:** Alta | **Assignee:** @fernandocampana | **Status:** Concluído

**Concluído em sessão fresh (2026-Q3).** Implementação em `routhc/tests/test_services.py` + `lca/tests/test_auto_complete.py` (commit 9395139). Refinamento pós-review: teste de coordenadas asserta `CustomError`/mensagem específica + ausência de `RothcCalculation`; `routhc.tests` registrado no `test_runner.py` (antes os testes routhc não rodavam na suíte). Full suite: **139 testes OK**.

## Escopo

### a) RothC — `routhc/tests/test_services.py`

- `RouthcService.calcular()` (routhc/services.py:117) chama `OpenMeteoService.fetch_monthly_weather` → mockar com `@patch("openmeteo.services.OpenMeteoService.fetch_monthly_weather")` retornando `{(ano, mes): {"precipitacao_mm": x, "temperatura_c": y}}` para os períodos usados (sem rede)
- Setup: projeto com módulo `carbono` + farm com latitude/longitude + `dados_mensais` (shape: ano, mes, periodo, dpm_rpm, cobertura_solo + campos do `calcular_entrada_c`)
- **Cenário principal**: após `calcular()`, projeto (1 farm, 1 módulo carbono) → `status == "completed"` (completer carbono 1.0 → farm 100% → projeto 100%)
- **Cenário secundário**: farm sem coordenadas → `CustomError` FARM_COORDINATES_NOT_FOUND, hook não dispara

### b) LCA — `lca/tests/test_auto_complete.py` (DRF APITestCase)

- Fluxo completo via test client: `project_culture_view` → `create_project_soil` → `create_project_inputs` → `create_project_fuel` → `calculate_project` (5 mutations, payloads dos serializers)
- **Cenário principal**: após `calculate_project`, projeto (1 farm, só módulo LCA) → `status == "completed"`
- **Cenário secundário**: apenas culture (20%) → projeto segue `in_progress`

## Regras

- Lean-code: nomes de teste descritivos, sem labels de ticket (BE-xx) em nomes/docstrings
- Seguir padrões factory-boy existentes (ProjectFactory trait `completed`, FarmFactory, módulo via `project.modules`)
- Nenhum teste pode depender de rede/API externa

## Checklist

- [x] RothC: fluxo completo mockado → completed
- [x] RothC: sem coordenadas → erro + sem hook
- [x] LCA: fluxo 5 mutations → completed
- [x] LCA: culture só → in_progress
- [x] `python test_runner.py --settings=test_settings --keepdb` verde (139 testes, suite completa)
- [x] `pre-commit run --files <alterados>` green
