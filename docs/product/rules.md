# GAIA: product rules

RP-n (Regra de Produto). Each rule: what holds in every feature, why, source.

## Calculations

- RP-1 A cancelled calculation is hidden, never deleted; a draft can be resumed; a finished result keeps the version it was calculated with. Why: past results must stay reproducible. [vault Sustainability-Metrics, MVP contract]
- RP-2 Reference factors belong to the platform and are versioned; what the user enters (activity, allocation, process values) is a snapshot inside that calculation. Why: a factor update never rewrites a past result. [vault Sustainability-Metrics, MVP contract]
- RP-3 An absent or uncomputed value stays empty (`null`) and shows a placeholder, never a synthetic zero. Why: a zero would read as a real measurement. [root AGENTS.md · vault Integration-Service]
- RP-7 A plot or farm may hold several calculations of one module; the latest is the most recent one not cancelled. Why: a technician redoes a calculation without losing the earlier one. [task BE-18 decision D0]

## Access

- RP-4 The global `admin` role sees every project and farm; the admin of one project manages only that project; `manager`, `technician`, and `auditor` see only what they are linked to (project admin, farm responsible, authorship); staff and superuser keep global access. Why: the role says what a user can do, the links say where. [product audios 2026-08-21, task BE-15, task BE-18 decision D0]

## Completion

- RP-5 A project becomes completed when every farm reaches 100% on every module of the project; cancelling any calculation or adding a farm puts it back in progress. Why: the status must always match the data behind it. [tasks BE-10, BE-16 (product owner decision)]
- RP-6 With plots, each plot's completeness comes from its own calculations, a calculation with no plot (older data) counts for every plot, and the farm is the mean of its plots weighted by area; a farm with no plots keeps the farm rule. Why: the work moved from farm to plot without breaking older data. [meeting 2026-08-14 §1.3, task BE-06]

