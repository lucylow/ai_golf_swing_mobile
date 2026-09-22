import { Alert, ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import * as Clipboard from "expo-clipboard";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { colors, drills } from "@/lib/golf-data";
import { useGolfAppState } from "@/lib/golf-app-state";
import { derivePracticeHistory, filterPracticeHistory, practiceHistoryClearCopy, practiceHistoryRangeLabel, practiceHistoryStateCopy, serializePracticeHistory, type PracticeHistoryItem, type PracticeHistoryRange } from "@/lib/home-statistics";
import { formatLastPracticedLabel } from "@/lib/drill-practice-meta";
import { Toast } from "@/components/ui/feedback";
import { sharePracticeHistorySummary, practiceHistoryShareButtonLabel, shouldShowPracticeHistoryShare, shouldUsePracticeHistoryClipboardFallback } from "@/lib/practice-history-share";
import { Platform } from "react-native";

export default function PracticeHistoryScreen() {
  const router = useRouter();
  const { lastPracticedDrills, clearPracticeHistory, isSaving, hydrated, preferredPracticeHistoryRange, preferredPracticeHistoryQuery, updatePracticeHistoryRange, updatePracticeHistoryQuery, resetPracticeHistoryFilters } = useGolfAppState();
  const [toast, setToast] = useState("");
  const [toastTone, setToastTone] = useState<"success" | "error">("success");
  const [isCopying, setIsCopying] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [query, setQuery] = useState("");
  const [range, setRange] = useState<PracticeHistoryRange>("all");
  useEffect(() => {
    if (!hydrated) return;
    setRange(preferredPracticeHistoryRange);
    setQuery(preferredPracticeHistoryQuery);
  }, [hydrated, preferredPracticeHistoryRange, preferredPracticeHistoryQuery]);
  const allHistory = derivePracticeHistory(lastPracticedDrills, drills, new Date(), 50);
  const history = useMemo(() => filterPracticeHistory(allHistory, range, query), [allHistory, range, query]);
  const emptyCopy = practiceHistoryStateCopy(false);
  const clearCopy = practiceHistoryClearCopy();
  const exportPayload = serializePracticeHistory(allHistory);
  const handleCopyHistory = async () => {
    if (!allHistory.length || isCopying || isSaving) return;
    setIsCopying(true);
    try {
      const copied = await Clipboard.setStringAsync(exportPayload);
      if (copied === false) throw new Error("clipboard-write-failed");
      setToastTone("success");
      setToast("Practice history copied");
    } catch {
      setToastTone("error");
      setToast("Could not copy practice history. Please try again.");
    } finally {
      setIsCopying(false);
    }
  };
  const handleShareHistory = async () => {
    if (!allHistory.length || isSharing || isCopying || isSaving) return;
    setIsSharing(true);
    try {
      const result = await sharePracticeHistorySummary(exportPayload);
      if (shouldUsePracticeHistoryClipboardFallback(result)) {
        const copied = await Clipboard.setStringAsync(exportPayload);
        if (copied === false) throw new Error("clipboard-fallback-failed");
        setToastTone("success");
        setToast("Practice history copied instead");
        return;
      }
      setToastTone("success");
      setToast(result.message);
    } catch {
      setToastTone("error");
      setToast("Could not share practice history. Use Copy to try again.");
    } finally {
      setIsSharing(false);
    }
  };

  const handleResetFilters = async () => {
    if ((range === "all" && !query) || isSaving) return;
    try {
      await resetPracticeHistoryFilters();
      setRange("all");
      setQuery("");
      setToastTone("success");
      setToast("Practice filters reset");
    } catch {
      setToastTone("error");
      setToast("Could not reset practice filters. Please try again.");
    }
  };
  const handleClearHistory = () => {
    if (!allHistory.length || isSaving) return;
    Alert.alert(clearCopy.title, clearCopy.message, [
      { text: clearCopy.cancel, style: "cancel" },
      { text: clearCopy.confirm, style: "destructive", onPress: () => { void clearPracticeHistory().then(() => { setToastTone("success"); setToast("Practice history cleared"); }).catch(() => { setToastTone("error"); setToast("Could not clear practice history. Please try again."); }); } },
    ]);
  };

  const renderItem = ({ item }: { item: PracticeHistoryItem }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${item.title}, ${formatLastPracticedLabel(item.timestamp)}`}
      onPress={() => router.push({ pathname: "/drill-detail", params: { drillId: item.drillId } })}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      <View style={styles.rowIcon}>
        <IconSymbol name="checkmark.circle.fill" size={20} color={colors.fairway} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{item.title}</Text>
        <Text style={styles.rowDate}>{formatLastPracticedLabel(item.timestamp)}</Text>
      </View>
      <IconSymbol name="chevron.right" size={18} color={colors.muted} />
    </Pressable>
  );

  return (
    <ScreenContainer containerClassName="bg-[#F5F7F2]" safeAreaClassName="bg-[#F5F7F2]" edges={["top", "left", "right", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.65 }]}>
            <IconSymbol name="chevron.left" size={22} color={colors.ink} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.kicker}>LOCAL COACHING</Text>
            <Text accessibilityRole="header" style={styles.title}>Practice history</Text>
          </View>
        </View>
          <View style={styles.subtitleRow}><Text style={styles.subtitle}>Review the drills you have practiced on this device.</Text>{allHistory.length ? <View style={styles.actionGroup}>{shouldShowPracticeHistoryShare(Platform.OS) ? <Pressable accessibilityRole="button" accessibilityLabel={practiceHistoryShareButtonLabel(isSharing)} accessibilityState={{ disabled: isSaving || isCopying || isSharing, busy: isSharing }} disabled={isSaving || isCopying || isSharing} onPress={() => { void handleShareHistory(); }} style={({ pressed }) => [styles.clearButton, pressed && { opacity: 0.7 }]}>{isSharing ? <ActivityIndicator accessibilityLabel="Sharing practice history" size="small" color={colors.fairway} /> : <Text style={styles.copyText}>Share</Text>}</Pressable> : null}<Pressable accessibilityRole="button" accessibilityLabel={isCopying ? "Copying practice history" : "Copy practice history"} accessibilityState={{ disabled: isSaving || isCopying || isSharing, busy: isCopying }} disabled={isSaving || isCopying || isSharing} onPress={() => { void handleCopyHistory(); }} style={({ pressed }) => [styles.clearButton, pressed && { opacity: 0.7 }]}>{isCopying ? <ActivityIndicator accessibilityLabel="Copying practice history" size="small" color={colors.fairway} /> : <Text style={styles.copyText}>Copy</Text>}</Pressable></View> : null}{allHistory.length ? <Pressable accessibilityRole="button" accessibilityLabel="Clear practice history" accessibilityState={{ disabled: isSaving || isSharing || isCopying, busy: isSaving }} disabled={isSaving || isSharing || isCopying} onPress={handleClearHistory} style={({ pressed }) => [styles.clearButton, pressed && { opacity: 0.7 }]}>{isSaving ? <ActivityIndicator accessibilityLabel="Clearing practice history" size="small" color={colors.coral} /> : <Text style={styles.clearText}>Clear</Text>}</Pressable> : null}</View>
        <View style={styles.filters}>
          <TextInput accessibilityLabel="Search practice history" placeholder="Search drills" placeholderTextColor={colors.muted} value={query} onChangeText={setQuery} onEndEditing={() => { void updatePracticeHistoryQuery(query); }} style={styles.searchInput} returnKeyType="search" />
          <View style={styles.filterActions}><Pressable accessibilityRole="button" accessibilityLabel={`Practice history date range, ${practiceHistoryRangeLabel(range)}`} onPress={() => { const nextRange = range === "all" ? "week" : range === "week" ? "month" : "all"; setRange(nextRange); void updatePracticeHistoryRange(nextRange); }} style={({ pressed }) => [styles.rangeButton, pressed && { opacity: 0.7 }]}><Text style={styles.rangeText}>{practiceHistoryRangeLabel(range)}</Text><IconSymbol name="chevron.down" size={16} color={colors.ink} /></Pressable>{range !== "all" || query ? <Pressable accessibilityRole="button" accessibilityLabel="Reset practice history filters" accessibilityState={{ disabled: isSaving, busy: isSaving }} disabled={isSaving} onPress={() => { void handleResetFilters(); }} style={({ pressed }) => [styles.resetButton, pressed && { opacity: 0.7 }]}><Text style={styles.resetText}>Reset</Text></Pressable> : null}</View>
        </View>
        <FlatList
          data={history}
          keyExtractor={(item) => item.drillId}
          renderItem={renderItem}
          contentContainerStyle={history.length ? styles.listContent : styles.emptyContent}
          ListEmptyComponent={<View accessible accessibilityRole="text" accessibilityLabel={allHistory.length ? "No practice history matches the selected filters" : `${emptyCopy.title}. ${emptyCopy.body}`} style={styles.emptyCard}><View style={styles.emptyIcon}><IconSymbol name="figure.golf" size={24} color={colors.fairway} /></View><Text style={styles.emptyTitle}>{allHistory.length ? "No matching practice" : emptyCopy.title}</Text><Text style={styles.emptyBody}>{allHistory.length ? "Try a different drill name or date range." : emptyCopy.body}</Text></View>}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Toast visible={Boolean(toast)} message={toast} tone={toastTone} onHide={() => setToast("")} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  backButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  headerCopy: { flex: 1 },
  kicker: { color: colors.muted, fontSize: 10, fontWeight: "800", letterSpacing: 1.1 },
  title: { color: colors.ink, fontSize: 28, fontWeight: "900", marginTop: 3 },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 10, marginBottom: 16, flex: 1 }, subtitleRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 }, actionGroup: { flexDirection: "row", alignItems: "center", gap: 2 }, clearButton: { paddingHorizontal: 8, paddingVertical: 6 }, clearText: { color: colors.coral, fontSize: 11, fontWeight: "800" }, copyText: { color: colors.fairway, fontSize: 11, fontWeight: "800" },
  filters: { gap: 8, marginBottom: 14 }, searchInput: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, color: colors.ink, fontSize: 13 }, filterActions: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, rangeButton: { flexDirection: "row", alignItems: "center", gap: 5, paddingVertical: 4 }, rangeText: { color: colors.fairway, fontSize: 11, fontWeight: "800" }, resetButton: { paddingVertical: 4, paddingHorizontal: 6 }, resetText: { color: colors.coral, fontSize: 11, fontWeight: "800" }, listContent: { gap: 10, paddingBottom: 24 },
  emptyContent: { flexGrow: 1, justifyContent: "center", paddingBottom: 80 },
  row: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 14, flexDirection: "row", alignItems: "center", gap: 11 },
  rowIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: "#E6F1EC", alignItems: "center", justifyContent: "center" },
  rowCopy: { flex: 1, gap: 3 },
  rowTitle: { color: colors.ink, fontSize: 14, fontWeight: "800" },
  rowDate: { color: colors.muted, fontSize: 11 },
  emptyCard: { backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 22, alignItems: "center" },
  emptyIcon: { width: 52, height: 52, borderRadius: 18, backgroundColor: "#E6F1EC", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  emptyTitle: { color: colors.ink, fontSize: 17, fontWeight: "900", textAlign: "center" },
  emptyBody: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: "center", marginTop: 7 },
});

