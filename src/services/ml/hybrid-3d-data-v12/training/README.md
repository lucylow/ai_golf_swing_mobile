# Training workflow

1. Generate synthetic 3D sequences with the TypeScript generator.
2. Export JSONL records.
3. Add real captured pose/launch-monitor sequences.
4. Use subject-disjoint and session-disjoint splits.
5. Start with synthetic-heavy curriculum for coverage.
6. Increase real-data share for domain adaptation.
7. Evaluate on a never-seen real test set.
8. Calibrate probabilities and launch-monitor regressors.
9. Quantize/distill the final model.
10. Convert to a mobile runtime and benchmark on target iPhones.
