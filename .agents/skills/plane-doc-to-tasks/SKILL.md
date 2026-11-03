---
name: plane-doc-to-tasks
description: "Run /plane-doc-to-tasks <slug> to turn a spec's build plan into Plane cards, one per task, split BE (gaia-api), FE (gaia-web), and PROD (no code), and to write each card's id back on its task line. Also takes another doc or a Plane page. Always shows the full list and waits for your yes before creating anything. Triggers: \"gerar tasks dessa doc\", \"quebrar spec em cards\", \"criar tasks backend e frontend\", \"doc to tasks\"."
argument-hint: <feature slug | docs/ file | Plane page>
---

<!-- HOUSE-RULES:START -->
## House rules

- **Language:** code, identifiers, comments, and commit messages are always in English. Every generated document, headings included, is in the project's docs language: the `Docs language:` line in the root `AGENTS.md` (or `CLAUDE.md`). When the line is missing, ask once (the language the user writes in, recommended; English) and add it there. Exceptions: `AGENTS.md` files are instructions for agents, always in English; a transcript stays in the meeting's language (it records what was said); a questionnaire is in the language of the people who answer it. Translate only when asked, into a sibling file (`<name>.<lang>.md`).
- **Style:** plain, simple words in everything a skill produces, files and messages alike. Talk to the reader as `you`, warm and direct like a colleague, and present every step as a recommendation they may run or skip, never an order. Keep technical terms that carry real meaning and explain each in plain words. Never use a dash as punctuation (no em dash, no en dash) and no hyphenated compounds: write `read only`, not `read-only`, or reword. A word the language itself spells with a hyphen keeps it; so do code, file paths, command flags, and values other skills match on (`open-points`, `RN-3`, frame names). Short sentences, commas, or parentheses.
- **Abbreviations:** spell out every abbreviation the first time it appears in a reply or file.
- **Questions:** 2 to 4 concrete options, exactly one marked recommended with a one line why. Use the agent's option picker when it has one (`AskUserQuestion` on Claude Code), else the same options as plain text.
- **State lives in files,** never only in the chat. Read a file again right before editing it; edit surgically.
- **Code repos:** the project `AGENTS.md` lists them under `## Code repos`; a feature's scope row names the ones it touches. Run git, Grep, and Glob once per code repo, with the code repo as the path (from the project root they see only `docs/`, since its `.gitignore` lists the code repos), and take stack and commands from that repo's `AGENTS.md`. Cite code as `<code repo>/<path>:<line>`. A single repo project is its own one code repo.
- **Exploring code:** when `codegraph_*` tools are loaded (one CodeGraph server per code repo, listed on the `MCP servers:` line of `AGENTS.md`), use them first and inline (this replaces the `scout` offload a skill describes); Read only the lines you will cite or edit and the files an answer flags as stale. Without them, use a read only `scout` subagent or Grep and Read. A call that says no CodeGraph project is loaded means that code repo has no index on this machine: use the fallback for the session and tell the engineer to run `codegraph init -i <code repo>` (or `/audit`), then restart.
<!-- HOUSE-RULES:END -->

## What it does

The bridge between a spec and the tracker. `/architect` writes the build plan in `docs/features/<slug>/specs/`: ordered tasks, each starting with the code repo it is built in and naming the acceptance criteria (`AC-n`) it satisfies. This skill turns those tasks into Plane cards and, with your yes, ends each task line with its card id, the slot the spec template keeps for it (`· GAIAPROJEC-N`). It never decides what to build: a task missing from the plan goes back to `/architect`.

## Reads / Writes

| | Path |
|---|---|
| Reads | `docs/features/<slug>/specs/` (the `## Build plan`), the feature's `README.md`, `docs/scope.md` (its row and code repos); or another `docs/` file, a Plane page, or pasted text |
| Writes | Plane cards; the card id at the end of each build plan task line (only that, after asking) |

## Plane

- Tools: `mcp__plane__workitem`, `mcp__plane__label`, `mcp__plane__state`, `mcp__plane__member`, `mcp__plane__page`, `mcp__plane__project`. Missing? The `plane` server loads on a fresh session: ask the engineer to restart.
- Workspace `gaia`, project `Gaia` (id `fe4e534c-2855-4a42-af0a-1aca6bb7820c`, identifier `GAIAPROJEC`). Another project only when named (`project list`).
- Title prefix by code repo: `BE:` gaia-api, `FE:` gaia-web, `PROD:` no code repo. Label to match: `Backend`, `Frontend`, `Produto` (`label list` once). Never a sequence number like `FE-42`; the Plane identifier is the only number.
- Card text is in the language the team uses in Plane (Portuguese today); identifiers, paths, and `AC-n` stay as they are.

## Steps

1. **Source.**
   - A slug: read the newest spec in `docs/features/<slug>/specs/` and its `## Build plan`. No spec, or no build plan: stop and recommend `/architect <slug>`.
   - A `docs/` file, a Plane page (`page retrieve`), or pasted text: read it. With no build plan to follow, derive small tasks yourself and mark the list as derived, so the engineer weighs it before creating; recommend `/architect` when the doc is a feature with no spec yet.
2. **Build the card list.** One card per task. Each card:
   - `title`: prefix plus the task in a few words;
   - `description`: what to do, the `AC-n` it satisfies with their text, the feature path (`docs/features/<slug>/`), and the spec path;
   - dependencies: an api task before the web task that consumes it, and the api client update task between them (from the build plan), written as `Depende de: <title>` until the cards exist;
   - optional priority.
   Also list the work with no code the doc implies (data to load or fix, reference lists, spreadsheets, content, methodology) as `PROD:` cards, noting what they unblock. Skip pure logistics (scheduling, access requests).
   A task line that already ends with a card id is skipped: it has its card.
3. **Confirm before creating.** Show the full list as a table: `# · prefix · title · AC · depends on · priority`. Ask to create all (recommended when it mirrors the build plan), edit some, or drop some, and whether to set a state or assignee for all. Nothing is created before this yes.
4. **Create** each approved card with `workitem create`: `project_id`, `name`, `description_html` (wrapped in `<p>`), `labels`, and `state`, `assignees`, `priority` when chosen (ids from `state list` and `member list_workspace`). Then replace each `Depende de: <title>` with the real identifier (`workitem update`).
5. **Write the ids back.** Ask once, then append ` · GAIAPROJEC-N` to the end of each matching task line in the build plan. Change nothing else in the spec: `/architect` owns it.
6. **Report** the cards grouped BE, FE, PROD with identifier and link (`https://plane.z2t.dev/gaia/projects/<project_id>/issues/<workitem_id>`), the dropped items, and the spec lines that got an id.

## Rules

- Never create a card before the step 3 yes.
- Never add a task to the build plan; a missing task is a finding for `/architect`.
