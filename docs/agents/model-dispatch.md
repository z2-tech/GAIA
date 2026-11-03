# Model Dispatch (opencode)

No `.opencode/agents/*.md` hardcodes `model:`. Every agent inherits the model
the user picked in the opencode selector when the session started (for example
`openai/gpt-5.5`, `opencode/muse-spark-1.2-contributor-free`,
`opencode/nemotron-3-ultra-free`). The primary (the picked model) owns the plan,
agent discovery, and dispatch; subagents inherit that same model.

When the user asks for "with subagents", or the task spans 3 or more
independent domains, the primary MUST run this protocol before any `task` call.

## 1. Discovery: find the available agents

```bash
cat .opencode/agents/*.md | grep -E "^name:|^description:"
ls .opencode/agents/
```

| Layer | Model | Rule |
|---|---|---|
| Session / plan + shared agents (`sustainability-specialist`, `scout`, `researcher`) | **user's pick** | No `model:` in frontmatter; all inherit the session model |

Why no hardcoding: `task` does not expose `model` per call, so agents without
`model:` inherit the session model (opencode merges agents after plugins, so a
plugin cannot repoint them). The user's choice at session start is the single
source of truth.

## 2. Reason, split, execute (build protocol)

1. **Reason:** map each domain of the task to one agent (one call per domain, with disjoint prompts).
2. **Split:** at most 4 parallel subagents per round; prompt `Research only, do not edit files. In <repo/path>, analyze <scoped topic>… Trace <symbols/files>. Return file:line, callers, minimal plan. Do not duplicate <other scopes>.` (400 to 500 chars)
3. **Execute:** parallel `task` calls, consolidate, then the primary implements; validate with `validate-structure` plus focused tests.

## 3. Free model choice (informative, not hardcoded)

The user already picked the session model; for zero cost, pick a free one at
the start. The ranking below only informs that initial choice.

```bash
opencode models opencode --verbose  # filter cost.input==0
```

Current free ranking (`cost.input==0`, generated dynamically):

| # | model | ctx | out | attach | toolcall |
|---|---|---|---|---|---|
| 1 | `opencode/muse-spark-1.2-contributor-free` | 1,048,576 | 131,072 | yes | yes |
| 2 | `opencode/nemotron-3-ultra-free` | 1,000,000 | 128,000 | no | yes |
| 3 | `opencode/nemotron-3.5-lightning-free` | 262,144 | 262,144 | no | yes |
| 4 | `opencode/mimo-v2.5-free` | 200,000 | 32,000 | yes | yes |
| 5 | `opencode/big-pickle` | 200,000 | 32,000 | no | yes |
| 6 | `opencode/hy3-free` | 190,000 | 64,000 | no | yes |
