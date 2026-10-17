# V15 Mobile Golf Biomechanics Reliability Layer

A continuation of the V14 mobile-biomechanics architecture. This layer focuses on robust golf-specific kinematics, confidence-aware measurements, camera normalization, pose+hand fusion, temporal event intelligence, personalized baselines, drill-linked feedback, and device-aware execution. It is designed to consume a native MediaPipe/pose runtime rather than pretending to contain trained production weights.

## Core path

video -> pose/hand -> quality -> camera normalization -> anatomical validation -> temporal tracking -> golf kinematics -> personalized baseline -> coaching evidence -> UI/audio.

All metrics should be treated as estimated unless calibrated against a trusted reference system.

## App integration

The V15 engine is included at `src/services/ml/golf-biomechanics-v15` and exported from `@/src/services/ml/golf-biomechanics-v15`. It can also be invoked on captured V5 pose-controller frames with `PoseController.analyzeV15(camera, handedness, goal)`. Pass a measured camera model and the golfer's handedness; the bridge does not invent either value. World landmarks are preferred when available, and missing confidence is treated as zero rather than perfect visibility.

V15 validates 33-landmark frames, coordinate/confidence ranges, frame timestamps, and camera intrinsics before evaluation. Coaching recommendations are withheld when combined pose, anatomy, temporal, and camera reliability is below the configured threshold. Output remains a proxy until calibrated against real-golfer reference data.
