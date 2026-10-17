# V7 Integration Notes

The intended production flow is:

`native pose/video runtime -> V5 pose intelligence -> V7 golf domain engine -> redesigned UI`

Use `src/integration/ExistingAppBridge.ts` to adapt the existing app payloads into the V7 contracts.

Do not replace the existing camera, ML inference, Firebase, RevenueCat or release-hardening systems with this package. V7 is a domain layer.

