---
name: plane-doc
description: >-
  Create a documentation page in Plane Pages. Use when the user wants to write a
  relevant doc/spec/notes page into Plane. Defaults to the GAIA "Gaia" project
  page. Triggers: "criar doc no plane", "nova página plane", "documentar no
  plane", "create plane page/doc", "/plane-doc".
---

# Plane — Create Doc (Page)

Author a relevant documentation page in Plane Pages.

Requires the `plane` MCP server (`mcp__plane__*`). If missing, tell the user to
restart the session.

## Defaults

- **Workspace**: `gaia`
- **Default target**: project page in `Gaia` —
  id `fe4e534c-2855-4a42-af0a-1aca6bb7820c` via `create_project_page`.
  Use `create_workspace_page` (no project) only if the user asks for a
  workspace-level page. Resolve another project's id via `list_projects` only
  when the user names it.

## Inputs

- `name` (required) — page title. If missing, ask.
- Content — the doc body. Compose real, useful Markdown-quality content, then
  convert to `description_html` (headings `<h2>`, lists `<ul><li>`, paragraphs
  `<p>`, code `<pre><code>`). Do not dump a title-only page.

## Steps

1. **Gather/produce content.** If the user gave raw notes or pointed at source
   material, structure it into a clear doc: purpose, context, sections, next
   steps. Keep domain/UX text in PT, code identifiers in EN (GAIA convention #3).
2. **Confirm scope** briefly if the content is being authored by you (not just
   pasted) — show the outline before writing a long page.
3. **Create** with `create_project_page` (or `create_workspace_page`):
   - `project_id` (default Gaia, when project page)
   - `name`
   - `description_html`
4. **Report** the page title and the URL/id returned.

## Notes

- `description_html` is HTML, not Markdown — convert before sending.
- For turning a created doc into BE/FE tasks, chain into `plane-doc-to-tasks`.
