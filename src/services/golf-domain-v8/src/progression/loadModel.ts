import { MasteryStateV8, ProgressionProfileV8 } from './types';
export type PracticeLoad = { minutes: number; intensity: number; cognitiveLoad: number; repetitionLoad: number; total: number };
export function stateLoad(state: MasteryStateV8): number { return Math.max(0, Math.min(1, state.fatigue * 0.6 + state.currentDifficulty * 0.3 + state.recentVariance * 0.4)); }
export function profileLoad(profile: ProgressionProfileV8): PracticeLoad { const states = Object.values(profile.skills).filter(Boolean) as MasteryStateV8[]; const avg = states.length ? states.reduce((s, x) => s + stateLoad(x), 0) / states.length : 0.3; return { minutes: Math.round(25 + 30 * (1 - avg)), intensity: Math.max(0.2, 0.9 - avg * 0.5), cognitiveLoad: avg, repetitionLoad: avg * 0.9, total: avg }; }
