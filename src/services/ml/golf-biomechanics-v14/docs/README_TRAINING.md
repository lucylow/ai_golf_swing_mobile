# V14 training pipeline

Recommended order:
1. Generate synthetic 3D sequences.
2. Split by subject and device.
3. Pretrain phase/quality encoders.
4. Fine-tune on real phone pose sequences.
5. Calibrate against launch-monitor or multi-view reference data.
6. Evaluate by device/view/skill slices.
7. Quantize only after holdout metrics stabilize.
8. Ship the smallest model that meets the mobile acceptance gate.
