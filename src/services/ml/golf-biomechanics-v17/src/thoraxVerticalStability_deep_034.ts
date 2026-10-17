import { PoseFrame, Handedness, BioMetric } from './types';
import { dist } from './vector3';
import { mean, std, clamp } from './math';
import { velocity, acceleration } from './temporal';
import { orientationSeries } from './sequence';

function pointVelocity(frames: PoseFrame[], h: Handedness, a: number, b: number): number {
  if (frames.length < 2) return 0;
  const times = frames.map(frame => frame.timestampMs);
  const series = frames.map(frame => { const p = frame.landmarks[a]; const q = frame.landmarks[b]; return Math.hypot(p.x-q.x,p.y-q.y,p.z-q.z); });
  const v = velocity(series,times);
  return v[Math.floor(v.length*.65)] ?? 0;
}
function pointSpeed(frames: PoseFrame[], h: Handedness, index: number): number {
  if (frames.length < 2) return 0;
  const times = frames.map(frame => frame.timestampMs);
  const x = frames.map(frame => frame.landmarks[index].x);
  const y = frames.map(frame => frame.landmarks[index].y);
  const z = frames.map(frame => frame.landmarks[index].z);
  const vx = velocity(x,times), vy = velocity(y,times), vz = velocity(z,times);
  const i = Math.floor(frames.length*.65);
  return Math.hypot(vx[i]??0,vy[i]??0,vz[i]??0);
}

export interface ThoraxVerticalStabilityDeep034Report {
  value: number;
  variability: number;
  confidence: number;
  phase: string;
  interpretation: 'stable' | 'variable' | 'elevated' | 'reduced';
}

export function analyzeThoraxVerticalStabilityDeep034(frames: PoseFrame[], h: Handedness): ThoraxVerticalStabilityDeep034Report {
  const times = frames.map(frame => frame.timestampMs);
  const baseValue = frames.length ? (1/(1+std(frames.map(f=>(f.landmarks[11].y+f.landmarks[12].y)/2)))) : 0;
  const window = frames.slice(Math.floor(frames.length*.35), Math.max(Math.floor(frames.length*.65),Math.floor(frames.length*.36)));
  const values = window.length ? window.map(frame => {
    const p = frame.landmarks[23];
    const q = frame.landmarks[24];
    return Math.hypot(p.x-q.x,p.z-q.z);
  }) : [baseValue];
  const variability = std(values);
  const confidence = clamp(0.92 - variability*0.4);
  const interpretation = variability < 0.03 ? 'stable' : variability < 0.08 ? 'variable' : baseValue > mean(values) ? 'elevated' : 'reduced';
  return {value:baseValue,variability,confidence,phase:'P7',interpretation};
}

export function metricThoraxVerticalStabilityDeep034(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r=analyzeThoraxVerticalStabilityDeep034(frames,h);
  const confidence=clamp(reliability*r.confidence);
  return {name:'thorax_vertical_stability_deep_034',value:r.value,unit:'normalized',evidence:{confidence,quality:confidence>.85?'excellent':confidence>.7?'good':confidence>.45?'degraded':'insufficient',sources:['pose','golf biomechanics'],reasons:[`phase=${r.phase} interpretation=${r.interpretation}`]}};
}

export function recommendedCueThoraxVerticalStabilityDeep034(report:ThoraxVerticalStabilityDeep034Report): string {
  if(report.interpretation==='variable') return 'Reduce unnecessary movement variability and repeat the same motion cue.';
  if(report.interpretation==='elevated') return 'Keep the movement intentional and connected to the current swing phase.';
  if(report.interpretation==='reduced') return 'Create the movement progressively rather than forcing a large change.';
  return 'Keep the motion stable and repeatable.';
}

export const thoraxVerticalStability_deep_034Spec = { id:'thoraxVerticalStability_deep_034', label:'thorax vertical stability', phase:'P7', unit:'normalized', confidenceAware:true, productTier:'advanced-biomechanics' };
