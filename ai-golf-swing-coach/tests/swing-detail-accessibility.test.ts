import { describe, expect, it } from "vitest";
import { swingDetailActionLabel } from "../lib/swing-detail-accessibility";

describe("swingDetailActionLabel", () => {
  it("names the selected club in compare and report actions", () => {
    expect(swingDetailActionLabel("compare", "7 iron")).toBe("Compare this 7 iron");
    expect(swingDetailActionLabel("save", "7 iron")).toBe("Save 7 iron report");
  });

  it("uses a safe generic label when the club is blank", () => {
    expect(swingDetailActionLabel("compare", "  ")).toBe("Compare this swing");
    expect(swingDetailActionLabel("save", "  ")).toBe("Save swing report");
  });
});
