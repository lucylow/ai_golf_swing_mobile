import { describe, expect, it } from "vitest";
import { deriveProgressMetric, nextProgressMetric, progressMetricLabel } from "../lib/progress-metrics";
import type { SwingSession } from "../lib/golf-data";

const sessions = [
  { metrics: [{ label: "Club speed", value: "80 mph", delta: "", tone: "neutral" as const }, { label: "Tempo", value: "2.8:1", delta: "", tone: "neutral" as const }, { label: "Hip turn", value: "36°", delta: "", tone: "neutral" as const }] },
  { metrics: [{ label: "Club speed", value: "90 mph", delta: "", tone: "neutral" as const }, { label: "Tempo", value: "3.2:1", delta: "", tone: "neutral" as const }, { label: "Hip turn", value: "42°", delta: "", tone: "neutral" as const }] },
] as SwingSession[];

describe("progress metrics", () => {
  it("cycles through the available metric views", () => { expect(nextProgressMetric("speed")).toBe("tempo"); expect(nextProgressMetric("tempo")).toBe("hipTurn"); expect(progressMetricLabel("hipTurn")).toBe("Hip rotation"); });
  it("derives averages and change from persisted sessions", () => { const result = deriveProgressMetric(sessions, "speed"); expect(result.average).toBe(85); expect(result.changePercent).toBe(12.5); });
});
