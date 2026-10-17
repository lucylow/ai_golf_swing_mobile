import {ActiveLearning} from './data/activeLearning';
import {SyntheticMix} from './data/syntheticMix';
import {LeakageGuard} from './data/leakageGuard';
import {CoverageReport} from './data/coverageReport';
import {MultitaskModel, ModelInputV13} from './models/modelInput';

export interface HybridSample {sampleId:string;subjectId:string;domain:'synthetic'|'real';deviceId?:string;viewpoint?:string;phaseCoverage:number;quality:number;features:Record<string,number>;}
export class HybridGolfAiV13 {
 private active=new ActiveLearning(); private mixer=new SyntheticMix(); private leakage=new LeakageGuard(); private coverage=new CoverageReport();
 prepare(samples:HybridSample[]){
   this.leakage.assertNoSubjectLeakage(samples);
   const mixed=this.mixer.mix(samples,{realWeight:.65,syntheticWeight:.35});
   const train=mixed.filter(s=>(s.features.split??1)!==2 && (s.features.split??1)!==3);
   const validation=mixed.filter(s=>(s.features.split??1)===2);
   const test=mixed.filter(s=>(s.features.split??1)===3);
   for(const s of train)this.coverage.ingest(s.sampleId,{quality:s.quality,phaseCoverage:s.phaseCoverage});
   return {train,validation,test,activeLearningIds:this.active.rankUncertain(samples).map(s=>s.sampleId),coverage:this.coverage.summarizeCoverage()};
 }
 validateModelInput(input:ModelInputV13){return MultitaskModel.validateInput(input);}
}
