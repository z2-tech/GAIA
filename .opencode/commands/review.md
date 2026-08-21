---
description: Review the diff before merge along two axes — standards and spec — and improve code health.
argument-hint: "[fixed point: commit/branch/tag, default merge-base]"
---

Review before merge.

1. Load `code-review` — two-axis review (Standards vs Spec) in parallel sub-agents.
2. GAIA extras:
   - `i18n-key-validator` — every new locale key present in pt.json AND en.json.
   - `lint-agent` — pre-commit / ruff / black / isort.
   - `cross-stack` — OpenAPI contract intact.
3. Fix findings; re-run the gates from /test.
4. Output: findings by axis + resolved state.

Improve code health, not just correctness.
