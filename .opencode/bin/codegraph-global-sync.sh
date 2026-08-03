#!/bin/bash
set -euo pipefail

SHADOW_WORKSPACE="/tmp/opencode/shadow-codegraph-gaia"
LOCK_FILE="/tmp/opencode/codegraph-sync-gaia.lock"
ORCHESTRATOR_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

acquire_lock() {
  if [ -f "$LOCK_FILE" ]; then
    local pid
    pid=$(cat "$LOCK_FILE" 2>/dev/null || true)
    if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
      echo "Another GAIA CodeGraph sync is running (PID $pid)."
      exit 0
    fi
    rm -f "$LOCK_FILE"
  fi
  echo $$ > "$LOCK_FILE"
}

release_lock() {
  rm -f "$LOCK_FILE"
}

if [ "${1:-}" = "--status" ]; then
  if [ ! -f "$SHADOW_WORKSPACE/.codegraph/codegraph.db" ]; then
    echo "GAIA shadow index not found at $SHADOW_WORKSPACE"
    exit 1
  fi
  codegraph status "$SHADOW_WORKSPACE"
  db_mtime=$(stat -c '%Y' "$SHADOW_WORKSPACE/.codegraph/codegraph.db")
  echo "DB age: $(($(date +%s) - db_mtime))s"
  exit 0
fi

CHILD_REPOS=()
for repo_name in gaia-api gaia-web; do
  for candidate in "$ORCHESTRATOR_ROOT/$repo_name" "$ORCHESTRATOR_ROOT/../$repo_name"; do
    if [ -e "$candidate/.git" ]; then
      CHILD_REPOS+=("$(cd "$candidate" && pwd)")
      break
    fi
  done
done

if [ "${#CHILD_REPOS[@]}" -ne 2 ]; then
  echo "Expected gaia-api and gaia-web as nested or sibling repositories." >&2
  exit 1
fi

EXCLUDE_PATTERNS=(
  --exclude='.git/'
  --exclude='.codegraph/'
  --exclude='.env'
  --exclude='.env.*'
  --exclude='node_modules/'
  --exclude='.venv/'
  --exclude='venv/'
  --exclude='__pycache__/'
  --exclude='dist/'
  --exclude='build/'
  --exclude='.next/'
  --exclude='.mypy_cache/'
  --exclude='.pytest_cache/'
  --exclude='.ruff_cache/'
  --exclude='coverage/'
  --exclude='*.pyc'
  --exclude='*.log'
  --exclude='.DS_Store'
)

acquire_lock
trap release_lock EXIT

echo "=== GAIA CodeGraph Sync ==="
echo "Shadow: $SHADOW_WORKSPACE"
echo "Repos:  ${CHILD_REPOS[*]}"

mkdir -p "$SHADOW_WORKSPACE"

if [ "${1:-}" = "--force" ]; then
  find "$SHADOW_WORKSPACE" -mindepth 1 -maxdepth 1 ! -name '.codegraph' -exec rm -rf {} \;
  rm -rf "$SHADOW_WORKSPACE/.codegraph"
fi

for repo in "${CHILD_REPOS[@]}"; do
  repo_name=$(basename "$repo")
  echo "Syncing $repo_name..."
  rsync -a --delete "${EXCLUDE_PATTERNS[@]}" "$repo/" "$SHADOW_WORKSPACE/$repo_name/"
  rm -f "$SHADOW_WORKSPACE/$repo_name/.gitignore"
done

echo "Syncing root context..."
rsync -a --delete "$ORCHESTRATOR_ROOT/docs/" "$SHADOW_WORKSPACE/docs/"
rsync -a --delete "$ORCHESTRATOR_ROOT/.opencode/" "$SHADOW_WORKSPACE/.opencode/"
cp "$ORCHESTRATOR_ROOT/AGENTS.md" "$SHADOW_WORKSPACE/AGENTS.md"

if [ -d "$SHADOW_WORKSPACE/.codegraph" ]; then
  codegraph sync "$SHADOW_WORKSPACE"
else
  codegraph init -i "$SHADOW_WORKSPACE"
fi

echo "=== GAIA Sync Complete ==="
codegraph status "$SHADOW_WORKSPACE"
