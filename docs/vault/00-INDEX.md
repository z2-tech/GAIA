---
tags: [moc]
---

# GAIA Knowledge Graph

Sustainability metrics platform: LCA, RothC carbon modeling, regenerative agriculture.

## Systems

Backend: [[Backend-API]] · Frontend: [[Frontend-App]]
Orchestration: [[Orchestrator-GAIA]]

## Concepts

[[Domain-Glossary]] — LCA, RothC, regenerative, CFP, EIQ, STIR, BAT terminology
[[Sustainability-Metrics]] — CO2e, GWP, carbon sequestration, biodiversity, pesticide impact, tillage intensity

## Flows

[[Data-Flow-Overview]] · [[LCA-Workflow]] · [[Carbon-Modeling]]

## Agent Architecture

11 agents: `senior-backend` (orchestrator) → 7 layer sub-agents + sustainability-specialist + senior-nextjs + cross-stack + software-architecture.
Harness-agnostic: `.opencode/agents/` → `.claude/` → `.cursor/` → `.github/`
SDD: `/feature-plan`, `/feature-implement`, `/feature-validate`
Hooks: `.claude/settings.json`

## References

[[../references/README|Reference Index]]
