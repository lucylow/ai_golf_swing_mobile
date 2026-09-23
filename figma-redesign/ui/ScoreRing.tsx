import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { usePulseScale } from "../animations";
import { FIGMA } from "../theme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function ScoreRing({ score, size = 96, label = "/100", pulse = false }: { score: number; size?: number; label?: string; pulse?: boolean }) {
  const scale = usePulseScale(pulse);
  const stroke = 8;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  return (
    <Animated.View style={{ transform: [{ scale }], width: size, height: size }}>
      <View accessible accessibilityRole="progressbar" accessibilityLabel={`Swing score ${score} out of 100`} accessibilityValue={{ min: 0, max: 100, now: score }} style={[StyleSheet.absoluteFillObject, styles.center]}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          <Circle cx="50" cy="50" r={radius} fill="none" stroke={FIGMA.colors.border} strokeWidth={stroke} />
          <Circle cx="50" cy="50" r={radius} fill="none" stroke={FIGMA.colors.lime} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${(circumference * score) / 100} ${circumference}`} transform="rotate(-90 50 50)" />
        </Svg>
        <View style={styles.centerText}>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
  centerText: { position: "absolute", alignItems: "center", justifyContent: "center" },
  score: { color: FIGMA.colors.white, fontSize: 27, fontWeight: "900", lineHeight: 30 },
  label: { color: FIGMA.colors.muted, fontSize: 8, fontWeight: "800", letterSpacing: 0.6 },
});
