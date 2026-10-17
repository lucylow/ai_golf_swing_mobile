import { PoseFrame } from '../types/landmarks';
export class RealtimeWindow{
 private frames:PoseFrame[]=[];
 constructor(private readonly windowMs=1800){ }
 push(frame:PoseFrame){this.frames.push(frame);const min=frame.timestampMs-this.windowMs;while(this.frames.length&&this.frames[0].timestampMs<min)this.frames.shift();}
 current(){return [...this.frames];}
}
