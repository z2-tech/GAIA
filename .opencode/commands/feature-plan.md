---
description: Define structured tasks from a feature request or spec. Creates actionable, dependency-ordered task list in docs/tasks/.
argument-hint: "[feature description or spec path]"
model: opencode-go/deepseek-v4-pro
---

From the feature request or spec, produce a structured task list following ATYHA conventions:

1. Read `docs/tasks/` for existing task patterns
2. Create `docs/tasks/{api,web}/be-{slug}.md` or `fe-{slug}.md` using the established format
3. Register the task in `TODO/atyha.md` with ID and status
4. Output: task file path + TODO entry

Task format: scope, endpoints (if API), checklist, contract checklist, links to related tasks.
