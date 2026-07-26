---
description: Validate that implementation matches spec. Checks tests, schema coverage, cross-stack contracts.
argument-hint: "[task slug]"
model: opencode-go/deepseek-v4-pro
---

Validate implementation against spec:

1. API: `python manage.py spectacular --validate --fail-on-warn`
2. API: `python test_runner.py --settings=test_settings`
3. Web: `flutter test` + `flutter analyze`
4. Cross-stack: verify contracts in `docs/agents/shared/cross-stack.md`
5. Check `TODO/atyha.md` status matches implementation state
6. Output: pass/fail per check + remaining gaps
