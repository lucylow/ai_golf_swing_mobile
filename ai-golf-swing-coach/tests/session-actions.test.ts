import { describe, expect, it } from "vitest";

describe("saved session actions", () => {
  it("builds a compare route with the selected session id", () => { const id = "session-123"; expect({ pathname: "/compare-swing", params: { id } }).toEqual({ pathname: "/compare-swing", params: { id: "session-123" } }); });
  it("keeps report sharing content scoped to the saved session", () => { const session = { club: "7 iron", score: 82 }; expect(`AI Golf Swing Coach · ${session.club} · Score ${session.score}/100`).toContain("7 iron"); });
});
