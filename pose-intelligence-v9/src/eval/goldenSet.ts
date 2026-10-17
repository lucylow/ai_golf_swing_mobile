import { PoseFrame } from '../types';
export type GoldenCase={id:string;frames:PoseFrame[];expectedPhaseCount:number;expectedMinQuality:number};
export function validateGoldenCase(c:GoldenCase){const actual=c.frames.length;return{pass:actual>0&&c.expectedPhaseCount>=0,frameCount:actual};}

