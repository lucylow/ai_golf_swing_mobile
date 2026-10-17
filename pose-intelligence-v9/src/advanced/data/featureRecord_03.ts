export type FeatureRecord={
  sessionId:string;
  swingId:string;
  featureName:string;
  value:number;
  normalizedValue:number;
  confidence:number;
  phase:string;
  source:string;
  modelVersion:string;
  createdAtMs:number;
};

export function createFeatureRecord(input:Partial<FeatureRecord>):FeatureRecord{
  return{
    sessionId:String(input.sessionId??'unknown'),
    swingId:String(input.swingId??'unknown'),
    featureName:String(input.featureName??'unknown'),
    value:Number.isFinite(input.value??NaN)?Number(input.value):0,
    normalizedValue:Number.isFinite(input.normalizedValue??NaN)?Number(input.normalizedValue):0,
    confidence:Math.max(0,Math.min(1,Number(input.confidence??0))),
    phase:String(input.phase??'unknown'),
    source:String(input.source??'pose'),
    modelVersion:String(input.modelVersion??'v9'),
    createdAtMs:Number(input.createdAtMs??Date.now()),
  };
}

export function isProductionSafe(record:FeatureRecord):boolean{
  return record.confidence>=0.45 && Number.isFinite(record.value) && Number.isFinite(record.normalizedValue);
}

export function partition(records:FeatureRecord[]):{safe:FeatureRecord[];review:FeatureRecord[]}{
  const safe:FeatureRecord[]=[]; const review:FeatureRecord[]=[];
  for(const record of records)(isProductionSafe(record)?safe:review).push(record);
  return{safe,review};
}

