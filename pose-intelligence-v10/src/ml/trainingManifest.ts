export type TrainingManifest={datasetId:string;version:string;subjects:number;sessions:number;swings:number;fps:number[];cameraViews:string[];labels:string[];split:'subject-disjoint'|'session-disjoint'|'random';augmentation:string[];leakageChecks:string[]};
export function validateSplit(m:TrainingManifest){return m.split==='subject-disjoint'&&m.subjects>0&&m.swings>0;}
