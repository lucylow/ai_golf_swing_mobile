import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { FIGMA } from "../theme";

export function ProgressChart({ values, labels = ["EARLY", "MID", "RECENT"], height = 132 }: { values: number[]; labels?: string[]; height?: number }) {
  const safe = values.length > 1 ? values : [values[0] ?? 0, values[0] ?? 0, values[0] ?? 0];
  const W = 320;
  const H = height;
  const pL = 24;
  const pR = 8;
  const pT = 10;
  const pB = 22;
  const min = Math.min(...safe) - 3;
  const max = Math.max(...safe) + 3;
  const spread = Math.max(1, max - min);
  const xs = safe.map((_, i) => pL + (i / Math.max(1, safe.length - 1)) * (W - pL - pR));
  const ys = safe.map((v) => pT + (1 - (v - min) / spread) * (H - pT - pB));
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(" ");
  return (
    <View style={styles.wrap}>
      <View style={styles.axisLabels}><Text style={styles.axis}>HIGH</Text><Text style={styles.axis}>MID</Text><Text style={styles.axis}>LOW</Text></View>
      <Svg width="100%" height={height} viewBox={`0 0 ${W} ${H}`}>
        {[0.2, 0.5, 0.8].map((ratio) => { const y = pT + ratio * (H - pT - pB); return <Line key={ratio} x1={pL} y1={y} x2={W - pR} y2={y} stroke={FIGMA.colors.border} strokeWidth={1} />; })}
        <Path d={path} fill="none" stroke={FIGMA.colors.lime} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        {xs.map((x, i) => <Circle key={i} cx={x} cy={ys[i]} r={i === xs.length - 1 ? 4 : 3} fill={FIGMA.colors.lime} opacity={i === xs.length - 1 ? 1 : 0.6} />)}
      </Svg>
      <View style={styles.bottomLabels}>{labels.map((label) => <Text key={label} style={styles.axis}>{label}</Text>)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "relative" },
  axisLabels: { position: "absolute", left: 0, top: 11, bottom: 24, justifyContent: "space-between", zIndex: 2 },
  axis: { color: FIGMA.colors.mutedStrong, fontSize: 8, fontWeight: "800" },
  bottomLabels: { paddingLeft: 24, paddingRight: 8, flexDirection: "row", justifyContent: "space-between", marginTop: -3 },
});
