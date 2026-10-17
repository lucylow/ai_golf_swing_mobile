# AI Golf Swing Coach V16 — Advanced Biomechanics

V16 continues the prior V14/V15 biomechanics work with a reliability-first golf-specific analysis layer.

## Core path
Camera → MediaPipe/native pose → capture quality gate → camera normalization → anatomical constraints → temporal features → golf kinematics → pressure/energy proxies → personal baseline → anomaly ranking → counterfactuals → coaching.

## New concepts
- Golf-specific kinematic sequence analysis.
- X-Factor and X-Factor stretch.
- Trail-foot / trail-hip stability.
- Lead-side bracing and balance.
- Pressure and energy-transfer proxies.
- Bilateral symmetry.
- Mobility screening as a non-diagnostic product signal.
- Multi-window feature analysis.
- Personal baseline compatible metrics.
- Confidence propagation.
- Device-aware inference policy.
- Stream backpressure.
- Replay/evaluation contracts.

All force, energy, mobility, and 3D quantities that are not directly measured by a sensor are explicitly proxies/estimates and require real-world validation before being presented as instrument-grade biomechanics.

## App integration

The V16 package is included at `src/services/ml/golf-biomechanics-v16`. The existing pose controller exposes `analyzeV16(camera, handedness, goal)` for captured frames. Supply measured camera calibration and the golfer's handedness; the integration does not fabricate either. World landmarks are preferred, and missing landmark confidence is treated as unknown rather than perfect visibility.

V16 validates frame timestamps, the 33-landmark layout, coordinates, confidence values, and camera calibration. Empty sequences return an explicit insufficient-reliability snapshot. Coaching is withheld when reliability is below the engine's threshold. Proxy values require validation against real instrumentation before being described as measured biomechanics.
