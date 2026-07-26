# BE-11 — Revalidar % de conclusão dos módulos

> **Prioridade:** Alta | **Assignee:** @fernandocampana | **Status:** Pendente

## Escopo

Auditar e corrigir a lógica de completude dos módulos (`_MODULE_COMPLETERS` dispatcher em `farms/services.py`).

## Verificações

- [ ] LCA: `lca/progress.py::farm_lca_progress()` — confere com os steps obrigatórios?
- [ ] RothC: cálculo feito = 100%?
- [ ] Regenerative: todas as questões respondidas = 100%?
- [ ] BAT (futuro): questões por área respondidas
- [ ] Média entre módulos está correta?
- [ ] Completude da fazenda = média dos módulos vinculados

## Testes

- [ ] Testes de unidade para cada `ModuleCompleter`
- [ ] Testes de integração: farm com 2/3 módulos = 66%
