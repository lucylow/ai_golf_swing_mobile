import {PhaseName} from '../../types';
import {clamp,entropy} from '../math/stats';
export interface PhaseObservation{time:number;probs:number[];}
const PHASES:PhaseName[]=['P1','P2','P3','P4','P5','P6','P7','P8','P9','P10'];
export function decodeP1P10(obs:PhaseObservation[]){if(!obs.length)return[];const out:PhaseName[]=[];let prev=0;for(const o of obs){let best=0,bestScore=-Infinity;o.probs.forEach((p,i)=>{const prior=i===prev?.2:1;const score=Math.log(Math.max(1e-6,p))+Math.log(prior);if(score>bestScore){bestScore=score;best=i;}});prev=best;out.push(PHASES[Math.min(best,PHASES.length-1)]);}return out;}
export function phaseConfidence(o:PhaseObservation){return clamp(1-entropy(o.probs)/Math.log(10));}
