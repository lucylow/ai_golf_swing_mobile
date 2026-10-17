import { SwingPattern } from '../types/model';
export function prioritizePatterns(patterns:SwingPattern[]):SwingPattern[]{
 return [...patterns].sort((a,b)=>{
   const severity=(s:string)=>s==='high'?4:s==='medium'?3:s==='low'?2:1;
   return (severity(b.severity)*b.confidence*b.score)-(severity(a.severity)*a.confidence*a.score);
 });
}
