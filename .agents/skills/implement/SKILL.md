---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

Use /tdd where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, use /code-review to review the work.

Do NOT commit. GAIA never commits without explicit authorization — leave the commit to the `/ship` gate (which also runs the CodeGraph re-sync). Follow GAIA conventions from `AGENTS.md` (PT for UX / EN for code, contract-first, zero comments by default) and route implementation through the GAIA orchestrators (`senior-nextjs` / `senior-backend`) instead of freelancing.
