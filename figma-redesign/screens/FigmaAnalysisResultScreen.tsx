import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { Toast } from "@/components/ui/feedback";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { deriveSwingScore, parseStageOutputs, stageOutputsToMetrics } from "@/lib/analysis-output";
import { formatCaptureReviewMeta } from "@/lib/capture-review-meta";
import { formatShareSummary } from "@/lib/capture-review-meta";
import { classifyMediaSource } from "@/lib/media-source";
import { recommendedDrillRoute } from "@/lib/drill-route";
import { reportAppError } from "@/lib/error-reporting";
import { useGolfAppState } from "@/lib/golf-app-state";
import { colors, type SwingSession } from "@/lib/golf-data";
import { shareAnalysisSummary } from "@/lib/share-analysis";
import { runSafely } from "@/lib/safe-feedback";

import { getCoachingPriority, getSessionSignals } from "../adapters";
import { FIGMA } from "../theme";
import { AIInsightCard } from "../ui/AIInsightCard";
import { GlassCard, StaticCard } from "../ui/GlassCard";
import { LimeButton } from "../ui/LimeButton";
import { MetricBar } from "../ui/MetricBar";
import { ScoreRing } from "../ui/ScoreRing";
import { TopBar } from "../ui/TopBar";
import { VideoStage } from "../ui/VideoStage";
import type { Phase } from "../ui/PhaseStrip";

export default function FigmaAnalysisResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    videoUri?: string;
    captureMode?: "native" | "simulated";
    club?: string;
    duration?: string;
    slowMotion?: string;
    stageOutputs?: string;
  }>();
  const { saveSession } = useGolfAppState();
  const [toast, setToast] = useState("");
  const [phase, setPhase] = useState<Phase>("IMPACT");
  const savedSessionKeyRef = useRef<string | null>(null);

  const stageOutputs = useMemo(
    () => parseStageOutputs(params.stageOutputs, (error) => reportAppError("figma-analysis-result-route-data", error)),
    [params.stageOutputs],
  );
  const metrics = useMemo(() => stageOutputsToMetrics(stageOutputs), [stageOutputs]);
  const score = useMemo(() => deriveSwingScore(stageOutputs), [stageOutputs]);

  const currentSession = useMemo<SwingSession>(() => ({
    id: "current-analysis",
    label: "AI analysis",
    club: params.club ?? "7 iron",
    date: "Just now",
    score,
    duration: `00:${String(Number(params.duration ?? 4)).padStart(2, "0")}`,
    accent: colors.fairway,
    videoUri: params.videoUri,
    captureMode: params.captureMode,
    mediaSource: params.videoUri ? classifyMediaSource(params.videoUri) : undefined,
    slowMotion: params.slowMotion === "true",
    analysisStages: stageOutputs,
    metrics,
  }), [metrics, params.captureMode, params.club, params.duration, params.slowMotion, params.videoUri, score, stageOutputs]);

  const signals = useMemo(() => getSessionSignals(currentSession), [currentSession]);
  const priority = useMemo(() => getCoachingPriority(currentSession), [currentSession]);

  useEffect(() => {
    const sessionKey = [params.videoUri ?? "", params.captureMode ?? "", params.club ?? "7 iron", params.duration ?? "4", params.slowMotion ?? "false", params.stageOutputs ?? ""].join("|");
    if (savedSessionKeyRef.current === sessionKey) return;
    savedSessionKeyRef.current = sessionKey;

    const session: SwingSession = { ...currentSession, id: `session-${Date.now()}` };
    void runSafely(
      async () => {
        await saveSession(session);
        setToast("Analysis saved to your Library");
      },
      (error) => {
        reportAppError("figma-analysis-result-save", error);
        savedSessionKeyRef.current = null;
        setToast("Could not save this analysis to your Library. Please try again.");
      },
    );
  }, [currentSession, params.captureMode, params.club, params.duration, params.slowMotion, params.stageOutputs, params.videoUri, saveSession]);

  const share = async () => {
    try {
      const result = await shareAnalysisSummary(formatShareSummary({ club: currentSession.club, score, session: currentSession }));
      setToast(result.message);
    } catch (error) {
      reportAppError("figma-analysis-result-share", error);
      setToast("Could not prepare the share report. Please try again.");
    }
  };

  return (
    <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TopBar title="ANALYSIS COMPLETE" subtitle="YOUR COACHING CUE" back actionIcon="square.and.arrow.up" onAction={() => { void share(); }} />
        <VideoStage phase={phase} onPhaseChange={setPhase} onCompare={() => router.push({ pathname: "/compare-swing", params: { id: currentSession.id } })} />

        <StaticCard style={styles.scoreCard}>
          <View style={styles.scoreCopy}>
            <Text style={styles.kicker}>YOUR SWING SCORE</Text>
            <Text style={styles.scoreTitle}>{score >= 80 ? "A repeatable session." : "One clear move to improve."}</Text>
            <Text style={styles.scoreMeta}>{formatCaptureReviewMeta({ uri: params.videoUri ?? "", club: currentSession.club, duration: Number(params.duration ?? 4), slowMotion: params.slowMotion === "true" })}</Text>
          </View>
          <ScoreRing score={score} size={96} />
        </StaticCard>

        <GlassCard style={styles.priorityCard}>
          <Text style={styles.kicker}>PRIMARY COACHING SIGNAL</Text>
          <View style={styles.priorityTitleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.priorityTitle}>{priority.title}</Text>
              <Text style={styles.priorityCopy}>{priority.observation}</Text>
            </View>
            <Text style={[styles.priorityScore, { color: priority.tone === "high" ? FIGMA.colors.high : FIGMA.colors.lime }]}>{priority.score}</Text>
          </View>
          <MetricBar label="Session signal" value={priority.score} tone={priority.tone} showValue={false} />
        </GlassCard>

        <AIInsightCard
          observation={priority.observation}
          why="This cue comes directly from the captured session’s analysis output. Keep the next practice block simple enough to repeat."
          action={priority.action}
          confidence={Math.max(70, score)}
          onAction={() => router.push({ pathname: "/drill-detail", params: { drillId: priority.drillId } })}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Session signals</Text>
          <Text style={styles.sectionMeta}>{signals.length} captured</Text>
        </View>
        <View style={styles.signalList}>
          {signals.map((signal) => (
            <Pressable key={signal.id} onPress={() => router.push({ pathname: "/swing-detail", params: { id: currentSession.id } })} style={styles.signal}>
              <View style={[styles.signalDot, { backgroundColor: signal.tone === "high" ? FIGMA.colors.high : signal.tone === "good" ? FIGMA.colors.lime : FIGMA.colors.medium }]} />
              <View style={{ flex: 1 }}>
                <View style={styles.signalTitleRow}><Text style={styles.signalTitle}>{signal.label}</Text><Text style={styles.signalValue}>{signal.value}</Text></View>
                <Text style={styles.signalDetail}>{signal.detail}</Text>
              </View>
              <IconSymbol name="chevron.right" size={15} color={FIGMA.colors.muted} />
            </Pressable>
          ))}
        </View>

        <LimeButton label="OPEN RECOMMENDED DRILL" onPress={() => router.push(recommendedDrillRoute(priority.drillId))} />
        <Pressable accessibilityRole="button" accessibilityLabel="Open extended analysis breakdown" onPress={() => router.push("/analysis-overview-v2")} style={styles.extendedAction}><Text style={styles.extendedActionText}>OPEN EXTENDED BREAKDOWN</Text><IconSymbol name="arrow.up.right" size={14} color={FIGMA.colors.lime} /></Pressable>
        <Pressable onPress={() => router.replace("/(tabs)/analyze")} style={styles.secondaryAction}><Text style={styles.secondaryActionText}>ANALYZE ANOTHER SWING</Text></Pressable>
      </ScrollView>
      <Toast visible={Boolean(toast)} message={toast} tone="success" onHide={() => setToast("")} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 13, paddingBottom: 32, gap: 12 },
  scoreCard: { flexDirection: "row", alignItems: "center", gap: 14 },
  scoreCopy: { flex: 1 },
  kicker: { color: FIGMA.colors.mutedStrong, fontSize: 8, fontWeight: "800", letterSpacing: 0.9, marginBottom: 6 },
  scoreTitle: { color: FIGMA.colors.white, fontSize: 18, fontWeight: "900", lineHeight: 23 },
  scoreMeta: { color: FIGMA.colors.muted, fontSize: 9, lineHeight: 14, marginTop: 5 },
  priorityCard: { gap: 9 },
  priorityTitleRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  priorityTitle: { color: FIGMA.colors.white, fontSize: 16, fontWeight: "900" },
  priorityCopy: { color: FIGMA.colors.muted, fontSize: 11, lineHeight: 16, marginTop: 4 },
  priorityScore: { fontSize: 28, fontWeight: "900" },
  sectionHeader: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginTop: 4 },
  sectionTitle: { color: FIGMA.colors.white, fontSize: 16, fontWeight: "900" },
  sectionMeta: { color: FIGMA.colors.muted, fontSize: 9, fontWeight: "700" },
  signalList: { borderRadius: 15, overflow: "hidden", borderWidth: 1, borderColor: FIGMA.colors.border },
  signal: { minHeight: 65, backgroundColor: FIGMA.colors.surface, paddingHorizontal: 13, paddingVertical: 11, flexDirection: "row", alignItems: "center", gap: 9, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: FIGMA.colors.border },
  signalDot: { width: 8, height: 8, borderRadius: 4 },
  signalTitleRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  signalTitle: { color: FIGMA.colors.white, fontSize: 12, fontWeight: "800", flex: 1 },
  signalValue: { color: FIGMA.colors.lime, fontSize: 10, fontWeight: "900" },
  signalDetail: { color: FIGMA.colors.muted, fontSize: 9, lineHeight: 13, marginTop: 3 },
  extendedAction: { minHeight: 44, flexDirection: "row", gap: 6, alignItems: "center", justifyContent: "center", borderRadius: 99, borderWidth: 1, borderColor: "rgba(170,255,0,0.28)", backgroundColor: "rgba(170,255,0,0.06)" },
  extendedActionText: { color: FIGMA.colors.lime, fontSize: 9, fontWeight: "900", letterSpacing: 0.55 },
  secondaryAction: { minHeight: 46, borderRadius: 99, borderWidth: 1, borderColor: FIGMA.colors.borderStrong, alignItems: "center", justifyContent: "center", backgroundColor: FIGMA.colors.surface },
  secondaryActionText: { color: FIGMA.colors.white, fontSize: 10, fontWeight: "900", letterSpacing: 0.5 },
});
