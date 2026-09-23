import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { useGolfAppState } from "@/lib/golf-app-state";
import { drills } from "@/lib/golf-data";
import { derivePracticeStreak, deriveWeeklyPracticeCalendar, getHomeFirstName } from "@/lib/home-statistics";
import { useMonetization } from "@/lib/monetization-state";

import { toV2Drills, toV2Goal, toV2Metrics, toV2Sessions, scoreAverage, scoreTrend, sessionFocus } from "./adapters";
import { V2 } from "./infra/theme";
import { DrillCard, EmptyBlock, FilterChip, GoalCard, LimeCTA, MenuRow, MetricRow, PageHeader, PageShell, QuickStatRow, SearchBox, SectionLabel, Surface, ToggleRow, TrendChart } from "./ui";
import { CoachingCueBlock } from "./extended/ui/CoachingCueBlock";
import { MetricHeroCard } from "./extended/ui/MetricHeroCard";
import { ScoreHeroCard } from "./extended/ui/ScoreHeroCard";

function useV2Data() {
  const app = useGolfAppState();
  const latest = app.sessions[0] ?? null;
  const metrics = useMemo(() => toV2Metrics(latest), [latest]);
  const sessionItems = useMemo(() => toV2Sessions(app.sessions), [app.sessions]);
  const trend = useMemo(() => scoreTrend(app.sessions), [app.sessions]);
  const average = useMemo(() => scoreAverage(app.sessions), [app.sessions]);
  const focus = latest ? sessionFocus(latest) : "Record a first swing";
  const v2Drills = useMemo(() => toV2Drills(drills, focus), [focus]);
  const goal = useMemo(() => toV2Goal(app.activeGoal), [app.activeGoal]);
  return { ...app, latest, metrics, sessionItems, trend, average, focus, v2Drills, goal };
}

function LatestScore({ latest, focus, onPress }: { latest: ReturnType<typeof useV2Data>["latest"]; focus: string; onPress: () => void }) {
  return <ScoreHeroCard title={latest ? `${latest.club} score` : "New baseline"} value={latest ? String(latest.score) : "—"} body={latest ? `${focus} · ${latest.date}` : "Record or import a swing to start your coaching history."} onPress={onPress} toneValue={latest && latest.score < 75 ? "warning" : "positive"} />;
}

export function CommandCenterV2Screen() {
  const router = useRouter();
  const { latest, metrics, sessions, profile, completedDrills, lastPracticedDrills, average, focus, goal } = useV2Data();
  const streak = derivePracticeStreak(lastPracticedDrills);
  const primary = metrics[0];
  return <PageShell>
    <PageHeader title="Command Center" eyebrow="AI COACH" back />
    <View style={styles.hero}>
      <Text style={styles.eyebrow}>TODAY'S COACHING LOOP</Text>
      <Text style={styles.heroTitle}>Hi, {getHomeFirstName(profile.displayName)}.</Text>
      <Text style={styles.heroCopy}>{latest ? `Your next best move is ${focus.toLowerCase()}. Keep the cue small and practice it deliberately.` : "Start with one recorded swing. The app will turn it into a focused practice loop."}</Text>
      <LimeCTA label={latest ? "OPEN LATEST ANALYSIS" : "ANALYZE A SWING"} onPress={() => latest ? router.push("/analysis-overview-v2") : router.push("/(tabs)/analyze")} style={styles.heroAction} />
    </View>
    <QuickStatRow items={[{ label: "AVG SCORE", value: average == null ? "—" : String(average) }, { label: "STREAK", value: `${streak}D` }, { label: "SESSIONS", value: String(sessions.length) }, { label: "DRILLS", value: String(completedDrills.length) }]} />
    <SectionLabel title="Current signal" meta="ONE MOVE" />
    {primary ? <MetricHeroCard title={primary.label} value={primary.value} body={primary.note} toneValue={primary.tone} onPress={() => router.push({ pathname: "/metric-detail", params: { metricId: primary.id } })} /> : <EmptyBlock title="No signal yet" body="Analyze a swing to surface the first coaching priority." />}
    <SectionLabel title="Goal progress" meta="LIVE" />
    <GoalCard goal={goal} onPress={() => router.push("/goals-v2")} />
    <SectionLabel title="Next practice" meta="PERSONALIZED" />
    <CoachingCueBlock title={focus} value={latest ? `${latest.score}/100` : "READY"} body={latest ? "Use the recommended drill to make the next session more repeatable." : "A short, intentional first session is enough to build a baseline."} toneValue="positive" />
    <LimeCTA label="START PRACTICE" onPress={() => router.push("/practice-planner-v2")} style={styles.bottomAction} />
  </PageShell>;
}

export function AnalysisOverviewV2Screen() {
  const router = useRouter();
  const { latest, metrics, focus } = useV2Data();
  return <PageShell>
    <PageHeader title="Analysis Overview" eyebrow="AI BIOMECHANICS" back />
    <LatestScore latest={latest} focus={focus} onPress={() => latest ? router.push({ pathname: "/swing-detail", params: { id: latest.id } }) : router.push("/(tabs)/analyze")} />
    {latest ? <>
      <SectionLabel title="Coaching cue" meta="NEXT REP" />
      <CoachingCueBlock title={focus} value={`${latest.score}/100`} body="Prioritize one repeatable change. Review the evidence, then take it to a short drill." toneValue={latest.score >= 80 ? "positive" : "warning"} />
      <SectionLabel title="Metric signals" meta={`${metrics.length} AVAILABLE`} />
      <View style={styles.stack}>{metrics.map((metric) => <MetricRow key={metric.id} metric={metric} onPress={() => router.push({ pathname: "/metric-detail", params: { metricId: metric.id } })} />)}</View>
      <LimeCTA label="REVIEW SAVED SESSION" onPress={() => router.push({ pathname: "/swing-detail", params: { id: latest.id } })} style={styles.bottomAction} />
    </> : <EmptyBlock title="No saved analysis" body="Record or import a swing to create a metric-level coaching breakdown." />}
  </PageShell>;
}

export function MetricsOverviewV2Screen() {
  const router = useRouter();
  const { latest, metrics, average, trend } = useV2Data();
  return <PageShell>
    <PageHeader title="Metrics" eyebrow="BIOMECHANICS" back />
    <QuickStatRow items={[{ label: "LATEST", value: latest ? String(latest.score) : "—" }, { label: "AVG SCORE", value: average == null ? "—" : String(average) }, { label: "SIGNALS", value: String(metrics.length) }, { label: "CLUB", value: latest?.club ?? "—" }]} />
    <SectionLabel title="Score movement" meta="SAVED SESSIONS" />
    {trend.length ? <Surface><TrendChart values={trend} labels={trend.map((_, index) => String(index + 1))} /><Text style={styles.chartNote}>Each bar is a saved session score. The rightmost bar is the latest available swing.</Text></Surface> : <EmptyBlock title="No trend yet" body="Your chart will grow as you save analyzed swings." />}
    <SectionLabel title="Signal map" meta="LATEST SESSION" />
    {metrics.length ? <View style={styles.stack}>{metrics.map((metric) => <MetricRow key={metric.id} metric={metric} onPress={() => router.push({ pathname: "/metric-detail", params: { metricId: metric.id } })} />)}</View> : <EmptyBlock title="No metrics available" body="Complete an analysis to populate this dashboard." />}
  </PageShell>;
}

export function SessionHistoryV2Screen() {
  const router = useRouter();
  const { sessionItems } = useV2Data();
  const [query, setQuery] = useState("");
  const [club, setClub] = useState("ALL");
  const clubs = useMemo(() => Array.from(new Set(sessionItems.map((session) => session.club))).slice(0, 3), [sessionItems]);
  const visible = useMemo(() => sessionItems.filter((session) => `${session.club} ${session.focus} ${session.date}`.toLowerCase().includes(query.trim().toLowerCase())).filter((session) => club === "ALL" || session.club === club), [club, query, sessionItems]);
  return <PageShell>
    <PageHeader title="Session History" eyebrow="YOUR SWINGS" back />
    <SearchBox value={query} onChange={setQuery} placeholder="Search club, focus, or date" />
    <View style={styles.chips}><FilterChip label="ALL" active={club === "ALL"} onPress={() => setClub("ALL")} />{clubs.map((item) => <FilterChip key={item} label={item.toUpperCase()} active={club === item} onPress={() => setClub(item)} />)}</View>
    <SectionLabel title="Saved sessions" meta={`${visible.length} RESULTS`} />
    {visible.length ? <View style={styles.stack}>{visible.map((session) => <Surface key={session.id} onPress={() => router.push({ pathname: "/swing-detail", params: { id: session.id } })}><View style={styles.sessionRow}><View style={{ flex: 1 }}><Text style={styles.sessionDate}>{session.date}</Text><Text style={styles.sessionClub}>{session.club}</Text><Text style={styles.sessionFocus}>{session.focus}</Text></View><View style={styles.sessionScore}><Text style={styles.score}>{session.score}</Text><Text style={styles.scoreMeta}>{session.duration}</Text></View></View></Surface>)}</View> : <EmptyBlock title="No sessions found" body="Try a different search or record a new swing." />}
  </PageShell>;
}

export function TrendsV2Screen() {
  const { trend, average, sessions, latest, focus } = useV2Data();
  const [range, setRange] = useState<"ALL" | "RECENT">("ALL");
  const visibleTrend = range === "RECENT" ? trend.slice(-6) : trend;
  return <PageShell>
    <PageHeader title="Trends" eyebrow="PROGRESS" back />
    <View style={styles.chips}><FilterChip label="ALL SESSIONS" active={range === "ALL"} onPress={() => setRange("ALL")} /><FilterChip label="RECENT 6" active={range === "RECENT"} onPress={() => setRange("RECENT")} /></View>
    <SectionLabel title="Score movement" meta={range === "ALL" ? "ALL TIME" : "RECENT"} />
    {visibleTrend.length ? <Surface><TrendChart values={visibleTrend} labels={visibleTrend.map((_, index) => String(index + 1))} /><Text style={styles.chartNote}>Track direction over time; use the detailed analysis to understand the cause behind each change.</Text></Surface> : <EmptyBlock title="No trend yet" body="Save a few analyses to reveal movement over time." />}
    <SectionLabel title="At a glance" meta="LIVE" />
    <QuickStatRow items={[{ label: "AVG", value: average == null ? "—" : String(average) }, { label: "BEST", value: sessions.length ? String(Math.max(...sessions.map((session) => session.score))) : "—" }, { label: "LATEST", value: latest ? String(latest.score) : "—" }, { label: "FOCUS", value: focus === "Record a first swing" ? "—" : focus.slice(0, 7).toUpperCase() }]} />
  </PageShell>;
}

export function GoalsV2Screen() {
  const router = useRouter();
  const { goal, sessions, completedDrills, lastPracticedDrills } = useV2Data();
  const calendar = deriveWeeklyPracticeCalendar(lastPracticedDrills);
  const practicedDays = calendar.filter((day) => day.practiced).length;
  return <PageShell>
    <PageHeader title="Goals" eyebrow="YOUR TARGETS" back />
    <View style={styles.goalHero}><Text style={styles.eyebrow}>ACTIVE TARGET</Text><Text style={styles.goalTitle}>{goal.title}</Text><Text style={styles.goalCopy}>One measurable target keeps the coaching plan specific and the next action clear.</Text></View>
    <SectionLabel title="Goal progress" meta="PERSISTED" />
    <GoalCard goal={goal} onPress={() => router.push("/(tabs)/progress")} />
    <SectionLabel title="This week" meta="PRACTICE RHYTHM" />
    <QuickStatRow items={[{ label: "DAYS", value: `${practicedDays}/7` }, { label: "DRILLS", value: String(completedDrills.length) }, { label: "SESSIONS", value: String(sessions.length) }, { label: "TARGET", value: String(goal.target) }]} />
    <LimeCTA label="TUNE GOAL IN PROGRESS" onPress={() => router.push("/(tabs)/progress")} style={styles.bottomAction} />
  </PageShell>;
}

export function PracticePlannerV2Screen() {
  const router = useRouter();
  const { v2Drills, completedDrills, focus, lastPracticedDrills } = useV2Data();
  const week = deriveWeeklyPracticeCalendar(lastPracticedDrills);
  return <PageShell>
    <PageHeader title="Practice Planner" eyebrow="WEEKLY RHYTHM" back />
    <View style={styles.practiceHero}><Text style={styles.eyebrow}>TODAY'S FOCUS</Text><Text style={styles.goalTitle}>{focus}</Text><Text style={styles.goalCopy}>Choose one drill, take a short set of deliberate reps, then log the next swing.</Text></View>
    <SectionLabel title="Last 7 days" meta="PRACTICE" />
    <Surface><View style={styles.weekRow}>{week.map((day) => <View key={day.key} style={styles.weekDay}><View style={[styles.weekDot, day.practiced && styles.weekDotActive]}><Text style={[styles.weekCount, day.practiced && styles.weekCountActive]}>{day.count || "·"}</Text></View><Text style={styles.weekLabel}>{day.label}</Text></View>)}</View></Surface>
    <SectionLabel title="Recommended drills" meta={`${v2Drills.length} AVAILABLE`} />
    <View style={styles.stack}>{v2Drills.map((drill) => <DrillCard key={drill.id} drill={{ ...drill, favorite: completedDrills.includes(drill.id) || drill.favorite }} onPress={() => router.push({ pathname: "/drill-detail", params: { drillId: drill.id } })} />)}</View>
    <LimeCTA label="OPEN DRILL LIBRARY" onPress={() => router.push("/(tabs)/library")} style={styles.bottomAction} />
  </PageShell>;
}

export function DrillExplorerV2Screen() {
  const router = useRouter();
  const { v2Drills, completedDrills } = useV2Data();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const filters = useMemo(() => ["ALL", ...Array.from(new Set(v2Drills.map((drill) => drill.focus))).slice(0, 3)], [v2Drills]);
  const visible = useMemo(() => v2Drills.filter((drill) => `${drill.title} ${drill.focus} ${drill.cue}`.toLowerCase().includes(query.trim().toLowerCase())).filter((drill) => filter === "ALL" || drill.focus === filter), [filter, query, v2Drills]);
  return <PageShell>
    <PageHeader title="Drill Explorer" eyebrow="COACHING LIBRARY" back />
    <SearchBox value={query} onChange={setQuery} placeholder="Search drills or focus" />
    <View style={styles.chips}>{filters.map((item) => <FilterChip key={item} label={item.toUpperCase()} active={filter === item} onPress={() => setFilter(item)} />)}</View>
    <SectionLabel title="Practice options" meta={`${visible.length} RESULTS`} />
    {visible.length ? <View style={styles.stack}>{visible.map((drill) => <DrillCard key={drill.id} drill={{ ...drill, favorite: completedDrills.includes(drill.id) || drill.favorite }} onPress={() => router.push({ pathname: "/drill-detail", params: { drillId: drill.id } })} />)}</View> : <EmptyBlock title="No drills found" body="Search by movement, cue, or focus." />}
  </PageShell>;
}

export function SettingsV2Screen() {
  const router = useRouter();
  const { profile, sessions, updateProfile } = useV2Data();
  const monetization = useMonetization();
  const [status, setStatus] = useState("");
  const updateNotifications = async (value: boolean) => {
    try {
      await updateProfile({ notifications: value });
      setStatus("Notification preference saved.");
    } catch {
      setStatus("Could not save notification preference. Please try again.");
    }
  };
  return <PageShell>
    <PageHeader title="Settings" eyebrow="PREFERENCES" back />
    <Surface style={styles.settingsHero}><Text style={styles.eyebrow}>PLAYER PROFILE</Text><Text style={styles.goalTitle}>{profile.displayName || "Player"}</Text><Text style={styles.goalCopy}>Handicap {profile.handicap} · {profile.handedness === "left" ? "Left" : "Right"}-handed · {sessions.length} saved sessions</Text></Surface>
    <SectionLabel title="Coaching preferences" meta="SAVED ON DEVICE" />
    <Surface><ToggleRow title="Notifications" sub="Practice reminders and coaching updates" value={Boolean(profile.notifications)} onChange={(value) => { void updateNotifications(value); }} /><MenuRow title="Coaching mode" sub={profile.coachMode} onPress={() => setStatus("Coaching mode is managed in your player profile.")} /><MenuRow title="Privacy" sub={profile.privacy} onPress={() => setStatus("Privacy preference is managed locally.")} /></Surface>
    <SectionLabel title="Membership" meta="ACCOUNT" />
    <Surface><MenuRow title={monetization.tier === "free" ? "Upgrade to Premium" : "Premium membership"} sub={monetization.tier === "free" ? "Unlock expanded coaching tools" : "Advanced coaching tools are active"} accent onPress={() => router.push("/paywall")} /></Surface>
    {status ? <Text style={styles.status}>{status}</Text> : null}
  </PageShell>;
}

const LAB_ITEMS: Array<{ title: string; subtitle: string; route: string }> = [
  { title: "Command Center", subtitle: "Data-backed coaching dashboard", route: "/command-center" },
  { title: "Analysis Overview", subtitle: "Saved-session signal breakdown", route: "/analysis-overview-v2" },
  { title: "Metrics", subtitle: "Biomechanics and score movement", route: "/metrics-overview" },
  { title: "Session History", subtitle: "Searchable real session archive", route: "/session-history-v2" },
  { title: "Trends", subtitle: "Progress from saved sessions", route: "/trends-v2" },
  { title: "Goals", subtitle: "Active target and weekly rhythm", route: "/goals-v2" },
  { title: "Practice Planner", subtitle: "Persisted drill and practice state", route: "/practice-planner-v2" },
  { title: "Drill Explorer", subtitle: "Searchable coaching library", route: "/drill-explorer-v2" },
  { title: "Settings", subtitle: "Profile and notification preferences", route: "/settings-v2" },
  { title: "Mock Data Lab", subtitle: "Deterministic V3 fixtures and state QA", route: "/mock-data-lab-v3" },
];

export function DesignLabV2Screen() {
  const router = useRouter();
  return <PageShell>
    <PageHeader title="Design Lab" eyebrow="FIGMA MAKE · V2" back />
    <View style={styles.labHero}><Text style={styles.eyebrow}>NATIVE VISUAL QA</Text><Text style={styles.heroTitle}>Real app data and deterministic fixture density.</Text><Text style={styles.heroCopy}>This hub keeps the original state, analysis, camera, and monetization boundaries intact while exposing a separate V3 mock-data lab for populated, loading, and empty-state review.</Text></View>
    <View style={styles.labGrid}>{LAB_ITEMS.map((item, index) => <Pressable key={item.route} accessibilityRole="button" accessibilityLabel={`Open ${item.title}`} onPress={() => router.push(item.route as never)} style={({ pressed }) => [styles.labCard, pressed && styles.pressed]}><Text style={styles.labIndex}>{String(index + 1).padStart(2, "0")}</Text><Text style={styles.labTitle}>{item.title}</Text><Text style={styles.labSubtitle}>{item.subtitle}</Text><Text style={styles.labOpen}>OPEN SCREEN ›</Text></Pressable>)}</View>
  </PageShell>;
}

const styles = StyleSheet.create({
  hero: { marginTop: 7, padding: 18, borderRadius: 24, backgroundColor: "#102A1C", borderWidth: 1, borderColor: "#24513B" },
  eyebrow: { color: V2.colors.lime, fontSize: 8, fontWeight: "900", letterSpacing: 1.1 },
  heroTitle: { color: V2.colors.white, fontSize: 25, fontWeight: "900", marginTop: 6 },
  heroCopy: { color: V2.colors.muted, fontSize: 10, lineHeight: 15, marginTop: 7 },
  heroAction: { marginTop: 16 },
  bottomAction: { marginTop: 17, marginBottom: 10 },
  stack: { gap: 9 },
  chartNote: { color: V2.colors.dim, fontSize: 8, lineHeight: 13, marginTop: 9 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 10 },
  sessionRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  sessionDate: { color: V2.colors.dim, fontSize: 8, fontWeight: "800" },
  sessionClub: { color: V2.colors.white, fontSize: 15, fontWeight: "900", marginTop: 3 },
  sessionFocus: { color: V2.colors.lime, fontSize: 8, fontWeight: "900", marginTop: 5 },
  sessionScore: { width: 54, height: 54, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: V2.colors.limeGlass },
  score: { color: V2.colors.lime, fontSize: 21, fontWeight: "900" },
  scoreMeta: { color: V2.colors.dim, fontSize: 7, fontWeight: "800", marginTop: 1 },
  goalHero: { marginTop: 7, padding: 18, borderRadius: 22, backgroundColor: "#173D2F", borderWidth: 1, borderColor: "#275946" },
  practiceHero: { marginTop: 7, padding: 18, borderRadius: 22, backgroundColor: "#132B20", borderWidth: 1, borderColor: "#254938" },
  goalTitle: { color: V2.colors.white, fontSize: 21, fontWeight: "900", marginTop: 6 },
  goalCopy: { color: V2.colors.muted, fontSize: 10, lineHeight: 15, marginTop: 6 },
  weekRow: { flexDirection: "row", justifyContent: "space-between" },
  weekDay: { alignItems: "center", gap: 6 },
  weekDot: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: V2.colors.surface3, borderWidth: 1, borderColor: V2.colors.border },
  weekDotActive: { backgroundColor: V2.colors.lime, borderColor: V2.colors.lime },
  weekCount: { color: V2.colors.dim, fontSize: 9, fontWeight: "900" },
  weekCountActive: { color: V2.colors.ink },
  weekLabel: { color: V2.colors.dim, fontSize: 7, fontWeight: "900" },
  settingsHero: { marginTop: 7 },
  status: { color: V2.colors.lime, fontSize: 9, fontWeight: "800", lineHeight: 14, marginTop: 12, textAlign: "center" },
  labHero: { marginTop: 7, padding: 18, borderRadius: 24, backgroundColor: "#102A1C", borderWidth: 1, borderColor: "#24513B" },
  labGrid: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 14 },
  labCard: { width: "48%", minHeight: 146, padding: 13, borderRadius: 18, backgroundColor: V2.colors.surface, borderWidth: 1, borderColor: V2.colors.border },
  labIndex: { color: V2.colors.lime, fontSize: 8, fontWeight: "900" },
  labTitle: { color: V2.colors.white, fontSize: 13, fontWeight: "900", marginTop: 12 },
  labSubtitle: { color: V2.colors.dim, fontSize: 8, lineHeight: 12, marginTop: 5 },
  labOpen: { color: V2.colors.lime, fontSize: 7, fontWeight: "900", letterSpacing: 0.65, marginTop: 12 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
});
