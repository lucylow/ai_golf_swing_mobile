# V10 Technical Architecture

## A. Perception

**MediaPipe/native pose runtime → 33 x 3D landmarks → quality/confidence.**

The upstream repository currently describes 33-point MediaPipe BlazePose, plus TCN smoothing and an LSTM-attention phase detector. V10 preserves compatibility while adding a deeper downstream intelligence layer.

## B. 3D body model path

`PoseFrame3D -> CanonicalFrame -> pelvis/thorax frames -> forward kinematics -> uncertainty-aware kinematics`.

The dense mesh adapter is optional. Do not ship third-party mesh assets without reviewing their license.

## C. Spatial-temporal path

`33-node skeleton -> normalized adjacency -> graph convolution -> temporal convolution -> temporal self-attention -> P1-P10 logits -> event decoding`.

The code intentionally separates learned weights from deterministic operators. This means you can plug in a trained ST-GCN/Transformer artifact without rewriting the orchestration layer.

## D. High-speed path

`120/240 FPS camera -> club/ball observations -> trajectory continuity -> spline interpolation -> impact refinement -> launch vector`.

Body analysis can run at a lower rate than club/ball tracking. `DualPipelineScheduler` keeps those streams independent and exposes frame-drop counts.

## E. Confidence propagation

Every stage should carry confidence. A production implementation should suppress or qualify coaching claims when the confidence of the upstream evidence falls below product thresholds.
