import { describe, expect, it } from "vitest";
import { clearCapturePreference, defaultCapturePreferences, formatCapturePreference, normalizeCapturePreferences } from "../lib/capture-preferences";

const fallback = { club: "7 iron", facing: "back" as const, slowMotion: false, duration: 12 as const };

describe("capture preferences", () => {
  it("preserves supported club, facing, slow-motion, and duration values", () => { expect(normalizeCapturePreferences({ club: "Driver", facing: "front", slowMotion: true, duration: 20 }, fallback)).toEqual({ club: "Driver", facing: "front", slowMotion: true, duration: 20 }); });
  it("falls back safely for malformed or partial persisted values", () => { expect(normalizeCapturePreferences({ club: "", facing: "side", slowMotion: "yes", duration: 99 }, fallback)).toEqual(fallback); expect(normalizeCapturePreferences({ club: "Wedge", duration: 8 }, fallback)).toEqual({ ...fallback, club: "Wedge", duration: 8 }); });
  it("clears one capture preference back to the safe default", () => { const current = { ...defaultCapturePreferences, club: "Driver", slowMotion: true, duration: 20 as const }; expect(clearCapturePreference(current, "club").club).toBe("7 iron"); expect(clearCapturePreference(current, "slowMotion").slowMotion).toBe(false); expect(formatCapturePreference("duration", 20)).toBe("Length: 20s"); });
});
