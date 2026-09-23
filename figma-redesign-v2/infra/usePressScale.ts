import { useRef } from 'react';
import { Animated } from 'react-native';
export function usePressScale() { const scale = useRef(new Animated.Value(1)).current; const down = () => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 25 }).start(); const up = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 25 }).start(); return { scale, down, up }; }
