#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
tsc -p tsconfig.json --noEmit
python3 scripts/generate_smoke.py
printf 'V16 VERIFY: PASS\n'
