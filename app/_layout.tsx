import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Platform } from "react-native";
import "@/lib/_core/nativewind-pressable";
import { ThemeProvider } from "@/lib/theme-provider";
import { GolfAppStateProvider } from "@/lib/golf-app-state";
import { OfflineBanner } from "@/components/ui/offline-banner";
import { AppErrorBoundary } from "@/components/ui/app-error-boundary";
import { MonetizationProvider } from "@/lib/monetization-state";
import { SafeAreaFrameContext, SafeAreaInsetsContext, SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import type { EdgeInsets, Metrics, Rect } from "react-native-safe-area-context";
import { trpc, createTRPCClient } from "@/lib/trpc";
import { initManusRuntime, subscribeSafeAreaInsets } from "@/lib/_core/manus-runtime";
import { installGlobalErrorHandlers } from "../release-hardening-v4/core/globalErrors";
import { ReleaseErrorBoundary } from "../release-hardening-v4/ui/ReleaseErrorBoundary";

const DEFAULT_WEB_INSETS: EdgeInsets = { top: 0, right: 0, bottom: 0, left: 0 };
const DEFAULT_WEB_FRAME: Rect = { x: 0, y: 0, width: 0, height: 0 };
export const unstable_settings = { anchor: "(tabs)" };

export default function RootLayout() {
  const initialInsets = initialWindowMetrics?.insets ?? DEFAULT_WEB_INSETS;
  const initialFrame = initialWindowMetrics?.frame ?? DEFAULT_WEB_FRAME;
  const [insets, setInsets] = useState<EdgeInsets>(initialInsets);
  const [frame, setFrame] = useState<Rect>(initialFrame);
  useEffect(() => { initManusRuntime(); return installGlobalErrorHandlers(); }, []);
  const handleSafeAreaUpdate = useCallback((metrics: Metrics) => { setInsets(metrics.insets); setFrame(metrics.frame); }, []);
  useEffect(() => { if (Platform.OS !== "web") return; const unsubscribe = subscribeSafeAreaInsets(handleSafeAreaUpdate); return () => unsubscribe(); }, [handleSafeAreaUpdate]);
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } } }));
  const [trpcClient] = useState(() => createTRPCClient());
  const providerInitialMetrics = useMemo(() => { const metrics = initialWindowMetrics ?? { insets: initialInsets, frame: initialFrame }; return { ...metrics, insets: { ...metrics.insets, top: Math.max(metrics.insets.top, 16), bottom: Math.max(metrics.insets.bottom, 12) } }; }, [initialInsets, initialFrame]);
  const content = <GestureHandlerRootView style={{ flex: 1 }}><OfflineBanner /><trpc.Provider client={trpcClient} queryClient={queryClient}><QueryClientProvider client={queryClient}><Stack screenOptions={{ headerShown: false }}><Stack.Screen name="(tabs)" /><Stack.Screen name="oauth/callback" /><Stack.Screen name="dev/diagnostics" /></Stack><StatusBar style="light" /></QueryClientProvider></trpc.Provider></GestureHandlerRootView>;
  const wrappedContent = <ThemeProvider><MonetizationProvider><GolfAppStateProvider>{Platform.OS === "web" ? <SafeAreaProvider initialMetrics={providerInitialMetrics}><SafeAreaFrameContext.Provider value={frame}><SafeAreaInsetsContext.Provider value={insets}>{content}</SafeAreaInsetsContext.Provider></SafeAreaFrameContext.Provider></SafeAreaProvider> : <SafeAreaProvider initialMetrics={providerInitialMetrics}>{content}</SafeAreaProvider>}</GolfAppStateProvider></MonetizationProvider></ThemeProvider>;
  return <ReleaseErrorBoundary><AppErrorBoundary>{wrappedContent}</AppErrorBoundary></ReleaseErrorBoundary>;
}
