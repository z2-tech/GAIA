#!/usr/bin/env bash
set -euo pipefail

ORCHESTRATOR_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
RUNTIME_ROOT="${TMPDIR:-/tmp}/opencode"
SHADOW_WORKSPACE="$RUNTIME_ROOT/shadow-codegraph-gaia"
LOCK_DIR="$RUNTIME_ROOT/codegraph-sync-gaia.lock"
ROOT_DB="$ORCHESTRATOR_ROOT/.codegraph/codegraph.db"
MODE="${1:-}"
ROOT_DB_TMP=""

usage() {
  echo "Usage: $0 [--force|--status]" >&2
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Required command not found: $1" >&2
    exit 1
  fi
}

discover_repos() {
  CHILD_REPOS=()
  local repo_name candidate found

  for repo_name in gaia-api gaia-web; do
    found=""
    for candidate in "$ORCHESTRATOR_ROOT/$repo_name" "$ORCHESTRATOR_ROOT/../$repo_name"; do
      if [ -e "$candidate/.git" ]; then
        found="$(cd "$candidate" && pwd)"
        break
      fi
    done
    if [ -z "$found" ]; then
      echo "Repository not found: $repo_name (expected nested or sibling to GAIA)." >&2
      exit 1
    fi
    CHILD_REPOS+=("$found")
  done
}

show_status() {
  local label="$1"
  local path="$2"

  echo "=== $label ==="
  if [ ! -f "$path/.codegraph/codegraph.db" ]; then
    echo "Index not found at $path" >&2
    return 1
  fi
  codegraph status "$path"
}

acquire_lock() {
  local pid=""

  mkdir -p "$RUNTIME_ROOT"
  if mkdir "$LOCK_DIR" 2>/dev/null; then
    printf '%s\n' "$$" > "$LOCK_DIR/pid"
    return 0
  fi

  pid=$(cat "$LOCK_DIR/pid" 2>/dev/null || true)
  if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
    echo "Another GAIA CodeGraph sync is running (PID $pid)."
    return 1
  fi

  rm -rf "$LOCK_DIR"
  mkdir "$LOCK_DIR"
  printf '%s\n' "$$" > "$LOCK_DIR/pid"
}

cleanup() {
  [ -z "$ROOT_DB_TMP" ] || rm -f "$ROOT_DB_TMP"
  rm -rf "$LOCK_DIR"
}

sync_index() {
  local path="$1"

  if [ ! -f "$path/.codegraph/codegraph.db" ]; then
    codegraph init -i "$path"
  elif [ "$MODE" = "--force" ]; then
    codegraph index --force "$path"
  else
    codegraph sync "$path"
  fi
}

publish_snapshot() {
  local source_db="$SHADOW_WORKSPACE/.codegraph/codegraph.db"
  local source_wal="$source_db-wal"

  mkdir -p "$ORCHESTRATOR_ROOT/.codegraph"
  ROOT_DB_TMP="$ROOT_DB.tmp.$$"
  rm -f "$ROOT_DB_TMP"

  if [ -s "$source_wal" ]; then
    require_command node
    node --no-warnings -e '
      const { DatabaseSync, backup } = require("node:sqlite");
      const source = new DatabaseSync(process.argv[1], { readOnly: true });
      backup(source, process.argv[2])
        .then(() => source.close())
        .catch((error) => { console.error(error); process.exitCode = 1; });
    ' "$source_db" "$ROOT_DB_TMP"
  else
    cp "$source_db" "$ROOT_DB_TMP"
  fi

  if [ -f "$ROOT_DB" ] && cmp -s "$ROOT_DB_TMP" "$ROOT_DB"; then
    rm -f "$ROOT_DB_TMP"
    ROOT_DB_TMP=""
    echo "Versioned snapshot already current."
    return
  fi

  rm -f "$ROOT_DB-wal" "$ROOT_DB-shm"
  mv "$ROOT_DB_TMP" "$ROOT_DB"
  ROOT_DB_TMP=""
  echo "Published versioned snapshot: $ROOT_DB"
}

case "$MODE" in
  ""|--force|--status) ;;
  *)
    usage
    exit 2
    ;;
esac

require_command codegraph
discover_repos

if [ "$MODE" = "--status" ]; then
  status=0
  show_status "GAIA versioned cross-repo snapshot" "$ORCHESTRATOR_ROOT" || status=1
  show_status "GAIA live cross-repo shadow" "$SHADOW_WORKSPACE" || status=1
  for repo in "${CHILD_REPOS[@]}"; do
    show_status "$(basename "$repo") local index" "$repo" || status=1
  done
  exit "$status"
fi

require_command rsync
if ! acquire_lock; then
  exit 0
fi
trap cleanup EXIT

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
  --exclude='*.egg-info/'
  --exclude='*.pyc'
  --exclude='*.log'
  --exclude='.DS_Store'
)

echo "=== GAIA CodeGraph Sync ==="
echo "Root:   $ORCHESTRATOR_ROOT"
echo "Shadow: $SHADOW_WORKSPACE"

if [ "$MODE" = "--force" ]; then
  rm -rf "$SHADOW_WORKSPACE"
fi
mkdir -p "$SHADOW_WORKSPACE"

for repo in "${CHILD_REPOS[@]}"; do
  repo_name=$(basename "$repo")
  echo "Indexing $repo_name..."
  sync_index "$repo"
  rsync -a --delete "${EXCLUDE_PATTERNS[@]}" "$repo/" "$SHADOW_WORKSPACE/$repo_name/"
  rm -f "$SHADOW_WORKSPACE/$repo_name/.gitignore"
done

mkdir -p "$SHADOW_WORKSPACE/.opencode/bin"
rsync -a --delete "$ORCHESTRATOR_ROOT/.opencode/bin/" "$SHADOW_WORKSPACE/.opencode/bin/"

echo "Indexing unified shadow..."
sync_index "$SHADOW_WORKSPACE"
publish_snapshot

echo "=== GAIA CodeGraph Sync Complete ==="
codegraph status "$SHADOW_WORKSPACE"
