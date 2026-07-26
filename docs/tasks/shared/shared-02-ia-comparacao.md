# SHARED-02 — Integrar IA para comparação de módulos

> **Prioridade:** Baixa (Backlog) | **Assignee:** @léo bola, @fernandocampana | **Status:** Pendente

## Escopo

Usar IA para gerar análises comparativas textuais entre assessments, destacando padrões, anomalias e recomendações.

## Abordagem

- Backend: endpoint que recebe dados de 2+ assessments e retorna análise textual
- Frontend: card de "Análise IA" na tela de comparação

## Checklist

- [ ] Definir provider (OpenAI, Claude, etc.)
- [ ] Criar prompt template com contexto de sustentabilidade
- [ ] Endpoint `POST /api/v1/compare/analyze/`
- [ ] Exibir resultado na tela de comparação

## Referências

- `docs/vault/concepts/Sustainability-Metrics.md`
