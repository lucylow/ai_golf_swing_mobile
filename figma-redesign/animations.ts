import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useFigmaEntrance(delay = 0, distance = 10) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 380,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 420,
        delay,
        useNativeDriver: true,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [delay, opacity, translateY]);

  return { opacity, translateY };
}

export function usePulseScale(enabled = true) {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!enabled) {
      scale.setValue(1);
      return;
    }
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.03, duration: 800, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [enabled, scale]);
  return scale;
}

export function useCountUp(target: number, duration = 700) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    value.setValue(0);
    const animation = Animated.timing(value, {
      toValue: target,
      duration,
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [duration, target, value]);
  return value;
}
