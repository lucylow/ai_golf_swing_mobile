import { Dimensions } from "react-native";
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const CONTENT_WIDTH = Math.min(SCREEN_WIDTH - 30, 520);
export const TWO_COL_WIDTH = (CONTENT_WIDTH - 8) / 2;
export const HERO_HEIGHT = SCREEN_WIDTH < 375 ? 218 : 236;
export const HIT_SLOP = { top: 8, right: 8, bottom: 8, left: 8 } as const;
