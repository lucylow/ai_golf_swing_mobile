import { DemoAnalysisResult, DemoEvent, DemoScenario, DemoStore } from '../types';
import { createDemoStore } from '../data/store';
import { analyze } from './analysis';

type Listener = (event: DemoEvent, store: DemoStore) => void;
type SimulationMode = 'success' | 'low-confidence' | 'failure';

function messageOf(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === 'string' && error.length) return error;
  return 'Unexpected demo analysis error.';
}

export class DemoController {
  private store: DemoStore;
  private listeners = new Set<Listener>();
  private listenerErrorCount = 0;

  constructor(seed = 73194) {
    this.store = createDemoStore(seed);
  }

  get snapshot(): DemoStore {
    return this.store;
  }

  get subscriberErrorCount(): number {
    return this.listenerErrorCount;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit(type: DemoEvent['type'], payload: DemoEvent['payload'] = {}): void {
    const event: DemoEvent = { type, at: Date.now(), payload };
    for (const listener of this.listeners) {
      try {
        listener(event, this.store);
      } catch {
        // One faulty screen subscriber must not block other subscribers or state updates.
        this.listenerErrorCount += 1;
      }
    }
  }

  setScenario(scenario: DemoScenario): boolean {
    if (!scenario || typeof scenario.id !== 'string') return false;
    const canonicalScenario = this.store.scenarios.find((item) => item.id === scenario.id);
    if (!canonicalScenario) return false;
    this.store = {
      ...this.store,
      state: {
        ...this.store.state,
        scenarioId: canonicalScenario.id,
        network: canonicalScenario.network,
        analysis: canonicalScenario.analysis,
        lastError: null,
        latencyMs: Number.isFinite(canonicalScenario.durationMs)
          ? Math.max(0, canonicalScenario.durationMs)
          : 650,
      },
    };
    this.emit('scenario:change', { scenarioId: canonicalScenario.id });
    return true;
  }

  cycleScenario(): boolean {
    if (!this.store.scenarios.length) return false;
    const index = this.store.scenarios.findIndex((scenario) => scenario.id === this.store.state.scenarioId);
    const next = this.store.scenarios[(index + 1) % this.store.scenarios.length];
    return this.setScenario(next);
  }

  setNetwork(network: DemoStore['state']['network']): boolean {
    if (!['online', 'offline', 'degraded'].includes(network)) return false;
    this.store = { ...this.store, state: { ...this.store.state, network } };
    this.emit('network:change', { network });
    return true;
  }

  setActiveUser(id: string): boolean {
    if (!this.store.users.some((user) => user.id === id)) return false;
    this.store = { ...this.store, state: { ...this.store.state, activeUserId: id } };
    return true;
  }

  private failAnalysis(message: string): null {
    this.store = {
      ...this.store,
      state: { ...this.store.state, analysis: 'failed', lastError: message },
    };
    this.emit('analysis:error', { message });
    return null;
  }

  simulate(mode: SimulationMode = 'success'): DemoAnalysisResult | null {
    if (!['success', 'low-confidence', 'failure'].includes(mode)) {
      return this.failAnalysis('Unsupported demo analysis mode.');
    }
    this.store = {
      ...this.store,
      state: { ...this.store.state, analysis: 'processing', lastError: null },
    };
    this.emit('analysis:start', { mode });

    if (mode === 'failure') {
      return this.failAnalysis('Demo service timeout. No live request was made.');
    }

    try {
      const user = this.store.users.find((item) => item.id === this.store.state.activeUserId);
      if (!user) return this.failAnalysis('No active demo golfer is available.');
      const session = this.store.sessions.find((item) => item.userId === user.id);
      if (!session) return this.failAnalysis('No demo session is available for this golfer.');
      const swing = this.store.swings.find((item) => item.sessionId === session.id);
      if (!swing) return this.failAnalysis('No demo swing is available for this session.');
      if (!this.store.metrics.length) return this.failAnalysis('No demo metrics are available.');
      if (!this.store.poses.length) return this.failAnalysis('No demo pose frames are available.');

      const poses = mode === 'low-confidence'
        ? this.store.poses.map((frame) => ({ ...frame, quality: frame.quality * 0.7 }))
        : this.store.poses;
      const result = analyze(session, swing, this.store.metrics, poses, this.store.state.latencyMs);
      this.store = {
        ...this.store,
        state: {
          ...this.store.state,
          analysis: 'complete',
          lastError: null,
          sessionCounter: this.store.state.sessionCounter + 1,
        },
      };
      this.emit('analysis:complete', { processingMs: result.processingMs, quality: result.quality });
      return result;
    } catch (error) {
      return this.failAnalysis(messageOf(error));
    }
  }

  reset(): void {
    const seed = Number.isFinite(this.store.state.seed) ? this.store.state.seed : 73194;
    this.store = createDemoStore(seed);
    this.emit('demo:start', { reset: true });
  }
}
