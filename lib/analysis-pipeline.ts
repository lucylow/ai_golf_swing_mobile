export const ANALYSIS_STAGES = ["capture", "pose", "metrics", "faults", "recommendations"] as const;
export type AnalysisStage = (typeof ANALYSIS_STAGES)[number];
export type AnalysisStageState = { stage: AnalysisStage; index: number; progress: number; label: string };
const LABELS: Record<AnalysisStage, string> = { capture: "Preparing your swing", pose: "Tracking body movement", metrics: "Calculating swing metrics", faults: "Checking swing patterns", recommendations: "Building your practice plan" };
export function getAnalysisStage(index: number): AnalysisStageState { const safeIndex = Math.max(0, Math.min(index, ANALYSIS_STAGES.length - 1)); const stage = ANALYSIS_STAGES[safeIndex]; return { stage, index: safeIndex, progress: (safeIndex + 1) / ANALYSIS_STAGES.length, label: LABELS[stage] }; }
export function nextAnalysisStage(current: AnalysisStage): AnalysisStageState | null { const index = ANALYSIS_STAGES.indexOf(current); return index >= ANALYSIS_STAGES.length - 1 ? null : getAnalysisStage(index + 1); }
export function isAnalysisStage(value: string): value is AnalysisStage { return (ANALYSIS_STAGES as readonly string[]).includes(value); }
