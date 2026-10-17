# V5 Integration File Map

The package is additive. The most important drop-in entry points are:

- `src/adapters/mediaPipeAdapter.ts` — MediaPipe-shaped adapter
- `src/pipeline/analyzer.ts` — deterministic swing analyzer
- `src/pipeline/advancedPosePipeline.ts` — top-level pipeline
- `src/integration/ExistingAppBridge.ts` — bridge for the existing app's pose service
- `src/mobile/PoseLabScreen.tsx` — visual QA screen
- `src/mobile/PoseOverlayModel.ts` — overlay primitives

Wire `ExistingAppBridge.analyze()` after the app's native pose detector has produced a pose sequence. Keep the native model lifecycle in the app's current pose detector.
