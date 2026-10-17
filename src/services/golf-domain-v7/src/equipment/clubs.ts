import { ClubProfile } from '../types';

export const DEFAULT_CLUBS: ClubProfile[] = [
  { id: 'driver', name: 'Driver', category: 'driver', loftDeg: 10.5, lieDeg: 59, nominalLengthIn: 45.5, carryMeanYards: 245, carryStdYards: 13, speedWindowMph: [80, 125] },
  { id: '3-wood', name: '3 Wood', category: 'wood', loftDeg: 15, lieDeg: 57, nominalLengthIn: 43, carryMeanYards: 225, carryStdYards: 11, speedWindowMph: [75, 110] },
  { id: '5-wood', name: '5 Wood', category: 'wood', loftDeg: 19, lieDeg: 57.5, nominalLengthIn: 42.25, carryMeanYards: 210, carryStdYards: 10, speedWindowMph: [72, 105] },
  { id: '4-hybrid', name: '4 Hybrid', category: 'hybrid', loftDeg: 22, lieDeg: 58.5, nominalLengthIn: 40, carryMeanYards: 195, carryStdYards: 9, speedWindowMph: [70, 100] },
  { id: '5-iron', name: '5 Iron', category: 'iron', loftDeg: 25, lieDeg: 61, nominalLengthIn: 38, carryMeanYards: 180, carryStdYards: 9, speedWindowMph: [68, 96] },
  { id: '6-iron', name: '6 Iron', category: 'iron', loftDeg: 28, lieDeg: 62, nominalLengthIn: 37.5, carryMeanYards: 168, carryStdYards: 8, speedWindowMph: [66, 94] },
  { id: '7-iron', name: '7 Iron', category: 'iron', loftDeg: 32, lieDeg: 62.5, nominalLengthIn: 37, carryMeanYards: 156, carryStdYards: 8, speedWindowMph: [64, 92] },
  { id: '8-iron', name: '8 Iron', category: 'iron', loftDeg: 36, lieDeg: 63, nominalLengthIn: 36.5, carryMeanYards: 145, carryStdYards: 7, speedWindowMph: [62, 90] },
  { id: '9-iron', name: '9 Iron', category: 'iron', loftDeg: 40, lieDeg: 63.5, nominalLengthIn: 36, carryMeanYards: 132, carryStdYards: 7, speedWindowMph: [60, 88] },
  { id: 'pitching-wedge', name: 'Pitching Wedge', category: 'wedge', loftDeg: 45, lieDeg: 64, nominalLengthIn: 35.75, carryMeanYards: 120, carryStdYards: 7, speedWindowMph: [58, 86] },
  { id: 'gap-wedge', name: 'Gap Wedge', category: 'wedge', loftDeg: 50, lieDeg: 64, nominalLengthIn: 35.5, carryMeanYards: 107, carryStdYards: 6, speedWindowMph: [56, 84] },
  { id: 'sand-wedge', name: 'Sand Wedge', category: 'wedge', loftDeg: 56, lieDeg: 64, nominalLengthIn: 35.25, carryMeanYards: 92, carryStdYards: 6, speedWindowMph: [54, 80] },
  { id: 'lob-wedge', name: 'Lob Wedge', category: 'wedge', loftDeg: 60, lieDeg: 64, nominalLengthIn: 35, carryMeanYards: 78, carryStdYards: 6, speedWindowMph: [52, 78] },
];

export function findClub(clubId: string): ClubProfile {
  return DEFAULT_CLUBS.find((club) => club.id === clubId) ?? DEFAULT_CLUBS[6];
}

