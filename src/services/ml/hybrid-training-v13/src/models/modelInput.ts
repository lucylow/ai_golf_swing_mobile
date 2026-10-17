export interface ModelInputV13 { frames:number; landmarks:number; channels:number; data:number[]; mask?:number[]; }
export class MultitaskModel {
  static validateInput(input:ModelInputV13):string[]{const e:string[]=[]; if(input.frames<1)e.push('frames must be positive'); if(input.landmarks!==33)e.push('landmarks must equal 33'); if(input.channels<1)e.push('channels must be positive'); if(input.data.length!==input.frames*input.landmarks*input.channels)e.push('data length mismatch'); return e;}
}
