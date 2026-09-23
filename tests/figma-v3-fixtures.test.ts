import { describe, expect, it } from "vitest";

import {
  mockAchievements,
  mockClubs,
  mockCourses,
  mockDevices,
  mockDrills,
  mockGoals,
  mockGolfers,
  mockInsights,
  mockMetrics,
  mockNotifications,
  mockPhases,
  mockPractice,
  mockSessions,
  mockSwings,
} from "../figma-redesign-v3/mock";

describe("Figma V3 deterministic visual fixtures", () => {
  it("provides the advertised dense fixture inventory", () => {
    expect(mockGolfers).toHaveLength(10);
    expect(mockSessions).toHaveLength(60);
    expect(mockSwings).toHaveLength(120);
    expect(mockMetrics).toHaveLength(8);
    expect(mockPhases).toHaveLength(7);
    expect(mockClubs).toHaveLength(36);
    expect(mockDrills).toHaveLength(48);
    expect(mockGoals).toHaveLength(30);
    expect(mockInsights).toHaveLength(32);
    expect(mockNotifications).toHaveLength(36);
    expect(mockPractice).toHaveLength(42);
    expect(mockDevices).toHaveLength(18);
    expect(mockCourses).toHaveLength(24);
    expect(mockAchievements).toHaveLength(30);
  });

  it("keeps fixture relationships internally consistent", () => {
    const sessionIds = new Set(mockSessions.map((session) => session.id));
    const golferIds = new Set(mockGolfers.map((golfer) => golfer.id));
    expect(mockSessions.every((session) => golferIds.has(session.golferId))).toBe(true);
    expect(mockSwings.every((swing) => sessionIds.has(swing.sessionId))).toBe(true);
    expect(mockMetrics.every((metric) => metric.history.length === 14)).toBe(true);
  });

  it("preserves a mix of visual states for QA", () => {
    expect(mockNotifications.some((notification) => notification.unread)).toBe(true);
    expect(mockNotifications.some((notification) => !notification.unread)).toBe(true);
    expect(mockAchievements.some((achievement) => achievement.unlocked)).toBe(true);
    expect(mockAchievements.some((achievement) => !achievement.unlocked)).toBe(true);
    expect(mockDevices.some((device) => device.connected)).toBe(true);
    expect(mockDevices.some((device) => !device.connected)).toBe(true);
  });
});
