# BE-10 — Status do projeto: concluído automaticamente se 100%

> **Prioridade:** Alta | **Assignee:** @fernandocampana | **Status:** Pendente

**Executar NESTA sessão.** Análise concluída: `ProjectStatus` enum já existe, `Project.status` default `in_progress`, NÃO há trigger automático hoje.

## Escopo

`gaia-api/projects/services.py` — `ProjectService.auto_complete_project()` + 3 pontos de integração. NÃO usar signals (check explícito pós-mutation, padrão HackSoftware).

## Implementação

### 1. `ProjectService.auto_complete_project(*, project: Project) -> None` em `projects/services.py`

- Guard 1: `project.status != ProjectStatus.IN_PROGRESS.value` → return
- Guard 2: `project.farms.count() == 0` → return
- Chamar `get_project_completeness(project=project)` (já existe, linha 37); se `completion_percentage == 100` → `project.status = ProjectStatus.COMPLETED.value; project.save(update_fields=["status"])`

### 2. Integrar em 3 pontos de mutation

- [ ] **Ponto 1**: `routhc/services.py::RouthcService.calcular()` — pós-create do `RothcCalculation` (dentro ou após o `transaction.atomic()`, linha ~239), obter `project` da farm e chamar `auto_complete_project`
- [ ] **Ponto 2**: `regenerative/services.py` — pós-save em `create_assessment()` (linha 51) e `update_assessment()` (linha 111)
- [ ] **Ponto 3**: views LCA pós-`transaction.atomic()` (buscar no `lca/views.py` os pontos de mutation e chamar via service, nunca view→model direto)

### 3. Decisão D1 (PENDENTE de PO)

- [ ] Confirmar com PO: projeto `completed` + nova farm via `add_farm_to_project` → volta `in_progress`? Se sim: +3 linhas em `add_farm_to_project` (projects/services.py, linha 113) reabrindo status. Se não: nada.

## Checklist

- [ ] `auto_complete_project` com os 2 guards + save com `update_fields`
- [ ] Projeto 100% e com farms → `completed`
- [ ] Projeto <100% → permanece `in_progress`
- [ ] Projeto `cancelled` → bloqueado (guard 1)
- [ ] Projeto 100% com 0 farms → bloqueado (guard 2)
- [ ] (D1) completed + nova farm → in_progress (se PO confirmar)
- [ ] Testes em `projects/tests/services/test_project_service.py` + integração em `routhc/tests` / `regenerative/tests`
- [ ] Rodar `python test_runner.py --settings=test_settings --keepdb` + `pre-commit run --all-files` + `python manage.py spectacular --validate --fail-on-warn`
