import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { PageShell, PageHeader, Surface, SectionLabel, LimeCTA } from '../../figma-redesign-v2/ui';
import { V2 } from '../../figma-redesign-v2/theme';
import { useGolfAppState } from '@/lib/golf-app-state';
import { MockDataBanner, FixtureStat, MockList } from '../ui';
import { mockAchievements, mockClubs, mockCoachMessage, mockComparePair, mockCourses, mockDevices, mockDrills, mockExperiment, mockExportPreset, mockFeedbackItem, mockGoals, mockGolfers, mockInsights, mockMetrics, mockNotifications, mockPaywallPlan, mockPhases, mockPractice, mockRangeLane, mockSessions, mockSwings, mockWeatherSnapshot } from '../mock';

const MOCK_ROUTES = [
  { id: 'golfers', title: 'Golfer profiles', meta: 'persona cards and plan states', value: String(mockGolfers.length), route: '/mock-golfers-v3' },
  { id: 'sessions', title: 'Session archive', meta: 'history, compare, and recap density', value: String(mockSessions.length), route: '/mock-sessions-v3' },
  { id: 'swings', title: 'Swing timeline', meta: 'shot detail and cue variations', value: String(mockSwings.length), route: '/mock-swings-v3' },
  { id: 'metrics', title: 'Metric history', meta: 'eight tracks with 14 points each', value: String(mockMetrics.length), route: '/mock-metrics-v3' },
  { id: 'phases', title: 'Swing phases', meta: 'address through finish checkpoints', value: String(mockPhases.length), route: '/mock-phases-v3' },
  { id: 'clubs', title: 'Club bag', meta: 'carry, dispersion, and confidence', value: String(mockClubs.length), route: '/mock-clubs-v3' },
  { id: 'drills', title: 'Drill catalog', meta: 'focus, equipment, and completion mix', value: String(mockDrills.length), route: '/mock-drills-v3' },
  { id: 'goals', title: 'Goal board', meta: 'active, stretching, and completed targets', value: String(mockGoals.length), route: '/mock-goals-v3' },
  { id: 'coach', title: 'Coach inbox', meta: 'coaching-message fixture stream', value: String(mockCoachMessage.length), route: '/mock-coach-v3' },
  { id: 'practice', title: 'Practice planner', meta: 'short, medium, and long blocks', value: String(mockPractice.length), route: '/mock-practice-v3' },
  { id: 'devices', title: 'Device center', meta: 'connection and battery states', value: String(mockDevices.length), route: '/mock-devices-v3' },
  { id: 'courses', title: 'Course book', meta: 'home, favorite, and recent rounds', value: String(mockCourses.length), route: '/mock-courses-v3' },
  { id: 'achievements', title: 'Achievement wall', meta: 'locked and unlocked progress', value: String(mockAchievements.length), route: '/mock-achievements-v3' },
  { id: 'weather', title: 'Weather book', meta: 'range-condition variations', value: String(mockWeatherSnapshot.length), route: '/mock-weather-v3' },
  { id: 'notifications', title: 'Notification center', meta: 'read and unread system events', value: String(mockNotifications.length), route: '/mock-notifications-v3' },
  { id: 'paywall', title: 'Paywall lab', meta: 'price and feature hierarchy', value: String(mockPaywallPlan.length), route: '/mock-paywall-v3' },
  { id: 'compare', title: 'Compare bench', meta: 'before-and-after session pairs', value: String(mockComparePair.length), route: '/mock-compare-v3' },
  { id: 'range', title: 'Range lanes', meta: 'available, reserved, and in-use lanes', value: String(mockRangeLane.length), route: '/mock-range-v3' },
  { id: 'export', title: 'Export lab', meta: 'share-card and report presets', value: String(mockExportPreset.length), route: '/mock-export-v3' },
  { id: 'feedback', title: 'Feedback lab', meta: 'ratings and follow-up themes', value: String(mockFeedbackItem.length), route: '/mock-feedback-v3' },
  { id: 'experiments', title: 'Experiment lab', meta: 'feature-flag visual variants', value: String(mockExperiment.length), route: '/mock-experiments-v3' },
] as const;

export default function MockDataDashboardScreen() {
  const router = useRouter();
  const { profile, sessions, activeGoal, completedDrills, hydrated } = useGolfAppState();
  return <PageShell>
    <PageHeader title="Data Density Dashboard" eyebrow="MOCK DATA V3" back />
    <MockDataBanner label="MOCK DATA · VISUAL QA ONLY" />
    <View style={styles.grid}>
      <FixtureStat label="GOLFERS" value={String(mockGolfers.length)} detail="fictional profiles" />
      <FixtureStat label="SESSIONS" value={String(mockSessions.length)} detail="synthetic" />
      <FixtureStat label="SWINGS" value={String(mockSwings.length)} detail="synthetic clips" />
      <FixtureStat label="METRICS" value={String(mockMetrics.length)} detail="tracked signals" />
    </View>
    <Surface style={styles.bridge}>
      <Text style={styles.bridgeEyebrow}>LIVE APP CONTEXT · READ ONLY</Text>
      <Text style={styles.title}>{hydrated ? `${profile.displayName}'s saved app state` : 'Loading saved app state'}</Text>
      <Text style={styles.copy}>{hydrated ? `${sessions.length} real saved sessions · ${completedDrills.length} completed drills · ${activeGoal.metric} goal at ${activeGoal.current}/${activeGoal.target}` : 'The fixture lab never writes into persisted state. It waits for the normal local-state hydration boundary.'}</Text>
    </Surface>
    <SectionLabel title="FIXTURE ROUTES" meta={`${MOCK_ROUTES.length} ROUTES · STATE SWITCHER ON EVERY LIST`} />
    <MockList items={MOCK_ROUTES} onPress={(id) => { const target = MOCK_ROUTES.find((item) => item.id === id); if (target) router.push(target.route as never); }} emptyTitle="The mock route catalog is empty" emptyBody="Restore the deterministic fixture catalog to inspect every V3 visual surface." />
    <LimeCTA label="OPEN LIVE COMMAND CENTER" onPress={() => router.push('/command-center')} style={styles.action} />
  </PageShell>;
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  bridge: { marginTop: 12 },
  bridgeEyebrow: { color: V2.colors.lime, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  copy: { fontSize: 11, color: V2.colors.muted, lineHeight: 17, marginTop: 6 },
  title: { fontSize: 16, color: V2.colors.white, fontWeight: '900', marginTop: 5 },
  action: { marginTop: 12 },
});
