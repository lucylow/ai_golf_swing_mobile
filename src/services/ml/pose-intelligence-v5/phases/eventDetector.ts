import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { PhaseWindow } from '../types/model';
import { point3 } from '../geometry/joints';
import { sequenceSpeed } from '../features/kinematics';

export type SwingEvent = { type:'address'|'top'|'transition'|'impact'|'release'|'finish'; frameIndex:number; timestampMs:number; confidence:number };

export function detectSwingEvents(frames:PoseFrame[], phases:PhaseWindow[]):SwingEvent[]{
  const events:SwingEvent[]=[];
  const phase=(name:string)=>phases.find(p=>p.phase===name);
  for(const name of ['setup','top','transition','impact','release','finish']){
    const p=phase(name);
    if(!p) continue;
    const mid=Math.floor((p.startFrame+p.endFrame)/2);
    events.push({type:mapPhase(name),frameIndex:mid,timestampMs:frames[mid]?.timestampMs??0,confidence:p.confidence});
  }
  const speed=sequenceSpeed(frames,PoseLandmarkId.LeftWrist).map((v,i)=>Math.max(v,sequenceSpeed(frames,PoseLandmarkId.RightWrist)[i]??0));
  const peak=speed.indexOf(Math.max(...speed));
  if(peak>=0 && frames[peak]){
    const existing=events.find(e=>e.type==='impact');
    if(existing && Math.abs(existing.frameIndex-peak)<=4){ existing.frameIndex=peak; existing.timestampMs=frames[peak].timestampMs; existing.confidence=Math.min(1,existing.confidence+0.1); }
  }
  return events;
}

function mapPhase(name:string):SwingEvent['type']{ switch(name){case 'setup':return 'address';case 'top':return 'top';case 'transition':return 'transition';case 'impact':return 'impact';case 'release':return 'release';default:return 'finish';}}
