---
description: Define what to build. Turn a request into a reviewed spec (problem, solution, user stories, seams) and publish it. Spec before code.
argument-hint: "[feature request or context]"
model: opencode-go/deepseek-v4-pro
---

Define what to build before any code.

1. Load skills, in order:
   - `to-spec` — synthesize the current conversation into a spec (no interview; only ask if real gaps remain).
   - `grilling` (or `grill-me`) — stress-test the spec until the frontier is empty: edge cases, 404/null semantics, i18n pt+en, error/empty/loading states, affected consumers.
   - `domain-modeling` — sharpen terminology; respect `docs/vault/` and any `CONTEXT.md`/ADRs.
2. GAIA conventions: PT for UX/domain, EN for code. Domain questions (LCA/RothC/regenerative/CFP) → `sustainability-specialist`.
3. Publish the spec:
   - Plane tracker → `plane-doc` (page) or `plane-task` as appropriate.
   - Otherwise write a card in `docs/tasks/` following the existing pattern (Problema, Solução, Checklist, Refs).
4. Output: spec path/URL + the seams you will test.

Spec before code — do not edit source.
