import { PhaseWindow } from '../types/model';
export function phaseConfidenceScore(phases:PhaseWindow[]):number{
 if(!phases.length)return 0; return phases.reduce((s,p)=>s+p.confidence,0)/phases.length;
}
