import { SwingRecord } from './schemas';
export function assertDisjoint(train:SwingRecord[],test:SwingRecord[]){
  const subjects=new Set(train.map(x=>x.subjectId)); const devices=new Set(train.map(x=>x.deviceId));
  const subjectLeaks=test.filter(x=>subjects.has(x.subjectId)).map(x=>x.swingId);
  const deviceLeaks=test.filter(x=>devices.has((x as any).metadataDevice ?? 'unknown')).map(x=>x.swingId);
  if(subjectLeaks.length) throw new Error(`subject leakage: ${subjectLeaks.join(',')}`);
  if(deviceLeaks.length) throw new Error(`device leakage: ${deviceLeaks.join(',')}`);
  return true;
}
