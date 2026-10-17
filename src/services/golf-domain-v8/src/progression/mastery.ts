import { MasteryStateV8, SkillEvidence } from './types';
import { evidenceRecencyWeight, evidenceSignal } from './evidence';
export function updateMasteryV8(state: MasteryStateV8, evidence: readonly SkillEvidence[], nowMs: number): MasteryStateV8 {
  const relevant = evidence.filter((e) => e.skill === state.skill);
  if (!relevant.length) return state;
  let mastery = state.mastery;
  let confidence = state.confidence;
  let successes = state.successes;
  let attempts = state.attempts;
  for (const e of relevant) {
    const recency = evidenceRecencyWeight(e.timestampMs, nowMs);
    const signal = evidenceSignal(e) * recency;
    const step = Math.tanh(signal * 0.11);
    mastery += step * (1 - mastery);
    if (signal < 0) mastery += step * 0.45;
    confidence = Math.max(0, Math.min(1, confidence * 0.94 + (signal > 0 ? 0.06 : 0.02)));
    attempts += 1;
    if (signal > 0) successes += 1;
  }
  const recent = relevant.slice(-10);
  const scores = recent.map((e) => Math.max(0, Math.min(1, e.quality)) * (e.kind.includes('success') || e.kind.includes('hit') || e.kind.includes('clean') ? 1 : 0.35));
  const recentScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : state.recentScore;
  const variance = scores.length > 1 ? scores.reduce((s, x) => s + (x - recentScore) ** 2, 0) / (scores.length - 1) : state.recentVariance;
  const readyForNextLevel = mastery >= 0.78 && confidence >= 0.7 && recentScore >= 0.72 && variance < 0.06;
  const needsRegression = mastery < 0.42 || (recentScore < 0.4 && relevant.length >= 3);
  const streak = relevant.reduce((streak, e) => evidenceSignal(e) > 0 ? streak + 1 : 0, 0);
  return { ...state, mastery: Math.max(0, Math.min(0.99, mastery)), confidence, attempts, successes, recentScore, recentVariance: variance, readyForNextLevel, needsRegression, streak };
}
