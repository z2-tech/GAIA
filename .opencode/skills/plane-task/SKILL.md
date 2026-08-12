---
name: plane-task
description: >-
  Create a task (work item) in Plane. Use when the user wants to open/create a
  Plane task/issue and may specify a status (state) and/or an assignee
  (responsável). Resolves state and assignee names to Plane IDs, defaults to the
  GAIA "Gaia" project. Triggers: "criar task no plane", "abrir issue", "nova
  tarefa plane", "create plane task", "/plane-task".
---

# Plane — Create Task

Create a Plane work item, optionally setting **status** and **assignee**.

Requires the `plane` MCP server (tools prefixed `mcp__plane__`). If those tools
are missing, tell the user to restart the session (server was added but tools
load on a fresh session).

## Defaults

- **Workspace**: `gaia`
- **Default project**: `Gaia` — id `fe4e534c-2855-4a42-af0a-1aca6bb7820c`.
  Only when the user names the *other* workspace project, resolve its id via
  `list_projects`. Never guess a project id.

## Inputs (from the user request)

- `name` (required) — task title. If missing, ask for it.
- `description` — becomes `description_html` (wrap plain text in `<p>…</p>`).
- `status` / state name (e.g. "Backlog", "Todo", "In Progress", "Done").
- `assignee` / responsável — a person's name or email.
- `priority` — one of `urgent|high|medium|low|none`.

## Steps

1. **Resolve project id.** Default to the Gaia id above unless the user named the
   other project → then `list_projects` and match by name.
2. **Resolve status → `state_id`** (only if a status was given):
   call `list_states` with the project id, match the requested name
   case-insensitively. If no match, list the available state names and ask.
3. **Resolve assignee → `assignee_ids`** (only if an assignee was given):
   call `get_workspace_members`, match by display name / email. On ambiguity or
   no match, show candidates and ask. Result goes in the `assignee_ids` array.
4. **Create** with `create_work_item`:
   - `project_id` (resolved)
   - `name`
   - `description_html` (if description given)
   - `state_id` (if resolved)
   - `assignee_ids` (if resolved)
   - `priority` (if given)
5. **Report** the created item: title, project, state, assignee, and the work
   item identifier/URL returned by Plane.

## Notes

- Do not invent a state or member id — always resolve from the live list.
- One task per invocation. For batch/BE+FE splits from a doc, use
  `plane-doc-to-tasks`.
