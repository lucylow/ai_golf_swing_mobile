# V16 Upgrade Notes

V16 is designed to drop into the existing Expo/React Native ML boundary.

## Integration
Use `src/V16Bridge.ts` as the input boundary for native pose results. Feed the returned snapshot into the existing overlay/audio/coaching UI.

## Mobile performance
Keep native pose inference asynchronous. The V16 stream scheduler assumes monotonic timestamps and can drop frames under backpressure. MediaPipe's live-stream API is asynchronous and requires timestamps to increase monotonically.

## Measurement policy
Expose confidence and quality with every advanced metric. Do not present a force proxy or monocular 3D estimate as equivalent to force-plate or optical-motion-capture measurements.
