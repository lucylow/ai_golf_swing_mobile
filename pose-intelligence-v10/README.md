# Pose Intelligence V10

A research-to-production engineering layer that deepens the existing AI Golf Swing Coach stack with:

1. **3D pose / mesh contracts and kinematics** — a runtime-agnostic bridge for MediaPipe-style 3D landmarks and optional dense body-mesh recovery, plus forward kinematics, joint limits, robust filtering, pelvis/thorax frames, and X-Factor trajectories.
2. **Spatial-temporal swing modeling** — P1–P10 event contracts, graph convolutions over the skeleton topology, temporal self-attention, sequence pooling, phase logits, and frame-accurate event selection.
3. **High-frame-rate club / ball tracking** — camera capability selection, club and ball keypoint tracking contracts, spline-based sub-frame interpolation, impact-time refinement, attack-angle and launch-vector estimation.
4. **Production data/evaluation** — feature schemas, deterministic synthetic swings, dataset versioning, calibration manifests, latency/quality metrics, drift checks, and replayable regression tests.
5. **iOS capture reference** — AVFoundation code for enumerating supported formats and choosing high-frame-rate configurations without assuming every iPhone supports the same mode.

## Important implementation boundaries

The code is intentionally **model-runtime agnostic**. The repository can use the existing MediaPipe/native pose detector and feed its 33 3D landmarks into this layer. Google documents Pose Landmarker as outputting 33 3D landmarks with normalized and world coordinates, and supporting IMAGE, VIDEO, and LIVE_STREAM modes. LIVE_STREAM is asynchronous and may drop inputs under load, so the V10 runtime explicitly models monotonic timestamps and backpressure. See the project documentation for the authoritative runtime contract.

A dense SMPL-X bridge is included as an optional adapter, **not a bundled commercial model**. The official SMPL-X repository describes 10,475 vertices and 54 joints and states a non-commercial scientific-research license. A commercial product must obtain appropriate rights before distributing or using those model assets in production.

The high-FPS camera layer is also capability-driven. Apple documents that high-frame-rate capture depends on the active `AVCaptureDevice.Format` and its supported frame-rate ranges; the app must enumerate formats rather than assume 120/240 FPS is available on every device.

## What is real vs. what still needs a trained model

Real engineering math in this package:
- kinematics
- coordinate frames
- EKF-style tracking
- graph convolution and attention operations
- phase probability handling
- interpolation
- impact refinement
- launch-vector geometry
- quality/confidence aggregation
- evaluation metrics

Still required for a production ML system:
- trained weights for a dense mesh model
- trained ST-GCN / Transformer phase model
- trained club/ball detector
- real labeled golf-swing datasets
- real-device calibration and validation
- iOS native model runtime integration (Core ML / MediaPipe / TensorFlow Lite as selected)

This package deliberately does not fake trained weights.
