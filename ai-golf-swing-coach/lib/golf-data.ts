export type SwingSession = {
  id: string;
  label: string;
  club: string;
  date: string;
  score: number;
  duration: string;
  accent: string;
  videoUri?: string;
  captureMode?: "native" | "simulated";
  mediaSource?: "native-video" | "uploaded-preview" | "captured-preview" | "unresolved-video" | "unknown";
  slowMotion?: boolean;
  analysisStages?: { stage: string; title: string; detail: string; value?: string; tone: "good" | "neutral" | "attention" }[];
  metrics: { label: string; value: string; delta: string; tone: "good" | "warn" | "neutral" }[];
};

export const swings: SwingSession[] = [
  {
    id: "session-1",
    label: "Range session",
    club: "7 iron",
    date: "Today, 9:42 AM",
    score: 82,
    duration: "00:04",
    accent: "#1F6B4F",
    metrics: [
      { label: "Tempo", value: "3.1:1", delta: "+0.2", tone: "good" },
      { label: "Hip turn", value: "42°", delta: "+5°", tone: "good" },
      { label: "Club speed", value: "86 mph", delta: "On target", tone: "neutral" },
    ],
  },
  {
    id: "session-2",
    label: "Evening practice",
    club: "Driver",
    date: "Yesterday, 6:18 PM",
    score: 76,
    duration: "00:05",
    accent: "#D96852",
    metrics: [
      { label: "Tempo", value: "2.6:1", delta: "-0.3", tone: "warn" },
      { label: "Hip turn", value: "36°", delta: "+2°", tone: "good" },
      { label: "Club speed", value: "98 mph", delta: "+3 mph", tone: "good" },
    ],
  },
  {
    id: "session-3",
    label: "Warm-up",
    club: "9 iron",
    date: "Mon, 7:05 AM",
    score: 79,
    duration: "00:03",
    accent: "#C08A3E",
    metrics: [
      { label: "Tempo", value: "2.9:1", delta: "Stable", tone: "neutral" },
      { label: "Hip turn", value: "39°", delta: "+1°", tone: "good" },
      { label: "Club speed", value: "72 mph", delta: "On target", tone: "neutral" },
    ],
  },
];

export const drills = [
  { id: "step-through", title: "Step-through drill", description: "Sequence your hips before the hands release.", time: "6 min", equipment: "No equipment", heroColor: "#1F6B4F", accentColor: "#F6C453", tone: "#E6F1EC", steps: ["Set your feet just wider than shoulder width.", "Make a slow turn while keeping your chest over the ball.", "Step toward the target as the hands release."] },
  { id: "wall-to-wall-tempo", title: "Wall-to-wall tempo", description: "Build a repeatable 3:1 rhythm without a ball.", time: "4 min", equipment: "Wall space", heroColor: "#315D52", accentColor: "#F3C65B", tone: "#F8F0DF", steps: ["Set a steady address position without a ball.", "Turn back smoothly while keeping your head centered.", "Repeat the motion with a consistent three-to-one rhythm."] },
];

export const colors = {
  ink: "#102A24",
  fairway: "#1F6B4F",
  deep: "#124438",
  mist: "#F5F7F2",
  surface: "#FFFFFF",
  sand: "#E9D8B4",
  sun: "#F4B942",
  coral: "#D96852",
  muted: "#70817A",
  border: "#DDE7E0",
};
