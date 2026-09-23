import { Easing } from 'react-native';
export const easings = { enter: Easing.out(Easing.cubic), springy: Easing.bezier(0.2, 0.9, 0.25, 1), exit: Easing.in(Easing.cubic) };
export const durations = { micro: 120, fast: 220, normal: 360, slow: 520 } as const;
