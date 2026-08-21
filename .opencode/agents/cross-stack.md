---
description: Cross-stack contracts between gaia-api (Django DRF) and gaia-web (Next.js). OpenAPI-driven contract with auto-generated TypeScript SDK.
mode: subagent
permission:
  edit: allow
  bash: allow
---

# Cross-Stack Contracts — GAIA

API-Next.js contract authority using OpenAPI 3.x + auto-generated SDK.

## Critical Rules

1. **API → OpenAPI**: drf-spectacular generates schema from serializers. Every 2xx response has explicit schema.
2. **OpenAPI → SDK**: `@hey-api/openapi-ts` generates `src/client/` with types, SDK functions, TanStack Query wrappers.
3. **Frontend never imports generated client directly** — always through `src/services/<domain>/`.
4. **Contract-first**: API contract defined in OpenAPI schema before frontend implementation.

Operational checklist: `docs/workflow/CROSS_STACK_PR.md`.
Branch policy: `docs/workflow/BRANCHING.md`.
