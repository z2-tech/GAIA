---
name: plane-task
description: "Run /plane-task to open one card (work item) in Plane, GAIA's tracker, with an optional state, assignee, and priority. Resolves every name to its Plane id from the live lists, never by guess. For several cards from a spec or doc, use /plane-doc-to-tasks. Triggers: \"criar task no plane\", \"abrir card\", \"nova tarefa plane\", \"create plane task\"."
argument-hint: [card title and details]
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

Creates one card in Plane and reports its identifier (`GAIAPROJEC-N`) and link. It writes nothing in the repo: the card is the record.

## Reads / Writes

| | Path |
|---|---|
| Reads | Plane: states, labels, workspace members (through the `plane` MCP (Model Context Protocol) server) |
| Writes | one Plane card |

## Plane

- Tools: `mcp__plane__workitem`, `mcp__plane__state`, `mcp__plane__label`, `mcp__plane__member`, `mcp__plane__project`. Missing? The `plane` server loads on a fresh session: ask the engineer to restart.
- Workspace `gaia`, project `Gaia` (id `fe4e534c-2855-4a42-af0a-1aca6bb7820c`, identifier `GAIAPROJEC`). Another project only when the engineer names it: `project list`, match by name.
- Card link: `https://plane.z2t.dev/gaia/projects/<project_id>/issues/<workitem_id>`.
- Title: the layer prefix only, `BE:` (gaia-api), `FE:` (gaia-web), or `PROD:` (no code: data, spreadsheets, content, methodology). Never a sequence number like `FE-42`; the Plane identifier is the card's only number, and other cards are cited by it (`Bloqueado por: GAIAPROJEC-148`).
- Card text is in the language the team uses in Plane (Portuguese today); identifiers and paths stay in English.

## Steps

1. **Gather.** You need a title; ask for it when missing. Optional: description, state, assignee, priority (`urgent`, `high`, `medium`, `low`, `none`), and the feature it belongs to (`docs/features/<slug>/`). When a feature is named, cite it in the description.
2. **Resolve names to ids** from the live lists, never by guess:
   - state: `state list` with the project id, matched ignoring case (today: Backlog, Refinamento, Priorizado, Em Desenvolvimento, Code Review, QA / Homologação, Concluído, Cancelado, Duplicado);
   - label: `label list`, the one matching the prefix (`Backend`, `Frontend`, `Produto`; `Design` or `Infra` when you say so);
   - assignee: `member list_workspace` with the name or email.
   No match or more than one: show the candidates and ask.
3. **Create.** `workitem create` with `project_id`, `name`, and whatever was resolved: `description_html` (plain text wrapped in `<p>`), `state`, `labels`, `assignees`, `priority`.
4. **Report** the identifier, title, state, assignee, and link.

## Rules

- One card per run.
- Never invent an id; every id comes from a list call in this run.
