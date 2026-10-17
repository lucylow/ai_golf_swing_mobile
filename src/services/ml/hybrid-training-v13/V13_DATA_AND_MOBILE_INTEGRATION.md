# V13 — Hybrid Synthetic/Real Data + Custom Golf A.I. Integration

## What this layer is for

This continuation is the data-to-model production bridge for a mobile golf swing coach. It is designed around a hybrid dataset strategy:

1. Synthetic 3D sequences for controlled coverage and rare/edge cases.
2. Real phone videos for domain adaptation.
3. Optional paired launch-monitor observations for metric calibration.
4. Expert swing/phase/coaching labels for supervised targets.
5. Subject- and device-disjoint holdouts for the final evaluation.

## Is synthetic 3D required?

No. It is highly useful, but it should not be the only source of training data. Synthetic data is best treated as a scale/coverage tool; real-world video is the ground truth for deployment-domain behavior.

## Mobile model path

The training code is framework-agnostic at the TypeScript boundary and has optional Python/PyTorch scaffolds. The final mobile artifacts should be produced only after real validation:

`synthetic + real -> train -> real holdout -> calibrate -> quantize -> device benchmark -> release`

## Major modules

### Data
- ingestion and provenance
- de-identification/consent hooks
- subject/device/viewpoint balancing
- deduplication and leakage guards
- synthetic/real mixture policy
- active learning and hard-example mining
- pseudo-label and multi-rater fusion
- phase/event/anomaly/coach/drill labels
- dataset versioning and lineage

### Training
- ST-GCN and temporal Transformer scaffolds
- multi-task outputs
- phase/event/metric/anomaly losses
- temporal consistency
- contrastive learning
- distillation
- curriculum and domain scheduling
- checkpoint/reproducibility tooling
- calibration and evaluation
- Core ML / TFLite export contracts

### Synthetic generation
- camera rigs
- body variation
- swing faults
- P1-P10 generation
- club and ball kinematics
- terrain/wind/lighting
- blur/noise/occlusion
- domain randomization
- coverage planning
- renderer contract

### Mobile
- capability tiers
- model routing
- frame/thermal/battery/memory budgets
- offline model assets
- integrity/version checks
- live inference scheduling
- replay and overlay contracts

## Production warning

The code deliberately does not ship trained weights. Replace the model contracts with actual trained artifacts and verify them on unseen golfers and physical iOS devices before using output as real swing metrics.
