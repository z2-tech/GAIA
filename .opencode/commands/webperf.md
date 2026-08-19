---
description: Audit gaia-web performance — measure before optimizing. Data-fetching, bundle, render, and asset metrics.
argument-hint: "[route or scope]"
model: opencode-go/deepseek-v4-pro
---

Measure before you optimize.

1. Establish a baseline first (build size, Core Web Vitals, waterfall). No optimization without a number.
2. Audit gaia-web against its architecture (`docs/agents/web/architecture.md`):
   - Data fetching: TanStack Query caching/staleness, server vs client components, waterfalls / N+1.
   - Bundle: chunking, tree-shaking, generated SDK consumed through `src/services/` (never `src/client/` directly).
   - Rendering: RSC boundaries, re-renders, memoization where it earns its keep.
   - Assets: `next/image`, fonts, icons.
3. Report: metric → baseline → cause → cheapest fix with impact, ranked by impact/effort.
4. Apply only fixes with a measured gain; re-measure after.

No change without a number before and after.
