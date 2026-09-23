import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { Toast } from "@/components/ui/feedback";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useGolfAppState } from "@/lib/golf-app-state";
import { filterSessions, filterSessionsByDate, libraryDateRangeLabel, libraryFilterLabel, nextLibraryDateRange, type LibraryFilter } from "@/lib/library-filters";

import { FIGMA } from "../theme";
import { StaticCard } from "../ui/GlassCard";
import { TopBar } from "../ui/TopBar";
import { StatusChip } from "../ui/Chip";
import { SwingThumbnail } from "../ui/SwingThumbnail";

const FILTERS: { label: string; value: LibraryFilter }[] = [
  { label: "ALL", value: "all" },
  { label: "NEEDS ACTION", value: "attention" },
  { label: "TOP SCORES", value: "top" },
];

export default function FigmaLibraryScreen() {
  const router = useRouter();
  const { sessions, preferredLibraryFilter, preferredLibraryDateRange, updateLibraryFilter, updateLibraryDateRange } = useGolfAppState();
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const filtered = useMemo(() => {
    const searched = sessions.filter((session) => `${session.club} ${session.label} ${session.date}`.toLowerCase().includes(query.toLowerCase().trim()));
    return filterSessions(filterSessionsByDate(searched, preferredLibraryDateRange), preferredLibraryFilter);
  }, [preferredLibraryDateRange, preferredLibraryFilter, query, sessions]);

  const saveFilter = async (filter: LibraryFilter) => {
    if (isSaving || filter === preferredLibraryFilter) return;
    setIsSaving(true);
    try {
      await updateLibraryFilter(filter);
    } catch {
      setToast("Could not save the Library filter. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const cycleDateRange = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await updateLibraryDateRange(nextLibraryDateRange(preferredLibraryDateRange));
    } catch {
      setToast("Could not save the date range. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]">
      <View style={styles.container}>
        <TopBar title="SWING LIBRARY" subtitle="EVERY REP IS DATA" />
        <Text style={styles.title}>Practice archive</Text>
        <Text style={styles.subtitle}>Search your locally saved sessions and open the full swing story.</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Open expanded session timeline" onPress={() => router.push("/session-history-v2")} style={styles.timelineLink}><Text style={styles.timelineLinkText}>OPEN EXPANDED SESSION TIMELINE</Text><IconSymbol name="arrow.up.right" size={13} color={FIGMA.colors.lime} /></Pressable>
        <View style={styles.search}>
          <IconSymbol name="magnifyingglass" size={18} color={FIGMA.colors.muted} />
          <TextInput accessibilityLabel="Search swing library" value={query} onChangeText={setQuery} placeholder="Search by club or session" placeholderTextColor={FIGMA.colors.muted} style={styles.input} />
        </View>
        <View style={styles.filterRow}>
          <View style={styles.filters}>
            {FILTERS.map((item) => <StatusChip key={item.value} label={item.label} tone={item.value === "attention" ? "high" : item.value === "top" ? "good" : "neutral"} active={preferredLibraryFilter === item.value} onPress={() => { void saveFilter(item.value); }} />)}
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel={`Change Library date range, currently ${libraryDateRangeLabel(preferredLibraryDateRange)}`} onPress={() => { void cycleDateRange(); }} style={styles.dateFilter}>
            <Text style={styles.dateFilterText}>{libraryDateRangeLabel(preferredLibraryDateRange).toUpperCase()}</Text>
            <IconSymbol name="chevron.down" size={12} color={FIGMA.colors.lime} />
          </Pressable>
        </View>
        <View style={styles.summary}><Text style={styles.count}>{filtered.length} {filtered.length === 1 ? "session" : "sessions"}</Text><Text style={styles.summaryCopy}>{libraryFilterLabel(preferredLibraryFilter)} · {isSaving ? "Saving…" : libraryDateRangeLabel(preferredLibraryDateRange)}</Text></View>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <StaticCard style={styles.sessionCard}>
              <SwingThumbnail compact club={item.club} date={item.date.split(",")[0]} score={item.score} accent={item.accent} onPress={() => router.push({ pathname: "/swing-detail", params: { id: item.id } })} />
              <Pressable accessibilityRole="button" accessibilityLabel={`Open ${item.club} session`} onPress={() => router.push({ pathname: "/swing-detail", params: { id: item.id } })} style={styles.sessionCopy}>
                <Text style={styles.sessionLabel}>{item.label.toUpperCase()}</Text>
                <Text style={styles.sessionClub}>{item.club}</Text>
                <Text style={styles.sessionMeta}>{item.date} · {item.duration}</Text>
                <View style={styles.metricRow}>{item.metrics.slice(0, 3).map((metric) => <View key={metric.label} style={styles.metricPill}><Text style={styles.metricPillLabel}>{metric.label}</Text><Text style={styles.metricPillValue}>{metric.value}</Text></View>)}</View>
              </Pressable>
            </StaticCard>
          )}
          ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>No swings found</Text><Text style={styles.emptyCopy}>Try a different search or saved filter, or record a new swing.</Text></View>}
        />
      </View>
      <Toast visible={Boolean(toast)} message={toast} tone="error" onHide={() => setToast("")} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 13 },
  title: { color: FIGMA.colors.white, fontSize: 26, fontWeight: "900", marginTop: 5 },
  subtitle: { color: FIGMA.colors.muted, fontSize: 11, lineHeight: 16, marginTop: 3 },
  timelineLink: { alignSelf: "flex-start", flexDirection: "row", gap: 5, alignItems: "center", borderRadius: 99, borderWidth: 1, borderColor: "rgba(170,255,0,0.22)", backgroundColor: "rgba(170,255,0,0.05)", paddingHorizontal: 9, paddingVertical: 6, marginTop: 9 },
  timelineLinkText: { color: FIGMA.colors.lime, fontSize: 8, fontWeight: "900", letterSpacing: 0.55 },
  search: { minHeight: 44, backgroundColor: FIGMA.colors.surface, borderWidth: 1, borderColor: FIGMA.colors.border, borderRadius: 13, paddingHorizontal: 12, marginTop: 12, flexDirection: "row", alignItems: "center", gap: 8 },
  input: { flex: 1, color: FIGMA.colors.white, fontSize: 11 },
  filterRow: { marginTop: 10, gap: 8 },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  dateFilter: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: FIGMA.colors.surfaceQuiet, borderColor: FIGMA.colors.border, borderWidth: 1, borderRadius: 99, paddingHorizontal: 9, paddingVertical: 6 },
  dateFilterText: { color: FIGMA.colors.lime, fontSize: 8, fontWeight: "900", letterSpacing: 0.45 },
  summary: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
  count: { color: FIGMA.colors.white, fontSize: 11, fontWeight: "800" },
  summaryCopy: { color: FIGMA.colors.mutedStrong, fontSize: 9, textAlign: "right" },
  list: { gap: 8, paddingBottom: 32 },
  sessionCard: { flexDirection: "row", padding: 8, gap: 10 },
  sessionCopy: { flex: 1, justifyContent: "center" },
  sessionLabel: { color: FIGMA.colors.mutedStrong, fontSize: 8, fontWeight: "800", letterSpacing: 0.6 },
  sessionClub: { color: FIGMA.colors.white, fontSize: 14, fontWeight: "900", marginTop: 2 },
  sessionMeta: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 2 },
  metricRow: { flexDirection: "row", gap: 5, marginTop: 7 },
  metricPill: { backgroundColor: FIGMA.colors.surfaceQuiet, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 5 },
  metricPillLabel: { color: FIGMA.colors.mutedStrong, fontSize: 7, fontWeight: "800" },
  metricPillValue: { color: FIGMA.colors.lime, fontSize: 8, fontWeight: "900", marginTop: 1 },
  empty: { alignItems: "center", padding: 40 },
  emptyTitle: { color: FIGMA.colors.white, fontSize: 16, fontWeight: "900" },
  emptyCopy: { color: FIGMA.colors.muted, fontSize: 10, marginTop: 4, textAlign: "center" },
});
