export type Point={x:number;y:number};
export type Kalman2DState={position:Point;velocity:Point;uncertainty:number};
export class Kalman2D{
 private state:Kalman2DState={position:{x:0,y:0},velocity:{x:0,y:0},uncertainty:1};
 private initialized=false;
 reset():void{this.state={position:{x:0,y:0},velocity:{x:0,y:0},uncertainty:1};this.initialized=false;}
 update(measurement:Point,dtSeconds:number,confidence=1):Kalman2DState{
  if(!this.initialized){this.state={position:{...measurement},velocity:{x:0,y:0},uncertainty:Math.max(.01,1-confidence)};this.initialized=true;return {...this.state};}
  const dt=Math.max(.001,dtSeconds);const predicted={x:this.state.position.x+this.state.velocity.x*dt,y:this.state.position.y+this.state.velocity.y*dt};
  const residual={x:measurement.x-predicted.x,y:measurement.y-predicted.y};
  const gain=Math.max(.05,Math.min(.95,confidence/(confidence+.2+this.state.uncertainty)));
  this.state.position={x:predicted.x+gain*residual.x,y:predicted.y+gain*residual.y};
  this.state.velocity={x:this.state.velocity.x+(gain/dt)*residual.x,y:this.state.velocity.y+(gain/dt)*residual.y};
  this.state.uncertainty=Math.max(.001,(1-gain)*(this.state.uncertainty+.02));
  return {...this.state,position:{...this.state.position},velocity:{...this.state.velocity}};
 }
 snapshot(){return {...this.state,position:{...this.state.position},velocity:{...this.state.velocity}};}
}
