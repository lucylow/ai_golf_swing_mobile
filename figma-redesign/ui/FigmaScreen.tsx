import React from "react";
import { ScrollView, StyleSheet, View, type ScrollViewProps, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIGMA } from "../theme";

export function FigmaScreen({
  children,
  scroll = true,
  contentContainerStyle,
  style,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  contentContainerStyle?: ScrollViewProps["contentContainerStyle"];
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.root, style]}>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.safe}>
        {scroll ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={styles.flex}>{children}</View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: FIGMA.colors.background },
  safe: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: { padding: FIGMA.spacing.lg, paddingBottom: 34 },
});
