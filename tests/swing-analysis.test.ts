import { describe, expect, it } from "vitest";
import { analyzeSwing, calculateGolfMetrics, detectSwingPhases, detectGolfFaults, recommendGolfDrills } from "../lib/swing-analysis";
import type { PoseLandmark } from "../lib/golf-domain";

function frame(offset: number): PoseLandmark[] {
  return Array.from({ length: 33 }, (_, index) => ({ x: index / 40 + offset, y: index / 50, z: 0, visibility: 1 }));
}

describe("golf swing analysis", () => {
  it("returns safe fallback phases for short input", () => {
    const phases = detectSwingPhases([frame(0), frame(0.01)]);
    expect(phases.start).toBe(0);
    expect(phases.end).toBe(1);
  });

  it("returns all eight metrics with confidence and status", () => {
    const metrics = calculateGolfMetrics(Array.from({ length: 12 }, (_, index) => frame(index * 0.01)));
    expect(Object.keys(metrics)).toHaveLength(8);
    expect(metrics.clubHeadSpeed.confidence).toBeGreaterThan(0);
    expect(["good", "moderate", "needs-improvement"]).toContain(metrics.tempo.status);
  });

  it("maps detected faults to unique drills", () => {
    const metrics = calculateGolfMetrics(Array.from({ length: 12 }, (_, index) => frame(index * 0.01)));
    const faults = detectGolfFaults(metrics);
    const drills = recommendGolfDrills(faults);
    expect(new Set(drills.map((drill) => drill.id)).size).toBe(drills.length);
  });

  it("composes the full analysis result and pro comparison", async () => {
    const result = await analyzeSwing(Array.from({ length: 12 }, (_, index) => frame(index * 0.01)), "tiger_woods");
    expect(result.phases.impact).toBeGreaterThanOrEqual(0);
    expect(result.comparison?.proName).toBe("Tiger Woods");
    expect(result.comparison?.overall).toBeGreaterThanOrEqual(0);
  });
});
