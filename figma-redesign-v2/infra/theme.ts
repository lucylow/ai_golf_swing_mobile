import { Platform } from "react-native";

export const V2 = {
  colors: {
    page: "#050905", bg: "#0A110A", surface: "#111A11", surface2: "#152016",
    surface3: "#1A251A", border: "#243024", borderStrong: "#2F4030", borderSoft: "#1B261B",
    lime: "#B6FF18", lime2: "#8DDB00", ink: "#071007", white: "#F5FFF4",
    text: "#E9F5E7", muted: "#96A796", dim: "#5E6C5F", danger: "#FF7066",
    amber: "#FFC34D", cyan: "#67E8F9", blue: "#79A8FF", purple: "#B79CFF",
    glass: "rgba(255,255,255,0.045)", limeGlass: "rgba(182,255,24,0.075)",
  },
  space: { 2: 2, 4: 4, 6: 6, 8: 8, 10: 10, 12: 12, 14: 14, 16: 16, 18: 18, 20: 20, 24: 24, 28: 28, 32: 32, 40: 40 },
  radius: { sm: 10, md: 14, lg: 18, xl: 24, round: 999 },
  font: Platform.select({ ios: 'System', android: 'sans-serif', default: 'sans-serif' }) || 'sans-serif',
} as const;

export type V2Tone = 'positive' | 'warning' | 'danger' | 'neutral' | 'info';
export const tone = (t: V2Tone) => ({ positive: V2.colors.lime, warning: V2.colors.amber, danger: V2.colors.danger, info: V2.colors.cyan, neutral: V2.colors.muted }[t]);
export const toneBg = (t: V2Tone) => ({ positive: 'rgba(182,255,24,0.08)', warning: 'rgba(255,195,77,0.10)', danger: 'rgba(255,112,102,0.10)', info: 'rgba(103,232,249,0.08)', neutral: V2.colors.glass }[t]);
