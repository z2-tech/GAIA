# Referências — GAIA

Documentação técnica e specs de domínio.

| Categoria | Diretório | Conteúdo |
|-----------|-----------|----------|
| Arquitetura | `architecture/` | Specs de integração API↔Next.js, OpenAPI codegen |
| Domínio | `domain/` | Planilhas BAT, EIQ e STIR. Fontes LCA/RothC ainda ausentes. |
| UX | `ux/` | Briefs de UI |
| Auth | `auth/` | JWT, RBAC, roles |
| Planejamento | `planning/` | Roadmap, milestones |
| Reuniões | `meetings/` | Notas |
| Histórico | `_stale/` | Docs deprecated |

### Planilhas de referência (`domain/`)

| Arquivo | Módulo | Descrição |
|---------|--------|-----------|
| `Biodiversity Assessment Tool Prototype_Final.xlsx` | BAT | Questionário de biodiversidade — 29+ questões, 3 áreas, sistema de pontuação |
| `EIQ_Final.xlsx` | EIQ | Environmental Impact Quotient — 631 nomes preenchidos; toxicidade e persistência |
| `STIR_calculadora_metric_v4.xlsx` | STIR | Soil Tillage Intensity Rating — biblioteca PT-BR de implementos agrícolas |

### Autoridade

- BAT/EIQ/STIR: planilhas de referência dos respectivos módulos.
- LCA/RothC: nenhuma metodologia ou planilha científica está versionada neste repositório.
- Reuniões: contexto de produto, não fonte científica; decisões devem ser confirmadas.
- Código/testes: comportamento implementado, não validação metodológica independente.

Para referências atualizadas, prefira o vault: `docs/vault/00-INDEX.md`.
