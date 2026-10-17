import {Vec2,clamp,lerp} from '../core/math';
export function cubicHermite(p0:Vec2,p1:Vec2,v0:Vec2,v1:Vec2,t:number):Vec2{const u=1-t;const h00=2*t*t*t-3*t*t+1,h10=t*t*t-2*t*t+t,h01=-2*t*t*t+3*t*t,h11=t*t*t-t*t;return{x:h00*p0.x+h10*v0.x+h01*p1.x+h11*v1.x,y:h00*p0.y+h10*v0.y+h01*p1.y+h11*v1.y};}
export function fitLocalTangents(points:Vec2[],times:number[]){return points.map((p,i)=>{const a=i>0?points[i-1]:p,b=i<points.length-1?points[i+1]:p,dt=Math.max((times[Math.min(i+1,times.length-1)]??0)-(times[Math.max(0,i-1)]??0),1);return{x:(b.x-a.x)/dt,y:(b.y-a.y)/dt}})}
export function interpolateWindow(points:Vec2[],times:number[],targetTs:number){if(points.length<2)return points[0]??{x:0,y:0};if(targetTs<=times[0])return points[0];if(targetTs>=times[times.length-1])return points[points.length-1];let i=1;while(i<times.length&&times[i]<targetTs)i++;const t0=times[i-1],t1=times[i],u=clamp((targetTs-t0)/Math.max(t1-t0,1),0,1);const tangents=fitLocalTangents(points,times);return cubicHermite(points[i-1],points[i],scale2(tangents[i-1],t1-t0),scale2(tangents[i],t1-t0),u)}
export function smoothTrajectory(points:Vec2[],alpha=0.35){if(!points.length)return[];const out=[points[0]];for(let i=1;i<points.length;i++)out.push({x:lerp(out[i-1].x,points[i].x,alpha),y:lerp(out[i-1].y,points[i].y,alpha)});return out;}

function scale2(v:Vec2,s:number):Vec2{return{x:v.x*s,y:v.y*s}}
