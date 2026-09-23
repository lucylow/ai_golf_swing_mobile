import { describe, expect, it } from "vitest";
import { formatSessionDeleteMessage } from "../lib/session-delete";

describe("session deletion", () => {
  it("confirms a deleted session", () => {
    expect(formatSessionDeleteMessage("success")).toBe("Session deleted");
  });

  it("offers recovery guidance when deletion fails", () => {
    expect(formatSessionDeleteMessage("error")).toBe("Could not delete session. Try again.");
  });
});
