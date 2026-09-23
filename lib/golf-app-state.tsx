import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { swings as seedSwings, SwingSession } from "@/lib/golf-data";
import type { ProgressMetric } from "@/lib/progress-metrics";
import type { LibraryDateRange, LibraryFilter } from "@/lib/library-filters";
import type { CapturePreferences } from "@/lib/capture-preferences";
import { normalizeCapturePreferences } from "@/lib/capture-preferences";
import { normalizeLibraryDateRange, normalizeLibraryFilter } from "@/lib/library-filters";
import { normalizeProgressMetric } from "@/lib/progress-preferences";
import { parseStoredJson } from "@/lib/local-state-recovery";
import { normalizeStoredState } from "@/lib/local-state-migration";
import { reportAppError } from "@/lib/error-reporting";
import { createHydrationGate, createPendingWorkTracker, createPersistenceQueue } from "@/lib/persistence-queue";
import { addCompletedDrillStep, resetCompletedDrillSteps } from "@/lib/drill-step-progress";
import { markDrillPracticed } from "@/lib/drill-practice-meta";
import { normalizePracticeHistoryQuery, normalizePracticeHistoryRange, type PracticeHistoryRange } from "@/lib/home-statistics";

const STORAGE_KEY = "ai-golf-swing-coach:local-state:v1";

type GolfProfile = { displayName: string; handicap: string; handedness: "left" | "right"; preferredClub: string; units: "imperial" | "metric"; notifications: boolean; privacy: "private" | "shared"; coachMode: "explore" | "focus" | "coach" };
type GolfAppState = { profile: GolfProfile; sessions: SwingSession[]; activeGoal: { metric: string; target: number; current: number; deadline: string }; completedDrills: string[]; completedDrillSteps: Record<string, number[]>; lastPracticedDrills: Record<string, string>; preferredProgressMetric: ProgressMetric; preferredLibraryFilter: LibraryFilter; preferredLibraryDateRange: LibraryDateRange; capturePreferences: CapturePreferences; preferredPracticeHistoryRange: PracticeHistoryRange; preferredPracticeHistoryQuery: string; hydrated: boolean; isSaving: boolean; updateProfile: (patch: Partial<GolfProfile>) => Promise<void>; saveSession: (session: SwingSession) => Promise<void>; deleteSession: (id: string) => Promise<void>; updateGoal: (patch: Partial<GolfAppState["activeGoal"]>) => Promise<void>; completeDrill: (drillId: string) => Promise<void>; completeDrillStep: (drillId: string, stepIndex: number) => Promise<void>; resetDrillSteps: (drillId: string) => Promise<void>; updateProgressMetric: (metric: ProgressMetric) => Promise<void>; updateLibraryFilter: (filter: LibraryFilter) => Promise<void>; updateLibraryDateRange: (range: LibraryDateRange) => Promise<void>; updateCapturePreferences: (patch: Partial<CapturePreferences>) => Promise<void>; updatePracticeHistoryRange: (range: PracticeHistoryRange) => Promise<void>; updatePracticeHistoryQuery: (query: string) => Promise<void>; resetPracticeHistoryFilters: () => Promise<void>; clearPracticeHistory: () => Promise<void> };

const defaultState: { profile: GolfProfile; sessions: SwingSession[]; activeGoal: { metric: string; target: number; current: number; deadline: string }; completedDrills: string[]; completedDrillSteps: Record<string, number[]>; lastPracticedDrills: Record<string, string>; preferredProgressMetric: ProgressMetric; preferredLibraryFilter: LibraryFilter; preferredLibraryDateRange: LibraryDateRange; capturePreferences: CapturePreferences; preferredPracticeHistoryRange: PracticeHistoryRange; preferredPracticeHistoryQuery: string } = { profile: { displayName: "Alex Johnson", handicap: "12.4", handedness: "right", preferredClub: "7 iron", units: "imperial", notifications: true, privacy: "private", coachMode: "explore" }, sessions: seedSwings, activeGoal: { metric: "Club head speed", target: 100, current: 94, deadline: "September 30" }, completedDrills: [], completedDrillSteps: {}, lastPracticedDrills: {}, preferredProgressMetric: "speed", preferredLibraryFilter: "all", preferredLibraryDateRange: "all", capturePreferences: { club: "7 iron", facing: "back", slowMotion: false, duration: 12 }, preferredPracticeHistoryRange: "all", preferredPracticeHistoryQuery: "" };
const GolfAppStateContext = createContext<GolfAppState | null>(null);

export function GolfAppStateProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const stateRef = useRef(state);
  const persistenceQueue = useRef(createPersistenceQueue());
  const pendingPersistence = useRef(createPendingWorkTracker());
  const hydrationGate = useRef(createHydrationGate());

  useEffect(() => { let mounted = true; const hydrate = async () => { try { const value = await AsyncStorage.getItem(STORAGE_KEY); if (!mounted || !value) return; const saved = parseStoredJson(value, null, (parsed) => parsed as Partial<typeof defaultState>, (error) => reportAppError("local-state-parse", error)); if (saved) { const normalized = normalizeStoredState(saved, defaultState); const hydratedState = { ...normalized, preferredProgressMetric: normalizeProgressMetric(normalized.preferredProgressMetric), preferredLibraryFilter: normalizeLibraryFilter(normalized.preferredLibraryFilter), preferredLibraryDateRange: normalizeLibraryDateRange(normalized.preferredLibraryDateRange), capturePreferences: normalizeCapturePreferences(normalized.capturePreferences, defaultState.capturePreferences), preferredPracticeHistoryRange: normalizePracticeHistoryRange(normalized.preferredPracticeHistoryRange), preferredPracticeHistoryQuery: normalizePracticeHistoryQuery(normalized.preferredPracticeHistoryQuery) }; stateRef.current = hydratedState; setState(hydratedState); } } catch (error) { reportAppError("local-state-hydration", error); /* Keep safe defaults when local storage is unavailable. */ } finally { hydrationGate.current.release(); if (mounted) setHydrated(true); } }; void hydrate(); return () => { mounted = false; }; }, []);
  const persist = useCallback(async (update: (current: typeof defaultState) => typeof defaultState) => { await hydrationGate.current.wait(); pendingPersistence.current.begin(); setIsSaving(true); try { await persistenceQueue.current(async () => { const nextState = update(stateRef.current); const serialized = JSON.stringify(nextState); await AsyncStorage.setItem(STORAGE_KEY, serialized); stateRef.current = nextState; setState(nextState); }); } catch (error) { reportAppError("local-state-persistence", error); throw error; } finally { pendingPersistence.current.end(); if (!pendingPersistence.current.isPending()) setIsSaving(false); } }, []);
  const updateProfile = useCallback((patch: Partial<GolfProfile>) => persist((current) => ({ ...current, profile: { ...current.profile, ...patch } })), [persist]);
  const saveSession = useCallback((session: SwingSession) => persist((current) => ({ ...current, sessions: [session, ...current.sessions.filter((item) => item.id !== session.id)] })), [persist]);
  const deleteSession = useCallback((id: string) => persist((current) => ({ ...current, sessions: current.sessions.filter((item) => item.id !== id) })), [persist]);
  const updateGoal = useCallback((patch: Partial<GolfAppState["activeGoal"]>) => persist((current) => ({ ...current, activeGoal: { ...current.activeGoal, ...patch } })), [persist]);
  const completeDrill = useCallback((drillId: string) => persist((current) => ({ ...current, completedDrills: current.completedDrills.includes(drillId) ? current.completedDrills : [...current.completedDrills, drillId] })), [persist]);
  const completeDrillStep = useCallback((drillId: string, stepIndex: number) => persist((current) => ({ ...current, completedDrillSteps: addCompletedDrillStep(current.completedDrillSteps, drillId, stepIndex), lastPracticedDrills: markDrillPracticed(current.lastPracticedDrills, drillId) })), [persist]);
  const resetDrillSteps = useCallback((drillId: string) => persist((current) => ({ ...current, completedDrillSteps: resetCompletedDrillSteps(current.completedDrillSteps, drillId) })), [persist]);
  const updateProgressMetric = useCallback((metric: ProgressMetric) => persist((current) => ({ ...current, preferredProgressMetric: metric })), [persist]);
  const updateLibraryFilter = useCallback((filter: LibraryFilter) => persist((current) => ({ ...current, preferredLibraryFilter: filter })), [persist]);
  const updateLibraryDateRange = useCallback((range: LibraryDateRange) => persist((current) => ({ ...current, preferredLibraryDateRange: range })), [persist]);
  const updateCapturePreferences = useCallback((patch: Partial<CapturePreferences>) => persist((current) => ({ ...current, capturePreferences: { ...current.capturePreferences, ...patch } })), [persist]);
  const updatePracticeHistoryRange = useCallback((range: PracticeHistoryRange) => persist((current) => ({ ...current, preferredPracticeHistoryRange: normalizePracticeHistoryRange(range) })), [persist]);
  const updatePracticeHistoryQuery = useCallback((query: string) => persist((current) => ({ ...current, preferredPracticeHistoryQuery: normalizePracticeHistoryQuery(query) })), [persist]);
  const resetPracticeHistoryFilters = useCallback(() => persist((current) => ({ ...current, preferredPracticeHistoryRange: "all", preferredPracticeHistoryQuery: "" })), [persist]);
  const clearPracticeHistory = useCallback(() => persist((current) => ({ ...current, lastPracticedDrills: {} })), [persist]);
  const value = useMemo(() => ({ ...state, hydrated, isSaving, updateProfile, saveSession, deleteSession, updateGoal, completeDrill, completeDrillStep, resetDrillSteps, updateProgressMetric, updateLibraryFilter, updateLibraryDateRange, updateCapturePreferences, updatePracticeHistoryRange, updatePracticeHistoryQuery, resetPracticeHistoryFilters, clearPracticeHistory }), [state, hydrated, isSaving, updateProfile, saveSession, deleteSession, updateGoal, completeDrill, completeDrillStep, resetDrillSteps, updateProgressMetric, updateLibraryFilter, updateLibraryDateRange, updateCapturePreferences, updatePracticeHistoryRange, updatePracticeHistoryQuery, resetPracticeHistoryFilters, clearPracticeHistory]);
  return <GolfAppStateContext.Provider value={value}>{children}</GolfAppStateContext.Provider>;
}

export function useGolfAppState() { const context = useContext(GolfAppStateContext); if (!context) throw new Error("useGolfAppState must be used inside GolfAppStateProvider"); return context; }
export const golfStorageKey = STORAGE_KEY;
