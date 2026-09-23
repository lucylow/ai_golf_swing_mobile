# Figma Make third-pass mock-data integration

## Purpose and safety boundary

The third-pass fixture layer is now integrated as an explicit **visual-QA environment**. It supplies high-density, deterministic fictional data to validate the Figma-driven layouts without writing to Firebase, RevenueCat, the camera pipeline, the analysis queue, or the app's persisted local session store. The feature is intentionally available only through the V2 Design Lab and the `/mock-data-lab-v3` route family.

The Mock Data Lab does read normal application context to display the active player's saved-session count, completed drills, and active goal. This creates a safe bridge between the design fixture environment and real app state, while keeping all fixture records read-only and separate from the production models.

## Fixture inventory

| Fixture family | Count | Visual coverage |
| --- | ---: | --- |
| Fictional golfer profiles | 10 | Persona, membership, and profile-card states |
| Synthetic sessions | 60 | Dense archives, score recaps, and comparison surfaces |
| Synthetic swings | 120 | Timeline, detail, cue, and metric visualizations |
| Metric records | 8 × 14 points | Trend, chart, and historical signal components |
| Swing phases | 7 | Address through finish checkpoints |
| Club records | 36 | Bag, carry, dispersion, and confidence layouts |
| Drill records | 48 | Search, completion, equipment, and difficulty states |
| Goals | 30 | Target, progress, deadline, and next-action cards |
| Coaching insights | 32 | Coaching feeds and evidence states |
| Notifications | 36 | Read, unread, coaching, plan, and system variations |
| Practice blocks | 42 | Planner density and intensity variants |
| Devices | 18 | Connected, disconnected, battery, and firmware states |
| Courses | 24 | Favorite, recent, and score states |
| Achievements | 30 | Locked, unlocked, and in-progress states |

Additional fixture modules cover weather, range lanes, comparison pairs, export presets, feedback, paywall plans, experiments, tags, and coach messages.

## Routes and interaction

`/mock-data-lab-v3` is the visual-QA hub. It exposes every V3 route through a labelled fixture catalog rather than requiring manual URL entry. Each fixture list now includes a local state switcher with **Populated**, **Loading**, and **Empty** modes. The loading state renders five skeleton rows; the empty state includes explanatory copy and a restore-fixtures control. The switcher is intentionally local to its visual screen and never persists a preference or modifies production data.

The normal `/design-lab-v2` screen now includes a Mock Data Lab card. Consequently, the full navigation chain is: **Profile → Design Lab → Mock Data Lab → fixture screen**. A direct link back to the live Command Center is available from the fixture hub.

## Integration corrections

The supplied V3 bundle contained three fixture-contract defects that were repaired during integration: the barrel export referenced an absent `aliases` module, device capability values were strings while their contract required `string[]`, and the paywall `highlighted` field was declared as a string while its fixtures used booleans. The fixture contracts were aligned with their actual deterministic data values, and the entire Expo project was typechecked afterward.

## Validation

The dedicated `figma-v3-fixtures.test.ts` suite verifies all advertised fixture quantities, session-to-golfer and swing-to-session relationships, 14-point metric histories, and mixed read/unread, locked/unlocked, and connected/disconnected states. On September 22, 2026, the complete project sequence passed: `pnpm check`, `pnpm lint`, `pnpm test`, and `pnpm exec expo export --platform web`. The export generated **55 static routes**, which includes every V3 mock route and the existing live application routes. Lint continues to report the same three pre-existing warnings outside the redesign work, with no errors.

Native device checks remain necessary for capture, media permissions, sharing, and purchase behaviors; those flows are unchanged by this fixture-only pass.
