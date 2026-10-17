# V10 CHANGELOG

## 1. 3D body / mesh layer
- Added 3D body model contracts compatible with 33-landmark inputs and optional dense 10,475-vertex mesh adapters.
- Added pelvis and thorax local coordinate frames.
- Added forward-kinematics and joint-limit utilities.
- Added EKF-style occlusion stabilization.
- Added X-Factor, X-Factor stretch rate, pelvic tilt, thorax tilt, and trunk rotation trajectories.
- Added uncertainty propagation from 2D/3D landmarks into derived kinematics.

## 2. Spatial-temporal model layer
- Added P1-P10 state definitions.
- Added 33-node golf skeleton graph.
- Added graph convolution primitives.
- Added multi-head temporal self-attention.
- Added positional encodings and temporal pooling.
- Added per-frame P1-P10 probability outputs.
- Added event decoding with hysteresis and minimum dwell times.
- Added tempo estimation without assuming a fixed universal ratio.

## 3. Club / ball high-FPS layer
- Added camera capability selection.
- Added native capture reference for AVFoundation.
- Added club/ball keypoint contracts.
- Added optical-flow and trajectory continuity helpers.
- Added cubic Hermite spline interpolation.
- Added impact-time refinement around contact.
- Added launch-vector and attack-angle geometry.
- Added uncertainty windows for sub-frame estimates.

## 4. Data and evaluation
- Added dataset manifest and feature-store schemas.
- Added deterministic synthetic swing generator.
- Added golden-set evaluator and drift metrics.
- Added per-phase performance metrics.
- Added latency budgets and frame-drop monitoring.
- Added replay manifests for bug reproduction.

## 5. Testing
- Added deterministic tests across geometry, filtering, graph operations, attention, event decoding, interpolation, camera capability selection, and end-to-end orchestration.
