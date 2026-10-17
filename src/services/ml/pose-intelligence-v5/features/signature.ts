import { SwingSignature } from '../types/model';
import { PoseFrame } from '../types/landmarks';
import { QualityReport, CameraView } from '../types/model';
import { mean, standardDeviation } from '../math/scalar';

const FEATURE_NAMES=['hipRotation','shoulderRotation','spineAngle','leadKneeFlex','trailKneeFlex','leadElbowFlex','trailElbowFlex','handHeight','headMovement','hipSway','shoulderSway','armSpeed','handSpeed','tempo'];

export function makeSwingSignature(values:Record<string,number>, quality:QualityReport, cameraView:CameraView='unknown'):SwingSignature{
  const vector=FEATURE_NAMES.map(name=>Number.isFinite(values[name])?values[name]:0);
  const confidence=mean(Object.values(values).map(()=>quality.score));
  return {version:'pose-v5.0',featureVector:{values:normVector(vector),names:[...FEATURE_NAMES],weights:FEATURE_NAMES.map(()=>1),confidence},cameraView,dominantHand:'unknown',quality};
}

function normVector(values:number[]):number[]{
  if(!values.length)return [];
  const m=mean(values); const s=Math.max(1e-6,standardDeviation(values));
  return values.map(v=>(v-m)/s);
}
