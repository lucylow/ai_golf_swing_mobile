# V8 Changelog

## Capabilities
- Real launch-monitor calibration workflow using paired app/reference measurements, robust Huber fitting, holdout checks, cross-validation and confidence diagnostics.
- Course-aware strategy simulation using deterministic Monte Carlo outcomes, bivariate dispersion, wind effects, hazard geometry, recovery burden and risk budgets.
- Adaptive golf drill progression using mastery, confidence, variance, fatigue, spacing, promotion and regression.

## Size
- 450 TypeScript source files
- 65 test files
- 12 React Native route screens
- 11,972 lines across the V8 tree
- 1200 paired calibration reference samples in the large fixture (two metrics across 600 shots)

## Important measurement note
The calibration layer corrects phone/app estimates toward measured reference values. It does not make phone video a launch monitor by itself. Production calibration should be fit and validated with real device exports/SDK measurements and an independent holdout set.
