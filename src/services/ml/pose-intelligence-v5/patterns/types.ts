import { PoseFrame } from '../types/landmarks';
import { PhaseWindow, SwingPattern } from '../types/model';

export type PatternContext = { frames:PoseFrame[]; phases:PhaseWindow[]; values:Record<string,number>; confidence:number };
export type PatternDetector = (ctx:PatternContext)=>SwingPattern|null;
