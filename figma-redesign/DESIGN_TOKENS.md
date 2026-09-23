# Figma Make → React Native design tokens

This layer converts the Figma Make green/lime visual system into React Native constants. It intentionally uses system fonts rather than web-only CSS imports.

## Color map

- App background: `#0A120A`
- Page black: `#020705`
- Primary card: `#111A11`
- Elevated card: `#152016`
- Quiet surface: `#0D160D`
- Border: `#1A261A`
- Strong border: `#2A3D2B`
- Lime: `#AAFF00`
- Lime dim: `#88CC00`
- High attention: `#FF6666`
- Medium attention: `#FFB800`
- Stable: `#4CAF50`

## Component rules

1. Keep top-level page padding between 13–20dp so the cards breathe without wasting the portrait viewport.
2. Use 8–20dp radii for cards and 999 radius for action pills.
3. Use uppercase 7–9px kicker text with letter spacing for the data-dashboard feel.
4. Reserve lime for actions, positive trend deltas, active states, and the main score emphasis.
5. Avoid flooding a screen with neon. The point of the palette is contrast, not decoration.
6. Use one primary action per viewport. Secondary actions use bordered dark surfaces.
7. Every analysis metric should follow the same information hierarchy: observation → explanation → practice action.
