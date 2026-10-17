import {HybridGolfAiV13} from '../src';
const engine=new HybridGolfAiV13();
const samples=[
 {sampleId:'s1',subjectId:'p1',domain:'real' as const,viewpoint:'dtl',phaseCoverage:1,quality:.92,features:{split:1}},
 {sampleId:'s2',subjectId:'p2',domain:'synthetic' as const,viewpoint:'fo',phaseCoverage:.9,quality:.88,features:{split:1}},
 {sampleId:'s3',subjectId:'p3',domain:'real' as const,viewpoint:'dtl',phaseCoverage:.96,quality:.95,features:{split:2}},
 {sampleId:'s4',subjectId:'p4',domain:'real' as const,viewpoint:'fo',phaseCoverage:.93,quality:.91,features:{split:3}},
];
const report=engine.prepare(samples);
if(report.validation.length!==1)throw new Error('validation split failure');
if(report.test.length!==1)throw new Error('test split failure');
if(engine.validateModelInput({frames:2,landmarks:33,channels:3,data:new Array(2*33*3).fill(0)}).length!==0)throw new Error('model input validation failure');
console.log('v13 smoke ok',JSON.stringify(report.coverage));
