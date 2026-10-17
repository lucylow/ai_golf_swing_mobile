import { PoseFrame } from '../types';
type RuleResult={id:string;label:string;score:number;confidence:number;evidence:string[]};
import * as R from './index';
export function runAllRules(frames:PoseFrame[]):RuleResult[]{
  const out:RuleResult[]=[];
  for(const [id,mod] of Object.entries(R)){
    const ev=(mod as {evaluate?:(f:PoseFrame[])=>RuleResult}).evaluate;
    if(typeof ev==='function')out.push(ev(frames));
  }
  return out.sort((a,b)=>b.score-a.score);
}
