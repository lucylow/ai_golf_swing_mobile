#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET_ROOT="${1:-$(cd "$SCRIPT_DIR/../ai-golf-swing-coach" 2>/dev/null || true)}"
if [ -z "$TARGET_ROOT" ]; then
  echo "Pass the Expo project root as the first argument." >&2
  exit 2
fi
mkdir -p "$TARGET_ROOT/src/services/ml/v16"
cp -R "$SCRIPT_DIR/src/." "$TARGET_ROOT/src/services/ml/v16/"
echo "Installed V16 biomechanics into $TARGET_ROOT/src/services/ml/v16"
