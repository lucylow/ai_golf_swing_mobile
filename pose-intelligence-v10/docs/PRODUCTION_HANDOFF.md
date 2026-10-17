# V10 Production Handoff

## What this package provides

- Runtime-agnostic MediaPipe-style 33-landmark ingestion.
- 3D/canonical pose and kinematic math.
- Optional dense-mesh/HMR adapter contracts.
- EKF-style tracking and bounded occlusion recovery.
- ST-GCN and temporal-attention primitives.
- P1-P10 phase contracts and frame selection.
- High-FPS camera capability selection and sub-frame impact interpolation.
- Evaluation, replay, feature schemas, and deterministic regression fixtures.

## What the host app must provide

1. A real trained/native pose model and inference runtime.
2. Real labeled golf-swing data for phase/pattern models.
3. A production club/ball detector if club/ball tracking is required.
4. Device-specific benchmarking on supported iPhone/iPad models.
5. Real launch-monitor paired data for calibration.
6. Appropriate commercial licensing for any third-party model assets.

## MediaPipe integration

Feed 33 pose landmarks plus world coordinates where available into `src/mediapipeMapper.ts`. Keep the native callback lightweight; enqueue normalized observations and perform downstream analysis off the camera callback path.

## Dense 3D mesh integration

`src/mesh/*` contains an adapter boundary rather than a bundled SMPL-X model. Supply a commercially licensed model runtime separately and map its output into the `MeshFrame` contract.

## Phase-model integration

Replace the deterministic/demo phase logits in `src/phase/phaseModel.ts` / `src/V10Engine.ts` with trained ST-GCN/Transformer outputs. Preserve the P1-P10 contract so the UI and downstream analytics remain stable.

## High-FPS capture

Use the native `AIGolfCaptureV10.swift` reference to enumerate supported formats. Do not hard-code 120/240 FPS availability. The app should select an `AVCaptureDevice.Format` supported by the current device and recording configuration.

## Validation gates before release

- Accuracy against a labeled golf-swing test set.
- Cross-player and cross-device evaluation.
- Real-device latency and thermal testing.
- Camera failure and low-quality capture tests.
- Launch-monitor paired calibration validation.
- Club/ball tracking precision/recall validation.
- P1-P10 event accuracy validation.
- App Store build/test on physical devices.
