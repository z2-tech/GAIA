---
description: Break the spec into small, atomic, dependency-ordered tasks. One slice at a time.
argument-hint: "[spec path or URL]"
model: opencode-go/deepseek-v4-pro
---

Plan how to build.

1. Load skills:
   - `to-tickets` — vertical slices (tracer bullets), each with blocking edges, sized to a single context window.
   - `wayfinder` — if the work is too big for one session, chart a decision map first.
   - `tdd` — confirm the seams under test before any code (highest seam, ideally one).
2. GAIA: dependency-order across stacks. Cross-stack → OpenAPI schema first, SDK regen, then Web (`docs/workflow/CROSS_STACK_PR.md`).
3. Publish: Plane tasks (`plane-doc-to-tasks` / `plane-task`) or `docs/tasks/` cards registered in `TODO/gaia.md`.
4. Output: ordered task list with blockers + the seams under test.

Small, atomic tasks. No code yet.
