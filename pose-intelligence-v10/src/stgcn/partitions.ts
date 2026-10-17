import {GOLF_GRAPH} from './graph';
export type Partition='self'|'centripetal'|'centrifugal';
export function edgePartitions(){const c={x:0,y:0,z:0};const dist=(i:number)=>Math.abs(i-15);const out:Record<Partition,[number,number][]>={self:[],centripetal:[],centrifugal:[]};for(const [a,b] of GOLF_GRAPH.edges){if(a===b)out.self.push([a,b]);else if(dist(a)<dist(b))out.centripetal.push([a,b]);else out.centrifugal.push([a,b])}return out;}
