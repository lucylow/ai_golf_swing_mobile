# Pose Intelligence V5

A dependency-light, production-oriented pose/swing analysis layer intended to sit behind the existing React Native/Expo application.

The repository's documented architecture describes 33-point MediaPipe BlazePose feeding a pose pipeline, temporal smoothing, phase detection, swing analysis, and real-time feedback. This package keeps those boundaries explicit: the actual MediaPipe/native inference remains an adapter concern, while the rest of the pipeline provides robust normalization, smoothing, quality gating, feature extraction, phase detection, event detection, fault heuristics, confidence propagation, and explainable coaching signals.

## Design goals

- deterministic math and unit-testable transforms
- robust handling of missing/low-confidence landmarks
- temporal smoothing without inventing hard model claims
- normalized body geometry for camera-distance invariance
- phase-aware swing events
- confidence-aware metric and fault outputs
- integration through a small `PoseInferenceAdapter` contract
- safe no-op / degraded behavior when an on-device model is unavailable
- optional V14 confidence-aware biomechanics through `PoseController.analyzeV14()`

## Important implementation boundary

`MediaPipePoseAdapter` does not bundle or pretend to implement the native MediaPipe model. It converts an externally supplied MediaPipe-style result into the package's normalized representation. The current app repository documents MediaPipe BlazePose as its intended 33-landmark pose engine; this package therefore improves the surrounding engineering and analysis pipeline without asserting a specific bundled model artifact.

`PoseController.analyzeV14()` runs the V14 reliability layer on the controller's captured frames without changing the existing `analyze()` result contract. Camera-dependent signals remain unverified unless camera calibration and quality inputs are supplied.
