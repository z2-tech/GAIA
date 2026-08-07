# FE-27 — Housekeeping de conformância

> **Prioridade:** Baixa | **Assignee:** — | **Status:** ⬜ Pendente

## Escopo

Itens pequenos de conformância com os docs, baixo risco. Checklist:

## Checklist

- [ ] **Barrels:** remover `index.ts(x)` de re-export (8) — `components/table/index.tsx`,
      `features/projeto/components/nova-fazenda/map/index.ts`, etc. Import direto. (`project-structure.md`)
- [ ] **forwardRef → ref-as-prop (React 19):** `nova-fazenda-kml-photo-step.tsx`,
      `components/icons/gaia-mark.tsx`. (`code-standards.md` §2)
- [ ] **Dead file:** deletar `src/components/table/sortable-header.tsx` (0 importers)
- [ ] **Table instance location:** mover `useReactTable` de `app/(private)/usuarios/page.tsx`
      para container em `features/usuarios` (page fina). (`table.md`)
- [ ] **Stray doc:** remover/relocar `features/carbono-emissao/modulo/ARCHITECTURE.md`
- [ ] **Enum location:** mover `features/projetos/enums/vinculo.ts` → `src/enums/` (nome EN). (`project-structure.md`)
- [ ] **`"use client"`:** adicionar nos ~10 feature hooks que usam hooks e não têm. (`code-standards.md`)
- [ ] **`@/client` import type:** converter 3 value imports p/ `import type` —
      `features/carbono-emissao/resultado/types.ts:1`, `dashboard/listagem-lca.tsx`,
      `carbono-remocao/dashboard/listagem-carbono-remocao.tsx`. (`design-system.md`)
- [ ] **`text-gray-*`:** auditar ~28 usos semânticos → `text-muted-foreground`/`foreground`
      (revisar caso a caso; títulos/labels sancionados pelo doc ficam). (`design-system.md`)

## Refs

- docs: `project-structure.md`, `code-standards.md`, `table.md`, `design-system.md`
- nota: fazer **após** FE-17/18/19 (nomes já em EN) p/ evitar retrabalho
