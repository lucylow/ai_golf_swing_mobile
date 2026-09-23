# Runtime integration checklist

1. In the existing analyze route, validate the selected URI before upload and wrap the real analysis promise with `runAnalysisOnce`.
2. Keep the current camera permission refresh, recording cleanup, retry, and cancellation logic; the hardening layer is additive.
3. Wrap the existing purchase call with `safePurchase` and restore with `safeRestore`.
4. Route account deletion through `requestAccountDeletion`, using the real backend delete endpoint and token revocation only when Sign in with Apple is actually used.
5. Do not paste template bundle IDs, URLs, App Store Connect IDs, or privacy-manifest reasons into production.
