import type { PropsWithChildren } from "react";
import { Redirect } from "expo-router";

/**
 * Keeps internal visual QA and deterministic fixture routes out of normal builds.
 * Enable only in a dedicated QA build with EXPO_PUBLIC_ENABLE_DESIGN_LABS=true.
 */
export function DevelopmentRouteGuard({ children }: PropsWithChildren) {
  if (process.env.EXPO_PUBLIC_ENABLE_DESIGN_LABS !== "true") {
    return <Redirect href="/" />;
  }

  return <>{children}</>;
}
