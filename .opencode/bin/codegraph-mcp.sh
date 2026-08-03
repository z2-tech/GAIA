#!/usr/bin/env bash
set -euo pipefail

ORCHESTRATOR_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SHADOW_WORKSPACE="${TMPDIR:-/tmp}/opencode/shadow-codegraph-gaia"
SHADOW_DB="$SHADOW_WORKSPACE/.codegraph/codegraph.db"

if [ ! -f "$SHADOW_DB" ]; then
  "$ORCHESTRATOR_ROOT/.opencode/bin/codegraph-global-sync.sh" >&2
fi

for _ in {1..60}; do
  [ ! -f "$SHADOW_DB" ] || break
  sleep 1
done

if [ ! -f "$SHADOW_DB" ]; then
  echo "GAIA CodeGraph shadow could not be initialized." >&2
  exit 1
fi

exec codegraph serve --mcp --path "$SHADOW_WORKSPACE"
