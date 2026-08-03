---
name: i18n-key-validator
description: Verify every new i18n key in the current gaia-web diff is registered in both messages/pt.json AND messages/en.json. Trigger before a PR, after a migration that moves keys, or when asked "did I miss any locale strings". Diff-scoped — only keys touched in this branch, not a full project lint.
tools: Bash, Read, Grep
---

Read `.opencode/agents/i18n-key-validator.md`
