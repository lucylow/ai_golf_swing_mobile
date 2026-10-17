# V16 Mobile Integration

## Existing pipeline boundary
The current mobile app can continue to run its native/MediaPipe pose detector and pass 33-landmark pose frames into `src/V16Bridge.ts`.

## Recommended integration
1. Capture frames asynchronously from the camera/pose runtime.
2. Reject non-monotonic or duplicate timestamps in the native adapter.
3. Call `bridge.push(result)` for accepted pose results.
4. At swing end, call `bridge.analyzeAppFrames(frames, camera, handedness, goal)` or use `PoseController.analyzeV16(camera, handedness, goal)`.
5. Map `snapshot.metrics`, `snapshot.phases`, `snapshot.events`, `snapshot.anomalies`, and `snapshot.coaching` into the existing React Native screens and overlays.

## Performance
Do not perform expensive frame processing on the JS/UI thread. Use the native pose callback / background queue and consume compact snapshots on the UI side.

## Measurement safety
Force, energy, mobility, and 3D values are labeled as estimates/proxies unless backed by synchronized reference instrumentation.

The app bridge rejects malformed/non-monotonic pose frames and treats absent landmark confidence as unknown. Empty frame sequences return insufficient reliability and do not create measurements.
