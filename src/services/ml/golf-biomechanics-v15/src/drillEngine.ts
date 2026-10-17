import { Anomaly, CoachingAction, Handedness } from './types';

export type DrillId = 'trail-foot-stability'|'glove-logo-control'|'band-torque'|'step-change'|'pocket-pull'|'punch-ground';

export interface DrillPrescription { id:DrillId; title:string; cue:string; setup:string[]; reps:number; recheck:number; contraindications:string[]; }

const DRILLS:Record<DrillId,DrillPrescription>={
  'trail-foot-stability':{id:'trail-foot-stability',title:'Trail Foot Stability',cue:'Keep pressure on the inside of the trail foot; rotate rather than slide.',setup:['Use a small soft practice ball or towel under the inside edge of the trail foot.','Make slow backswings without letting the ball roll away.'],reps:8,recheck:3,contraindications:['pain','balance limitation']},
  'glove-logo-control':{id:'glove-logo-control',title:'Glove Logo Control',cue:'Feel the glove logo stay organized with the lead wrist through takeaway.',setup:['Take the club slowly to hip height.','Pause and inspect the lead wrist position.'],reps:10,recheck:3,contraindications:['wrist pain']},
  'band-torque':{id:'band-torque',title:'Resistance Band Torque',cue:'Load the turn and let the lower body begin the transition.',setup:['Use a safe anchored resistance band.','Move slowly and never chase maximal range.'],reps:8,recheck:3,contraindications:['shoulder pain','back pain']},
  'step-change':{id:'step-change',title:'Step-Change Transition',cue:'Begin the lower-body change while the club is still finishing the backswing.',setup:['Start feet together.','Step toward the target as the backswing approaches the top.'],reps:6,recheck:3,contraindications:['knee pain','balance limitation']},
  'pocket-pull':{id:'pocket-pull',title:'Lead Pocket Pull',cue:'Feel the lead hip pocket move back and around rather than toward the ball.',setup:['Make slow rehearsals with the lead hip clearing.','Pair with a wall or chair for spatial reference.'],reps:8,recheck:3,contraindications:['hip pain']},
  'punch-ground':{id:'punch-ground',title:'Punch Ground',cue:'Keep the lead side stable through impact and finish the motion.',setup:['Use half swings.','Finish balanced before increasing speed.'],reps:10,recheck:3,contraindications:['pain']},
};

export function recommendDrill(anomalies:Anomaly[],handedness:Handedness='right'):CoachingAction|null{
  if(!anomalies.length)return null;
  const a=anomalies[0];
  let id:DrillId='step-change';
  if(a.component.includes('trail')||a.component.includes('sway')) id='trail-foot-stability';
  else if(a.component.includes('wrist')||a.component.includes('clubface')) id='glove-logo-control';
  else if(a.component.includes('x_factor')||a.component.includes('sequence')) id='band-torque';
  else if(a.component.includes('hip_clearance')) id='pocket-pull';
  else if(a.component.includes('bracing')) id='punch-ground';
  const d=DRILLS[id];
  return {focus:a.component,feel:d.cue,why:a.evidence.join('; '),drill:d.title,reps:d.reps,recheckSwings:d.recheck,confidence:a.confidence};
}

export function drillCatalog():DrillPrescription[]{return Object.values(DRILLS);}
