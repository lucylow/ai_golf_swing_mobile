import { describe, expect, it } from 'vitest';
import { createDemoStore } from '../src/services/demo-mode-v6/src/data/store';
import { analyze } from '../src/services/demo-mode-v6/src/engine/analysis';
import { insights, sessions, swings } from '../src/services/demo-mode-v6/src/engine/generators';
import { isoDay, range } from '../src/services/demo-mode-v6/src/seed';

describe('V6 deterministic demo data and failure handling', () => {
  it('reproduces data for the same seed and varies data for a different seed', () => {
    const first = createDemoStore(73194);
    const repeat = createDemoStore(73194);
    const changed = createDemoStore(73195);
    expect(first.users).toEqual(repeat.users);
    expect(first.sessions).toEqual(repeat.sessions);
    expect(first.users).not.toEqual(changed.users);
    expect(createDemoStore(Number.NaN).state.seed).toBe(73194);
  });

  it('retains the promised fixture dataset sizes', () => {
    const store = createDemoStore();
    expect(store.users).toHaveLength(28);
    expect(store.sessions).toHaveLength(180);
    expect(store.swings).toHaveLength(720);
    expect(store.poses).toHaveLength(260);
    expect(store.poses[0].points).toHaveLength(23);
    expect(store.metrics).toHaveLength(48);
    expect(store.insights).toHaveLength(72);
    expect(store.drills).toHaveLength(84);
    expect(store.goals).toHaveLength(48);
    expect(store.notifications).toHaveLength(120);
    expect(store.trends).toHaveLength(24);
    expect(store.scenarios).toHaveLength(64);
  });

  it('returns clear errors instead of indexing missing metrics or poses', () => {
    const store = createDemoStore();
    expect(() => analyze(store.sessions[0], store.swings[0], [], store.poses)).toThrow(/metrics/i);
    expect(() => analyze(store.sessions[0], store.swings[0], store.metrics, [])).toThrow(/pose frames/i);
    expect(() => analyze(store.sessions[0], store.swings[0], store.metrics, [null] as never)).toThrow(/malformed/i);
  });

  it('handles empty generator inputs and bounds utility work', () => {
    expect(sessions([])).toEqual([]);
    expect(swings([])).toEqual([]);
    expect(insights([])).toEqual([]);
    expect(range(Number.POSITIVE_INFINITY)).toEqual([]);
    expect(range(100_000)).toHaveLength(10_000);
    expect(isoDay(Number.MAX_VALUE)).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
