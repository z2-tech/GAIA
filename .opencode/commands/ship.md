---
description: Ship to production — the GAIA release gate: CodeGraph re-sync, full QA, changelog, PR/handoff. Faster is safer (small, frequent).
argument-hint: "[scope or PR title]"
model: opencode-go/deepseek-v4-pro
---

Ship.

1. CodeGraph re-sync (both repos) — the agent owns reindexing:
   `.opencode/bin/codegraph-global-sync.sh` then `--status`.
2. Full QA gate: /test (all gates) + /review (standards + spec + i18n).
3. Changelog: update `CHANGELOG.md` (and `TODO/gaia.md` state).
4. Commit only with explicit authorization — no commit without approval.
5. Handoff: load `handoff` / `claude-handoff` for anything left unfinished; reference specs/plans/issues by path, don't duplicate.
6. Output: what shipped, verification output, PR/commit summary.

Faster is safer — ship small and often.
