import { describe, expect, it } from "vitest";
import { canLaunchAnalysis, createAnalysisTask, isAnalysisCancellation } from "../lib/analysis-task";

describe("analysis task boundary", () => {
  it("resolves a completed task", async () => { await expect(createAnalysisTask(1).promise).resolves.toBeUndefined(); });
  it("rejects cancellation and identifies it safely", async () => { const task = createAnalysisTask(20); task.cancel(); await expect(task.promise).rejects.toThrow("analysis_cancelled"); try { await task.promise; } catch (error) { expect(isAnalysisCancellation(error)).toBe(true); } });
  it("surfaces a failed analysis", async () => { await expect(createAnalysisTask(1, true).promise).rejects.toThrow("analysis_failed"); });
  it("allows only one analysis for an existing capture", () => {
    expect(canLaunchAnalysis({ isAnalyzing: false, reviewUri: "native://capture" })).toBe(true);
    expect(canLaunchAnalysis({ isAnalyzing: true, reviewUri: "native://capture" })).toBe(false);
    expect(canLaunchAnalysis({ isAnalyzing: false, reviewUri: null })).toBe(false);
    expect(canLaunchAnalysis({ isAnalyzing: false, reviewUri: "" })).toBe(false);
  });
});
