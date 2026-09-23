# Figma Make second-pass integration

## Implementation approach

The second-pass bundle supplied an extensive visual library, but its route screens were presentation-only and repeatedly consumed mock `metrics`, `sessions`, `goals`, and `drills` records. Rather than add a competing data store, this integration imports the reusable native visual primitives and binds selected high-value routes to the existing Expo application state. Camera capture, video import, AI task execution, session persistence, paywall behavior, sharing, exports, and notifications remain owned by the original application services.

## Integrated routes

| Route | Purpose | Connected source of truth |
| --- | --- | --- |
| `/design-lab-v2` | Routeable visual QA hub for the second-pass implementation | Navigation to all connected V2 routes. |
| `/command-center` | A compact coaching dashboard | Saved sessions, profile, active goal, completed drills, practice streak, and derived analysis signals. |
| `/analysis-overview-v2` | Latest saved analysis summary | Current saved-session score, stage outputs, metrics, and drill navigation. |
| `/metrics-overview` | Biomechanics and score movement dashboard | Latest-stage metrics and chronological saved-session score trend. |
| `/session-history-v2` | Searchable session timeline | Persisted sessions, club filter, and saved session detail navigation. |
| `/trends-v2` | Score trend explorer | Chronological session scores, average, best score, and latest coaching focus. |
| `/goals-v2` | Active target dashboard | Persisted active goal plus actual drill completion and seven-day practice rhythm. |
| `/practice-planner-v2` | Practice recommendations | Existing drill catalog, completed-drill state, and practice timestamps. |
| `/drill-explorer-v2` | Searchable coaching drill library | Existing drill catalog, recommended focus, and completed-drill state. |
| `/settings-v2` | Preference and membership presentation | Persisted profile/notification preference and monetization state. |

## Design-system improvements

The project now includes the V2 deep-green/lime token system and **150 native reusable component files**, including more detailed hero cards, metric rows, session cards, progress meters, charts, drill cards, filters, toggles, and settings patterns. The imported `MetricGrid` was corrected to use only React Native primitives, eliminating a web-only `<div>` marker from the mobile component implementation.

`figma-redesign-v2/adapters.ts` is the explicit boundary between existing models and the new cards. It transforms real `SwingSession`, drill, and active-goal records into small, display-only view models. It does not create a duplicate persistence or analysis layer.

## Navigation upgrades

The active first-pass routes now expose the second-pass experience in normal app flow. Home links to Command Center; completed analysis links to the extended analysis overview; Library links to the searchable session timeline; Progress links to trends and goals; Profile links to settings, history, and Design Lab. Every added action has a destination backed by the existing route or state contract.

## Verification

The new adapter unit suite covers session, metric, trend, drill, and goal transformations. On September 22, 2026, the complete application sequence passed: `pnpm check`, `pnpm lint`, `pnpm test`, and `pnpm exec expo export --platform web`. The web export generated **33 static routes**, including all nine data-backed V2 routes. The lint command reports three pre-existing warnings outside this pass (`app/dev/diagnostics.tsx` and `app/practice-history.tsx`) but no errors.

Native camera, media permissions, share sheets, and purchase behavior still require iOS/Android device verification because web export cannot exercise all native APIs.
