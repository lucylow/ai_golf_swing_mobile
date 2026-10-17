import { DemoStore, DemoUser } from '../types';
import { createData } from '../engine/generators';

const DEFAULT_SEED = 73194;
const FALLBACK_USER: DemoUser = {
  id: 'demo-fallback-user',
  name: 'Demo Golfer',
  handicap: 18,
  goal: 'Practice consistently',
  plan: 'free',
  streak: 0,
  weeklyMinutes: 0,
  typicalMiss: 'Unknown',
  preferredClub: '7 Iron',
  skill: 'developing',
};

export function createDemoStore(seed = DEFAULT_SEED): DemoStore {
  const safeSeed = Number.isFinite(seed) ? Math.trunc(seed) : DEFAULT_SEED;
  const data = createData(safeSeed);
  if (!data.users.length || !data.scenarios.length) {
    throw new Error('Demo dataset initialization failed: users and scenarios are required');
  }
  return {
    ...data,
    state: {
      enabled: true,
      seed: safeSeed,
      activeUserId: data.users[0].id,
      network: 'online',
      analysis: 'idle',
      scenarioId: data.scenarios[0].id,
      latencyMs: 650,
      sessionCounter: 0,
      lastError: null,
    },
  };
}

export function activeUser(store: DemoStore): DemoUser {
  return store.users.find((user) => user.id === store.state.activeUserId) ?? store.users[0] ?? FALLBACK_USER;
}

export function userSessions(store: DemoStore) {
  return store.sessions
    .filter((session) => session.userId === store.state.activeUserId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function userSwings(store: DemoStore) {
  const sessionIds = new Set(userSessions(store).slice(0, 12).map((session) => session.id));
  return store.swings.filter((swing) => sessionIds.has(swing.sessionId)).slice(0, 30);
}
