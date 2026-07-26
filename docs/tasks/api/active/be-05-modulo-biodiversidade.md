# BE-05 — Desenvolvimento do módulo Biodiversidade (BAT)

> **Prioridade:** Alta | **Assignee:** @léo bola | **Status:** Pendente

## Escopo

Implementar o Biodiversity Assessment Tool baseado na planilha de referência.

## Modelos

- `BiodiversityAssessment`: project_farm FK, área (produção/pequena/grande), score
- `BiodiversityQuestion`: número, texto (PT/EN), área, peso
- `BiodiversityAnswer`: assessment FK, question FK, resposta (bool/text)

## Planilha de referência

`docs/references/domain/Biodiversity Assessment Tool Prototype_Final.xlsx`
- Abas: Área de produção (29 questões), Pequena área não produtiva, Grande área não produtiva
- Aba Pontuação: thresholds para classificação

## Endpoints

- `GET /api/v1/biodiversity/questions/` — listar questões por área
- `POST /api/v1/biodiversity/assessments/` — criar assessment
- `GET /api/v1/biodiversity/assessments/{id}/` — detalhe
- `GET /api/v1/biodiversity/assessments/{id}/dashboard/` — score

## Checklist

- [ ] Models + migration (seed questions da planilha)
- [ ] Selectors + services
- [ ] Serializers + views + urls
- [ ] Testes
- [ ] Registrar módulo "biodiversidade" no `_MODULE_COMPLETERS`
