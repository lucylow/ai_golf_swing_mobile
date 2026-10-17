import { FrameTruth, SwingPhase } from "../types";
export const phaseOrder:SwingPhase[]=["P1","P2","P3","P4","P5","P6","P7","P8","P9","P10"];
export const oneHot=(phase:SwingPhase)=>phaseOrder.map(x=>x===phase?1:0);
export function phaseRuns(frames:FrameTruth[]):{phase:SwingPhase,start:number,end:number}[]{const out:{phase:SwingPhase,start:number,end:number}[]=[];for(const f of frames){const last=out[out.length-1];if(!last||last.phase!==f.phase)out.push({phase:f.phase,start:f.index,end:f.index});else last.end=f.index;}return out;}
export function labelsForSequence(frames:FrameTruth[]){return frames.map(f=>({frame:f.index,timestampMs:f.timestampMs,phase:f.phase,oneHot:oneHot(f.phase),xFactorDeg:f.xFactorDeg}));}
