# Golf Domain V7 — Golf-Specific Feature Layer

This layer continues the V6 demo architecture and concentrates on golf-specific product intelligence rather than generic dashboards.

## Core golf features

- Shot-shape classification from club path and face-to-path interaction.
- Illustrative ball-flight estimation with strike, spin, launch, lie, elevation and wind inputs.
- Club-gapping analysis and club recommendation.
- Tee-shot risk, hazard exposure, target windows, wind strategy, pin strategy and layup planning.
- Putting start-line, distance-control and break modeling.
- Chip landing and pitch-window modeling.
- Bunker entry/launch planning.
- Wedge carry-window matrices.
- Swing sequencing, tempo, delivery window, swing-plane and kinematic utilities.
- Practice weakness prioritization and session planning.
- Golf-context-aware A.I. coaching orchestration.
- Confidence-aware validation and plausibility guards.
- Deterministic fixture data for demo mode.

## Important implementation boundary

The numeric models in this package are deliberately **illustrative product algorithms**, not claims of scientific validation. They are designed to create a coherent golf-specific software layer around the existing pose pipeline and to provide deterministic behavior for UI/demo work.

The real native pose runtime can feed the same domain contracts through `src/integration/ExistingAppBridge.ts`.

