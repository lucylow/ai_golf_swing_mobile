export interface MixSample { sampleId:string; domain:"synthetic"|"real"; quality:number; features:Record<string,number>; [key:string]:any }
export class SyntheticMix {
  mix<T extends MixSample>(samples:T[], opts:{realWeight:number;syntheticWeight:number}):T[]{
    const real=samples.filter(s=>s.domain==='real'); const synth=samples.filter(s=>s.domain==='synthetic');
    const total=real.length+synth.length; if(!total) return [];
    const targetReal=Math.round(total*Math.max(0,Math.min(1,opts.realWeight/(opts.realWeight+opts.syntheticWeight))));
    const targetSynth=Math.max(0,total-targetReal);
    const take=(arr:T[],n:number):T[]=>[...arr].sort((a,b)=>b.quality-a.quality).slice(0,n);
    return [...take(real,targetReal),...take(synth,targetSynth)];
  }
}
