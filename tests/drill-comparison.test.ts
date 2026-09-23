import { describe, expect, it } from "vitest";

describe("drill and comparison flows", () => {
  it("selects a baseline session different from the active session", () => { const sessions = [{ id: "a" }, { id: "b" }]; const selected = sessions[0]; const baseline = sessions.find((session) => session.id !== selected.id); expect(baseline?.id).toBe("b"); });
  it("adds a drill only once to completed state", () => { const completed = ["step-through"]; const next = completed.includes("step-through") ? completed : [...completed, "step-through"]; expect(next).toEqual(["step-through"]); });
});
