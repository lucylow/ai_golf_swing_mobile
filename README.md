# AI Golf Swing Coach

This is the unified Expo/React Native source package for the AI Golf Swing Coach Figma redesign and iOS release preparation.

## Start here

Read [APP_STORE_SUBMISSION.md](./APP_STORE_SUBMISSION.md) before creating a production build. It records the release configuration, the verified source gate, required Apple-account setup, TestFlight acceptance checks, and the EAS commands for a store build.

## Local development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Release validation

```sh
pnpm release:verify
```

The production configuration keeps deterministic Figma visual-QA routes blocked by default. Use `EXPO_PUBLIC_ENABLE_DESIGN_LABS=true` only in a dedicated internal QA environment.
