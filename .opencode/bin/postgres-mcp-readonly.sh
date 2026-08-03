#!/bin/bash
# =============================================================================
# Postgres MCP Read-Only — Database Read-Only MCP Server
# =============================================================================
# Launches a read-only Postgres MCP server for AI tools to query the database
# without direct write access. Credentials from environment.
#
# Usage:
#   ./.opencode/bin/postgres-mcp-readonly.sh
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ORCHESTRATOR_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Load machine-local MCP credentials.
ENV_FILE="${ORCHESTRATOR_ROOT}/.env.mcp.local"
if [ -f "$ENV_FILE" ]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

# Determine PostgreSQL connection string
DB_HOST="${POSTGRES_HOST:-localhost}"
DB_PORT="${POSTGRES_PORT:-5432}"
DB_NAME="${POSTGRES_DB:-}"
DB_USERNAME="${POSTGRES_USER:-}"
DB_PASSWORD="${POSTGRES_PASSWORD:-}"

if [ -z "$DB_NAME" ] || [ -z "$DB_USERNAME" ]; then
  echo "Error: POSTGRES_DB and POSTGRES_USER must be set in .env.mcp.local" >&2
  exit 1
fi

CONNECTION_STRING="postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo "Starting Postgres MCP server (read-only)..." >&2
echo "Host: $DB_HOST:$DB_PORT, DB: $DB_NAME" >&2

# Launch MCP server — note: reads are fine, writes are blocked by read-only user
# If using a specific MCP server, adjust the command below
exec npx -y @modelcontextprotocol/server-postgres "$CONNECTION_STRING" --readonly
