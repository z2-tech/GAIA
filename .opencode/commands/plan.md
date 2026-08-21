---
description: Break the spec into small, atomic, dependency-ordered tasks. One slice at a time.
argument-hint: "[spec path or URL]"
---

Plan how to build.

0. Model check: run `opencode models`. If the current session model is absent from the list, or a clearly stronger planning model (higher context / reasoning tier) is available from the user's connected providers, say so in one line and suggest switching before planning. Proceed either way — the suggestion is advisory, never blocking.
1. Load skills:
   - `to-tickets` — vertical slices (tracer bullets), each with blocking edges, sized to a single context window.
   - `wayfinder` — if the work is too big for one session, chart a decision map first.
   - `tdd` — confirm the seams under test before any code (highest seam, ideally one).
2. GAIA: dependency-order across stacks. Cross-stack → OpenAPI schema first, SDK regen, then Web (`docs/workflow/CROSS_STACK_PR.md`).
3. Publish: Plane tasks (`plane-doc-to-tasks` / `plane-task`) or `docs/tasks/` cards registered in `TODO/gaia.md`.
4. Output: ordered task list with blockers + the seams under test.

Small, atomic tasks. No code yet.
