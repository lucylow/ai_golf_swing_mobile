import type { SwingSession } from "@/lib/golf-data";
import type { V2Tone } from "./infra/theme";
import type { Drill, Goal, Metric, Session } from "./infra/types";

export function sessionFocus(session: SwingSession): string {
  return session.analysisStages?.find((stage) => stage.stage === "faults")?.value
    ?? session.analysisStages?.find((stage) => stage.tone === "attention")?.title
    ?? session.metrics.find((metric) => metric.tone === "warn")?.label
    ?? session.metrics[0]?.label
    ?? "Swing review";
}

function metricTone(tone: SwingSession["metrics"][number]["tone"]): V2Tone {
  if (tone === "warn") return "danger";
  if (tone === "good") return "positive";
  return "neutral";
}

function stageTone(tone: NonNullable<SwingSession["analysisStages"]>[number]["tone"]): V2Tone {
  if (tone === "attention") return "danger";
  if (tone === "good") return "positive";
  return "neutral";
}

function directionFromDelta(delta: string): "up" | "down" | "flat" {
  const trimmed = delta.trim();
  if (trimmed.startsWith("+")) return "up";
  if (trimmed.startsWith("-")) return "down";
  return "flat";
}

export function toV2Sessions(sessions: SwingSession[]): Session[] {
  return sessions.map((session) => ({
    id: session.id,
    date: session.date,
    club: session.club,
    score: session.score,
    swings: session.analysisStages?.length ?? Math.max(session.metrics.length, 1),
    focus: sessionFocus(session),
    duration: session.duration,
    quality: session.score >= 85 ? "Strong" : session.score >= 75 ? "Building" : "Focus needed",
  }));
}

export function toV2Metrics(session?: SwingSession | null): Metric[] {
  if (!session) return [];
  if (session.analysisStages?.length) {
    return session.analysisStages.map((stage, index) => ({
      id: `${session.id}-${stage.stage}-${index}`,
      label: stage.title,
      score: stage.tone === "good" ? Math.max(session.score, 85) : stage.tone === "attention" ? Math.min(session.score, 65) : session.score,
      value: stage.value ?? "Review",
      delta: stage.detail,
      direction: stage.tone === "good" ? "up" : stage.tone === "attention" ? "down" : "flat",
      tone: stageTone(stage.tone),
      note: stage.detail,
    }));
  }
  return session.metrics.map((metric, index) => ({
    id: `${session.id}-${metric.label.toLowerCase().replace(/\s+/g, "-")}-${index}`,
    label: metric.label,
    score: session.score,
    value: metric.value,
    delta: metric.delta,
    direction: directionFromDelta(metric.delta),
    tone: metricTone(metric.tone),
    note: metric.delta,
  }));
}

export function toV2Drills(drills: Array<{ id: string; title: string; description: string; time: string; steps: string[] }>, focus: string): Drill[] {
  return drills.map((drill, index) => ({
    id: drill.id,
    title: drill.title,
    focus: index === 0 ? focus : drill.title.includes("tempo") ? "Tempo" : "Movement quality",
    minutes: Number.parseInt(drill.time, 10) || 10,
    level: index === 0 ? "Recommended" : "Practice",
    cue: drill.description,
    steps: drill.steps,
    favorite: index === 0,
  }));
}

export function toV2Goal(activeGoal: { metric: string; target: number; current: number; deadline: string }): Goal {
  const ratio = activeGoal.target > 0 ? activeGoal.current / activeGoal.target : 0;
  return {
    id: "active-goal",
    title: activeGoal.metric,
    current: activeGoal.current,
    target: activeGoal.target,
    unit: activeGoal.metric.toLowerCase().includes("speed") ? "mph" : "target",
    due: activeGoal.deadline,
    color: ratio >= 1 ? "positive" : ratio >= 0.7 ? "warning" : "danger",
  };
}

export function scoreTrend(sessions: SwingSession[]): number[] {
  return sessions.slice(0, 12).reverse().map((session) => session.score);
}

export function scoreAverage(sessions: SwingSession[]): number | null {
  if (!sessions.length) return null;
  return Math.round(sessions.reduce((total, session) => total + session.score, 0) / sessions.length);
}
