import { describe, expect, it } from "vitest";
import { drillCompletionCelebration, drillEquipmentAccessibilityLabel, drillEquipmentIcon, drillProgressSummary, drillResetConfirmation, drillStepAccessibilityLabel } from "../lib/drill-detail-accessibility";

describe("drill detail equipment accessibility", () => {
  it("announces the normalized equipment requirement", () => {
    expect(drillEquipmentAccessibilityLabel("  Wall space ")).toBe("Equipment: Wall space");
  });

  it("uses a safe label when equipment metadata is blank", () => {
    expect(drillEquipmentAccessibilityLabel("   ")).toBe("Equipment: No equipment listed");
  });

  it("names each practice step within the full sequence", () => {
    expect(drillStepAccessibilityLabel("Turn slowly", 1, 3)).toBe("Step 2 of 3: Turn slowly");
  });

  it("uses safe labels for blank steps and out-of-range positions", () => {
    expect(drillStepAccessibilityLabel("  ", -1, 0)).toBe("Step 1 of 1: Practice step");
    expect(drillStepAccessibilityLabel("Finish", 8, 3)).toBe("Step 3 of 3: Finish");
  });

  it("formats practice progress with bounded counts and percentages", () => {
    expect(drillProgressSummary(2, 3)).toEqual({ completed: 2, total: 3, percent: 67, label: "2 of 3 steps complete" });
    expect(drillProgressSummary(9, 3).percent).toBe(100);
    expect(drillProgressSummary(-1, 3).label).toBe("0 of 3 steps complete");
    expect(drillProgressSummary(0, 0).label).toBe("No practice steps");
  });

  it("celebrates only when a non-empty drill is fully complete", () => {
    expect(drillCompletionCelebration(3, 3).isComplete).toBe(true);
    expect(drillCompletionCelebration(2, 3).isComplete).toBe(false);
    expect(drillCompletionCelebration(0, 0).isComplete).toBe(false);
    expect(drillCompletionCelebration(3, 3).message).toContain("finished every step");
  });

  it("keeps reset confirmation copy explicit and non-destructive", () => {
    expect(drillResetConfirmation.title).toBe("Reset practice steps?");
    expect(drillResetConfirmation.message).toContain("drill completion record will stay unchanged");
    expect(drillResetConfirmation.cancelLabel).toBe("Cancel");
    expect(drillResetConfirmation.confirmLabel).toBe("Reset steps");
  });

  it("keeps icon semantics aligned with equipment labels", () => {
    expect(drillEquipmentIcon("No equipment")).toBe("target");
    expect(drillEquipmentIcon("Wall space")).toBe("gearshape.fill");
  });
});
