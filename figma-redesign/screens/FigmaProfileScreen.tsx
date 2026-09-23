import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { Toast } from "@/components/ui/feedback";
import { useGolfAppState } from "@/lib/golf-app-state";
import { derivePracticeStreak } from "@/lib/home-statistics";
import { useMonetization } from "@/lib/monetization-state";

import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { ProfileAvatar } from "../ui/ProfileAvatar";
import { StatTile } from "../ui/StatTile";
import { StaticCard } from "../ui/GlassCard";
import { SettingsRow } from "../ui/SettingsRow";
import { StatusChip } from "../ui/Chip";

export default function FigmaProfileScreen() {
  const router = useRouter();
  const { profile, sessions, activeGoal, completedDrills, lastPracticedDrills, updateProfile } = useGolfAppState();
  const monetization = useMonetization();
  const [toast, setToast] = useState("");
  const displayName = profile.displayName || "Player";
  const streak = derivePracticeStreak(lastPracticedDrills);
  const bestScore = useMemo(() => Math.max(...sessions.map((session) => session.score), 0), [sessions]);
  const isPremium = monetization.tier !== "free" || monetization.canUseFeature("advancedMetrics");

  const toggleNotifications = async () => {
    try {
      await updateProfile({ notifications: !profile.notifications });
    } catch {
      setToast("Could not save notification preferences. Please try again.");
    }
  };

  return (
    <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TopBar title="PROFILE" subtitle="YOUR COACHING IDENTITY" />
        <View style={styles.profileHero}>
          <ProfileAvatar name={displayName} size={82} />
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.meta}>Handicap {profile.handicap} · {profile.preferredClub || "7 iron"} · {profile.handedness === "left" ? "Left" : "Right"}-handed</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Open premium plans" onPress={() => router.push("/paywall")} style={styles.upgrade}>
            <Text style={styles.crown}>★</Text><Text style={styles.upgradeText}>{isPremium ? "Premium member" : "Upgrade to Premium"}</Text>
          </Pressable>
        </View>

        <View style={styles.stats}><StatTile label="SESSIONS" value={`${sessions.length}`} accent /><StatTile label="BEST SCORE" value={`${bestScore || "—"}`} /><StatTile label="STREAK" value={`${streak}d`} /></View>

        <StaticCard style={styles.identityCard}>
          <Text style={styles.kicker}>GOLFER PROFILE</Text>
          <ProfileField label="Handicap" value={profile.handicap} />
          <ProfileField label="Primary Goal" value={`${activeGoal.current}/${activeGoal.target} ${activeGoal.metric.toLowerCase()}`} />
          <ProfileField label="Preferred Club" value={profile.preferredClub || "7 iron"} />
          <ProfileField label="Coach Mode" value={profile.coachMode} />
        </StaticCard>

        <StaticCard style={styles.achievementCard}>
          <Text style={styles.kicker}>CURRENT PROGRESS</Text>
          <View style={styles.achievements}>
            <Achievement icon="↗" label={`${sessions.length} Saved`} />
            <Achievement icon="✓" label={`${completedDrills.length} Drills`} />
            <Achievement icon="●" label={`${streak} Day Streak`} />
          </View>
        </StaticCard>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & preferences</Text>
          <View style={styles.rows}>
            <SettingsRow label="Notifications" toggle checked={Boolean(profile.notifications)} onPress={() => { void toggleNotifications(); }} />
            <SettingsRow label="Training History" value={`${sessions.length} sessions`} onPress={() => router.push("/session-history-v2")} />
            <SettingsRow label="Coaching Preferences" value={profile.coachMode} onPress={() => router.push("/settings-v2")} />
            <SettingsRow label="Privacy" value={profile.privacy} onPress={() => router.push("/settings-v2")} />
            <SettingsRow label="Design Lab" value="Second-pass UI" onPress={() => router.push("/design-lab-v2")} />
          </View>
        </View>

        <Pressable accessibilityRole="button" accessibilityLabel="Open premium plans" onPress={() => router.push("/paywall")} style={styles.premiumCard}>
          <View style={{ flex: 1 }}><Text style={styles.premiumKicker}>GOLF PERFORMANCE LAB</Text><Text style={styles.premiumTitle}>{isPremium ? "Your premium toolkit is active" : "Unlock deeper coaching"}</Text><Text style={styles.premiumCopy}>{isPremium ? "Advanced metrics and coach tools are ready for your next swing." : "Unlimited analyses, deeper biomechanical context, and more practice guidance."}</Text></View><StatusChip label={isPremium ? "ACTIVE" : "PREMIUM"} tone={isPremium ? "good" : "medium"} />
        </Pressable>
      </ScrollView>
      <Toast visible={Boolean(toast)} message={toast} tone="info" onHide={() => setToast("")} />
    </ScreenContainer>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return <View style={styles.field}><Text style={styles.fieldLabel}>{label}</Text><Text style={styles.fieldValue}>{value}</Text></View>;
}

function Achievement({ icon, label }: { icon: string; label: string }) {
  return <View style={styles.achievement}><Text style={styles.achievementIcon}>{icon}</Text><Text style={styles.achievementLabel}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  content: { padding: 15, paddingBottom: 32, gap: 12 },
  profileHero: { alignItems: "center", paddingTop: 4, paddingBottom: 3 },
  name: { color: FIGMA.colors.white, fontSize: 23, fontWeight: "900", marginTop: 10 },
  meta: { color: FIGMA.colors.muted, fontSize: 10, marginTop: 3, textAlign: "center" },
  upgrade: { marginTop: 10, flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,184,0,0.10)", borderWidth: 1, borderColor: "rgba(255,184,0,0.28)", borderRadius: 99, paddingHorizontal: 13, paddingVertical: 6 },
  crown: { color: FIGMA.colors.medium, fontSize: 13 },
  upgradeText: { color: FIGMA.colors.medium, fontSize: 10, fontWeight: "800" },
  stats: { flexDirection: "row", gap: 8 },
  identityCard: { gap: 0 },
  kicker: { color: FIGMA.colors.mutedStrong, fontSize: 8, fontWeight: "800", letterSpacing: 0.9, marginBottom: 7 },
  field: { minHeight: 36, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: FIGMA.colors.border },
  fieldLabel: { color: FIGMA.colors.muted, fontSize: 10 },
  fieldValue: { color: FIGMA.colors.white, fontSize: 10, fontWeight: "700", maxWidth: "65%", textAlign: "right", textTransform: "capitalize" },
  achievementCard: { gap: 5 },
  achievements: { flexDirection: "row", gap: 7 },
  achievement: { flex: 1, backgroundColor: FIGMA.colors.surfaceQuiet, borderRadius: 11, alignItems: "center", justifyContent: "center", paddingVertical: 10 },
  achievementIcon: { color: FIGMA.colors.lime, fontSize: 21 },
  achievementLabel: { color: FIGMA.colors.textSoft, fontSize: 8, fontWeight: "700", textAlign: "center", marginTop: 4 },
  section: { gap: 8 },
  sectionTitle: { color: FIGMA.colors.white, fontSize: 15, fontWeight: "900" },
  rows: { gap: 8 },
  premiumCard: { borderRadius: 16, borderWidth: 1, borderColor: FIGMA.colors.borderStrong, backgroundColor: FIGMA.colors.surfaceElevated, padding: 14, flexDirection: "row", alignItems: "center", gap: 10 },
  premiumKicker: { color: FIGMA.colors.medium, fontSize: 8, fontWeight: "900", letterSpacing: 0.8 },
  premiumTitle: { color: FIGMA.colors.white, fontSize: 14, fontWeight: "900", marginTop: 3 },
  premiumCopy: { color: FIGMA.colors.muted, fontSize: 10, lineHeight: 15, marginTop: 3 },
});
