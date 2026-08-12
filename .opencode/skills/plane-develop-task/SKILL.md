---
name: plane-develop-task
description: >-
  Develop a Plane work item as a feature. Use when the user hands over a Plane
  card — a URL or a human identifier like "GAIA-1" — and wants it built. Fetches
  the card from Plane, then hands the extracted spec to the `gaia-feature-dev`
  skill for the full analyze → plan → approval → implement workflow. Triggers:
  "desenvolver essa task do plane", "implementar card GAIA-1", "trabalhar nesse
  card", "develop plane task", "/plane-develop-task".
---

# Plane — Develop Task (feature)

Take a Plane card reference, resolve it to the work item, and run the GAIA
feature-development workflow against it. This is the **feature** framing (build
something new / extend behavior). For a bug fix, use `plane-fix-task`.

Requires the `plane` MCP server (tools prefixed `mcp__plane__`). If those tools
are missing, tell the user to restart the session (server loads on a fresh
session).

## Input

`$ARGUMENTS` is a **card reference**, one of:

- **Human identifier** — e.g. `GAIA-1`, `GAIAPROJEC-12`. Prefix = project, number
  = `sequence_id`.
- **Plane URL** — e.g.
  `https://app.plane.so/<workspace>/projects/<project_id>/issues/<work_item_id>`.
  The last path segment after `issues/` is the work item UUID.

If `$ARGUMENTS` is empty, ask the user for the card link or identifier.

## Defaults

- **Workspace**: `gaia`
- **Default project**: `Gaia` — id `fe4e534c-2855-4a42-af0a-1aca6bb7820c`.

## Steps

1. **Resolve the card → work item.**
   - **Identifier** (`GAIA-1`): call `retrieve_work_item_by_identifier` with the
     project id and the identifier. If the prefix is not Gaia's, `list_projects`
     to find the matching project id first, then retrieve. Never guess a UUID.
   - **URL**: extract the `project_id` and work item UUID from the path and call
     `retrieve_work_item` (project_id, work_item_id). If the URL omits the
     project id, fall back to the identifier flow.
2. **Extract the spec.** From the retrieved item read: `name`, `description_html`
   (strip to text), `priority`, `state`, `assignees`, `labels`. Parse the
   description for the GAIA card shape — **Problema, Solução, Checklist, Refs**.
   Treat the Checklist as the initial definition of done.
   - If the description points at a `docs/tasks/**/*.md` card file, Read that file
     too — it is the source of truth over the truncated Plane copy.
3. **Confirm target.** Echo back: identifier + title + state + assignee, and a
   one-line restatement of what you're about to build. This is a sanity check,
   not an approval gate.
4. **Hand off to `gaia-feature-dev`.** Invoke the `gaia-feature-dev` skill,
   passing the resolved card as its input:
   - the card title + full extracted description (Problema/Solução/Checklist/Refs),
   - the source card file path if one was found,
   - framing: **feature development**.
   From here `gaia-feature-dev` owns the workflow (CodeGraph sync → discovery →
   routing → clarifying questions → plan → **approval gate** → implementation →
   verification → re-sync → summary). Do not implement outside that skill.

## Notes

- Read-only resolution here — this skill fetches and frames; it does **not** edit
  product source or move the card's state. All build work goes through
  `gaia-feature-dev` and its orchestrators.
- One card per invocation.
- Do not commit or change the Plane card status unless the user authorizes it
  (project convention #4).
