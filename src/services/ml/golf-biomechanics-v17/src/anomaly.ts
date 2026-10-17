import {BioMetric,Anomaly} from './types';
import {clamp} from './math';
const targets:Record<string,[number,number]>= {xFactor:[20,50],tempoRatio:[2,4],trailHipSway:[0,.12],headStability:[.75,1],pelvisStability:[.75,1],leadWristFlexion:[-15,20],sequenceEfficiency:[.72,1],leadBracing:[120,180],pressureTransfer:[0,.9]};
export function scoreMetric(m:BioMetric){const t=targets[m.name];if(!t)return 0;const [lo,hi]=t;if(m.value<lo)return clamp((lo-m.value)/Math.max(hi-lo,1));if(m.value>hi)return clamp((m.value-hi)/Math.max(hi-lo,1));return 0;}
export function buildAnomalies(metrics:BioMetric[]){return metrics.map(m=>{const score=scoreMetric(m);return score>.2?{component:m.name,phase:m.evidence.phase??'full',score,severity:score>.8?'critical':score>.6?'high':score>.4?'moderate':'low',confidence:m.evidence.confidence,evidence:[`value=${m.value.toFixed(2)}`,`quality=${m.evidence.quality}`]}:null}).filter(Boolean) as Anomaly[];}
