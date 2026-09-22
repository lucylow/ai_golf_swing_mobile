import { PlatformPressable } from "@react-navigation/elements";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Animated } from "react-native";
import { useRef } from "react";

import { haptic, useReducedMotion } from "@/lib/ux";
import { motionDuration, tabPressScale } from "@/lib/motion";

export function HapticTab(props: BottomTabBarButtonProps) {
  const reduceMotion = useReducedMotion();
  const scale = useRef(new Animated.Value(1)).current;
  const animateScale = (pressed: boolean) => {
    Animated.timing(scale, {
      toValue: tabPressScale(pressed, reduceMotion),
      duration: motionDuration(90, reduceMotion),
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <PlatformPressable
        {...props}
        onPressIn={(ev) => {
          animateScale(true);
          if (process.env.EXPO_OS === "ios") void haptic.light();
          props.onPressIn?.(ev);
        }}
        onPressOut={(ev) => {
          animateScale(false);
          props.onPressOut?.(ev);
        }}
      />
    </Animated.View>
  );
}
