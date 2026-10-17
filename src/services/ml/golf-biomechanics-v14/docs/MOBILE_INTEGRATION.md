# Mobile integration

1. Keep the existing camera/MediaPipe native bridge as the perception provider.
2. Map native 33-landmark frames into `integration/V14Bridge.ts`.
3. Run `GolfBiomechanicsEngineV14.analyze()` after the app's existing quality gate.
4. Feed returned metrics/anomalies/action into existing Figma analysis UI.
5. Use `runtime/deviceCapability.ts` and `runtime/thermalController.ts` to select a model tier.
6. Keep trained model artifacts outside source control and register them with `runtime/modelManifest.ts`.
7. Validate against unseen golfers, devices and camera views before enabling new coaching claims.
