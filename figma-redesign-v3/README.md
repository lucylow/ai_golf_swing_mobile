# Figma React Native Redesign — Third Pass / Mock Data Pack

This pass adds a deterministic mock-data layer designed to fill the redesign with realistic content without coupling the UI to the production ML/Firebase services.

- 100+ code-page equivalent implementation volume
- 10k+ additional TypeScript/TSX lines
- Typed mock golfers, sessions, swings, metrics, phases, clubs, drills, practice plans, goals, notifications, subscriptions, devices, range settings, insights, and exports
- Data generators are deterministic and safe to snapshot in visual QA
- Dedicated mock-data lab screens expose fixture density and component states
- `apply-figma-redesign-v3.sh` adds the third-pass layer without replacing production service code

The fixture layer intentionally uses fictional names and synthetic measurements.
