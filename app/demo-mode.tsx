import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { getDemoController } from "../src/services/demo-mode-v6/src/runtime";

const routes = [
  ["Demo home", "/demo-home-v6"],
  ["A.I. Analysis", "/demo-analysis-v6"],
  ["Pose Lab", "/demo-pose-lab-v6"],
  ["Scenarios & state controls", "/demo-scenarios-v6"],
  ["A.I. Coach", "/demo-coach-v6"],
  ["Progress & trends", "/demo-progress-v6"],
  ["Drill library", "/demo-library-v6"],
  ["Session history", "/demo-history-v6"],
  ["Goals", "/demo-goals-v6"],
  ["Notifications", "/demo-notifications-v6"],
  ["Demo paywall", "/demo-paywall-v6"],
  ["Settings & network simulation", "/demo-settings-v6"],
  ["Dataset overview", "/demo-dataset-v6"],
] as const;

const v7Routes = [
  ["Golf Command Center", "/golf-command-center-v7"],
  ["Golf Intelligence Lab", "/golf-lab-v7"],
  ["Shot Shape", "/shot-shape-v7"],
  ["Club Gapping", "/club-gapping-v7"],
  ["Course Strategy", "/course-strategy-v7"],
  ["Practice Plan", "/practice-plan-v7"],
  ["Putting Lab", "/putting-lab-v7"],
  ["Short Game", "/short-game-v7"],
  ["A.I. Golf Coach", "/ai-coach-v7"],
] as const;

export default function DemoModeHub() {
  const demo = getDemoController().snapshot;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#07100D" }} contentContainerStyle={{ padding: 20, paddingTop: 56, gap: 14 }}>
      <Text style={{ color: "#B7FF3C", fontSize: 12, fontWeight: "900", letterSpacing: 1 }}>ISOLATED SANDBOX</Text>
      <Text style={{ color: "#F3F8F4", fontSize: 32, fontWeight: "900" }}>Demo Mode</Text>
      <Text style={{ color: "#91A29A", fontSize: 14, lineHeight: 20 }}>
        Deterministic, synthetic fixtures for product demos and QA. Demo actions do not call live analysis, purchases, or production APIs.
      </Text>
      <View style={{ flexDirection: "row", gap: 10, marginVertical: 4 }}>
        {[["Golfers", demo.users.length], ["Sessions", demo.sessions.length], ["Swings", demo.swings.length], ["Scenarios", demo.scenarios.length]].map(([label, value]) => (
          <View key={String(label)} style={{ flex: 1, backgroundColor: "#102019", borderRadius: 14, padding: 12 }}>
            <Text style={{ color: "#83968E", fontSize: 11 }}>{label}</Text>
            <Text style={{ color: "#F3F8F4", fontSize: 19, fontWeight: "900", marginTop: 4 }}>{value}</Text>
          </View>
        ))}
      </View>
      <Text style={{ color: "#B7FF3C", fontSize: 13, fontWeight: "900", letterSpacing: 1, marginTop: 4 }}>V6 DEMO SCREENS</Text>
      {routes.map(([label, href]) => (
        <Link key={href} href={href} asChild>
          <Pressable style={{ backgroundColor: "#102019", borderColor: "#20372D", borderWidth: 1, padding: 16, borderRadius: 14 }}>
            <Text style={{ color: "#F3F8F4", fontWeight: "800" }}>{label}</Text>
            <Text style={{ color: "#83968E", fontSize: 12, marginTop: 4 }}>{href}</Text>
          </Pressable>
        </Link>
      ))}
      <Text style={{ color: "#B7FF3C", fontSize: 13, fontWeight: "900", letterSpacing: 1, marginTop: 10 }}>GOLF DOMAIN V7</Text>
      <Text style={{ color: "#91A29A", fontSize: 12, lineHeight: 18 }}>Golf-specific illustrative analysis and synthetic fixtures. The V7 layer does not replace live camera or production services.</Text>
      {v7Routes.map(([label, href]) => (
        <Link key={href} href={href} asChild>
          <Pressable style={{ backgroundColor: "#102019", borderColor: "#20372D", borderWidth: 1, padding: 16, borderRadius: 14 }}>
            <Text style={{ color: "#F3F8F4", fontWeight: "800" }}>{label}</Text>
            <Text style={{ color: "#83968E", fontSize: 12, marginTop: 4 }}>{href}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}
