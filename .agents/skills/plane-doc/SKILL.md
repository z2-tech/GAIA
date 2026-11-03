---
name: plane-doc
description: "Run /plane-doc to publish a page in Plane Pages so the team reads it where they track work: a copy of a docs/ file (a spec, business rules, meeting minutes) or notes you hand over. The repo file stays the source; the page is a copy for reading. Triggers: \"criar doc no plane\", \"nova página plane\", \"documentar no plane\", \"create plane page\"."
argument-hint: [docs/ file | page title and notes]
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

Publishes one page in Plane Pages. In the standard, knowledge lives in `docs/`: a spec in `docs/features/<slug>/specs/`, business rules in `docs/features/<slug>/business-rules/`, minutes in `docs/meetings/`. This skill copies one of those into Plane for the team; it never becomes the place where a rule is decided. Notes with no home in `docs/` yet are fine to publish, and the report says where they belong (`/sync route "<fact>"` files them).

## Reads / Writes

| | Path |
|---|---|
| Reads | the source file under `docs/`, or the notes you give |
| Writes | one Plane page (nothing in the repo) |

## Plane

- Tools: `mcp__plane__page`, `mcp__plane__project`. Missing? The `plane` server loads on a fresh session: ask the engineer to restart.
- Workspace `gaia`, project `Gaia` (id `fe4e534c-2855-4a42-af0a-1aca6bb7820c`). A workspace page (no project) only when asked; another project only when named (`project list`).
- Page text keeps the language of its source; notes you write go in the language the team uses in Plane (Portuguese today). Identifiers and paths stay in English.

## Steps

1. **Source.** A `docs/` file: read it. Notes: structure them (purpose, context, sections, next steps). A title is required; ask when missing.
2. **Outline first** when you wrote the content yourself (not a copy): show the headings and ask before publishing a long page.
3. **Convert** Markdown to HTML (`description_html`): headings `<h2>`, lists `<ul><li>`, paragraphs `<p>`, code `<pre><code>`, tables `<table>`. Add a first line naming the source path, so a reader knows where the living version is.
4. **Publish.** `page create` with `name`, `description_html`, and `project_id` (omit it for a workspace page). Updating an existing page: `page retrieve` first, since `page update` replaces the whole body.
5. **Report** the title, page id, and the source path it copies.

## Rules

- Never a title only page.
- The repo file wins: when they differ, republish from it, never edit the rule in Plane.
- To turn the page or a spec into cards, run `/plane-doc-to-tasks`.
