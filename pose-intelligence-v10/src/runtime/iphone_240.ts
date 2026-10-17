/** iPhone 240-FPS slow-motion profile contract. Capability data is intentionally configurable rather than device-hardcoded. */
export const IPHONE_240={targetFps:240,preferredWidth:1280,preferredHeight:720,maxQueue:3,thermalPolicy:'adaptive',description:'iPhone 240-FPS slow-motion profile contract'} as const;
export type Iphone240Profile=typeof IPHONE_240;
