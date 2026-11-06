#!/usr/bin/env python3
"""Keep the Claude Code adapters in sync with the canonical OpenCode definitions.

Canonical sources, read natively by OpenCode:
  .opencode/agents/<id>.md      agents
  .agents/skills/<id>/SKILL.md  skills (OpenCode also reads .claude/skills)
  .opencode/commands/<name>.md  commands
  opencode.json                 MCP servers

Claude Code adapters derived from them:
  .claude/agents/<id>.md        generated wrapper pointing to the canonical agent
  .claude/skills/<id>           symlink to ../../.agents/skills/<id>
  .claude/commands/<name>.md    symlink to ../../.opencode/commands/<name>.md
  .mcp.json + .claude/settings.json disabledMcpjsonServers   checked, not generated

usage: python3 .opencode/bin/sync-harness-adapters.py [--check]
"""
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
WRAPPER_MARKER = "canonical definition of this agent"
OPENCODE_ONLY_COMMAND_FIELDS = ("model", "agent", "subagent", "subtask")


def frontmatter(path):
    match = re.match(r"^---\n(.*?)\n---\n?", path.read_text(), re.S)
    return match.group(1) if match else ""


def field(fm, name):
    match = re.search(rf"^{name}:[ \t]*(.*)$", fm, re.M)
    if not match:
        return None
    value = match.group(1).strip()
    if value in (">", ">-", "|", "|-"):
        block = re.search(rf"^{name}:.*\n((?:[ \t]+.*\n?)+)", fm, re.M)
        return " ".join(line.strip() for line in block.group(1).splitlines()) if block else ""
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        value = value[1:-1]
    return value


def denies_edit(fm):
    return bool(re.search(r"action:\s*edit\s*\n\s*resource:[^\n]*\n\s*effect:\s*deny", fm))


def normalized(command):
    return [arg[2:] if arg.startswith("./") else arg for arg in command]


def wrapper(agent_id, fm):
    lines = ["---", f"name: {agent_id}", f"description: {json.dumps(field(fm, 'description') or agent_id, ensure_ascii=False)}"]
    if denies_edit(fm):
        lines.append("disallowedTools: Edit, Write")
    lines += ["---", "", f"Read `.opencode/agents/{agent_id}.md` and follow it in full. It is the {WRAPPER_MARKER},",
              "shared by OpenCode and Claude Code.", ""]
    return "\n".join(lines)


class Sync:
    def __init__(self, check):
        self.check = check
        self.drift = []

    def note(self, message):
        self.drift.append(message)
        print(("DRIFT " if self.check else "fix   ") + message)

    def write(self, path, content):
        if path.is_file() and not path.is_symlink() and path.read_text() == content:
            return
        self.note(f"{path.relative_to(ROOT)} (generated wrapper)")
        if not self.check:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content)

    def link(self, path, target):
        if path.is_symlink() and os.readlink(path) == target:
            return
        if path.exists() and not path.is_symlink():
            print(f"CONFLICT {path.relative_to(ROOT)} is a real file/dir; replace it with a symlink to {target}")
            self.drift.append(str(path))
            return
        self.note(f"{path.relative_to(ROOT)} -> {target}")
        if not self.check:
            path.parent.mkdir(parents=True, exist_ok=True)
            if path.is_symlink():
                path.unlink()
            path.symlink_to(target)

    def remove(self, path, reason):
        self.note(f"remove {path.relative_to(ROOT)} ({reason})")
        if not self.check:
            path.unlink()

    def agents(self):
        canonical = {p.stem: p for p in sorted((ROOT / ".opencode/agents").glob("*.md"))}
        for agent_id, path in canonical.items():
            self.write(ROOT / ".claude/agents" / f"{agent_id}.md", wrapper(agent_id, frontmatter(path)))
        for path in sorted((ROOT / ".claude/agents").glob("*.md")):
            if path.stem not in canonical and WRAPPER_MARKER in path.read_text():
                self.remove(path, "agent no longer exists")

    def skills(self):
        canonical = {p.parent.name for p in (ROOT / ".agents/skills").glob("*/SKILL.md")}
        for skill_id in sorted(canonical):
            self.link(ROOT / ".claude/skills" / skill_id, f"../../.agents/skills/{skill_id}")
        for path in sorted((ROOT / ".claude/skills").glob("*")):
            if path.is_symlink() and os.readlink(path).startswith("../../.agents/skills/") and path.name not in canonical:
                self.remove(path, "skill no longer exists")

    def commands(self):
        names = set()
        for path in sorted((ROOT / ".opencode/commands").glob("*.md")):
            fm = frontmatter(path)
            specific = [name for name in OPENCODE_ONLY_COMMAND_FIELDS if field(fm, name) is not None]
            if specific:
                print(f"skip  .opencode/commands/{path.name}: OpenCode-only frontmatter {specific}")
                continue
            names.add(path.name)
            self.link(ROOT / ".claude/commands" / path.name, f"../../.opencode/commands/{path.name}")
        for path in sorted((ROOT / ".claude/commands").glob("*.md")):
            if path.is_symlink() and os.readlink(path).startswith("../../.opencode/commands/") and path.name not in names:
                self.remove(path, "command no longer exists")

    def mcp(self):
        servers = json.loads((ROOT / "opencode.json").read_text()).get("mcp", {}).get("servers", {})
        claude_file = ROOT / ".mcp.json"
        claude = json.loads(claude_file.read_text()).get("mcpServers", {}) if claude_file.exists() else {}
        settings_file = ROOT / ".claude/settings.json"
        settings = json.loads(settings_file.read_text()) if settings_file.exists() else {}
        disabled = set(settings.get("disabledMcpjsonServers", []))
        for name in sorted(set(servers) | set(claude)):
            ours, theirs = servers.get(name), claude.get(name)
            if ours is None or theirs is None:
                if ours is None:
                    self.drift.append(name)
                    print(f"DRIFT mcp {name}: only in .mcp.json")
                elif ours.get("type") == "remote":
                    print(f"info  mcp {name}: remote server, OpenCode-only (Claude Code needs local-scope credentials)")
                else:
                    self.drift.append(name)
                    print(f"DRIFT mcp {name}: only in opencode.json")
                continue
            if ours.get("type") == "local":
                same = normalized(ours["command"]) == normalized([theirs.get("command"), *theirs.get("args", [])]) \
                    and ours.get("environment", {}) == theirs.get("env", {})
                if not same:
                    self.drift.append(name)
                    print(f"DRIFT mcp {name}: command or environment differs")
            if bool(ours.get("disabled")) != (name in disabled):
                self.drift.append(name)
                print(f"DRIFT mcp {name}: disabled in one harness only (.claude/settings.json disabledMcpjsonServers)")


def main():
    sync = Sync(check="--check" in sys.argv[1:])
    sync.agents()
    sync.skills()
    sync.commands()
    sync.mcp()
    if sync.check and sync.drift:
        print(f"{len(sync.drift)} adapter(s) out of sync; run without --check to regenerate.")
        return 1
    print("harness adapters: in sync" if not sync.drift else f"harness adapters: {len(sync.drift)} update(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
