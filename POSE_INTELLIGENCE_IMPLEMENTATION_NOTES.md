# Implementation Notes

## What this improves

The current repository's README describes an on-device MediaPipe BlazePose path, a TCN pose smoother, an LSTM-attention phase detector, and a main SwingAnalyzer. This package strengthens the surrounding pipeline with deterministic, testable components for normalization, robust smoothing, quality gating, temporal phase heuristics, kinematics, pattern hypotheses, confidence, explainability, and integration state.

## What this does not claim

- It does not ship a new proprietary neural pose model.
- It does not claim benchmark accuracy.
- It does not claim a specific production TCN/LSTM/VAE implementation.
- It does not infer injury or medical risk.
- It does not replace a validated biomechanical assessment.

## Integration path

1. Keep the existing/native pose inference layer.
2. Adapt its result to `PoseFrame` using `MediaPipePoseAdapter` or an app-specific adapter.
3. Feed the frames into `PoseSwingAnalyzer`.
4. Use `AnalysisResult.primaryFocus`, `metrics`, `phases`, and `quality` in the existing redesigned React Native screens.
5. Keep all raw frames local unless an existing upload/analysis service explicitly requires them.

## Pose Intelligence Lab

Open `/pose-intelligence-lab` to inspect the deterministic local pose QA screen. The V5 processing source lives in `src/services/ml/pose-intelligence-v5`; connect the existing native inference result to its adapter before treating demo output as live analysis.

## Hardening pass

- Native pose adapters validate frame metadata, normalize partial results to exactly 33 landmarks, and mark malformed coordinates as invisible instead of propagating `NaN`.
- Direct analyzer calls discard malformed frames safely, reduce reported confidence when frames are dropped, and use `unknown` for invalid camera-view values.
- Pose controller history is bounded (180 frames by default), stored frames are copied defensively, initialization is deduplicated, and disposal waits for in-flight initialization.
- V6 analysis reports controlled failures for missing data, isolates exceptions thrown by UI subscribers, and handles invalid seeds and empty generator inputs.
- This hardening does not add a native inference model or claim model accuracy; actual inference remains an adapter integration boundary.
