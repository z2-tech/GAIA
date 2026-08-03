#!/usr/bin/env python3
"""Validate GAIA orchestration structure without modifying the workspace."""

from __future__ import annotations

import hashlib
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[2]
TEXT_SUFFIXES = {
    ".css",
    ".html",
    ".js",
    ".json",
    ".md",
    ".py",
    ".sh",
    ".toml",
    ".ts",
    ".tsx",
    ".txt",
    ".yaml",
    ".yml",
}
OPERATIONAL_PREFIXES = (
    ".agents/",
    ".opencode/",
    "TODO/",
    "docs/workflow/",
)
PROMPT_PREFIXES = (
    ".opencode/agents/",
    ".opencode/commands/",
    ".opencode/bin/",
    ".cursor/rules/",
    ".github/",
)
ROOT_OPERATIONAL_FILES = {
    ".agents/README.md",
    ".claude/CLAUDE.md",
    "AGENTS.md",
    "README.md",
    "docs/vault/00-INDEX.md",
}
PATH_REFERENCE_PREFIXES = (".agents/", ".opencode/", "docs/", "TODO/")
MARKDOWN_LINK_RE = re.compile(r"(?<!!)\[[^\]]*\]\(([^)\n]+)\)")
CODE_PATH_RE = re.compile(r"`((?:\.agents|\.opencode|docs|TODO)/[^`\n]+)`")
CONFLICT_RE = re.compile(r"^(?:<<<<<<< .+|=======|>>>>>>> .+)$", re.MULTILINE)
HOME_PATH_RE = re.compile(r"/(?:home|Users)/[^/\s`\"']+")
FOREIGN_OPERATIONAL_PATTERNS = {
    "ATYHA path": re.compile(r"(?:~/|/)ATYHA(?:/|\b)", re.IGNORECASE),
    "ATYHA API": re.compile(r"\batyha-api\b", re.IGNORECASE),
    "ATYHA tracker": re.compile(r"TODO/atyha\.md", re.IGNORECASE),
    "ATYHA test DB": re.compile(r"atyha_postgres", re.IGNORECASE),
    "Flutter agent": re.compile(r"\bflutter-senior\b", re.IGNORECASE),
    "Flutter command": re.compile(r"\bflutter\s+(?:test|analyze)\b", re.IGNORECASE),
    "foreign shadow": re.compile(r"shadow-codegraph-all", re.IGNORECASE),
}


def repository_files() -> list[Path]:
    result = subprocess.run(
        ["git", "ls-files", "--cached", "--others", "--exclude-standard", "-z"],
        cwd=ROOT,
        check=True,
        capture_output=True,
    )
    paths = [
        ROOT / raw.decode("utf-8", errors="surrogateescape")
        for raw in result.stdout.split(b"\0")
        if raw
    ]
    return [path for path in paths if path.exists()]


def relative(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def frontmatter(text: str) -> dict[str, str] | None:
    if not text.startswith("---\n"):
        return None
    end = text.find("\n---\n", 4)
    if end == -1:
        return None
    fields: dict[str, str] = {}
    for line in text[4:end].splitlines():
        match = re.match(r"^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$", line)
        if match:
            fields[match.group(1)] = match.group(2).strip()
    return fields


def check_frontmatter(issues: dict[str, list[str]]) -> tuple[int, int, int]:
    skill_files = sorted((ROOT / ".agents/skills").rglob("SKILL.md"))
    for path in skill_files:
        fields = frontmatter(read_text(path))
        if fields is None:
            issues["skills"].append(f"{relative(path)}: missing YAML frontmatter")
            continue
        if fields.get("name") != path.parent.name:
            issues["skills"].append(
                f"{relative(path)}: name must be '{path.parent.name}'"
            )
        if not fields.get("description"):
            issues["skills"].append(f"{relative(path)}: missing description")

    agent_files = sorted((ROOT / ".opencode/agents").glob("*.md"))
    for path in agent_files:
        fields = frontmatter(read_text(path))
        if fields is None:
            issues["agents"].append(f"{relative(path)}: missing YAML frontmatter")
            continue
        for required in ("description", "mode"):
            if not fields.get(required):
                issues["agents"].append(
                    f"{relative(path)}: missing frontmatter field '{required}'"
                )

    command_files = sorted((ROOT / ".opencode/commands").glob("*.md"))
    for path in command_files:
        fields = frontmatter(read_text(path))
        if fields is None or not fields.get("description"):
            issues["commands"].append(
                f"{relative(path)}: missing frontmatter description"
            )

    return len(skill_files), len(agent_files), len(command_files)


def file_hash(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def check_duplicates(files: list[Path], issues: dict[str, list[str]]) -> None:
    by_hash: dict[str, list[str]] = defaultdict(list)
    for path in files:
        if path.is_file():
            by_hash[file_hash(path)].append(relative(path))
    for paths in sorted(by_hash.values(), key=lambda values: values[0]):
        if len(paths) > 1:
            issues["duplicates"].append(" = ".join(sorted(paths)))


def check_conflicts(files: list[Path], issues: dict[str, list[str]]) -> None:
    for path in files:
        if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES:
            if CONFLICT_RE.search(read_text(path)):
                issues["conflicts"].append(relative(path))


def is_operational(path: Path) -> bool:
    rel = relative(path)
    return rel in ROOT_OPERATIONAL_FILES or rel.startswith(OPERATIONAL_PREFIXES)


def is_prompt(path: Path) -> bool:
    rel = relative(path)
    return rel in ROOT_OPERATIONAL_FILES or rel.startswith(PROMPT_PREFIXES)


def markdown_target(raw: str) -> str | None:
    value = raw.strip()
    if value.startswith("<") and ">" in value:
        value = value[1 : value.index(">")]
    else:
        value = value.split(maxsplit=1)[0]
    value = unquote(value).split("#", 1)[0].strip()
    if not value or value.startswith(("#", "//")):
        return None
    if re.match(r"^[A-Za-z][A-Za-z0-9+.-]*:", value):
        return None
    if any(token in value for token in ("{", "}", "*", "$")):
        return None
    return value


def check_markdown_links(files: list[Path], issues: dict[str, list[str]]) -> None:
    for path in files:
        if not path.is_file() or path.suffix.lower() != ".md" or not is_operational(path):
            continue
        for line_number, line in enumerate(read_text(path).splitlines(), start=1):
            for match in MARKDOWN_LINK_RE.finditer(line):
                target = markdown_target(match.group(1))
                if target is None:
                    continue
                resolved = (
                    Path(target)
                    if Path(target).is_absolute()
                    else (path.parent / target).resolve()
                )
                if not resolved.exists():
                    issues["links"].append(
                        f"{relative(path)}:{line_number}: missing '{target}'"
                    )


def check_agent_paths(issues: dict[str, list[str]]) -> None:
    for path in sorted((ROOT / ".opencode/agents").glob("*.md")):
        for line_number, line in enumerate(read_text(path).splitlines(), start=1):
            for match in CODE_PATH_RE.finditer(line):
                target = match.group(1).rstrip(".,;:")
                if not target.startswith(PATH_REFERENCE_PREFIXES):
                    continue
                if any(token in target for token in ("{", "}", "*", "$", "...")):
                    continue
                if not (ROOT / target).exists():
                    issues["agent-paths"].append(
                        f"{relative(path)}:{line_number}: missing '{target}'"
                    )


def check_sensitive_names(files: list[Path], issues: dict[str, list[str]]) -> None:
    sensitive_suffixes = {".key", ".p12", ".pem", ".pfx"}
    for path in files:
        name = path.name.lower()
        env_file = name == ".env" or (
            name.startswith(".env.") and not name.endswith(".example")
        )
        if env_file or path.suffix.lower() in sensitive_suffixes or name == "id_rsa":
            issues["sensitive-files"].append(relative(path))


def check_prompts(files: list[Path], issues: dict[str, list[str]]) -> None:
    for path in files:
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES or not is_prompt(path):
            continue
        check_foreign_context = relative(path) != ".opencode/bin/validate-structure.py"
        for line_number, line in enumerate(read_text(path).splitlines(), start=1):
            if HOME_PATH_RE.search(line):
                issues["portability"].append(
                    f"{relative(path)}:{line_number}: personal home path"
                )
            for label, pattern in FOREIGN_OPERATIONAL_PATTERNS.items():
                if check_foreign_context and pattern.search(line):
                    issues["foreign-context"].append(
                        f"{relative(path)}:{line_number}: {label}"
                    )


def main() -> int:
    issues: dict[str, list[str]] = defaultdict(list)
    files = repository_files()

    skill_count, agent_count, command_count = check_frontmatter(issues)
    check_duplicates(files, issues)
    check_conflicts(files, issues)
    check_markdown_links(files, issues)
    check_agent_paths(issues)
    check_sensitive_names(files, issues)
    check_prompts(files, issues)

    if issues:
        print("GAIA structural validation: FAILED")
        for category in sorted(issues):
            print(f"\n[{category}]")
            for issue in sorted(set(issues[category])):
                print(f"- {issue}")
        return 1

    print(
        "GAIA structural validation: OK "
        f"({len(files)} repository files, {agent_count} agents, "
        f"{command_count} commands, {skill_count} skills)"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
