import type { StageOutput } from "@/lib/analysis-output";
import type { SwingSession } from "@/lib/golf-data";

import type { FigmaTone } from "./theme";

export type CoachingPriority = {
  title: string;
  score: number;
  tone: FigmaTone;
  observation: string;
  action: string;
  drillId: string;
};

export type SessionSignal = {
  id: string;
  label: string;
  value: string;
  detail: string;
  score: number;
  tone: FigmaTone;
};

export function stageToneToFigma(tone: StageOutput["tone"]): FigmaTone {
  if (tone === "attention") return "high";
  if (tone === "good") return "good";
  return "neutral";
}

export function stageSignalScore(tone: StageOutput["tone"], score: number): number {
  if (tone === "attention") return Math.max(20, 100 - score);
  if (tone === "good") return Math.max(70, score);
  return Math.max(55, Math.min(85, score));
}

export function getSessionSignals(session?: SwingSession): SessionSignal[] {
  if (!session) return [];

  const stages = session.analysisStages?.length
    ? session.analysisStages
    : session.metrics.map((metric, index) => ({
        stage: `metric-${index}` as StageOutput["stage"],
        title: metric.label,
        detail: metric.delta,
        value: metric.value,
        tone: metric.tone === "warn" ? "attention" as const : metric.tone === "good" ? "good" as const : "neutral" as const,
      }));

  return stages.map((stage, index) => ({
    id: `${stage.stage}-${index}`,
    label: stage.title,
    value: stage.value ?? "Review",
    detail: stage.detail,
    score: stageSignalScore(stage.tone, session.score),
    tone: stageToneToFigma(stage.tone),
  }));
}

export function getCoachingPriority(session?: SwingSession): CoachingPriority {
  const fault = session?.analysisStages?.find((stage) => stage.stage === "faults")
    ?? session?.analysisStages?.find((stage) => stage.tone === "attention");
  const firstMetric = session?.metrics.find((metric) => metric.tone === "warn") ?? session?.metrics[0];

  if (fault) {
    return {
      title: fault.value ?? fault.title,
      score: stageSignalScore(fault.tone, session?.score ?? 0),
      tone: stageToneToFigma(fault.tone),
      observation: fault.detail,
      action: "Open the recommended drill and keep the next practice session focused on one cue.",
      drillId: "step-through",
    };
  }

  if (firstMetric) {
    return {
      title: firstMetric.label,
      score: session?.score ?? 0,
      tone: firstMetric.tone === "warn" ? "high" : firstMetric.tone === "good" ? "good" : "neutral",
      observation: `${firstMetric.label}: ${firstMetric.value}. ${firstMetric.delta}`,
      action: "Open the recommended drill and repeat the movement slowly before adding speed.",
      drillId: "step-through",
    };
  }

  return {
    title: "Record a baseline swing",
    score: 0,
    tone: "neutral",
    observation: "Your first captured swing will unlock a focused coaching priority.",
    action: "Record a swing to start a personalized practice plan.",
    drillId: "step-through",
  };
}

export function formatSessionMeta(session?: SwingSession): string {
  if (!session) return "No saved session yet";
  return `${session.club} · ${session.date} · ${session.duration}`;
}
