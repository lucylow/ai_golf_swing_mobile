import { PoseFrame, FeatureValue, Vec2 } from './types';
import { MP33,get } from './landmarks';
import { signedAngle2, clamp01, mean } from './math';
export type ClubLine = { shaft:Vec2; confidence:number; length:number; timestampMs:number };
export function handToClubProxy(frame:PoseFrame):ClubLine|null{const wrist=get(frame,MP33.RIGHT_WRIST),elbow=get(frame,MP33.RIGHT_ELBOW);if(!wrist||!elbow)return null;const shaft={x:wrist.x-elbow.x,y:wrist.y-elbow.y};return{shaft,confidence:clamp01(wrist.confidence*0.7+elbow.confidence*0.3),length:Math.hypot(shaft.x,shaft.y),timestampMs:frame.timestampMs};}
export function proxyClubPath(frames:PoseFrame[]):number[]{const lines=frames.map(handToClubProxy).filter(Boolean) as ClubLine[];const out:number[]=[0];for(let i=1;i<lines.length;i++)out.push(signedAngle2(lines[i-1].shaft,lines[i].shaft));return out;}
export function clubPathFeature(frames:PoseFrame[]):FeatureValue{const p=proxyClubPath(frames);return{name:'proxy_club_path',value:mean(p.slice(1).map(v=>Math.abs(v))),unit:'deg/frame',confidence:clamp01(p.length/Math.max(frames.length,1)*0.75),source:'hand_club_proxy'};}

