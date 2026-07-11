#!/usr/bin/env sh
# OKR Core — POSIX bootstrap installer (macOS / Linux / WSL / Git Bash).
#
# Resolves whichever JS runtime is available (node > bun > deno) and hands off
# to bin/okr-install.mjs. Pass through any flags, e.g.:
#
#   ./install.sh --global
#   ./install.sh --local
#   curl -fsSL https://raw.githubusercontent.com/your-org/okr-core/main/install.sh | sh -s -- --global
set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENTRY="$SCRIPT_DIR/bin/okr-install.mjs"

if [ ! -f "$ENTRY" ]; then
  echo "✖ Cannot find $ENTRY — run from a checked-out okr-core repo." >&2
  exit 1
fi

if command -v node >/dev/null 2>&1; then
  exec node "$ENTRY" "$@"
elif command -v bun >/dev/null 2>&1; then
  exec bun "$ENTRY" "$@"
elif command -v deno >/dev/null 2>&1; then
  exec deno run -A "$ENTRY" "$@"
else
  echo "✖ No JS runtime found. Install Node 18+, Bun, or Deno and retry." >&2
  exit 1
fi
