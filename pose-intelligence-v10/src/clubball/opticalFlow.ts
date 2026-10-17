import {Vec2,clamp} from '../core/math';
export type FlowTrack={previous:Vec2;current:Vec2;confidence:number};
export function residualFlow(a:FlowTrack,b:FlowTrack){const pa={x:b.current.x-a.current.x,y:b.current.y-a.current.y};const pb={x:b.previous.x-a.previous.x,y:b.previous.y-a.previous.y};return Math.hypot(pa.x-pb.x,pa.y-pb.y)}
export function flowConfidence(tracks:FlowTrack[],maxResidual=15){if(!tracks.length)return 0;const good=tracks.reduce((s,t)=>s+(Math.hypot(t.previous.x-t.current.x,t.previous.y-t.current.y)<=maxResidual?t.confidence:0),0);return clamp(good/tracks.length,0,1)}
