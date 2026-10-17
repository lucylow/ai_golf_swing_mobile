#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-./pose-intelligence-v9}"
mkdir -p "$TARGET"
cp -R "$ROOT/src" "$TARGET/"
cp -R "$ROOT/native" "$TARGET/"
echo "Copied Pose Intelligence V9 into $TARGET"

