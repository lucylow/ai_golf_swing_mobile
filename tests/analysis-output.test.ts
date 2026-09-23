import { describe, expect, it } from "vitest";
import { defaultStageOutputs, parseStageOutputs, serializeStageOutputs, stageOutputsToMetrics } from "../lib/analysis-output";

describe("analysis outputs", () => {
  it("round-trips stage outputs through route-safe serialization", () => { expect(parseStageOutputs(serializeStageOutputs(defaultStageOutputs))).toEqual(defaultStageOutputs); });
  it("falls back safely for malformed route data", () => { expect(parseStageOutputs("not-json")).toEqual(defaultStageOutputs); });
  it("reports malformed route data through the optional callback", () => { let received: unknown; expect(parseStageOutputs("not-json", (error) => { received = error; })).toEqual(defaultStageOutputs); expect(received).toBeInstanceOf(SyntaxError); });
  it("rejects malformed stage-output entries after JSON parsing", () => { let received: unknown; expect(parseStageOutputs(JSON.stringify([{ stage: "unknown", title: "", detail: "", tone: "good" }]), (error) => { received = error; })).toEqual(defaultStageOutputs); expect(received).toBeInstanceOf(Error); });
  it("maps persisted stage outputs into display-safe metrics", () => { expect(stageOutputsToMetrics([{ stage: "faults", title: "Primary focus", detail: "Create space", value: "Early extension", tone: "attention" }])).toEqual([{ label: "Primary focus", value: "Early extension", delta: "Create space", tone: "warn" }]); });
  it("uses a safe display value when a persisted stage has no value", () => { expect(stageOutputsToMetrics([{ stage: "pose", title: "Body tracking", detail: "Not enough frames", tone: "neutral" }])[0].value).toBe("Not available"); });
});
