#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-.}"
DEST="$TARGET/src/services/ml/biomechanics/v15"
mkdir -p "$DEST"
cp -R "$ROOT/src/." "$DEST/"
printf '\nV15 biomechanics layer copied to %s\n' "$DEST"
printf 'Wire the native MediaPipe/pose adapter into V15Bridge.ts and keep all metric values labeled as estimates until calibrated.\n'
