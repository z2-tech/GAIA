---
description: Search GAIA vault notes and report matching domain or system knowledge.
argument-hint: "[term]"
model: opencode-go/deepseek-v4-flash
---

Search vault notes by term.
Process:
1. Read `docs/vault/00-INDEX.md` for direct matches.
2. If no match, grep `docs/vault/` for the term.
3. Present summary with wikilinks to matching notes.

If vault has no matching notes, report gap and suggest where the note should live.
