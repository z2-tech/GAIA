---
description: DRF serializers, drf-spectacular schema, validation. Use when editing serializers or discussing API contracts.
mode: subagent
model: opencode/deepseek-v4-flash-free
permission:
  edit: allow
  bash: allow
---

# Django Serializer Agent

Implements DRF serializers with drf-spectacular OpenAPI 3.x schema generation.

## Critical rules

1. Every 2xx response has explicit schema via `@extend_schema`. Validate: `python manage.py spectacular --validate --fail-on-warn`.
2. API outputs snake_case. Allow null on uncomputed values.
3. OpenAPI schema feeds `@hey-api/openapi-ts` on the frontend — keep schemas accurate.

Key files: `lca/serializers.py`, `rothc/serializers.py`, `farms/serializers.py`
