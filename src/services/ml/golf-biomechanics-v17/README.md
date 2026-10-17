# Golf Biomechanics V17

V17 extends the app's V16 biomechanics analysis with readiness scoring,
multi-resolution temporal features, impact-event estimation, optional bounded
counterfactuals, personalized comparisons, drill signals, and a registry of 118
golf-specific feature functions.

Use `V17Bridge.analyzeAppFrames` to adapt captured pose frames, or call
`PoseController.analyzeV17` to analyze frames already collected by the app's
pose pipeline. Both paths require a camera calibration and handedness. Supply
historical metrics from the same golfer to enable meaningful personalized
comparisons; without matching history, personalized anomaly scores and
confidence are zero.

All club, force, energy, and counterfactual values remain pose-derived proxies,
not launch-monitor measurements or validated physical predictions. The
counterfactual output is explicitly limited and should not be presented as a
guaranteed ball-flight result.
