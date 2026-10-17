import {PoseFrame,CameraCalibration,Handedness,V16Snapshot} from './types';
import {estimateCameraQuality,canonicalize} from './camera';
import {constrainSequence} from './constraints';
import {detectPhases} from './phaseEngine';
import {reliabilityFor} from './reliability';
import {buildMetrics} from './metrics';
import {buildAnomalies} from './anomaly';
import {recommend} from './coach';
import {estimateEnergy} from './energyProxy';
import {screenMobility} from './mobilityScreen';
import {shoulderSymmetry,kneeSymmetry} from './symmetry';
export class GolfBiomechanicsEngineV16{
 readonly version='v16.0.0-biomechanics';
 analyze(frames:PoseFrame[],camera:CameraCalibration,handedness:Handedness,goal='consistency'):V16Snapshot{
  const cameraScore=estimateCameraQuality(camera,frames);
  const canonical=canonicalize(frames,camera);
  const constrained=constrainSequence(canonical);
  const phase=detectPhases(constrained.frames);
  const rel=reliabilityFor(constrained.frames,cameraScore,phase.confidence);
  const metrics=buildMetrics(constrained.frames,handedness,rel);
  const energy=estimateEnergy(constrained.frames,handedness);
  const mobility=screenMobility(constrained.frames[Math.floor(constrained.frames.length/3)] ?? constrained.frames[0]);
  metrics.push({name:'energyTransferProxy',value:energy.transfer,unit:'proxy',evidence:{confidence:rel.overall*energy.confidence,quality:rel.overall>.75?'good':'degraded',sources:['pose sequence'],reasons:['kinematic proxy']}});
  metrics.push({name:'shoulderSymmetry',value:shoulderSymmetry(constrained.frames),unit:'normalized',evidence:{confidence:rel.overall,quality:rel.overall>.75?'good':'degraded',sources:['bilateral pose'],reasons:[]}});
  metrics.push({name:'kneeSymmetry',value:kneeSymmetry(constrained.frames),unit:'normalized',evidence:{confidence:rel.overall,quality:rel.overall>.75?'good':'degraded',sources:['bilateral pose'],reasons:[]}});
  metrics.push({name:'mobilityScreen',value:mobility.overall,unit:'normalized',evidence:{confidence:rel.overall,quality:rel.overall>.75?'good':'degraded',sources:['pose'],reasons:mobility.flags}});
  const anomalies=buildAnomalies(metrics).sort((a,b)=>(b.score*b.confidence)-(a.score*a.confidence)).slice(0,7);
  const coaching=recommend(anomalies,handedness);
  return{version:this.version,metrics,events:phase.events,phases:phase.phases,anomalies,coaching,reliability:rel,warnings:constrained.violations,diagnostics:{goal,cameraScore,frameCount:frames.length,phaseConfidence:phase.confidence,anomalyCount:anomalies.length}};
 }
}
