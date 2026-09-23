import * as Haptics from "expo-haptics";
import { AccessibilityInfo, Animated, Easing, Platform } from "react-native";
import type { AccessibilityProps } from "react-native";
import { useEffect, useRef, useState } from "react";
import { safelyTriggerFeedback } from "./safe-feedback";
import { reportAppError } from "./error-reporting";
import { motionDuration } from "./motion";
import { safelyRemoveSubscription } from "./safe-subscription";

export { safelyTriggerFeedback } from "./safe-feedback";

const reportFeedbackError = (error: unknown) => reportAppError("native-feedback", error);

export const haptic = {
  light: () => Platform.OS === "web" ? Promise.resolve() : safelyTriggerFeedback(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), reportFeedbackError),
  medium: () => Platform.OS === "web" ? Promise.resolve() : safelyTriggerFeedback(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), reportFeedbackError),
  success: () => Platform.OS === "web" ? Promise.resolve() : safelyTriggerFeedback(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), reportFeedbackError),
  error: () => Platform.OS === "web" ? Promise.resolve() : safelyTriggerFeedback(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error), reportFeedbackError),
  selection: () => Platform.OS === "web" ? Promise.resolve() : safelyTriggerFeedback(() => Haptics.selectionAsync(), reportFeedbackError),
};

export const a11y = { button: (label: string, hint = "Double tap to activate"): AccessibilityProps => ({ accessible: true, accessibilityRole: "button", accessibilityLabel: label, accessibilityHint: hint }), header: (label: string): AccessibilityProps => ({ accessible: true, accessibilityRole: "header", accessibilityLabel: label }), image: (label: string): AccessibilityProps => ({ accessible: true, accessibilityRole: "image", accessibilityLabel: label }) };

export function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReduceMotion(enabled);
    }).catch((error) => reportAppError("accessibility-motion", error));
    let subscription: { remove: () => void } | undefined;
    try {
      subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
    } catch (error) {
      reportAppError("accessibility-motion-subscription", error);
    }
    return () => {
      mounted = false;
      safelyRemoveSubscription(subscription, (error) => reportAppError("accessibility-motion-cleanup", error));
    };
  }, []);

  return reduceMotion;
}

export function useFadeIn(duration = 240) {
  const reduceMotion = useReducedMotion();
  const opacity = useRef(new Animated.Value(reduceMotion ? 1 : 0)).current;
  useEffect(() => {
    opacity.stopAnimation();
    if (reduceMotion) { opacity.setValue(1); return; }
    opacity.setValue(0);
    const animation = Animated.timing(opacity, { toValue: 1, duration: motionDuration(duration, reduceMotion), easing: Easing.out(Easing.cubic), useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [duration, opacity, reduceMotion]);
  return { opacity, fadeIn: () => opacity.setValue(1) };
}

export function useSlideIn(distance = 18, duration = 260) {
  const reduceMotion = useReducedMotion();
  const translateY = useRef(new Animated.Value(reduceMotion ? 0 : distance)).current;
  useEffect(() => {
    translateY.stopAnimation();
    if (reduceMotion) { translateY.setValue(0); return; }
    translateY.setValue(distance);
    const animation = Animated.timing(translateY, { toValue: 0, duration: motionDuration(duration, reduceMotion), easing: Easing.out(Easing.cubic), useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [distance, duration, reduceMotion, translateY]);
  return { translateY, slideIn: () => translateY.setValue(0) };
}

export function useKeyedEntrance(key: string | number, distance = 14, duration = 240) {
  const reduceMotion = useReducedMotion();
  const opacity = useRef(new Animated.Value(reduceMotion ? 1 : 0)).current;
  const translateY = useRef(new Animated.Value(reduceMotion ? 0 : distance)).current;
  useEffect(() => {
    opacity.stopAnimation();
    translateY.stopAnimation();
    if (reduceMotion) { opacity.setValue(1); translateY.setValue(0); return; }
    opacity.setValue(0);
    translateY.setValue(distance);
    const animation = Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: motionDuration(duration, reduceMotion), easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: motionDuration(duration, reduceMotion), easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [distance, duration, key, opacity, reduceMotion, translateY]);
  return { opacity, translateY };
}

export function usePulse(duration = 1800) {
  const reduceMotion = useReducedMotion();
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    scale.stopAnimation();
    scale.setValue(1);
    if (reduceMotion) return;
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(scale, { toValue: 1.06, duration: duration / 2, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: duration / 2, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [duration, reduceMotion, scale]);
  return scale;
}
