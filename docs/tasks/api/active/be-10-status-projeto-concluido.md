# BE-10 — Status do projeto: concluído automaticamente se 100%

> **Prioridade:** Alta | **Assignee:** @fernandocampana | **Status:** Pendente

## Escopo

Quando todos os módulos de todas as fazendas de um projeto atingirem 100% de completude, marcar automaticamente `Project.status = "completed"`.

## Implementação

- Signal ou check no `_MODULE_COMPLETERS` dispatcher
- `Project.status`: choices `in_progress`, `completed`, `cancelled`
- Trigger: após qualquer mutation de assessment, verificar completude do projeto

## Checklist

- [ ] Lógica em `farms/services.py` ou `projects/services.py`
- [ ] Testes: projeto com 100% → completed, projeto com <100% → in_progress
