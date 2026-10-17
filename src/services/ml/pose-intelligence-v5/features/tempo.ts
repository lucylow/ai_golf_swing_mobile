import { PoseFrame } from '../types/landmarks';
export function tempoRatio(frames:PoseFrame[],splitIndex:number):number{
 if(frames.length<2||splitIndex<=0||splitIndex>=frames.length-1)return 0;
 const a=frames[splitIndex].timestampMs-frames[0].timestampMs; const b=frames.at(-1)!.timestampMs-frames[splitIndex].timestampMs; return b>0?a/b:0;
}
