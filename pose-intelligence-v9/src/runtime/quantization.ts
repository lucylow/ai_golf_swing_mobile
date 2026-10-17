export type QuantizationMode='float32'|'float16'|'int8';
export type QuantizationConfig={mode:QuantizationMode;accuracyGuard:number;memoryReductionTarget:number};
export const defaultQuantization:QuantizationConfig={mode:'float16',accuracyGuard:0.97,memoryReductionTarget:0.35};
export function chooseQuantization(deviceClass:'low'|'mid'|'high'):QuantizationConfig{return deviceClass==='low'?{mode:'int8',accuracyGuard:0.94,memoryReductionTarget:0.55}:deviceClass==='mid'?defaultQuantization:{mode:'float32',accuracyGuard:0.99,memoryReductionTarget:0.15};}

