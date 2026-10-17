# V13 — Hybrid Synthetic/Real Golf A.I. Training Layer

This continuation builds the data-to-model bridge for the golf A.I. mobile product. It adds a large set of typed TypeScript data, training, evaluation, synthetic-data, serving, and mobile-deployment modules plus Python reference training utilities.

## Recommended dataset strategy

Synthetic 3D data is useful for scale and controlled edge cases, but it should not be the sole source of truth. The intended commercial pipeline is synthetic pretraining/domain randomization -> real-phone adaptation -> paired launch-monitor calibration where available -> expert-labeled golf outcomes -> subject/device-disjoint holdout evaluation -> mobile export.

MediaPipe Pose provides 33 3D pose landmarks and a detector/tracker video pipeline; the V13 contracts preserve that representation while leaving the model runtime swappable.

## Main flow

`VIDEO -> POSE -> TEMPORAL FEATURES -> MULTITASK MODEL -> CONFIDENCE -> GOLF FEATURES -> COACHING`

The V13 layer does not include proprietary or trained model weights. Model artifacts are explicitly external and versioned.

## App integration

The package is included in the mobile app at `src/services/ml/hybrid-training-v13`. Import its V13 orchestrator and model contracts from `@/src/services/ml/hybrid-training-v13`. This is an opt-in training and data layer; it does not replace live camera inference or add trained model artifacts.
