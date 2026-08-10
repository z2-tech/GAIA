---
tags: [system]
---

# Integration-Service (futuro)

## Status: Planejado

GAIA atualmente não possui pipeline central de ingestão de dados externos. Módulos futuros que poderiam exigir integração:

| Fonte | Dado | Módulo |
|-------|------|--------|
| Open-Meteo | Temperatura, precipitação | RothC (integração existe; política de projeção ainda não validada) |
| NYS IPM | EIQ values (631 nomes preenchidos) | EIQ — carga inicial seed |
| USDA-NRCS | STIR reference values | STIR — carga inicial seed |
| IBGE/EMBRAPA | Tipos de solo, biomas | LCA, BAT |
| Cool Farm Tool API | Carbon footprint externo | CFP — pendente |

## Padrão de ingestão (proposto)

Definir o pipeline somente quando houver requisitos concretos de dados dinâmicos:
- Tabelas de referência → seed migrations (idempotentes)
- APIs externas → Celery tasks com cache TTL
- Fallback → somente regra aprovada e rastreável; nunca zero/default sintético

## Links

- Planilhas de referência: `docs/references/domain/`
- Módulos planejados: [[Sustainability-Metrics]]
