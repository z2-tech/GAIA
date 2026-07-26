#!/bin/bash
set -euo pipefail
SHADOW_WORKSPACE="/tmp/opencode/shadow-codegraph-gaia"
ORCHESTRATOR_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CHILD_REPOS=()
for nested in "$ORCHESTRATOR_ROOT"/gaia-api "$ORCHESTRATOR_ROOT"/gaia-web; do
  if [ -d "$nested/.git" ]; then CHILD_REPOS+=("$nested"); fi
done
EXCLUDE=(--exclude='.git/' --exclude='.codegraph/' --exclude='.env' --exclude='.env.*' --exclude='node_modules/' --exclude='.venv/' --exclude='venv/' --exclude='__pycache__/' --exclude='dist/' --exclude='build/' --exclude='.next/' --exclude='*.pyc' --exclude='*.log' --exclude='.DS_Store')
if [ "${1:-}" = "--status" ]; then
  [ -d "$SHADOW_WORKSPACE/.codegraph" ] && codegraph status "$SHADOW_WORKSPACE" || echo "Shadow index missing. Run without --status."
  exit 0
fi
echo "=== GAIA CodeGraph Sync ==="
mkdir -p "$SHADOW_WORKSPACE"
find "$SHADOW_WORKSPACE" -mindepth 1 -maxdepth 1 ! -name '.codegraph' -exec rm -rf {} \; 2>/dev/null || true
for repo in "${CHILD_REPOS[@]}"; do
  echo "Syncing $(basename "$repo")..."
  rsync -a --delete "${EXCLUDE[@]}" "$repo/" "$SHADOW_WORKSPACE/$(basename "$repo")/"
  rm -f "$SHADOW_WORKSPACE/$(basename "$repo")/.gitignore"
done
echo "Syncing root docs and agents..."
[ -d "$ORCHESTRATOR_ROOT/docs" ] && rsync -a --delete "$ORCHESTRATOR_ROOT/docs/" "$SHADOW_WORKSPACE/docs/"
[ -d "$ORCHESTRATOR_ROOT/.opencode" ] && rsync -a --delete "$ORCHESTRATOR_ROOT/.opencode/" "$SHADOW_WORKSPACE/.opencode/"
[ -f "$ORCHESTRATOR_ROOT/AGENTS.md" ] && cp "$ORCHESTRATOR_ROOT/AGENTS.md" "$SHADOW_WORKSPACE/AGENTS.md"
echo ""
if [ -d "$SHADOW_WORKSPACE/.codegraph" ]; then
  codegraph sync "$SHADOW_WORKSPACE"
else
  codegraph init -i "$SHADOW_WORKSPACE"
fi
echo "=== GAIA Sync Complete ==="
