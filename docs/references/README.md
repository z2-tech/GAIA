# Referências — GAIA

Documentação técnica e specs de domínio.

| Categoria | Diretório | Conteúdo |
|-----------|-----------|----------|
| Arquitetura | `architecture/` | Specs de integração API↔Next.js, OpenAPI codegen |
| Domínio | `domain/` | Planilhas BAT, EIQ, STIR e template RothC. [Inventário](domain/README.md). |
| UX | `ux/` | Briefs de UI |
| Auth | `auth/` | JWT, RBAC, roles |
| Planejamento | `planning/` | Roadmap, milestones |
| Reuniões | `meetings/` | Notas |
| Histórico | `_stale/` | Docs deprecated |

### Planilhas de referência (`domain/`)

| Arquivo | Módulo | Descrição |
|---------|--------|-----------|
| `Biodiversity Assessment Tool Prototype_Final.xlsx` | BAT | Questionário de biodiversidade — 43 questões, 3 áreas, sistema de pontuação |
| `EIQ_Final.xlsx` | EIQ | Environmental Impact Quotient — 631 nomes preenchidos; toxicidade e persistência |
| `STIR_calculadora_metric_v4.xlsx` | STIR | Soil Tillage Intensity Rating — biblioteca PT-BR de implementos agrícolas |
| `RothC_Model_short (com dados coletados).xlsx` | RothC | Template mensal dos pools; colunas de entrada estão vazias |

### Autoridade

- BAT/EIQ/STIR: planilhas de referência funcional dos respectivos módulos.
- RothC: template interno de fórmulas, sem proveniência ou vetor dourado preenchido.
- LCA: nenhuma metodologia, tabela de fatores ou planilha científica versionada.
- Reuniões: contexto de produto, não fonte científica; decisões devem ser confirmadas.
- Código/testes: comportamento implementado, não validação metodológica independente.

Para referências atualizadas, prefira o vault: `docs/vault/00-INDEX.md`.

### Contexto recente de produto

- [21/08/2026 — áudios sobre comparação, permissões e pousio](meetings/21-08-26-comparacao-permissoes-pousio/21-08-26-audios-whatsapp-transcricao-e-encaminhamentos.md)
- [14/08/2026 — Carbono Emissão e próximas etapas](meetings/14-08-26-carbono-emissao-+-proximas-etapas/14-08-26-carbono-missao-resumo.md)
