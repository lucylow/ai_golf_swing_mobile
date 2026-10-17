# V15 mobile integration

1. Put `src/` behind the app's existing pose service.
2. Feed the 33-landmark native MediaPipe result into `V15Bridge.analyze`.
3. Supply the actual camera model / calibration result.
4. Run V15 after the existing temporal smoother, or replace that smoother only after A/B evaluation.
5. Gate live coaching on `snapshot.reliability.overall` and per-metric confidence.
6. Draw `overlayGeometry` results with the existing SVG/Skia overlay layer.
7. Route drill recommendations through the existing audio/TTS service.
8. Calibrate golf-specific metrics against real reference data before exposing absolute targets.

The existing V5 pose controller also exposes `analyzeV15(camera, handedness, goal)` for captured frames. Provide measured camera intrinsics and the golfer's handedness; missing landmark confidence is treated as unknown, not perfect visibility.

The engine is intentionally model-runtime agnostic. It does not contain trained proprietary pose weights.
