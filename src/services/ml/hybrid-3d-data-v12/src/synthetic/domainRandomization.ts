import { AugmentationConfig, SwingSequence } from "../types";
import { SeededRandom } from "../prng";
import { clamp } from "../math";
const jitter=(rng:SeededRandom,s:number)=>rng.gaussian()*s;
export function randomizeSynthetic(seq:SwingSequence,cfg:AugmentationConfig):SwingSequence{const rng=new SeededRandom(cfg.seed);let frames=seq.frames.map(f=>({...f,landmarks:f.landmarks.map(l=>({...l,position:{x:l.position.x,y:l.position.y,z:l.position.z}}))}));frames=frames.filter(()=>rng.next()>=cfg.frameDropProbability);for(const f of frames){for(const l of f.landmarks){if(rng.next()<cfg.dropoutProbability){l.visibility=0;l.presence=0;continue;}l.position.x+=jitter(rng,cfg.gaussianNoiseStd);l.position.y+=jitter(rng,cfg.gaussianNoiseStd);l.position.z+=jitter(rng,cfg.gaussianNoiseStd);if(rng.next()<cfg.occlusionProbability)l.visibility=clamp(l.visibility*rng.range(0.1,0.5),0,cfg.visibilityFloor);}}return {...seq,frames};}
export const defaultAugmentation=(seed=11):AugmentationConfig=>({gaussianNoiseStd:0.008,dropoutProbability:0.01,occlusionProbability:0.05,frameDropProbability:0.015,rotationDeg:8,scaleJitter:0.04,translationJitter:0.03,visibilityFloor:0.15,seed});
