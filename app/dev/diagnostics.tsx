import { useCallback, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { getRecentDiagnostics, clearRecentDiagnostics, type AppDiagnostic } from "@/lib/error-reporting";
import { useColors } from "@/hooks/use-colors";
import { haptic } from "@/lib/ux";
import { filterDiagnostics, formatDiagnosticTimestamp, getDiagnosticAreas, getRuntimeIssueSummary, resolveDiagnosticArea, serializeDiagnosticsForClipboard } from "@/lib/diagnostics";

export default function DiagnosticsScreen() {
  const colors = useColors();
  const [items, setItems] = useState<AppDiagnostic[]>(() => getRecentDiagnostics());
  const [selectedArea, setSelectedArea] = useState("all");
  const [query, setQuery] = useState("");
  const [copyFeedback, setCopyFeedback] = useState("");
  const [isCopying, setIsCopying] = useState(false);
  const filteredItems = filterDiagnostics(items, selectedArea, query);
  const areas = getDiagnosticAreas(items);
  const runtimeIssue = getRuntimeIssueSummary(items);

  const refresh = useCallback(() => {
    const nextItems = getRecentDiagnostics();
    setItems(nextItems);
    setSelectedArea((previousArea) => resolveDiagnosticArea(previousArea, nextItems));
    void haptic.selection();
  }, []);

  const copyDiagnostics = useCallback(async () => {
    if (!items.length || isCopying) return;
    setIsCopying(true);
    try {
      const copied = await Clipboard.setStringAsync(serializeDiagnosticsForClipboard(items));
      setCopyFeedback(copied === false ? "Could not copy diagnostics." : "Sanitized diagnostics copied.");
      void haptic.light();
    } catch (error) {
      setCopyFeedback("Could not copy diagnostics. Try again.");
      void haptic.error();
    } finally {
      setIsCopying(false);
    }
  }, [isCopying, items]);

  const clear = useCallback(() => {
    clearRecentDiagnostics();
    setItems([]);
    setSelectedArea("all");
    setQuery("");
    void haptic.light();
  }, []);

  if (!__DEV__) {
    return (
      <ScreenContainer className="items-center justify-center p-6">
        <Text style={[styles.title, { color: colors.text }]}>Diagnostics unavailable</Text>
        <Text style={[styles.body, { color: colors.muted }]}>This screen is only available in development builds.</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} style={[styles.primaryButton, { backgroundColor: colors.tint }]}>
          <Text style={styles.primaryButtonText}>Go back</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer edges={["top", "left", "right", "bottom"]}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text accessibilityRole="header" style={[styles.title, { color: colors.text }]}>Diagnostics</Text>
          <Text style={[styles.body, { color: colors.muted }]}>Local-only, sanitized failure records. No tokens or personal data are shown.</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Close diagnostics" onPress={() => router.back()} style={({ pressed }) => [styles.closeButton, { borderColor: colors.border }, pressed && styles.pressed]}>
          <Text style={[styles.closeText, { color: colors.text }]}>Close</Text>
        </Pressable>
      </View>

      {runtimeIssue ? <View accessibilityRole="alert" style={[styles.runtimeNotice, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.runtimeTitle, { color: colors.text }]}>{runtimeIssue.title}</Text><Text style={[styles.runtimeOwner, { color: colors.muted }]}>Source: {runtimeIssue.owner}</Text><Text style={[styles.runtimeBody, { color: colors.muted }]}>{runtimeIssue.guidance}</Text></View> : null}

      <View style={styles.actions}>
          <Text accessibilityRole="text" accessibilityLiveRegion="polite" style={[styles.count, { color: colors.muted }]}>{filteredItems.length} of {items.length} recent records{selectedArea === "all" ? "" : ` · ${selectedArea}`}</Text>
        <View style={styles.actionGroup}><Pressable accessibilityRole="button" accessibilityLabel={isCopying ? "Copying sanitized diagnostics" : "Copy sanitized diagnostics"} accessibilityState={{ busy: isCopying, disabled: isCopying || !items.length }} disabled={isCopying || !items.length} onPress={() => { void copyDiagnostics(); }} style={({ pressed }) => [styles.secondaryButton, { borderColor: colors.border }, pressed && styles.pressed]}><Text style={[styles.secondaryButtonText, { color: colors.text }]}>{isCopying ? "Copying…" : "Copy"}</Text></Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Refresh diagnostics" onPress={refresh} style={({ pressed }) => [styles.secondaryButton, { borderColor: colors.border }, pressed && styles.pressed]}>
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Refresh</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Clear diagnostics" onPress={() => { if (!items.length) return; Alert.alert("Clear diagnostics?", "This removes all sanitized failure records from this development session.", [{ text: "Cancel", style: "cancel" }, { text: "Clear", style: "destructive", onPress: clear }]); }} style={({ pressed }) => [styles.secondaryButton, { borderColor: colors.border }, pressed && styles.pressed]}>
            <Text style={[styles.secondaryButtonText, { color: colors.error }]}>Clear</Text>
          </Pressable>
        </View>
      </View>
      {copyFeedback ? <Text accessibilityRole="text" accessibilityLiveRegion="polite" style={[styles.copyFeedback, { color: copyFeedback.startsWith("Sanitized") ? colors.tint : colors.error }]}>{copyFeedback}</Text> : null}

      <TextInput accessibilityLabel="Search diagnostics" placeholder="Search area or error type" placeholderTextColor={colors.muted} value={query} onChangeText={setQuery} autoCapitalize="none" autoCorrect={false} clearButtonMode="while-editing" style={[styles.searchInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]} />

      <FlatList
        horizontal
        data={areas}
        keyExtractor={(area) => area}
        showsHorizontalScrollIndicator={false}
        accessibilityRole="radiogroup"
        accessibilityLabel="Filter diagnostics by area"
        contentContainerStyle={styles.areaFilters}
        renderItem={({ item: area }) => (
          <Pressable accessibilityRole="radio" accessibilityState={{ selected: selectedArea === area }} accessibilityLabel={area === "all" ? "Show all diagnostic areas" : `Show ${area} diagnostics`} onPress={() => { setSelectedArea(area); void haptic.selection(); }} style={({ pressed }) => [styles.areaChip, { borderColor: colors.border, backgroundColor: selectedArea === area ? colors.tint : colors.surface }, pressed && styles.pressed]}>
            <Text style={[styles.areaChipText, { color: selectedArea === area ? colors.surface : colors.text }]}>{area === "all" ? "All areas" : area}</Text>
          </Pressable>
        )}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => `${item.timestamp}-${item.area}-${index}`}
        contentContainerStyle={filteredItems.length === 0 ? styles.emptyContent : styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.muted }]}>{items.length === 0 ? "No sanitized failures recorded in this session." : query.trim() ? `No diagnostics match “${query.trim()}”.` : `No diagnostics recorded for ${selectedArea}.`}</Text>
            {items.length > 0 && selectedArea !== "all" ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Show all diagnostic areas" onPress={() => { setSelectedArea("all"); void haptic.selection(); }} style={({ pressed }) => [styles.emptyAction, { borderColor: colors.border }, pressed && styles.pressed]}>
                <Text style={[styles.emptyActionText, { color: colors.text }]}>Show all areas</Text>
              </Pressable>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <View accessible accessibilityLabel={`${item.area}, ${item.errorType}, ${formatDiagnosticTimestamp(item.timestamp)}`} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.cardTopline}>
              <Text style={[styles.area, { color: colors.text }]}>{item.area}</Text>
              <Text style={[styles.timestamp, { color: colors.muted }]}>{formatDiagnosticTimestamp(item.timestamp)}</Text>
            </View>
            <Text style={[styles.errorType, { color: colors.tint }]}>{item.errorType}</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 16, padding: 20, paddingBottom: 12 },
  headerCopy: { flex: 1, gap: 6 },
  title: { fontSize: 28, fontWeight: "800", lineHeight: 34 },
  body: { fontSize: 14, lineHeight: 20 },
  closeButton: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  closeText: { fontSize: 14, fontWeight: "700" },
  runtimeNotice: { marginHorizontal: 20, marginBottom: 4, borderWidth: 1, borderRadius: 14, padding: 12, gap: 4 },
  runtimeTitle: { fontSize: 13, fontWeight: "800" },
  runtimeOwner: { fontSize: 10, fontWeight: "700" },
  runtimeBody: { fontSize: 12, lineHeight: 17 },
  actions: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, paddingHorizontal: 20, paddingVertical: 12 },
  copyFeedback: { marginHorizontal: 20, marginBottom: 4, fontSize: 12, fontWeight: "700" },
  searchInput: { marginHorizontal: 20, marginBottom: 4, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  areaFilters: { gap: 8, paddingHorizontal: 20, paddingBottom: 8 },
  areaChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  areaChipText: { fontSize: 12, fontWeight: "700" },
  count: { fontSize: 13 },
  actionGroup: { flexDirection: "row", gap: 8 },
  secondaryButton: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  secondaryButtonText: { fontSize: 13, fontWeight: "700" },
  primaryButton: { marginTop: 20, borderRadius: 999, paddingHorizontal: 18, paddingVertical: 12 },
  primaryButtonText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  listContent: { gap: 10, paddingHorizontal: 20, paddingBottom: 24 },
  emptyContent: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  emptyState: { alignItems: "center", gap: 14 },
  emptyText: { fontSize: 15, textAlign: "center" },
  emptyAction: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  emptyActionText: { fontSize: 13, fontWeight: "700" },
  card: { borderWidth: 1, borderRadius: 16, padding: 14, gap: 8 },
  cardTopline: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  area: { flex: 1, fontSize: 15, fontWeight: "800" },
  timestamp: { fontSize: 12 },
  errorType: { fontSize: 14, fontWeight: "600" },
  pressed: { opacity: 0.7 },
});

