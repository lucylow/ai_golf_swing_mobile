import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { reportAppError } from "@/lib/error-reporting";
import { FIGMA } from "@/figma-redesign/theme";
import { GolfPoseAlgorithmV9 } from "../pose-intelligence-v9/src/algorithmV9";
import { makeDemoFrames } from "../pose-intelligence-v9/src/demoFrames";
import { GolfAIV10Engine } from "../pose-intelligence-v10/src/V10Engine";
import { generateSyntheticSwing } from "../pose-intelligence-v10/src/data/syntheticSwing";
import {
  GolfFeatureEngineV8,
  DEMO_CLUBS_V8,
  DEMO_HOLES_V8,
  DEMO_PROGRESSION_V8,
  REFERENCE_SHOTS_V8,
  fitLaunchMonitorCalibration,
} from "../src/services/golf-domain-v8/src/index";
import type { CalibrationSample } from "../src/services/golf-domain-v8/src/calibration/types";

const rawShot = {
  ballSpeedMph: 146,
  launchAngleDeg: 15,
  azimuthDeg: 1.2,
  spinRpm: 2800,
  spinAxisDeg: -4,
  clubSpeedMph: 98,
  clubPathDeg: 2,
  attackAngleDeg: -1.5,
  faceAngleDeg: 1,
  dynamicLoftDeg: 17,
};

type IntelligenceSuccess = {
  pose: ReturnType<GolfPoseAlgorithmV9["analyze"]>;
  v10: ReturnType<GolfAIV10Engine["analyze"]>;
  calibration: ReturnType<typeof fitLaunchMonitorCalibration>;
  engine: ReturnType<GolfFeatureEngineV8["run"]>;
  error: null;
};
type IntelligenceState = IntelligenceSuccess | { error: string };

function formatNumber(value: number, digits = 2, fallback = "—") {
  return Number.isFinite(value) ? value.toFixed(digits) : fallback;
}

function buildIntelligenceData(): IntelligenceState {
  try {
    const pose = new GolfPoseAlgorithmV9().analyze(makeDemoFrames(90));
    const v10 = new GolfAIV10Engine().analyze(
      generateSyntheticSwing({
        frames: 120,
        fps: 120,
        noise: 0.002,
        seed: 10,
        earlyExtension: 0.12,
        overTop: 0.08,
      }),
    );
    const calibrationSamples: CalibrationSample[] = REFERENCE_SHOTS_V8.flatMap((shot, index) => [
      { shotKey: shot.shotKey, metric: "ballSpeedMph", appValue: shot.ballSpeedMph, referenceValue: shot.refBallSpeedMph, timestampMs: index },
      { shotKey: `${shot.shotKey}-carry`, metric: "carryYards", appValue: shot.carryYards, referenceValue: shot.refCarryYards, timestampMs: index },
      { shotKey: `${shot.shotKey}-launch`, metric: "launchAngleDeg", appValue: shot.launchAngleDeg, referenceValue: shot.refLaunchAngleDeg, timestampMs: index },
    ]);
    const calibration = fitLaunchMonitorCalibration(
      calibrationSamples,
      "paired-reference-demo",
      "demo-v10-calibration",
      { minSamples: 12 },
    );
    const engine = new GolfFeatureEngineV8().run({
      rawShot,
      hole: DEMO_HOLES_V8[0],
      start: DEMO_HOLES_V8[0].tee,
      clubs: DEMO_CLUBS_V8,
      simulation: { iterations: 180, seed: 9, riskAversion: 0.5, targetPenaltyWeight: 1 },
      progression: DEMO_PROGRESSION_V8,
    });
    return { pose, v10, calibration, engine, error: null };
  } catch (error) {
    reportAppError("golf-intelligence-analysis", error);
    return { error: "Golf intelligence is temporarily unavailable. Retry the screen to run the analysis again." };
  }
}

function Panel({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.kicker}>{label}</Text>
      <Text style={styles.panelTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Metric({ label, value, tone = FIGMA.colors.white }: { label: string; value: string; tone?: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, { color: tone }]}>{value}</Text>
    </View>
  );
}

export default function GolfIntelligenceScreen() {
  const data = useMemo(buildIntelligenceData, []);

  if (data.error) {
    return (
      <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]">
        <View style={styles.errorState}>
          <Text style={styles.eyebrow}>AI GOLF SWING COACH · RECOVERY</Text>
          <Text style={styles.title}>Analysis paused</Text>
          <Text style={styles.subtitle}>{data.error}</Text>
          <Text style={styles.detail}>Your saved sessions are unchanged. Return to the previous screen and retry when the analysis runtime is ready.</Text>
        </View>
      </ScreenContainer>
    );
  }

  const success = data as IntelligenceSuccess;
  const primary = success.engine.strategy.primary;
  const drill = success.engine.progression.drill;
  const skill = success.engine.updatedProgression.skills["iron-contact"];
  const phasePath = Array.from(new Set(success.v10.phaseTimeline.map((phase) => phase.state))).join(" → ") || "No phase events";

  return (
    <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>AI GOLF SWING COACH · V10</Text>
        <Text style={styles.title}>Golf intelligence</Text>
        <Text style={styles.subtitle}>Pose understanding, measured-shot calibration, course strategy, and adaptive practice in one loop.</Text>

        <Panel label="POSE PIPELINE" title="33-landmark swing intelligence">
          <View style={styles.row}>
            <Metric label="Quality" value={`${Math.round(success.pose.quality.score * 100)}%`} tone={FIGMA.colors.lime} />
            <Metric label="Phases" value={`${success.pose.phases.length}`} />
            <Metric label="Events" value={`${success.pose.events.length}`} />
          </View>
          <Text style={styles.copy}>{success.pose.insight?.explanation ?? "Pose quality is ready for coaching analysis."}</Text>
          <Text style={styles.accent}>{success.pose.insight?.action ?? "Record a clean swing to recheck."}</Text>
          <Text style={styles.detail}>MediaPipe modes · IMAGE / VIDEO / LIVE_STREAM · monotonic timestamps · OpenCV fallback boundary</Text>
        </Panel>

        <Panel label="V10 3D BIOMECHANICS" title="3D canonical swing intelligence">
          <View style={styles.row}>
            <Metric label="Quality" value={`${Math.round(success.v10.quality * 100)}%`} tone={FIGMA.colors.lime} />
            <Metric label="X-Factor peak" value={`${formatNumber(success.v10.xFactorPeakDeg, 1)}°`} />
            <Metric label="Tempo" value={formatNumber(success.v10.tempoRatio)} />
          </View>
          <Text style={styles.copy}>World-coordinate pose → canonical pelvis/thorax frames → EKF-ready tracking → ST-GCN / temporal-transformer phase contracts.</Text>
          <Text style={styles.accent}>P1–P10: {phasePath}</Text>
          <Text style={styles.detail}>Hip/shoulder rotation · pelvic/thorax tilt · X-Factor rate · joint velocity/acceleration · bounded mesh/HMR boundary · high-FPS impact path</Text>
        </Panel>

        <Panel label="LAUNCH MONITOR CALIBRATION" title="Paired reference correction">
          <View style={styles.row}>
            <Metric label="Status" value={success.calibration.pass ? "PASS" : "REVIEW"} tone={success.calibration.pass ? FIGMA.colors.lime : "#FFB86B"} />
            <Metric label="Pairs" value={`${success.calibration.profile.sampleCount}`} />
            <Metric label="Metrics" value={`${Object.keys(success.calibration.profile.coefficients).length}`} />
          </View>
          <Text style={styles.copy}>Huber-weighted affine fits with temporal holdout diagnostics. Vendor-neutral: reference device data stays the source of truth.</Text>
          <Text style={styles.detail}>{Object.entries(success.calibration.profile.coefficients).map(([metric, coefficient]) => `${metric}: ${formatNumber(coefficient?.scale ?? 1, 3)}×`).join("  ·  ") || "No calibration coefficients available"}</Text>
        </Panel>

        <Panel label="COURSE STRATEGY" title={primary.label}>
          <View style={styles.row}>
            <Metric label="Expected score" value={formatNumber(primary.expectedScore)} tone={FIGMA.colors.lime} />
            <Metric label="Penalty" value={`${Math.round(primary.penaltyProbability * 100)}%`} />
            <Metric label="Confidence" value={`${Math.round(primary.confidence * 100)}%`} />
          </View>
          <Text style={styles.copy}>{success.engine.strategy.message}</Text>
          <Text style={styles.accent}>Caddie read: {primary.rationale[0] ?? "Favor the highest-value target window."}</Text>
          <Text style={styles.detail}>Hole 1 · {DEMO_HOLES_V8[0].totalYards} yd · wind {DEMO_HOLES_V8[0].windMph} mph · deterministic Monte Carlo</Text>
        </Panel>

        <Panel label="ADAPTIVE DRILL COACH" title={drill.title}>
          <View style={styles.row}>
            <Metric label="Mastery" value={`${Math.round((skill?.mastery ?? 0) * 100)}%`} tone={FIGMA.colors.lime} />
            <Metric label="Confidence" value={`${Math.round((skill?.confidence ?? 0) * 100)}%`} />
            <Metric label="Streak" value={`${skill?.streak ?? 0}d`} />
          </View>
          <Text style={styles.copy}>{drill.objective}</Text>
          <Text style={styles.accent}>Next state: {success.engine.progression.progression}</Text>
          <Text style={styles.detail}>Spacing, fatigue, variability, promotion, regression, and pressure context are tracked.</Text>
        </Panel>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 13, paddingBottom: 34 },
  errorState: { flex: 1, justifyContent: "center", padding: 24, gap: 14 },
  eyebrow: { color: FIGMA.colors.lime, fontSize: 9, fontWeight: "900", letterSpacing: 1.1 },
  title: { color: FIGMA.colors.white, fontSize: 30, fontWeight: "900", marginTop: -3 },
  subtitle: { color: FIGMA.colors.muted, fontSize: 12, lineHeight: 18, marginTop: -4 },
  panel: { backgroundColor: "#111D12", borderColor: "rgba(170,255,0,0.18)", borderWidth: 1, borderRadius: 18, padding: 15, gap: 9 },
  kicker: { color: FIGMA.colors.mutedStrong, fontSize: 8, fontWeight: "900", letterSpacing: 0.8 },
  panelTitle: { color: FIGMA.colors.white, fontSize: 17, fontWeight: "900" },
  row: { flexDirection: "row", gap: 8 },
  metric: { flex: 1, backgroundColor: "#0B150C", borderRadius: 12, padding: 10 },
  metricLabel: { color: FIGMA.colors.muted, fontSize: 8, fontWeight: "800" },
  metricValue: { fontSize: 19, fontWeight: "900", marginTop: 3 },
  copy: { color: FIGMA.colors.muted, fontSize: 11, lineHeight: 16 },
  accent: { color: FIGMA.colors.lime, fontSize: 11, fontWeight: "800", lineHeight: 16 },
  detail: { color: FIGMA.colors.mutedStrong, fontSize: 9, lineHeight: 14 },
});
