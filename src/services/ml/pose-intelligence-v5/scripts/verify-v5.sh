#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
tsc -p tsconfig.core.json
TS_COUNT=$(find src -type f \( -name '*.ts' -o -name '*.tsx' \) | wc -l | tr -d ' ')
TS_LINES=$(find src -type f \( -name '*.ts' -o -name '*.tsx' \) -print0 | xargs -0 cat | wc -l | tr -d ' ')
printf 'V5 verification passed: %s TS/TSX files, %s lines\n' "$TS_COUNT" "$TS_LINES"
