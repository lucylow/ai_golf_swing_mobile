import { PatternContext } from './types';
import { SwingPattern } from '../types/model';
import { PoseLandmarkId } from '../types/landmarks';
import { point3 } from '../geometry/joints';

function turn(frame:any,a:PoseLandmarkId,b:PoseLandmarkId):number{
 const p=point3(frame,a);const q=point3(frame,b);return p&&q?Math.atan2(q.z-p.z,q.x-p.x)*180/Math.PI:0;
}
function phaseDelta(ctx:PatternContext,phase:string,sideA:PoseLandmarkId,sideB:PoseLandmarkId):number{
 const p=ctx.phases.find(x=>x.phase===phase);if(!p)return 0;
 const s=turn(ctx.frames[p.startFrame],sideA,sideB);const e=turn(ctx.frames[p.endFrame],sideA,sideB);return e-s;
}
export function detectShoulderLedTransition(ctx:PatternContext):SwingPattern|null{
 const hip=phaseDelta(ctx,'transition',PoseLandmarkId.LeftHip,PoseLandmarkId.RightHip);
 const shoulder=phaseDelta(ctx,'transition',PoseLandmarkId.LeftShoulder,PoseLandmarkId.RightShoulder);
 const lead=shoulder-hip;
 const score=Math.max(0,Math.min(1,Math.abs(lead)/70));
 if(score<.35)return null;
 return {id:'shoulderLedTransition',label:'Upper-body-led transition tendency',score,confidence:Math.max(.3,ctx.confidence*.8),severity:score>.75?'high':score>.55?'medium':'low',evidence:[`Transition shoulder rotation delta: ${shoulder.toFixed(1)}°`,`Transition hip rotation delta: ${hip.toFixed(1)}°`],recommendedFocus:'Rehearse a lower-body-led transition sequence and compare the next three swings.'};
}
