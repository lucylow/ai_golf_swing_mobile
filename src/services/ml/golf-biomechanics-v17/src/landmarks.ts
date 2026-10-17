export const LM={
 nose:0,leftShoulder:11,rightShoulder:12,leftElbow:13,rightElbow:14,leftWrist:15,rightWrist:16,
 leftPinky:17,rightPinky:18,leftIndex:19,rightIndex:20,leftThumb:21,rightThumb:22,
 leftHip:23,rightHip:24,leftKnee:25,rightKnee:26,leftAnkle:27,rightAnkle:28,leftHeel:29,rightHeel:30,leftFoot:31,rightFoot:32,
} as const;
export const BODY_EDGES:number[][]=[
 [11,12],[11,13],[13,15],[12,14],[14,16],[11,23],[12,24],[23,24],[23,25],[25,27],[24,26],[26,28],[27,29],[28,30],[29,31],[30,32]
];
export const GOLF_EDGES:number[][]=[
 [23,24],[11,12],[23,11],[24,12],[15,16],[15,11],[16,12],[13,15],[14,16],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32]
];
