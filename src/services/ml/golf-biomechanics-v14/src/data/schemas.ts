export interface DatasetIdentity { datasetId:string; version:string; subjectId:string; sessionId:string; swingId:string; source:'synthetic'|'phone'|'launch-monitor'|'expert'; }
export interface SequenceLabel { phase:'P1'|'P2'|'P3'|'P4'|'P5'|'P6'|'P7'|'P8'|'P9'|'P10'; frame:number; confidence:number; }
export interface SwingRecord extends DatasetIdentity { fps:number; view:'face-on'|'down-the-line'|'oblique'; handedness:'left'|'right'; labels:SequenceLabel[]; landmarks:number[][]; metrics:Record<string,number>; anomalies:string[]; deviceId:string; }
export interface SplitSpec { train:number; validation:number; test:number; subjectDisjoint:boolean; deviceDisjoint:boolean; }
