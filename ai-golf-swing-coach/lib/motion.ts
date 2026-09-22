export function motionDuration(duration: number, reduceMotion: boolean) {
  return reduceMotion ? 0 : Math.max(0, duration);
}

export function tabPressScale(pressed: boolean, reduceMotion: boolean) {
  return reduceMotion ? 1 : pressed ? 0.96 : 1;
}
