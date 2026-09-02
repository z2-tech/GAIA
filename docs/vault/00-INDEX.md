---
tags: [moc]
---

# GAIA Knowledge Graph

Sustainability metrics platform: LCA, RothC carbon modeling, regenerative agriculture.

## Systems

Backend: [[Backend-API]] · Frontend: [[Frontend-App]]
Orchestration: [[Orchestrator-GAIA]]

## Concepts

[[Sustainability-Metrics]] — CO2e, GWP, carbon sequestration, biodiversity, pesticide impact, tillage intensity
  - [[Sustainability-Metrics#lca--manejo-atual-e-remocao-anual-2026-09|LCA manejo anual / net]]
  - [[Sustainability-Metrics#lca--comparacao-e-benchmark-2026-09|LCA comparação / benchmark]]

## Decisions

- [[decisions/2026-09-01-soil-management-net-and-comparison-dedup|2026-09-01 — manejo, net líquido e comparação dinâmica]]

## Flows

[[Completion-Flow]]

## Agent Architecture

17 agents: `senior-backend` → 7 backend sub-agents; `senior-nextjs` → 5 frontend sub-agents; sustainability-specialist, cross-stack e software-architecture.
Harness-agnostic: `.opencode/agents/` → `.claude/` → `.cursor/` → `.github/`
SDD: `/feature-plan`, `/feature-implement`, `/feature-validate`
Hooks: `.claude/settings.json`

## References

[[../references/README|Reference Index]]
