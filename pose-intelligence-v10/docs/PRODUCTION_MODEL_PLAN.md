# Production Model Plan

1. Keep the 33-point pose detector as the fast baseline.
2. Train a golf-specific temporal model using subject-disjoint validation.
3. Add a dedicated clubhead/ball detector trained on high-FPS golf footage.
4. Use real device captures from the supported iPhone matrix to calibrate geometry and timing.
5. Benchmark FPS, p50/p95 latency, thermal load, memory, and frame-drop rate.
6. Promote model artifacts only through `modelRegistryV10.ts` with explicit runtime and commercial-license metadata.
