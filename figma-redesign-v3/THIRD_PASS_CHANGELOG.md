# Third pass changelog

This pass is specifically mock-data heavy. It adds deterministic synthetic datasets for every major redesigned surface and a dedicated visual-lab route set.

## Volume
- 100+ code-page equivalent target
- 20+ new mock-data modules
- 20+ new screens/routes
- populated list, metric, chart, compare, premium, notification, device and planning states

## Production boundary
No production service calls are introduced. The fixtures exist to make the Figma-driven screens feel complete during visual QA and development. Replace fixture imports with real repositories/hooks when connecting the live data layer.
