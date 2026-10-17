export type FeatureSchema={name:string;unit:string;dtype:'float32'|'int32'|'bool';min:number;max:number;source:'pose'|'mesh'|'club'|'ball'|'temporal'|'context';version:number};
export const V10_FEATURE_SCHEMA:FeatureSchema[]=[
 {name:'x_factor_deg',unit:'deg',dtype:'float32',min:-180,max:180,source:'pose',version:10},
 {name:'pelvis_tilt_deg',unit:'deg',dtype:'float32',min:-90,max:90,source:'pose',version:10},
 {name:'thorax_tilt_deg',unit:'deg',dtype:'float32',min:-90,max:90,source:'pose',version:10},
 {name:'tempo_ratio',unit:'ratio',dtype:'float32',min:0,max:20,source:'temporal',version:10},
 {name:'tracking_confidence',unit:'score',dtype:'float32',min:0,max:1,source:'pose',version:10},
 {name:'impact_uncertainty_ms',unit:'ms',dtype:'float32',min:0,max:100,source:'club',version:10},
];
