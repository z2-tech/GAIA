# Issue Tracker — Plane

GAIA's issue tracker is **Plane** (workspace `gaia`, project `Gaia` — id
`fe4e534c-2855-4a42-af0a-1aca6bb7820c`), reached through the `plane` MCP server
(tools prefixed `mcp__plane__`). If those tools are missing, the user must restart
the session (the server loads on a fresh session).

## Triage roles → Plane mapping

| Triage role      | Plane state |
|------------------|-------------|
| needs-triage     | Backlog     |
| needs-info       | Backlog     |
| ready-for-agent  | Todo        |
| ready-for-human  | Todo        |
| wontfix          | Cancelled   |

Categories map to Plane labels: `bug`, `enhancement`.

## Operations

- Create a work item: `create_work_item` (see the `plane-task` skill).
- Read by identifier: `retrieve_work_item_by_identifier`; by UUID: `retrieve_work_item`.
- States: `list_states`. Assignees: `get_workspace_members`.
- Specs / docs → Plane Pages: `create_project_page` (see `plane-doc`).
- Split a doc into BE/FE/PROD tasks: `plane-doc-to-tasks`.

## Local cards

Plane is the tracker. Scope lives in `docs/scope.md` and acceptance criteria in each
feature's `docs/features/<slug>/` (business rules, spec). The older `docs/tasks/` cards
were routed there on 2026-11-03; git keeps them.
