---
tags: [system]
---

# Frontend-App

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 + shadcn/ui (New York) |
| State | TanStack Query v5 + Jotai |
| Forms | react-hook-form + zod |
| API SDK | @hey-api/openapi-ts (auto-generated) |

## Architecture

```
app/ → features/ → services/ → client/ (generated)
```

3-layer rule: pages are thin shells, features contain business logic + hooks + components, services wrap TanStack Query over generated SDK. Never import `src/client/` directly.

## Agent

`senior-nextjs` — `.opencode/agents/senior-nextjs.md`

## Links

- Repo: `gaia-web/` (branch: develop)
- API contract: OpenAPI schema → `@hey-api/openapi-ts` → `src/client/`
