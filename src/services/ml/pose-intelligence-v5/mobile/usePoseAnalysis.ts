import { useCallback, useMemo, useState } from 'react';
import { PoseFrame } from '../types/landmarks';
import { PoseSwingAnalyzer } from '../pipeline/analyzer';
export function usePoseAnalysis(){
 const analyzer=useMemo(()=>new PoseSwingAnalyzer(),[]);
 const [busy,setBusy]=useState(false);
 const analyze=useCallback((frames:PoseFrame[])=>{setBusy(true);try{return analyzer.analyze(frames);}finally{setBusy(false);}},[analyzer]);
 return {analyze,busy};
}
