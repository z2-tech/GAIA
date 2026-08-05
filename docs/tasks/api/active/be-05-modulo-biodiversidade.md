# BE-05 — Desenvolvimento do módulo Biodiversidade (BAT)

> **Prioridade:** Alta | **Assignee:** @léo bola | **Status:** Pendente

## Escopo

Implementar o Biodiversity Assessment Tool baseado na planilha de referência.

> **Frontend aguardando (FE-12, ✅ concluído 2026-08-05):** o form BAT já está no padrão
> `forms.md` com schema/hook/mappers prontos, mas o `onSubmit` é um toast-stub porque
> este endpoint não existe. Ao entregar BE-05, o mapper `valuesToCreateBody`
> (`web/src/features/biodiversidade/modulo/bat/schemas/bat-modulo.ts`) precisa alinhar
> com o contrato final (`{ project_id, farm_id, answers: [{question_id, value}], notes }`)
> e trocar o stub pela mutation real em `web/src/services/biodiversity/`.

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
