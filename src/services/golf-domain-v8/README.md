# Golf Domain V8

V8 extends the V7 golf layer with three production-oriented capabilities:

1. Launch-monitor calibration against measured reference shots.
2. Course-aware strategy simulation using deterministic Monte Carlo outcomes.
3. Adaptive golf-drill progression driven by evidence, mastery, spacing, and regression rules.

The launch-monitor layer is vendor-neutral. It accepts measured reference data from devices that expose common ball/club fields (for example ball speed, launch angle, azimuth, total spin, spin axis, carry, club speed, smash factor, club path, angle of attack, face angle, impact location and closure rate). The calibration engine learns a metric-wise affine correction with robust weighting rather than pretending the phone model is itself a launch monitor.

All course and drill simulations are deterministic when a seed is supplied. Numerical flight models remain approximations until calibrated against actual device data.
