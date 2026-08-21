---
description: Validate that implementation matches spec. Checks tests, schema coverage, cross-stack contracts.
argument-hint: "[task slug]"
---

Validate implementation against spec:

1. Structure: `python3 .opencode/bin/validate-structure.py`
2. API: `python manage.py spectacular --validate --fail-on-warn`
3. API: `python test_runner.py --settings=test_settings --keepdb`
4. Web: `bun lint` + `bun run build`
5. If the API schema changed: regenerate with `bunx @hey-api/openapi-ts` in `gaia-web/`
6. Cross-stack: execute `docs/workflow/CROSS_STACK_PR.md`
7. Check `TODO/gaia.md` matches the implementation state
8. Output: pass/fail per check + remaining gaps
