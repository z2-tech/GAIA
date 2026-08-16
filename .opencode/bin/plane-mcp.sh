#!/usr/bin/env bash
# =============================================================================
# Plane MCP — project management MCP server
# =============================================================================
# Launches the Plane MCP server. Secrets come from the machine-local .env file;
# non-secret settings (workspace slug, host URL) come from opencode.json.
#
# Usage:
#   ./.opencode/bin/plane-mcp.sh
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ORCHESTRATOR_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Load machine-local credentials.
ENV_FILE="${ORCHESTRATOR_ROOT}/.env"
if [ -f "$ENV_FILE" ]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

if [ -z "${PLANE_API_KEY:-}" ]; then
  echo "Error: PLANE_API_KEY must be set in .env" >&2
  exit 1
fi

exec npx -y @makeplane/plane-mcp-server
