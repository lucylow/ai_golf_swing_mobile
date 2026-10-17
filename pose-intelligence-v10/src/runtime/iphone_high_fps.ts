/** iPhone high-FPS profile contract. Capability data is intentionally configurable rather than device-hardcoded. */
export const IPHONE_HIGH_FPS={targetFps:120,preferredWidth:1920,preferredHeight:1080,maxQueue:3,thermalPolicy:'adaptive',description:'iPhone high-FPS profile contract'} as const;
export type IphoneHighFpsProfile=typeof IPHONE_HIGH_FPS;
