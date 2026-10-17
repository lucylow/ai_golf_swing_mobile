# Demo Mode V6 Integration

V6 is installed as an isolated mock-data layer at `src/services/demo-mode-v6`. Its provider/controller and deterministic fixtures are demo-only; they do not replace or connect to the production API, live camera, V5 pose pipeline, or purchase services.

Open `/demo-mode` for the Demo Mode hub. It links to 13 demo screens: `/demo-home-v6`, `/demo-analysis-v6`, `/demo-pose-lab-v6`, `/demo-scenarios-v6`, `/demo-coach-v6`, `/demo-progress-v6`, `/demo-library-v6`, `/demo-history-v6`, `/demo-paywall-v6`, `/demo-settings-v6`, `/demo-notifications-v6`, `/demo-goals-v6`, and `/demo-dataset-v6`.

The deterministic dataset includes 28 golfers, 180 sessions, 720 swings, 260 temporal pose frames with 23 tracked points each, 48 metrics, 72 insights, 84 drills, 48 goals, 120 notifications, 24 trends, and 64 demo scenarios.

The fixtures are illustrative synthetic data. Do not interpret their values as measured model performance or real golfer records.

## Determinism and safe demo failures

The default seed `73194` reproduces the standard fixture set; alternate finite seeds now produce repeatable but different fixture values. Invalid seeds fall back to the default. Empty generator inputs return empty collections, oversized ranges are capped, and missing data or listener exceptions become isolated demo errors rather than breaking the rest of the UI.

## Golf Domain V7

The complete golf-specific domain package is installed at `src/services/golf-domain-v7`. Nine new routes are linked from this hub: Golf Command Center, Golf Intelligence Lab, Shot Shape, Club Gapping, Course Strategy, Practice Plan, Putting Lab, Short Game, and A.I. Golf Coach. V7 fixture-driven values are illustrative and do not replace the live camera, V5 pose pipeline, or production services.
