# Tool skills & MCP sweep (offer matching Agent Skills and MCP servers)

Read this from the greenfield mode (after scaffold) and the whole repo mode, once the real stack is known (greenfield: from the scaffolded manifests read in Step 1; brownfield: from the repo scan). `/architect` offers when a tool is chosen; this covers whatever is already installed.

## Step 1: Ask first (the consent gate)

<!-- TOOL-CONSENT:START (identical in /architect, /audit and /sync; edit all or none) -->
**Asking is mandatory. Searching is not.** Nothing is searched, fetched, installed, or spawned for Agent Skill and MCP discovery until the engineer has picked. Offer four choices: find them for me, I will name the ones I want, no and record the decline, or not now. Only the first may run a search command. Never silently skip the offer, and never run a search before the engineer agrees to one.
<!-- TOOL-CONSENT:END -->

Say in your own words why it is worth doing: an Agent Skill teaches the agent a tool's real conventions so the build follows them, and an MCP server gives live access to the real system rather than assumptions. Then ask (capability first: `AskUserQuestion` on Claude Code, else the same options as plain text; exactly one recommended; the picker adds its own free text option):

- **question**: "Want me to find Agent Skills and MCP servers for this project's stack?"
- **header**: "Agent skills"
- **options**:
  1. `Yes, find them for me` (recommended): "I'll search the registry for what this project already uses, then show you what I find. Nothing installs without your pick."
  2. `I'll name the ones I want`: "Tell me which skills or servers, and I'll add exactly those. No searching."
  3. `No, skip it`: "Build without them. I'll record the decline so nothing offers them again."
  4. `Not now, later`: "I'll note the candidates in the report so you can add them when you want."

Act on the pick. `Yes` → Step 2, then Step 3. `I'll name the ones I want` → no search: take the list, confirm each with `npx skills add <owner>/<repo> --list` where practical, install per Step 3, record per Step 4. `No, skip it` → run nothing, record the decline per Step 4. `Not now, later` → run nothing, name the candidate tools in the report.

## Step 2: Discover (only after `Yes, find them for me`)

- Build a `TOOL_DISCOVERY_SET` first, covering every layer the project really uses: runtime, framework, router, styling or UI kit, database, ORM, auth, payments, email, storage, search, queues, AI or vector DB, testing, observability, hosting. Include package names and common aliases from the manifests. Do not stop after the first technology.
- **Run it in the background, keep working.** Hand the set to a read only discovery subagent and do NOT wait on it. Set its model explicitly to a fast, low cost tier, never the session model (Claude Code: the `researcher` type, which pins the model and carries the registry CLI plus web tools). It returns ONLY the compact candidate list, grouped by technology, minus installed and declined. Greenfield: start it right after the consent pick so searches overlap the standards questions; collect the result just before the offer. Fallbacks: no background support → same subagent, blocking; no subagent → search inline; no search capability → skip and note in the report. The offer panel stays on the main thread, since a subagent cannot prompt the engineer.
- For each item not already covered by an installed skill or connected MCP (`npx skills list`, your connector list) or recorded as declined in `AGENTS.md`: detect Agent Skills with `npx skills find <tool-or-package>`; if weak, retry aliases from package or org names; collect every credible candidate and confirm with `npx skills add <owner>/<repo> --list` when practical. Detect MCP servers from the connector list first, else search `"<tool>" "MCP server"`. Never hardcode a list of which tools have skills or servers.
- Keep discovery capped and cacheable: the discovery subagent does the searches (not one subagent per tool). Max 5 web searches and 8 fetched pages total, official registry and docs first. Reuse `docs/.agent-cache/tool-discovery/<slug>.md` if under 30 days old, after filtering installed and declined items.

## Step 3: Offer what you found, then install what is picked

- Offer Agent Skills as one panel allowing several picks: "Install relevant Agent Skills for this stack?", every found skill grouped by technology, plus skip and decline. Then MCPs separately, as optional: "Optional MCP servers that could help this stack", plus skip and decline. Never install or connect automatically. Found nothing? Say so and move on; never invent a candidate to fill the panel.
- Install each selected skill: `npx skills add <owner>/<repo> -y`. Connecting an MCP is a user config step (their MCP or connector settings, e.g. `claude mcp add …`); you can't do it for them, so point them there. Once connected the tools are used automatically.

## Step 4: Record

Carry `INSTALLED_SKILLS` / `MCP_SERVERS` / `DECLINED_TOOLS` into the `## Agent skills` section of the `AGENTS.md` you write, in the exact format `references/agent-prompt.md` gives: one bullet per installed skill, plus compact `Declined:` and `MCP servers:` lines. Use the project's real skills dir, never a hardcoded Claude only path. Declines stop a later run offering again them. Project wide tech at root; area specific in the nested area doc.

No search, install, or connect capability? Skip the offer; note in the report which tools might have a skill or MCP worth a manual look.

## Skills and agents already in the project (existing repo of repos)

Run on an existing project with `REPO_OF_REPOS=yes` (whole repo and gap fill), before the Step 1 offer, so the offer skips what the project already has. List what the project repo root and each code repo hold: `.claude/skills/`, `.agents/skills/`, `.claude/agents/`, `.claude/commands/`, `.opencode/agents/`, `.opencode/commands/`, `.cursor/skills/`, `.cursor/rules/`. Count one item once, however many tools hold a copy of it. Propose where each goes, by what it knows:

- **Stack knowledge** (one framework or one code repo: `senior-nextjs`, `form-agent`, `model-agent`, `flutter-senior`) → one stack skill in that code repo, `<code repo>/.agents/skills/<name>/`, linked from `<code repo>/.claude/skills/<name>`, listed as `local` in that repo's `## Agent skills`. The sub agents of one stack merge into its skill or become its reference files. An orchestrator that dispatches them (`senior-*`) is removed: `/develop` builds.
- **Domain knowledge** (`agricultural-specialist`, `sustainability-specialist`) → `docs/domain/` and `docs/sources/` (`/sync route` moves the content).
- **A role the standard has** → removed in favor of it: architecture review → `/check review`, tests → `/test` with the stack skill, design tool → `/penpot`, api and web contract → the spec's API surface.
- **Project wide tools** (Penpot, the tracker, spreadsheets) → stay at the project repo root.
- **Claude Code config inside a code repo.** Sessions open in the project repo, and from there Claude Code never reads a code repo's `.claude/settings.json` (hooks, `enabledPlugins`, permissions), `.claude/agents/`, or `.mcp.json`; it loads its `.claude/skills/` and root `CLAUDE.md` only once a file in that code repo is read. So: each hook moves into the project repo's `.claude/settings.json`, scoped to its code repo with one handler per tool (`"if": "Edit(<code repo>/**)"`, `"if": "Write(<code repo>/**)"`), while its script stays in the code repo (`${CLAUDE_PROJECT_DIR}/<code repo>/.claude/hooks/<script>`) and its owner keeps it; plugins and permissions move there too; a `.claude/CLAUDE.md` becomes the code repo's root `CLAUDE.md` pointer.
- Anything else → ask what it does before proposing.

Ask before each move or removal, one question per item (up to four per panel): `Move it as proposed` (recommended) · `Keep it where it is` · `Show me the file`. A move is a commit in the code repo it lands in; never delete a copy until its content lives at the destination.
