# BE-04 — Rotas de exclusão e clone do Regenerativo

> **Prioridade:** Alta | **Assignee:** @léo bola | **Status:** Pendente

## Escopo

- `DELETE /api/v1/regenerative/assessments/{id}/delete/` — soft-delete
- `POST /api/v1/regenerative/assessments/{id}/clone/` — clonar assessment com respostas

## Regras

- Clone copia todas as RegenerativeAssessmentAnswer
- Soft-delete via canceled_at

## Checklist

- [ ] Serializers + services
- [ ] Testes
