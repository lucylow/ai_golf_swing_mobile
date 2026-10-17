import { EvidenceKind, SkillEvidence } from './types';
export const EVIDENCE_WEIGHTS: Record<EvidenceKind, number> = {
  'successful-rep': 1, 'failed-rep': -1, 'clean-swing': 1.1, 'target-hit': 1.2, 'miss-left': -0.7, 'miss-right': -0.7,
  'pressure-success': 1.35, fat: -0.9, thin: -0.9, toe: -0.6, heel: -0.6, 'three-putt': -0.8, penalty: -1.1, 'coach-confirmed': 1.25,
};
export function evidenceSignal(e: SkillEvidence): number { return EVIDENCE_WEIGHTS[e.kind] * Math.max(0, Math.min(1, e.quality)) * (0.75 + 0.25 * Math.max(0, Math.min(1, e.difficulty)));
}
export function evidenceRecencyWeight(timestampMs: number, nowMs: number): number { const ageDays = Math.max(0, (nowMs - timestampMs) / 86_400_000); return Math.exp(-ageDays / 21); }
