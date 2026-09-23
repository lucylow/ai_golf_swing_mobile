import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { SESSION_HISTORY } from "../data";
import { TopBar } from "../ui/TopBar";
import { FilterPills } from "../ui/FilterPills";
import { DrillRow } from "../ui/DrillRow";
import { EmptyState } from "../ui/EmptyState";

const FILTERS = ["ALL", "DRIVER", "7 IRON", "WEDGE"] as const;
export default function FigmaHistoryScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");
  const filtered = useMemo(() => filter === "ALL" ? SESSION_HISTORY : SESSION_HISTORY.filter((s) => s.club.toUpperCase() === filter), [filter]);
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><FlatList data={filtered} keyExtractor={(item) => item.id} contentContainerStyle={styles.content} ListHeaderComponent={<View style={styles.header}><TopBar title="SWING HISTORY" subtitle="Every session, one place" /><FilterPills values={FILTERS} value={filter} onChange={setFilter} /></View>} renderItem={({ item }) => <View style={styles.row}><DrillRow title={`${item.club} · ${item.date.split(",")[0]}`} subtitle={`${item.swings} swings · ${item.duration}`} meta={`${item.score}/100`} badge={item.focus} onPress={() => router.push({ pathname: "/swing-detail", params: { id: item.id } })} /></View>} ListEmptyComponent={<EmptyState title="No sessions yet" copy="Record or import a swing to start building your practice history." action="RECORD SWING" onPress={() => router.push("/capture")} />} showsVerticalScrollIndicator={false} /></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { padding: 15, gap: 10, paddingBottom: 30 }, header: { gap: 10 }, row: { backgroundColor: FIGMA.colors.surface, borderRadius: 14, paddingHorizontal: 12 } });
