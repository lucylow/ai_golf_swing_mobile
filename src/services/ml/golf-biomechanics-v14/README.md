# AI Golf Swing Coach V14 — Mobile Biomechanics Reliability Layer

V14 adds a production-oriented biomechanics layer on top of the existing MediaPipe/temporal golf-AI architecture.

## Core upgrades
- Landmark and derived-metric confidence propagation
- Golf camera calibration and canonical coordinate transforms
- Anatomical consistency and kinematic plausibility constraints
- Pose + hand fusion contracts
- Multi-resolution temporal feature extraction
- Golf-specific graph topology
- Personalized swing baselines
- Hierarchical anomaly scoring
- Counterfactual coaching simulation contracts
- Multi-device evaluation and acceptance gates
- Real-device performance/thermal/battery telemetry contracts
- Robust replay and deterministic benchmarking
- Mobile model registry and capability routing

This layer intentionally does not pretend trained weights exist. Native pose/hand runtimes and custom model artifacts plug into the interfaces here.

## App integration

The V14 engine is included at `src/services/ml/golf-biomechanics-v14` and can be imported from `@/src/services/ml/golf-biomechanics-v14`. `V14Bridge.analyzeAppFrames` accepts the existing V5 pose-frame shape, preferring world landmarks when they are available. Supply measured camera calibration and camera-quality scores when available; absent values remain explicitly unverified rather than being treated as perfect.

The bridge requires 33 finite pose landmarks per frame, validates confidence values, derives FPS from frame timestamps when FPS is not provided, and rejects malformed or out-of-order frames. Empty input returns an insufficient-quality result without generating biomechanics.
