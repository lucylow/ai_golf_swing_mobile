import { Platform } from "react-native";

export const FIGMA = {
  colors: {
    page: "#020705",
    background: "#0A120A",
    surface: "#111A11",
    surfaceElevated: "#152016",
    surfaceQuiet: "#0D160D",
    border: "#1A261A",
    borderStrong: "#2A3D2B",
    lime: "#AAFF00",
    limeSoft: "#88CC00",
    white: "#FFFFFF",
    text: "#F6FFF6",
    textSoft: "#A8B7A9",
    muted: "#5A6B5B",
    mutedStrong: "#4D5E4D",
    high: "#FF6666",
    medium: "#FFB800",
    low: "#4CAF50",
    black: "#060D06",
    translucentLime: "rgba(170,255,0,0.08)",
    translucentLimeBorder: "rgba(170,255,0,0.16)",
    translucentWhite: "rgba(255,255,255,0.06)",
  },
  spacing: {
    xxs: 4,
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    section: 28,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 14,
    xl: 16,
    card: 20,
    pill: 999,
    round: 999,
  },
  type: {
    kicker: 9,
    caption: 10,
    body: 12,
    bodyLarge: 14,
    title: 26,
    headline: 20,
    display: 38,
  },
  font: Platform.select({ ios: "System", android: "sans-serif", default: "sans-serif" }) || "sans-serif",
} as const;

export type FigmaTone = "good" | "high" | "medium" | "neutral";

export const toneColor = (tone: FigmaTone) => {
  switch (tone) {
    case "high": return FIGMA.colors.high;
    case "medium": return FIGMA.colors.medium;
    case "good": return FIGMA.colors.lime;
    default: return FIGMA.colors.textSoft;
  }
};

export const toneBackground = (tone: FigmaTone) => {
  switch (tone) {
    case "high": return "rgba(255,102,102,0.10)";
    case "medium": return "rgba(255,184,0,0.10)";
    case "good": return "rgba(170,255,0,0.08)";
    default: return FIGMA.colors.translucentWhite;
  }
};
