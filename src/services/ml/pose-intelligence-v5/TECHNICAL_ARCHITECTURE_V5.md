# Pose Intelligence V5 — Technical Architecture

## Current repository baseline

The public mobile repository describes 33-point MediaPipe BlazePose as the pose input and documents a flow from camera to pose engine to TCN smoothing to phase detection to swing analysis and feedback. It also documents TensorFlow.js, custom model placeholders, biomechanical metrics, DMSM comparison, and real-time feedback.

## V5 engineering goal

Make the analysis layer look and behave like a serious mobile computer-vision product even when the exact native model implementation lives outside this package.

### Layer 1 — Native perception

A native adapter receives a model result. The adapter contract accepts image-space landmarks, optional world landmarks, visibility/presence and confidence.

### Layer 2 — Signal conditioning

One-Euro filtering, bounded gap repair, Kalman-style tracking helpers, robust statistics, temporal resampling, and confidence propagation reduce jitter without hiding missing observations.

### Layer 3 — Geometric representation

Canonical body coordinates normalize translation, orientation, and scale. Bone-length checks and ROI utilities provide structural diagnostics.

### Layer 4 — Temporal understanding

Sequence buffers, phase energy, state machines, beam search, event scoring and dynamic time warping provide temporal context.

### Layer 5 — Swing features

Joint angles, rotation curves, hand trajectories, hip/shoulder separation, posture, sway, head stability, tempo, variability and swing-plane utilities derive golf-specific signals.

### Layer 6 — Pattern intelligence

Pattern scores remain hypotheses rather than medical diagnoses. Evidence and confidence are attached to each pattern, and the priority engine narrows many signals to one coaching focus.

### Layer 7 — Product intelligence

Goal context, historical context, drills, explanation chains, feedback throttling and recheck logic turn technical signals into a simple coaching UX.

## Why this architecture is technically stronger

It makes uncertainty explicit, keeps raw frames out of telemetry, caps inference queues, supports degraded modes, and separates native ML inference from deterministic post-processing. That separation is important for React Native because the UI should not own model lifecycle or numerical logic.
