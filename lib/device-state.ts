import { AppState, AppStateStatus, Platform } from "react-native";
import { useEffect, useState } from "react";

export function useAppLifecycle() { const [status, setStatus] = useState<AppStateStatus>(AppState.currentState); useEffect(() => { const subscription = AppState.addEventListener("change", setStatus); return () => subscription.remove(); }, []); return { status, isActive: status === "active" }; }
export function useOfflineStatus() { const [isOnline, setIsOnline] = useState(true); useEffect(() => { if (Platform.OS !== "web" || typeof window === "undefined") return; const update = () => setIsOnline(window.navigator.onLine); update(); window.addEventListener("online", update); window.addEventListener("offline", update); return () => { window.removeEventListener("online", update); window.removeEventListener("offline", update); }; }, []); return { isOnline }; }
