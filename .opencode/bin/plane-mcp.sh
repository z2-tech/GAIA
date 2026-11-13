#!/usr/bin/env bash
# =============================================================================
# Plane MCP — project management MCP server (pinned)
# =============================================================================
# Reads ONLY PLANE_API_KEY / PLANE_WORKSPACE_SLUG / PLANE_API_HOST_URL from
# <repo root>/.env.mcp.local (falling back to the process environment, e.g. the
# env block in opencode.json). Nothing else from that file reaches the process.
#
# Usage:
#   ./.opencode/bin/plane-mcp.sh
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/mcp-common.sh"

PLANE_API_KEY="$(env_first PLANE_API_KEY || true)"
if [[ -z "${PLANE_API_KEY}" ]]; then
  echo "Error: PLANE_API_KEY must be set in ${MCP_ENV_FILE} (put it in .env.mcp.local, see .env.mcp.local.example)." >&2
  exit 1
fi
export PLANE_API_KEY
export PLANE_WORKSPACE_SLUG="$(env_first PLANE_WORKSPACE_SLUG || printf 'gaia')"
export PLANE_API_HOST_URL="$(env_first PLANE_API_HOST_URL || printf 'https://api.plane.so')"

exec npx -y @makeplane/plane-mcp-server@0.1.5
