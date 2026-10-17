# Demo Mode V6 — Mock Data + Demo Mode

This pass adds a large deterministic mock dataset and a route-ready Demo Mode layered on top of the existing V5 pose-intelligence bundle.

## Dataset scale
- 28 golfers
- 180 sessions
- 720 swings
- 260 temporal pose frames
- 24 tracked joints in this fixture representation
- 48 metrics
- 72 A.I. insights
- 84 drills
- 48 goals
- 120 notifications
- 24 trend series
- 64 demo scenarios
- 80+ additional domain fixture modules
- 24 scenario modules and 24 utility modules

## Demo mode
`DemoController` provides deterministic reset, scenario switching, network simulation, success/low-confidence/failure analysis simulation, active-user switching, and isolated state transitions.

## Routes
`/demo-mode`, `/demo-analysis-v6`, `/demo-pose-lab-v6`, `/demo-scenarios-v6`, `/demo-coach-v6`, `/demo-progress-v6`, `/demo-library-v6`, `/demo-history-v6`, `/demo-paywall-v6`, `/demo-settings-v6`, `/demo-notifications-v6`, `/demo-goals-v6`, `/demo-dataset-v6`.

## Production boundary
Demo Mode does not call live camera, ML, Firebase, RevenueCat, or API services. Use a feature flag or demo-only routes when integrating into production.

## Determinism
Seed `73194` reproduces the same generated user, session, swing, pose, insight and scenario datasets.
