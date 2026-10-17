#!/usr/bin/env bash
set -euo pipefail
ROOT="${1:-.}"
mkdir -p "$ROOT/v14-mobile-biomechanics"
cp -R "$(dirname "$0")/src" "$ROOT/v14-mobile-biomechanics/"
cp -R "$(dirname "$0")/tests" "$ROOT/v14-mobile-biomechanics/"
cp -R "$(dirname "$0")/python" "$ROOT/v14-mobile-biomechanics/"
cp -R "$(dirname "$0")/docs" "$ROOT/v14-mobile-biomechanics/"
cp "$(dirname "$0")/tsconfig.v14.json" "$ROOT/v14-mobile-biomechanics/"
cp "$(dirname "$0")/tsconfig.v14-tests.json" "$ROOT/v14-mobile-biomechanics/"
printf '%s\n' 'V14 mobile-biomechanics layer copied. Wire V14Bridge into the existing pose-analysis service.'
