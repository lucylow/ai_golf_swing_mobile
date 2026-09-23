import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FigmaTabButton } from "./FigmaTabButton";
import { FIGMA } from "../theme";

export type FigmaTab = "home" | "practice" | "analyze" | "progress" | "profile";

export function BottomActions({ active }: { active: FigmaTab }) {
  return <View style={styles.bar}><FigmaTabButton active={active === "home"} label="HOME" icon="house.fill" href="/(tabs)" /><FigmaTabButton active={active === "practice"} label="PRACTICE" icon="bolt.fill" href="/drill-library" /><FigmaTabButton active={active === "analyze"} label="ANALYZE" icon="chart.bar.fill" href="/(tabs)/analyze" /><FigmaTabButton active={active === "progress"} label="PROGRESS" icon="chart.bar.fill" href="/(tabs)/progress" /><FigmaTabButton active={active === "profile"} label="PROFILE" icon="person.crop.circle.fill" href="/(tabs)/profile" /></View>;
}

const styles = StyleSheet.create({ bar: { borderTopWidth: 1, borderTopColor: FIGMA.colors.border, minHeight: 66, paddingBottom: 10, paddingTop: 5, backgroundColor: FIGMA.colors.background, flexDirection: "row", justifyContent: "space-around" } });
