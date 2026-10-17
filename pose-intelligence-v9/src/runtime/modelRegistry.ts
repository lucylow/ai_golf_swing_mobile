export type ModelDescriptor={id:string;version:string;runtime:'mediapipe'|'opencv'|'vision'|'custom';inputWidth:number;inputHeight:number;supportsLiveStream:boolean;supportsWorldLandmarks:boolean};
export const defaultModels:ModelDescriptor[]=[
 {id:'mediapipe-pose-landmarker',version:'v1',runtime:'mediapipe',inputWidth:640,inputHeight:480,supportsLiveStream:true,supportsWorldLandmarks:true},
 {id:'opencv-fallback-pose',version:'v1',runtime:'opencv',inputWidth:640,inputHeight:480,supportsLiveStream:true,supportsWorldLandmarks:false},
];
export function selectModel(prefer:'mediapipe'|'opencv'='mediapipe'){return defaultModels.find(m=>m.runtime===prefer)||defaultModels[0];}

