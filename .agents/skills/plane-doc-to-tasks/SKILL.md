---
name: plane-doc-to-tasks
description: >-
  Turn a document/spec into Plane tasks split for backend, frontend, and product/
  data, and ALWAYS confirm the proposed task list with the user before creating
  anything. Defaults to the GAIA "Gaia" project. Triggers: "gerar tasks dessa
  doc", "quebrar doc em tasks", "criar tasks backend e frontend", "doc to tasks",
  "/plane-doc-to-tasks".
---

# Plane — Doc → Backend/Frontend/Product Tasks

Read a doc (a Plane page, a `docs/**` file, or pasted text), derive discrete
backend, frontend, **and product/data** tasks, **get user confirmation**, then
create them in Plane.

Requires the `plane` MCP server (`mcp__plane__*`). If missing, tell the user to
restart the session.

## Defaults

- **Workspace**: `gaia`
- **Default project**: `Gaia` — id `fe4e534c-2855-4a42-af0a-1aca6bb7820c`.
  Other project only when the user names it → resolve via `list_projects`.

## Steps

### 1. Ingest the doc
- Plane page → read it via the appropriate `mcp__plane__*` page/detail tool.
- Repo file → `Read`. Pasted text → use directly.
- If the source is ambiguous, ask which doc.

### 2. Derive tasks (split BE / FE / PROD)
Break the work into small, independently shippable tasks. For each:
- `title` — imperative, scoped (e.g. "BE: add soft-delete to Foo model").
- `layer` — `backend`, `frontend`, or `product` (product/data).
- `description` — what + acceptance criteria, derived from the doc.
- optional `priority`.

**Product/data tasks count too.** Not every task is code. Also derive
product/data work the doc implies — data the platform needs populated or
corrected, reference lists, categorizations, domain-spec deliverables, content,
research, methodology/spreadsheet prep (e.g. "listagem de culturas categorizadas",
"planilha de LCA atualizada"). These often *unblock* the BE/FE tasks — note that
dependency. Do NOT silently drop a non-code deliverable as "out of scope"; surface
it as a `product` task and let the user decide in Step 3. Skip only pure logistics
with no product artifact (agendar reunião, abrir empresa, pedir acesso).

Apply GAIA layering when relevant (AGENTS.md): backend → model/service/selector/
serializer/migration/test; frontend → form/table/api-layer/design/i18n. Respect
contract-first: an API contract task precedes the frontend task that consumes it
(express with ordering, note the dependency in the description).

Prefix titles `BE:` / `FE:` / `PROD:` so the split is visible.

### 3. Confirm BEFORE creating (mandatory gate)
Present the full proposed list as a table: `# · layer · title · priority ·
short description`. Ask the user to approve, edit, or drop items. Optionally ask
whether to set a default status/assignee for all. **Do not call
`create_work_item` until the user explicitly approves.** Use AskUserQuestion if a
decision (e.g. which items to create) changes the outcome.

### 4. Create the approved tasks
For each approved task, `create_work_item` on the resolved project id:
- `name`, `description_html` (wrap in `<p>`), `priority` if set.
- `labels` — attach the layer label so the split is queryable: `Back-end`,
  `Front-end`, or `Product`. Resolve ids once via `list_labels` (Gaia project).
- Resolve `state_id` via `list_states` and `assignee_ids` via
  `get_workspace_members` only if a status/assignee was chosen (same resolution
  rules as the `plane-task` skill).

### 5. Report
List every created task with its Plane identifier/URL, grouped BE / FE / PROD.
Note any items the user dropped.

## Non-negotiable
Never create tasks before the Step 3 confirmation. This is the whole point of the
skill.
