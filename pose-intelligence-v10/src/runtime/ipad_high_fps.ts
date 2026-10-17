/** iPad high-FPS profile contract. Capability data is intentionally configurable rather than device-hardcoded. */
export const IPAD_HIGH_FPS={targetFps:120,preferredWidth:1920,preferredHeight:1080,maxQueue:3,thermalPolicy:'adaptive',description:'iPad high-FPS profile contract'} as const;
export type IpadHighFpsProfile=typeof IPAD_HIGH_FPS;
