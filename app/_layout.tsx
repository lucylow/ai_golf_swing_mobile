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
import { reportAppError } from "@/lib/error-reporting";
import { installGlobalErrorHandlers } from "../release-hardening-v4/core/globalErrors";
import { ReleaseErrorBoundary } from "../release-hardening-v4/ui/ReleaseErrorBoundary";

const DEFAULT_WEB_INSETS: EdgeInsets = { top: 0, right: 0, bottom: 0, left: 0 };
const DEFAULT_WEB_FRAME: Rect = { x: 0, y: 0, width: 0, height: 0 };
export const unstable_settings = { anchor: "(tabs)" };

function parseSafeAreaMetrics(value: unknown): Metrics | null {
  if (!value || typeof value !== "object") return null;

  try {
    const metrics = value as Partial<Metrics>;
    const insets = metrics.insets;
    const frame = metrics.frame;
    if (
      !insets ||
      typeof insets !== "object" ||
      !frame ||
      typeof frame !== "object"
    ) {
      return null;
    }

    const insetValues = [insets.top, insets.right, insets.bottom, insets.left];
    const frameValues = [frame.x, frame.y, frame.width, frame.height];
    if (
      !insetValues.every((inset) => Number.isFinite(inset) && inset >= 0) ||
      !frameValues.every(Number.isFinite) ||
      frame.width < 0 ||
      frame.height < 0
    ) {
      return null;
    }

    return {
      insets: {
        top: insets.top,
        right: insets.right,
        bottom: insets.bottom,
        left: insets.left,
      },
      frame: {
        x: frame.x,
        y: frame.y,
        width: frame.width,
        height: frame.height,
      },
    };
  } catch {
    return null;
  }
}

function getInitialSafeAreaMetrics(): Metrics {
  if (!initialWindowMetrics) {
    return { insets: DEFAULT_WEB_INSETS, frame: DEFAULT_WEB_FRAME };
  }

  const metrics = parseSafeAreaMetrics(initialWindowMetrics);
  if (metrics) return metrics;

  reportAppError(
    "root-safe-area-invalid-initial-metrics",
    new Error("Initial safe-area metrics were invalid"),
  );
  return { insets: DEFAULT_WEB_INSETS, frame: DEFAULT_WEB_FRAME };
}

function AppRuntimeProviders({
  insets,
  frame,
}: {
  insets: EdgeInsets;
  frame: Rect;
}) {
  const [clients] = useState(() => {
    try {
      return {
        queryClient: new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              retry: 1,
            },
          },
        }),
        trpcClient: createTRPCClient(),
      };
    } catch (error) {
      reportAppError("root-client-initialization", error);
      throw error;
    }
  });
  const providerInitialMetrics = useMemo(() => {
    const initialMetrics = getInitialSafeAreaMetrics();
    return {
      ...initialMetrics,
      insets: {
        ...initialMetrics.insets,
        top: Math.max(initialMetrics.insets.top, 16),
        bottom: Math.max(initialMetrics.insets.bottom, 12),
      },
    };
  }, []);
  const content = (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OfflineBanner />
      <trpc.Provider
        client={clients.trpcClient}
        queryClient={clients.queryClient}
      >
        <QueryClientProvider client={clients.queryClient}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="oauth/callback" />
            <Stack.Screen name="dev/diagnostics" />
          </Stack>
          <StatusBar style="light" />
        </QueryClientProvider>
      </trpc.Provider>
    </GestureHandlerRootView>
  );

  return (
    <ThemeProvider>
      <MonetizationProvider>
        <GolfAppStateProvider>
          {Platform.OS === "web" ? (
            <SafeAreaProvider initialMetrics={providerInitialMetrics}>
              <SafeAreaFrameContext.Provider value={frame}>
                <SafeAreaInsetsContext.Provider value={insets}>
                  {content}
                </SafeAreaInsetsContext.Provider>
              </SafeAreaFrameContext.Provider>
            </SafeAreaProvider>
          ) : (
            <SafeAreaProvider initialMetrics={providerInitialMetrics}>
              {content}
            </SafeAreaProvider>
          )}
        </GolfAppStateProvider>
      </MonetizationProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [initialMetrics] = useState(getInitialSafeAreaMetrics);
  const [insets, setInsets] = useState<EdgeInsets>(initialMetrics.insets);
  const [frame, setFrame] = useState<Rect>(initialMetrics.frame);
  useEffect(() => {
    let uninstallGlobalErrorHandlers: (() => void) | undefined;
    try {
      uninstallGlobalErrorHandlers = installGlobalErrorHandlers();
    } catch (error) {
      reportAppError("root-global-error-handler-install", error);
    }

    try {
      initManusRuntime();
    } catch (error) {
      reportAppError("root-manus-runtime-init", error);
    }

    return () => {
      try {
        uninstallGlobalErrorHandlers?.();
      } catch (error) {
        reportAppError("root-global-error-handler-cleanup", error);
      }
    };
  }, []);
  const handleSafeAreaUpdate = useCallback((value: unknown) => {
    const metrics = parseSafeAreaMetrics(value);
    if (!metrics) {
      reportAppError(
        "root-safe-area-invalid-metrics",
        new Error("Received invalid safe-area metrics"),
      );
      return;
    }
    setInsets(metrics.insets);
    setFrame(metrics.frame);
  }, []);
  useEffect(() => {
    if (Platform.OS !== "web") return;

    let unsubscribe: (() => void) | undefined;
    try {
      unsubscribe = subscribeSafeAreaInsets(handleSafeAreaUpdate);
    } catch (error) {
      reportAppError("root-safe-area-subscribe", error);
    }

    return () => {
      try {
        unsubscribe?.();
      } catch (error) {
        reportAppError("root-safe-area-unsubscribe", error);
      }
    };
  }, [handleSafeAreaUpdate]);
  return (
    <ReleaseErrorBoundary>
      <AppErrorBoundary>
        <AppRuntimeProviders insets={insets} frame={frame} />
      </AppErrorBoundary>
    </ReleaseErrorBoundary>
  );
}
