import { describe, expect, it } from "vitest";
import { getCameraCapability } from "../lib/camera-capability";
import { swings } from "../lib/golf-data";

describe("device and local result boundaries", () => {
  it("reports the current platform camera capability without throwing", () => {
    const capability = getCameraCapability("web");
    expect(capability).toMatchObject({ supported: false, canRecordVideo: false });
    if (!capability.supported) expect(capability.reason).toBeTruthy();
  });

  it("keeps local swing sessions serializable for persistence", () => {
    const serialized = JSON.stringify(swings);
    const restored = JSON.parse(serialized) as Array<{ id: string; club: string; score: number }>;
    expect(restored).toHaveLength(swings.length);
    expect(restored[0]).toMatchObject({ id: swings[0].id, club: swings[0].club, score: swings[0].score });
  });
});
