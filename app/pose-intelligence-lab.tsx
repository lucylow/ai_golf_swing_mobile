import React, { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { PoseSwingAnalyzer } from "@/src/services/ml/pose-intelligence-v5/pipeline/analyzer";
import { makeDemoSequence } from "@/src/services/ml/pose-intelligence-v5/analysis/demoFixture";
import { PoseDebugPanel } from "@/src/services/ml/pose-intelligence-v5/mobile/PoseDebugPanel";

/** Deterministic local QA screen for inspecting the pose analysis pipeline. */
export default function PoseIntelligenceLabScreen() {
  const analysis = useMemo(
    () => new PoseSwingAnalyzer().analyze(makeDemoSequence(90), "side"),
    [],
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#08110E" }}
      contentContainerStyle={{ padding: 20, gap: 16, paddingTop: 56 }}
    >
      <Text style={{ color: "#F5F8F4", fontSize: 32, fontWeight: "800" }}>
        Pose Intelligence Lab
      </Text>
      <Text style={{ color: "#91A29A", fontSize: 15 }}>
        Deterministic visual QA for pose, phase, quality, and swing metrics.
      </Text>
      <PoseDebugPanel analysis={analysis} />
      <View style={{ padding: 16, borderRadius: 16, backgroundColor: "#0C1714" }}>
        <Text style={{ color: "#B7FF3C", fontWeight: "700" }}>PRIMARY FOCUS</Text>
        <Text style={{ color: "#F5F8F4", fontSize: 22, fontWeight: "700", marginTop: 6 }}>
          {analysis.primaryFocus?.label ?? "None"}
        </Text>
        <Text style={{ color: "#91A29A", marginTop: 6 }}>
          Processing: {analysis.processingMs}ms
        </Text>
      </View>
      <Text style={{ color: "#91A29A", fontSize: 13 }}>
        Demo sequence only. Native camera inference must be connected through the PoseInferenceAdapter.
      </Text>
    </ScrollView>
  );
}
