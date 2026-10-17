export type PrivacyPolicy={storeRawVideo:boolean;storeLandmarks:boolean;retainDays:number;analyticsOptIn:boolean};
export const defaultPrivacyPolicy:PrivacyPolicy={storeRawVideo:false,storeLandmarks:true,retainDays:30,analyticsOptIn:false};
export function shouldStoreRawVideo(policy:PrivacyPolicy){return policy.storeRawVideo&&policy.retainDays>0;}

