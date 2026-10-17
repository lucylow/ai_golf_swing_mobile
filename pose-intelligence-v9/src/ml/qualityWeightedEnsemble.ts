import { clamp01 } from '../math';
export type ModelVote={modelId:string;score:number;confidence:number};
export function fuseVotes(votes:ModelVote[]):{score:number;confidence:number;weights:Record<string,number>}{if(!votes.length)return{score:0,confidence:0,weights:{}};const ws=votes.map(v=>clamp01(v.confidence));const z=ws.reduce((a,b)=>a+b,0)||1;const weights:Record<string,number>={};let score=0;votes.forEach((v,i)=>{const w=ws[i]/z;weights[v.modelId]=w;score+=w*v.score;});return{score,confidence:clamp01(ws.reduce((a,b)=>a+b,0)/votes.length),weights};}

