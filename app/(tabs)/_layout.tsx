import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FIGMA } from "@/figma-redesign/theme";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 10 : Math.max(insets.bottom, 8);
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: FIGMA.colors.lime,
      tabBarInactiveTintColor: "#3D4E3D",
      tabBarButton: HapticTab,
      tabBarLabelStyle: { fontSize: 8, fontWeight: "800", letterSpacing: 0.5 },
      tabBarStyle: { paddingTop: 5, paddingBottom: bottomPadding, height: 58 + bottomPadding, backgroundColor: FIGMA.colors.background, borderTopColor: FIGMA.colors.border, borderTopWidth: StyleSheet.hairlineWidth },
      sceneStyle: { backgroundColor: FIGMA.colors.background },
    }}>
      <Tabs.Screen name="index" options={{ title: "HOME", tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={21} color={color} /> }} />
      <Tabs.Screen name="analyze" options={{ title: "ANALYZE", tabBarIcon: ({ color }) => <IconSymbol name="camera.fill" size={21} color={color} /> }} />
      <Tabs.Screen name="library" options={{ title: "LIBRARY", tabBarIcon: ({ color }) => <IconSymbol name="books.vertical.fill" size={21} color={color} /> }} />
      <Tabs.Screen name="progress" options={{ title: "PROGRESS", tabBarIcon: ({ color }) => <IconSymbol name="chart.bar.fill" size={21} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "PROFILE", tabBarIcon: ({ color }) => <IconSymbol name="person.crop.circle.fill" size={21} color={color} /> }} />
    </Tabs>
  );
}
