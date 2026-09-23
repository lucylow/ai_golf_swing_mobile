# Release Hardening v4

This pass assumes the Figma Make visual redesign is already integrated. It concentrates on the code paths that most often create bad TestFlight sessions or App Review-visible failures: permission denial, media validation, offline behavior, duplicate submissions, timeouts, cancellation, unmounted components, storage corruption, safe logging, account deletion plumbing, privacy-manifest auditing, and reviewer access.

## Apply

From the Expo app root, copy this `release-hardening-v4` folder into the repository, then run:

```sh
node release-hardening-v4/scripts/install-release-hardening.mjs
npm run check
npm run release:verify
```

The installer backs up `app/_layout.tsx` before changing it and adds release scripts to `package.json` without replacing unrelated scripts.

## Build

Use the repository's real production bundle identifier, version, credentials, App Store Connect ID, production API URL, privacy answers, and review instructions. The included config is intentionally a template and does not invent those values.

Typical EAS flow:

```sh
eas build --platform ios --profile production
eas submit --platform ios --profile production
```

## Important

Passing these scripts is not the same thing as Apple approval. Run the production build on physical iOS devices through TestFlight, exercise the camera/media/purchase/auth/deletion paths, verify the final archive's privacy manifest and App Store Connect privacy answers, and provide reviewer access where required.
