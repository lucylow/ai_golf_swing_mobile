#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-./ai-golf-swing-coach}"
mkdir -p "$TARGET/golf-domain-v8"
cp -R "$ROOT_DIR/src" "$TARGET/golf-domain-v8/"
cp -R "$ROOT_DIR/routes" "$TARGET/golf-domain-v8/"
cp "$ROOT_DIR"/tsconfig*.json "$TARGET/golf-domain-v8/"
cp "$ROOT_DIR"/README.md "$TARGET/golf-domain-v8/"
echo "Golf Domain V8 copied to $TARGET/golf-domain-v8"
