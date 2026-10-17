import {Anomaly,CoachingAction,Handedness} from './types';
const drills:Record<string,{focus:string;feel:string;why:string;drill:string}>= {
 trailFootSway:{focus:'trail-foot stability',feel:'Feel pressure stay inside the trail foot.',why:'A steadier base makes rotation easier to distinguish from sliding.',drill:'Trail Foot Stability Drill'},
 wristControl:{focus:'lead-wrist control',feel:'Feel the lead wrist stay structurally stable through the takeaway.',why:'A repeatable wrist condition can improve clubface control.',drill:'Glove Logo Control Drill'},
 sequencing:{focus:'kinematic sequencing',feel:'Feel the pelvis start while the chest is still finishing.',why:'The timing relationships between segments matter more than any single angle.',drill:'Step-Change Transition Drill'},
 bracing:{focus:'lead-side bracing',feel:'Feel the lead side accept pressure before rotation finishes.',why:'A stable lead side supports consistent impact mechanics.',drill:'Lead-Side Post Drill'},
 balance:{focus:'balance and center-of-support',feel:'Finish tall without falling toward the toes.',why:'A repeatable finish is a useful consistency signal.',drill:'Balanced Finish Drill'},
};
export function recommend(anomalies:Anomaly[],h:Handedness):CoachingAction|null{if(!anomalies.length)return null;const a=anomalies[0];const map=a.component.includes('sway')?'trailFootSway':a.component.includes('wrist')?'wristControl':a.component.includes('sequence')?'sequencing':a.component.includes('brace')?'bracing':'balance';const d=drills[map];return{...d,reps:10,recheckSwings:3,confidence:a.confidence};}
