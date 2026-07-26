---
description: Implement tasks from a feature plan, following TDD pattern. Reads spec from docs/tasks/ and implements across atyha-api and/or atyha-web.
argument-hint: "[task slug or spec path]"
model: opencode-go/deepseek-v4-pro
---

Implement the feature task following ATYHA workflow:

1. Read the task spec from `docs/tasks/{api,web}/`
2. API tasks: use `senior-backend` agent (routes to sub-agents by layer)
3. Web tasks: use `flutter-senior` agent
4. Follow contract-first: API contract before Flutter implementation
5. Run tests after each layer: `python test_runner.py` (API) or `flutter test` (Web)
6. Update `CHANGELOG.md` on completion

Cross-stack features: implement API first, then Flutter. Use `cross-stack` agent for contracts.
