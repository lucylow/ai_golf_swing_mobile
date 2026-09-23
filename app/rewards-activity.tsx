import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { reportAppError } from "@/lib/error-reporting";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { colors } from "@/lib/golf-data";
import { useMonetization } from "@/lib/monetization-state";
import { formatRewardHistoryAccessibility, formatRewardHistoryDate, formatRewardHistoryMetadata, formatRewardHistoryTimestamp, getRewardsHistory } from "@/lib/rewards-history";
import { formatClearRewardsHistoryMessage } from "@/lib/rewards-history-feedback";
import { runSafely } from "@/lib/safe-feedback";

export default function RewardsActivityScreen() {
  const router = useRouter();
  const { events, clearRewardHistory } = useMonetization();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackTone, setFeedbackTone] = useState<"success" | "error">("success");
  const [isClearing, setIsClearing] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const rewardsHistory = getRewardsHistory(events, 50);

  const clearHistoryWithFeedback = async () => { if (isClearing) return; setIsClearing(true); await runSafely(async () => { await clearRewardHistory(); setFeedbackTone("success"); setFeedback(formatClearRewardsHistoryMessage("success")); }, (error) => { reportAppError("rewards-history-clear", error); setFeedbackTone("error"); setFeedback(formatClearRewardsHistoryMessage("error")); }); setIsClearing(false); };

  const confirmClearHistory = () => {
    Alert.alert(
      "Clear rewards activity?",
      "This removes local promo, referral, and analysis-credit activity. Your current promo and referral settings will stay unchanged.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear activity",
          style: "destructive",
          onPress: () => {
            void clearHistoryWithFeedback();
          },
        },
      ],
    );
  };

  return (
    <ScreenContainer containerClassName="bg-[#F5F7F2]" safeAreaClassName="bg-[#F5F7F2]">
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable
          accessibilityLabel="Go back to Profile"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}
        >
          <IconSymbol name="chevron.left" size={18} color={colors.ink} />
          <Text style={styles.backText}>Profile</Text>
        </Pressable>

        <Text style={styles.kicker}>REWARDS & ACCESS</Text>
        <Text style={styles.title}>Rewards activity</Text>
        <Text style={styles.subtitle}>A local timeline of promo, referral, and analysis-credit events.</Text>

        {feedback ? (
          <View accessibilityLiveRegion="polite" accessibilityRole={feedbackTone === "error" ? "alert" : "text"} style={[styles.feedback, feedbackTone === "error" && styles.feedbackError]}>
            <IconSymbol name="checkmark.circle.fill" size={16} color={colors.fairway} />
            <Text style={styles.feedbackText}>{feedback}</Text>
          </View>
        ) : null}

        {rewardsHistory.length ? (
          <View style={styles.list}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>{rewardsHistory.length} local event{rewardsHistory.length === 1 ? "" : "s"}</Text>
              <Pressable
                accessibilityLabel={isClearing ? "Clearing rewards activity" : "Clear rewards activity"}
                accessibilityRole="button"
                accessibilityState={{ disabled: isClearing, busy: isClearing }}
                disabled={isClearing}
                onPress={confirmClearHistory}
                style={({ pressed }) => [styles.clearButton, pressed && styles.pressed, isClearing && styles.disabled]}
              >
                <IconSymbol name="trash" size={14} color={colors.coral} />
                <Text style={styles.clearButtonText}>Clear</Text>
              </Pressable>
            </View>
            {rewardsHistory.map((item) => {
              const isExpanded = expandedId === item.id;
              const metadataLines = formatRewardHistoryMetadata(item.metadata);
              return (
                <View key={item.id} style={styles.eventBlock}>
                  <Pressable
                    accessibilityLabel={`${formatRewardHistoryAccessibility(item)}. ${isExpanded ? "Hide details" : "Show details"}`}
                    accessibilityRole="button"
                    accessibilityState={{ expanded: isExpanded }}
                    onPress={() => setExpandedId(isExpanded ? null : item.id)}
                    style={({ pressed }) => [styles.row, pressed && styles.pressed]}
                  >
                    <View style={[styles.icon, styles[`${item.kind}Icon` as keyof typeof styles] as object]}>
                      <IconSymbol
                        name={item.kind === "promo" ? "ticket.fill" : item.kind === "referral" ? "person.2.fill" : "sparkles"}
                        size={16}
                        color={item.kind === "credits" ? colors.sun : colors.fairway}
                      />
                    </View>
                    <View style={styles.copy}>
                      <Text style={styles.label}>{item.label}</Text>
                      {item.detail ? <Text style={styles.detail}>{item.detail}</Text> : null}
                      <Text style={styles.date}>{formatRewardHistoryDate(item.createdAt)}</Text>
                    </View>
                    <IconSymbol name={isExpanded ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
                  </Pressable>
                  {isExpanded ? (
                    <View accessibilityLiveRegion="polite" style={styles.detailPanel}>
                      <Text style={styles.timestamp}>{formatRewardHistoryTimestamp(item.createdAt)}</Text>
                      {metadataLines.length ? metadataLines.map((line) => <Text key={line} style={styles.metadata}>{line}</Text>) : <Text style={styles.metadata}>No additional metadata</Text>}
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <IconSymbol name="sparkles" size={20} color={colors.sun} />
            </View>
            <Text style={styles.emptyTitle}>{feedback ? "Activity cleared" : "No rewards activity yet"}</Text>
            <Text style={styles.emptyCopy}>
              {feedback ? "New local reward events will appear here as you apply codes or add credits." : "Apply a promo code, record a referral, or add analysis credits to see local activity here."}
            </Text>
            <Pressable
              accessibilityLabel="Return to Profile rewards"
              accessibilityRole="button"
              onPress={() => router.back()}
              style={({ pressed }) => [styles.emptyButton, pressed && styles.pressed]}
            >
              <Text style={styles.emptyButtonText}>Back to Profile</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  back: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", paddingVertical: 6, marginBottom: 28 },
  pressed: { opacity: 0.65 },
  backText: { color: colors.ink, fontSize: 13, fontWeight: "800" },
  kicker: { color: colors.muted, fontSize: 10, fontWeight: "800", letterSpacing: 1.1 },
  title: { color: colors.ink, fontSize: 28, fontWeight: "900", marginTop: 5 },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 7 },
  feedback: { flexDirection: "row", alignItems: "center", gap: 7, backgroundColor: "#E6F1EC", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginTop: 16 },
  feedbackText: { color: colors.fairway, fontSize: 12, fontWeight: "700" }, feedbackError: { backgroundColor: "#FCE9E5" }, disabled: { opacity: 0.5 },
  list: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 14, marginTop: 22 },
  listHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 7 },
  listTitle: { color: colors.muted, fontSize: 10, fontWeight: "800", letterSpacing: 0.7, textTransform: "uppercase" },
  clearButton: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 7, paddingVertical: 5 },
  clearButtonText: { color: colors.coral, fontSize: 11, fontWeight: "800" },
  eventBlock: { borderBottomWidth: 1, borderBottomColor: "#EDF1EE" },
  row: { flexDirection: "row", alignItems: "center", gap: 11, paddingVertical: 11 },
  detailPanel: { marginLeft: 47, paddingBottom: 12, paddingRight: 8 },
  timestamp: { color: colors.ink, fontSize: 10, fontWeight: "800", marginBottom: 4 },
  metadata: { color: colors.muted, fontSize: 10, lineHeight: 16 },
  icon: { width: 36, height: 36, borderRadius: 12, backgroundColor: "#E6F1EC", alignItems: "center", justifyContent: "center" },
  promoIcon: { backgroundColor: "#E7F1EC" },
  referralIcon: { backgroundColor: "#EEF0FA" },
  creditsIcon: { backgroundColor: "#FFF4D8" },
  copy: { flex: 1 },
  label: { color: colors.ink, fontSize: 13, fontWeight: "800" },
  detail: { color: colors.fairway, fontSize: 10, fontWeight: "700", marginTop: 3 },
  date: { color: colors.muted, fontSize: 10, marginTop: 3 },
  empty: { alignItems: "center", backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 24, marginTop: 22 },
  emptyIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: "#345F50", alignItems: "center", justifyContent: "center" },
  emptyTitle: { color: colors.ink, fontSize: 16, fontWeight: "900", marginTop: 14 },
  emptyCopy: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: "center", marginTop: 6 },
  emptyButton: { backgroundColor: colors.fairway, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginTop: 16 },
  emptyButtonText: { color: colors.surface, fontSize: 12, fontWeight: "800" },
});
