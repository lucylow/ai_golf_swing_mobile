export interface DeviceCapability { model:string; iosVersion:string; maxFps:number; gpu:boolean; neuralEngine:boolean; memoryGb:number; }
export interface ModelPlan { poseModel:'lite'|'full'|'heavy'; temporalModel:'small'|'medium'|'large'; highFps:boolean; reason:string[]; }

export function chooseModelPlan(d:DeviceCapability, latencyBudgetMs=33):ModelPlan{
  const reason:string[]=[];
  const highFps=d.maxFps>=120 && d.memoryGb>=4;
  if(highFps) reason.push('device supports high-FPS capture'); else reason.push('use standard frame rate');
  const poseModel=d.memoryGb>=6?'full':d.memoryGb>=4?'lite':'lite';
  const temporalModel=latencyBudgetMs<=25 && d.neuralEngine?'small':d.memoryGb>=6?'medium':'small';
  return {poseModel,temporalModel,highFps,reason};
}
