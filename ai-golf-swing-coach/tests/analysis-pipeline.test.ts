import { describe, expect, it } from "vitest";
import { getAnalysisStage, nextAnalysisStage, isAnalysisStage } from "../lib/analysis-pipeline";

describe("analysis pipeline", () => {
  it("progresses through typed stages", () => { expect(getAnalysisStage(0).label).toBe("Preparing your swing"); expect(nextAnalysisStage("capture")?.stage).toBe("pose"); expect(nextAnalysisStage("recommendations")).toBeNull(); });
  it("clamps invalid progress indices", () => { expect(getAnalysisStage(-4).index).toBe(0); expect(getAnalysisStage(99).index).toBe(4); });
  it("validates stage values", () => { expect(isAnalysisStage("metrics")).toBe(true); expect(isAnalysisStage("unknown")).toBe(false); });
});
