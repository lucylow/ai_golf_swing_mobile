export type AnalysisTaskResult = { promise: Promise<void>; cancel: () => void };
export function createAnalysisTask(durationMs = 900, shouldFail = false): AnalysisTaskResult {
  let settled = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let resolveTask: () => void = () => undefined;
  let rejectTask: (error: Error) => void = () => undefined;
  const promise = new Promise<void>((resolve, reject) => { resolveTask = resolve; rejectTask = reject; timer = setTimeout(() => { if (settled) return; settled = true; if (shouldFail) reject(new Error("analysis_failed")); else resolve(); }, durationMs); });
  return { promise, cancel: () => { if (settled) return; settled = true; if (timer) clearTimeout(timer); rejectTask(new Error("analysis_cancelled")); resolveTask = () => undefined; } };
}
export function isAnalysisCancellation(error: unknown) { return error instanceof Error && error.message === "analysis_cancelled"; }

export function canLaunchAnalysis(input: { isAnalyzing: boolean; reviewUri: string | null }): boolean {
  return !input.isAnalyzing && Boolean(input.reviewUri);
}
