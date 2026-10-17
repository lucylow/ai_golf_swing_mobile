# V8 Integration

## High-level flow

Video / phone pose estimate -> V7 swing features -> launch-monitor calibration (optional) -> calibrated shot model -> course simulator -> recommendation -> adaptive drill progression.

## Real launch-monitor calibration

Import measured shots from a monitor export using the parser adapters. Pair those measurements with the app's same-shot estimates using a stable `shotKey`. Run `fitLaunchMonitorCalibration` to learn bias, scale, and optional cross-correlation terms per metric. Persist the calibration profile only after the report passes sample-count, RMSE, and holdout checks.

The calibration API is deliberately provider-neutral; add a device SDK bridge separately when a vendor grants access to a supported protocol.

## Course strategy

Build a `CourseModelV8` from hole geometry, hazards, green geometry, wind, elevation and pin position. Run `simulateHolePlanV8` with deterministic seeds to compare candidate clubs/targets. The simulator samples both lateral and longitudinal shot error and accounts for hazard penalties and post-shot lie/recovery states.

## Drill progression

Create a `ProgressionProfileV8` for each skill. Feed completion results through `updateMasteryV8` and then use `buildNextDrillV8` to choose progression, maintenance, regression, or recovery work.
