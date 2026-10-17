import { PatternContext } from './types';
import { SwingPattern } from '../types/model';
import { PoseLandmarkId } from '../types/landmarks';
import { point3 } from '../geometry/joints';
import { standardDeviation } from '../math/scalar';

export function detectSway(ctx: PatternContext): SwingPattern | null {
  const xs:number[]=[];
  for(const frame of ctx.frames){
    const l=point3(frame,PoseLandmarkId.LeftHip); const r=point3(frame,PoseLandmarkId.RightHip);
    if(l&&r) xs.push((l.x+r.x)/2);
  }
  if(xs.length<6)return null;
  const spread=standardDeviation(xs);
  const score=Math.max(0,Math.min(1,spread*5));
  if(score<0.35)return null;
  return {
    id:'sway',label:'Excessive lateral sway',score,confidence:Math.max(.3,ctx.confidence*.85),severity:score>.75?'high':score>.55?'medium':'low',
    evidence:[`Pelvis-center lateral variability: ${spread.toFixed(3)} normalized units`,`Signal is aggregated across ${xs.length} observed frames`],
    recommendedFocus:'Use a stable lower-body setup drill and recheck pelvic translation over the next three swings.'
  };
}
