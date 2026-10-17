export type Limit={name:string;min:number;max:number;softMin:number;softMax:number;weight:number};
export const GOLF_JOINT_LIMITS:Limit[]=[
 {name:'pelvis_tilt',min:-35,max:35,softMin:-25,softMax:25,weight:1},
 {name:'thorax_rotation',min:-120,max:120,softMin:-95,softMax:95,weight:1},
 {name:'lead_elbow_flex',min:0,max:160,softMin:5,softMax:145,weight:0.8},
 {name:'trail_elbow_flex',min:0,max:160,softMin:5,softMax:145,weight:0.8},
 {name:'lead_wrist',min:-90,max:90,softMin:-70,softMax:70,weight:0.7},
];
export function limitPenalty(v:number,l:Limit){if(v<l.softMin)return Math.min(1,((l.softMin-v)/Math.max(l.softMin-l.min,1))*l.weight);if(v>l.softMax)return Math.min(1,((v-l.softMax)/Math.max(l.max-l.softMax,1))*l.weight);return 0}
