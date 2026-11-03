---
name: plane-fix-task
description: "Run /plane-fix-task <card> with a Plane bug card (GAIAPROJEC-12 or its link) to fix it. Fetches the card, turns it into a symptom to reproduce and a definition of fixed, and hands it to /debug (reproduce, root cause, minimal fix, regression test). For new behavior, use /plane-develop-task. Triggers: \"corrigir essa task do plane\", \"resolver esse bug do plane\", \"fix plane task\"."
argument-hint: <GAIAPROJEC-N | Plane card link>
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

The way in from the tracker to `/debug`, for a bug card. It reads the card, frames the defect (what happens, what should happen, where), and runs `/debug` with it. It fixes nothing itself and never moves the card's state.

## Reads / Writes

| | Path |
|---|---|
| Reads | the Plane card; the feature it touches in `docs/features/<slug>/` (its business rules and spec say what correct means); a card file under `docs/tasks/` while that folder still exists |
| Writes | nothing (`/debug` writes the fix and hands a regression test to `/test`) |

## Plane

- Tools: `mcp__plane__workitem`, `mcp__plane__project`. Missing? The `plane` server loads on a fresh session: ask the engineer to restart.
- Workspace `gaia`, project `Gaia` (id `fe4e534c-2855-4a42-af0a-1aca6bb7820c`, identifier `GAIAPROJEC`).
- A card link looks like `https://plane.z2t.dev/gaia/projects/<project_id>/issues/<workitem_id>`.

## Steps

1. **Fetch the card.** An identifier: `workitem retrieve_by_identifier`. A link: take `project_id` and the id after `issues/`, then `workitem retrieve`. Nothing given: ask for it. Never guess an id.
2. **Frame the defect.** From the title and text (older cards: Problema, Solução, Checklist, Refs): the symptom (actual against expected), where it shows (screen, endpoint, code repo), and the checklist as the meaning of fixed. When the card points at a `docs/tasks/` file, read it too. When the feature is known, cite the business rule (`RN-n`) or acceptance criterion (`AC-n`) the bug breaks.
3. **Confirm in one line** (card id, title, the symptom you will reproduce), then run `/debug` with the card id, the framing, and the full card text.

## Rules

- One card per run.
- The bug says the code disagrees with a rule. When the card instead asks to change a rule, stop and recommend `/plane-develop-task`.
- Never move the card's state or commit without the engineer saying so.
