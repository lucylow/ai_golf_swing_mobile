import { PhaseWindow } from '../types/model';
export function phaseDurations(phases:PhaseWindow[]):Record<string,number>{
 const out:Record<string,number>={}; for(const p of phases)out[p.phase]=Math.max(0,p.endMs-p.startMs); return out;
}
export function phaseRatios(phases:PhaseWindow[]):Record<string,number>{
 const total=phases.reduce((s,p)=>s+Math.max(0,p.endMs-p.startMs),0); const out:Record<string,number>={};
 for(const p of phases)out[p.phase]=total>0?Math.max(0,p.endMs-p.startMs)/total:0; return out;
}
