# V9 Deep Technical Notes

## MediaPipe contract

The native boundary mirrors the documented MediaPipe Pose Landmarker shape: 33 pose landmarks, normalized image coordinates, optional world landmarks, confidence/visibility information, and IMAGE/VIDEO/LIVE_STREAM execution semantics.

## Temporal model

The post-inference layer intentionally separates spatial pose estimation from temporal reasoning. This makes it possible to consume MediaPipe, OpenCV-assisted landmarks, Apple Vision landmarks, or a future custom detector without changing golf-specific feature extraction.

## Runtime behavior

Live-stream pose systems are asynchronous. The application therefore uses queue depth, latency, and frame-drop policies instead of assuming every camera frame produces an inference result.

## Golf feature philosophy

Features are normalized around body scale where possible and are phase-aware. Individual metrics are treated as evidence rather than ground truth. Pattern hypotheses should combine several features and carry confidence.

## Data engineering

Records are versioned, include the source/model version, and are partitionable into training/validation/test datasets. Leakage detection and drift monitoring are explicit because swing videos from the same golfer can be highly correlated.

