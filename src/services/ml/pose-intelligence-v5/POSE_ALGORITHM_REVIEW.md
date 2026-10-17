# Pose Algorithm Review — Current Repository vs V5

## Current documented design

The public repository README describes:

- 33-point MediaPipe BlazePose
- TCN pose smoothing
- LSTM-attention phase detection
- VAE motion synthesis
- a `SwingAnalyzer` orchestrator
- DMSM phase-segmented comparison
- real-time pose overlays and biomechanical metrics

It also describes files such as `PoseDetector.ts`, `TransformerPoseEstimator.ts`, `IntegratedPosePipeline.ts`, `LSTMAttentionPhaseDetector.ts`, `TCNPoseSmoother.ts`, and `SwingAnalyzer.ts`.

## Important runtime verification note

The current public `package.json` enumerates Expo/React Native dependencies and `react-native-svg`, but it does not list TensorFlow.js or a MediaPipe package directly. Therefore this V5 bundle does **not** pretend that a production MediaPipe native model can be instantiated from the package alone.

The upgrade instead provides:

1. a stable `PoseInferenceAdapter` contract;
2. a `MediaPipePoseAdapter` for MediaPipe-shaped outputs;
3. a native result mapper;
4. robust temporal smoothing;
5. body-centered coordinate normalization;
6. multi-signal quality scoring;
7. event and phase detection;
8. kinematic feature extraction;
9. pattern hypothesis scoring;
10. confidence propagation and explainability;
11. runtime/degraded-mode controls;
12. DMSM/DTW comparison utilities.

## Recommended production integration

Keep the current native pose detector/model lifecycle. Convert its results into `PoseFrame`, then run V5 as the deterministic intelligence/post-processing layer. If the existing native layer exposes richer world-landmark output, feed that through as well; the V5 canonicalizer can use those coordinates when available.

## Technical correctness guardrails

- Never present illustrative metrics as validated clinical or scientific measurements.
- Never infer injury or medical risk from these heuristics.
- Do not claim a benchmark accuracy without an evaluation dataset and protocol.
- Log aggregate health/latency, not raw pose frames.
- Keep frame buffers bounded.
- Use quality gating to request a re-record rather than emitting a confident-looking result from unusable input.
