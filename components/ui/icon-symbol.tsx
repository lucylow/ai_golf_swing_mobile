import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  "house.fill": "home",
  "camera.fill": "videocam",
  "books.vertical.fill": "library-books",
  "chart.bar.fill": "bar-chart",
  "person.crop.circle.fill": "account-circle",
  "play.fill": "play-arrow",
  "plus": "add",
  "chevron.right": "chevron-right",
  "chevron.down": "expand-more",
  "magnifyingglass": "search",
  "slider.horizontal.3": "tune",
  "target": "track-changes",
  "flame.fill": "local-fire-department",
  "bolt.fill": "bolt",
  "checkmark.circle.fill": "check-circle",
  "arrow.up.right": "north-east",
  "gearshape.fill": "settings",
  "bell.fill": "notifications-none",
  "questionmark.circle": "help-outline",
  "square.and.arrow.up": "ios-share",
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
