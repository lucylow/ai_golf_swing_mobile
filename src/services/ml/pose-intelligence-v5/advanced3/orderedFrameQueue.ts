import { PoseFrame } from '../types/landmarks';
export class OrderedFrameQueue{
 private q:PoseFrame[]=[];
 push(frame:PoseFrame):void{
  if(!this.q.length||frame.timestampMs>=this.q[this.q.length-1].timestampMs){this.q.push(frame);return;}
  let lo=0,hi=this.q.length;
  while(lo<hi){const mid=(lo+hi)>>1;if(this.q[mid].timestampMs<=frame.timestampMs)lo=mid+1;else hi=mid;}
  this.q.splice(lo,0,frame);
 }
 drain(max=32):PoseFrame[]{const out=this.q.slice(0,max);this.q=this.q.slice(max);return out;}
 peek():PoseFrame|undefined{return this.q[0];}
 clear():void{this.q=[];}
 get size():number{return this.q.length;}
}
