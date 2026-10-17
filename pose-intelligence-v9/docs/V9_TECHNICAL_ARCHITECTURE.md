# Pose Intelligence V9

V9 deepens the existing pose/golf stack with:

- MediaPipe-shaped 33-landmark contracts and native adapters.
- Quality-aware preprocessing, bounded gap repair, resampling, One Euro smoothing, and canonical coordinates.
- Temporal swing-event detection and phase reconstruction.
- Golf-specific kinematic features, club proxies, pattern hypotheses, and explainability.
- Prototype embeddings and quality-weighted model fusion.
- Data schemas, deterministic dataset splits, leakage checks, augmentation, feature storage, and drift evaluation.
- Device policies, quantization policy, model health, safe telemetry, and runtime backpressure.
- Python and Swift reference integration boundaries for MediaPipe/OpenCV-based deployments.

The MediaPipe Pose Landmarker API documents 33 pose landmarks and supports IMAGE, VIDEO, and LIVE_STREAM modes; live-stream inference is asynchronous and can drop inputs under load. V9 mirrors those runtime semantics in its queue/backpressure contracts rather than assuming one result per camera frame.

The numerical golf features are engineering proxies. They should be calibrated/validated against real annotated golf data and launch-monitor ground truth before being exposed as production measurements.

