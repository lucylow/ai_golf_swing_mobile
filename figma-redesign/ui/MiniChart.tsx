import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { FIGMA } from "../theme";

export function MiniChart({ values, width = 150, height = 48 }: { values: number[]; width?: number; height?: number }) {
  const safe = values.length > 1 ? values : [0, ...(values.length ? values : [0])];
  const min = Math.min(...safe);
  const max = Math.max(...safe);
  const spread = Math.max(1, max - min);
  const pad = 4;
  const usableW = width - pad * 2;
  const usableH = height - pad * 2;
  const pts = safe.map((value, index) => ({
    x: pad + (index / Math.max(1, safe.length - 1)) * usableW,
    y: pad + (1 - (value - min) / spread) * usableH,
  }));
  const path = pts.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Line x1={0} y1={height - 1} x2={width} y2={height - 1} stroke={FIGMA.colors.border} strokeWidth={1} />
        <Path d={path} fill="none" stroke={FIGMA.colors.lime} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => <Circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 3.5 : 2} fill={FIGMA.colors.lime} opacity={i === pts.length - 1 ? 1 : 0.35} />)}
      </Svg>
    </View>
  );
}

export function SparkBar({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return <View style={sparkStyles.row}>{values.map((value, index) => <View key={`${value}-${index}`} style={[sparkStyles.bar, { height: Math.max(4, (value / max) * 26), opacity: index === values.length - 1 ? 1 : 0.45 }]} />)}</View>;
}

const sparkStyles = StyleSheet.create({
  row: { height: 30, flexDirection: "row", alignItems: "flex-end", gap: 4 },
  bar: { width: 5, borderRadius: 3, backgroundColor: FIGMA.colors.lime },
});
