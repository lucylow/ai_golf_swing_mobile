# AI Golf Swing Coach: iOS release handoff

**Prepared by Manus AI**

## Release conclusion

This repository is a **single, release-gated Expo source package** that combines the original AI Golf Swing Coach app, the Figma redesign, the V3 deterministic visual fixtures, and the repaired V4 release-hardening layer. The latest source gate completed successfully: TypeScript typechecking, Expo linting, all automated tests, secret and placeholder scans, runtime-safety checks, iOS preflight, Expo Doctor, and a production web export all passed.

The archive is ready to become an iOS production build through EAS. It is **not an already-signed `.ipa`**, because the Apple Developer team, signing certificates, App Store Connect app record, production API credentials, and reviewer credentials are account-specific. EAS production builds are designed to be distributed through App Store Connect and then evaluated in TestFlight before App Store review.[1]

## Included release configuration

| Release area | Completed implementation |
| --- | --- |
| iOS build metadata | Expo version `1.0.0`, iOS build number `1`, bundle identifier `com.app.aigolfswingcoach`, and non-exempt-encryption metadata are defined in `app.config.ts`. |
| iOS permission copy | Camera, microphone, photo-library read, and photo-library save purpose strings are configured. |
| EAS profiles | `eas.json` includes development, internal preview, and store-distribution production profiles with production auto-increment enabled. |
| Expo SDK health | All native modules are aligned to Expo SDK 54, `expo-asset` is installed, and Expo Doctor reports **18/18 checks passed**. |
| Runtime resilience | The root layout installs global error handlers and a release error boundary. The release layer provides redacted logging, safe storage/network/media helpers, timeout behavior, and review-readiness checks. |
| Figma visual QA data | The V3 fixture and design-lab routes remain available only when `EXPO_PUBLIC_ENABLE_DESIGN_LABS=true`. They redirect to the home route by default, so sample data is not exposed through ordinary production navigation. |
| Validation command | `pnpm release:verify` runs the complete source gate, including a web bundle smoke test. |

The checked source tree currently contains **155 passing test files and 662 passing tests**. The final Expo export produced 56 static routes successfully; the visual-QA routes remain compiled for development but are blocked at runtime in a normal production environment.

## What was repaired

The supplied V4 hardening bundle was not directly release-safe. Its generated scenario identifiers started with digits, which made TypeScript fail to parse them. The release-readiness route used broken imports, the error catalogs referenced undefined values, and several APIs did not match the installed Expo SDK types. All of these defects were corrected and the full V4 suite now runs inside the real Expo project.

The release tooling was also completed. It now detects committed secrets and executable placeholder values without treating comments or unit-test fixtures as production content. Expo Doctor was added as a development dependency, native peer dependencies were installed, and the dynamic Expo configuration now declares the required `expo-asset`, `expo-font`, and `expo-web-browser` plugins. The installer script was corrected so a future run will not overwrite the validated pnpm-based release scripts.

## Owner-controlled release requirements

Before the first production build, confirm that **`com.app.aigolfswingcoach`** is registered in the intended Apple Developer account. If it is not, change `rawBundleId` in `app.config.ts` before building. Changing the bundle identifier after an app record has been created produces a separate App Store app identity.

Set the real production API and any reviewer-access values through secure EAS environment variables. Do not commit API keys, Apple signing material, passwords, or App Store Connect identifiers. If sign-in is required for any feature under review, provide a valid demo account or a fully functional review path in App Store Connect. Apple directs developers to include special setup instructions and account information in the App Review Information section.[2]

The privacy scan deliberately reports no source `PrivacyInfo.xcprivacy` manifest. This does not fabricate a declaration. Before submission, inspect the archived binary and all bundled SDKs, then complete App Store Connect’s privacy disclosures with the behavior of the real app and backend. Apple requires privacy manifests to describe collected data and the required-reason APIs used by an app or third-party SDK.[3]

## Build and TestFlight procedure

Install the locked dependency set and repeat the release gate from the project root:

```sh
pnpm install --frozen-lockfile
pnpm release:verify
```

Authenticate to the Expo account that is authorized for the Apple Developer team, then configure or verify production credentials and queue the iOS build:

```sh
npx eas-cli@latest login
npx eas-cli@latest credentials --platform ios --profile production
npx eas-cli@latest build --platform ios --profile production
```

Install the processed build through TestFlight. EAS Submit can upload the resulting iOS archive to App Store Connect, but it does not complete the App Store listing or press **Submit for Review** on the owner’s behalf.[1] [2]

```sh
npx eas-cli@latest submit --platform ios --profile production
```

## Required physical-device acceptance test

Run the following tests on a real iPhone connected to the real production service. Repeat the important capture, upload, and analysis paths on an iPad if tablet support remains enabled. A source-level gate cannot verify actual device permissions, Apple signing, production network behavior, purchases, or external API availability.

| Scenario | Acceptance criterion |
| --- | --- |
| First launch, onboarding, and tabs | The app opens without a crash, the redesigned screens render correctly, and routine navigation has no dead ends. |
| Camera access | Allow, deny, and permanently deny camera access. The app must show clear recovery instructions and must not trap the user on the capture screen. |
| Photo access | Test full, limited, and denied photo-library access. Selecting or replacing a swing video must remain recoverable. |
| Capture and imported media | Record, stop, retake, import, and analyze a video. Duplicate taps must not create duplicate analyses or sessions. |
| Lifecycle changes | Background the app while recording, importing, and analyzing. Returning to the app must not leave a stale loading state. |
| Network failure | Use airplane mode, reconnect, and simulate a slow/failed analysis. Existing data must remain visible and retry/cancel copy must be actionable. |
| Purchases and restore | Test purchase, cancellation, failure, and restore against the actual monetization configuration before enabling the relevant products. |
| Privacy, sharing, and deletion | Validate the real privacy policy link, sharing/export failure behavior, and account deletion if accounts are enabled. |
| Accessibility | Test VoiceOver and enlarged Dynamic Type for capture, analysis, library, progress, profile, and paywall actions. |

## App Store Connect completion checklist

Finalize product metadata, support and privacy-policy URLs, screenshots that accurately reflect the shipped app, availability, pricing, age rating, and any subscription details. Apple cautions against shipping incomplete content, placeholder material, broken links, or untested crashes; it also requires complete reviewer instructions where functionality needs a login, special setup, or hardware.[2]

Verify the final TestFlight build instead of relying on web-preview behavior. Confirm each permission string matches the app’s actual behavior, audit the third-party dependencies in the generated iOS archive, and provide a reviewer account plus concise swing-capture instructions where necessary. Keep `EXPO_PUBLIC_ENABLE_DESIGN_LABS` unset for the production environment; enable it only in a dedicated internal visual-QA build.

## References

[1]: https://docs.expo.dev/tutorial/eas/ios-production-build/ "Create a production build for iOS | Expo Documentation"
[2]: https://developer.apple.com/distribute/app-review/ "App Review | Apple Developer"
[3]: https://developer.apple.com/documentation/bundleresources/privacy-manifest-files "Privacy manifest files | Apple Developer Documentation"
