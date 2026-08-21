---
description: Simplify the code — clarity over cleverness. Surface deep-module opportunities and reduce complexity.
argument-hint: "[area or module]"
---

Simplify.

1. Load `improve-codebase-architecture` — scan for deepening opportunities (shallow → deep modules), using the `codebase-design` vocabulary (module, interface, depth, seam, adapter).
2. Read `CONTEXT.md` / ADRs / `docs/vault/` first to avoid re-litigating decisions.
3. Prefer the deletion test and "the interface is the test surface"; one adapter = hypothetical seam, two = real.
4. Propose refactors ranked by leverage; confirm before editing.
5. Re-run /test after any change.

Clarity over cleverness.
