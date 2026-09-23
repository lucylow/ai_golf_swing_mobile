import React, { Component, type PropsWithChildren, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/lib/golf-data";
import { appErrorRecovery, nextRecoveryKey } from "@/lib/app-error-recovery";
import { describeError } from "@/lib/safe-diagnostics";
import { reportAppError } from "@/lib/error-reporting";

type Props = PropsWithChildren<{ onReset?: () => void }>;
type State = { hasError: boolean; recoveryKey: number };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, recoveryKey: 0 };

  static getDerivedStateFromError(): State {
    return { hasError: true, recoveryKey: 0 };
  }

  componentDidCatch(error: Error) {
    reportAppError("render", error);
    if (__DEV__) console.error(`[AppErrorBoundary] render failed (${describeError(error)})`);
  }

  reset = () => {
    this.setState((state) => ({ hasError: false, recoveryKey: nextRecoveryKey(state.recoveryKey) }));
    this.props.onReset?.();
  };

  render(): ReactNode {
    if (!this.state.hasError) return <React.Fragment key={this.state.recoveryKey}>{this.props.children}</React.Fragment>;
    return (
      <View style={styles.container} accessible accessibilityRole="alert" accessibilityLiveRegion="assertive">
        <Text accessibilityRole="header" style={styles.title}>{appErrorRecovery.title}</Text>
        <Text style={styles.copy}>{appErrorRecovery.message}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={appErrorRecovery.actionLabel} accessibilityHint={appErrorRecovery.actionHint} onPress={this.reset} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 28, backgroundColor: colors.surface },
  title: { color: colors.ink, fontSize: 24, fontWeight: "900", textAlign: "center" },
  copy: { color: colors.muted, fontSize: 14, lineHeight: 20, textAlign: "center", marginTop: 10, maxWidth: 320 },
  button: { marginTop: 22, backgroundColor: colors.fairway, borderRadius: 14, minHeight: 48, paddingHorizontal: 22, justifyContent: "center" },
  buttonPressed: { opacity: 0.8 },
  buttonText: { color: colors.surface, fontSize: 14, fontWeight: "900" },
});

export default AppErrorBoundary;
