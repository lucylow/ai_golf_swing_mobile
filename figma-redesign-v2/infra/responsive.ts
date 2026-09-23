import { Dimensions, PixelRatio } from 'react-native';
const w = Dimensions.get('window').width;
export const isCompact = w < 360;
export const gutter = isCompact ? 14 : 18;
export const scale = (size: number) => PixelRatio.roundToNearestPixel(size * Math.min(1.08, Math.max(0.92, w / 390)));
export const column = (gap = 10) => ({ width: (w - gutter * 2 - gap) / 2 });
