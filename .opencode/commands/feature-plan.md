---
description: Define structured tasks from a feature request or spec. Creates actionable, dependency-ordered task list in docs/tasks/.
argument-hint: "[feature description or spec path]"
---

From the feature request or spec, produce a structured task list following GAIA conventions:

1. Read `docs/tasks/` for existing task patterns
2. Create API specs in `docs/tasks/api/active/be-{slug}.md`, Web specs in `docs/tasks/web/active/fe-{slug}.md`, or shared specs in `docs/tasks/shared/shared-{slug}.md`
3. Register the task in `TODO/gaia.md` with ID, assignee and status
4. For cross-stack work, create linked BE/FE tasks and follow `docs/workflow/CROSS_STACK_PR.md`
5. Output: task file path + TODO entry

Task format: scope, endpoints (if API), checklist, contract checklist, links to related tasks.
