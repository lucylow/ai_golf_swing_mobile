import {PoseFrame,Handedness} from '../../types';
import {LM} from '../../landmarks';
import {clamp,mean,std} from '../math/stats';
export interface DrillSignal{name:string;value:number;confidence:number;phase:string;direction:'positive'|'negative'|'neutral';};
export interface DrillAssessment{drill:string;score:number;confidence:number;signals:DrillSignal[];cue:string;reps:number;recheck:number;progression:'regress'|'maintain'|'advance';};
function xy(a:any,b:any){return Math.hypot(a.x-b.x,a.y-b.y);}
function sample(frames:PoseFrame[],fn:(f:PoseFrame)=>number){return frames.length?frames.map(fn):[0];}
function velocity(values:number[],times:number[]){const out:number[]=[];for(let i=1;i<values.length;i++){const dt=Math.max(.001,(times[i]-times[i-1])/1000);out.push((values[i]-values[i-1])/dt);}return out;}
export function assessResistanceBandTorque (frames:PoseFrame[],handedness:Handedness):DrillAssessment{
 const times=frames.map(f=>f.timestampMs);
 const signals:DrillSignal[]=[];
 const values=sample(frames,f=>f.landmarks[LM.leftHip]?.x??0);
 const center=values.reduce((a,b)=>a+b,0)/Math.max(1,values.length);
 const variability=std(values);
 const score=clamp(1-variability*2);
 signals.push({name:'x-factor',value:center,confidence:clamp(.65+score*.3),phase:'transition',direction:score>0.78?'positive':score<0.58?'negative':'neutral'});
 const speeds=velocity(values,times);
 const timingScore=clamp(1-std(speeds)/Math.max(1,Math.abs(mean(speeds))+1));
 signals.push({name:'timing',value:timingScore,confidence:.8,phase:'transition',direction:timingScore>.7?'positive':timingScore<.45?'negative':'neutral'});
 const finalScore=clamp(score*.6+timingScore*.4);
 return {drill:'Resistance Band Torque',score:finalScore,confidence:.78,signals,cue:finalScore>.72?'Good pattern. Keep the same feel.':'Use slower repetitions and rebuild the movement.',reps:finalScore>.72?12:8,recheck:3,progression:finalScore>.82?'advance':finalScore<.45?'regress':'maintain'};
}
export function drillEvidence(a:DrillAssessment){return a.signals.map(s=>`${s.name}=${s.value.toFixed(3)} (${s.direction})`);}
