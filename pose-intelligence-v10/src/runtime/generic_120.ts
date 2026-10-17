/** Generic 120-FPS profile. Capability data is intentionally configurable rather than device-hardcoded. */
export const GENERIC_120={targetFps:120,preferredWidth:1920,preferredHeight:1080,maxQueue:3,thermalPolicy:'adaptive',description:'Generic 120-FPS profile'} as const;
export type Generic120Profile=typeof GENERIC_120;
