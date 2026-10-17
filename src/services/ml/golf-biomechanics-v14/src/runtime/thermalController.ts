export type ThermalState='nominal'|'fair'|'serious'|'critical';
export interface ThermalDecision { state:ThermalState; fps:number; modelTier:'high'|'balanced'|'lite'; disableHighFps:boolean; }
export function decideThermalPolicy(tempC:number,currentFps:number):ThermalDecision{
  if(tempC>=44) return {state:'critical',fps:Math.min(24,currentFps),modelTier:'lite',disableHighFps:true};
  if(tempC>=41) return {state:'serious',fps:Math.min(30,currentFps),modelTier:'lite',disableHighFps:true};
  if(tempC>=38) return {state:'fair',fps:Math.min(45,currentFps),modelTier:'balanced',disableHighFps:false};
  return {state:'nominal',fps:currentFps,modelTier:'high',disableHighFps:false};
}
