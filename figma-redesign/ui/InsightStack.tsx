import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA_METRICS } from "../data";
import { CoachCue } from "./CoachCue";
export function InsightStack({ limit = 4, onPress }: { limit?: number; onPress?: (id: string) => void }) { return <View style={styles.wrap}>{FIGMA_METRICS.slice(0, limit).map((metric, index) => <CoachCue key={metric.id} index={index + 1} title={metric.label} copy={metric.observation} tag={metric.tone === "good" ? "STABLE" : "WATCH"} onPress={() => onPress?.(metric.id)} />)}<Text style={styles.footer}>Each cue is designed to be practiced in isolation before layering changes.</Text></View>; }
const styles = StyleSheet.create({ wrap: { gap: 0 }, footer: { color: FIGMA_METRICS.length ? "#5A6B5B" : "#5A6B5B", fontSize: 8, lineHeight: 13, marginTop: 10 } });
