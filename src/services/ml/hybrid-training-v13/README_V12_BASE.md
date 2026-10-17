# AI Golf Swing Coach V12 — Hybrid 3D Dataset + Training Layer

This package extends the existing mobile architecture with a training/data layer for custom golf models.

## Core answer: do we need synthetic 3D data?

No, synthetic 3D data is not strictly required to ship a mobile app. It is highly useful for training and augmentation when you need controlled coverage of swing phases, viewpoints, occlusions, body proportions, noise, and rare failure cases. Real phone/video and launch-monitor data remain essential for domain adaptation, calibration, and held-out validation.

Recommended pipeline:

1. Procedurally generate 3D kinematic golf swings and ground truth.
2. Render / project them into camera-space observations with domain randomization.
3. Mix synthetic and real pose sequences using subject-disjoint splits.
4. Train the custom temporal model.
5. Fine-tune on real labeled swings.
6. Calibrate against real launch-monitor measurements.
7. Export a compact model for on-device inference.
8. Validate on device across supported iPhone classes.

## Included

- Procedural 3D golfer skeleton generator
- P1–P10 swing state ground truth
- Club and ball trajectories
- Camera projection and multi-view generation
- Occlusion / dropout / blur / noise augmentation
- Body-shape and club randomization
- Synthetic-to-real metadata
- Subject- and session-disjoint dataset splitting
- Leakage detection
- JSONL / CSV / binary-friendly record exporters
- ST-GCN training scaffold
- Temporal Transformer training scaffold
- Multi-task loss definitions
- Anomaly autoencoder training scaffold
- Evaluation metrics
- Calibration manifests
- Mobile model manifest for Core ML conversion
- Dataset QA reports
- Deterministic demo fixtures

The generated models are training scaffolds only; this repository does not include trained proprietary weights.
