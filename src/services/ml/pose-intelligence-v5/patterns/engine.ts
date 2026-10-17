import { SwingPattern } from '../types/model';
import { PatternContext } from './types';
import { detectEarlyExtension } from './earlyExtension';
import { detectSway } from './sway';
import { detectLossOfPosture } from './lossOfPosture';
import { detectTempoVariation } from './tempoVariation';
import { detectShoulderLedTransition } from './shoulderLedTransition';

export class PatternEngine {
  detect(ctx:PatternContext):SwingPattern[]{
    const candidates=[detectEarlyExtension(ctx),detectSway(ctx),detectLossOfPosture(ctx),detectTempoVariation(ctx),detectShoulderLedTransition(ctx)].filter(Boolean) as SwingPattern[];
    return candidates.sort((a,b)=>(b.score*b.confidence)-(a.score*a.confidence));
  }
}
