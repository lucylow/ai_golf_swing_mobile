#!/usr/bin/env bash
set -euo pipefail
TARGET="${1:-.}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST="$TARGET/pose-intelligence-v10"
mkdir -p "$TARGET"
if [ -d "$DEST" ]; then
  BACKUP="$TARGET/pose-intelligence-v10.backup.$(date +%Y%m%d%H%M%S)"
  mv "$DEST" "$BACKUP"
  echo "Backed up existing pose-intelligence-v10 to $BACKUP"
fi
cp -R "$SCRIPT_DIR" "$DEST"
rm -rf "$DEST/.test-run"
echo "Installed pose-intelligence-v10 into $DEST"
echo "Next: wire your native MediaPipe/Core ML pose callback into src/mediapipeMapper.ts"
echo "Then select a trained phase/model runtime in src/production/v10Config.ts"
