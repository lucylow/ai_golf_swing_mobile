import { ShotShape } from '../types';
export type MissMap = { shape: ShotShape; frequency: number; expectedStart: 'left' | 'center' | 'right'; coachingCue: string };
export function buildMissMap(shapes: ShotShape[]): MissMap[] {
  const counts = new Map<ShotShape, number>();
  for (const shape of shapes) counts.set(shape, (counts.get(shape) ?? 0) + 1);
  return [...counts.entries()].map(([shape, frequency]) => {
    const expectedStart: 'left' | 'right' | 'center' = ['pull','hook','pull-draw'].includes(shape) ? 'left' : ['push','slice','push-fade','block'].includes(shape) ? 'right' : 'center';
    const coachingCue = expectedStart === 'center' ? 'Keep the current start line while improving strike.' : `Protect the ${expectedStart} edge and rehearse the opposite miss.`;
    return { shape, frequency, expectedStart, coachingCue };
  }).sort((a,b)=>b.frequency-a.frequency);
}

