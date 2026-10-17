# Technical Upgrade V5 — Pose / Swing Intelligence

## What is being added

The current application README describes a 33-point MediaPipe BlazePose input, a pose pipeline, a TCN-style smoother, an LSTM-attention phase detector, biomechanical metrics, fault detection, DMSM comparison, real-time feedback, and offline sync. The v5 package makes the surrounding architecture more explicit and testable.

### Pipeline layers

1. **Adapter** — converts native/MediaPipe-style landmark results to a stable `PoseFrame` contract.
2. **Preprocess** — bounded gap repair followed by confidence-aware temporal smoothing.
3. **Quality** — frame quality, visibility, required-landmark coverage, temporal stability, and analysis gating.
4. **Calibration** — camera-view heuristics, body-scale normalization, mirroring support.
5. **Kinematics** — velocity, acceleration, rotation, path, stance, and relational features.
6. **Phases** — setup, takeaway, backswing, top, transition, downswing, impact, release, finish.
7. **Events** — event confidence around top/transition/impact/release.
8. **Pattern hypotheses** — non-diagnostic golf movement tendencies with evidence and confidence.
9. **Explainability** — evidence chains and a single recommended coaching focus.
10. **Runtime** — scheduling, backpressure, degraded modes, model health, telemetry, serialization, and validation.

## MediaPipe boundary

The existing repository describes MediaPipe BlazePose as the intended 33-point pose source. The v5 adapter expects a MediaPipe-like result but does not bundle a native model or claim a particular benchmark. This keeps the package honest and avoids silently replacing the real native ML implementation.

MediaPipe's documented video pipeline uses detector + tracker behavior, predicts 33 landmarks, and can also provide world landmarks; the current v5 normalization layer is designed to consume exactly those concepts. 
