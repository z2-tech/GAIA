# CONTEXT — GAIA

Sustainability metrics platform for regenerative agriculture. Three repos:
`gaia-api` (Django DRF), `gaia-web` (Next.js), `GAIA` (orchestration only).

## Domain glossary

The authoritative glossary lives in `docs/vault/` — start at `docs/vault/00-INDEX.md`.
Core concepts, used verbatim:

- **Assessment** — a sustainability evaluation owned by `ProjectFarm`. Fields are
  snapshotted at save; cancelled records stay hidden, drafts resume, concluded
  results keep their version.
- **LCA** ("Carbono Emissão") — carbon footprint from emissions (GHG Protocol v2.0,
  GWP IPCC AR6). Reference factors are server-owned and versioned.
- **RothC** ("Carbono Remoção") — soil organic-carbon model (Coleman & Jenkinson).
  Two scenarios `bau` and `project` over the same monthly window. Harvest-index
  convention: `resíduo = P_MS × (1 − HI) / HI`.
- **Regenerativo** — regenerative-agriculture scoring (weighted indicators).
- **BAT** — Biodiversity Assessment Tool (43-question questionnaire).
- **EIQ** — Environmental Impact Quotient (pesticide risk). Planned.
- **STIR** — Soil Tillage Intensity Rating. Planned.
- **CFP** — Cool Farm Platform integration (payload-only, partial).
- **Null** — absent or uncomputed values stay `null` and render as a placeholder,
  never a synthetic zero.

Full definitions and product decisions: `docs/vault/concepts/Sustainability-Metrics.md`.
Domain questions (formulas, methodology) → the `sustainability-specialist` agent.

## Decisions (ADRs)

GAIA does NOT use `docs/adr/`. System decisions and domain rules live in
`docs/vault/` (start at `00-INDEX.md`). When a skill says "check ADRs", read the
relevant vault note instead.

## Standards

Engineering standards and agent routing live in `AGENTS.md` (auto-loaded into every
session). Highlights: PT for UX/domain, EN for code; contract-first (OpenAPI before
SDK); Django views never query, services never return QuerySets; zero comments by
default; CodeGraph-first; never commit without authorization.
