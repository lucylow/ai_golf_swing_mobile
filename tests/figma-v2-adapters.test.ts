import { describe, expect, it } from "vitest";

import { drills, swings } from "../lib/golf-data";
import { scoreAverage, scoreTrend, toV2Drills, toV2Goal, toV2Metrics, toV2Sessions } from "../figma-redesign-v2/adapters";

describe("Figma v2 adapters", () => {
  it("maps persisted sessions into the visual layer without changing source data", () => {
    const mapped = toV2Sessions(swings);
    expect(mapped).toHaveLength(swings.length);
    expect(mapped[0]).toMatchObject({ id: swings[0].id, club: swings[0].club, score: swings[0].score });
    expect(mapped[0].focus).toBeTruthy();
  });

  it("maps actual stage output or session metrics into signal cards", () => {
    const metrics = toV2Metrics(swings[0]);
    expect(metrics.length).toBeGreaterThan(0);
    expect(metrics[0]).toMatchObject({ score: swings[0].score });
    expect(toV2Metrics(null)).toEqual([]);
  });

  it("derives real score statistics in chronological chart order", () => {
    expect(scoreAverage(swings)).toBe(Math.round(swings.reduce((total, session) => total + session.score, 0) / swings.length));
    expect(scoreTrend(swings)).toEqual(swings.slice(0, 12).reverse().map((session) => session.score));
    expect(scoreAverage([])).toBeNull();
  });

  it("adapts the existing drill and goal contracts for second-pass cards", () => {
    const mappedDrills = toV2Drills(drills, "Tempo");
    expect(mappedDrills[0]).toMatchObject({ id: drills[0].id, title: drills[0].title, focus: "Tempo" });
    expect(toV2Goal({ metric: "Club speed", current: 92, target: 100, deadline: "Oct 15" })).toMatchObject({ title: "Club speed", unit: "mph", color: "warning" });
  });
});
